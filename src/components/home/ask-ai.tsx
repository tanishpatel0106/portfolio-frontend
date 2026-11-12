"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Eyebrow } from "@/components/shared/primitives";

/** Ask-the-AI call to action. Submitting hands the question to /chat. */
export function AskAi({
  placeholders,
  suggestions,
}: {
  placeholders: string[];
  suggestions: string[];
}) {
  const router = useRouter();
  const value = useRef("");

  const ask = (question: string) => {
    const q = question.trim();
    if (!q) return;
    // Let the vanish animation play before navigating.
    window.setTimeout(() => router.push(`/chat?q=${encodeURIComponent(q)}`), 650);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border bg-card">
      <div aria-hidden className="absolute inset-0 opacity-70">
        <BackgroundRippleEffect rows={7} cols={24} cellSize={52} />
      </div>
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-5 py-16 text-center md:py-20">
        <Eyebrow>Ask instead of scrolling</Eyebrow>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          An AI that has read{" "}
          <span className="font-display font-normal italic text-brand">everything</span> on this site
        </h2>
        <p className="mt-4 max-w-lg text-pretty text-muted-foreground">
          It answers from the same project, research and experience data that
          builds these pages, and can pull up the relevant work as it replies.
        </p>
        <div className="mt-8 w-full">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e) => (value.current = e.target.value)}
            onSubmit={(e) => {
              e.preventDefault();
              ask(value.current);
            }}
          />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {suggestions.slice(0, 3).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => router.push(`/chat?q=${encodeURIComponent(s)}`)}
              className="rounded-full border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm transition-colors hover:border-brand/50 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
