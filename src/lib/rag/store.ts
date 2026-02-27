import { query } from "@/lib/db/connection";
import { Chunk } from "./chunker";
import { RetrievedChunk } from "./types";

/** Convert a number array to pgvector text format: [0.1,0.2,...] */
function toVectorString(embedding: number[]): string {
  return `[${embedding.join(",")}]`;
}

export async function upsertChunks(
  chunks: Chunk[],
  embeddings: number[][]
): Promise<{ inserted: number; updated: number; unchanged: number }> {
  let inserted = 0;
  let updated = 0;
  let unchanged = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const embedding = embeddings[i];
    const embeddingStr = toVectorString(embedding);

    // Check if a chunk with this URL and heading_path exists
    const existing = await query(
      `SELECT id, content_hash FROM site_chunks
       WHERE url = $1 AND heading_path = $2
       LIMIT 1`,
      [chunk.url, chunk.headingPath]
    );

    if (existing.rows.length > 0) {
      if (existing.rows[0].content_hash === chunk.contentHash) {
        unchanged++;
        continue;
      }
      // Update existing chunk
      await query(
        `UPDATE site_chunks
         SET content = $1, content_hash = $2, title = $3, embedding = $4, updated_at = NOW()
         WHERE id = $5`,
        [chunk.content, chunk.contentHash, chunk.title, embeddingStr, existing.rows[0].id as string]
      );
      updated++;
    } else {
      // Insert new chunk
      await query(
        `INSERT INTO site_chunks (url, title, heading_path, content, content_hash, embedding)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [chunk.url, chunk.title, chunk.headingPath, chunk.content, chunk.contentHash, embeddingStr]
      );
      inserted++;
    }
  }

  return { inserted, updated, unchanged };
}

export async function removeStaleChunks(activeUrls: string[]): Promise<number> {
  if (activeUrls.length === 0) return 0;
  const placeholders = activeUrls.map((_, i) => `$${i + 1}`).join(", ");
  const result = await query(
    `DELETE FROM site_chunks WHERE url NOT IN (${placeholders})`,
    activeUrls
  );
  return result.rowCount || 0;
}

export async function searchChunks(
  embedding: number[],
  topK: number = 10,
  similarityThreshold?: number
): Promise<RetrievedChunk[]> {
  const embeddingStr = toVectorString(embedding);
  const result = await query(
    `SELECT
       id, url, title, heading_path, content,
       1 - (embedding <=> $1::vector) AS similarity
     FROM site_chunks
     WHERE embedding IS NOT NULL
     ORDER BY embedding <=> $1::vector
     LIMIT $2`,
    [embeddingStr, topK]
  );

  return result.rows
    .filter((row) =>
      typeof similarityThreshold === "number"
        ? (row.similarity as number) >= similarityThreshold
        : true
    )
    .map((row) => ({
      id: row.id as string,
      url: row.url as string,
      title: row.title as string,
      headingPath: row.heading_path as string,
      content: row.content as string,
      similarity: row.similarity as number,
    }));
}

export async function getChunkCount(): Promise<number> {
  const result = await query("SELECT COUNT(*)::int AS total FROM site_chunks");
  const total = result.rows[0]?.total;
  return typeof total === "number" ? total : Number(total || 0);
}
