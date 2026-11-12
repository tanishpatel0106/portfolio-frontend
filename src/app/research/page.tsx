import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { PaperActions } from "@/components/research/paper-actions";
import { Eyebrow, Shell, Tag } from "@/components/shared/primitives";
import { Reveal } from "@/components/shared/reveal";
import { research } from "@/constants/research";
import { socials } from "@/constants/socials";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research papers by Tanish Patel on federated learning and applied machine learning, with PDFs and BibTeX.",
};

export default function ResearchPage() {
  const scholar = socials.find((s) => /scholar/i.test(s.label));
  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <Shell className="relative pb-14 pt-36 md:pt-44">
          <Eyebrow className="flex items-center gap-2">
            <span className="text-brand">Research</span>
            <span aria-hidden>/</span>
            {research.length} papers
          </Eyebrow>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            Papers and{" "}
            <span className="font-display font-normal italic text-brand">published</span> research
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Earlier research on federated learning and applied ML for
            manufacturing, electric vehicles and security. Today it informs
            how I build data science, AI and quant systems.
          </p>
          {scholar && (
            <a
              href={scholar.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
            >
              Google Scholar profile
            </a>
          )}
        </Shell>
      </section>

      <Shell as="section" className="py-12">
        <ol className="space-y-5">
          {research.map((item, i) => (
            <Reveal key={item.slug} delay={0.04 * i}>
              <li className="group grid gap-6 rounded-2xl border bg-card p-4 transition-colors hover:border-brand/40 md:grid-cols-[16rem_1fr] md:p-5">
                <Link
                  href={`/research/${item.slug}`}
                  tabIndex={-1}
                  aria-hidden
                  className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-muted md:aspect-auto md:min-h-[11rem]"
                >
                  <Image
                    src={item.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 256px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex min-w-0 flex-col">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    <span className="text-brand">{String(i + 1).padStart(2, "0")}</span> · {item.category} ·{" "}
                    {item.role}
                  </p>
                  <h2 className="mt-2 text-balance text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                    <Link href={`/research/${item.slug}`} className="hover:text-brand">
                      {item.title}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 5).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <PaperActions item={item} className="mt-auto pt-4" />
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Shell>
    </main>
  );
}
