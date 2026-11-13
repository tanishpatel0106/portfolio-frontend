"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { IconArrowUpRight, IconLayoutGrid, IconList } from "@tabler/icons-react";
import { ProjectTile } from "./project-tile";
import { StatusDot } from "@/components/shared/primitives";
import { useAppStatuses } from "@/hooks/use-app-status";
import { CATEGORY_LABELS, type ProjectCard } from "@/lib/projects";
import type { ProjectCategory } from "@/types/products";
import { cn } from "@/lib/utils";

type Filter = "all" | "demo" | "source" | ProjectCategory;

const chip = (active: boolean) =>
  cn(
    "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors",
    active
      ? "border-foreground bg-foreground text-background"
      : "bg-card text-muted-foreground hover:text-foreground"
  );

export function ProjectsExplorer({ projects }: { projects: ProjectCard[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const statuses = useAppStatuses();

  const filters = useMemo(() => {
    const out: { id: Filter; label: string; count: number }[] = [
      { id: "all", label: "All", count: projects.length },
    ];
    const demo = projects.filter((p) => p.isLive || p.video).length;
    const source = projects.filter((p) => p.hasRepo).length;
    if (demo) out.push({ id: "demo", label: "Demos", count: demo });
    if (source) out.push({ id: "source", label: "Open source", count: source });
    (Object.keys(CATEGORY_LABELS) as ProjectCategory[]).forEach((c) => {
      const count = projects.filter((p) => p.category === c).length;
      if (count) out.push({ id: c, label: CATEGORY_LABELS[c], count });
    });
    return out;
  }, [projects]);

  const visible = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "demo") return p.isLive || Boolean(p.video);
    if (filter === "source") return p.hasRepo;
    return p.category === filter;
  });

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={chip(filter === f.id)}
            >
              {f.id === "demo" && <StatusDot status="live" pulse={false} />}
              {f.label}
              <span className={cn("font-mono text-[10px]", filter === f.id ? "opacity-70" : "opacity-60")}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
        <div role="group" aria-label="Layout" className="flex rounded-full border bg-card p-0.5">
          {(
            [
              { id: "grid", icon: IconLayoutGrid, label: "Grid view" },
              { id: "list", icon: IconList, label: "List view" },
            ] as const
          ).map((v) => (
            <button
              key={v.id}
              type="button"
              aria-label={v.label}
              aria-pressed={view === v.id}
              onClick={() => setView(v.id)}
              className={cn(
                "inline-flex h-7 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors",
                view === v.id && "bg-accent text-foreground"
              )}
            >
              <v.icon className="h-4 w-4" stroke={1.75} />
            </button>
          ))}
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProjectTile key={p.slug} project={p} status={statuses[p.slug]} priority={i < 3} />
          ))}
        </div>
      ) : (
        <ul className="divide-y border-y">
          {visible.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-4 transition-colors hover:bg-accent/40 md:grid-cols-[2.5rem_4.5rem_1fr_12rem_auto] md:px-2"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative hidden h-12 w-[4.5rem] overflow-hidden rounded-lg border bg-muted md:block">
                  <Image src={p.thumbnail} alt="" fill sizes="72px" className="object-cover object-top" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-medium tracking-tight">{p.shortTitle}</span>
                    {p.isLive && <StatusDot status={statuses[p.slug]?.state ?? "live"} />}
                  </span>
                  <span className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{p.description}</span>
                </span>
                <span className="hidden font-mono text-[11px] uppercase tracking-wider text-muted-foreground md:block">
                  {CATEGORY_LABELS[p.category]}
                </span>
                <IconArrowUpRight
                  className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                  stroke={1.75}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          Nothing in this filter yet.
        </p>
      )}
    </div>
  );
}
