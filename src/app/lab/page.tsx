import { Metadata } from "next";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import { LiveDemo } from "@/components/shared/live-demo";
import { VideoDemo } from "@/components/shared/video-demo";
import { StatusTerminal } from "@/components/lab/status-terminal";
import { ArrowLink, Eyebrow, SectionHeading, Shell, StatusBadge, Tag } from "@/components/shared/primitives";
import { getLabProjects, getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Live Lab",
  description:
    "Run Tanish Patel's deployed projects in the browser and watch recorded demos of the rest.",
};

const hostOf = (url: string) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export default function LabPage() {
  // Deployed apps and recorded demos share the main list, in project order.
  const lab = getLabProjects();
  const deployed = lab.filter((p) => p.live);
  const videoCount = lab.length - deployed.length;
  const rest = getProjects().filter((p) => !p.live && !p.video);
  // Hero projects with nothing to run or watch yet get a screenshot preview.
  const previews = rest.filter((p) => p.featured);
  const codeOnly = rest.filter((p) => !p.featured && p.repoUrl);

  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <Shell className="relative grid items-end gap-10 pb-14 pt-36 md:pt-44 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow className="flex items-center gap-2">
              <span className="text-brand">Live lab</span>
              <span aria-hidden>/</span>
              {[
                deployed.length > 0 && `${deployed.length} live`,
                videoCount > 0 && `${videoCount} video ${videoCount === 1 ? "demo" : "demos"}`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </Eyebrow>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
              Run the work,{" "}
              <span className="font-display font-normal italic text-brand">don’t just read</span> about it
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              Deployed projects launch inside the page; the rest play a
              recorded demo. Apps on free hosting sleep when idle, so launching
              one can take up to a minute.
            </p>
          </div>
          {deployed.length > 0 && (
            <StatusTerminal apps={deployed.map((p) => ({ slug: p.slug, host: hostOf(p.live!.url) }))} />
          )}
        </Shell>
      </section>

      <Shell className="space-y-20 py-16">
        {lab.length === 0 && (
          <p className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            Nothing to run or watch yet. Apps and demos will appear here.
          </p>
        )}

        {lab.map((p, i) => (
          <section key={p.slug} id={p.slug} className="grid scroll-mt-28 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow className="flex items-center gap-2">
                <span className="text-brand">{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden>/</span>
                {p.live ? hostOf(p.live.url) : "Video demo"}
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
            {p.live ? (
              <LiveDemo
                slug={p.slug}
                title={p.shortTitle}
                live={p.live}
                poster={p.thumbnail}
                video={p.video}
              />
            ) : (
              <VideoDemo slug={p.slug} title={p.shortTitle} video={p.video!} />
            )}
          </section>
        ))}

        {previews.length > 0 && (
          <section>
            <SectionHeading
              label="No demo yet"
              title="Previews"
              description="Screenshots and the full write-up, until a demo is recorded or the app is deployed."
            />
            <ul className="grid gap-6 md:grid-cols-2">
              {previews.map((p) => (
                <li key={p.slug} id={p.slug} className="scroll-mt-28 overflow-hidden rounded-2xl border bg-card">
                  <Link href={`/projects/${p.slug}`} tabIndex={-1} aria-hidden className="relative block aspect-[16/10] bg-muted">
                    <Image
                      src={p.thumbnail}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-left-top"
                    />
                    <StatusBadge status="idle" label="Screenshots" className="absolute left-3 top-3" />
                  </Link>
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
