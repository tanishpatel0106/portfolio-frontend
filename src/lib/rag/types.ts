export interface SiteChunk {
  id: string;
  url: string;
  title: string;
  headingPath: string;
  content: string;
  contentHash: string;
  updatedAt: Date;
  embedding?: number[];
}

export interface ChunkMetadata {
  chunkId: string;
  url: string;
  title: string;
  headingPath: string;
  text: string;
  updatedAt: string;
}

export interface Source {
  url: string;
  title: string;
  snippet: string;
}

export interface ChatResponse {
  answer: string;
  sources: Source[];
  usedChunkIds: string[];
}

export interface RetrievedChunk {
  id: string;
  url: string;
  title: string;
  headingPath: string;
  content: string;
  similarity: number;
}

export interface CrawledPage {
  url: string;
  html: string;
}

export interface ExtractedContent {
  url: string;
  title: string;
  sections: ContentSection[];
}

export interface ContentSection {
  headingPath: string;
  text: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
