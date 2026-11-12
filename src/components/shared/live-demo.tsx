"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconExternalLink,
  IconPlayerPlayFilled,
  IconRefresh,
  IconX,
} from "@tabler/icons-react";
import type { ProjectLive, ProjectVideo } from "@/types/products";
import type { AppStatus } from "@/lib/app-status";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { buttonClass, StatusBadge, type Status } from "./primitives";
import { VideoPlayer } from "./video-player";
import { useAppStatuses } from "@/hooks/use-app-status";
import { cn } from "@/lib/utils";

const WAKE_STEPS = [
  { text: "Pinging the server" },
  { text: "Waking the free-tier container" },
  { text: "Starting the app" },
  { text: "Loading data" },
  { text: "Almost there" },
];

const MAX_ATTEMPTS = 15;
const RETRY_MS = 3000;

type Phase = "idle" | "checking" | "waking" | "ready" | "failed";

const hostOf = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

/**
 * A browser-style frame around a live app. Nothing loads until the visitor
 * asks for it. If the backend is asleep (free tier), it is woken through
 * /api/status while a step loader is shown; if that fails the video or
 * screenshot stays up with an "open in new tab" link.
 */
export function LiveDemo({
  slug,
  title,
  live,
  poster,
  video,
  initialStatus,
  className,
}: {
  slug: string;
  title: string;
  live: ProjectLive;
  poster: string;
  video?: ProjectVideo;
  initialStatus?: AppStatus;
  className?: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const cancelled = useRef(false);
  const known = useAppStatuses()[slug] ?? initialStatus;
  const embeddable = live.kind !== "external";

  useEffect(() => () => void (cancelled.current = true), []);

  const launch = useCallback(async () => {
    cancelled.current = false;
    setPhase("checking");
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      if (cancelled.current) return;
      try {
        const res = await fetch(`/api/status?slug=${slug}&fresh=1`);
        const status = (await res.json()) as AppStatus;
        if (status.state === "live") {
          if (!cancelled.current) setPhase("ready");
          return;
        }
      } catch {
        /* treat as still waking and retry */
      }
      if (cancelled.current) return;
      setPhase("waking");
      await new Promise((r) => setTimeout(r, RETRY_MS));
    }
    if (!cancelled.current) setPhase("failed");
  }, [slug]);

  const cancel = () => {
    cancelled.current = true;
    setPhase("idle");
  };

  const badge: Status =
    phase === "ready"
      ? "live"
      : phase === "waking" || phase === "checking"
        ? "waking"
        : phase === "failed"
          ? "down"
          : known?.state ?? "idle";

  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-card shadow-sm", className)}>
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b bg-muted/60 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
          {hostOf(live.url)}
        </div>
        <StatusBadge status={badge} className="hidden sm:inline-flex" />
        <a
          href={live.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} in a new tab`}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <IconExternalLink className="h-4 w-4" stroke={1.75} />
        </a>
      </div>

      <div className="relative aspect-[16/10] w-full bg-muted">
        {phase === "ready" && embeddable ? (
          <iframe
            src={live.url}
            title={`${title} — live demo`}
            className="h-full w-full bg-white"
            loading="lazy"
            allow="clipboard-write; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
          />
        ) : (
          <>
            {video ? (
              <VideoPlayer video={video} title={title} className="absolute inset-0" />
            ) : (
              <Image
                src={poster}
                alt={`${title} screenshot`}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-top"
              />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/40 p-6 text-center">
              {phase === "failed" ? (
                <>
                  <p className="max-w-sm text-sm text-foreground">
                    The demo didn’t wake up in time. It may still be starting.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button type="button" onClick={launch} className={buttonClass("primary")}>
                      <IconRefresh className="h-4 w-4" />
                      Try again
                    </button>
                    <a
                      href={live.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass("outline")}
                    >
                      Open in new tab
                    </a>
                  </div>
                </>
              ) : embeddable ? (
                <button
                  type="button"
                  onClick={launch}
                  disabled={phase !== "idle"}
                  className={buttonClass("primary", "h-12 px-6 shadow-xl")}
                >
                  <IconPlayerPlayFilled className="h-4 w-4" />
                  {phase === "idle" ? "Launch live demo" : "Connecting…"}
                </button>
              ) : (
                <a
                  href={live.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("primary", "h-12 px-6 shadow-xl")}
                >
                  <IconExternalLink className="h-4 w-4" />
                  Open the live site
                </a>
              )}
              {live.note && phase !== "failed" && (
                <p className="max-w-sm font-mono text-[11px] text-muted-foreground">
                  {live.note}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Aceternity Multi Step Loader while a sleeping backend starts up. */}
      <MultiStepLoader loadingStates={WAKE_STEPS} loading={phase === "waking"} duration={2500} loop={false} />
      {phase === "waking" && (
        <button
          type="button"
          onClick={cancel}
          aria-label="Cancel"
          className="fixed right-5 top-5 z-[120] inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card text-foreground shadow-lg"
        >
          <IconX className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
