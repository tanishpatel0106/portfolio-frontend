"use client";

import React, { useState, useRef, useEffect, FormEvent } from "react";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconSend,
  IconLoader2,
  IconExternalLink,
  IconChevronDown,
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

function renderMarkdownish(text: string): React.ReactNode[] {
  // Simple markdown-like rendering for bold, links, citations, and line breaks
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) elements.push(<br key={`br-${lineIdx}`} />);

    // Handle headings
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

    // Handle bullet points
    const bulletMatch = line.match(/^[-*]\s+(.+)/);
    if (bulletMatch) {
      elements.push(
        <div key={lineIdx} className="flex gap-2 ml-2">
          <span className="text-neutral-400 select-none">•</span>
          <span>{renderInline(bulletMatch[1], lineIdx)}</span>
        </div>
      );
      return;
    }

    elements.push(
      <span key={lineIdx}>{renderInline(line, lineIdx)}</span>
    );
  });

  return elements;
}

function renderInline(text: string, keyPrefix: number): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Match bold, citation refs, and links
  const regex = /(\*\*(.+?)\*\*)|(\[(\d+)\])|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold text
      parts.push(
        <strong key={`${keyPrefix}-b-${match.index}`} className="font-semibold">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Citation reference [1]
      parts.push(
        <sup
          key={`${keyPrefix}-c-${match.index}`}
          className="inline-flex items-center justify-center text-[10px] font-bold bg-sky-100 text-sky-700 rounded-full w-4 h-4 ml-0.5 cursor-default"
          title={`Source ${match[4]}`}
        >
          {match[4]}
        </sup>
      );
    } else if (match[5]) {
      // Markdown link
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

function SourceCard({ source, index }: { source: Source; index: number }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 rounded-lg border border-neutral-200 hover:border-sky-300 hover:shadow-sm transition-all bg-white group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="inline-flex items-center justify-center text-[10px] font-bold bg-sky-100 text-sky-700 rounded-full w-4 h-4 flex-shrink-0">
              {index + 1}
            </span>
            <h4 className="text-sm font-medium text-neutral-800 truncate">
              {source.title}
            </h4>
          </div>
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
            {source.snippet}
          </p>
        </div>
        <IconExternalLink className="w-3.5 h-3.5 text-neutral-300 group-hover:text-sky-500 flex-shrink-0 mt-0.5 transition-colors" />
      </div>
    </motion.a>
  );
}

function SourcesAccordion({ sources }: { sources: Source[] }) {
  const [open, setOpen] = useState(false);

  if (sources.length === 0) return null;

  return (
    <div className="mt-2 border border-neutral-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-neutral-600 bg-neutral-50 hover:bg-neutral-100 transition-colors"
      >
        <span>{sources.length} source{sources.length !== 1 ? "s" : ""} used</span>
        <IconChevronDown
          className={twMerge(
            "w-3.5 h-3.5 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-2 space-y-2">
              {sources.map((source, i) => (
                <SourceCard key={`${source.url}-${i}`} source={source} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SUGGESTED_QUESTIONS = [
  "What projects has Tanish worked on?",
  "Tell me about Tanish's research in Federated Learning.",
  "What is Tanish's educational background?",
  "What technologies does Tanish specialize in?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [latestSources, setLatestSources] = useState<Source[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e?: FormEvent, question?: string) {
    e?.preventDefault();
    const text = question || input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setLatestSources([]);

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

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.answer,
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLatestSources(data.sources || []);
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
    <div className="flex flex-col lg:flex-row h-[calc(100vh-2rem)] lg:h-[calc(100vh-1rem)] max-w-7xl mx-auto">
      {/* Chat Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 md:px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100">
            <IconMessageChatbot className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-neutral-800">
              Chat About Me
            </h1>
            <p className="text-xs text-neutral-500">
              Ask anything about Tanish&apos;s work, projects, and research
            </p>
          </div>
        </div>

        {/* Messages Area */}
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
              <h2 className="text-lg font-semibold text-neutral-800 mb-1">
                Hi! I know everything on this site.
              </h2>
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
              className={twMerge(
                "flex gap-3",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
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
                {msg.role === "assistant"
                  ? renderMarkdownish(msg.content)
                  : msg.content}

                {/* Mobile: sources accordion */}
                {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                  <div className="lg:hidden">
                    <SourcesAccordion sources={msg.sources} />
                  </div>
                )}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
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

        {/* Input Area */}
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
              {loading ? (
                <IconLoader2 className="w-4 h-4 animate-spin" />
              ) : (
                <IconSend className="w-4 h-4" />
              )}
            </button>
          </form>
          <p className="text-[10px] text-neutral-400 mt-1.5 text-center">
            Answers are generated only from content on this website. Always check the cited sources.
          </p>
        </div>
      </div>

      {/* Sources Panel (Desktop) */}
      <div className="hidden lg:flex flex-col w-80 border-l border-neutral-200 bg-neutral-50/50">
        <div className="px-4 py-4 border-b border-neutral-200">
          <h2 className="text-sm font-semibold text-neutral-700">
            Sources Used
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            References for the latest answer
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {latestSources.length > 0 ? (
            latestSources.map((source, i) => (
              <SourceCard key={`${source.url}-${i}`} source={source} index={i} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-neutral-400">
              <IconExternalLink className="w-8 h-8 mb-2 opacity-30" />
              <p className="text-xs">
                Sources will appear here once you ask a question
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
