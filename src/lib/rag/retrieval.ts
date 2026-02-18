import { searchChunks, type RetrievedChunk } from "@/lib/db";
import { embedText } from "./embeddings";

export interface Source {
  id: string;
  url: string;
  title: string;
  headingPath: string | null;
  snippet: string;
  similarity: number;
}

function extractSnippet(content: string, maxLength: number = 300): string {
  if (content.length <= maxLength) return content;
  // Try to break at a sentence boundary
  const truncated = content.slice(0, maxLength);
  const lastSentence = truncated.lastIndexOf(". ");
  if (lastSentence > maxLength * 0.5) {
    return truncated.slice(0, lastSentence + 1);
  }
  return truncated + "...";
}

export async function retrieveRelevantChunks(
  query: string,
  topK: number = 10,
  minSimilarity: number = 0.3
): Promise<{ chunks: RetrievedChunk[]; sources: Source[] }> {
  const queryEmbedding = await embedText(query);
  const chunks = await searchChunks(queryEmbedding, topK);

  // Filter by minimum similarity
  const relevantChunks = chunks.filter((c) => c.similarity >= minSimilarity);

  const sources: Source[] = relevantChunks.map((chunk) => ({
    id: chunk.id,
    url: chunk.url,
    title: chunk.title,
    headingPath: chunk.heading_path,
    snippet: extractSnippet(chunk.content),
    similarity: chunk.similarity,
  }));

  return { chunks: relevantChunks, sources };
}

export function buildContextFromChunks(
  chunks: RetrievedChunk[],
  sources: Source[]
): string {
  if (chunks.length === 0) {
    return "No relevant content was found on the website for this question.";
  }

  const contextParts = chunks.map((chunk, index) => {
    const sourceNum = index + 1;
    const heading = chunk.heading_path ? ` | Section: ${chunk.heading_path}` : "";
    return `[SOURCE ${sourceNum}] (${sources[index].url}${heading})\n${chunk.content}`;
  });

  return contextParts.join("\n\n---\n\n");
}
