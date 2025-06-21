"use client";
import { Research } from "@/types/research";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { motion } from "framer-motion";

export const ResearchCard = ({ research, onClick }: { research: Research; onClick: () => void }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md p-4 cursor-pointer flex flex-col justify-between"
      onClick={onClick}
    >
      <div>
        <Heading as="h4" className="font-semibold text-base">
          {research.title}
        </Heading>
        <Paragraph className="text-xs mt-1">{research.role}</Paragraph>
        <Paragraph className="mt-2 line-clamp-2 text-sm">{research.summary}</Paragraph>
      </div>
      <div className="flex flex-wrap gap-1 mt-3">
        {research.tags.map((tag) => (
          <span key={tag} className="text-xs bg-gray-50 px-2 py-1 rounded-md text-secondary">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
