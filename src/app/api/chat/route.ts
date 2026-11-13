import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/portfolio-knowledge";
import { getProject } from "@/lib/projects";
import { research } from "@/constants/research";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import type { ChatCard, ChatStreamEvent } from "@/types/chat";

// Streaming can outlast the platform's default function timeout, which would
// cut answers off mid-sentence. Give the function room to finish.
export const runtime = "nodejs";
export const maxDuration = 60;

// Override with CHAT_MODEL to trade capability for cost (e.g. claude-haiku-5-5).
const MODEL = process.env.CHAT_MODEL ?? "claude-opus-5-5";
const MAX_HISTORY = 20;
const MAX_MESSAGE_CHARS = 4000;
// The model may answer, show cards, then finish its answer.
const MAX_TOOL_TURNS = 3;

const Body = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(20_000),
      })
    )
    .min(1),
});

const ShowCardsInput = z.object({
  cards: z
    .array(z.object({ kind: z.enum(["project", "paper"]), slug: z.string().min(1).max(120) }))
    .min(1)
    .max(4),
});

const tools: Anthropic.Beta.BetaTool[] = [
  {
    name: "show_cards",
    description:
      "Show clickable cards for projects or papers from Tanish's portfolio inside the chat. Use the card slugs listed in the system prompt. The visitor sees each card's image, title and summary and can open its page.",
    eager_input_streaming: true,
    input_schema: {
      type: "object",
      properties: {
        cards: {
          type: "array",
          description: "One to four cards, most relevant first.",
          items: {
            type: "object",
            properties: {
              kind: { type: "string", enum: ["project", "paper"] },
              slug: { type: "string", description: "The card slug of the project or paper." },
            },
            required: ["kind", "slug"],
          },
        },
      },
      required: ["cards"],
    },
  },
];

function resolveCard(kind: "project" | "paper", slug: string): ChatCard | null {
  if (kind === "project") {
    const p = getProject(slug);
    if (!p) return null;
    return {
      kind,
      slug: p.slug,
      title: p.shortTitle,
      description: p.description,
      thumbnail: p.thumbnail,
      href: `/projects/${p.slug}`,
      badge: p.live ? (p.live.kind === "external" ? "Live site" : "Live demo") : p.video ? "Video demo" : undefined,
    };
  }
  const r = research.find((item) => item.slug === slug);
  if (!r) return null;
  return {
    kind,
    slug: r.slug,
    title: r.title,
    description: r.summary,
    thumbnail: r.thumbnail,
    href: `/research/${r.slug}`,
    badge: "Paper",
  };
}

/** Runs show_cards: returns what to render and what to tell the model. */
function runShowCards(input: unknown): { cards: ChatCard[]; result: string; isError: boolean } {
  const parsed = ShowCardsInput.safeParse(input);
  if (!parsed.success) {
    return { cards: [], result: "Invalid input: expected { cards: [{ kind, slug }] } with 1-4 cards.", isError: true };
  }
  const cards: ChatCard[] = [];
  const lines: string[] = [];
  for (const { kind, slug } of parsed.data.cards) {
    const card = resolveCard(kind, slug);
    if (card) {
      cards.push(card);
      lines.push(`Shown: ${card.title}`);
    } else {
      lines.push(`No ${kind} with slug "${slug}" exists; nothing was shown for it.`);
    }
  }
  return { cards, result: lines.join("\n"), isError: cards.length === 0 };
}

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

function publicError(err: unknown): string {
  if (err instanceof Anthropic.RateLimitError) {
    return "The assistant is busy right now. Please try again in a minute.";
  }
  if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) {
    return "The assistant is not configured correctly yet.";
  }
  if (err instanceof Anthropic.APIConnectionError) {
    return "Could not reach the AI service. Please try again.";
  }
  if (err instanceof Anthropic.APIError) {
    return "The AI service returned an error. Please try again.";
  }
  return "Something went wrong while answering. Please try again.";
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return json({ error: "The assistant is not configured yet (missing API key)." }, 500);
  }

  // Per-visitor limits: a short burst window and a daily ceiling.
  const ip = clientIp(req);
  const burst = await rateLimit(`chat:burst:${ip}`, 12, 300);
  if (!burst.ok) return tooManyRequests(burst.retryAfterSeconds);
  const daily = await rateLimit(`chat:day:${ip}`, 80, 86_400);
  if (!daily.ok) return tooManyRequests(daily.retryAfterSeconds);

  let parsed;
  try {
    parsed = Body.safeParse(await req.json());
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }
  if (!parsed.success) return json({ error: "Messages array is required" }, 400);

  const history = parsed.data.messages.slice(-MAX_HISTORY).filter((m) => m.content.trim());
  // The conversation must start with, and end on, a user turn.
  while (history.length && history[0].role !== "user") history.shift();
  const last = history[history.length - 1];
  if (!last || last.role !== "user") return json({ error: "Nothing to answer" }, 400);
  if (last.content.length > MAX_MESSAGE_CHARS) {
    return json({ error: `Please keep questions under ${MAX_MESSAGE_CHARS} characters.` }, 400);
  }

  const messages: Anthropic.Beta.BetaMessageParam[] = history.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const workspaceId = process.env.ANTHROPIC_WORKSPACE_ID?.trim();
  const anthropic = new Anthropic({
    // Organization-level keys require a workspace; scoped keys can omit it.
    defaultHeaders: workspaceId
      ? { "anthropic-workspace-id": workspaceId }
      : undefined,
  });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: ChatStreamEvent) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));

      try {
        let wroteText = false;

        for (let turn = 0; turn <= MAX_TOOL_TURNS; turn++) {
          const response = anthropic.beta.messages.stream({
            model: MODEL,
            max_tokens: 16000,
            // If a safety classifier declines, retry on Anthropic's recommended
            // fallback model inside the same call instead of failing the answer.
            betas: ["server-side-fallback-2026-07-01"],
            fallbacks: "default",
            // Summarized thinking feeds the "reasoning" disclosure in the UI.
            thinking: { type: "adaptive", display: "summarized" },
            // Portfolio Q&A is simple; low effort keeps answers fast and cheap.
            output_config: { effort: "low" },
            // The system prompt is large and identical on every request, so
            // cache it: later turns skip re-processing it.
            system: [
              {
                type: "text",
                text: buildSystemPrompt(),
                cache_control: { type: "ephemeral" },
              },
            ],
            tools,
            messages,
          });

          response.on("thinking", (delta) => send({ type: "thinking", content: delta }));
          response.on("text", (delta) => {
            wroteText = true;
            send({ type: "text", content: delta });
          });

          const message = await response.finalMessage();

          if (message.stop_reason === "refusal") {
            if (!wroteText) {
              send({
                type: "text",
                content:
                  "I can't help with that one. I'm here to talk about Tanish's work, research, projects and interests.",
              });
            }
            break;
          }

          const toolUses = message.content.filter(
            (block): block is Anthropic.Beta.BetaToolUseBlock => block.type === "tool_use"
          );
          // A tool call cut off by max_tokens may hold truncated input: don't run it.
          if (message.stop_reason !== "tool_use" || toolUses.length === 0) break;

          const results: Anthropic.Beta.BetaToolResultBlockParam[] = toolUses.map((use) => {
            if (use.name !== "show_cards") {
              return { type: "tool_result", tool_use_id: use.id, content: "Unknown tool.", is_error: true };
            }
            const { cards, result, isError } = runShowCards(use.input);
            if (cards.length) send({ type: "cards", cards });
            return { type: "tool_result", tool_use_id: use.id, content: result, is_error: isError };
          });

          // Thinking blocks go back unchanged alongside the tool call.
          messages.push({ role: "assistant", content: message.content });
          messages.push({ role: "user", content: results });
        }

        send({ type: "done" });
      } catch (err) {
        console.error("[chat]", err);
        send({ type: "error", content: publicError(err) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
