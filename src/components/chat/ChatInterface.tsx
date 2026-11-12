"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ChatMessage, ChatStreamEvent } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { ChatInput } from "./ChatInput";
import { IconRefresh } from "@tabler/icons-react";

interface ChatInterfaceProps {
  placeholders: string[];
  suggestedQuestions: string[];
  /** A question handed over from elsewhere on the site (`/chat?q=…`). */
  initialQuestion?: string;
}

export function ChatInterface({
  placeholders,
  suggestedQuestions,
  initialQuestion,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interrupted, setInterrupted] = useState(false);
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

  const processSSELine = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) return;

    const payload = trimmed.slice(5).trim();
    if (!payload) return;

    let event: ChatStreamEvent;
    try {
      event = JSON.parse(payload);
    } catch {
      // Skip partial/malformed lines instead of aborting the whole stream.
      return;
    }

    if (event.type === "thinking") {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant") {
          last.thinking = (last.thinking || "") + (event.content ?? "");
        }
        return updated;
      });
    } else if (event.type === "text") {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant") {
          last.content = (last.content || "") + (event.content ?? "");
        }
        return updated;
      });
    } else if (event.type === "cards") {
      const cards = event.cards;
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant") {
          const seen = new Set((last.cards ?? []).map((c) => `${c.kind}-${c.slug}`));
          last.cards = [
            ...(last.cards ?? []),
            ...cards.filter((c) => !seen.has(`${c.kind}-${c.slug}`)),
          ];
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
      throw new Error(event.content || "Stream error");
    }

    return event.type;
  };

  // Core streaming routine. `apiMessages` is the full history to answer,
  // ending with the user turn we want a response to. Used by both a fresh send
  // and a retry, so they share identical completion/error handling.
  const streamResponse = async (
    apiMessages: { role: string; content: string }[]
  ) => {
    setError(null);
    setInterrupted(false);

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: "",
      thinking: "",
      isStreaming: true,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
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
      let doneReceived = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (processSSELine(line) === "done") doneReceived = true;
        }
      }

      // Process any remaining data in the buffer after stream ends
      if (buffer.trim() && processSSELine(buffer.trim()) === "done") {
        doneReceived = true;
      }

      // A finished stream always ends with a "done" event. If it didn't, the
      // response was cut off mid-flight (e.g. a serverless timeout) — flag it
      // so the user can retry instead of seeing a silent truncation.
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant") {
          last.isStreaming = false;
          // Nothing streamed at all — drop the empty bubble; the notice covers it.
          if (!doneReceived && !last.content && !last.thinking) {
            updated.pop();
          }
        }
        return updated;
      });
      if (!doneReceived) setInterrupted(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant" && !last.content && !last.thinking) {
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

  const sendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    };
    const apiMessages = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));
    setMessages((prev) => [...prev, userMessage]);
    streamResponse(apiMessages);
  };

  const retryLast = () => {
    // Drop the trailing (interrupted) assistant turn, then regenerate in place
    // without duplicating the user's question.
    const history =
      messages[messages.length - 1]?.role === "assistant"
        ? messages.slice(0, -1)
        : messages;
    setMessages(history);
    streamResponse(
      history.map((m) => ({ role: m.role, content: m.content }))
    );
  };

  // Auto-ask a question passed in from the home page, a project page or ⌘K.
  const askedInitial = useRef(false);
  useEffect(() => {
    if (initialQuestion && !askedInitial.current) {
      askedInitial.current = true;
      sendMessage(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once for the handed-over question
  }, [initialQuestion]);

  const hasMessages = messages.length > 0;

  return (
    <div className="relative flex h-full flex-col">
      <div
        ref={scrollContainerRef}
        className="chat-scroll-area flex-1 overflow-y-auto overflow-x-hidden"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          {!hasMessages ? (
            <SuggestedQuestions
              key="suggestions"
              questions={suggestedQuestions}
              onSelect={sendMessage}
            />
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto w-full max-w-3xl px-4 py-8 md:px-6"
            >
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {error && (
                <p
                  role="alert"
                  className="mx-auto mb-4 w-fit rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive"
                >
                  {error}
                </p>
              )}

              {(interrupted || error) && !isLoading && (
                <div className="mb-4 flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  {interrupted && <span>The answer was cut off.</span>}
                  <button
                    type="button"
                    onClick={retryLast}
                    className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    <IconRefresh className="h-3.5 w-3.5" />
                    Try again
                  </button>
                </div>
              )}
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ChatInput onSend={sendMessage} isLoading={isLoading} placeholders={placeholders} />
    </div>
  );
}
