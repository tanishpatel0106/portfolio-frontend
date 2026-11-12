"use client";

import { useEffect, useState } from "react";

/** Records a view and shows the total. Renders nothing when counting is off. */
export function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((r) => (r.ok ? r.json() : { views: null }))
      .then((d: { views: number | null }) => active && setViews(d.views))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [slug]);

  if (views === null) return null;
  return (
    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  );
}
