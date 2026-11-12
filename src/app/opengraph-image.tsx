import { ogImage, OG_SIZE } from "@/lib/og";
import { SITE } from "@/constants/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    label: SITE.role,
    title: "AI systems for finance, analytics and real-world decisions",
    summary: SITE.availability,
  });
}
