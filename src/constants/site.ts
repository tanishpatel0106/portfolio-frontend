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
 * Headline numbers for the home-page ticker. Each one restates a fact that
 * already appears in `timeline.tsx`, `research.tsx` or a project write-up.
 */
export const HIGHLIGHTS: { value: string; label: string }[] = [
  { value: "200+", label: "hospitality finance clients served at Paperchase" },
  { value: "~40%", label: "lower reporting latency from Azure microservices" },
  { value: "8,192", label: "data-source coalitions scored for ocean fCO₂ valuation" },
  { value: "15–20 h", label: "of manual forecasting saved per client each month" },
  { value: "4", label: "research papers, including IEEE Access, Springer and ACM SAC" },
  { value: "200+", label: "technical indicators in the Prosperity Trading Terminal" },
];

export const ROLES = ["Data Scientist", "AI Engineer", "Quant"];

/** Places on the About-page map. */
export const PLACES = {
  gandhinagar: { lat: 23.2156, lng: 72.6369, label: "Gandhinagar" },
  newYork: { lat: 40.7128, lng: -74.006, label: "New York" },
  roorkee: { lat: 29.8543, lng: 77.888, label: "Roorkee" },
  uttarakhand: { lat: 30.0668, lng: 79.0193, label: "Uttarakhand" },
} as const;
