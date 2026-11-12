import { kvConfigured, kvPipeline } from "@/lib/kv";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SLUG = /^[a-z0-9][a-z0-9/_-]{0,80}$/i;

/** POST counts a view (once per visitor per hour) and returns the total. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!SLUG.test(slug)) {
    return Response.json({ error: "Invalid slug" }, { status: 400 });
  }
  // View counts need the optional Upstash store. Without it, report "off".
  if (!kvConfigured) return Response.json({ views: null });

  const fresh = await rateLimit(`view:${slug}:${clientIp(req)}`, 1, 3600);
  const result = await kvPipeline<number | string | null>(
    fresh.ok ? [["INCR", `views:${slug}`]] : [["GET", `views:${slug}`]]
  );
  const views = result ? Number(result[0] ?? 0) : null;
  return Response.json({ views });
}
