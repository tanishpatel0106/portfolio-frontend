import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { FeaturedShowcase } from "@/components/home/featured-showcase";
import { SelectedWork } from "@/components/home/selected-work";
import { LiveStrip } from "@/components/home/live-strip";
import { AskAi } from "@/components/home/ask-ai";
import { SocialDock } from "@/components/home/social-dock";
import { ResearchCarousel } from "@/components/research/research-carousel";
import {
  ArrowLink,
  ButtonLink,
  Eyebrow,
  Marquee,
  SectionHeading,
  Shell,
  Tag,
} from "@/components/shared/primitives";
import { Reveal } from "@/components/shared/reveal";
import { HIGHLIGHTS, SITE } from "@/constants/site";
import { research } from "@/constants/research";
import { timeline as work } from "@/constants/timeline";
import { techstack } from "@/constants/techstack";
import { socials } from "@/constants/socials";
import {
  CATEGORY_LABELS,
  getFeaturedProjects,
  getLabProjects,
  getMoreProjects,
  getProjects,
  toCard,
} from "@/lib/projects";
import { getChatPlaceholders, getSuggestedQuestions } from "@/lib/portfolio-knowledge";
import { getBlogMetas } from "../../lib/getAllBlogs";
import { formatDate } from "../../lib/formatDate";

const hostOf = (url: string) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export default async function Home() {
  const featured = getFeaturedProjects();
  const selected = getMoreProjects(7);
  const total = getProjects().length;
  const liveApps = getLabProjects();
  const posts = (await getBlogMetas()).slice(0, 3);

  return (
    <main>
      <Hero />

      {/* Headline numbers, each restating a fact from the work history. */}
      <section aria-label="Highlights" className="border-y bg-surface py-5">
        <Marquee durationSeconds={55}>
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="flex items-baseline gap-3 px-8">
              <span className="font-mono text-2xl font-medium tracking-tight text-foreground">{h.value}</span>
              <span className="max-w-[16rem] text-sm text-muted-foreground">{h.label}</span>
              <span aria-hidden className="ml-8 text-brand">◆</span>
            </div>
          ))}
        </Marquee>
      </section>

      <FeaturedShowcase
        items={featured.map((p) => ({
          slug: p.slug,
          shortTitle: p.shortTitle,
          description: p.description,
          thumbnail: p.thumbnail,
          video: p.video,
          repoUrl: p.repoUrl,
          category: CATEGORY_LABELS[p.category],
          metrics: p.metrics,
        }))}
      />

      <Shell as="section" className="pb-24">
        <SectionHeading
          index="02"
          label="More work"
          title="Systems that ship, not just notebooks"
          description="Trading research tools, agentic analytics, forecasting platforms and applied ML. Each one has a full write-up."
          action={{ href: "/projects", label: `All ${total} projects` }}
        />
        <SelectedWork projects={selected.map(toCard)} />
      </Shell>

      {liveApps.length > 0 && (
        <section className="border-y bg-surface py-20">
          <Shell className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Eyebrow className="flex items-center gap-2">
                <span className="text-brand">03</span>
                <span aria-hidden>/</span>
                Live lab
              </Eyebrow>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Don’t take my word for it.{" "}
                <span className="font-display font-normal italic text-brand">Run it, or watch it.</span>
              </h2>
              <p className="mt-4 max-w-md text-pretty text-muted-foreground">
                Deployed apps launch inside the page, and the status next to
                each is a real health check. The others play a recorded demo.
              </p>
              <ButtonLink href="/lab" className="mt-7">
                Open the live lab
              </ButtonLink>
            </div>
            <LiveStrip
              apps={liveApps.map((p) => ({
                slug: p.slug,
                title: p.shortTitle,
                host: p.live ? hostOf(p.live.url) : "Recorded demo",
                thumbnail: p.thumbnail,
                videoOnly: !p.live,
              }))}
            />
          </Shell>
        </section>
      )}

      <section className="py-24">
        <Shell>
          <SectionHeading
            index="04"
            label="Research"
            title="Papers and research"
            description="Papers from my research years, mostly federated learning and applied ML. Open a card for the summary and results."
            action={{ href: "/research", label: "All papers" }}
            className="mb-2"
          />
        </Shell>
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <ResearchCarousel
            papers={research.map((r) => ({
              slug: r.slug,
              title: r.title,
              category: r.category,
              role: r.role,
              summary: r.summary,
              results: r.results,
              thumbnail: r.thumbnail,
              tags: r.tags,
              pdf: r.pdf,
            }))}
          />
        </div>
      </section>

      <Shell as="section" className="pb-24">
        <SectionHeading
          index="05"
          label="Experience"
          title="Where I’ve worked"
          action={{ href: "/resume", label: "Full resume" }}
        />
        <ol className="divide-y border-y">
          {work.slice(0, 5).map((role, i) => (
            <Reveal key={role.company + role.title} delay={i * 0.04}>
              <li className="grid gap-2 py-6 md:grid-cols-[11rem_1fr] md:gap-8">
                <p className="pt-0.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {role.date}
                </p>
                <div>
                  <h3 className="text-lg font-medium tracking-tight">
                    {role.title}
                    <span className="text-muted-foreground"> · {role.company}</span>
                  </h3>
                  <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {role.responsibilities[0]}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Shell>

      {posts.length > 0 && (
        <Shell as="section" className="pb-24">
          <SectionHeading
            index="06"
            label="Writing"
            title="Notes on ML and markets"
            action={{ href: "/blog", label: "All articles" }}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-brand/50"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {formatDate(post.date)} · {post.readingMinutes} min read
                    </p>
                    <h3 className="mt-2 text-balance text-lg font-semibold leading-snug tracking-tight">
                      {post.title}
                    </h3>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                      {post.tags?.slice(0, 2).map((t) => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Shell>
      )}

      <section aria-label="Tools I work with" className="border-y bg-surface py-8">
        <Marquee durationSeconds={50} reverse>
          {techstack.map((t) => (
            <div key={t.title} className="flex items-center gap-2.5 px-7">
              <Image src={t.src} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
              <span className="whitespace-nowrap font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {t.title}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      <Shell as="section" className="py-24">
        <AskAi placeholders={getChatPlaceholders()} suggestions={getSuggestedQuestions()} />
      </Shell>

      <Shell as="section" className="pb-8 text-center">
        <Eyebrow>Contact</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          Let’s build something{" "}
          <span className="font-display font-normal italic text-brand">interesting</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground">
          {SITE.availability}. Roles in applied AI, data science and quantitative research,
          or a collaboration on something hard.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/contact">Get in touch</ButtonLink>
          <ButtonLink href="/resume" variant="outline">
            View resume
          </ButtonLink>
        </div>
        <div className="mt-10 hidden md:block">
          <SocialDock />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 md:hidden">
          {socials.map((s) => (
            <ArrowLink key={s.href} href={s.href}>
              {s.label}
            </ArrowLink>
          ))}
        </div>
      </Shell>
    </main>
  );
}
