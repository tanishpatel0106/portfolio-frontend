import fs from "fs/promises";
import path from "path";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

const EMBEDDING_MODEL = "text-embedding-3-small";
const TOP_K = 10;
const MIN_SCORE = 0.25;

export type RetrievedChunk = {
  chunk_id: string;
  url: string;
  title: string;
  section_heading: string;
  text: string;
  score: number;
};

type RagChunk = {
  chunk_id: string;
  url: string;
  title: string;
  section_heading: string;
  text: string;
  embedding: number[];
};

type RagIndex = {
  siteUrl: string;
  builtAt: string;
  chunks: RagChunk[];
};

const globalForRag = globalThis as typeof globalThis & {
  ragIndex?: RagIndex;
};

const cosineSimilarity = (a: number[], b: number[]) => {
  let dot = 0;
  let aNorm = 0;
  let bNorm = 0;

  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    aNorm += a[i] * a[i];
    bNorm += b[i] * b[i];
  }

  if (aNorm === 0 || bNorm === 0) return 0;
  return dot / (Math.sqrt(aNorm) * Math.sqrt(bNorm));
};

const loadIndex = async () => {
  if (globalForRag.ragIndex) {
    return globalForRag.ragIndex;
  }

  const indexPath = path.join(process.cwd(), "rag", "rag_index.json");
  const raw = await fs.readFile(indexPath, "utf-8");
  const parsed = JSON.parse(raw) as RagIndex;
  globalForRag.ragIndex = parsed;
  return parsed;
};

export const retrieveChunks = async (
  query: string
): Promise<RetrievedChunk[]> => {
  const index = await loadIndex();
  const { embedding } = await embed({
    model: openai.embedding(EMBEDDING_MODEL),
    value: query,
  });

  const scored = index.chunks.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(embedding, chunk.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, TOP_K);
  if (top.length === 0 || top[0].score < MIN_SCORE) {
    return [];
  }

  return top;
};
