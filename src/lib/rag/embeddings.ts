import { embed, embedMany } from "ai";
import { upsertChunk, deleteStaleChunks } from "@/lib/db";
import type { ContentChunk } from "./chunker";

const EMBEDDING_MODEL = "openai/text-embedding-3-small";
const BATCH_SIZE = 96;

export async function embedText(text: string): Promise<number[]> {
  const result = await embed({
    model: EMBEDDING_MODEL,
    value: text,
  });
  return result.embedding;
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const result = await embedMany({
      model: EMBEDDING_MODEL,
      values: batch,
    });
    allEmbeddings.push(...result.embeddings);

    // Small delay between batches
    if (i + BATCH_SIZE < texts.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return allEmbeddings;
}

export interface IndexingResult {
  url: string;
  chunksIndexed: number;
  chunksSkipped: number;
  chunksDeleted: number;
}

export async function indexChunks(
  chunks: ContentChunk[]
): Promise<IndexingResult[]> {
  // Group chunks by URL
  const chunksByUrl = new Map<string, ContentChunk[]>();
  for (const chunk of chunks) {
    const existing = chunksByUrl.get(chunk.url) || [];
    existing.push(chunk);
    chunksByUrl.set(chunk.url, existing);
  }

  const results: IndexingResult[] = [];

  for (const [url, urlChunks] of chunksByUrl) {
    let indexed = 0;
    let skipped = 0;

    // Get embeddings for all chunks at once
    const texts = urlChunks.map((c) => c.content);
    const embeddings = await embedTexts(texts);

    for (let i = 0; i < urlChunks.length; i++) {
      const chunk = urlChunks[i];
      try {
        await upsertChunk({
          url: chunk.url,
          title: chunk.title,
          headingPath: chunk.headingPath,
          content: chunk.content,
          contentHash: chunk.contentHash,
          embedding: embeddings[i],
        });
        indexed++;
      } catch {
        skipped++;
      }
    }

    // Delete stale chunks for this URL
    const currentHashes = urlChunks.map((c) => c.contentHash);
    const deletedCount = await deleteStaleChunks(url, currentHashes);

    results.push({
      url,
      chunksIndexed: indexed,
      chunksSkipped: skipped,
      chunksDeleted: deletedCount,
    });
  }

  return results;
}
