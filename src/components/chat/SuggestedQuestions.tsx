"use client";
import { motion } from "framer-motion";

const questions = [
  "What are you currently working on at Columbia?",
  "Tell me about your experience building AI products at Paperchase",
  "What projects have you built in quantitative finance?",
  "What research papers have you published?",
  "What's your tech stack and what do you enjoy working with most?",
  "How did you get into AI and data science?",
  "What do you do outside of work and school?",
  "What kind of roles or collaborations are you looking for?",
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <p className="text-4xl mb-4">💬</p>
        <h2 className="text-xl font-semibold text-neutral-800 mb-2">
          Ask me anything about Tanish
        </h2>
        <p className="text-sm text-neutral-500 max-w-md">
          I have extensive knowledge about Tanish&apos;s work, research,
          projects, and interests. Pick a question below or ask your own!
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
        {questions.map((question, index) => (
          <motion.button
            key={question}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onSelect(question)}
            className="bg-gray-50 hover:bg-sky-50 border border-neutral-200 hover:border-sky-200 rounded-full px-4 py-2 text-sm text-neutral-600 hover:text-neutral-800 transition-all duration-200"
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
