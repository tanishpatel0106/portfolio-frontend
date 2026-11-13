"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { usePreferences } from "@/components/site/providers";

/** Aceternity-style opposing columns, driven by the page's natural scroll. */
export function PhotoGallery({ photos }: { photos: { src: string; alt: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const preferences = usePreferences();
  const paused = reducedMotion || preferences.motion === "reduced";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const down = useTransform(scrollYProgress, [0, 1], [-32, 32]);

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border bg-surface px-3 py-12 sm:px-6">
      <div className="grid grid-cols-2 items-start gap-3 sm:gap-6">
        {[0, 1].map((column) => (
          <motion.div
            key={column}
            style={{ y: paused ? 0 : column === 0 ? up : down }}
            className="grid gap-3 sm:gap-6"
          >
            {photos.filter((_, index) => index % 2 === column).map((photo) => (
              <div key={photo.src} className="overflow-hidden rounded-xl bg-card">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 45vw, 560px"
                  className="h-auto w-full"
                />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
