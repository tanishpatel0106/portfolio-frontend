# Portfolio Frontend

## Build the Database (Vercel + Neon)

If you see:

`NeonDbError: relation "site_chunks" does not exist`

it means the RAG table has not been created/populated yet.

### 1) Set required environment variables

In Vercel Project Settings → Environment Variables, set:

- `DATABASE_URL` (from your Neon integration or Neon dashboard)
- `INDEXING_SECRET` (a random secret you generate)
- `SITE_BASE_URL` (your deployed site URL, e.g. `https://your-domain.vercel.app`)

Optional for local dev:
- `AI_GATEWAY_API_KEY`

Generate a secret with:

```bash
openssl rand -base64 32
```

### 2) Create schema (choose one)

#### Option A (recommended): Auto-create via API
Call the indexing route once (it runs DB initialization + indexing):

```bash
curl -X POST https://your-domain.vercel.app/api/index \
  -H "Authorization: Bearer <INDEXING_SECRET>"
```

This will create `site_chunks` and indexes if missing, then crawl and populate data.

#### Option B: Manual SQL
Run this SQL in Neon SQL Editor:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

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

CREATE INDEX IF NOT EXISTS idx_site_chunks_url ON site_chunks (url);
CREATE INDEX IF NOT EXISTS idx_site_chunks_content_hash ON site_chunks (content_hash);
```

Then still run the `/api/index` call above to fill the table with embeddings.

### 3) Verify it worked

- Re-run your chat request.
- If schema exists but no data, chat can return fallback answers.
- Run `/api/index` again after major content updates.

## Helpful docs

- Detailed RAG setup and deployment notes: `README-chat.md`

