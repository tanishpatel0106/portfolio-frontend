"use client";

import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import type { ProjectVideo } from "@/types/products";
import { usePreferences } from "@/components/site/providers";
import { cn } from "@/lib/utils";

/**
 * Poster-first video. Nothing downloads until it scrolls into view; it then
 * autoplays muted (unless motion is reduced) and pauses when it leaves.
 */
export function VideoPlayer({
  video,
  title,
  className,
  autoPlay = true,
  fit = "cover",
}: {
  video: ProjectVideo;
  title: string;
  className?: string;
  autoPlay?: boolean;
  fit?: "cover" | "contain";
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const { motion } = usePreferences();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !autoPlay) return;
    const reduced =
      motion === "reduced" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlay, motion]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <div className={cn("group/video relative overflow-hidden bg-black", className)}>
      <video
        ref={ref}
        className={cn("h-full w-full", fit === "cover" ? "object-cover" : "object-contain")}
        poster={video.poster}
        preload="none"
        muted={muted}
        loop
        playsInline
        aria-label={`${title} demo video`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.src} type="video/mp4" />
        {video.captions && (
          <track kind="captions" src={video.captions} srcLang="en" label="English" default />
        )}
      </video>

      <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-100 transition-opacity md:opacity-0 md:group-hover/video:opacity-100 md:group-focus-within/video:opacity-100">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm transition-colors hover:bg-black/85"
        >
          {playing ? (
            <IconPlayerPauseFilled className="h-4 w-4" />
          ) : (
            <IconPlayerPlayFilled className="h-4 w-4" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm transition-colors hover:bg-black/85"
        >
          {muted ? <IconVolumeOff className="h-4 w-4" /> : <IconVolume className="h-4 w-4" />}
        </button>
      </div>

      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-black/10"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
            <IconPlayerPlayFilled className="h-6 w-6" />
          </span>
        </button>
      )}
    </div>
  );
}
