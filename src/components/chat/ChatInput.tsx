"use client";
import React, { useRef } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  hasMessages: boolean;
  placeholders: string[];
}

export function ChatInput({
  onSend,
  isLoading,
  hasMessages,
  placeholders,
}: ChatInputProps) {
  // The vanish input clears its own value during the submit animation, so we
  // mirror the latest keystroke here to recover the text at submit time.
  const valueRef = useRef("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueRef.current = e.target.value;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = valueRef.current.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    valueRef.current = "";
  };

  return (
    <div className="relative">
      {/* Top fade gradient for visual blending */}
      {hasMessages && (
        <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
      )}

      <div className="relative bg-white/80 backdrop-blur-md border-t border-neutral-100 px-4 md:px-8 py-4">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={handleSubmit}
          disabled={isLoading}
        />

        <p className="text-[10px] text-neutral-400 mt-3 text-center">
          Powered by Claude AI · Extended thinking enabled ·{" "}
          <span className="text-neutral-300">Press Enter to send</span>
        </p>
      </div>
    </div>
  );
}
