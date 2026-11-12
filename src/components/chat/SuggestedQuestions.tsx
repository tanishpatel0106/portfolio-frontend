"use client";
import { motion } from "motion/react";
import { IconArrowUpRight, IconSparkles } from "@tabler/icons-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

/** Empty state: what the assistant is, plus questions generated from the site's content. */
export function SuggestedQuestions({
  questions,
  onSelect,
}: {
  questions: string[];
  onSelect: (question: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto flex min-h-full max-w-2xl flex-col justify-center px-4 py-10"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
        <IconSparkles className="h-6 w-6" stroke={1.5} />
      </span>
      <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
        Ask me anything about{" "}
        <span className="font-display font-normal italic text-brand">Tanish</span>
      </h1>
      {/* Aceternity Text Generate Effect */}
      <TextGenerateEffect
        words="I've read every project write-up, paper and role on this site. Ask about his work, research, skills or what he's looking for, and I'll pull up the relevant pages as I answer."
        className="mt-3 text-base font-normal leading-relaxed text-muted-foreground [&_span]:text-muted-foreground"
        duration={0.3}
      />
      <ul className="mt-8 grid gap-2 sm:grid-cols-2">
        {questions.map((q, i) => (
          <motion.li
            key={q}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04 }}
          >
            <button
              type="button"
              onClick={() => onSelect(q)}
              className="group flex h-full w-full items-start justify-between gap-3 rounded-xl border bg-card px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:border-brand/60 hover:text-foreground"
            >
              {q}
              <IconArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
