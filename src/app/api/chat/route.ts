import { streamText, convertToModelMessages, UIMessage } from "ai";
import {
  retrieveRelevantChunks,
  buildContextFromChunks,
} from "@/lib/rag/retrieval";
import { buildSystemPrompt } from "@/lib/rag/prompts";

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

// Helper to extract text from UIMessage parts
function getTextFromMessage(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return "";
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
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

  const { messages }: { messages: UIMessage[] } = await req.json();

  // Extract the latest user message for retrieval
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user");

  const query = lastUserMessage ? getTextFromMessage(lastUserMessage) : "";

  // Retrieve relevant chunks from the portfolio site
  const { chunks, sources } = await retrieveRelevantChunks(query, 8);

  // Build the context and system prompt
  const context = buildContextFromChunks(chunks, sources);
  const systemPrompt = buildSystemPrompt(context);

  // Convert UIMessages to model messages for streamText
  const modelMessages = convertToModelMessages(messages);

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
