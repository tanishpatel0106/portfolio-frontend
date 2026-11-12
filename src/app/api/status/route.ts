import { getAllAppStatuses, getAppStatus } from "@/lib/app-status";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * GET /api/status                → health of every live app (cached 60 s)
 * GET /api/status?slug=x&fresh=1 → re-check one app now (used by the wake loader)
 * GET /api/status?warm=1         → hit every app's wake URL (Vercel Cron)
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const fresh = searchParams.get("fresh") === "1";
  const warm = searchParams.get("warm") === "1";

  if (fresh || warm) {
    const limited = await rateLimit(`status:${clientIp(req)}`, 60, 60);
    if (!limited.ok) return tooManyRequests(limited.retryAfterSeconds);
  }

  if (slug) {
    const status = await getAppStatus(slug, { fresh, wake: fresh });
    if (!status) {
      return Response.json({ error: "Unknown app" }, { status: 404 });
    }
    return Response.json(status, { headers: { "Cache-Control": "no-store" } });
  }

  const apps = await getAllAppStatuses({ fresh: warm, wake: warm });
  return Response.json(
    { apps },
    {
      headers: {
        "Cache-Control": warm
          ? "no-store"
          : "public, s-maxage=60, stale-while-revalidate=120",
      },
    }
  );
}
