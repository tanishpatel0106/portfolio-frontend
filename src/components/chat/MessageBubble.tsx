"use client";
import { motion } from "framer-motion";
import { ChatMessage } from "@/types/chat";
import { ThinkingBlock } from "./ThinkingBlock";

function renderMarkdown(text: string) {
  // Simple markdown rendering: bold, italic, code blocks, inline code, links, lists
  let html = text
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-neutral-100 rounded-md p-2 my-2 overflow-x-auto text-xs"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-neutral-100 rounded px-1 py-0.5 text-xs">$1</code>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-sky-600 hover:underline">$1</a>'
    )
    // Line breaks
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");

  // Wrap in paragraph
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[85%] lg:max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-sky-50 border border-sky-100 text-neutral-800"
            : "bg-white border border-neutral-200 text-neutral-700"
        }`}
      >
        {!isUser && (message.thinking || message.isStreaming) && (
          <ThinkingBlock
            thinking={message.thinking || ""}
            isStreaming={message.isStreaming && !message.content}
          />
        )}

        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : message.content ? (
          <div
            className="text-sm leading-relaxed prose-sm prose-neutral"
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(message.content),
            }}
          />
        ) : message.isStreaming ? (
          <div className="flex items-center gap-1 py-1">
            <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
