/**
 * About Preview Section Component
 * Two-column layout with company overview
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COLORS } from "@/constants";

export function AboutPreviewSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const highlights = [
    "25+ years of industry expertise",
    "OEM-certified components only",
    "Global distribution network",
    "24/7 technical support",
    "Competitive pricing guaranteed",
    "Fast and reliable delivery",
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left: Image Placeholder */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <div
              className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
              style={{
                backgroundColor: COLORS.navy[100],
                backgroundImage:
                  "linear-gradient(135deg, rgba(0, 51, 102, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="text-6xl font-bold mb-4"
                    style={{ color: COLORS.navy[200] }}
                  >
                    📦
                  </div>
                  <p className="text-gray-400">
                    Industrial warehouse imagery
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-xs"
              whileHover={{ y: -10 }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: COLORS.navy[500] }}>
                Trusted Partner
              </p>
              <p className="text-gray-600 text-sm">
                Serving global enterprises since 1999
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div variants={itemVariants}>
            <span
              className="text-sm font-semibold uppercase tracking-wide mb-4 inline-block"
              style={{ color: COLORS.orange[500] }}
            >
              About Us
            </span>

            <h2
              className="text-4xl md:text-5xl font-bold font-display mb-6"
              style={{ color: COLORS.navy[500] }}
            >
              Industry Excellence Since 1999
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We are a leading distributor of premium industrial components and
              spare parts. Our commitment to quality, reliability, and customer
              service has made us the trusted partner for enterprises worldwide.
            </p>

            {/* Highlights */}
            <div className="space-y-3 mb-8">
              {highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  viewport={{ once: true }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: COLORS.orange[500] }}
                  >
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              className="flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold text-white transition-all"
              style={{ backgroundColor: COLORS.orange[500] }}
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
