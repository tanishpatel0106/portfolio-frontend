// Site-wide facts used by the shell (nav, footer, metadata). Content data
// (projects, research, timeline, …) stays in its own constants files.

export const SITE = {
  name: "Tanish Patel",
  shortName: "TP",
  role: "Data Scientist · AI Engineer · Quant",
  url: "https://tanishpatel.dev",
  location: "New York, NY",
  availability: "Open to full-time · Jan 2027 · NYC",
  focus: "LLM systems · forecasting · quant research",
  description:
    "Tanish Patel is a data scientist, AI engineer and quant at Columbia University, building AI systems, forecasting models and trading research tools for finance and real-world decision-making.",
} as const;

export const ACCENTS = [
  { id: "lime", label: "Lime", swatch: "oklch(0.86 0.2 128)" },
  { id: "amber", label: "Amber", swatch: "oklch(0.8 0.16 72)" },
  { id: "cyan", label: "Cyan", swatch: "oklch(0.8 0.13 210)" },
  { id: "violet", label: "Violet", swatch: "oklch(0.66 0.2 288)" },
] as const;

export type AccentId = (typeof ACCENTS)[number]["id"];
export const DEFAULT_ACCENT: AccentId = "lime";

/**
 * Headline numbers for the home-page ticker: outcomes, not scale. Each one
 * restates a figure from the work history (`timeline.tsx`) or from a project
 * or paper write-up; `source` says which.
 */
export const HIGHLIGHTS: { value: string; label: string; source: string }[] = [
  { value: "200+", label: "finance clients served by the platform", source: "Paperchase · AI Engineer" },
  { value: "~40%", label: "faster financial reporting", source: "Paperchase · AI Engineer" },
  { value: "15–20 h", label: "manual work saved per client, every month", source: "Paperchase · AI Engineer" },
  { value: "+7.55%", label: "mean certainty-equivalent gain over 60/40", source: "Wedmont Private Capital × Columbia" },
  { value: "$6.6M", label: "gross-profit uplift modeled for a $4M AI program", source: "AI Adoption Value Dashboard" },
  { value: "35%", label: "shorter patient waiting times", source: "Prognosis Assistant & Scheduler" },
  { value: "7%", label: "error on daily sales forecasts in production", source: "Time Series Forecasting" },
  { value: "98.78%", label: "defect-detection accuracy", source: "IEEE Access paper" },
];

export const ROLES = ["Data Scientist", "AI Engineer", "Quant"];

/** Places on the About-page map. */
export const PLACES = {
  gandhinagar: { lat: 23.2156, lng: 72.6369, label: "Gandhinagar" },
  newYork: { lat: 40.7128, lng: -74.006, label: "New York" },
  roorkee: { lat: 29.8543, lng: 77.888, label: "Roorkee" },
  uttarakhand: { lat: 30.0668, lng: 79.0193, label: "Uttarakhand" },
} as const;
