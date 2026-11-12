# Portfolio Revamp Plan

A full visual and structural rebuild of the portfolio, with live applications, Brag launch videos, and a small backend layer. The content data (`src/constants/*`, the blog MDX files, and the types in `src/types/*`) stays as it is. Every new field is optional, so existing entries keep working without edits.

---

## 1. What the repo looks like today

### Stack (all of it is 2023-era)

| Piece | Current | Why it matters |
|---|---|---|
| Next.js | 13.4.19 | Two major versions behind. Current Aceternity blocks and templates target Next 15+ with React 19. |
| React | 18.2 | Same reason. |
| Tailwind | 3.3.3 | Aceternity's docs now put Tailwind v4 first (CSS-first `@import "tailwindcss"`). The custom `addVariablesForColors` plugin in `tailwind.config.ts` exists only to imitate what v4 does natively. |
| Animation | `framer-motion@10` | The package is now published as `motion` (`motion/react`), which is what the newer components import. |
| Icons | `@tabler/icons-react@2` | v3 renamed `TablerIconsProps` to `IconProps`. This affects `src/types/navlink.tsx`. |
| MDX | `@next/mdx@13` + `mdxRs` | Works, but each post needs its own `page.tsx` wrapper. `lib/getAllBlogs.ts` imports `fast-glob`, which isn't a direct dependency. |
| AI chat | `@anthropic-ai/sdk@0.80`, model `claude-sonnet-4-20250514` | Pinned to an old 2025 model snapshot. The thinking config needs re-checking against the current API when the model is upgraded. |

### Layout and UX problems

- **Scrolling happens inside a nested `div`, not the window** (`src/app/layout.tsx`: `h-screen overflow-hidden` on `body`, `overflow-y-auto` on the inner wrapper). This breaks most scroll-driven Aceternity components (Container Scroll, Macbook Scroll, Hero Parallax, Sticky Scroll Reveal, Tracing Beam). By default they read `window` scroll. Moving to window scroll is the first structural change.
- **Hydration mismatch in the sidebar.** `useState(isMobile() ? false : true)` evaluates differently on the server and the client.
- **No dark mode, no design tokens.** Colors are hard-coded (`bg-gray-100`, `text-sky-500`, `neutral-*`).
- **The home page is a stack of generic sections.** Emoji, then a heading, then a bento grid of 17 projects with equal weight, then a research carousel, then a logo grid. Nothing is ranked, nothing is live, nothing moves except fade-ins.
- **Product cards link out to GitHub when a project has no detail page**, and the button reads "Learn More / Unavailable as of now" when `href` is empty (`src/components/Product.tsx`). The visitor can't tell which projects are live, which are code, and which are papers.
- **`href` is overloaded.** It's a GitHub repo, a Vercel app, a Google Drive PDF, a Google Slides deck, a DOI, or a LinkedIn post, depending on the project.
- **The contact page exists but is commented out of the nav.**
- **SEO basics are missing.** There's no `sitemap`, `robots`, OG images, or JSON-LD. The same description ("…loves building products and solutions that can impact a solution to the community") is copied onto most pages.
- **Unused components:** `Circles.tsx`, `Lines.tsx`, and `Contact.tsx` (only the hidden contact page uses it).

### Asset weight

- `public/` is **73 MB**. Several screenshots are 2.5–8.7 MB PNGs and JPGs (`data-valuation-1.jpg` 8.7 MB, `SOC_1.png` 4.3 MB, `about.webp` 3.2 MB).
- `public/images/nlp2sql-4` is a duplicate of `nlp2sql-4.png` with no extension.
- Four large files at the repo root aren't referenced anywhere: `ARD_9329_1.JPG`, `TLPS-7344.jpg`, `SignaturePhoto.jpeg`, `resized_image.jpg`.
- `public/images/about.webp` isn't referenced either.
- Some filenames contain spaces (`Blog Image 2.webp`, `WhatsApp Image …`).

### Copy fixes to make during the rebuild

- `education.tsx`: "Data Sciene"
- `products.tsx`: "Restarurants"
- `resume/page.tsx`: "I'ts"
- Paperchase description is "A comprehensive financial intelligence platform". It's the strongest real-world credential and deserves a real one-liner with metrics (200+ clients, ~40% latency reduction, 15–20 h/month saved per client, all already in `timeline.tsx`).

### What's worth keeping

- The **data-driven chat** (`src/lib/portfolio-knowledge.ts` builds the system prompt from the same constants). This is a real differentiator, so the plan promotes it.
- The **content itself.** The project write-ups are long, specific and technical, which is better than most portfolios.
- **Route structure** (`/projects/[slug]`, `/research/[slug]`, `/blog/*`, `/resume`, `/chat`). Keeping these URLs means existing links on LinkedIn, the resume and Scholar keep working.

---

## 2. What the best portfolios do (research summary)

Patterns that recur across current roundups, and the sites usually cited:

| Pattern | Exemplars | Takeaway for this site |
|---|---|---|
| Pitch on the first screen: who, what, where, availability | Brittany Chiang (sticky pitch and career scroll), Dennis Snellenberg (location and availability badge), Rauno Freiberg (large-type statement) | One sentence, a role rotator, NYC, and "Open to full-time roles". |
| Proof before thumbnails: 3–6 deep case studies with outcomes | Chiang, Adham Dannaway, Abhishek Jha | Rank 4–6 flagship projects. Move the rest to an archive. |
| Site as demo | Bruno Simon, Active Theory | The live apps are the demo. One showpiece interaction, not twenty. |
| Content as portfolio | Josh Comeau, Lee Robinson, Steph Smith | Research papers, articles and the AI chat count as content. |
| Shipped products as an app-icon grid | Vijay Verma | Use this for the Live Apps lab page. |
| Outcome counters and "as seen in" rows | Benjamin Von Wong, Steph Smith | A metrics ticker (200+ clients, 8,192 coalitions, 4 papers) and an affiliations row (Columbia, IEEE Access, Springer, ACM SAC). |
| A visible "pause motion" control and reduced-motion support | Abhay Rohit | Respect `prefers-reduced-motion` and add a toggle in the footer. |
| Fast, accessible, maintained | All of them | Core Web Vitals targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1. WCAG 2.2. A visible "last updated" signal. |

The rule underneath all of these: **one strong idea, executed with restraint.** "All the newest Aceternity components" is a toolbox, not a design. The plan picks a concept first and maps each component to a job.

---

## 3. Design concept: "The Research Desk"

You sit between quant finance, applied ML and research. The site should feel like a modern trading and research terminal crossed with an editorial journal. It should be precise, data-dense where that helps, and calm everywhere else.

- **Dark-first, with a proper light theme.** The base is graphite (`#0A0A0B`), with off-white text and one signal accent. Candidates are electric lime, terminal amber, or cyan. **This choice is yours.**
- **Typography:** Geist Sans for the UI, **Geist Mono** for labels, metrics, tickers and stack tags (the "terminal" layer), and one editorial display serif (e.g. Instrument Serif) for big statements only.
- **Motifs:**
  - Ticker tapes for live metrics.
  - Status dots (● LIVE / ◐ WAKING / ○ VIDEO).
  - Grid and dot backgrounds.
  - Monospace section indices (`01 / WORK`).
- **Motion rules:**
  - At most **one heavy effect per viewport.**
  - Every animation has a reduced-motion fallback.
  - No scroll-jacking.
  - WebGL and shader effects load lazily and have static fallbacks.

### Information architecture (routes kept, nav relabeled)

```
/                     Home: pitch, live apps, selected work, research, experience, writing, ask-AI, contact
/projects             Work index: filters (Live · Video · Finance · ML · Research), grid/list toggle, archive
/projects/[slug]      Case study: Brag video hero, live demo frame, problem → approach → results, stack, metrics, gallery, next project
/lab        (new)     Live Apps launcher: app-icon grid with live status, cold-start wake-up, open in frame or new tab
/research             Papers: carousel and list, venue badges, PDF and BibTeX
/research/[slug]      Paper page: abstract, figures, inline PDF viewer, copy BibTeX, cite
/blog, /blog/*        Writing: MDX, reading time, tracing-beam layout
/about                Story, photos, map of places, "Now", hobbies
/resume               Experience timeline, education, leadership, downloadable PDF
/chat                 Full-page AI chat (also reachable from the ⌘K palette and a floating button)
/contact   (restored) Form backed by a real email API
```

---

## 4. Aceternity component map (each has a specific job)

Aceternity now installs through the shadcn CLI registry (`npx shadcn@latest add @aceternity/<name>`), so the plan starts with `shadcn init`. That also provides the base primitives: Dialog, Tabs, Tooltip, Sheet, Command.

| Area | Component(s) | Use |
|---|---|---|
| **Global shell** | **Resizable Navbar** (desktop, shrinks on scroll) · **Floating Dock** (mobile bottom bar) · **Liquid Glass** (nav surface; optional, perf-checked) | Replaces the fixed left sidebar and fixes the nested-scroll problem. |
| | **Fluid Notch / Notch** | A Dynamic-Island-style "Now" pill: *"Now · Data & Vendor Ops Intern @ Jain Global"*, generated from the current role in `timeline.tsx`. |
| | **Animated Modal** + shadcn **Command** | ⌘K palette. Searches projects, papers and posts, jumps to pages, offers "Ask AI about …", toggles theme and motion. |
| **Hero** | **Dotted Glow Background** or **Background Ripple Effect** (pick one) · **Spotlight New** | A quiet, interactive backdrop. |
| | **Encrypted Text** (name decodes in) · **Layout Text Flip** (Data Scientist → Applied AI Engineer → Quant Researcher) · **Pointer Highlight** (replaces `Highlight.tsx`) | The pitch line. |
| | **Hover Border Gradient** / **Moving Border** | Primary CTAs: "See live apps", "Ask my AI". |
| | **Infinite Moving Cards** (as a ticker) | A metrics tape built from real numbers in the constants. |
| **Flagship showcase** | **Macbook Scroll** or **Container Scroll Animation** | The Prosperity Trading Terminal Brag video plays inside the laptop and tablet frame as you scroll. This is the single "wow" moment on the home page. |
| **Work grid** | **Bento Grid** (upgraded) + **Glowing Effect** borders + **Direction Aware Hover** | Featured projects are larger tiles. On hover, a muted video preview plays and a status dot shows. |
| | **Expandable Card** | Quick-view without leaving the grid. |
| | **3D Marquee** | A background wall of real project screenshots behind the work-index header (there are about 70 screenshots to use). |
| **Case study page** | **Sticky Scroll Reveal** | Problem → Approach → Architecture → Results, with visuals pinned beside the text. |
| | **Compare** slider | Before/after comparisons (baseline vs model, v1 vs v2 UI, raw vs SHAP). |
| | **Codeblock** | Key snippets. |
| | **Tracing Beam** | A reading-progress spine on long write-ups and blog posts. |
| | **Animated Tooltip** / **Link Preview** | Hover previews of GitHub, DOI and live-app links. |
| **Live lab** | App-icon grid (Floating Dock styling) + **Terminal** component | The terminal streams real health-check output (`> GET stress-tester … 200 OK 143 ms`). |
| | **Multi Step Loader** | Shown while a sleeping free-tier backend wakes up ("Waking container → Loading model → Ready"). |
| **Research** | **Apple Cards Carousel** | Paper cards expand into abstract, figures and links (replaces `ResearchCarousel` and `ResearchModal`). |
| **Experience** | **Timeline** (current Aceternity version; already in use, gets upgraded) | Work, education and leadership. |
| **About** | **Draggable Card** | The four personal photos as tossable polaroids. |
| | **World Map** | Animated arcs between Gujarat, New York and Uttarakhand. |
| **Tech stack** | **Infinite Moving Cards** (logo marquee) or a "skills by domain" bento | Replaces the static logo grid. |
| **Chat** | **Placeholders And Vanish Input** (keep) · **Text Generate Effect** (first message) | Restyle to the new tokens. |
| **Contact** | **Signup Form** styling + **Stateful Button** | Form with loading, success and error states. |
| **Footer** | **Text Hover Effect** | A large outline "TANISH PATEL" wordmark. |

Optional extras, only if they earn their place: **Canvas Reveal Effect** on featured cards, **GitHub Globe**, **Chromatic Image** on hero photography, **Background Cubes Grid** on the lab page.

---

## 5. Live applications

### 5.1 Additive data fields (the existing format is unchanged)

Add optional fields to `Product` in `src/types/products.tsx`. Existing entries are untouched, and a small normalizer (`src/lib/projects.ts`) derives what it can from `href` (for example, `github.com/*` becomes `repoUrl`, `*.vercel.app` becomes `liveUrl`).

```ts
// all optional
featured?: boolean;               // flagship ordering on home
year?: number;
category?: "finance" | "ml" | "research" | "systems" | "data";
metrics?: { label: string; value: string }[];   // "200+ clients", "−40% latency"
repoUrl?: string;
live?: {
  kind: "iframe" | "external" | "in-browser" | "powerbi" | "explorable";
  url?: string;          // where the app lives
  healthUrl?: string;    // pinged by /api/status
  wakeUrl?: string;      // hit to wake cold starts
  allowEmbed?: boolean;  // false = open in new tab only
};
video?: {
  src: string;           // MP4 (H.264) on blob storage
  webm?: string;         // optional smaller VP9/AV1
  poster: string;        // first-frame image
  duration?: number;
  captions?: string;     // .vtt
};
```

### 5.2 Per-project triage

| Project | Today | Live plan | Brag video |
|---|---|---|---|
| **Prosperity Trading Terminal** | GitHub (React + FastAPI + WebSockets) | Deploy the frontend to Vercel and the FastAPI backend to a host with WebSocket support (Fly.io / Railway / Render), with bundled sample market data. **Read-only demo mode: disable the custom-strategy upload, because it executes user Python.** | ✅ Flagship |
| **StressTester** | Already live on `stress-tester-five.vercel.app` | Embed in a browser frame, with the LLM calls rate-limited on its side. Add `frame-ancestors` for your domain in its CSP. | ✅ |
| **Agentic NLP-to-SQL** | No link | Deploy against a sample read-only SQLite/Postgres DB. LLM key server-side, per-IP rate limit, daily budget cap. | ✅ |
| **MatchOdds AI** | GitHub | Serve precomputed predictions for recent games, plus a capped number of live agent runs per day. | ✅ |
| **AI Value Realization Dashboard** | GitHub (Power BI) | Power BI **Publish to web** embed. The data is synthetic, so a public link is fine. Check that your tenant allows it. | ✅ |
| **Dynamic Resource Allocation (RL)** | GitHub (Gymnasium + FastAPI + React) | Deploy the React dashboard with a recorded or simulated run. Stretch goal: export the policy to ONNX and run it in-browser. | ✅ |
| **Posture Correction (CV)** | GitHub | **In-browser webcam demo** (MediaPipe Pose / TF.js). No backend and genuinely live. | optional |
| **Data Valuation (ocean fCO₂)** | Slides | **Explorable**: export Shapley/Banzhaf values and coalition results to JSON, then build an interactive client-side visualization (source ranking, coalition explorer, map). | optional |
| **Stat Arb · FX-Cross** | GitHub (notebooks) | **Explorable** backtests: export equity curves and trades to JSON and render with TradingView Lightweight Charts. | optional |
| **Paperchase AI** | `paperchase.ac` (commercial) | External link only, no embed (proprietary). A Brag video if allowed, otherwise screenshots. | if permitted |
| SCANIA, ATS Forecasting, Margshala, Demystifying Defects, Prognosis, FL-SoC | Drive / DOI / LinkedIn | Move to the **Archive** list (compact rows). Papers cross-link to `/research`. | – |

### 5.3 How a live app is shown

1. The card shows a status dot from `/api/status` (cached 60 s).
2. "Launch live demo" opens a **lazy** iframe inside a device frame. Nothing loads until the visitor clicks, which protects LCP.
3. If the backend is asleep, the visitor sees the Multi Step Loader while `wakeUrl` is polled.
4. If the app can't be framed or is down, the Brag video plays and "Open in new tab" stays available.

---

## 6. Brag videos

**What Brag is:** an open-source agent skill (`latent-spaces/brag`, MIT) run from inside a project directory (`/brag`, `--voice`, `--tone "…"`). It renders through Hyperframes into `brag-output/brag.mp4`, plus share copy. Requirements: Node 22+, FFmpeg, `npx hyperframes`. There's also a hosted version at letsbrag.app (paste a URL, get a ~20 s video).

**Pipeline** (new script `scripts/ingest-video.mjs`):

1. You run `/brag` inside each project repo and get `brag.mp4`.
2. `node scripts/ingest-video.mjs <slug> path/to/brag.mp4` then:
   - Transcodes with FFmpeg to a web MP4 (H.264, `+faststart`, ~1080p, CRF ~23) and an optional WebM.
   - Grabs a poster frame as AVIF/WebP.
   - Uploads both to object storage: **Vercel Blob** (simplest when hosted on Vercel) or **Cloudflare R2** (no egress fees).
   - Prints the `video: { src, poster, … }` snippet to paste into `products.tsx`.
3. **Videos never go into git.** The repo is already 73 MB.

**Playback rules:**

- `preload="none"` and poster-first.
- Muted autoplay only when in view and only if motion is allowed.
- A pause/unmute control. Brag tracks have music.
- Captions (`.vtt`) where there's voiceover.
- Credit the bundled CC-BY music in the footer or case study as the license requires.

---

## 7. Backend utilities (Next.js route handlers on Vercel)

| Endpoint / job | Purpose | Tech |
|---|---|---|
| `POST /api/chat` (upgrade) | Move to a current Claude model. **Generative UI**: the assistant can call tools like `show_project(slug)`, `open_live_app(slug)` and `show_paper(slug)`, which render real cards inside the chat. Add per-IP rate limiting and a message-length cap. | Anthropic SDK (latest), Upstash Ratelimit |
| `GET /api/status` + cron | Ping each app's `healthUrl`, store latency and state, and pre-warm cold backends on a schedule. | Vercel Cron, Upstash Redis / Edge Config |
| `GET /api/github` | Stars, last commit, primary languages and recent activity per repo, shown on cards and case studies. ISR, revalidated daily. | GitHub REST, `GITHUB_TOKEN` |
| `POST /api/contact` | A working contact form. | Resend, Cloudflare Turnstile, rate limit |
| `POST /api/views/[slug]` | View counts on projects and posts. | Upstash Redis |
| `app/**/opengraph-image.tsx` | Per-project, per-paper and per-post OG images in the site style. | `next/og` |
| `sitemap.ts`, `robots.ts`, JSON-LD `Person` + `ScholarlyArticle` | SEO and Scholar discoverability. | Built-in metadata API |
| `/resume.pdf` | Always-current PDF generated from the same constants, or a curated static PDF. | `@react-pdf/renderer` or static file |
| Demo proxy (optional) | Shared, rate-limited LLM proxy for NLP-to-SQL and MatchOdds so keys never reach the client. | Route handler + budget counter |

Python backends (Trading Terminal, NLP-to-SQL, MatchOdds, RL scheduler) run **outside** this repo on Fly.io, Railway, Render, Hugging Face Spaces (Docker) or Modal, each on a subdomain (`terminal.<domain>`, `sql.<domain>`). Pick hosts based on budget and whether they need WebSockets or a GPU.

**Environment variables to add:**

- `GITHUB_TOKEN`
- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `UPSTASH_REDIS_REST_URL` / `_TOKEN`
- `BLOB_READ_WRITE_TOKEN`
- the existing `ANTHROPIC_API_KEY`

---

## 8. Execution phases

Each phase ends with a working, deployable site. Sizes are rough (S < ½ day, M ≈ 1 day, L ≈ 2–3 days of agent-assisted work).

### Phase 0: Decisions and prep (you)

- Choose the accent color and dark-first direction, the domain, the Python app host and budget, the 4–6 flagship projects, and the availability text.
- Start recording Brag videos for the flagship projects. This can run in parallel with everything else.

### Phase 1: Foundation upgrade (L)

1. Next 13.4 → latest stable Next, React 18 → 19. `params` in `projects/[slug]` and `research/[slug]` becomes async. Replace `next lint` with the ESLint CLI if the new Next requires it.
2. Tailwind 3 → 4 with the official codemod. Move to CSS-first `@theme` tokens and delete `addVariablesForColors`.
3. `framer-motion` → `motion`. `@tabler/icons-react` v2 → v3 (fix `TablerIconsProps`).
4. `npx shadcn@latest init`, then add the `@aceternity` registry to `components.json`.
5. Fonts: Geist Sans, Geist Mono and the display serif via `next/font`. Theme tokens with light and dark through `next-themes`.
6. Layout: **switch to window scroll**, remove the fixed sidebar, add the temporary top nav. Fix the hydration bug.
7. Assets:
   - Convert screenshots to AVIF/WebP at a 2400 px maximum and rename files with spaces.
   - Delete the duplicate `nlp2sql-4` and the unreferenced root images (after you confirm).
   - Target `public/` under ~15 MB.

Checkpoint: the current pages render on the new stack.

### Phase 2: Design system and shell (M)

- Tokens (color, radius, spacing, motion durations).
- Typography scale. `Heading`, `Paragraph` and `Highlight` get rebuilt; `Highlight` becomes Pointer Highlight.
- Resizable Navbar, Floating Dock (mobile), Now-notch, ⌘K palette, footer with Text Hover Effect, and the motion toggle.

### Phase 3: Pages (L, then L)

1. Home: hero, metrics ticker, flagship Macbook Scroll, featured bento, research carousel, experience preview, writing, ask-AI CTA, contact strip.
2. Projects index (filters, grid/list, archive) and the case-study template (video hero, live frame, sticky scroll story, compare, gallery, next project).
3. Research index and paper page (PDF viewer, BibTeX copy).
4. About (draggable photos, world map, Now), resume (timeline, PDF), blog restyle (tracing beam, reading time, OG), chat restyle, contact page.

### Phase 4: Live apps and videos (L, and ongoing)

- Add the new fields and the normalizer.
- `LiveDemo` component (frame, lazy iframe, wake loader, fallback video), `/lab` page, video player component.
- `scripts/ingest-video.mjs`.
- Deploy each app per the triage table, flagship first. Each app is its own small task in its own repo.

### Phase 5: Backend (M)

- `/api/status` + cron, `/api/github`, `/api/contact`, views, chat tools and rate limiting, OG images, sitemap, robots, JSON-LD.

### Phase 6: Polish and launch (M)

- Lighthouse and Core Web Vitals pass.
- Accessibility audit: keyboard paths, focus rings, contrast in both themes, reduced motion, alt text.
- Vercel Analytics and Speed Insights.
- Redirects for any renamed URLs.
- Cross-browser and mobile QA.
- Update README.md (currently 11 bytes) and `CHAT_SETUP.md`.

---

## 9. Decisions

| # | Question | Answer |
|---|---|---|
| 1 | Visual direction / accent | Light **and** dark with a toggle (system default). The accent isn't chosen yet, so the site ships an **accent picker** (lime, amber, cyan, violet) to try them live. The default is lime until one is picked. |
| 2 | Domain | **tanishpatel.dev** (Vercel). |
| 3 | Python app hosting | **Free tiers** for now, with the cold-start wake loader. Design for an easy switch to always-on. |
| 4–5 | Flagship projects / Paperchase | **Deferred.** More projects are being added first. |
| 6 | Availability badge | "Open to full-time · Jan 2027 · NYC" |
| 7 | Asset cleanup | Approved. |

## 10. Progress

Positioning (added during the build): **Data Scientist · AI Engineer · Quant.** Explainable AI is earlier research, not the headline.

- [x] **Phase 1, foundation:** Next 16, React 19, Tailwind 4 tokens, `motion`, shadcn with the `@aceternity` registry, fonts, light/dark, accent picker, pause-motion, window scroll, image cleanup.
- [x] **Phase 2, design system and shell:** shared primitives, Resizable Navbar, ⌘K search palette, footer with Text Hover Effect.
- [x] **Phase 3, pages:** home, work index, case study, Live Lab, research index, paper page, writing index, article layout, about, resume, chat, contact, 404.
- [x] **Phase 4, live apps and videos:** optional `live` / `video` fields with a normalizer, live-demo frame with wake loader, video player, `/lab`, `scripts/ingest-video.mjs`.
- [x] **Phase 5, backend:** chat on a current model with `show_cards` and rate limits, `/api/status` with a daily warm-up cron, GitHub repo stats, `/api/contact`, `/api/views`, share images, sitemap, robots, JSON-LD.
- [x] **Phase 6, polish:** lint clean, production build, every route checked in light, dark and at phone width.

### Aceternity components in use

Resizable Navbar, Dotted Glow Background, Encrypted Text, Layout Text Flip, Pointer Highlight, Hover Border Gradient, Container Scroll Animation, Glowing Effect, 3D Marquee, Apple Cards Carousel, Background Ripple Effect, Placeholders And Vanish Input, Floating Dock, Text Hover Effect, Tracing Beam, Terminal, Multi Step Loader, Timeline, Draggable Card, World Map, Text Generate Effect, Stateful Button.

### Not done, and why

- **Deploying the Python apps** (Trading Terminal, NLP-to-SQL, MatchOdds, RL scheduler): they live in their own repositories. Once one is deployed, put its URL in `href` or `live.url` and it appears in the Live Lab.
- **Brag videos:** none recorded yet. The player, the hover previews and the ingest script are ready for them.
- **Project triage** (flagships, archive, metrics): on hold until the new projects are added.
- **Sticky Scroll Reveal and Compare slider** on case studies: they need structured problem/approach/result content and before/after images, which the current write-ups do not have.
- **Turnstile on the contact form:** it uses a honeypot and rate limiting instead.
- **Generated resume PDF:** the resume page has a print stylesheet and a "Save as PDF" button instead.
- **Floating Dock as the mobile nav:** the Resizable Navbar's own mobile menu covers it; the dock is used for the social links.
