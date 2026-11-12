// Read-side helpers over `constants/products.tsx`. The data file keeps its
// original shape; everything the new UI needs (link type, category, live
// status, repo URL) is derived here so old entries work untouched.

import { products } from "@/constants/products";
import type {
  Product,
  ProjectCategory,
  ProjectLive,
  ProjectVideo,
} from "@/types/products";

export type LinkKind =
  | "live"
  | "github"
  | "paper"
  | "slides"
  | "document"
  | "post"
  | "site"
  | "none";

export type ProjectLink = { kind: LinkKind; url: string; label: string };

export type Project = Product & {
  slug: string;
  /** Position in the constants file (newest first). */
  order: number;
  link: ProjectLink;
  repoUrl?: string;
  live?: ProjectLive;
  category: ProjectCategory;
  /** Title before the first ":" or "—", for tight spaces. */
  shortTitle: string;
};

/** Serializable subset handed to client components. */
export type ProjectCard = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  thumbnail: string;
  stack: string[];
  category: ProjectCategory;
  linkKind: LinkKind;
  isLive: boolean;
  liveKind?: ProjectLive["kind"];
  hasRepo: boolean;
  video?: ProjectVideo;
  year?: number;
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  finance: "Finance & Trading",
  agents: "Agents & LLMs",
  ml: "Machine Learning",
  research: "Research",
  systems: "Systems",
};

const LINK_LABELS: Record<LinkKind, string> = {
  live: "Open live app",
  github: "View source",
  paper: "Read the paper",
  slides: "View slides",
  document: "Read the report",
  post: "Read the post",
  site: "Visit site",
  none: "",
};

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

export function classifyLink(href: string | undefined): ProjectLink {
  const url = (href ?? "").trim();
  if (!url) return { kind: "none", url: "", label: "" };
  const host = hostOf(url);
  let kind: LinkKind = "site";
  if (host === "github.com") kind = "github";
  else if (host.endsWith("vercel.app") || host.endsWith("netlify.app") || host.endsWith("fly.dev") || host.endsWith("onrender.com") || host.endsWith("hf.space") || host.endsWith("streamlit.app")) kind = "live";
  else if (host === "doi.org" || host.endsWith("springer.com") || host === "arxiv.org" || host.endsWith("ieee.org") || host.endsWith("acm.org")) kind = "paper";
  else if (host === "docs.google.com" && url.includes("/presentation/")) kind = "slides";
  else if (host === "drive.google.com" || host === "docs.google.com") kind = "document";
  else if (host.endsWith("linkedin.com") || host === "medium.com") kind = "post";
  return { kind, url, label: LINK_LABELS[kind] };
}

const CATEGORY_RULES: [ProjectCategory, RegExp][] = [
  ["finance", /trading|arbitrage|\bfx\b|stress test|financial|finance|market|backtest|npv|portfolio risk/i],
  ["agents", /agentic|multi-agent|\bllm|\brag\b|nlp-to-sql|copilot|assistant|gpt|langchain/i],
  ["research", /federated|explainable|shapley|data valuation|semiconductor|state of charge/i],
  ["systems", /cloud|scheduler|resource allocation|kubernetes|distributed/i],
];

function inferCategory(p: Product): ProjectCategory {
  if (p.category) return p.category;
  const headline = `${p.title} ${p.description}`;
  for (const [category, rule] of CATEGORY_RULES) {
    if (rule.test(headline)) return category;
  }
  const stack = (p.stack ?? []).join(" ");
  for (const [category, rule] of CATEGORY_RULES) {
    if (rule.test(stack)) return category;
  }
  return "ml";
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function normalize(p: Product, order: number): Project {
  const link = classifyLink(p.href);
  const repoUrl = p.repoUrl ?? (link.kind === "github" ? link.url : undefined);
  // A deployed app in `href` is treated as an embeddable live demo unless the
  // entry says otherwise with an explicit `live` field.
  // A product website in `href` counts as live too, but opens in a new tab
  // (third-party sites usually refuse to be framed).
  const live: ProjectLive | undefined =
    p.live ??
    (link.kind === "live"
      ? { kind: "iframe", url: link.url }
      : link.kind === "site"
        ? { kind: "external", url: link.url }
        : undefined);

  return {
    ...p,
    slug: p.slug ?? slugify(p.title),
    order,
    link,
    repoUrl,
    live,
    category: inferCategory(p),
    shortTitle: p.title.split(/[:—–]/)[0].trim(),
  };
}

const all: Project[] = (products as Product[]).map(normalize);

export const getProjects = (): Project[] => all;

export const getProject = (slug: string): Project | undefined =>
  all.find((p) => p.slug === slug);

/** Featured first (in file order), then everything else in file order. */
export const getSelectedProjects = (count: number): Project[] => {
  const featured = all.filter((p) => p.featured);
  const rest = all.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, count);
};

export const getLiveProjects = (): Project[] => all.filter((p) => p.live);

export const getAdjacentProjects = (slug: string) => {
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: all[(i - 1 + all.length) % all.length],
    next: all[(i + 1) % all.length],
  };
};

export const toCard = (p: Project): ProjectCard => ({
  slug: p.slug,
  title: p.title,
  shortTitle: p.shortTitle,
  description: p.description,
  thumbnail: p.thumbnail,
  stack: (p.stack ?? []).slice(0, 6),
  category: p.category,
  linkKind: p.link.kind,
  isLive: Boolean(p.live),
  liveKind: p.live?.kind,
  hasRepo: Boolean(p.repoUrl),
  video: p.video,
  year: p.year,
});

/** "owner/name" for a GitHub URL, or undefined. */
export const repoSlug = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  const m = url.match(/github\.com\/([^/]+)\/([^/?#]+)/);
  return m ? `${m[1]}/${m[2].replace(/\.git$/, "")}` : undefined;
};
