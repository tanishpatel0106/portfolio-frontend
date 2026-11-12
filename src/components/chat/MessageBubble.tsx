"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { IconArrowUpRight, IconSparkles } from "@tabler/icons-react";
import type { ChatCard, ChatMessage } from "@/types/chat";
import { ThinkingBlock } from "./ThinkingBlock";
import { renderMarkdown } from "./markdown";

function Card({ card }: { card: ChatCard }) {
  return (
    <Link
      href={card.href}
      className="group flex gap-3 rounded-xl border bg-background p-2.5 transition-colors hover:border-brand/60"
    >
      <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image src={card.thumbnail} alt="" fill sizes="96px" className="object-cover object-top" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-brand">
            {card.badge ?? (card.kind === "project" ? "Project" : "Paper")}
          </span>
          <IconArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
        </span>
        <span className="mt-0.5 line-clamp-1 text-sm font-medium text-foreground">{card.title}</span>
        <span className="line-clamp-1 text-xs text-muted-foreground">{card.description}</span>
      </span>
    </Link>
  );
}

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const waiting = message.isStreaming && !message.content;

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-6 flex justify-end"
      >
        <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-foreground px-4 py-2.5 text-sm leading-relaxed text-background">
          {message.content}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mb-6 flex gap-3"
    >
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <IconSparkles className="h-4 w-4" stroke={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <ThinkingBlock thinking={message.thinking ?? ""} isStreaming={waiting} />
        {message.content && (
          <div
            className="chat-markdown text-[15px] leading-relaxed text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
          />
        )}
        {message.isStreaming && message.content && (
          <span aria-hidden className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-blink bg-brand" />
        )}
        {message.cards && message.cards.length > 0 && (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {message.cards.map((card) => (
              <Card key={`${card.kind}-${card.slug}`} card={card} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
