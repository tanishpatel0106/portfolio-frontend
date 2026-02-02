import fs from "fs/promises";
import path from "path";
import { load } from "cheerio";
import { XMLParser } from "fast-xml-parser";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";

const SITE_URL = process.env.SITE_URL?.replace(/\/$/, "");
const EMBEDDING_MODEL = "text-embedding-3-small";
const CHUNK_TOKEN_MIN = 250;
const CHUNK_TOKEN_MAX = 450;
const CHUNK_TOKEN_OVERLAP = 50;
const MAX_PAGES = 200;

if (!SITE_URL) {
  throw new Error("SITE_URL environment variable is required.");
}

const parser = new XMLParser({
  ignoreAttributes: false,
  allowBooleanAttributes: true,
});

const blockedExtensions = new RegExp(
  "\\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|map|pdf|zip|gz|mp4|mp3|woff2?|ttf|otf)$",
  "i"
);
const blockedPathPatterns = [
  /\\/api\\//i,
  /\\/admin/i,
  /\\/auth/i,
  /\\/login/i,
  /\\/logout/i,
  /\\/signup/i,
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeUrl = (url: string) => {
  const parsed = new URL(url);
  parsed.hash = "";
  parsed.search = "";
  const normalized = parsed.toString();
  return normalized.endsWith("/") && normalized !== `${parsed.origin}/`
    ? normalized.slice(0, -1)
    : normalized;
};

const isAllowedUrl = (url: string, origin: string) => {
  let parsed: URL;
  try {
    parsed = new URL(url, origin);
  } catch {
    return false;
  }

  if (parsed.origin !== origin) return false;
  if (parsed.search) return false;
  if (blockedExtensions.test(parsed.pathname)) return false;
  if (blockedPathPatterns.some((pattern) => pattern.test(parsed.pathname))) {
    return false;
  }

  return true;
};

const fetchWithRetry = async (url: string, retries = 2, timeoutMs = 10000) => {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "portfolio-rag-indexer/1.0",
        },
      });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      await sleep(500 * (attempt + 1));
    }
  }

  throw new Error(`Failed to fetch ${url}`);
};

const parseSitemapXml = (xml: string) => {
  const parsed = parser.parse(xml);
  if (parsed.urlset?.url) {
    const urls = Array.isArray(parsed.urlset.url)
      ? parsed.urlset.url
      : [parsed.urlset.url];
    return urls.map((entry: { loc: string }) => entry.loc).filter(Boolean);
  }

  if (parsed.sitemapindex?.sitemap) {
    const sitemaps = Array.isArray(parsed.sitemapindex.sitemap)
      ? parsed.sitemapindex.sitemap
      : [parsed.sitemapindex.sitemap];
    return sitemaps.map((entry: { loc: string }) => entry.loc).filter(Boolean);
  }

  return [] as string[];
};

const getUrlsFromSitemap = async (siteUrl: string) => {
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  try {
    const xml = await fetchWithRetry(sitemapUrl);
    const entries = parseSitemapXml(xml);
    if (entries.length === 0) return [];

    if (entries.every((entry) => entry.endsWith(".xml"))) {
      const nestedUrls: string[] = [];
      for (const entry of entries) {
        try {
          const nestedXml = await fetchWithRetry(entry);
          nestedUrls.push(...parseSitemapXml(nestedXml));
        } catch (error) {
          console.warn(`Skipping nested sitemap ${entry}`, error);
        }
      }
      return nestedUrls;
    }

    return entries;
  } catch (error) {
    console.warn("Sitemap fetch failed, falling back to crawl.", error);
    return [];
  }
};

const crawlSite = async (siteUrl: string) => {
  const origin = new URL(siteUrl).origin;
  const visited = new Set<string>();
  const queue = [siteUrl];
  const discovered: string[] = [];

  while (queue.length > 0 && visited.size < MAX_PAGES) {
    const nextUrl = queue.shift();
    if (!nextUrl) continue;
    const normalized = normalizeUrl(nextUrl);
    if (visited.has(normalized)) continue;
    if (!isAllowedUrl(normalized, origin)) continue;

    visited.add(normalized);
    discovered.push(normalized);

    try {
      const html = await fetchWithRetry(normalized);
      const $ = load(html);
      $("a[href]").each((_, element) => {
        const href = $(element).attr("href");
        if (!href) return;
        if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
        const absolute = new URL(href, normalized).toString();
        if (!isAllowedUrl(absolute, origin)) return;
        const cleaned = normalizeUrl(absolute);
        if (!visited.has(cleaned)) {
          queue.push(cleaned);
        }
      });
    } catch (error) {
      console.warn(`Failed to crawl ${normalized}`, error);
    }
  }

  return discovered;
};

const estimateTokens = (text: string) => {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount * 1.3);
};

const chunkText = (text: string) => {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  let start = 0;
  const chunkSize = CHUNK_TOKEN_MAX;
  const step = CHUNK_TOKEN_MAX - CHUNK_TOKEN_OVERLAP;

  while (start < words.length) {
    const slice = words.slice(start, start + chunkSize);
    if (slice.length === 0) break;
    chunks.push(slice.join(" "));
    start += step;
  }

  return chunks.filter((chunk) => estimateTokens(chunk) >= CHUNK_TOKEN_MIN);
};

const extractSections = (html: string) => {
  const $ = load(html);
  $("script, style, noscript, svg, header, footer, nav, aside").remove();
  $("[class*='cookie'], [id*='cookie'], [class*='consent']").remove();

  const title = $("title").first().text().trim() ||
    $("h1").first().text().trim();

  const root = $("main").first().length ? $("main").first() : $("body").first();

  const elements = root.find("h2, h3, p, li").toArray();
  const sections: { heading: string; text: string }[] = [];
  let currentHeading = "Overview";
  let currentParts: string[] = [];

  const flush = () => {
    if (currentParts.length === 0) return;
    const combined = currentParts.join(" ").replace(/\s+/g, " ").trim();
    if (combined.length > 0) {
      sections.push({ heading: currentHeading, text: combined });
    }
    currentParts = [];
  };

  for (const element of elements) {
    const tagName = element.tagName?.toLowerCase();
    const text = $(element).text().replace(/\s+/g, " ").trim();
    if (!text) continue;

    if (tagName === "h2" || tagName === "h3") {
      flush();
      currentHeading = text;
      continue;
    }

    if (text.length < 20) continue;
    currentParts.push(text);
  }

  flush();
  return { title: title || "Untitled", sections };
};

const buildIndex = async () => {
  const origin = new URL(SITE_URL).origin;
  const sitemapUrls = await getUrlsFromSitemap(SITE_URL);
  const rawUrls = sitemapUrls.length ? sitemapUrls : await crawlSite(SITE_URL);
  const urls = Array.from(new Set(rawUrls))
    .map((url) => normalizeUrl(url))
    .filter((url) => isAllowedUrl(url, origin));

  console.log(`Discovered ${urls.length} URLs to index.`);

  const allChunks: {
    chunk_id: string;
    url: string;
    title: string;
    section_heading: string;
    text: string;
    embedding: number[];
  }[] = [];
  const failed: { url: string; reason: string }[] = [];
  let pageIndex = 0;

  for (const url of urls) {
    try {
      const html = await fetchWithRetry(url);
      const { title, sections } = extractSections(html);
      if (sections.length === 0) {
        failed.push({ url, reason: "No readable sections" });
        continue;
      }

      let chunkIndex = 0;
      const pageChunks: {
        chunk_id: string;
        url: string;
        title: string;
        section_heading: string;
        text: string;
      }[] = [];

      for (const section of sections) {
        const chunks = chunkText(section.text);
        for (const chunk of chunks) {
          pageChunks.push({
            chunk_id: `chunk_${pageIndex}_${chunkIndex}`,
            url,
            title,
            section_heading: section.heading,
            text: chunk,
          });
          chunkIndex += 1;
        }
      }

      if (pageChunks.length === 0) {
        failed.push({ url, reason: "No chunks after processing" });
        continue;
      }

      const batchSize = 100;
      for (let i = 0; i < pageChunks.length; i += batchSize) {
        const batch = pageChunks.slice(i, i + batchSize);
        const { embeddings } = await embedMany({
          model: openai.embedding(EMBEDDING_MODEL),
          values: batch.map((chunk) => chunk.text),
        });

        embeddings.forEach((embedding, index) => {
          const chunk = batch[index];
          allChunks.push({
            ...chunk,
            embedding,
          });
        });
      }

      pageIndex += 1;
      console.log(`Indexed ${url} (${pageChunks.length} chunks).`);
    } catch (error) {
      failed.push({ url, reason: String(error) });
      console.warn(`Failed to index ${url}`, error);
    }
  }

  const ragIndex = {
    siteUrl: SITE_URL,
    builtAt: new Date().toISOString(),
    chunks: allChunks,
    failures: failed,
  };

  await fs.mkdir(path.join(process.cwd(), "rag"), { recursive: true });
  await fs.writeFile(
    path.join(process.cwd(), "rag", "rag_index.json"),
    JSON.stringify(ragIndex, null, 2),
    "utf-8"
  );

  console.log(`RAG index built with ${allChunks.length} chunks.`);
  if (failed.length) {
    console.log(`Skipped ${failed.length} pages.`);
  }
};

buildIndex().catch((error) => {
  console.error("Failed to build RAG index", error);
  process.exit(1);
});
