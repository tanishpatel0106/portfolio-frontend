CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS site_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  heading_path TEXT,
  content TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  embedding vector(1536)
);

CREATE INDEX IF NOT EXISTS idx_site_chunks_url ON site_chunks (url);
CREATE INDEX IF NOT EXISTS idx_site_chunks_content_hash ON site_chunks (content_hash);
