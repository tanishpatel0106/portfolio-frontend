import { createHash } from "crypto";
import { ExtractedContent } from "./types";

export interface Chunk {
  url: string;
  title: string;
  headingPath: string;
  content: string;
  contentHash: string;
}

const MAX_CHUNK_CHARS = 1500;
const OVERLAP_CHARS = 200;

function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function splitLongText(text: string, maxLen: number, overlap: number): string[] {
  if (text.length <= maxLen) return [text];

  const parts: string[] = [];
  let start = 0;
  while (start < text.length) {
    let end = start + maxLen;
    // Try to break at a sentence boundary
    if (end < text.length) {
      const lastPeriod = text.lastIndexOf(". ", end);
      const lastNewline = text.lastIndexOf("\n", end);
      const breakPoint = Math.max(lastPeriod, lastNewline);
      if (breakPoint > start + maxLen / 2) {
        end = breakPoint + 1;
      }
    }
    parts.push(text.slice(start, end).trim());
    start = end - overlap;
  }
  return parts;
}

export function chunkContent(extracted: ExtractedContent): Chunk[] {
  const chunks: Chunk[] = [];

  for (const section of extracted.sections) {
    const textParts = splitLongText(section.text, MAX_CHUNK_CHARS, OVERLAP_CHARS);

    for (let i = 0; i < textParts.length; i++) {
      const text = textParts[i];
      const headingPath = textParts.length > 1
        ? `${section.headingPath} (part ${i + 1})`
        : section.headingPath;

      chunks.push({
        url: extracted.url,
        title: extracted.title,
        headingPath,
        content: text,
        contentHash: hashContent(text),
      });
    }
  }

  return chunks;
}
