// Shared threads between projects: a tool, method or domain that more than one
// project uses. This is the single place to say "these projects have X in
// common". The project graph on the Work page is built from it: two projects
// are linked when they appear in the same thread, and rarer threads make
// stronger links than ubiquitous ones like Python.
//
// To connect a new project, add its slug to every thread it belongs to (or add
// a new thread). Slugs are the `slug` values in products.tsx.

export type Thread = {
  id: string;
  label: string;
  projects: string[];
};

export const threads: Thread[] = [
  /* ---------------------------- finance & quant --------------------------- */
  {
    id: "trading",
    label: "Trading & execution",
    projects: ["simp", "prosperity-trading-terminal", "stat-arb", "fx-cross"],
  },
  {
    id: "portfolio",
    label: "Factor & portfolio models",
    projects: ["ai-at-the-margin", "lifecycle", "simp", "stat-arb"],
  },
  {
    id: "market-data",
    label: "WRDS / CRSP market data",
    projects: ["ai-at-the-margin", "lifecycle", "simp"],
  },
  {
    id: "simulation",
    label: "Simulation & bootstrap",
    projects: ["ai-at-the-margin", "lifecycle", "simp", "prosperity-trading-terminal", "stress-tester", "cloud-rl"],
  },
  {
    id: "financial-modelling",
    label: "Financial analysis & modelling",
    projects: ["ai-value-realization-dashboard", "stress-tester", "paperchaseai", "nlp2sql-agentic"],
  },
  {
    id: "time-series",
    label: "Time series & forecasting",
    projects: ["lifecycle", "stat-arb", "fx-cross", "paperchaseai", "atsforecast", "flsocpred"],
  },

  /* ------------------------------ AI & ML -------------------------------- */
  {
    id: "llms",
    label: "LLMs",
    projects: ["ai-at-the-margin", "matchodds-ai", "stress-tester", "nlp2sql-agentic", "paperchaseai", "margshala"],
  },
  {
    id: "agents",
    label: "Agentic systems",
    projects: ["matchodds-ai", "nlp2sql-agentic", "paperchaseai", "cloud-rl"],
  },
  {
    id: "deep-learning",
    label: "Deep learning",
    projects: ["cloud-rl", "fx-cross", "paperchaseai", "demystifyingdefects", "posturecorrection"],
  },
  {
    id: "classical-ml",
    label: "Classical ML",
    projects: [
      "fx-cross",
      "paperchaseai",
      "pmscania",
      "atsforecast",
      "prognosisappointment",
      "flsocpred",
      "data-valuation-ocean-carbon",
    ],
  },
  {
    id: "federated",
    label: "Federated learning",
    projects: ["pmscania", "demystifyingdefects", "flsocpred"],
  },
  {
    id: "xai",
    label: "Explainable AI",
    projects: ["pmscania", "demystifyingdefects"],
  },
  {
    id: "computer-vision",
    label: "Computer vision",
    projects: ["demystifyingdefects", "posturecorrection"],
  },

  /* ------------------------------ engineering ---------------------------- */
  {
    id: "python",
    label: "Python",
    projects: [
      "ai-at-the-margin",
      "lifecycle",
      "simp",
      "prosperity-trading-terminal",
      "ai-value-realization-dashboard",
      "matchodds-ai",
      "cloud-rl",
      "data-valuation-ocean-carbon",
      "paperchaseai",
      "demystifyingdefects",
      "posturecorrection",
      "flsocpred",
    ],
  },
  {
    id: "pandas-numpy",
    label: "pandas & NumPy",
    projects: [
      "ai-at-the-margin",
      "lifecycle",
      "prosperity-trading-terminal",
      "ai-value-realization-dashboard",
      "data-valuation-ocean-carbon",
    ],
  },
  {
    id: "fastapi",
    label: "FastAPI",
    projects: ["lifecycle", "simp", "prosperity-trading-terminal", "matchodds-ai", "cloud-rl", "paperchaseai"],
  },
  {
    id: "react",
    label: "React",
    projects: [
      "ai-at-the-margin",
      "lifecycle",
      "simp",
      "prosperity-trading-terminal",
      "matchodds-ai",
      "cloud-rl",
      "stress-tester",
      "paperchaseai",
      "margshala",
    ],
  },
  {
    id: "nextjs",
    label: "Next.js",
    projects: ["lifecycle", "simp", "stress-tester"],
  },
  {
    id: "typescript",
    label: "TypeScript",
    projects: ["ai-at-the-margin", "lifecycle", "simp", "prosperity-trading-terminal", "stress-tester"],
  },
  {
    id: "sql",
    label: "SQL databases",
    projects: [
      "ai-at-the-margin",
      "lifecycle",
      "simp",
      "prosperity-trading-terminal",
      "nlp2sql-agentic",
      "paperchaseai",
      "margshala",
    ],
  },
  {
    id: "docker",
    label: "Docker",
    projects: ["lifecycle", "simp"],
  },
  {
    id: "testing",
    label: "Tested, reproducible runs",
    projects: ["ai-at-the-margin", "lifecycle", "simp"],
  },
  {
    id: "dashboards",
    label: "Interactive dashboards",
    projects: [
      "ai-at-the-margin",
      "lifecycle",
      "simp",
      "prosperity-trading-terminal",
      "ai-value-realization-dashboard",
      "cloud-rl",
    ],
  },
  {
    id: "power-bi",
    label: "Power BI",
    projects: ["ai-value-realization-dashboard", "paperchaseai", "flsocpred"],
  },
  {
    id: "azure",
    label: "Azure",
    projects: ["paperchaseai", "atsforecast"],
  },
];
