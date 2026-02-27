import { NextRequest, NextResponse } from "next/server";
import { gateway, generateText } from "ai";
import { retrieveRelevantChunks } from "@/lib/rag/retrieval";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/rag/prompts";
import {
  parseLLMResponse,
  validateCitations,
  buildFallbackResponse,
} from "@/lib/rag/citation-validator";
import { checkRateLimit } from "@/lib/rate-limit";
import { ChatMessage } from "@/lib/rag/types";
import { initializeDatabase } from "@/lib/db/connection";

export const maxDuration = 30;

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const clientIP = getClientIP(request);
  const rateCheck = checkRateLimit(`chat:${clientIP}`, {
    maxRequests: 15,
    windowMs: 60_000,
  });

  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.ceil((rateCheck.resetAt - Date.now()) / 1000)
          ),
        },
      }
    );
  }

  // Validate request body
  let body: { messages: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json(
      { error: "messages array is required" },
      { status: 400 }
    );
  }

  // Get the latest user message for retrieval
  const userMessages = body.messages.filter((m) => m.role === "user");
  const latestQuestion = userMessages[userMessages.length - 1]?.content;

  if (!latestQuestion || typeof latestQuestion !== "string") {
    return NextResponse.json(
      { error: "No user message found" },
      { status: 400 }
    );
  }

  // Sanitize input: limit length
  const sanitizedQuestion = latestQuestion.slice(0, 1000).trim();
  if (sanitizedQuestion.length === 0) {
    return NextResponse.json(
      { error: "Question cannot be empty" },
      { status: 400 }
    );
  }

  try {
    // Ensure required RAG tables/extensions exist before querying.
    await initializeDatabase();

    // Retrieve relevant chunks
    const chunks = await retrieveRelevantChunks(sanitizedQuestion, 10);

    // If no chunks at all, return fallback immediately
    if (chunks.length === 0) {
      const fallback = buildFallbackResponse([]);
      return NextResponse.json(fallback);
    }

    // Build prompt with retrieved context
    const systemPrompt = buildSystemPrompt(chunks);
    const userPrompt = buildUserPrompt(sanitizedQuestion);

    // Call LLM
    const { text } = await generateText({
      model: gateway("openai/gpt-4o-mini"),
      system: systemPrompt,
      prompt: userPrompt,
      maxOutputTokens: 2000,
      temperature: 0.1,
    });

    // Parse and validate the response
    let response = parseLLMResponse(text, chunks);
    const validation = validateCitations(response, chunks);

    // If validation fails, try once more with stricter prompt
    if (!validation.valid) {
      const retryPrompt = `${userPrompt}\n\nIMPORTANT: Your previous response failed citation validation (${validation.reason}). You MUST include citation markers [1], [2], etc. and populate the sources array. If you cannot answer from the sources, say you don't have that information.`;

      const { text: retryText } = await generateText({
        model: gateway("openai/gpt-4o-mini"),
        system: systemPrompt,
        prompt: retryPrompt,
        maxOutputTokens: 2000,
        temperature: 0.1,
      });

      const retryResponse = parseLLMResponse(retryText, chunks);
      const retryValidation = validateCitations(retryResponse, chunks);

      if (retryValidation.valid) {
        response = retryResponse;
      } else {
        // Fall back to constructed response
        response = buildFallbackResponse(chunks);
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";

    // Don't expose internal errors to client
    if (message.includes("API key") || message.includes("DATABASE_URL") || message.includes("gateway")) {
      return NextResponse.json(
        { error: "Service configuration error. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate a response. Please try again." },
      { status: 500 }
    );
  }
}
