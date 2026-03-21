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
  ├── embeddings.ts             → Embedding generation via Vercel AI Gateway
  ├── store.ts                  → pgvector upsert + similarity search
  ├── retrieval.ts              → Top-K retrieval with keyword reranking
  ├── prompts.ts                → System prompts (strict citation enforcement)
  └── citation-validator.ts     → Citation validation + fallback responses
/src/lib/db/
  ├── connection.ts             → Neon serverless Postgres connection
  └── schema.sql                → SQL schema reference
/src/lib/rate-limit.ts          → In-memory IP-based rate limiter
```

---

## Environment Variables & Secrets — Where to Get Each One

Create a `.env.local` file in your project root:

```env
DATABASE_URL=postgresql://...
AI_GATEWAY_API_KEY=...
INDEXING_SECRET=...
SITE_BASE_URL=https://tanishpatel.dev
```

Here is exactly where each value comes from:

### 1. `DATABASE_URL` — Neon Postgres connection string

> **Where:** Neon console → your project → **Connection Details** panel

**Steps:**
1. Go to [neon.tech](https://neon.tech) and sign up / sign in.
2. Click **New Project** → give it a name (e.g. `portfolio-chat`) → create it.
3. On the project dashboard, you'll see the **Connection Details** panel with a connection string like:
   ```
   postgresql://neondb_owner:abc123xyz@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Copy the full string — that's your `DATABASE_URL`.
5. pgvector is **already enabled** on Neon by default. The table is auto-created on first indexing run.

**If using Vercel Marketplace integration (recommended):**
1. Go to [vercel.com/marketplace/neon](https://vercel.com/marketplace/neon) and click **Add Integration**.
2. Select your Vercel project → follow the Neon setup wizard.
3. This **automatically** adds `DATABASE_URL` (and related vars) to your Vercel project's environment variables — no manual copy needed.

---

### 2. `AI_GATEWAY_API_KEY` — Vercel AI Gateway key

> **Where:** Vercel dashboard → **AI Gateway** tab → **API Keys**

**Steps:**
1. Go to your Vercel team dashboard: `https://vercel.com/[your-team]/~/ai`
   (or click the **AI Gateway** tab in the left sidebar of your Vercel dashboard).
2. In the left sidebar, click **API Keys**.
3. Click **Add key** → **Create key**.
4. Copy the generated key — that's your `AI_GATEWAY_API_KEY`.

**Notes:**
- **On Vercel deployments** (production/preview), AI Gateway authenticates automatically via OIDC — you do NOT need this key in your Vercel environment variables. It just works.
- **For local development**, you have two options:
  - Set `AI_GATEWAY_API_KEY` in `.env.local` (easiest), OR
  - Run `vercel dev` instead of `npm run dev` to get automatic OIDC token refresh.
- New Vercel accounts get **$5 free AI credits every 30 days** — enough for testing.
- **BYOK (Bring Your Own Key):** To avoid gateway credit charges, go to Vercel dashboard → AI Gateway → **Settings** → add your own OpenAI API key. The gateway then uses your key with 0% markup.

---

### 3. `INDEXING_SECRET` — Protect the indexing endpoint

> **Where:** You generate this yourself.

**Steps:**
1. Generate a random secret string. Run this in your terminal:
   ```bash
   openssl rand -base64 32
   ```
   This produces something like: `K7x2mP9qR4...bN1wZ5vT8=`
2. Use that as your `INDEXING_SECRET`.
3. You'll pass this same value as a Bearer token when triggering the indexer:
   ```bash
   curl -X POST https://your-site.vercel.app/api/index \
     -H "Authorization: Bearer K7x2mP9qR4...bN1wZ5vT8="
   ```

**Why it exists:** The `/api/index` endpoint crawls your entire site and writes to the database. Without this secret, anyone could trigger re-indexing or abuse the endpoint.

---

### 4. `SITE_BASE_URL` — Your portfolio's public URL

> **Where:** You already know this — it's your site's URL.

- **Production:** `https://tanishpatel.dev` (or your custom domain)
- **Local dev:** `http://localhost:3000`

The crawler uses this to fetch your pages. Make sure the site is actually running at this URL when you trigger indexing.

---

## Database Setup (Neon Postgres)

### Option A: Via Vercel Marketplace (recommended)

1. Go to [vercel.com/marketplace/neon](https://vercel.com/marketplace/neon)
2. Click **Add Integration** → select your project → create a Neon database
3. `DATABASE_URL` is automatically injected into your Vercel project
4. pgvector is enabled by default on Neon — no extra setup needed
5. Tables are auto-created on the first indexing run

### Option B: Direct Neon setup

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the connection string from the dashboard
3. Set it as `DATABASE_URL` in your `.env.local` and in Vercel environment variables
4. Tables are auto-created on the first indexing run

### Option C: Local Postgres with pgvector (for development)

```bash
docker run -d --name pgvector \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=portfolio \
  -p 5432:5432 \
  pgvector/pgvector:pg16
```

Set `DATABASE_URL=postgresql://postgres:password@localhost:5432/portfolio` in `.env.local`.

---

## Running the Indexer

### Locally

```bash
# Start your dev server (so the crawler can reach your site)
npm run dev

# In another terminal, trigger indexing:
curl -X POST http://localhost:3000/api/index \
  -H "Authorization: Bearer <your-INDEXING_SECRET>"
```

### In Production

```bash
curl -X POST https://your-domain.vercel.app/api/index \
  -H "Authorization: Bearer <your-INDEXING_SECRET>"
```

The indexer:
1. Crawls all pages (prefers `/sitemap.xml`, falls back to link crawling)
2. Extracts clean content (removes nav/footer/boilerplate)
3. Chunks by headings with 200-char overlap
4. Generates embeddings via Vercel AI Gateway (`openai/text-embedding-3-small`)
5. Upserts into Neon pgvector with content-hash change detection
6. Removes stale chunks from deleted pages

### Re-indexing

Run the same POST request anytime you update your site. The indexer uses content hashes to skip unchanged content, so re-indexing is incremental and fast.

---

## How the Chat Works

1. User sends a question
2. `/api/chat` embeds the question and retrieves top-10 similar chunks via cosine similarity
3. Chunks are passed as context to `openai/gpt-4.1-nano` (via Vercel AI Gateway) with a strict citation prompt
4. Response is validated for citations; if invalid, regenerated once
5. UI renders the answer with numbered footnotes and source cards

---

## Deploying on Vercel

1. Push this branch to GitHub
2. Connect the repo to Vercel
3. Add the Neon integration from Vercel Marketplace (auto-sets `DATABASE_URL`)
4. Add these environment variables in Vercel project settings:
   - `INDEXING_SECRET` — your generated secret (see above)
   - `SITE_BASE_URL` — your site's public URL
   - (AI Gateway auth is automatic on Vercel via OIDC — no key needed)
   - Optionally: go to AI Gateway → Settings → add BYOK OpenAI key for 0% markup
5. Deploy
6. Run the indexer once via curl (see above)
7. Visit `/chat` on your deployed site

---

## Safety Features

- **Strict grounding**: LLM is instructed to only use provided sources
- **Citation validation**: Responses without citations are regenerated or replaced with fallback
- **Injection defense**: System prompt ignores instructions found in website content
- **Rate limiting**: 15 requests/minute per IP
- **Input sanitization**: Questions capped at 1,000 characters
- **Error boundaries**: Internal errors are not exposed to users
