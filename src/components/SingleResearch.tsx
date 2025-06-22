"use client";
import { ResearchItem } from "@/types/research";
import { IconExternalLink, IconFileText } from "@tabler/icons-react";

export const SingleResearch = ({ item }: { item: ResearchItem }) => {
  const copyBibtex = () => {
    navigator.clipboard.writeText(item.bibtex);
  };

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-neutral-800 mb-2">{item.title}</h1>
      <p className="text-sm text-neutral-600 mb-4">{item.authors.join(", ")}</p>
      <p className="text-neutral-700 mb-4 whitespace-pre-line">{item.summary}</p>
      <div className="mb-4 space-y-2">
        <h2 className="font-semibold text-neutral-800">Methodology</h2>
        <ul className="list-disc list-inside text-sm text-neutral-700">
          {item.methodology.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-neutral-800 mb-1">Results</h2>
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
    </div>
  );
};
