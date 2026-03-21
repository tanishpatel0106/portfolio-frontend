"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBulb, IconChevronDown } from "@tabler/icons-react";

interface ThinkingBlockProps {
  thinking: string;
  isStreaming?: boolean;
}

export function ThinkingBlock({ thinking, isStreaming }: ThinkingBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!thinking && !isStreaming) return null;

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
      >
        <IconBulb size={14} className="text-amber-500" />
        {isStreaming && !thinking ? (
          <span className="flex items-center gap-1">
            Thinking
            <span className="flex gap-0.5">
              <span className="w-1 h-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1 h-1 bg-amber-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1 h-1 bg-amber-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </span>
          </span>
        ) : (
          <span>View thinking process</span>
        )}
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <IconChevronDown size={12} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && thinking && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 text-xs text-neutral-500 bg-neutral-50 border border-dashed border-neutral-200 rounded-lg p-3 max-h-60 overflow-y-auto whitespace-pre-wrap">
              {thinking}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
