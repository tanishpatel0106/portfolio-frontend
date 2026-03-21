"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBrain, IconChevronDown } from "@tabler/icons-react";

interface ThinkingBlockProps {
  thinking: string;
  isStreaming?: boolean;
}

export function ThinkingBlock({ thinking, isStreaming }: ThinkingBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!thinking && !isStreaming) return null;

  const isActivelyThinking = isStreaming && !thinking;

  return (
    <div className="mb-3">
      {/* Animated gradient border wrapper */}
      <div className="relative rounded-xl overflow-hidden">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 animate-gradient-x opacity-60" />

        {/* Inner content */}
        <div className="relative m-[1px] rounded-[11px] bg-amber-50/90 backdrop-blur-sm">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-amber-100/50 rounded-[11px] transition-colors"
          >
            <div className="relative">
              <IconBrain
                size={14}
                className={`text-amber-600 ${
                  isActivelyThinking ? "animate-pulse" : ""
                }`}
              />
              {isActivelyThinking && (
                <div className="absolute inset-0 animate-ping">
                  <IconBrain size={14} className="text-amber-400 opacity-40" />
                </div>
              )}
            </div>

            {isActivelyThinking ? (
              <span className="flex items-center gap-1.5 text-amber-700 font-medium">
                Thinking
                <span className="flex gap-0.5 items-center">
                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-wave" />
                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-wave [animation-delay:150ms]" />
                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-wave [animation-delay:300ms]" />
                </span>
              </span>
            ) : (
              <span className="text-amber-700 font-medium">
                View thinking process
              </span>
            )}

            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-auto"
            >
              <IconChevronDown size={12} className="text-amber-600" />
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
                <div className="px-3 pb-3">
                  <div className="text-[11px] leading-relaxed text-amber-800/70 bg-white/60 rounded-lg p-3 max-h-48 overflow-y-auto font-mono whitespace-pre-wrap chat-scroll-area">
                    {thinking}
                    {isStreaming && (
                      <span className="inline-block w-0.5 h-3 bg-amber-500 ml-0.5 animate-blink align-middle" />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
