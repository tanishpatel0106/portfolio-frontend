import { ChatResponse, RetrievedChunk } from "./types";

interface ValidationResult {
  valid: boolean;
  reason?: string;
}

export function validateCitations(response: ChatResponse, chunks: RetrievedChunk[]): ValidationResult {
  // A "don't know" response is valid without sources
  const dontKnowPhrases = [
    "don't have that",
    "not on the site",
    "don't have information",
    "no information available",
    "couldn't find",
    "not available on the site",
    "don't have that information",
  ];

  const lowerAnswer = response.answer.toLowerCase();
  const isDontKnow = dontKnowPhrases.some((phrase) => lowerAnswer.includes(phrase));

  if (isDontKnow) {
    return { valid: true };
  }

  // Non-"don't know" responses must have sources
  if (!response.sources || response.sources.length === 0) {
    return { valid: false, reason: "Response contains claims but no sources are cited." };
  }

  // Check that cited chunk IDs exist in retrieved chunks
  const validChunkIds = new Set(chunks.map((c) => c.id));
  const invalidIds = response.usedChunkIds.filter((id) => !validChunkIds.has(id));
  if (invalidIds.length > 0) {
    return {
      valid: false,
      reason: `Response references chunk IDs not in retrieved set: ${invalidIds.join(", ")}`,
    };
  }

  // Check that the answer contains citation markers
  const citationPattern = /\[\d+\]/;
  if (!citationPattern.test(response.answer)) {
    return { valid: false, reason: "Response lacks citation markers [1], [2], etc." };
  }

  return { valid: true };
}

export function parseLLMResponse(raw: string, chunks: RetrievedChunk[]): ChatResponse {
  // Try to extract JSON from the response
  let jsonStr = raw;

  // Handle markdown code blocks
  const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  try {
    const parsed = JSON.parse(jsonStr);

    // Validate structure
    const answer = typeof parsed.answer === "string" ? parsed.answer : raw;
    const sources = Array.isArray(parsed.sources)
      ? parsed.sources.filter(
          (s: { url?: string; title?: string; snippet?: string }) =>
            typeof s.url === "string" && typeof s.title === "string"
        )
      : [];
    const usedChunkIds = Array.isArray(parsed.usedChunkIds)
      ? parsed.usedChunkIds.filter((id: unknown) => typeof id === "string")
      : [];

    return { answer, sources, usedChunkIds };
  } catch {
    // If JSON parsing fails, construct a response from the raw text
    // Extract any citation references and map them to chunks
    const sources = chunks.slice(0, 3).map((chunk) => ({
      url: chunk.url,
      title: chunk.title,
      snippet: chunk.content.slice(0, 150) + "...",
    }));

    return {
      answer: raw,
      sources,
      usedChunkIds: chunks.slice(0, 3).map((c) => c.id),
    };
  }
}

export function buildFallbackResponse(chunks: RetrievedChunk[]): ChatResponse {
  if (chunks.length === 0) {
    return {
      answer: "I don't have that information on the site yet. You might want to explore the [Projects](/projects), [Research](/research), or [About](/about) pages for more information about Tanish.",
      sources: [],
      usedChunkIds: [],
    };
  }

  // Provide a generic response using available chunks
  const topChunks = chunks.slice(0, 3);
  const sources = topChunks.map((chunk) => ({
    url: chunk.url,
    title: chunk.title,
    snippet: chunk.content.slice(0, 150) + "...",
  }));

  return {
    answer: "I found some potentially relevant content on the site, but I'm not confident I can fully answer your question. Here are the most relevant pages you might want to check:\n\n" +
      topChunks.map((c, i) => `- [${i + 1}] **${c.title}** — ${c.content.slice(0, 100)}...`).join("\n"),
    sources,
    usedChunkIds: topChunks.map((c) => c.id),
  };
}
