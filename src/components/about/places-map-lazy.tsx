"use client";

import dynamic from "next/dynamic";

// The map library is sizeable and only needed here, so load it on demand.
export const PlacesMapLazy = dynamic(() => import("./places-map").then((m) => m.PlacesMap), {
  ssr: false,
  loading: () => <div className="aspect-[2/1] w-full animate-pulse rounded-2xl bg-muted" />,
});
