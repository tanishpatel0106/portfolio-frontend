"use client";
import { ResearchItem } from "@/types/research";
import Image from "next/image";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { IconExternalLink, IconFileText } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const SingleResearch = ({ item }: { item: ResearchItem }) => {
  const [activeImage, setActiveImage] = useState(
    item.thumbnail || item.images?.[0]
  );

  const copyBibtex = () => {
    navigator.clipboard.writeText(item.bibtex);
  };

  return (
    <div className="py-10">
      {activeImage && (
        <motion.div
          key={activeImage}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Image
            src={activeImage}
            alt="research image"
            height={1000}
            width={1000}
            className="rounded-md object-contain"
          />
          <div className="absolute bottom-0 bg-white h-40 w-full [mask-image:linear-gradient(to_bottom,transparent,white)]" />
        </motion.div>
      )}
      {item.images && item.images.length > 1 && (
        <div className="flex flex-row justify-center my-8 flex-wrap">
          {item.images.map((img, idx) => (
            <button onClick={() => setActiveImage(img)} key={`image-${idx}`}>
              <Image
                src={img}
                alt="research image thumbnail"
                height={1000}
                width={1000}
                className="h-14 w-16 md:h-40 md:w-60 object-cover object-top mr-4 mb-4 border rounded-lg border-neutral-100"
              />
            </button>
          ))}
        </div>
      )}
      <div className="flex lg:flex-row justify-between items-center flex-col mt-20">
        <Heading className="font-black mb-2 pb-1">{item.title}</Heading>
        <div className="flex space-x-2 md:mb-1 mt-2 md:mt-0">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs md:text-xs lg:text-xs bg-gray-50 px-2 py-1 rounded-sm text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="text-sm text-neutral-600 my-4">{item.authors.join(", ")}</p>
      <div>
        <Paragraph className="max-w-xl mt-4">{item.summary}</Paragraph>
      </div>
      <div className="prose prose-sm md:prose-base max-w-none text-neutral-600 mt-6">
        {item.description}
      </div>
      <div className="prose prose-sm md:prose-base max-w-none text-neutral-600">
        <h2>Methodology</h2>
        <ul>
          {item.methodology.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <h2>Results</h2>
        <p>{item.results}</p>
      </div>

      <div className="flex items-center gap-4 mt-6">
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
