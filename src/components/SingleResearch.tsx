"use client";
import { ResearchItem } from "@/types/research";
import Image from "next/image";
import { Heading } from "./Heading";
import { motion } from "framer-motion";
import { useState } from "react";

export const SingleResearch = ({ item }: { item: ResearchItem }) => {
  const [activeImage, setActiveImage] = useState(
    item.thumbnail || item.images?.[0]
  );

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
      <div className="prose prose-sm md:prose-base max-w-none text-neutral-600 mt-6">
        {item.descriptionHtml ? (
          <div dangerouslySetInnerHTML={{ __html: item.descriptionHtml }} />
        ) : (
          item.description
        )}
      </div>
    </div>
  );
};
