// Single source of truth for everything the chat assistant knows about Tanish.
// The system prompt and the chat's suggested prompts are GENERATED from the same
// content constants that drive the rest of the site, so the chat stays in sync
// automatically whenever a project, paper, role, or course is added or edited.

import { products } from "@/constants/products";
import { timeline as workTimeline } from "@/constants/timeline";
import { timeline as educationTimeline } from "@/constants/education";
import { timeline as leadershipTimeline } from "@/constants/leadership";
import { timeline as cocurricularTimeline } from "@/constants/cocurricular";
import { research } from "@/constants/research";
import { socials } from "@/constants/socials";
import {
  PERSONA_INTRO,
  BIO,
  HOBBIES,
  RESPONSE_GUIDELINES,
} from "@/constants/system-prompt";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

// Recursively flatten a React node (the JSX `content` stored on projects) into
// plain text so the assistant can read project write-ups without any markup.
function reactNodeToText(node: unknown): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactNodeToText).join("");

  if (typeof node === "object" && "props" in (node as any)) {
    const el = node as { type?: unknown; props?: { children?: unknown } };
    const childText = reactNodeToText(el.props?.children);
    // Insert breaks for block-level elements so paragraphs don't run together.
    if (el.type === "br") return "\n";
    if (el.type === "p" || el.type === "section" || el.type === "div" || el.type === "li") {
      return `${childText}\n`;
    }
    return childText;
  }
  return "";
}

function normalizeText(text: string): string {
  return text
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// "StressTester: AI-Assisted ... Engine" -> "StressTester"
const shortTitle = (title: string) => title.split(/[:—–]/)[0].trim();
// "Columbia University - Lamont-Doherty ..." -> "Columbia University"
const shortCompany = (company: string) => company.split(/[—–-]/)[0].trim();
const dedupe = (items: string[]) => Array.from(new Set(items.map((s) => s.trim()))).filter(Boolean);
const isCurrent = (date: string) => /present/i.test(date);

/* -------------------------------------------------------------------------- */
/*  System prompt (assembled from live site content)                          */
/* -------------------------------------------------------------------------- */

function buildEducationSection(): string {
  const body = educationTimeline
    .map((e, i) => {
      const lines = [`${i + 1}. **${e.title}** — ${e.company} (${e.date})`];
      if (e.description) lines.push(`   - ${e.description}`);
      if (e.courses) lines.push(`   - Relevant coursework: ${e.courses}`);
      return lines.join("\n");
    })
    .join("\n\n");
  return `## Education\n\n${body}`;
}

function buildWorkSection(): string {
  const body = workTimeline
    .map((w, i) => {
      const lines = [`${i + 1}. **${w.title}** — ${w.company} (${w.date})`];
      if (w.description) lines.push(`   - Focus: ${w.description}`);
      (w.responsibilities ?? []).forEach((r: string) => lines.push(`   - ${r}`));
      return lines.join("\n");
    })
    .join("\n\n");
  return `## Work Experience\n\n${body}`;
}

function buildProjectsSection(): string {
  const body = products
    .map((p, i) => {
      const lines = [`${i + 1}. **${p.title}**`];
      if (p.description) lines.push(`   - ${p.description}`);
      if (p.stack?.length) lines.push(`   - Tech stack: ${p.stack.join(", ")}`);
      if (p.href) lines.push(`   - Link: ${p.href}`);
      const detail = normalizeText(reactNodeToText(p.content)).replace(/\n+/g, " ");
      if (detail) lines.push(`   - Details: ${detail}`);
      return lines.join("\n");
    })
    .join("\n\n");
  return `## Projects\n\n${body}`;
}

function buildResearchSection(): string {
  const body = research
    .map((r, i) => {
      const lines = [`${i + 1}. **${r.title}**`];
      lines.push(`   - ${r.category} · Role: ${r.role}`);
      if (r.summary) lines.push(`   - ${r.summary}`);
      if (r.authors?.length) lines.push(`   - Authors: ${r.authors.join(", ")}`);
      if (r.methodology?.length) lines.push(`   - Methodology: ${r.methodology.join("; ")}`);
      if (r.results) lines.push(`   - Results: ${r.results}`);
      if (r.tags?.length) lines.push(`   - Tags: ${r.tags.join(", ")}`);
      const links = r.links
        ? Object.entries(r.links)
            .filter(([, v]) => v)
            .map(([k, v]) => `${k}: ${v}`)
        : [];
      if (links.length) lines.push(`   - Links: ${links.join(", ")}`);
      return lines.join("\n");
    })
    .join("\n\n");
  return `## Research Publications\n\n${body}`;
}

function buildLeadershipSection(): string {
  const body = leadershipTimeline
    .map((l) => {
      const lines = [`- **${l.title}** — ${l.company} (${l.date})`];
      (l.responsibilities ?? []).forEach((r: string) => lines.push(`  - ${r}`));
      return lines.join("\n");
    })
    .join("\n\n");
  return `## Leadership\n\n${body}`;
}

function buildCoCurricularSection(): string {
  const body = cocurricularTimeline
    .flatMap((c) => c.responsibilities ?? [])
    .map((r: string) => `- ${r}`)
    .join("\n");
  return `## Co-Curricular Achievements\n\n${body}`;
}

function buildSkillsSection(): string {
  const fromProjects = products.flatMap((p) => p.stack ?? []);
  const fromResearch = research.flatMap((r) => r.tags ?? []);
  const skills = dedupe([...fromProjects, ...fromResearch]).sort((a, b) =>
    a.localeCompare(b)
  );
  return `## Skills & Technologies\n\n(Aggregated from his projects and research)\n\n${skills.join(", ")}`;
}

function buildSocialsSection(): string {
  const body = socials.map((s) => `- ${s.label}: ${s.href}`).join("\n");
  return `## Social Links\n\n${body}`;
}

let cachedPrompt: string | null = null;

export function buildSystemPrompt(): string {
  if (cachedPrompt) return cachedPrompt;

  cachedPrompt = [
    PERSONA_INTRO,
    `## About Tanish\n\n${BIO}`,
    buildEducationSection(),
    buildWorkSection(),
    buildProjectsSection(),
    buildResearchSection(),
    buildLeadershipSection(),
    buildCoCurricularSection(),
    buildSkillsSection(),
    `## Hobbies & Interests\n\n${HOBBIES}`,
    buildSocialsSection(),
    RESPONSE_GUIDELINES,
  ].join("\n\n");

  return cachedPrompt;
}

/* -------------------------------------------------------------------------- */
/*  Chat prompt suggestions (also derived from live content)                  */
/* -------------------------------------------------------------------------- */

// Short, rotating placeholders for the vanish input.
export function getChatPlaceholders(): string[] {
  const current = workTimeline.find((w) => isCurrent(w.date));
  const projectPrompts = products.slice(0, 3).map((p) => `Tell me about ${shortTitle(p.title)}`);

  return dedupe([
    current ? `What are you working on at ${shortCompany(current.company)}?` : "What are you working on?",
    ...projectPrompts,
    "What research have you published?",
    "What's your tech stack?",
    "What roles are you looking for?",
  ]);
}

// Richer questions for the empty-state suggestion grid.
export function getSuggestedQuestions(): string[] {
  const projectPrompts = products.slice(0, 3).map((p) => `Tell me about ${shortTitle(p.title)}`);
  const pastIndustry = workTimeline.find((w) => !isCurrent(w.date));

  return dedupe([
    "What are you currently working on?",
    ...projectPrompts,
    "What research have you published?",
    pastIndustry
      ? `What did you build at ${shortCompany(pastIndustry.company)}?`
      : "What have you built professionally?",
    "What's your tech stack and what do you enjoy most?",
    "What kind of roles or collaborations are you looking for?",
    "What do you do outside of work and school?",
  ]).slice(0, 8);
}
