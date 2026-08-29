/**
 * Why Choose Us Section Component
 * Six animated feature cards
 */

"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { WHY_CHOOSE_US } from "@/constants/homepage";
import { COLORS } from "@/constants";

export function WhyChooseUsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as any;
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
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Partner with industry leaders who prioritize quality and excellence
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {WHY_CHOOSE_US.map((feature, idx) => (
            <motion.div
              key={feature.id}
              className="relative group"
              variants={cardVariants}
            >
              {/* Background card */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                style={{
                  backgroundColor: COLORS.orange[500],
                  filter: "blur(20px)",
                }}
              />

              {/* Content card */}
              <div
                className="relative bg-white p-8 rounded-xl shadow-lg group-hover:shadow-2xl transition-all h-full flex flex-col border border-gray-200"
              >
                {/* Icon */}
                <motion.div
                  className="mb-4 p-4 rounded-lg w-fit"
                  style={{
                    backgroundColor: COLORS.orange[500] + "15",
                  }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <div style={{ color: COLORS.orange[500] }}>
                    {getIcon(feature.icon)}
                  </div>
                </motion.div>

                {/* Number badge */}
                <div
                  className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                  style={{ backgroundColor: COLORS.navy[500] }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: COLORS.navy[500] }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 flex-grow">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <motion.div
                  className="mt-6 pt-4 border-t border-gray-200"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ borderColor: COLORS.orange[500] + "40" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
