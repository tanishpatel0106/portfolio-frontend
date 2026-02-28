"use client";

import React, { useState, useRef, useEffect, FormEvent } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import {
  IconSend,
  IconLoader2,
  IconExternalLink,
  IconMessageChatbot,
  IconUser,
  IconSparkles,
} from "@tabler/icons-react";

interface Source {
  url: string;
  title: string;
  snippet: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

interface APIResponse {
  answer: string;
  sources: Source[];
  usedChunkIds: string[];
  error?: string;
}

function extractCitationNumbers(text: string): number[] {
  const matches = text.match(/\[(\d+)\]/g) || [];
  const uniqueNumbers = new Set<number>();

  matches.forEach((match) => {
    const value = Number(match.replace(/[^0-9]/g, ""));
    if (!Number.isNaN(value)) {
      uniqueNumbers.add(value);
    }
  });

  return Array.from(uniqueNumbers).sort((a, b) => a - b);
}

function buildHighlightedSourceUrl(source: Source): string {
  const textToHighlight = source.snippet
    .replace(/\s+/g, " ")
    .replace(/[\[\]"']/g, "")
    .trim()
    .slice(0, 100);

  if (!textToHighlight) return source.url;

  const encodedText = encodeURIComponent(textToHighlight);
  return `${source.url}#:~:text=${encodedText}`;
}

function CitationBadge({
  source,
  index,
  compact = false,
}: {
  source: Source;
  index: number;
  compact?: boolean;
}) {
  const previewUrl = buildHighlightedSourceUrl(source);

  return (
    <div className="relative inline-flex group align-middle">
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className={twMerge(
          "inline-flex items-center justify-center font-bold bg-sky-100 text-sky-700 rounded-full hover:bg-sky-200 transition-colors",
          compact ? "w-4 h-4 text-[10px] ml-0.5" : "w-5 h-5 text-[10px]"
        )}
      >
        {index + 1}
      </a>

      <div className="absolute left-0 top-full mt-2 z-20 w-[320px] rounded-lg border border-neutral-200 bg-white p-2 shadow-lg opacity-0 -translate-y-1 invisible pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:visible group-focus-within:pointer-events-auto transition-all duration-150">
        <div className="mb-1 flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-neutral-800 truncate">{source.title}</p>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto text-neutral-400 hover:text-sky-600"
          >
            <IconExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="h-36 w-full rounded border border-neutral-200 overflow-hidden bg-neutral-50">
          <iframe
            src={previewUrl}
            title={`Source preview ${index + 1}`}
            className="w-full h-full"
            loading="lazy"
          />
        </div>

        <p className="mt-1 text-[11px] text-neutral-500">
          Highlight target from cited snippet: <span className="font-medium">{source.snippet}</span>
        </p>
      </div>
    </div>
  );
}

function renderInline(
  text: string,
  keyPrefix: number,
  sources: Source[]
): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*)|(\[(\d+)\])|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      parts.push(
        <strong key={`${keyPrefix}-b-${match.index}`} className="font-semibold">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      const citationNumber = Number(match[4]);
      const source = sources[citationNumber - 1];

      parts.push(
        source ? (
          <CitationBadge
            key={`${keyPrefix}-c-${match.index}`}
            source={source}
            index={citationNumber - 1}
            compact
          />
        ) : (
          <sup
            key={`${keyPrefix}-c-${match.index}`}
            className="inline-flex items-center justify-center text-[10px] font-bold bg-sky-100 text-sky-700 rounded-full w-4 h-4 ml-0.5"
          >
            {citationNumber}
          </sup>
        )
      );
    } else if (match[5]) {
      parts.push(
        <a
          key={`${keyPrefix}-a-${match.index}`}
          href={match[7]}
          className="text-sky-600 hover:text-sky-800 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[6]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function renderMarkdownish(text: string, sources: Source[]): React.ReactNode[] {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) elements.push(<br key={`br-${lineIdx}`} />);

    const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const HeadingTag = `h${level + 1}` as keyof JSX.IntrinsicElements;
      elements.push(
        <HeadingTag key={lineIdx} className="font-semibold mt-3 mb-1">
          {headingMatch[2]}
        </HeadingTag>
      );
      return;
    }

    const bulletMatch = line.match(/^[-*]\s+(.+)/);
    if (bulletMatch) {
      elements.push(
        <div key={lineIdx} className="flex gap-2 ml-2">
          <span className="text-neutral-400 select-none">•</span>
          <span>{renderInline(bulletMatch[1], lineIdx, sources)}</span>
        </div>
      );
      return;
    }

    elements.push(<span key={lineIdx}>{renderInline(line, lineIdx, sources)}</span>);
  });

  return elements;
}

function MessageCitations({
  sources,
  citationNumbers,
}: {
  sources: Source[];
  citationNumbers: number[];
}) {
  const matchedCitations = citationNumbers
    .map((number) => ({ number, source: sources[number - 1] }))
    .filter((item): item is { number: number; source: Source } => !!item.source);

  if (matchedCitations.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 pt-2 border-t border-neutral-200/70">
      <p className="text-[11px] text-neutral-500 mb-1">Citations</p>
      <div className="flex flex-wrap gap-1.5">
        {matchedCitations.map(({ source, number }) => (
          <CitationBadge key={`${source.url}-${number}`} source={source} index={number - 1} />
        ))}
      </div>
    </div>
  );
}

function AssistantMessage({ message }: { message: ChatMessage }) {
  const citationNumbers = extractCitationNumbers(message.content);

  return (
    <>
      {renderMarkdownish(message.content, message.sources || [])}
      <MessageCitations sources={message.sources || []} citationNumbers={citationNumbers} />
    </>
  );
}

const SUGGESTED_QUESTIONS = [
  "What projects has Tanish worked on?",
  "Tell me about Tanish's research in Federated Learning.",
  "What is Tanish's educational background?",
  "What technologies does Tanish specialize in?",
];

const TYPING_DELAY_MS = 18;

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function streamAssistantMessage(answer: string, sources: Source[]) {
    const tokens = answer.match(/\S+\s*/g) || [answer];
    setMessages((prev) => [...prev, { role: "assistant", content: "", sources }]);

    for (const token of tokens) {
      await new Promise((resolve) => setTimeout(resolve, TYPING_DELAY_MS));
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        const lastMessage = updated[lastIndex];

        if (lastMessage?.role === "assistant") {
          updated[lastIndex] = {
            ...lastMessage,
            content: `${lastMessage.content}${token}`,
          };
        }

        return updated;
      });
    }
  }

  async function handleSubmit(e?: FormEvent, question?: string) {
    e?.preventDefault();
    const text = question || input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (response.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "You're sending messages too quickly. Please wait a moment and try again.",
            sources: [],
          },
        ]);
        return;
      }

      const data: APIResponse = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "Sorry, something went wrong. Please try again.",
            sources: [],
          },
        ]);
        return;
      }

      await streamAssistantMessage(data.answer, data.sources || []);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-[calc(100vh-1rem)] flex items-center">
      <div className="h-[95vh] max-h-[95vh] w-full overflow-hidden flex flex-col max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden border border-neutral-200 rounded-xl bg-white">
        <div className="flex items-center gap-3 px-4 md:px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100">
            <IconMessageChatbot className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-neutral-800">Chat About Me</h1>
            <p className="text-xs text-neutral-500">
              Ask anything about Tanish&apos;s work, projects, and research
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4">
          {!hasMessages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 mb-4">
                <IconSparkles className="w-7 h-7 text-sky-500" />
              </div>
              <h2 className="text-lg font-semibold text-neutral-800 mb-1">Hi! I know everything on this site.</h2>
              <p className="text-sm text-neutral-500 max-w-md mb-6">
                Ask me about Tanish&apos;s projects, research, experience, or anything else on the portfolio. I&apos;ll always show you exactly where I found the information.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(undefined, q)}
                    className="text-left text-sm px-3 py-2.5 rounded-lg border border-neutral-200 hover:border-sky-300 hover:bg-sky-50/50 text-neutral-600 hover:text-neutral-800 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={twMerge("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              {msg.role === "assistant" && (
                <div className="flex-shrink-0 mt-1">
                  <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center">
                    <IconMessageChatbot className="w-3.5 h-3.5 text-sky-600" />
                  </div>
                </div>
              )}

              <div
                className={twMerge(
                  "max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-neutral-800 text-white"
                    : "bg-neutral-50 border border-neutral-200 text-neutral-700"
                )}
              >
                {msg.role === "assistant" ? <AssistantMessage message={msg} /> : msg.content}
              </div>

              {msg.role === "user" && (
                <div className="flex-shrink-0 mt-1">
                  <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center">
                    <IconUser className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center">
                  <IconMessageChatbot className="w-3.5 h-3.5 text-sky-600" />
                </div>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <IconLoader2 className="w-4 h-4 animate-spin" />
                  <span>Searching the site...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="px-4 md:px-6 py-3 border-t border-neutral-200">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Tanish's work..."
              rows={1}
              className="flex-1 resize-none rounded-lg border border-neutral-200 px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className={twMerge(
                "flex items-center justify-center w-10 h-10 rounded-lg transition-all",
                input.trim() && !loading
                  ? "bg-neutral-800 text-white hover:bg-neutral-700"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              )}
            >
              {loading ? <IconLoader2 className="w-4 h-4 animate-spin" /> : <IconSend className="w-4 h-4" />}
            </button>
          </form>
          <p className="text-[10px] text-neutral-400 mt-1.5 text-center">
            Answers are generated only from content on this website. Always check the cited sources.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
