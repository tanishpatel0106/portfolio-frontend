import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandGithub,
  IconExternalLink,
  IconGitFork,
  IconSparkles,
  IconStar,
} from "@tabler/icons-react";
import { Gallery } from "@/components/projects/gallery";
import { LiveDemo } from "@/components/shared/live-demo";
import { VideoPlayer } from "@/components/shared/video-player";
import { ViewCounter } from "@/components/shared/view-counter";
import { TracingBeam } from "@/components/ui/tracing-beam";
import {
  ButtonLink,
  Eyebrow,
  Shell,
  StatusBadge,
  Tag,
} from "@/components/shared/primitives";
import { getRepoStats } from "@/lib/github";
import {
  CATEGORY_LABELS,
  getAdjacentProjects,
  getProject,
  getProjects,
  repoSlug,
} from "@/lib/projects";
import { SITE } from "@/constants/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return {
    title: project.shortTitle,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `${SITE.url}/projects/${project.slug}`,
    },
  };
}

const formatMonth = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

export default async function SingleProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);
  const repo = await getRepoStats(repoSlug(project.repoUrl));
  const { live, video, link } = project;
  // The hero shows the richest thing available: live app, then video, then a screenshot.
  const galleryImages =
    live || video ? project.images : project.images.filter((i) => i !== project.thumbnail);

  return (
    <main>
      <article>
        <Shell className="pt-28 md:pt-36">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            All work
          </Link>

          <header className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <Eyebrow className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-brand">{CATEGORY_LABELS[project.category]}</span>
                {project.year && (
                  <>
                    <span aria-hidden>/</span>
                    {project.year}
                  </>
                )}
              </Eyebrow>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {live && live.kind !== "external" && (
                  <ButtonLink href="#demo">Launch live demo</ButtonLink>
                )}
                {link.kind !== "none" && link.kind !== "github" && !(live && link.url === live.url && live.kind !== "external") && (
                  <ButtonLink href={link.url} variant={live && live.kind !== "external" ? "outline" : "primary"}>
                    {link.label}
                    <IconExternalLink className="h-4 w-4" />
                  </ButtonLink>
                )}
                {project.repoUrl && (
                  <ButtonLink href={project.repoUrl} variant="outline">
                    <IconBrandGithub className="h-4 w-4" />
                    Source
                  </ButtonLink>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end">
                {live && <StatusBadge status="live" label={live.kind === "external" ? "Live site" : "Live demo"} />}
                {video && <StatusBadge status="video" label="Video" />}
                {repo && (
                  <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <IconStar className="h-3.5 w-3.5" /> {repo.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <IconGitFork className="h-3.5 w-3.5" /> {repo.forks}
                    </span>
                    {repo.language && <span>{repo.language}</span>}
                    <span>Updated {formatMonth(repo.pushedAt)}</span>
                  </span>
                )}
                <ViewCounter slug={`project-${project.slug}`} />
              </div>
            </div>
          </header>

          {project.metrics && project.metrics.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-card p-5">
                  <dd className="font-mono text-2xl font-medium tracking-tight">{m.value}</dd>
                  <dt className="mt-1 text-sm text-muted-foreground">{m.label}</dt>
                </div>
              ))}
            </dl>
          )}

          <div id="demo" className="mt-10 scroll-mt-28">
            {live ? (
              <LiveDemo
                slug={project.slug}
                title={project.shortTitle}
                live={live}
                poster={project.thumbnail}
                video={video}
              />
            ) : video ? (
              <VideoPlayer
                video={video}
                title={project.shortTitle}
                fit="contain"
                className="aspect-video w-full rounded-2xl border"
              />
            ) : (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-muted">
                <Image
                  src={project.thumbnail}
                  alt={`${project.shortTitle} screenshot`}
                  fill
                  priority
                  sizes="(min-width: 1152px) 1088px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            )}
          </div>
        </Shell>

        <Shell className="mt-14 grid gap-12 lg:grid-cols-[1fr_18rem]">
          <div className="min-w-0 lg:pl-10">
            {/* Aceternity Tracing Beam follows reading progress down the write-up. */}
            <TracingBeam className="h-auto max-w-none">
              <div className="prose prose-neutral max-w-none dark:prose-invert prose-p:leading-relaxed prose-p:text-muted-foreground prose-headings:tracking-tight prose-a:text-brand prose-strong:text-foreground">
                {project.content}
              </div>
            </TracingBeam>

            {galleryImages.length > 0 && (
              <section className="mt-14">
                <Eyebrow className="mb-4">Screenshots</Eyebrow>
                <Gallery images={galleryImages} title={project.shortTitle} />
              </section>
            )}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            {project.stack && project.stack.length > 0 && (
              <div>
                <Eyebrow>Stack and methods</Eyebrow>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            )}
            <div className="rounded-2xl border bg-card p-5">
              <p className="text-sm font-medium">Questions about this project?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                The site’s AI has read the full write-up.
              </p>
              <Link
                href={`/chat?q=${encodeURIComponent(`Tell me about ${project.shortTitle}`)}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
              >
                <IconSparkles className="h-4 w-4" />
                Ask about it
              </Link>
            </div>
          </aside>
        </Shell>
      </article>

      {prev && next && prev.slug !== next.slug && (
        <Shell as="nav" aria-label="More projects" className="mt-20 grid gap-4 md:grid-cols-2">
          {[
            { p: prev, label: "Previous", icon: IconArrowLeft, align: "" },
            { p: next, label: "Next", icon: IconArrowRight, align: "md:text-right md:items-end" },
          ].map(({ p, label, icon: Icon, align }) => (
            <Link
              key={label}
              href={`/projects/${p.slug}`}
              className={`group flex flex-col gap-2 rounded-2xl border bg-card p-6 transition-colors hover:border-brand/50 ${align}`}
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {label === "Previous" && <Icon className="h-3.5 w-3.5" />}
                {label}
                {label === "Next" && <Icon className="h-3.5 w-3.5" />}
              </span>
              <span className="text-lg font-semibold tracking-tight group-hover:text-brand">
                {p.shortTitle}
              </span>
            </Link>
          ))}
        </Shell>
      )}
    </main>
  );
}
