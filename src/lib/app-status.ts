import { getLiveProjects, getProject } from "@/lib/projects";

export type AppState = "live" | "waking" | "down";

export type AppStatus = {
  slug: string;
  state: AppState;
  latencyMs: number | null;
  checkedAt: string;
};

const CACHE_MS = 60_000;
const TIMEOUT_MS = 8_000;
const cache = new Map<string, { at: number; value: AppStatus }>();

async function probe(slug: string, url: string): Promise<AppStatus> {
  const started = Date.now();
  let state: AppState;
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "User-Agent": "portfolio-status-check" },
    });
    // 4xx still means a server answered (auth walls, bot challenges).
    // 502/503/504 is what free tiers return while a container is starting.
    if (res.status < 500) state = "live";
    else if ([502, 503, 504].includes(res.status)) state = "waking";
    else state = "down";
  } catch (err) {
    const name = err instanceof Error ? err.name : "";
    state = name === "TimeoutError" || name === "AbortError" ? "waking" : "down";
  }
  return {
    slug,
    state,
    latencyMs: state === "live" ? Date.now() - started : null,
    checkedAt: new Date().toISOString(),
  };
}

export async function getAppStatus(
  slug: string,
  { fresh = false, wake = false } = {}
): Promise<AppStatus | null> {
  const project = getProject(slug);
  const live = project?.live;
  if (!live) return null;

  const cached = cache.get(slug);
  if (!fresh && cached && Date.now() - cached.at < CACHE_MS) return cached.value;

  const target = (wake && live.wakeUrl) || live.healthUrl || live.url;
  const value = await probe(slug, target);
  cache.set(slug, { at: Date.now(), value });
  return value;
}

export async function getAllAppStatuses(opts?: {
  fresh?: boolean;
  wake?: boolean;
}): Promise<AppStatus[]> {
  const results = await Promise.all(
    getLiveProjects().map((p) => getAppStatus(p.slug, opts))
  );
  return results.filter((r): r is AppStatus => r !== null);
}
