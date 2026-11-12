// Site-wide facts used by the shell (nav, footer, metadata). Content data
// (projects, research, timeline, …) stays in its own constants files.

export const SITE = {
  name: "Tanish Patel",
  shortName: "TP",
  role: "Data Scientist & Applied AI Engineer",
  url: "https://tanishpatel.dev",
  location: "New York, NY",
  availability: "Open to full-time · Jan 2027 · NYC",
  description:
    "Tanish Patel is a Data Scientist and Applied AI Engineer at Columbia University building AI systems for finance, analytics and real-world decision-making — from multi-agent LLM pipelines to trading research tools.",
} as const;

export const ACCENTS = [
  { id: "lime", label: "Lime", swatch: "oklch(0.86 0.2 128)" },
  { id: "amber", label: "Amber", swatch: "oklch(0.8 0.16 72)" },
  { id: "cyan", label: "Cyan", swatch: "oklch(0.8 0.13 210)" },
  { id: "violet", label: "Violet", swatch: "oklch(0.66 0.2 288)" },
] as const;

export type AccentId = (typeof ACCENTS)[number]["id"];
export const DEFAULT_ACCENT: AccentId = "lime";
