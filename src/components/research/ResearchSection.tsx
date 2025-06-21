"use client";
import { researchData } from "@/constants/research";
import { Research } from "@/types/research";
import { useState } from "react";
import { ResearchCard } from "./ResearchCard";
import { ResearchModal } from "./ResearchModal";

export const ResearchSection = () => {
  const [selected, setSelected] = useState<Research | null>(null);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {researchData.map((r) => (
          <ResearchCard key={r.slug} research={r} onClick={() => setSelected(r)} />
        ))}
      </div>
      <ResearchModal research={selected} onClose={() => setSelected(null)} />
    </div>
  );
};
