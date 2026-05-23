"use client";
import React from "react";
import { Heading } from "./Heading";
import { Product } from "@/types/products";
import { products } from "@/constants/products";
import Link from "next/link";
import Image from "next/image";
import { Paragraph } from "./Paragraph";
import { motion } from "framer-motion";
import { SkillRoller } from "./ui/skill-roller";

export const Products = () => {
  return (
    <div>
      <div className="grid grid-cols-1  gap-10">
        {products.map((product: Product, idx: number) => (
          <motion.div
            key={product.href}
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{ duration: 0.2, delay: idx * 0.1 }}
          >
            <Link
              href={product.slug ? `/projects/${product.slug}` : product.href}
              key={product.href}
              className="group flex flex-col gap-4 overflow-hidden rounded-2xl p-2 transition duration-200 hover:bg-gray-50 md:h-48 md:flex-row"
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                height="400"
                width="400"
                className="h-48 w-full flex-shrink-0 rounded-md object-cover object-top md:h-full md:w-64"
              />
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="min-w-0">
                  <Heading
                    as="h4"
                    className="font-black text-lg md:text-lg lg:text-lg truncate"
                  >
                    {product.title}
                  </Heading>
                  <Paragraph className="text-sm md:text-sm lg:text-sm mt-2 line-clamp-2 md:line-clamp-3">
                    {product.description}
                  </Paragraph>
                </div>
                <SkillRoller
                  skills={product.stack ?? []}
                  className="mt-3 md:mb-1 md:mt-0"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
