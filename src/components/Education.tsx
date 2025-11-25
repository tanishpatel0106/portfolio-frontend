"use client";
import React from "react";
import { timeline } from "@/constants/education";
import { Timeline } from "@/components/ui/timeline";

export const EducationHistory = () => {
  const data = timeline.map((item) => ({
    title: item.company,
    content: (
      <div>
        <p className="text-neutral-800 text-sm md:text-base font-semibold mb-2">
          {item.title}
        </p>
        <p className="text-neutral-600 text-xs md:text-sm mb-2">
          {item.date}
        </p>
        <p className="text-neutral-700 text-xs md:text-sm mb-4">
          {item.description}
        </p>
        <p className="text-neutral-700 text-xs md:text-sm mb-4">
          {item.courses}
        </p>
        {item.transcript && (
          <a
            href={item.transcript}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 py-1.5 text-xs md:text-sm font-medium 
                       text-white bg-blue-600 rounded-md hover:bg-blue-700 
                       transition-colors duration-200"
          >
            View Transcript
          </a>
        )}
      </div>
    ),
  }));

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
};

export default EducationHistory;