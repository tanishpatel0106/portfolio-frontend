"use client";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Paper } from "@/types/research";
import { papers } from "@/constants/research";

export function ResearchGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center relative z-10 py-10 max-w-7xl mx-auto">
      {papers.map((paper, index) => (
        <Link href={`/research/${paper.slug}`} key={paper.slug}>
          <Feature {...paper} index={index} />
        </Link>
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className="w-72 h-60 bg-sky-50 dark:bg-neutral-900 border border-sky-200 dark:border-sky-800 rounded-lg flex flex-col p-6 hover:bg-sky-100 dark:hover:bg-neutral-800 transition"
    >
      <div className="mb-3 text-sky-600 dark:text-sky-400 text-3xl">{icon}</div>
      <div className="text-lg font-bold mb-2 text-primary">{title}</div>
      <p className="text-sm text-secondary overflow-y-auto">{description}</p>
    </div>
  );
};
