-- Enable pgvector extension (already enabled on Neon by default)
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the site_chunks table for storing indexed website content
CREATE TABLE IF NOT EXISTS site_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  heading_path TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  embedding vector(1536)
);

-- Index for URL-based lookups
CREATE INDEX IF NOT EXISTS idx_site_chunks_url ON site_chunks (url);

-- Index for content hash (change detection)
CREATE INDEX IF NOT EXISTS idx_site_chunks_content_hash ON site_chunks (content_hash);

-- HNSW vector similarity search index (recommended for Neon)
-- For small datasets (<100 rows), Postgres uses sequential scan automatically.
-- Uncomment once you have enough data:
-- CREATE INDEX IF NOT EXISTS idx_site_chunks_embedding
--   ON site_chunks USING hnsw (embedding vector_cosine_ops);
