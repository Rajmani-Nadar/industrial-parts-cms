/**
 * Product Categories Section Component
 * Premium category cards with hover animations
 */

"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { PRODUCT_CATEGORIES_HOMEPAGE } from "@/constants/homepage";
import { COLORS } from "@/constants";

type ProductCategoryCard = {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
};

type ProductCategoriesSectionProps = {
  categories?: ProductCategoryCard[];
};

export function ProductCategoriesSection({ categories = PRODUCT_CATEGORIES_HOMEPAGE }: ProductCategoriesSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as ComponentType<{ className?: string }> | undefined;
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold font-display mb-4"
            style={{ color: COLORS.navy[500] }}
          >
            Product Categories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive range of industrial components for every application
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              <motion.div variants={cardVariants} className="h-full">
                {/* Card Background Gradient on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${COLORS.orange[500]}15 0%, ${COLORS.navy[500]}15 100%)`,
                  }}
                />

                {/* Card Content */}
                <div className="relative p-6 h-full flex flex-col">
                  {/* Icon */}
                  <motion.div
                    className="mb-4 p-3 rounded-lg w-fit"
                    style={{ backgroundColor: COLORS.orange[500] + "20" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div style={{ color: COLORS.orange[500] }}>
                      {getIcon(category.icon)}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold mb-2 group-hover:underline transition-all"
                    style={{ color: COLORS.navy[500] }}
                  >
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm flex-grow mb-4">
                    {category.description}
                  </p>

                  {/* Arrow */}
                  <motion.div
                    className="inline-flex items-center font-semibold text-sm"
                    style={{ color: COLORS.orange[500] }}
                    whileHover={{ x: 4 }}
                  >
                    Learn More →
                  </motion.div>
                </div>

                {/* Hover Border */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: COLORS.orange[500] }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
