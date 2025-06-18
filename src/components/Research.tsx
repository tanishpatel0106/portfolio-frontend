"use client";
import React from "react";
import { researchPapers } from "@/constants/research";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const Research = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {researchPapers.map((paper, index) => (
        <ResearchFeature key={paper.href} index={index} {...paper} />
      ))}
    </div>
  );
};

type FeatureProps = {
  index: number;
} & (typeof researchPapers)[number];

const ResearchFeature = ({ title, description, href, thumbnail, tags, index }: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "flex flex-col items-center text-center lg:border-r py-10 relative group/feature dark:border-neutral-800",
        index % 3 === 0 && "lg:border-l dark:border-neutral-800"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      <Image src={thumbnail} alt="thumbnail" height={80} width={80} className="mb-4 relative z-10 rounded-md" />
      <div className="mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <Heading as="h4" className="font-bold text-lg group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </Heading>
      </div>
      <Paragraph className="text-sm max-w-xs relative z-10 px-10 text-neutral-600 dark:text-neutral-300">
        {description}
      </Paragraph>
      <div className="flex flex-wrap justify-center gap-2 mt-2 relative z-10">
        {tags?.map((tag) => (
          <span key={tag} className="text-xs bg-gray-50 px-2 py-1 rounded-sm text-secondary">
            {tag}
          </span>
        ))}
      </div>
      <Link href={href} target="_blank" className="absolute inset-0 z-20">
        <span className="sr-only">{title}</span>
      </Link>
    </motion.div>
  );
};
