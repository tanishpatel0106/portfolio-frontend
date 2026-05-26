import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/portfolio-knowledge";

// Streamed responses with extended thinking can run well past the platform's
// default function timeout (~10-15s on Vercel), which silently cuts the answer
// off mid-sentence. Give the function room to finish streaming.
export const runtime = "nodejs";
export const maxDuration = 60;

interface ChatMessageInput {
  role: string;
  content: string;
  thinking?: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages)) {
    return new Response(
      JSON.stringify({ error: "Messages array is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const formattedMessages = messages.slice(-20).map(
    (m: ChatMessageInput) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })
  );

  const anthropic = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = anthropic.messages.stream({
          model: "claude-sonnet-4-20250514",
          max_tokens: 16000,
          thinking: {
            type: "enabled",
            // Thinking tokens stream at roughly answer speed, so a large budget
            // can eat the whole time window before the answer starts. Keep it
            // modest so thinking + answer reliably finish within maxDuration.
            budget_tokens: 3000,
          },
          // Cache the (large, content-derived) system prompt so repeat turns
          // skip re-processing it — faster first token, lower cost.
          system: [
            {
              type: "text",
              text: buildSystemPrompt(),
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: formattedMessages,
        });

        response.on("thinking", (thinkingDelta) => {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "thinking",
                content: thinkingDelta,
              })}\n\n`
            )
          );
        });

        response.on("text", (textDelta) => {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "text",
                content: textDelta,
              })}\n\n`
            )
          );
        });

        response.on("end", () => {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "done" })}\n\n`
            )
          );
          controller.close();
        });

        response.on("error", (err: Error) => {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "error",
                content: err.message,
              })}\n\n`
            )
          );
          controller.close();
        });

        await response.finalMessage();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to get response";
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "error", content: message })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
