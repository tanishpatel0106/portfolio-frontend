"use client";
import React, { useState } from "react";
import { ResearchItem } from "@/types/research";
import { research } from "@/constants/research";
import { ResearchCard } from "./ResearchCard";
import { ResearchModal } from "./ResearchModal";

export const ResearchSection = () => {
  const [selected, setSelected] = useState<ResearchItem | null>(null);

  return (
    <div className="w-full">
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-6">
        {research.map((item) => (
          <div key={item.title} className="flex-shrink-0 md:flex-shrink md:w-auto w-72">
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
