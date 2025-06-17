"use client";
import React from "react";
import { researchPapers } from "@/constants/research";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export const Research = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-10">
        {researchPapers.map((paper, idx) => (
          <motion.div
            key={paper.href}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.1 }}
          >
            <Link
              href={paper.href}
              target="_blank"
              className="group flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 hover:bg-gray-50 rounded-2xl transition duration-200 pt-4"
            >
              <Image
                src={paper.thumbnail}
                alt="thumbnail"
                height={200}
                width={200}
                className="rounded-md"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <Heading as="h4" className="font-black text-lg md:text-lg lg:text-lg">
                    {paper.title}
                  </Heading>
                  <Paragraph className="text-sm md:text-sm lg:text-sm mt-2 max-w-xl">
                    {paper.description}
                  </Paragraph>
                </div>
                <div className="flex space-x-2 md:mb-1 mt-2 md:mt-0">
                  {paper.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs md:text-xs lg:text-xs bg-gray-50 px-2 py-1 rounded-sm text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
