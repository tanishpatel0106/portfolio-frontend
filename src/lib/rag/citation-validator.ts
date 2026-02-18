import type { Source } from "./retrieval";

export interface ValidationResult {
  isValid: boolean;
  hasCitations: boolean;
  isDontKnow: boolean;
  citedSourceIndices: number[];
  usedSources: Source[];
}

const DONT_KNOW_PHRASES = [
  "i don't have that information",
  "i don't have that on the site",
  "not available on the site",
  "no information about that",
  "couldn't find",
  "don't have enough information",
  "not mentioned on the site",
  "not covered on the site",
];

export function validateCitations(
  answer: string,
  sources: Source[]
): ValidationResult {
  // Check if this is a "don't know" response
  const lowerAnswer = answer.toLowerCase();
  const isDontKnow = DONT_KNOW_PHRASES.some((phrase) =>
    lowerAnswer.includes(phrase)
  );

  // Extract citation numbers [1], [2], etc.
  const citationPattern = /\[(\d+)\]/g;
  const citedIndices: number[] = [];
  let match: RegExpExecArray | null;

  while ((match = citationPattern.exec(answer)) !== null) {
    const num = parseInt(match[1], 10);
    if (num >= 1 && num <= sources.length && !citedIndices.includes(num)) {
      citedIndices.push(num);
    }
  }

  const hasCitations = citedIndices.length > 0;
  const usedSources = citedIndices.map((i) => sources[i - 1]).filter(Boolean);

  // Valid if: has citations, or is a "don't know" response
  const isValid = hasCitations || isDontKnow;

  return {
    isValid,
    hasCitations,
    isDontKnow,
    citedSourceIndices: citedIndices,
    usedSources,
  };
}

export function extractUsedSources(
  answer: string,
  sources: Source[]
): Source[] {
  const citationPattern = /\[(\d+)\]/g;
  const indices = new Set<number>();
  let match: RegExpExecArray | null;

  while ((match = citationPattern.exec(answer)) !== null) {
    const num = parseInt(match[1], 10);
    if (num >= 1 && num <= sources.length) {
      indices.add(num);
    }
  }

  return Array.from(indices)
    .sort((a, b) => a - b)
    .map((i) => sources[i - 1])
    .filter(Boolean);
}
