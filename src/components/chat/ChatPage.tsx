"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { SourcesPanel } from "./SourcesPanel";
import type { SourceData } from "./SourceCard";
import { SUGGESTED_QUESTIONS } from "@/lib/rag/prompts";
import { motion, AnimatePresence } from "framer-motion";
import { IconMessageChatbot, IconSparkles } from "@tabler/icons-react";

// Helper to extract text from a message's parts
function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return "";
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export function ChatPage() {
  const [sources, setSources] = useState<SourceData[]>([]);
  const [sourcesLoading, setSourcesLoading] = useState(false);
  const [showMobileSources, setShowMobileSources] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const fetchSources = useCallback(async (query: string) => {
    setSourcesLoading(true);
    try {
      const res = await fetch("/api/chat/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (res.ok) {
        const data = await res.json();
        setSources(data.sources || []);
      }
    } catch {
      // Sources fetch failed silently
    } finally {
      setSourcesLoading(false);
    }
  }, []);

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim() || isLoading) return;
      sendMessage({ text: text.trim() });
      setInput("");
      fetchSources(text.trim());
    },
    [sendMessage, isLoading, fetchSources]
  );

  const handleSuggestedQuestion = useCallback(
    (question: string) => {
      handleSend(question);
    },
    [handleSend]
  );

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch sources when the user sends a message
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "user") {
        const text = getMessageText(lastMsg);
        if (text) fetchSources(text);
      }
    }
  }, [messages, fetchSources]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-[calc(100vh-16px)] lg:h-[calc(100vh-8px)]">
      {/* Chat panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center">
              <IconMessageChatbot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-primary">
                {"Chat with Tanish's Site"}
              </h1>
              <p className="text-[11px] text-secondary">
                Ask anything about his work, projects, and experience
              </p>
            </div>
          </div>
          {/* Mobile sources toggle */}
          {sources.length > 0 && (
            <button
              onClick={() => setShowMobileSources(!showMobileSources)}
              className="lg:hidden text-xs text-sky-600 font-medium px-2 py-1 rounded-md hover:bg-sky-50 transition-colors"
            >
              {showMobileSources ? "Hide" : "Show"} Sources ({sources.length})
            </button>
          )}
        </div>

        {/* Mobile sources accordion */}
        <AnimatePresence>
          {showMobileSources && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-b border-neutral-100 overflow-hidden"
            >
              <div className="max-h-48 overflow-y-auto">
                <SourcesPanel sources={sources} isLoading={sourcesLoading} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto">
          {!hasMessages ? (
            <div className="flex flex-col items-center justify-center h-full px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center max-w-md"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center mx-auto mb-4">
                  <IconSparkles className="h-7 w-7 text-neutral-500" />
                </div>
                <h2 className="text-lg font-semibold text-primary mb-1">
                  Chat about Tanish
                </h2>
                <p className="text-sm text-secondary mb-6 leading-relaxed">
                  {"Ask me anything about Tanish's projects, skills, experience, or research. All answers are grounded in his portfolio site content."}
                </p>

                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestedQuestion(q)}
                      className="text-xs px-3 py-2 rounded-full border border-neutral-200 text-secondary hover:text-primary hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="py-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role as "user" | "assistant"}
                  content={getMessageText(message)}
                  isStreaming={
                    isLoading &&
                    message.id === messages[messages.length - 1]?.id &&
                    message.role === "assistant"
                  }
                />
              ))}
              {isLoading &&
                messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-3 px-4 py-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center">
                      <div className="flex gap-0.5">
                        <span
                          className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                    <div className="bg-neutral-50 rounded-2xl px-4 py-3 border border-neutral-100">
                      <p className="text-xs text-secondary">
                        Searching the site and thinking...
                      </p>
                    </div>
                  </div>
                )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <ChatInput
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </div>

      {/* Desktop sources panel */}
      <div className="hidden lg:block w-72 border-l border-neutral-100 bg-white">
        <SourcesPanel sources={sources} isLoading={sourcesLoading} />
      </div>
    </div>
  );
}
