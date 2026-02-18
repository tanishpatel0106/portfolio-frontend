"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconExternalLink } from "@tabler/icons-react";

export interface SourceData {
  index: number;
  url: string;
  title: string;
  snippet: string;
}

interface SourceCardProps {
  source: SourceData;
}

export function SourceCard({ source }: SourceCardProps) {
  return (
    <motion.a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: source.index * 0.05 }}
      className="block rounded-xl border border-neutral-200 bg-white p-3 hover:border-neutral-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold flex items-center justify-center mt-0.5">
          {source.index}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-xs font-semibold text-primary truncate">
              {source.title}
            </p>
            <IconExternalLink className="h-3 w-3 flex-shrink-0 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-xs text-secondary mt-1 line-clamp-2 leading-relaxed">
            {source.snippet}
          </p>
          <p className="text-[10px] text-neutral-400 mt-1 truncate">
            {new URL(source.url).pathname}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
