"use client";

import Image from "next/image";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

// Scatter positions: a loose 2×2 on phones, a single fanned row on desktop.
const LAYOUT = [
  "left-[5%] top-6 -rotate-6 md:left-[3%] md:top-10",
  "left-[52%] top-4 rotate-3 md:left-[27%] md:top-5",
  "left-[9%] top-56 rotate-2 md:left-[51%] md:top-12 md:-rotate-3",
  "left-[50%] top-60 -rotate-3 md:left-[74%] md:top-6 md:rotate-6",
];

/** Aceternity Draggable Cards: the photos can be picked up and tossed around. */
export function PhotoStack({ photos }: { photos: { src: string; alt: string }[] }) {
  return (
    <DraggableCardContainer className="relative h-[31rem] w-full overflow-hidden rounded-3xl border bg-surface md:h-[17rem]">
      <p className="absolute inset-x-0 bottom-5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Drag the photos
      </p>
      {photos.map((photo, i) => (
        <DraggableCardBody
          key={photo.src}
          className={`absolute min-h-0 w-[40%] rounded-xl border bg-card p-2 shadow-xl md:w-[23%] ${LAYOUT[i % LAYOUT.length]}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={400}
            height={520}
            className="pointer-events-none relative z-10 aspect-[4/5] w-full rounded-lg object-cover"
          />
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
