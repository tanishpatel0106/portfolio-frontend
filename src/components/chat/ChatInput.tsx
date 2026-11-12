"use client";
import React, { useRef } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function ChatInput({
  onSend,
  isLoading,
  placeholders,
}: {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholders: string[];
}) {
  // The vanish input clears its own value during the submit animation, so the
  // latest keystroke is mirrored here to recover the text at submit time.
  const valueRef = useRef("");

  return (
    <div className="border-t bg-background/85 px-4 py-4 backdrop-blur-md md:px-8">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => (valueRef.current = e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = valueRef.current.trim();
          if (!trimmed || isLoading) return;
          onSend(trimmed);
          valueRef.current = "";
        }}
        disabled={isLoading}
      />
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        Answers come from this site’s content · Powered by Claude
      </p>
    </div>
  );
}
