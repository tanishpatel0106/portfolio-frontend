"use client";
import React from "react";
import { ResearchItem } from "@/types/research";
import { motion } from "framer-motion";

export const ResearchCard = ({
  item,
  onClick,
}: {
  item: ResearchItem;
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="text-left bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200 p-4 w-full h-full flex flex-col justify-between overflow-hidden"
    >
      <div>
        <p className="text-xs text-sky-600 font-semibold mb-1">{item.category}</p>
        <h3 className="font-bold text-neutral-800 mb-1">{item.title}</h3>
        <p className="text-sm text-neutral-500 mb-2">{item.role}</p>
        <p className="text-sm text-neutral-700 line-clamp-2">{item.summary}</p>
      </div>
      <div className="flex flex-wrap gap-1 mt-3">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.button>
  );
};
