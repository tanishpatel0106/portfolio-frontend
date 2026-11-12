import { z } from "zod";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(5000),
  // Honeypot: real visitors never see or fill this field.
  company: z.string().max(0).optional().or(z.literal("")),
});

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * POST /api/contact — delivers the form through Resend.
 * Needs RESEND_API_KEY and CONTACT_TO_EMAIL; CONTACT_FROM_EMAIL is optional
 * (defaults to Resend's shared sender, which only delivers to the account owner).
 */
export async function POST(req: Request) {
  const limited = await rateLimit(`contact:${clientIp(req)}`, 5, 3600);
  if (!limited.ok) return tooManyRequests(limited.retryAfterSeconds);

  let parsed;
  try {
    parsed = Body.safeParse(await req.json());
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!parsed.success) {
    return Response.json(
      { error: "Please add your name, a valid email and a message of at least 10 characters." },
      { status: 400 }
    );
  }
  const { name, email, message, company } = parsed.data;
  // A filled honeypot is a bot: answer as if it worked and drop it.
  if (company) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json(
      { error: "The contact form is not configured yet. Please reach out on LinkedIn instead." },
      { status: 503 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  if (!res || !res.ok) {
    return Response.json(
      { error: "The message could not be sent. Please try again or use LinkedIn." },
      { status: 502 }
    );
  }
  return Response.json({ ok: true });
}
