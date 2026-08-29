/**
 * Home Page - Industrial B2B Website
 * Placeholder for homepage sections
 * Sections to be built: Hero, Features, Products, Testimonials, CTA, etc.
 */

"use client";

import { motion } from "framer-motion";
import { COLORS, COMPANY_STATS } from "@/constants";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold font-display mb-6"
            style={{ color: COLORS.navy[500] }}
            variants={itemVariants}
          >
            Industrial Automation Redefined
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Enterprise-grade automation and control solutions designed for modern
            industrial operations.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={itemVariants}
          >
            <motion.button
              className="px-8 py-4 rounded-lg font-semibold text-white text-lg transition-all"
              style={{ backgroundColor: COLORS.orange[500] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-lg font-semibold border-2 text-lg transition-all"
              style={{
                borderColor: COLORS.navy[500],
                color: COLORS.navy[500],
              }}
              whileHover={{ backgroundColor: COLORS.navy[50] }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            variants={itemVariants}
          >
            {COMPANY_STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <p
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: COLORS.orange[500] }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section Placeholder */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold font-display mb-4"
              style={{ color: COLORS.navy[500] }}
            >
              Features Section
            </h2>
            <p className="text-gray-600 text-lg">
              Homepage feature sections to be built. Foundation is ready for implementation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section Placeholder */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold font-display mb-4"
              style={{ color: COLORS.navy[500] }}
            >
              Products Section
            </h2>
            <p className="text-gray-600 text-lg">
              Product showcase, pricing, and integration examples to be built.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Additional Sections Placeholder */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold font-display mb-4"
              style={{ color: COLORS.navy[500] }}
            >
              Additional Sections
            </h2>
            <p className="text-gray-600 text-lg">
              Testimonials, case studies, and other sections ready for development.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
