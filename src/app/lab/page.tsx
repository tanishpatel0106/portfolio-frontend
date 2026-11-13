import { Metadata } from "next";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import { LiveDemo } from "@/components/shared/live-demo";
import { VideoPlayer } from "@/components/shared/video-player";
import { StatusTerminal } from "@/components/lab/status-terminal";
import { ArrowLink, Eyebrow, SectionHeading, Shell, StatusBadge, Tag } from "@/components/shared/primitives";
import { getLiveProjects, getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Live Lab",
  description:
    "Run Tanish Patel's deployed projects in the browser. Each app shows a real health check and launches inside the page.",
};

const hostOf = (url: string) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export default function LabPage() {
  const live = getLiveProjects();
  const notLive = getProjects().filter((p) => !p.live);
  // Not deployed: show the demo video when there is one. Hero projects
  // without a video yet get a screenshot preview in the same slot.
  const demos = notLive.filter((p) => p.video || p.featured);
  const codeOnly = notLive.filter((p) => !demos.includes(p) && p.repoUrl);

  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <Shell className="relative grid items-end gap-10 pb-14 pt-36 md:pt-44 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow className="flex items-center gap-2">
              <span className="text-brand">Live lab</span>
              <span aria-hidden>/</span>
              {live.length} {live.length === 1 ? "app" : "apps"} online
            </Eyebrow>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
              Run the work,{" "}
              <span className="font-display font-normal italic text-brand">don’t just read</span> about it
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              Deployed projects launch inside the page. Apps on free hosting go
              to sleep when idle; launching one wakes it, which can take up to a
              minute. Projects that are not deployed show a demo video instead.
            </p>
          </div>
          {live.length > 0 && (
            <StatusTerminal apps={live.map((p) => ({ slug: p.slug, host: hostOf(p.live!.url) }))} />
          )}
        </Shell>
      </section>

      <Shell className="space-y-20 py-16">
        {live.length === 0 && (
          <p className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            No apps are deployed yet. They will appear here as they go live.
          </p>
        )}

        {live.map((p, i) => (
          <section key={p.slug} id={p.slug} className="grid scroll-mt-28 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow className="flex items-center gap-2">
                <span className="text-brand">{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden>/</span>
                {hostOf(p.live!.url)}
              </Eyebrow>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">{p.shortTitle}</h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(p.stack ?? []).slice(0, 6).map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-5">
                <ArrowLink href={`/projects/${p.slug}`}>Case study</ArrowLink>
                {p.repoUrl && <ArrowLink href={p.repoUrl}>Source</ArrowLink>}
              </div>
            </div>
            <LiveDemo
              slug={p.slug}
              title={p.shortTitle}
              live={p.live!}
              poster={p.thumbnail}
              video={p.video}
            />
          </section>
        ))}

        {demos.length > 0 && (
          <section>
            <SectionHeading
              label="Not deployed"
              title={demos.some((p) => p.video) ? "Watch the demo" : "Previews"}
              description="These projects are not hosted, so a recorded demo stands in for the live app. Where no video exists yet, you get the screenshots and the full write-up."
            />
            <ul className="grid gap-6 md:grid-cols-2">
              {demos.map((p) => (
                <li key={p.slug} id={p.slug} className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card">
                  <div className="relative aspect-[16/10] bg-muted">
                    {p.video ? (
                      <VideoPlayer video={p.video} title={p.shortTitle} className="absolute inset-0" />
                    ) : (
                      <Link href={`/projects/${p.slug}`} tabIndex={-1} aria-hidden>
                        <Image
                          src={p.thumbnail}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover object-left-top"
                        />
                      </Link>
                    )}
                    <StatusBadge
                      status={p.video ? "video" : "idle"}
                      label={p.video ? "Demo video" : "Screenshots"}
                      className="absolute left-3 top-3"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold tracking-tight">{p.shortTitle}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-5">
                      <ArrowLink href={`/projects/${p.slug}`}>Case study</ArrowLink>
                      {p.repoUrl && <ArrowLink href={p.repoUrl}>Source</ArrowLink>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {codeOnly.length > 0 && (
          <section>
            <SectionHeading
              label="Not deployed yet"
              title="Runs from source"
              description="These have public code and a write-up, but no hosted demo so far."
            />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {codeOnly.map((p) => (
                <li key={p.slug} className="flex min-w-0 items-center justify-between gap-3 rounded-xl border bg-card p-4">
                  <Link href={`/projects/${p.slug}`} className="min-w-0 truncate text-sm font-medium hover:text-brand">
                    {p.shortTitle}
                  </Link>
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.shortTitle} source on GitHub`}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <IconBrandGithub className="h-4 w-4" stroke={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Shell>
    </main>
  );
}
