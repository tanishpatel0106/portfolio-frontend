import { embedQuery } from "./embeddings";
import { searchChunks } from "./store";
import { RetrievedChunk } from "./types";

const DEFAULT_TOP_K = 10;
const SIMILARITY_THRESHOLD = 0.25;

export async function retrieveRelevantChunks(
  userQuery: string,
  topK: number = DEFAULT_TOP_K
): Promise<RetrievedChunk[]> {
  const queryEmbedding = await embedQuery(userQuery);
  const chunks = await searchChunks(queryEmbedding, topK, SIMILARITY_THRESHOLD);

  // Simple reranking: boost exact keyword matches
  const queryTerms = userQuery.toLowerCase().split(/\s+/).filter((t) => t.length > 2);

  const reranked = chunks.map((chunk) => {
    const lowerContent = chunk.content.toLowerCase();
    let bonus = 0;
    for (const term of queryTerms) {
      if (lowerContent.includes(term)) {
        bonus += 0.02;
      }
    }
    // Boost title matches more
    const lowerTitle = chunk.title.toLowerCase();
    for (const term of queryTerms) {
      if (lowerTitle.includes(term)) {
        bonus += 0.03;
      }
    }
    return {
      ...chunk,
      similarity: Math.min(1, chunk.similarity + bonus),
    };
  });

  // Re-sort by boosted similarity
  reranked.sort((a, b) => b.similarity - a.similarity);

  return reranked;
}
