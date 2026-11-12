import { ogImage, OG_SIZE } from "@/lib/og";
import { research } from "@/constants/research";

export const alt = "Research paper by Tanish Patel";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = research.find((r) => r.slug === slug);
  return ogImage({
    label: item ? `Research · ${item.category}` : "Research",
    title: item?.title ?? "Research",
  });
}
