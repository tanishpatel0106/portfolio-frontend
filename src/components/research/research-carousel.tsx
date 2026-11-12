"use client";

import Link from "next/link";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { buttonClass, Tag } from "@/components/shared/primitives";

export type PaperCard = {
  slug: string;
  title: string;
  category: string;
  role: string;
  summary: string;
  results: string;
  thumbnail: string;
  tags: string[];
  pdf: string;
};

function PaperBody({ paper }: { paper: PaperCard }) {
  return (
    <div className="space-y-6">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {paper.role}
      </p>
      <p className="text-base leading-relaxed text-foreground md:text-lg">{paper.summary}</p>
      {paper.results && (
        <div className="rounded-2xl border bg-muted/50 p-5">
          <p className="font-mono text-[11px] uppercase tracking-wider text-brand">Results</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            {paper.results}
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {paper.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link href={`/research/${paper.slug}`} className={buttonClass("primary")}>
          Open paper page
        </Link>
        {paper.pdf && (
          <a href={paper.pdf} target="_blank" rel="noopener noreferrer" className={buttonClass("outline")}>
            PDF
          </a>
        )}
      </div>
    </div>
  );
}

/** Aceternity Apple Cards Carousel: each paper expands into a reader sheet. */
export function ResearchCarousel({ papers }: { papers: PaperCard[] }) {
  const cards = papers.map((paper, index) => (
    <Card
      key={paper.slug}
      index={index}
      layout
      card={{
        src: paper.thumbnail,
        title: paper.title,
        category: paper.category,
        content: <PaperBody paper={paper} />,
      }}
    />
  ));
  return <Carousel items={cards} />;
}
