"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { GROUP_LABELS, type GraphEdge, type GraphGroup, type ProjectGraph } from "@/lib/project-graph";
import { cn } from "@/lib/utils";

const GROUP_COLOR: Record<GraphGroup, string> = {
  finance: "var(--viz-finance)",
  agents: "var(--viz-agents)",
  ml: "var(--viz-ml)",
  research: "var(--viz-research)",
};

/** Breaks a title into at most two short lines for a node label. */
function labelLines(title: string, max = 18): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length <= max) {
      line = (line + " " + word).trim();
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length <= 2) return lines;
  return [lines[0], `${lines[1].slice(0, max - 1).trimEnd()}…`];
}

const other = (edge: GraphEdge, slug: string) => (edge.a === slug ? edge.b : edge.a);

/**
 * Projects as a network. A line joins two projects that share tools, methods
 * or a domain (from constants/threads.ts); thicker lines mean a more specific
 * overlap. Pick a project to see what it shares, or a thread to see who uses it.
 */
export function ProjectGraphView({ graph }: { graph: ProjectGraph }) {
  const { nodes, edges, threads, width, height } = graph;
  const [selected, setSelected] = useState<string>(nodes[0]?.slug ?? "");
  const [hovered, setHovered] = useState<string | null>(null);
  const [thread, setThread] = useState<string | null>(null);

  const bySlug = useMemo(() => new Map(nodes.map((n) => [n.slug, n])), [nodes]);
  const focus = hovered ?? selected;
  const focusNode = bySlug.get(focus);
  const activeThread = threads.find((t) => t.id === thread) ?? null;
  const maxWeight = Math.max(1, ...edges.map((e) => e.weight));

  const links = useMemo(
    () => edges.filter((e) => e.a === focus || e.b === focus).sort((x, y) => y.weight - x.weight),
    [edges, focus]
  );
  const neighbours = useMemo(() => new Set(links.map((e) => other(e, focus))), [links, focus]);

  const nodeOn = (slug: string) =>
    activeThread ? activeThread.projects.includes(slug) : slug === focus || neighbours.has(slug);
  const edgeOn = (e: GraphEdge) =>
    activeThread
      ? activeThread.projects.includes(e.a) && activeThread.projects.includes(e.b) && e.shared.includes(activeThread.label)
      : e.a === focus || e.b === focus;

  return (
    <div>
      {/* Threads: the things projects have in common. */}
      <div
        role="group"
        aria-label="Highlight a shared thread"
        className="no-scrollbar -mx-4 mb-5 flex gap-1.5 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        {threads.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={thread === t.id}
            onClick={() => setThread(thread === t.id ? null : t.id)}
            className={cn(
              "inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 text-xs transition-colors",
              thread === t.id
                ? "border-foreground bg-foreground text-background"
                : "bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
            <span className="font-mono text-[10px] opacity-60">{t.projects.length}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_19rem]">
        <div className="overflow-hidden rounded-2xl border bg-card">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="group"
            aria-label="Project graph: projects linked by the tools and methods they share"
            className="h-auto w-full select-none"
            onMouseLeave={() => setHovered(null)}
          >
            {/* Links */}
            {edges.map((e) => {
              const a = bySlug.get(e.a)!;
              const b = bySlug.get(e.b)!;
              const on = edgeOn(e);
              return (
                <line
                  key={`${e.a}-${e.b}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={on ? "var(--brand)" : "var(--foreground)"}
                  strokeOpacity={on ? 0.9 : 0.11}
                  strokeWidth={(on ? 1.4 : 0.9) + 2 * (e.weight / maxWeight)}
                  strokeLinecap="round"
                  className="transition-[stroke-opacity] duration-200"
                />
              );
            })}

            {/* Projects */}
            {nodes.map((n) => {
              const on = nodeOn(n.slug);
              const isFocus = !activeThread && n.slug === focus;
              const lines = labelLines(n.title);
              return (
                <g
                  key={n.slug}
                  role="button"
                  tabIndex={0}
                  aria-label={`${n.title}, ${GROUP_LABELS[n.group]}. Select to see what it shares.`}
                  aria-pressed={n.slug === selected}
                  onMouseEnter={() => setHovered(n.slug)}
                  onFocus={() => setHovered(n.slug)}
                  onBlur={() => setHovered(null)}
                  onClick={() => {
                    setThread(null);
                    setSelected(n.slug);
                  }}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.preventDefault();
                      setThread(null);
                      setSelected(n.slug);
                    }
                  }}
                  opacity={on ? 1 : 0.28}
                  className="cursor-pointer outline-none transition-opacity duration-200 [&:focus-visible>circle.ring]:opacity-100"
                >
                  {/* Generous hit target */}
                  <circle cx={n.x} cy={n.y} r={n.r + 16} fill="transparent" />
                  <circle
                    className="ring opacity-0"
                    cx={n.x}
                    cy={n.y}
                    r={n.r + 6}
                    fill="none"
                    stroke="var(--ring)"
                    strokeWidth={2}
                  />
                  {isFocus && (
                    <circle cx={n.x} cy={n.y} r={n.r + 6} fill="none" stroke="var(--brand)" strokeWidth={2} />
                  )}
                  <circle cx={n.x} cy={n.y} r={n.r} fill={GROUP_COLOR[n.group]} stroke="var(--card)" strokeWidth={2} />
                  <text
                    x={n.x}
                    y={n.y + n.r + 15}
                    textAnchor="middle"
                    paintOrder="stroke"
                    stroke="var(--card)"
                    strokeWidth={4}
                    strokeLinejoin="round"
                    className={cn(
                      "fill-foreground text-[22px] font-medium md:text-[13px]",
                      // On small screens only the focused project and its links are labelled.
                      !(on && (activeThread || isFocus || neighbours.has(n.slug))) && "hidden md:block",
                      isFocus && "font-semibold"
                    )}
                  >
                    {lines.map((line, i) => (
                      <tspan key={i} x={n.x} dy={i === 0 ? 0 : "1.15em"}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t px-4 py-3 text-xs text-muted-foreground">
            {(Object.keys(GROUP_LABELS) as GraphGroup[]).map((g) => (
              <span key={g} className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: GROUP_COLOR[g] }} />
                {GROUP_LABELS[g]}
              </span>
            ))}
            <span className="ml-auto hidden sm:inline">A line means shared tools or methods. Thicker = more specific.</span>
          </div>
        </div>

        {/* Detail panel: what the selection shares, and with whom. */}
        <aside aria-live="polite" className="rounded-2xl border bg-card p-5">
          {activeThread ? (
            <>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Shared thread</p>
              <h3 className="mt-1.5 text-xl font-semibold tracking-tight">{activeThread.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Used in {activeThread.projects.length} projects.
              </p>
              <ul className="mt-4 divide-y border-y">
                {activeThread.projects.map((slug) => {
                  const n = bySlug.get(slug);
                  if (!n) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/projects/${slug}`}
                        className="group flex items-center gap-2.5 py-2.5 text-sm hover:text-brand"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: GROUP_COLOR[n.group] }} />
                        <span className="min-w-0 flex-1 truncate">{n.title}</span>
                        <IconArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-brand" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : focusNode ? (
            <>
              <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: GROUP_COLOR[focusNode.group] }} />
                {GROUP_LABELS[focusNode.group]}
              </p>
              <h3 className="mt-1.5 text-balance text-xl font-semibold leading-snug tracking-tight">
                {focusNode.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {focusNode.description}
              </p>
              <Link
                href={`/projects/${focusNode.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
              >
                Open case study
                <IconArrowUpRight className="h-4 w-4" />
              </Link>

              <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Linked to {links.length} {links.length === 1 ? "project" : "projects"}
              </p>
              <ul className="mt-2 max-h-[19rem] space-y-3 overflow-y-auto pr-1 chat-scroll-area">
                {links.map((e) => {
                  const n = bySlug.get(other(e, focusNode.slug))!;
                  return (
                    <li key={n.slug}>
                      <button
                        type="button"
                        onClick={() => setSelected(n.slug)}
                        className="flex items-center gap-2 text-left text-sm font-medium hover:text-brand"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: GROUP_COLOR[n.group] }} />
                        {n.title}
                      </button>
                      <p className="mt-1 pl-4 text-xs leading-relaxed text-muted-foreground">
                        {e.shared.slice(0, 4).join(" · ")}
                        {e.shared.length > 4 && ` · +${e.shared.length - 4} more`}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </aside>
      </div>

      {/* The same information as text, for screen readers. */}
      <ul className="sr-only">
        {edges.map((e) => (
          <li key={`${e.a}-${e.b}`}>
            {bySlug.get(e.a)?.title} and {bySlug.get(e.b)?.title} share {e.shared.join(", ")}.
          </li>
        ))}
      </ul>
    </div>
  );
}
