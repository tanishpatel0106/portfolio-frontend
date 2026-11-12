export type MessageRole = "user" | "assistant";

/** A project or paper card the assistant chose to show (generative UI). */
export interface ChatCard {
  kind: "project" | "paper";
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  href: string;
  /** e.g. "Live demo", "Paper" */
  badge?: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  thinking?: string;
  cards?: ChatCard[];
  isStreaming?: boolean;
}

/** Server → client stream events (one JSON object per SSE `data:` line). */
export type ChatStreamEvent =
  | { type: "thinking"; content: string }
  | { type: "text"; content: string }
  | { type: "cards"; cards: ChatCard[] }
  | { type: "error"; content: string }
  | { type: "done" };
