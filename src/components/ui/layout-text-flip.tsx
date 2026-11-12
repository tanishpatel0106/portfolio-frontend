"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "",
  words = [],
  duration = 3000,
  className,
  wordClassName,
}: {
  text?: string;
  words: string[];
  duration?: number;
  className?: string;
  wordClassName?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <>
      {text && (
        <motion.span layout className={className}>
          {text}
        </motion.span>
      )}

      <motion.span
        layout
        className={cn(
          "relative inline-flex w-fit overflow-hidden rounded-md border bg-card px-2.5 py-1 text-foreground shadow-sm",
          wordClassName
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -24, filter: "blur(8px)" }}
            animate={{
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ y: 28, filter: "blur(8px)", opacity: 0 }}
            transition={{
              duration: 0.45,
            }}
            className={cn("inline-block whitespace-nowrap")}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};
