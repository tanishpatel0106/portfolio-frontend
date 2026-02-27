import * as cheerio from "cheerio";
import { ExtractedContent, ContentSection } from "./types";

// Selectors for navigation/boilerplate elements to remove
const REMOVE_SELECTORS = [
  "nav",
  "header",
  "footer",
  "script",
  "style",
  "noscript",
  "iframe",
  "[role='navigation']",
  "[role='banner']",
  "[role='contentinfo']",
  ".sidebar",
  ".nav",
  ".footer",
  ".header",
  ".menu",
  ".breadcrumb",
  ".cookie-banner",
  ".advertisement",
];

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function extractContent(url: string, html: string): ExtractedContent {
  const $ = cheerio.load(html);

  // Get page title
  const title = $("title").first().text().trim()
    || $("h1").first().text().trim()
    || url;

  // Remove boilerplate elements
  REMOVE_SELECTORS.forEach((selector) => {
    $(selector).remove();
  });

  // Try to find main content area
  const mainContent = $("main, [role='main'], article, .content, #content");
  const contentRoot = mainContent.length > 0 ? mainContent.first() : $("body");

  const sections: ContentSection[] = [];
  let currentHeadingPath = title;
  let currentTexts: string[] = [];

  function flushSection() {
    const text = cleanText(currentTexts.join("\n"));
    if (text.length > 20) {
      sections.push({
        headingPath: currentHeadingPath,
        text,
      });
    }
    currentTexts = [];
  }

  // Walk through content elements in order
  contentRoot.find("h1, h2, h3, h4, h5, h6, p, li, pre, code, blockquote, td, th, dt, dd").each((_, el) => {
    const $el = $(el);
    const tagName = el.type === "tag" ? el.tagName.toLowerCase() : "";

    if (tagName.match(/^h[1-6]$/)) {
      // Flush previous section
      flushSection();
      const headingText = $el.text().trim();
      if (headingText) {
        currentHeadingPath = `${title} > ${headingText}`;
      }
    } else {
      const text = $el.text().trim();
      if (text) {
        currentTexts.push(text);
      }
    }
  });

  // Flush remaining content
  flushSection();

  // If no sections were extracted, try getting all text content
  if (sections.length === 0) {
    const fullText = cleanText(contentRoot.text());
    if (fullText.length > 20) {
      sections.push({
        headingPath: title,
        text: fullText,
      });
    }
  }

  return { url, title, sections };
}
