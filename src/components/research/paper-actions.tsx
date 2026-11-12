import { IconBrandGithub, IconExternalLink, IconFileTypePdf } from "@tabler/icons-react";
import { CopyButton } from "@/components/shared/copy-button";
import type { ResearchItem } from "@/types/research";
import { cn } from "@/lib/utils";

const pill =
  "inline-flex h-8 items-center gap-1.5 rounded-full border bg-card px-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";

const LINK_LABELS: Record<string, string> = {
  arxiv: "arXiv",
  github: "Code",
  doi: "DOI",
  publisher: "Publisher",
};

/** PDF, external links and copy-BibTeX for a paper. */
export function PaperActions({ item, className }: { item: ResearchItem; className?: string }) {
  const links = Object.entries(item.links ?? {}).filter(
    (entry): entry is [string, string] => Boolean(entry[1])
  );
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {item.pdf && (
        <a href={item.pdf} target="_blank" rel="noopener noreferrer" className={pill}>
          <IconFileTypePdf className="h-3.5 w-3.5" />
          PDF
        </a>
      )}
      {links.map(([key, url]) => (
        <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={pill}>
          {key === "github" ? (
            <IconBrandGithub className="h-3.5 w-3.5" />
          ) : (
            <IconExternalLink className="h-3.5 w-3.5" />
          )}
          {LINK_LABELS[key] ?? key}
        </a>
      ))}
      {item.bibtex && <CopyButton text={item.bibtex} label="BibTeX" />}
    </div>
  );
}
