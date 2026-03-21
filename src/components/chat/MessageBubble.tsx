"use client";
import { motion } from "framer-motion";
import { ChatMessage } from "@/types/chat";
import { ThinkingBlock } from "./ThinkingBlock";
import { IconUser, IconSparkles } from "@tabler/icons-react";

function renderMarkdown(text: string) {
  let html = text
    // Code blocks
    .replace(
      /```(\w*)\n([\s\S]*?)```/g,
      '<pre class="bg-neutral-800 text-neutral-100 rounded-lg p-3 my-3 overflow-x-auto text-xs font-mono leading-relaxed"><code>$2</code></pre>'
    )
    // Inline code
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-neutral-100 text-sky-700 rounded-md px-1.5 py-0.5 text-xs font-mono">$1</code>'
    )
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-neutral-800">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-sky-600 hover:text-sky-700 underline decoration-sky-300 underline-offset-2 hover:decoration-sky-500 transition-colors">$1</a>'
    )
    // Unordered lists
    .replace(
      /^[\s]*[-*]\s+(.+)/gm,
      '<li class="ml-4 list-disc text-neutral-600">$1</li>'
    )
    // Numbered lists
    .replace(
      /^[\s]*\d+\.\s+(.+)/gm,
      '<li class="ml-4 list-decimal text-neutral-600">$1</li>'
    )
    // Double line breaks as paragraph breaks
    .replace(/\n\n/g, '</p><p class="mt-2">')
    // Single line breaks
    .replace(/\n/g, "<br/>");

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(
    /(<li[^>]*>.*?<\/li>(?:\s*<br\/>?\s*)?)+/g,
    (match) => `<ul class="my-2 space-y-1">${match.replace(/<br\/?>/g, "")}</ul>`
  );

  html = `<p>${html}</p>`;
  return html;
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} mb-5`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        {isUser ? (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shadow-md shadow-sky-200/50">
            <IconUser size={16} className="text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-200/50">
            <IconSparkles size={16} className="text-white" />
          </div>
        )}
      </div>

      {/* Message content */}
      <div className={`max-w-[80%] lg:max-w-[75%] min-w-0`}>
        {/* Name label */}
        <p
          className={`text-[11px] font-medium mb-1.5 ${
            isUser ? "text-right text-sky-600" : "text-indigo-600"
          }`}
        >
          {isUser ? "You" : "AI Assistant"}
        </p>

        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-200/40 rounded-tr-md"
              : "bg-white border border-neutral-200/80 text-neutral-700 shadow-sm rounded-tl-md"
          }`}
        >
          {/* Thinking block for assistant */}
          {!isUser && (message.thinking || message.isStreaming) && (
            <ThinkingBlock
              thinking={message.thinking || ""}
              isStreaming={message.isStreaming && !message.content}
            />
          )}

          {/* Message text */}
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : message.content ? (
            <div className="relative">
              <div
                className="text-sm leading-relaxed chat-markdown"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(message.content),
                }}
              />
              {message.isStreaming && (
                <span className="inline-block w-0.5 h-4 bg-indigo-500 ml-0.5 animate-blink align-middle" />
              )}
            </div>
          ) : message.isStreaming ? (
            <div className="flex items-center gap-1.5 py-1">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-indigo-300 rounded-full animate-wave" />
                <span className="w-2 h-2 bg-indigo-300 rounded-full animate-wave [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-indigo-300 rounded-full animate-wave [animation-delay:300ms]" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
