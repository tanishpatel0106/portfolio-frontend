import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { headers } from "next/headers";
import { retrieveChunks } from "@/lib/rag/retriever";

export const runtime = "nodejs";

type RateLimitEntry = {
  tokens: number;
  lastRefill: number;
};

const RATE_LIMIT_CAPACITY = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, RateLimitEntry>();

const getClientIp = () => {
  const headerList = headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return headerList.get("x-real-ip") ?? "unknown";
};

const checkRateLimit = (key: string) => {
  const now = Date.now();
  const existing = rateLimitStore.get(key);
  if (!existing) {
    rateLimitStore.set(key, { tokens: RATE_LIMIT_CAPACITY - 1, lastRefill: now });
    return true;
  }

  const elapsed = now - existing.lastRefill;
  const refill = (elapsed / RATE_LIMIT_WINDOW_MS) * RATE_LIMIT_CAPACITY;
  const tokens = Math.min(RATE_LIMIT_CAPACITY, existing.tokens + refill);

  if (tokens < 1) {
    rateLimitStore.set(key, { tokens, lastRefill: now });
    return false;
  }

  rateLimitStore.set(key, { tokens: tokens - 1, lastRefill: now });
  return true;
};

const buildSourcesText = (
  chunks: Awaited<ReturnType<typeof retrieveChunks>>
) =>
  chunks
    .map(
      (chunk) =>
        `- chunk_id: ${chunk.chunk_id}\n  url: ${chunk.url}\n  title: ${chunk.title}\n  section_heading: ${chunk.section_heading}\n  text: ${chunk.text}`
    )
    .join("\n\n");

export async function POST(request: Request) {
  const ip = getClientIp();
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({
        answer: "Rate limit exceeded. Please try again shortly.",
        citations: [],
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await request.json();
  const messages = body?.messages ?? [];
  const recruiterMode = Boolean(body?.recruiterMode);
  const latestUserMessage = [...messages]
    .reverse()
    .find((message: { role: string }) => message.role === "user");

  if (!latestUserMessage?.content) {
    return new Response(
      JSON.stringify({
        answer: "Missing user message.",
        citations: [],
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const query = String(latestUserMessage.content);
  const chunks = await retrieveChunks(query);

  if (chunks.length === 0) {
    return new Response(
      JSON.stringify({
        answer: "I don’t know based on my site content.",
        citations: [],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  const modelId = process.env.AI_MODEL ?? "gpt-4o-mini";
  const sourcesText = buildSourcesText(chunks);
  const recruiterInstruction = recruiterMode
    ? "Recruiter mode: respond with bullet points, prioritize metrics first, and include a 'Relevant Projects' section with project links."
    : "";

  const systemPrompt = `You are an assistant for a personal portfolio site. Answer ONLY using the provided SOURCES. If the answer is not supported by the sources, respond with: \"I don’t know based on my site content.\" Keep answers concise. ${recruiterInstruction}\n\nReturn ONLY a JSON object with this shape:\n{\n  \"answer\": string,\n  \"citations\": [\n    {\n      \"chunk_id\": string,\n      \"url\": string,\n      \"title\": string,\n      \"section_heading\": string,\n      \"snippet\": string\n    }\n  ]\n}\nCitations must be 2-5 items and match the sources. Snippet should be 1-2 lines.`;

  const prompt = `Question: ${query}\n\nSOURCES:\n${sourcesText}`;

  const result = await streamText({
    model: openai(modelId),
    temperature: 0.2,
    maxTokens: 500,
    system: systemPrompt,
    messages: [
      { role: "user", content: prompt },
    ],
  });

  return result.toDataStreamResponse();
}
