import type { MetadataRoute } from "next";
import { research } from "@/constants/research";
import { SITE } from "@/constants/site";
import { getProjects } from "@/lib/projects";
import { getBlogMetas } from "../../lib/getAllBlogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogMetas();
  const page = (path: string, priority: number, lastModified?: string) => ({
    url: `${SITE.url}${path}`,
    priority,
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    page("", 1),
    page("/projects", 0.9),
    page("/lab", 0.8),
    page("/research", 0.8),
    page("/blog", 0.7),
    page("/about", 0.7),
    page("/resume", 0.8),
    page("/chat", 0.5),
    page("/contact", 0.5),
    ...getProjects().map((p) => page(`/projects/${p.slug}`, 0.7)),
    ...research.map((r) => page(`/research/${r.slug}`, 0.7)),
    ...posts.map((b) => page(`/blog/${b.slug}`, 0.6, b.date)),
  ];
}
