import glob from "fast-glob";
import { readFile } from "fs/promises";
import * as path from "path";
import type { ComponentType } from "react";

export type BlogMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags?: string[];
  /** Estimated from the MDX source at ~220 words per minute. */
  readingMinutes: number;
};

const BLOG_DIR = path.join(process.cwd(), "src/app/blog");

async function readingMinutes(file: string): Promise<number> {
  const source = await readFile(path.join(BLOG_DIR, file), "utf8");
  // Drop the import/meta preamble so only prose is counted.
  const body = source.replace(/^[\s\S]*?export default[^\n]*\n/, "");
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

async function importBlog(
  blogFileName: string
): Promise<BlogMeta & { component: ComponentType }> {
  const { meta, default: component } = await import(
    `@/app/blog/${blogFileName}`
  );
  return {
    slug: blogFileName.replace(/(\/content)?\.mdx$/, ""),
    ...meta,
    readingMinutes: await readingMinutes(blogFileName),
    component,
  };
}

export async function getAllBlogs() {
  const blogFileNames = await glob(["*.mdx", "*/content.mdx"], {
    cwd: BLOG_DIR,
  });

  const blogs = await Promise.all(blogFileNames.map(importBlog));

  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Metadata only (safe to pass to client components). */
export async function getBlogMetas(): Promise<BlogMeta[]> {
  const blogs = await getAllBlogs();
  return blogs.map(({ component: _component, ...meta }) => meta);
}
