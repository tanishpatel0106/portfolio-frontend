"use client";
import { Research } from "@/types/research";
import Image from "next/image";
import { motion } from "framer-motion";

export const ResearchCarousel = ({ items, onSelect }: { items: Research[]; onSelect: (r: Research) => void }) => {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex space-x-4" >
        {items.map((item) => (
          <motion.div
            key={item.slug}
            whileHover={{ scale: 1.05 }}
            className="relative flex-shrink-0 w-60 h-72 rounded-xl overflow-hidden cursor-pointer shadow"
            onClick={() => onSelect(item)}
          >
            <Image src={item.image} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/70" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs uppercase tracking-wide mb-1">{item.tags[0]}</p>
              <h4 className="text-lg font-semibold leading-tight">{item.title}</h4>
              <p className="text-sm mt-1 line-clamp-1">{item.summary}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
