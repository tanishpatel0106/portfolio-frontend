"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconBrain, IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/** Collapsible summary of the model's reasoning. */
export function ThinkingBlock({
  thinking,
  isStreaming,
}: {
  thinking: string;
  isStreaming?: boolean;
}) {
  const [open, setOpen] = useState(false);
  if (!thinking && !isStreaming) return null;

  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        disabled={!thinking}
        className="inline-flex items-center gap-1.5 rounded-full border bg-muted/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors enabled:hover:text-foreground"
      >
        <IconBrain className={cn("h-3.5 w-3.5", isStreaming && "animate-pulse text-brand")} />
        {isStreaming ? "Thinking" : "Reasoning"}
        {thinking && (
          <IconChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && thinking && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-2 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-xl border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground chat-scroll-area">
              {thinking}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
