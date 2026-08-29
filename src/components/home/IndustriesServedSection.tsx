/**
 * Industries Served Section Component
 * Grid of industry cards with overlay
 */

"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { INDUSTRIES_SERVED } from "@/constants/homepage";
import { COLORS } from "@/constants";

export function IndustriesServedSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -8, transition: { duration: 0.3 } },
  };

  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as any;
    return Icon ? <Icon className="w-12 h-12" /> : null;
  };

  return (
    <section className="py-20 px-4 bg-white">
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
            Industries We Serve
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Powering industrial operations across multiple sectors
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {INDUSTRIES_SERVED.map((industry) => (
            <motion.div
              key={industry.id}
              className="group relative rounded-xl overflow-hidden h-48 cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${COLORS.navy[500]} 0%, ${COLORS.steel[500]} 100%)`,
                }}
              />

              {/* Overlay pattern */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml,<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"%23ffffff\" opacity=\"0.1\"/></svg>')",
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col items-start justify-between">
                <motion.div
                  className="text-white"
                  whileHover={{ scale: 1.2 }}
                >
                  {getIcon(industry.icon)}
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {industry.description}
                  </p>
                </div>
              </div>

              {/* Hover overlay with CTA */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: COLORS.orange[500] + "f0",
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="px-6 py-2 rounded-lg font-semibold text-white border-2 border-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
