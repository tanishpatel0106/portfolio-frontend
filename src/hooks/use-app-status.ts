"use client";

import { useEffect, useState } from "react";
import type { AppStatus } from "@/lib/app-status";

type StatusMap = Record<string, AppStatus>;

// One request per page load, shared by every card that shows a status dot.
let pending: Promise<StatusMap> | null = null;

function load(): Promise<StatusMap> {
  if (!pending) {
    pending = fetch("/api/status")
      .then((r) => (r.ok ? r.json() : { apps: [] }))
      .then((data: { apps: AppStatus[] }) =>
        Object.fromEntries(data.apps.map((a) => [a.slug, a]))
      )
      .catch(() => ({}));
  }
  return pending;
}

/** Health of every live app, keyed by project slug. Empty until loaded. */
export function useAppStatuses(): StatusMap {
  const [statuses, setStatuses] = useState<StatusMap>({});
  useEffect(() => {
    let active = true;
    load().then((map) => active && setStatuses(map));
    return () => {
      active = false;
    };
  }, []);
  return statuses;
}
