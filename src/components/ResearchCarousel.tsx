"use client";
import React, { useState } from "react";
import { research } from "@/constants/research";
import { ResearchItem } from "@/types/research";
import { ResearchCard } from "./ResearchCard";
import { ResearchModal } from "./ResearchModal";

export const ResearchCarousel = () => {
  const [selected, setSelected] = useState<ResearchItem | null>(null);
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth">
        {research.map((item) => (
          <div key={item.title} className="snap-center shrink-0 w-72 px-2">
            <ResearchCard item={item} onClick={() => setSelected(item)} />
          </div>
        ))}
      </div>
      {selected && (
        <ResearchModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};
