"use client";
import React, { useEffect } from "react";
import { ResearchItem } from "@/types/research";
import {
  IconX,
  IconFileText,
  IconExternalLink,
} from "@tabler/icons-react";
import Link from "next/link";

export const ResearchModal = ({
  item,
  onClose,
}: {
  item: ResearchItem;
  onClose: () => void;
}) => {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const copyBibtex = () => {
    navigator.clipboard.writeText(item.bibtex);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md max-h-[90vh] overflow-y-auto w-full max-w-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-800"
        >
          <IconX className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold text-neutral-800 mb-2">{item.title}</h2>
        <p className="text-sm text-neutral-600 mb-4">
          {item.authors.join(", ")}
        </p>
        <p className="text-neutral-700 mb-4 whitespace-pre-line">
          {item.summary}
        </p>
        <div className="mb-4 space-y-2">
          <h3 className="font-semibold text-neutral-800">Methodology</h3>
          <ul className="list-disc list-inside text-sm text-neutral-700">
            {item.methodology.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-neutral-800 mb-1">Results</h3>
          <p className="text-sm text-neutral-700">{item.results}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4">
          {item.pdf && (
            <a
              href={item.pdf}
              className="flex items-center text-sm text-sky-600 hover:underline"
            >
              <IconFileText className="h-4 w-4 mr-1" /> PDF
            </a>
          )}
          <button
            onClick={copyBibtex}
            className="flex items-center text-sm text-sky-600 hover:underline"
          >
            <IconExternalLink className="h-4 w-4 mr-1" /> Copy BibTeX
          </button>
          {item.links?.github && (
            <a
              href={item.links.github}
              className="flex items-center text-sm text-sky-600 hover:underline"
            >
              GitHub
            </a>
          )}
          {item.links?.arxiv && (
            <a
              href={item.links.arxiv}
              className="flex items-center text-sm text-sky-600 hover:underline"
            >
              arXiv
            </a>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <Link
            href={`/research/${item.slug}`}
            className="text-sm text-sky-600 hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
