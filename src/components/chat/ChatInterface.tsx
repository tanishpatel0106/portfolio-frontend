"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { ChatInput } from "./ChatInput";
import { IconSparkles } from "@tabler/icons-react";

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (content: string) => {
    setError(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    };

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: "",
      thinking: "",
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsLoading(true);

    try {
      const allMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
        ...(m.thinking ? { thinking: m.thinking } : {}),
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(
          errData?.error || `Request failed (${response.status})`
        );
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process all complete SSE messages (delimited by \n\n)
        let boundary = buffer.indexOf("\n\n");
        while (boundary !== -1) {
          const rawLine = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);

          // Extract JSON after "data: " prefix
          const line = rawLine.trim();
          if (!line.startsWith("data: ")) {
            boundary = buffer.indexOf("\n\n");
            continue;
          }

          const jsonStr = line.slice(6);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let event: any;
          try {
            event = JSON.parse(jsonStr);
          } catch {
            // Incomplete JSON — put it back and wait for more data
            buffer = rawLine + "\n\n" + buffer;
            break;
          }

          if (event.type === "thinking") {
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last.role === "assistant") {
                last.thinking = (last.thinking || "") + event.content;
              }
              return updated;
            });
          } else if (event.type === "text") {
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last.role === "assistant") {
                last.content = (last.content || "") + event.content;
              }
              return updated;
            });
          } else if (event.type === "done") {
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last.role === "assistant") {
                last.isStreaming = false;
              }
              return updated;
            });
          } else if (event.type === "error") {
            throw new Error(event.content);
          }

          boundary = buffer.indexOf("\n\n");
        }
      }

      // Process any remaining complete message in the buffer
      const remaining = buffer.trim();
      if (remaining.startsWith("data: ")) {
        try {
          const event = JSON.parse(remaining.slice(6));
          if (event.type === "text") {
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last.role === "assistant") {
                last.content = (last.content || "") + event.content;
              }
              return updated;
            });
          } else if (event.type === "thinking") {
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last.role === "assistant") {
                last.thinking = (last.thinking || "") + event.content;
              }
              return updated;
            });
          }
        } catch {
          // Ignore incomplete trailing data
        }
      }

      // Ensure streaming flag is always cleared
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant" && last.isStreaming) {
          last.isStreaming = false;
        }
        return updated;
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (
          last.role === "assistant" &&
          !last.content &&
          !last.thinking
        ) {
          updated.pop();
        } else if (last.role === "assistant") {
          last.isStreaming = false;
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100/40 via-transparent to-transparent" />
        <div className="relative px-6 md:px-8 py-5 flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-200/50">
              <IconSparkles size={20} className="text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h1 className="font-bold text-neutral-800 text-base">
              Chat About Me
            </h1>
            <p className="text-xs text-neutral-500">
              AI-powered · Ask anything about Tanish
            </p>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </div>

      {/* Messages area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden chat-scroll-area"
      >
        <AnimatePresence mode="wait">
          {!hasMessages ? (
            <SuggestedQuestions key="suggestions" onSelect={sendMessage} />
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-4 md:px-8 py-6 space-y-1"
            >
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center py-3"
                >
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 shadow-sm">
                    {error}
                  </p>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area */}
      <div className="flex-shrink-0">
        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading}
          hasMessages={hasMessages}
        />
      </div>
    </div>
  );
}
