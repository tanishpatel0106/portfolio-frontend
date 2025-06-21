"use client";
import { Research } from "@/types/research";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { motion, AnimatePresence } from "framer-motion";

export const ResearchModal = ({ research, onClose }: { research: Research | null; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {research && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-secondary">✕</button>
            <Heading as="h3" className="font-black mb-2">
              {research.title}
            </Heading>
            <Paragraph className="text-sm mb-2">{research.role}</Paragraph>
            <Paragraph className="mb-4">{research.abstract}</Paragraph>
            <Heading as="h4" className="text-base mt-4 mb-2">Methodology</Heading>
            <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
              {research.methods.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <Heading as="h4" className="text-base mt-4 mb-2">Collaborators</Heading>
            <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
              {research.collaborators.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {research.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-50 px-2 py-1 rounded-md text-secondary">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <a href={research.pdf} download className="text-sm text-primary underline">
                Download PDF
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(research.bibtex)}
                className="text-sm text-primary underline"
              >
                Copy BibTeX
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
