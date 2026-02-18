"use client";

import React from "react";
import { SourceCard, type SourceData } from "./SourceCard";
import { IconFileSearch } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

interface SourcesPanelProps {
  sources: SourceData[];
  isLoading?: boolean;
}

export function SourcesPanel({ sources, isLoading }: SourcesPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100">
        <IconFileSearch className="h-4 w-4 text-neutral-500" />
        <h2 className="text-sm font-semibold text-primary">Sources Used</h2>
        {sources.length > 0 && (
          <span className="text-[10px] bg-neutral-100 text-secondary px-1.5 py-0.5 rounded-full font-medium">
            {sources.length}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <AnimatePresence mode="popLayout">
          {isLoading && sources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="flex gap-1 mb-3">
                <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <p className="text-xs text-secondary">Searching the site...</p>
            </motion.div>
          )}

          {!isLoading && sources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <IconFileSearch className="h-8 w-8 text-neutral-200 mb-2" />
              <p className="text-xs text-secondary">
                Sources will appear here when you ask a question.
              </p>
            </motion.div>
          )}

          {sources.map((source) => (
            <SourceCard key={`${source.index}-${source.url}`} source={source} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
