"use client";
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { research } from "@/constants/research";
import { ResearchItem } from "@/types/research";
import { ResearchCard } from "./ResearchCard";
import { ResearchModal } from "./ResearchModal";

export const ResearchCarousel = () => {
  const [selected, setSelected] = useState<ResearchItem | null>(null);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { origin: "center", perView: 1.2, spacing: 16 },
  });
  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {research.map((item) => (
          <div key={item.title} className="keen-slider__slide px-4 w-72">
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
