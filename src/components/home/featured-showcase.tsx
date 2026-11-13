"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { VideoPlayer } from "@/components/shared/video-player";
import { ArrowLink, Eyebrow } from "@/components/shared/primitives";
import { usePreferences } from "@/components/site/providers";
import type { ProjectVideo } from "@/types/products";
import { cn } from "@/lib/utils";

export type FeaturedItem = {
  slug: string;
  shortTitle: string;
  description: string;
  thumbnail: string;
  alt?: string;
  video?: ProjectVideo;
  repoUrl?: string;
  category: string;
  metrics?: { label: string; value: string }[];
};

const ROTATE_MS = 7000;

/**
 * Home-page showcase for several hero projects. The tabs switch which project
 * is on the tilting screen (Aceternity Container Scroll); it advances on its
 * own while in view, and pauses on hover, on focus and when motion is reduced.
 */
export function FeaturedShowcase({ items }: { items: FeaturedItem[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const { motion: motionPref } = usePreferences();
  const item = items[active];
  const many = items.length > 1;
  const autoplay = many && inView && !paused && motionPref !== "reduced" && !item.video;

  useEffect(() => {
    if (!autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive((a) => (a + 1) % items.length), ROTATE_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, active, items.length]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    setActive(next);
    document.getElementById(`featured-tab-${next}`)?.focus();
  };

  return (
    <section
      ref={ref}
      aria-label="Featured projects"
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ContainerScroll
        titleComponent={
          <div className="mx-auto mb-6 max-w-4xl px-4">
            <Eyebrow className="flex items-center justify-center gap-2">
              <span className="text-brand">01</span>
              <span aria-hidden>/</span>
              {many ? "Featured builds" : "Featured build"}
            </Eyebrow>

            {many && (
              <div
                role="tablist"
                aria-label="Featured projects"
                onKeyDown={onKeyDown}
                className="mt-5 flex flex-wrap justify-center gap-2"
              >
                {items.map((it, i) => (
                  <button
                    key={it.slug}
                    id={`featured-tab-${i}`}
                    role="tab"
                    type="button"
                    aria-selected={i === active}
                    aria-controls="featured-panel"
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative overflow-hidden rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                      i === active
                        ? "border-foreground bg-foreground text-background"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {it.shortTitle}
                    {i === active && autoplay && (
                      <span
                        key={active}
                        aria-hidden
                        className="featured-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary"
                        style={{ animationDuration: `${ROTATE_MS}ms` }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div id="featured-panel" role={many ? "tabpanel" : undefined} aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {item.category}
                  </p>
                  <h2 className="mt-2 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                    {item.shortTitle}
                  </h2>
                  <p className="mx-auto mt-4 line-clamp-3 min-h-[4.5rem] max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:min-h-[3.25rem] md:line-clamp-2">
                    {item.description}
                  </p>
                  {item.metrics && item.metrics.length > 0 && (
                    <dl className="mx-auto mt-5 hidden max-w-3xl grid-cols-4 gap-px overflow-hidden rounded-xl border bg-border text-left md:grid">
                      {item.metrics.slice(0, 4).map((m) => (
                        <div key={m.label} className="bg-card px-4 py-3">
                          <dd className="font-mono text-xl font-medium tracking-tight text-foreground">
                            {m.value}
                          </dd>
                          <dt className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground">
                            {m.label}
                          </dt>
                        </div>
                      ))}
                    </dl>
                  )}
                  <div className="mt-5 flex justify-center gap-6">
                    <ArrowLink href={`/projects/${item.slug}`}>Read the case study</ArrowLink>
                    {item.repoUrl && <ArrowLink href={item.repoUrl}>Source</ArrowLink>}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        }
      >
        <div className="relative h-full w-full">
          <AnimatePresence initial={false}>
            <motion.div
              key={item.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0"
            >
              {item.video ? (
                <VideoPlayer video={item.video} title={item.shortTitle} className="h-full w-full rounded-xl" />
              ) : (
                <Link href={`/projects/${item.slug}`} tabIndex={-1} aria-hidden className="relative block h-full w-full">
                  <Image
                    src={item.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 960px, 100vw"
                    className="rounded-xl object-cover object-left-top"
                    draggable={false}
                  />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </ContainerScroll>
    </section>
  );
}
