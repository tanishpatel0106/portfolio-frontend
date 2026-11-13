# tanishpatel.dev

Personal portfolio of Tanish Patel (data scientist, AI engineer, quant), live at [tanishpatel.dev](https://tanishpatel.dev).

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, [Aceternity UI](https://ui.aceternity.com) components and Motion. The design plan and its status are in [`docs/REVAMP_PLAN.md`](docs/REVAMP_PLAN.md).

## Run it

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

Only `ANTHROPIC_API_KEY` is needed for a full local run (it powers `/chat`). Every other variable in `.env.example` is optional, and the feature it controls switches itself off when the variable is missing.

## Where things live

| Path | What it is |
|---|---|
| `src/constants/*` | All content: projects, research, work history, education, socials, site facts. |
| `src/app/blog/<slug>/content.mdx` | Articles (MDX). |
| `src/lib/projects.ts` | Reads the projects and derives link type, category and live status. |
| `src/lib/portfolio-knowledge.ts` | Builds the chat's system prompt from the same content. |
| `src/components/ui/*` | Aceternity and shadcn components (installed through the shadcn CLI). |
| `src/components/shared/*` | Site building blocks: section headings, buttons, video player, live-demo frame. |
| `src/app/api/*` | Chat, app status, contact form and view counts. |
| `scripts/ingest-video.mjs` | Prepares and uploads project videos. |

Add an Aceternity component with:

```bash
npx shadcn@latest add @aceternity/<component-name>
```

## Adding a project

Add an entry to `src/constants/products.tsx`. The original fields (`title`, `description`, `thumbnail`, `images`, `href`, `slug`, `stack`, `content`) are all that is required. The site works out the rest from `href`:

- a GitHub URL becomes the "Source" link;
- a deployed app (`*.vercel.app`, `*.fly.dev`, `*.onrender.com`, `*.hf.space`, …) becomes an embedded live demo;
- any other website becomes a "Live site" that opens in a new tab;
- DOI, Springer, Drive and Slides links are labelled as papers, reports or slides.

Optional fields (see `src/types/products.tsx`):

```ts
featured: true,                 // lead the home page
year: 2026,
category: "finance",            // finance | agents | ml | research | systems
metrics: [{ label: "Clients", value: "200+" }],
repoUrl: "https://github.com/…", // when href points at the live app
live: {
  kind: "iframe",               // iframe | external | powerbi | in-browser
  url: "https://my-app.fly.dev",
  healthUrl: "https://my-app.fly.dev/health",
  note: "Read-only demo with sample data",
},
video: { src: "…mp4", webm: "…webm", poster: "…webp", duration: 20 },
```

Every project with `featured: true` becomes a tab in the scroll showcase at the top of the home page (if none is featured, the first project is used). The grid below it shows the next projects in file order.

Write-ups animate paragraph by paragraph on the project page. Each top-level `<p>` in `content` is one step; give it a short label with `data-label`:

```tsx
content: (
  <div>
    <p data-label="Problem">…</p>
    <p data-label="Data">…</p>
  </div>
),
```

`imageAlt` is an optional list of alt texts in the same order as `images`.

### Live apps

A project with a live app appears in the Live Lab (`/lab`) and gets a status dot from `/api/status`, which pings its `healthUrl` (cached for 60 seconds). Apps on free hosting sleep when idle; the demo frame wakes them and shows a loader while they start. `vercel.json` schedules a daily warm-up call. For an app to be embedded it must allow framing from `tanishpatel.dev`.

### Videos (Brag)

1. Run `/brag` in the project's repository to produce `brag-output/brag.mp4`.
2. Prepare it for the site:

```bash
node scripts/ingest-video.mjs <project-slug> path/to/brag.mp4 --poster-at 5
```

3. Paste the printed `video: { … }` snippet into the project's entry.

The script needs FFmpeg. It writes a compressed MP4 and a poster image to `public/videos/`, which you commit with the site; a 20-second clip comes out at about 2 MB. `--poster-at` picks the frame (in seconds) used as the poster. For long or numerous videos, add `--blob` to upload to Vercel Blob instead (needs `BLOB_READ_WRITE_TOKEN`), which keeps them out of git.

A project with a video and no deployment is listed with the live apps in the Live Lab, in the same browser frame, marked "Video demo".

## AI chat

`/chat` streams answers from Claude through `src/app/api/chat/route.ts`.

- **Knowledge:** generated from `src/constants/*`, so new projects, papers and roles are picked up on the next build. `src/constants/system-prompt.ts` holds only the assistant's voice and guidelines.
- **Model:** `claude-opus-5-5` by default. Set `CHAT_MODEL` to use another (for example `claude-haiku-5-5` to lower cost).
- **Cards:** the assistant can call a `show_cards` tool, which renders clickable project and paper cards in the conversation.
- **Limits:** 12 messages per 5 minutes and 80 per day per visitor, 4,000 characters per message, last 20 messages of history.
- **Hand-off:** `/chat?q=…` asks a question immediately. The home page, project pages and the ⌘K palette use it.

## Environment variables

| Variable | Needed for |
|---|---|
| `ANTHROPIC_API_KEY` | AI chat (required for `/chat`) |
| `CHAT_MODEL` | Optional chat model override |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | View counts and rate limits shared across instances |
| `GITHUB_TOKEN` | Higher GitHub API limit for repo stats |
| `BLOB_READ_WRITE_TOKEN` | Video uploads from `scripts/ingest-video.mjs` |

## Preferences

Visitors can switch light/dark theme, pick an accent colour and pause motion. The accent options are defined in `src/app/globals.css` (`[data-accent="…"]`) and `src/constants/site.ts`; change `DEFAULT_ACCENT` to set the default.
