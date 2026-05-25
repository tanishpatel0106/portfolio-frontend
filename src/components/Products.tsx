"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { products } from "@/constants/products";
import { Product } from "@/types/products";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

const ProjectHeader = ({ product }: { product: Product }) => (
  <div className="relative flex flex-1 w-full min-h-[10rem] overflow-hidden rounded-xl bg-gray-100">
    <Image
      src={product.thumbnail}
      alt={product.title}
      fill
      sizes="(min-width: 768px) 50vw, 100vw"
      className="object-cover object-top transition duration-300 group-hover/bento:scale-105"
    />
  </div>
);

export const Products = () => {
  return (
    <BentoGrid className="max-w-4xl md:auto-rows-[20rem]">
      {products.map((product: Product, i: number) => {
        const isExternal = !product.slug;
        const href = product.slug ? `/projects/${product.slug}` : product.href;
        const featured = i % 7 === 0 || i % 7 === 3;
        return (
          <motion.div
            key={product.slug || product.href || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: (i % 3) * 0.05 }}
            className={cn(featured && "md:col-span-2")}
          >
            <Link
              href={href || "#"}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="block h-full focus:outline-none"
            >
              <BentoGridItem
                className="h-full"
                header={<ProjectHeader product={product} />}
                title={<span className="line-clamp-2">{product.title}</span>}
                description={
                  <span className="line-clamp-2">{product.description}</span>
                }
              />
            </Link>
          </motion.div>
        );
      })}
    </BentoGrid>
  );
};
