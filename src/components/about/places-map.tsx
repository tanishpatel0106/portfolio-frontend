"use client";

import dynamic from "next/dynamic";
import { PLACES } from "@/constants/site";

// The dotted map is generated in the browser; skip it during SSR.
const WorldMap = dynamic(() => import("@/components/ui/world-map"), {
  ssr: false,
  loading: () => <div className="aspect-[2/1] w-full animate-pulse rounded-2xl bg-muted" />,
});

/** Aceternity World Map with an arc from each place to the next. */
export function PlacesMap() {
  const legs = PLACES.slice(0, -1).map((place, i) => ({ start: place, end: PLACES[i + 1] }));
  return (
    <div>
      <WorldMap lineColor="var(--brand)" dots={legs} labels={PLACES} />
      <ol className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 px-2 pb-2 md:mt-0">
        {PLACES.map((place, i) => (
          <li key={place.label} className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs text-foreground">
              <span className="font-mono text-[10px] text-brand">{String(i + 1).padStart(2, "0")}</span>
              {place.label}
            </span>
            {i < PLACES.length - 1 && (
              <span aria-hidden className="text-muted-foreground">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
