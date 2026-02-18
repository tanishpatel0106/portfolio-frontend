import type { CrawledPage } from "./crawler";

export interface ContentChunk {
  url: string;
  title: string;
  headingPath: string | null;
  content: string;
  contentHash: string;
}

// Rough token estimation (1 token ~= 4 chars for English text)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

async function hashContent(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface Section {
  headingPath: string;
  content: string;
}

function splitByHeadings(content: string): Section[] {
  const lines = content.split("\n");
  const sections: Section[] = [];
  const headingStack: string[] = [];
  let currentContent: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      // Save previous section
      if (currentContent.length > 0) {
        sections.push({
          headingPath: headingStack.join(" > "),
          content: currentContent.join("\n").trim(),
        });
        currentContent = [];
      }

      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();

      // Maintain heading hierarchy
      while (headingStack.length >= level) {
        headingStack.pop();
      }
      headingStack.push(text);
    } else {
      currentContent.push(line);
    }
  }

  // Don't forget the last section
  if (currentContent.length > 0) {
    sections.push({
      headingPath: headingStack.join(" > "),
      content: currentContent.join("\n").trim(),
    });
  }

  return sections.filter((s) => s.content.length > 0);
}

function splitIntoChunksWithOverlap(
  text: string,
  targetTokens: number = 700,
  overlapTokens: number = 100
): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentTokens = 0;

  for (const sentence of sentences) {
    const sentenceTokens = estimateTokens(sentence);

    if (
      currentTokens + sentenceTokens > targetTokens &&
      currentChunk.length > 0
    ) {
      chunks.push(currentChunk.join(" "));

      // Create overlap from end of current chunk
      const overlapSentences: string[] = [];
      let overlapCount = 0;
      for (let i = currentChunk.length - 1; i >= 0; i--) {
        const tokens = estimateTokens(currentChunk[i]);
        if (overlapCount + tokens > overlapTokens) break;
        overlapSentences.unshift(currentChunk[i]);
        overlapCount += tokens;
      }

      currentChunk = [...overlapSentences, sentence];
      currentTokens = overlapCount + sentenceTokens;
    } else {
      currentChunk.push(sentence);
      currentTokens += sentenceTokens;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(" "));
  }

  return chunks;
}

export async function chunkPage(page: CrawledPage): Promise<ContentChunk[]> {
  const chunks: ContentChunk[] = [];
  const sections = splitByHeadings(page.content);

  if (sections.length === 0) {
    // No headings found, split by paragraph / token limit
    const textChunks = splitIntoChunksWithOverlap(page.content);
    for (const text of textChunks) {
      if (text.trim().length < 30) continue;
      chunks.push({
        url: page.url,
        title: page.title,
        headingPath: null,
        content: text.trim(),
        contentHash: await hashContent(text.trim()),
      });
    }
    return chunks;
  }

  for (const section of sections) {
    const tokens = estimateTokens(section.content);

    if (tokens <= 900) {
      // Section fits in one chunk
      if (section.content.trim().length < 30) continue;
      chunks.push({
        url: page.url,
        title: page.title,
        headingPath: section.headingPath || null,
        content: section.content.trim(),
        contentHash: await hashContent(section.content.trim()),
      });
    } else {
      // Section is too long, split it
      const textChunks = splitIntoChunksWithOverlap(section.content);
      for (let i = 0; i < textChunks.length; i++) {
        const text = textChunks[i].trim();
        if (text.length < 30) continue;
        chunks.push({
          url: page.url,
          title: page.title,
          headingPath: section.headingPath
            ? `${section.headingPath} (part ${i + 1})`
            : null,
          content: text,
          contentHash: await hashContent(text),
        });
      }
    }
  }

  return chunks;
}

export async function chunkPages(
  pages: CrawledPage[]
): Promise<ContentChunk[]> {
  const allChunks: ContentChunk[] = [];
  for (const page of pages) {
    const pageChunks = await chunkPage(page);
    allChunks.push(...pageChunks);
  }
  return allChunks;
}
