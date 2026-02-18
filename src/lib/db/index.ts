import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const sql = neon(process.env.DATABASE_URL);

export interface SiteChunk {
  id: string;
  url: string;
  title: string;
  heading_path: string | null;
  content: string;
  content_hash: string;
  updated_at: string;
  embedding?: number[];
}

export interface RetrievedChunk extends SiteChunk {
  similarity: number;
}

export async function getChunksByUrl(url: string): Promise<SiteChunk[]> {
  const rows = await sql`
    SELECT id, url, title, heading_path, content, content_hash, updated_at
    FROM site_chunks
    WHERE url = ${url}
  `;
  return rows as SiteChunk[];
}

export async function upsertChunk(chunk: {
  url: string;
  title: string;
  headingPath: string | null;
  content: string;
  contentHash: string;
  embedding: number[];
}): Promise<void> {
  const embeddingStr = `[${chunk.embedding.join(",")}]`;
  await sql`
    INSERT INTO site_chunks (url, title, heading_path, content, content_hash, embedding, updated_at)
    VALUES (${chunk.url}, ${chunk.title}, ${chunk.headingPath}, ${chunk.content}, ${chunk.contentHash}, ${embeddingStr}::vector, NOW())
    ON CONFLICT (content_hash) DO UPDATE SET
      url = EXCLUDED.url,
      title = EXCLUDED.title,
      heading_path = EXCLUDED.heading_path,
      content = EXCLUDED.content,
      embedding = EXCLUDED.embedding,
      updated_at = NOW()
  `;
}

export async function deleteStaleChunks(
  url: string,
  currentHashes: string[]
): Promise<number> {
  if (currentHashes.length === 0) {
    const result = await sql`
      DELETE FROM site_chunks WHERE url = ${url}
    `;
    return result.length;
  }

  const result = await sql`
    DELETE FROM site_chunks
    WHERE url = ${url}
    AND content_hash != ALL(${currentHashes}::text[])
  `;
  return result.length;
}

export async function searchChunks(
  queryEmbedding: number[],
  topK: number = 10
): Promise<RetrievedChunk[]> {
  const embeddingStr = `[${queryEmbedding.join(",")}]`;
  const rows = await sql`
    SELECT
      id, url, title, heading_path, content, content_hash, updated_at,
      1 - (embedding <=> ${embeddingStr}::vector) as similarity
    FROM site_chunks
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${embeddingStr}::vector
    LIMIT ${topK}
  `;
  return rows as RetrievedChunk[];
}

export async function getChunkCount(): Promise<number> {
  const result = await sql`SELECT COUNT(*) as count FROM site_chunks`;
  return parseInt(result[0].count as string, 10);
}
