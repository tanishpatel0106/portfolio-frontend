"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { IconSend } from "@tabler/icons-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-neutral-100 pt-4 mt-4">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something about Tanish..."
          disabled={isLoading}
          rows={1}
          className="flex-1 resize-none border border-neutral-200 rounded-xl bg-white px-4 py-3 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-300 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className="flex-shrink-0 bg-sky-500 hover:bg-sky-600 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white rounded-xl p-3 transition-colors duration-200"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <IconSend size={20} />
          )}
        </button>
      </div>
      <p className="text-xs text-neutral-400 mt-2 text-center">
        Powered by Claude AI · Responses are generated based on Tanish&apos;s portfolio data
      </p>
    </div>
  );
}
