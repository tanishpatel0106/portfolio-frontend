"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { IconSend, IconSparkles } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  hasMessages: boolean;
}

export function ChatInput({ onSend, isLoading, hasMessages }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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
    <div className="relative">
      {/* Top fade gradient for visual blending */}
      {hasMessages && (
        <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
      )}

      <div className="relative bg-white/80 backdrop-blur-md border-t border-neutral-100 px-4 md:px-8 py-4">
        <div
          className={`relative flex items-end gap-2 rounded-2xl border transition-all duration-300 bg-white px-3 py-2 ${
            isFocused
              ? "border-sky-300 shadow-lg shadow-sky-100/50 ring-2 ring-sky-100"
              : "border-neutral-200 shadow-sm"
          }`}
        >
          {/* Sparkle icon */}
          <div className="flex-shrink-0 pb-1.5">
            <IconSparkles
              size={18}
              className={`transition-colors duration-300 ${
                isFocused ? "text-sky-500" : "text-neutral-300"
              }`}
            />
          </div>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask something about Tanish..."
            disabled={isLoading}
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed py-1.5 max-h-[120px]"
          />

          <motion.button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 disabled:from-neutral-200 disabled:to-neutral-200 disabled:cursor-not-allowed text-white rounded-xl p-2.5 transition-all duration-200 shadow-md shadow-sky-200/40 disabled:shadow-none"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
            ) : (
              <IconSend size={16} className="-rotate-45" />
            )}
          </motion.button>
        </div>

        <p className="text-[10px] text-neutral-400 mt-2 text-center">
          Powered by Claude AI · Extended thinking enabled ·{" "}
          <span className="text-neutral-300">Press Enter to send</span>
        </p>
      </div>
    </div>
  );
}
