"use client";

import dynamic from "next/dynamic";
import { PLACES } from "@/constants/site";

// The dotted map is generated in the browser; skip it during SSR.
const WorldMap = dynamic(() => import("@/components/ui/world-map"), {
  ssr: false,
  loading: () => <div className="aspect-[2/1] w-full animate-pulse rounded-2xl bg-muted" />,
});

/** Aceternity World Map with arcs between the places in the story. */
export function PlacesMap() {
  return (
    <WorldMap
      lineColor="var(--brand)"
      dots={[
        { start: PLACES.gandhinagar, end: PLACES.newYork },
        { start: PLACES.gandhinagar, end: PLACES.roorkee },
        { start: PLACES.roorkee, end: PLACES.uttarakhand },
      ]}
    />
  );
}
