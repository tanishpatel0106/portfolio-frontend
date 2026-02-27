import { neon } from "@neondatabase/serverless";

function getConnectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return url;
}

export function getSql() {
  return neon(getConnectionString());
}

export async function query(text: string, params?: unknown[]) {
  const sql = getSql();
  const rows = await sql.query(text, params);
  return { rows: rows as Record<string, unknown>[], rowCount: rows.length };
}

export async function initializeDatabase() {
  const sql = getSql();
  await sql`CREATE EXTENSION IF NOT EXISTS vector`;
  await sql`
    CREATE TABLE IF NOT EXISTS site_chunks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      heading_path TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL,
      content_hash TEXT NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      embedding vector(1536)
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_site_chunks_url ON site_chunks (url)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_site_chunks_content_hash ON site_chunks (content_hash)`;
}
