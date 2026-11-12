import { kvPipeline } from "@/lib/kv";

// Fixed-window rate limiter. Uses Upstash when configured (shared across
// serverless instances); otherwise falls back to per-instance memory, which
// still blunts bursts from a single client.

type Result = { ok: boolean; remaining: number; retryAfterSeconds: number };

const memory = new Map<string, { count: number; resetAt: number }>();

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<Result> {
  const bucket = Math.floor(Date.now() / (windowSeconds * 1000));
  const redisKey = `rl:${key}:${bucket}`;

  const remote = await kvPipeline<number>([
    ["INCR", redisKey],
    ["EXPIRE", redisKey, windowSeconds],
  ]);
  if (remote) {
    const count = Number(remote[0]);
    return {
      ok: count <= limit,
      remaining: Math.max(0, limit - count),
      retryAfterSeconds: windowSeconds,
    };
  }

  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    if (memory.size > 5000) {
      for (const [k, v] of memory) if (v.resetAt <= now) memory.delete(k);
    }
    return { ok: true, remaining: limit - 1, retryAfterSeconds: windowSeconds };
  }
  entry.count += 1;
  return {
    ok: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
  };
}

export const tooManyRequests = (retryAfterSeconds: number) =>
  new Response(
    JSON.stringify({ error: "Too many requests. Please try again shortly." }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSeconds),
      },
    }
  );
