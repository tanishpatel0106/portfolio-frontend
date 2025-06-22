"use client";
import { products } from "@/constants/products";
import { Product } from "@/types/products";
import Image from "next/image";
import { motion } from "framer-motion";

export const FeatureGrid = () => {
  return (
    <div id="features" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item: Product) => (
        <motion.div
          key={item.slug || item.href}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200 p-5"
        >
          {item.thumbnail && (
            <div className="relative h-32 w-full mb-3">
              <Image
                src={item.thumbnail}
                alt="thumbnail"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          <h3 className="font-bold text-neutral-800 mb-2">{item.title}</h3>
          <p className="text-sm text-neutral-600 line-clamp-3">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
