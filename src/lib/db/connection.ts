import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    pool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }
  return pool;
}

export async function query(text: string, params?: unknown[]) {
  const client = await getPool().connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

export async function initializeDatabase() {
  await query("CREATE EXTENSION IF NOT EXISTS vector");
  await query(`
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
  `);
  await query(`
    CREATE INDEX IF NOT EXISTS idx_site_chunks_url ON site_chunks (url)
  `);
  await query(`
    CREATE INDEX IF NOT EXISTS idx_site_chunks_content_hash ON site_chunks (content_hash)
  `);
  // Use ivfflat index for vector similarity search
  // Only create if there are enough rows; otherwise Postgres will use sequential scan
  const countResult = await query("SELECT COUNT(*) FROM site_chunks");
  const count = parseInt(countResult.rows[0].count, 10);
  if (count >= 10) {
    await query(`
      CREATE INDEX IF NOT EXISTS idx_site_chunks_embedding
      ON site_chunks USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = ${Math.max(1, Math.floor(Math.sqrt(count)))})
    `).catch(() => {
      // Index may already exist with different parameters; that's fine
    });
  }
}
