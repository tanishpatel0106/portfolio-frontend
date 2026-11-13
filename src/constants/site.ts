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
 * Headline numbers for the home-page ticker. Every one is taken from a bullet
 * in the work history (`timeline.tsx`); `source` names the role it comes from.
 */
export const HIGHLIGHTS: { value: string; label: string; source: string }[] = [
  { value: "2,640", label: "LLM calls planned across 12 models", source: "Man Group × Columbia" },
  { value: "1,002", label: "trading sessions per simulated fund run", source: "BMLL Technologies × Columbia" },
  { value: "2,000", label: "simulated paths per cell, 91-cell sweeps", source: "Wedmont Private Capital × Columbia" },
  { value: "~300K", label: "ocean samples across 13 datasets", source: "Lamont-Doherty Earth Observatory" },
  { value: "0.5 bps", label: "tolerance on the trading-cost check", source: "BMLL Technologies × Columbia" },
  { value: "14", label: "allocation policies, 5 scenario generators", source: "Wedmont Private Capital × Columbia" },
  { value: "8+", label: "data-valuation methods implemented", source: "Lamont-Doherty Earth Observatory" },
  { value: "7", label: "factor exposures measured per issuer", source: "Man Group × Columbia" },
];

export const ROLES = ["Data Scientist", "AI Engineer", "Quant"];

/** Places on the About-page map. */
export const PLACES = {
  gandhinagar: { lat: 23.2156, lng: 72.6369, label: "Gandhinagar" },
  newYork: { lat: 40.7128, lng: -74.006, label: "New York" },
  roorkee: { lat: 29.8543, lng: 77.888, label: "Roorkee" },
  uttarakhand: { lat: 30.0668, lng: 79.0193, label: "Uttarakhand" },
} as const;
