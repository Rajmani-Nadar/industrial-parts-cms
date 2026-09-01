/**
 * Featured Products Section Component
 * Premium product cards
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FEATURED_PRODUCTS } from "@/constants";
import { COLORS } from "@/constants";

type FeaturedProductCard = {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  features: string[];
  rating?: number;
};

type FeaturedProductsSectionProps = {
  products?: FeaturedProductCard[];
};

export function FeaturedProductsSection({ products = FEATURED_PRODUCTS }: FeaturedProductsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
            Featured Products
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse our most popular and trusted products
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              variants={cardVariants}
            >
              {/* Product Image Area */}
              <div
                className="relative h-48 overflow-hidden bg-gradient-to-br"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${COLORS.navy[100]} 0%, ${COLORS.orange[50]} 100%)`,
                }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-6xl"
                  whileHover={{ scale: 1.1 }}
                >
                  ⚙️
                </motion.div>

                {/* Badge */}
                {product.rating && (
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center space-x-1"
                    style={{ backgroundColor: COLORS.orange[500] }}
                  >
                    <span>⭐ {product.rating}</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: COLORS.orange[500] }}
                >
                  {product.category}
                </span>

                <h3
                  className="text-xl font-bold mt-2 mb-3 group-hover:underline transition-all"
                  style={{ color: COLORS.navy[500] }}
                >
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {product.shortDescription}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: COLORS.orange[500] }}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  className="w-full py-2 rounded-lg font-semibold text-white transition-all"
                  style={{ backgroundColor: COLORS.orange[500] }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/products">
            <motion.button
              className="px-8 py-3 rounded-lg font-semibold border-2 transition-all"
              style={{
                borderColor: COLORS.navy[500],
                color: COLORS.navy[500],
              }}
              whileHover={{
                backgroundColor: COLORS.navy[500],
                color: "white",
              }}
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
