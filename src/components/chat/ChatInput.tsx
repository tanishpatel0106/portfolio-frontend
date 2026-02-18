"use client";

import React, { useRef, useEffect } from "react";
import { IconSend } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

interface ChatInputProps {
  input: string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const form = e.currentTarget.closest("form");
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-neutral-100 p-3 bg-white"
    >
      <div className="flex items-end gap-2 bg-neutral-50 rounded-xl border border-neutral-200 px-3 py-2 focus-within:border-neutral-300 focus-within:ring-1 focus-within:ring-neutral-200 transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Tanish..."
          rows={1}
          className="flex-1 bg-transparent text-sm text-primary placeholder:text-neutral-400 resize-none outline-none max-h-[120px] leading-relaxed"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={twMerge(
            "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all",
            input.trim() && !isLoading
              ? "bg-neutral-800 text-white hover:bg-neutral-700"
              : "bg-neutral-100 text-neutral-300 cursor-not-allowed"
          )}
        >
          <IconSend className="h-4 w-4" />
        </button>
      </div>
      <p className="text-[10px] text-neutral-400 mt-1.5 text-center">
        {"Answers are grounded in tanishpatel.dev content only."}
      </p>
    </form>
  );
}
