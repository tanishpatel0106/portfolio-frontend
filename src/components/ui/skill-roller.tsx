"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function randomChar(charset: string): string {
  return charset.charAt(Math.floor(Math.random() * charset.length));
}

type ScrambleWordProps = {
  text: string;
  revealDelayMs: number;
  flipDelayMs: number;
  charset: string;
  encryptedClassName?: string;
  revealedClassName?: string;
};

// Renders a single word that scrambles then resolves left-to-right.
// Re-runs the reveal whenever `text` changes (i.e. on every roller tick).
// First paint shows the real text so SSR and client hydration match; the
// scramble only begins once the effect runs on the client.
function ScrambleWord({
  text,
  revealDelayMs,
  flipDelayMs,
  charset,
  encryptedClassName,
  revealedClassName,
}: ScrambleWordProps) {
  const [revealCount, setRevealCount] = useState(0);
  const scrambleRef = useRef<string[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const total = text.length;
    scrambleRef.current = text
      .split("")
      .map((c) => (c === " " ? " " : randomChar(charset)));
    setRevealCount(0);

    const start = performance.now();
    let lastFlip = start;
    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;
      const count = Math.min(
        total,
        Math.floor(elapsed / Math.max(1, revealDelayMs)),
      );
      setRevealCount(count);
      if (count >= total) return;

      if (now - lastFlip >= Math.max(0, flipDelayMs)) {
        for (let i = count; i < total; i += 1) {
          scrambleRef.current[i] = text[i] === " " ? " " : randomChar(charset);
        }
        lastFlip = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [text, revealDelayMs, flipDelayMs, charset]);

  return (
    <>
      {text.split("").map((char, i) => {
        const revealed = i < revealCount;
        // Before the effect populates scrambleRef, fall back to the real char
        // (keeps the server/first-client render identical = no hydration warning).
        const display = revealed
          ? char
          : char === " "
            ? " "
            : (scrambleRef.current[i] ?? char);
        return (
          <span
            key={i}
            className={cn(revealed ? revealedClassName : encryptedClassName)}
          >
            {display}
          </span>
        );
      })}
    </>
  );
}

type SkillRollerProps = {
  skills: string[];
  /** ms each skill stays fully revealed before flipping to the next */
  duration?: number;
  /** ms between revealing each subsequent character */
  revealDelayMs?: number;
  /** ms between gibberish flips for the not-yet-revealed characters */
  flipDelayMs?: number;
  charset?: string;
  className?: string;
  pillClassName?: string;
  encryptedClassName?: string;
  revealedClassName?: string;
};

export const SkillRoller: React.FC<SkillRollerProps> = ({
  skills,
  duration = 2200,
  revealDelayMs = 45,
  flipDelayMs = 40,
  charset = DEFAULT_CHARSET,
  className,
  pillClassName,
  encryptedClassName = "text-neutral-400",
  revealedClassName = "text-secondary",
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || skills.length <= 1) return;

    // A random initial offset so a grid of rollers doesn't flip in lockstep.
    const startDelay = Math.random() * duration;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      setIndex((i) => (i + 1) % skills.length);
      intervalId = setInterval(() => {
        setIndex((i) => (i + 1) % skills.length);
      }, duration);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [skills.length, duration, prefersReducedMotion]);

  if (!skills || skills.length === 0) return null;

  // Reduced-motion (and a sensible no-JS baseline): just wrap the chips so
  // nothing overflows and nothing animates.
  if (prefersReducedMotion) {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {skills.map((skill) => (
          <span
            key={skill}
            className={cn(
              "rounded-sm bg-gray-50 px-2 py-1 text-sm text-secondary",
              pillClassName,
            )}
          >
            {skill}
          </span>
        ))}
      </div>
    );
  }

  const safeIndex = index % skills.length;

  return (
    <motion.div layout className={cn("flex items-center", className)}>
      <motion.div
        layout
        className={cn(
          "relative w-fit overflow-hidden rounded-md border border-neutral-200 bg-gray-50 px-2.5 py-1 text-sm",
          pillClassName,
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={safeIndex}
            initial={{ y: -14, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 14, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
            className="inline-block whitespace-nowrap font-medium"
          >
            <ScrambleWord
              text={skills[safeIndex]}
              revealDelayMs={revealDelayMs}
              flipDelayMs={flipDelayMs}
              charset={charset}
              encryptedClassName={encryptedClassName}
              revealedClassName={revealedClassName}
            />
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
