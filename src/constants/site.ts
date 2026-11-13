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
 * Headline numbers for the home-page ticker. Paperchase and Columbia-era work
 * only; each restates a figure from `timeline.tsx`, `leadership.tsx` or
 * `awards.tsx`, and `source` says where it is from.
 */
export const HIGHLIGHTS: { value: string; label: string; source: string }[] = [
  { value: "70%", label: "less time to extract contract terms", source: "Jain Global · Quant Developer Intern" },
  { value: "12–18%", label: "reduction in client churn", source: "Paperchase · AI Engineer" },
  { value: "$10B", label: "institutional portfolio simulated", source: "BMLL Technologies × Columbia" },
  { value: "40%", label: "fewer manual forecast adjustments", source: "Paperchase · AI Engineer" },
  { value: "50K", label: "Bloomberg data fields analysed for cost", source: "Jain Global · Quant Developer Intern" },
  { value: "20%", label: "better forecast accuracy (MAPE)", source: "Paperchase · AI Engineer" },
  { value: "30%", label: "wider anomaly-detection coverage", source: "Paperchase · AI Engineer" },
  { value: "1st", label: "AI adoption strategy case competition", source: "Columbia University · 2026" },
  { value: "#85", label: "in the US, IMC Prosperity 4", source: "Trading competition · 2026" },
];

export const ROLES = ["Data Scientist", "AI Engineer", "Quant"];

/** Places on the About-page map. */
export const PLACES = {
  gandhinagar: { lat: 23.2156, lng: 72.6369, label: "Gandhinagar" },
  newYork: { lat: 40.7128, lng: -74.006, label: "New York" },
  roorkee: { lat: 29.8543, lng: 77.888, label: "Roorkee" },
  uttarakhand: { lat: 30.0668, lng: 79.0193, label: "Uttarakhand" },
} as const;
