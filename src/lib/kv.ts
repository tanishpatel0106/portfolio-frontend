// Optional Upstash Redis (REST). Every helper returns null when the store is
// not configured or unreachable, so features that depend on it (view counts,
// distributed rate limiting) degrade to "off" instead of failing.

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const kvConfigured = Boolean(url && token);

type Command = (string | number)[];

export async function kvPipeline<T = unknown>(
  commands: Command[]
): Promise<T[] | null> {
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: T; error?: string }[];
    if (data.some((d) => d.error)) return null;
    return data.map((d) => d.result as T);
  } catch {
    return null;
  }
}
