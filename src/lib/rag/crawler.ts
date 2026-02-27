import { CrawledPage } from "./types";

const MAX_PAGES = 200;
const CRAWL_DELAY_MS = 300;

function resolveUrl(base: string, relative: string): string | null {
  try {
    const url = new URL(relative, base);
    // Only allow same-origin URLs
    const baseUrl = new URL(base);
    if (url.origin !== baseUrl.origin) return null;
    // Strip hash and search params for dedup
    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
}

function isValidPageUrl(url: string): boolean {
  const parsed = new URL(url);
  const path = parsed.pathname.toLowerCase();
  // Skip static assets, API routes, and file downloads
  const skipExtensions = [
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico",
    ".css", ".js", ".map", ".woff", ".woff2", ".ttf", ".eot",
    ".pdf", ".zip", ".tar", ".gz", ".xml", ".json", ".txt",
  ];
  return !skipExtensions.some((ext) => path.endsWith(ext))
    && !path.startsWith("/api/");
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "PortfolioChatBot/1.0 (internal indexer)",
        Accept: "text/html",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;
    return await response.text();
  } catch {
    return null;
  }
}

async function parseSitemap(baseUrl: string): Promise<string[]> {
  try {
    const sitemapUrl = new URL("/sitemap.xml", baseUrl).href;
    const response = await fetch(sitemapUrl, {
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return [];
    const text = await response.text();
    // Simple XML parsing for <loc> tags
    const urls: string[] = [];
    const locRegex = /<loc>(.*?)<\/loc>/gi;
    let match;
    while ((match = locRegex.exec(text)) !== null) {
      const url = match[1].trim();
      if (isValidPageUrl(url)) {
        urls.push(url);
      }
    }
    return urls;
  } catch {
    return [];
  }
}

function extractLinks(html: string, pageUrl: string): string[] {
  const links: string[] = [];
  const hrefRegex = /<a[^>]+href=["']([^"']+)["']/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const resolved = resolveUrl(pageUrl, match[1]);
    if (resolved && isValidPageUrl(resolved)) {
      links.push(resolved);
    }
  }
  return links;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function crawlSite(baseUrl: string): Promise<CrawledPage[]> {
  const pages: CrawledPage[] = [];
  const visited = new Set<string>();
  const queue: string[] = [];

  // Try sitemap first
  const sitemapUrls = await parseSitemap(baseUrl);
  if (sitemapUrls.length > 0) {
    queue.push(...sitemapUrls);
  } else {
    // Fall back to homepage crawling
    queue.push(baseUrl);
  }

  while (queue.length > 0 && pages.length < MAX_PAGES) {
    const url = queue.shift()!;
    // Normalize URL for dedup
    const normalized = url.replace(/\/$/, "");
    if (visited.has(normalized)) continue;
    visited.add(normalized);

    const html = await fetchPage(url);
    if (!html) continue;

    pages.push({ url: normalized, html });

    // Extract and enqueue new links
    const links = extractLinks(html, url);
    for (const link of links) {
      const normLink = link.replace(/\/$/, "");
      if (!visited.has(normLink) && !queue.includes(normLink)) {
        queue.push(normLink);
      }
    }

    // Be polite
    if (queue.length > 0) {
      await delay(CRAWL_DELAY_MS);
    }
  }

  return pages;
}
