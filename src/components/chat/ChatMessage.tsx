"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { IconUser, IconRobot } from "@tabler/icons-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={twMerge(
        "flex gap-3 px-4 py-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center mt-1">
          <IconRobot className="h-4 w-4 text-neutral-600" />
        </div>
      )}

      <div
        className={twMerge(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-neutral-800 text-white"
            : "bg-neutral-50 text-primary border border-neutral-100"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm prose-neutral max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Style citation links [1], [2] etc.
                a: ({ href, children, ...props }) => (
                  <a
                    href={href}
                    className="text-sky-600 hover:text-sky-700 no-underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                ),
                p: ({ children, ...props }) => (
                  <p className="mb-2 last:mb-0" {...props}>
                    {children}
                  </p>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="list-disc pl-4 mb-2 space-y-1" {...props}>
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol className="list-decimal pl-4 mb-2 space-y-1" {...props}>
                    {children}
                  </ol>
                ),
                strong: ({ children, ...props }) => (
                  <strong className="font-semibold text-primary" {...props}>
                    {children}
                  </strong>
                ),
                code: ({ children, ...props }) => (
                  <code
                    className="bg-neutral-200 text-neutral-800 px-1 py-0.5 rounded text-xs"
                    {...props}
                  >
                    {children}
                  </code>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        {isStreaming && (
          <span className="inline-block w-1.5 h-4 bg-neutral-400 rounded-full animate-pulse ml-0.5" />
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center mt-1">
          <IconUser className="h-4 w-4 text-white" />
        </div>
      )}
    </motion.div>
  );
}
