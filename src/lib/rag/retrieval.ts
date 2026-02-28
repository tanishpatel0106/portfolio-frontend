import { embedQuery } from "./embeddings";
import { searchChunks, searchChunksByTerms } from "./store";
import { RetrievedChunk } from "./types";

const DEFAULT_TOP_K = 28;
const PRIMARY_SIMILARITY_THRESHOLD = 0.25;
const MIN_RESULTS_BEFORE_FALLBACK = 8;
const FALLBACK_TOP_K = 48;
const KEYWORD_TOP_K = 48;
const MAX_QUERY_VARIANTS = 5;

function buildSearchQueries(userQuery: string): string[] {
  const normalized = userQuery.trim();
  const queries = [normalized];

  // Add portfolio-context variants so short queries still retrieve personal/about content.
  queries.push(`Tanish Patel ${normalized}`);

  if (!/project|research|blog|experience|education|skill|about/i.test(normalized)) {
    queries.push(`Tanish Patel portfolio ${normalized}`);
  }

  // Broader personal summary retrieval can help answer biography-style questions.
  queries.push(`about Tanish Patel background achievements`);

  // Explicit website-wide phrasing increases recall for broad category questions.
  queries.push(`all portfolio pages ${normalized}`);

  return Array.from(new Set(queries)).slice(0, MAX_QUERY_VARIANTS);
}

function rerankChunks(chunks: RetrievedChunk[], userQuery: string): RetrievedChunk[] {
  const queryTerms = userQuery.toLowerCase().split(/\s+/).filter((t) => t.length > 2);

  const reranked = chunks.map((chunk) => {
    const lowerContent = chunk.content.toLowerCase();
    const lowerTitle = chunk.title.toLowerCase();
    const lowerHeading = chunk.headingPath.toLowerCase();

    let bonus = 0;

    for (const term of queryTerms) {
      if (lowerContent.includes(term)) bonus += 0.015;
      if (lowerTitle.includes(term)) bonus += 0.03;
      if (lowerHeading.includes(term)) bonus += 0.02;
    }

    return {
      ...chunk,
      similarity: Math.min(1, chunk.similarity + bonus),
    };
  });

  reranked.sort((a, b) => b.similarity - a.similarity);
  return reranked;
}

export async function retrieveRelevantChunks(
  userQuery: string,
  topK: number = DEFAULT_TOP_K
): Promise<RetrievedChunk[]> {
  const queryVariants = buildSearchQueries(userQuery);

  const semanticResults = await Promise.all(
    queryVariants.map(async (queryVariant) => {
      const queryEmbedding = await embedQuery(queryVariant);
      let chunks = await searchChunks(queryEmbedding, topK, PRIMARY_SIMILARITY_THRESHOLD);

      // If strict thresholding is too aggressive, widen recall and let reranking sort relevance.
      if (chunks.length < MIN_RESULTS_BEFORE_FALLBACK) {
        chunks = await searchChunks(queryEmbedding, Math.max(topK, FALLBACK_TOP_K));
      }

      return chunks;
    })
  );

  const keywordResults = await Promise.all(
    queryVariants.map((queryVariant) => searchChunksByTerms(queryVariant, Math.max(KEYWORD_TOP_K, topK)))
  );

  // Deduplicate by chunk id and keep the highest similarity score observed across variants.
  const mergedById = new Map<string, RetrievedChunk>();
  for (const resultSet of [...semanticResults, ...keywordResults]) {
    for (const chunk of resultSet) {
      const existing = mergedById.get(chunk.id);
      if (!existing || chunk.similarity > existing.similarity) {
        mergedById.set(chunk.id, chunk);
      }
    }
  }

  const reranked = rerankChunks(Array.from(mergedById.values()), userQuery);
  return reranked.slice(0, Math.max(topK, DEFAULT_TOP_K));
}
