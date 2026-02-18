import { streamText } from "ai";
import { retrieveRelevantChunks, buildContextFromChunks } from "@/lib/rag/retrieval";
import { buildSystemPrompt } from "@/lib/rag/prompts";

export const maxDuration = 30;

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: Request) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages } = await req.json();

  // Extract the latest user message for retrieval
  const lastUserMessage = [...messages]
    .reverse()
    .find((m: { role: string }) => m.role === "user");

  const query = lastUserMessage?.content || "";

  // Retrieve relevant chunks from the portfolio site
  const { chunks, sources } = await retrieveRelevantChunks(query, 8);

  // Build the context and system prompt
  const context = buildContextFromChunks(chunks, sources);
  const systemPrompt = buildSystemPrompt(context);

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages,
  });

  // Return streaming response with sources metadata in headers
  const response = result.toDataStreamResponse();

  // Append sources as a custom header so the client can parse them
  const sourcesHeader = JSON.stringify(
    sources.map((s, i) => ({
      index: i + 1,
      url: s.url,
      title: s.title,
      snippet: s.snippet,
    }))
  );

  response.headers.set("X-Sources", encodeURIComponent(sourcesHeader));

  return response;
}
