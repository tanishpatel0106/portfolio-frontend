"use client";
import { motion } from "framer-motion";
import {
  IconBriefcase2,
  IconCode,
  IconFlask,
  IconSchool,
  IconTool,
  IconRocket,
  IconMountain,
  IconUsers,
} from "@tabler/icons-react";

const questions = [
  {
    text: "What are you currently working on at Columbia?",
    icon: IconSchool,
    color: "from-sky-400 to-blue-500",
    bg: "bg-sky-50 hover:bg-sky-100/80",
    border: "border-sky-200/60",
  },
  {
    text: "Tell me about your experience building AI products at Paperchase",
    icon: IconBriefcase2,
    color: "from-violet-400 to-purple-500",
    bg: "bg-violet-50 hover:bg-violet-100/80",
    border: "border-violet-200/60",
  },
  {
    text: "What projects have you built in quantitative finance?",
    icon: IconCode,
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50 hover:bg-emerald-100/80",
    border: "border-emerald-200/60",
  },
  {
    text: "What research papers have you published?",
    icon: IconFlask,
    color: "from-orange-400 to-rose-500",
    bg: "bg-orange-50 hover:bg-orange-100/80",
    border: "border-orange-200/60",
  },
  {
    text: "What's your tech stack and what do you enjoy working with most?",
    icon: IconTool,
    color: "from-pink-400 to-rose-500",
    bg: "bg-pink-50 hover:bg-pink-100/80",
    border: "border-pink-200/60",
  },
  {
    text: "How did you get into AI and data science?",
    icon: IconRocket,
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50 hover:bg-amber-100/80",
    border: "border-amber-200/60",
  },
  {
    text: "What do you do outside of work and school?",
    icon: IconMountain,
    color: "from-teal-400 to-cyan-500",
    bg: "bg-teal-50 hover:bg-teal-100/80",
    border: "border-teal-200/60",
  },
  {
    text: "What kind of roles or collaborations are you looking for?",
    icon: IconUsers,
    color: "from-indigo-400 to-blue-500",
    bg: "bg-indigo-50 hover:bg-indigo-100/80",
    border: "border-indigo-200/60",
  },
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 md:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-500 shadow-xl shadow-indigo-200/50 mb-4">
          <span className="text-3xl">💬</span>
        </div>
        <h2 className="text-xl font-bold text-neutral-800 mb-2">
          Ask me anything about Tanish
        </h2>
        <p className="text-sm text-neutral-500 max-w-md leading-relaxed">
          I have deep knowledge about his work, research, projects, and
          interests. Pick a topic below or type your own question!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl w-full">
        {questions.map((q, index) => (
          <motion.button
            key={q.text}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.1 + index * 0.05,
              ease: "easeOut",
            }}
            onClick={() => onSelect(q.text)}
            className={`group flex items-start gap-3 text-left ${q.bg} border ${q.border} rounded-xl px-4 py-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
          >
            <div
              className={`flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br ${q.color} flex items-center justify-center shadow-sm mt-0.5`}
            >
              <q.icon size={14} className="text-white" />
            </div>
            <span className="text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors leading-snug">
              {q.text}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
