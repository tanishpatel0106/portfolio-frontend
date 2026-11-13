"use client";

import { motion, useInView, useScroll, useSpring } from "motion/react";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export type StoryItem = { label?: string; node: React.ReactNode };

function Step({ item, index }: { item: StoryItem; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // "Active" while the paragraph crosses the middle band of the screen.
  const active = useInView(ref, { margin: "-35% 0px -45% 0px" });
  const number = String(index + 1).padStart(2, "0");

  return (
    <li ref={ref} className="relative grid gap-x-8 gap-y-2 pb-10 pl-9 last:pb-0 md:grid-cols-[8.5rem_1fr]">
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border bg-background transition-colors duration-300",
          active ? "border-brand" : "border-border"
        )}
      >
        <span
          className={cn(
            "h-[7px] w-[7px] rounded-full transition-all duration-300",
            active ? "scale-100 bg-brand" : "scale-50 bg-muted-foreground/40"
          )}
        />
      </span>

      <div className="md:sticky md:top-28 md:self-start">
        <p className="font-mono text-[11px] uppercase leading-5 tracking-[0.16em]">
          <span className={cn("transition-colors duration-300", active ? "text-brand" : "text-muted-foreground")}>
            {number}
          </span>
          {item.label && (
            <span
              className={cn(
                "mt-0.5 block transition-colors duration-300 md:mt-1",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.label}
            </span>
          )}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "text-[1.02rem] leading-relaxed transition-colors duration-500 [&_a]:text-brand [&_a]:underline [&_p]:m-0 [&_strong]:text-foreground",
          active ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {item.node}
      </motion.div>
    </li>
  );
}

/**
 * A write-up shown the way the resume timeline is: a rail that fills as you
 * scroll, a marker per paragraph that lights up as it passes, sticky labels
 * on the left, and paragraphs that fade in and come into focus one at a time.
 */
export function ScrollStory({ items }: { items: StoryItem[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 62%", "end 62%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 220, damping: 40 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-primary via-brand to-brand"
      />
      {items.map((item, i) => (
        <Step key={i} item={item} index={i} />
      ))}
    </ol>
  );
}
