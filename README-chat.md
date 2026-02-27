# Chat About Me — RAG Feature

A production-ready "Chat About Me" feature that lets visitors ask questions about your portfolio. Answers are grounded exclusively in your website's content with full source citations.

## Architecture

```
/src/app/chat/page.tsx          → Chat UI (thread + sources panel)
/src/app/api/chat/route.ts      → RAG chat endpoint
/src/app/api/index/route.ts     → Protected indexing endpoint
/src/lib/rag/
  ├── types.ts                  → Shared TypeScript types
  ├── crawler.ts                → Sitemap + link crawling
  ├── extractor.ts              → HTML → clean text (cheerio)
  ├── chunker.ts                → Heading-based chunking with overlap
  ├── embeddings.ts             → OpenAI embedding generation
  ├── store.ts                  → pgvector upsert + similarity search
  ├── retrieval.ts              → Top-K retrieval with keyword reranking
  ├── prompts.ts                → System prompts (strict citation enforcement)
  └── citation-validator.ts     → Citation validation + fallback responses
/src/lib/db/
  ├── connection.ts             → Postgres connection pool
  └── schema.sql                → SQL schema reference
/src/lib/rate-limit.ts          → In-memory IP-based rate limiter
```

## Environment Variables

Create a `.env.local` file with:

```env
# PostgreSQL with pgvector extension enabled
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio?sslmode=disable

# OpenAI API key for embeddings + chat completion
OPENAI_API_KEY=sk-...

# Secret token to protect the indexing endpoint
INDEXING_SECRET=your-random-secret-here

# Your portfolio site's public URL (used by the crawler)
SITE_BASE_URL=https://tanishpatel.dev
```

## Database Setup

### Option A: Local Postgres with pgvector

```bash
# Install pgvector extension (Ubuntu/Debian)
sudo apt install postgresql-16-pgvector

# Or with Docker
docker run -d --name pgvector \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=portfolio \
  -p 5432:5432 \
  pgvector/pgvector:pg16

# The tables are created automatically on first indexing run.
# Or apply manually:
psql $DATABASE_URL < src/lib/db/schema.sql
```

### Option B: Vercel Postgres

1. Go to your Vercel project → Storage → Create Database → Postgres
2. Enable the pgvector extension in the SQL console: `CREATE EXTENSION vector;`
3. The `DATABASE_URL` is automatically available in Vercel environment variables.

## Running the Indexer

### Locally

```bash
# Start your dev server (so the crawler can reach your site)
npm run dev

# In another terminal, trigger indexing:
curl -X POST http://localhost:3000/api/index \
  -H "Authorization: Bearer your-random-secret-here"
```

### In Production

```bash
# After deploying, trigger indexing against your live site:
curl -X POST https://your-domain.vercel.app/api/index \
  -H "Authorization: Bearer your-random-secret-here"
```

The indexer:
1. Crawls all pages (prefers `/sitemap.xml`, falls back to link crawling)
2. Extracts clean content (removes nav/footer/boilerplate)
3. Chunks by headings with 200-char overlap
4. Generates embeddings via OpenAI `text-embedding-3-small`
5. Upserts into pgvector with content-hash change detection
6. Removes stale chunks from deleted pages

### Re-indexing

Run the same POST request anytime you update your site. The indexer uses content hashes to skip unchanged content, so re-indexing is incremental and fast.

## How the Chat Works

1. User sends a question
2. `/api/chat` embeds the question and retrieves top-10 similar chunks
3. Chunks are passed as context to GPT-4o-mini with a strict citation prompt
4. Response is validated for citations; if invalid, regenerated once
5. UI renders the answer with numbered footnotes and source cards

## Deploying on Vercel

1. Push this branch to GitHub
2. Connect the repo to Vercel
3. Add environment variables in Vercel project settings:
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
   - `INDEXING_SECRET`
   - `SITE_BASE_URL`
4. Deploy
5. Run the indexer once via curl (see above)
6. Visit `/chat` on your deployed site

## Safety Features

- **Strict grounding**: LLM is instructed to only use provided sources
- **Citation validation**: Responses without citations are regenerated or replaced with fallback
- **Injection defense**: System prompt ignores instructions found in website content
- **Rate limiting**: 15 requests/minute per IP
- **Input sanitization**: Questions capped at 1,000 characters
- **Error boundaries**: Internal errors are not exposed to users
