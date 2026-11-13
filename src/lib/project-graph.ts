// Builds the project graph for the Work page from `constants/threads.ts`.
// Runs on the server: the force layout is computed once at build time, so the
// browser receives finished coordinates and does no simulation.

import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { threads } from "@/constants/threads";
import { getProjects } from "@/lib/projects";
import type { ProjectCategory } from "@/types/products";

/** Four colour groups (the palette is validated for four; "systems" joins ML). */
export type GraphGroup = "finance" | "agents" | "ml" | "research";

export const GROUP_LABELS: Record<GraphGroup, string> = {
  finance: "Finance & trading",
  agents: "Agents & LLMs",
  ml: "Machine learning & systems",
  research: "Research",
};

const groupOf = (category: ProjectCategory): GraphGroup => (category === "systems" ? "ml" : category);

export type GraphNode = {
  slug: string;
  title: string;
  description: string;
  group: GraphGroup;
  x: number;
  y: number;
  r: number;
  threads: string[];
  hasDemo: boolean;
};

export type GraphEdge = {
  a: string;
  b: string;
  /** Sum of the rarity of each shared thread; higher = more specific overlap. */
  weight: number;
  /** Labels of the shared threads, most specific first. */
  shared: string[];
};

export type GraphThread = { id: string; label: string; projects: string[] };

export type ProjectGraph = {
  width: number;
  height: number;
  nodes: GraphNode[];
  edges: GraphEdge[];
  threads: GraphThread[];
};

export const GRAPH_WIDTH = 1000;
export const GRAPH_HEIGHT = 640;
const PADDING = 70;
/** Each project keeps its strongest links; anything this strong is kept too. */
const LINKS_PER_NODE = 3;
const STRONG_LINK = 4.6;

type SimNode = SimulationNodeDatum & { slug: string; r: number };
type SimLink = SimulationLinkDatum<SimNode> & { weight: number };

export function buildProjectGraph(): ProjectGraph {
  const projects = getProjects();
  const slugs = new Set(projects.map((p) => p.slug));
  const live = threads
    .map((t) => ({ ...t, projects: t.projects.filter((s) => slugs.has(s)) }))
    .filter((t) => t.projects.length >= 2);

  // Rarer threads say more about a pair than ones nearly every project has.
  const rarity = new Map(live.map((t) => [t.id, Math.log(projects.length / t.projects.length)]));
  const byProject = new Map<string, typeof live>();
  for (const t of live) for (const s of t.projects) byProject.set(s, [...(byProject.get(s) ?? []), t]);

  const all: GraphEdge[] = [];
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const a = projects[i].slug;
      const b = projects[j].slug;
      const shared = (byProject.get(a) ?? [])
        .filter((t) => t.projects.includes(b))
        .sort((x, y) => rarity.get(y.id)! - rarity.get(x.id)!);
      if (shared.length === 0) continue;
      all.push({
        a,
        b,
        weight: shared.reduce((sum, t) => sum + rarity.get(t.id)!, 0),
        shared: shared.map((t) => t.label),
      });
    }
  }

  // Keep the graph readable: each project's strongest few links, plus every
  // link that is strong in its own right.
  const keep = new Set<GraphEdge>();
  for (const p of projects) {
    all
      .filter((e) => e.a === p.slug || e.b === p.slug)
      .sort((x, y) => y.weight - x.weight)
      .slice(0, LINKS_PER_NODE)
      .forEach((e) => keep.add(e));
  }
  all.filter((e) => e.weight >= STRONG_LINK).forEach((e) => keep.add(e));
  const edges = [...keep].sort((x, y) => y.weight - x.weight);

  const degree = new Map<string, number>();
  for (const e of edges) {
    degree.set(e.a, (degree.get(e.a) ?? 0) + 1);
    degree.set(e.b, (degree.get(e.b) ?? 0) + 1);
  }
  const maxDegree = Math.max(1, ...degree.values());

  // Force layout (deterministic: d3 uses a fixed seed and starting spiral).
  const simNodes: SimNode[] = projects.map((p) => ({
    slug: p.slug,
    r: 9 + 9 * ((degree.get(p.slug) ?? 0) / maxDegree),
  }));
  const index = new Map(simNodes.map((n) => [n.slug, n]));
  const maxWeight = Math.max(1, ...edges.map((e) => e.weight));
  const simLinks: SimLink[] = edges.map((e) => ({
    source: index.get(e.a)!,
    target: index.get(e.b)!,
    weight: e.weight,
  }));

  forceSimulation(simNodes)
    .force(
      "link",
      forceLink<SimNode, SimLink>(simLinks)
        .distance((l) => 150 - 70 * (l.weight / maxWeight))
        .strength((l) => 0.25 + 0.55 * (l.weight / maxWeight))
    )
    .force("charge", forceManyBody().strength(-420))
    .force("collide", forceCollide<SimNode>().radius((n) => n.r + 34))
    .force("center", forceCenter(0, 0))
    // The canvas is wider than tall, so squeeze vertically a little.
    .force("x", forceX(0).strength(0.03))
    .force("y", forceY(0).strength(0.07))
    .stop()
    .tick(500);

  // Fit the result into the viewBox.
  const xs = simNodes.map((n) => n.x ?? 0);
  const ys = simNodes.map((n) => n.y ?? 0);
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const fitX = (x: number) => PADDING + ((x - minX) / (maxX - minX || 1)) * (GRAPH_WIDTH - 2 * PADDING);
  const fitY = (y: number) => PADDING + ((y - minY) / (maxY - minY || 1)) * (GRAPH_HEIGHT - 2 * PADDING - 20);

  const round = (v: number) => Math.round(v * 10) / 10;
  const nodes: GraphNode[] = projects.map((p) => {
    const sim = index.get(p.slug)!;
    return {
      slug: p.slug,
      title: p.shortTitle,
      description: p.description,
      group: groupOf(p.category),
      x: round(fitX(sim.x ?? 0)),
      y: round(fitY(sim.y ?? 0)),
      r: round(sim.r),
      threads: (byProject.get(p.slug) ?? []).map((t) => t.id),
      hasDemo: Boolean(p.live || p.video),
    };
  });

  return {
    width: GRAPH_WIDTH,
    height: GRAPH_HEIGHT,
    nodes,
    edges: edges.map((e) => ({ ...e, weight: round(e.weight) })),
    threads: live
      .map((t) => ({ id: t.id, label: t.label, projects: t.projects }))
      .sort((x, y) => y.projects.length - x.projects.length),
  };
}
