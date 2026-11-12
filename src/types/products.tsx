import type React from "react";

export type ProjectCategory = "finance" | "agents" | "ml" | "research" | "systems";

/** How a project can be tried live. All of this is optional. */
export type ProjectLive = {
  /**
   * iframe      – embed the running app in a browser frame
   * external    – open in a new tab only (site blocks framing / is commercial)
   * powerbi     – Power BI "Publish to web" embed URL
   * in-browser  – a demo that runs fully client-side at `url`
   */
  kind: "iframe" | "external" | "powerbi" | "in-browser";
  url: string;
  /** Pinged by /api/status. Defaults to `url`. */
  healthUrl?: string;
  /** Hit to wake a sleeping free-tier backend. Defaults to `healthUrl`. */
  wakeUrl?: string;
  /** Short note shown under the frame, e.g. "Read-only demo, sample data". */
  note?: string;
};

/** A Brag launch video (or any demo video) hosted on blob storage. */
export type ProjectVideo = {
  /** MP4 (H.264) URL. */
  src: string;
  /** Optional smaller WebM. */
  webm?: string;
  /** Poster frame shown before playback. */
  poster: string;
  /** Seconds. */
  duration?: number;
  /** WebVTT captions, when the video has a voiceover. */
  captions?: string;
};

export type Product = {
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  href: string;
  slug?: string;
  stack?: string[];
  content?: React.ReactNode | string;

  /* ---- Optional, additive fields. Existing entries need none of them. ---- */

  /** Pin to the top of "Selected work" on the home page. */
  featured?: boolean;
  year?: number;
  /** Overrides the category inferred from the title and stack. */
  category?: ProjectCategory;
  /** Headline numbers, e.g. { label: "Clients", value: "200+" }. */
  metrics?: { label: string; value: string }[];
  /** Source repository, when `href` points somewhere else. */
  repoUrl?: string;
  live?: ProjectLive;
  video?: ProjectVideo;
};
