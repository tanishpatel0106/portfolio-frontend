import * as cheerio from "cheerio";

export interface CrawledPage {
  url: string;
  title: string;
  content: string;
}

function normalizeUrl(url: string, base: string): string | null {
  try {
    const parsed = new URL(url, base);
    // Only allow same-origin
    const baseOrigin = new URL(base).origin;
    if (parsed.origin !== baseOrigin) return null;
    // Remove hash and trailing slash
    parsed.hash = "";
    let pathname = parsed.pathname;
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }
    parsed.pathname = pathname;
    return parsed.toString();
  } catch {
    return null;
  }
}

async function fetchSitemapUrls(baseUrl: string): Promise<string[]> {
  try {
    const response = await fetch(`${baseUrl}/sitemap.xml`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return [];
    const xml = await response.text();
    const $ = cheerio.load(xml, { xmlMode: true });
    const urls: string[] = [];
    $("url > loc").each((_, el) => {
      const loc = $(el).text().trim();
      if (loc) urls.push(loc);
    });
    return urls;
  } catch {
    return [];
  }
}

function extractContent($: cheerio.CheerioAPI): string {
  // Remove non-content elements
  $(
    "script, style, nav, footer, header, noscript, iframe, svg, [role='navigation'], [role='banner'], [role='contentinfo']"
  ).remove();

  // Try to find main content area
  const mainSelectors = ["main", "article", "#content", ".content", "#main"];
  for (const selector of mainSelectors) {
    const main = $(selector);
    if (main.length > 0) {
      return cleanText(main.text());
    }
  }

  // Fallback to body
  return cleanText($("body").text());
}

function extractTitle($: cheerio.CheerioAPI): string {
  const ogTitle = $('meta[property="og:title"]').attr("content");
  if (ogTitle) return ogTitle.trim();

  const titleTag = $("title").text().trim();
  if (titleTag) return titleTag;

  const h1 = $("h1").first().text().trim();
  if (h1) return h1;

  return "Untitled";
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractStructuredContent($: cheerio.CheerioAPI): string {
  // Remove non-content elements
  $(
    "script, style, nav, footer, header, noscript, iframe, svg, [role='navigation'], [role='banner'], [role='contentinfo']"
  ).remove();

  const blocks: string[] = [];

  // Find main content area
  let root: cheerio.Cheerio<cheerio.AnyNode>;
  const mainSelectors = ["main", "article", "#content", ".content", "#main"];
  let found = false;
  for (const selector of mainSelectors) {
    const el = $(selector);
    if (el.length > 0) {
      root = el;
      found = true;
      break;
    }
  }
  if (!found) {
    root = $("body");
  }

  // Walk through block-level elements preserving structure
  root!
    .find("h1, h2, h3, h4, h5, h6, p, li, pre, blockquote, td, th")
    .each((_, el) => {
      const tag = (el as cheerio.Element).tagName?.toLowerCase();
      const text = $(el).text().trim();
      if (!text) return;

      if (tag && tag.startsWith("h")) {
        const level = parseInt(tag[1]);
        blocks.push(`\n${"#".repeat(level)} ${text}\n`);
      } else if (tag === "pre") {
        blocks.push(`\n\`\`\`\n${text}\n\`\`\`\n`);
      } else if (tag === "li") {
        blocks.push(`- ${text}`);
      } else if (tag === "blockquote") {
        blocks.push(`> ${text}`);
      } else {
        blocks.push(text);
      }
    });

  // If no blocks found, fall back to plain text
  if (blocks.length === 0) {
    return extractContent($);
  }

  return blocks.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function fetchPage(url: string): Promise<CrawledPage | null> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(15000),
      headers: {
        "User-Agent": "TanishPortfolioBot/1.0 (indexing own site)",
      },
    });
    if (!response.ok) return null;

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;

    const html = await response.text();
    const $ = cheerio.load(html);
    const title = extractTitle($);
    const content = extractStructuredContent($);

    // Skip pages with too little content
    if (content.length < 50) return null;

    return { url, title, content };
  } catch {
    return null;
  }
}

function extractInternalLinks(
  $: cheerio.CheerioAPI,
  baseUrl: string
): string[] {
  const links: string[] = [];
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    const normalized = normalizeUrl(href, baseUrl);
    if (normalized) links.push(normalized);
  });
  return [...new Set(links)];
}

export async function crawlSite(baseUrl: string): Promise<CrawledPage[]> {
  const pages: CrawledPage[] = [];
  const visited = new Set<string>();

  // Step 1: Try sitemap
  const sitemapUrls = await fetchSitemapUrls(baseUrl);

  if (sitemapUrls.length > 0) {
    // Crawl all sitemap URLs
    for (const url of sitemapUrls) {
      if (visited.has(url)) continue;
      visited.add(url);

      const page = await fetchPage(url);
      if (page) pages.push(page);

      // Rate limit: small delay between requests
      await new Promise((r) => setTimeout(r, 200));
    }
    return pages;
  }

  // Step 2: BFS crawl from homepage
  const queue: string[] = [baseUrl];
  visited.add(baseUrl);
  const maxPages = 50;

  while (queue.length > 0 && pages.length < maxPages) {
    const url = queue.shift()!;

    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(15000),
        headers: {
          "User-Agent": "TanishPortfolioBot/1.0 (indexing own site)",
        },
      });
      if (!response.ok) continue;

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("text/html")) continue;

      const html = await response.text();
      const $ = cheerio.load(html);

      const title = extractTitle($);
      const content = extractStructuredContent($);

      if (content.length >= 50) {
        pages.push({ url, title, content });
      }

      // Extract and queue internal links
      const links = extractInternalLinks($, baseUrl);
      for (const link of links) {
        if (!visited.has(link) && visited.size < maxPages) {
          visited.add(link);
          queue.push(link);
        }
      }
    } catch {
      // Skip failed pages
    }

    await new Promise((r) => setTimeout(r, 200));
  }

  return pages;
}
