import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { Gallery } from "@/components/projects/gallery";
import { PaperActions } from "@/components/research/paper-actions";
import { CopyButton } from "@/components/shared/copy-button";
import { ViewCounter } from "@/components/shared/view-counter";
import { Eyebrow, Shell, Tag } from "@/components/shared/primitives";
import { research } from "@/constants/research";
import { SITE } from "@/constants/site";
import { ResearchItem } from "@/types/research";

type Props = {
  params: Promise<{ slug: string }>;
};

const findResearch = (slug: string): ResearchItem | undefined =>
  research.find((r: ResearchItem) => r.slug === slug);

export function generateStaticParams() {
  return research.map((r: ResearchItem) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findResearch(slug);
  if (!item) return { title: "Research" };
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/research/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.summary,
      type: "article",
      url: `${SITE.url}/research/${item.slug}`,
    },
  };
}

// The write-ups are authored in constants/research.tsx; embedded <style> and
// stylesheet links are dropped so they cannot fight the site theme.
const cleanHtml = (html: string) =>
  html.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<link[^>]*>/gi, "");

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findResearch(slug);
  if (!item) notFound();

  const images = item.images?.length ? item.images : [item.thumbnail];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: item.title,
    abstract: item.summary,
    author: item.authors.map((name) => ({ "@type": "Person", name })),
    keywords: item.tags.join(", "),
    url: `${SITE.url}/research/${item.slug}`,
    ...(item.pdf ? { encoding: { "@type": "MediaObject", contentUrl: `${SITE.url}${item.pdf}` } } : {}),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <Shell className="pt-28 md:pt-36">
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            All research
          </Link>

          <header className="mt-8 max-w-4xl">
            <Eyebrow className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-brand">{item.category}</span>
              <span aria-hidden>/</span>
              {item.role}
            </Eyebrow>
            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              {item.title}
            </h1>
            {item.authors.length > 0 && (
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {item.authors.map((a, i) => (
                  <span key={a}>
                    <span className={/tanish/i.test(a) ? "font-medium text-foreground" : undefined}>{a}</span>
                    {i < item.authors.length - 1 && ", "}
                  </span>
                ))}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PaperActions item={item} />
              <ViewCounter slug={`paper-${item.slug}`} />
            </div>
          </header>
        </Shell>

        <Shell className="mt-12 grid gap-12 lg:grid-cols-[1fr_19rem]">
          <div className="min-w-0 space-y-12">
            <p className="text-pretty text-xl leading-relaxed text-foreground">{item.summary}</p>

            <Gallery images={images} title={item.title} />

            <div className="prose prose-neutral max-w-none dark:prose-invert prose-p:leading-relaxed prose-p:text-muted-foreground prose-headings:tracking-tight prose-h3:text-xl prose-li:text-muted-foreground prose-a:text-brand">
              {item.descriptionHtml ? (
                <div dangerouslySetInnerHTML={{ __html: cleanHtml(item.descriptionHtml) }} />
              ) : (
                item.description
              )}
            </div>

            {item.pdf && (
              <section>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <Eyebrow>Full paper</Eyebrow>
                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand underline-offset-4 hover:underline"
                  >
                    Open PDF in a new tab
                  </a>
                </div>
                <iframe
                  src={`${item.pdf}#view=FitH`}
                  title={`${item.title} (PDF)`}
                  loading="lazy"
                  className="hidden h-[80vh] w-full rounded-2xl border bg-muted md:block"
                />
              </section>
            )}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            {item.results && (
              <div className="rounded-2xl border bg-card p-5">
                <Eyebrow className="text-brand">Results</Eyebrow>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.results}</p>
              </div>
            )}
            {item.methodology.length > 0 && (
              <div>
                <Eyebrow>Methodology</Eyebrow>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.methodology.map((m) => (
                    <li key={m} className="flex gap-2.5">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <Eyebrow>Topics</Eyebrow>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
            {item.bibtex && (
              <div>
                <div className="flex items-center justify-between">
                  <Eyebrow>Cite</Eyebrow>
                  <CopyButton text={item.bibtex} label="Copy" />
                </div>
                <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-xl border bg-muted/60 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {item.bibtex}
                </pre>
              </div>
            )}
          </aside>
        </Shell>
      </article>
    </main>
  );
}
