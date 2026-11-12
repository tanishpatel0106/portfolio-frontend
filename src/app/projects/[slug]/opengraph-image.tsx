import { ogImage, OG_SIZE } from "@/lib/og";
import { CATEGORY_LABELS, getProject, getProjects } from "@/lib/projects";

export const alt = "Project by Tanish Patel";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return ogImage({
    label: project ? CATEGORY_LABELS[project.category] : "Work",
    title: project?.shortTitle ?? "Work",
    summary: project?.description,
  });
}
