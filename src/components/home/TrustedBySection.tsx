/**
 * Trusted By Section Component
 * Infinite marquee animation with client logos
 */

"use client";

import { motion } from "framer-motion";
import { CLIENT_LOGOS } from "@/constants/homepage";
import { COLORS } from "@/constants";

export function TrustedBySection() {
  const marqueeVariants = {
    animate: {
      x: [-1000, -3000],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  return (
    <section className="py-12 md:py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h3
          className="text-center text-sm font-semibold uppercase tracking-wider mb-8"
          style={{ color: COLORS.navy[500] }}
        >
          Trusted by Industry Leaders
        </h3>

        {/* Marquee Container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex space-x-12"
            variants={marqueeVariants}
            animate="animate"
            onHoverStart={() => undefined}
            onHoverEnd={() => undefined}
          >
            {/* Original logos */}
            {CLIENT_LOGOS.map((logo, idx) => (
              <div
                key={`original-${idx}`}
                className="flex-shrink-0 min-w-max"
              >
                <div
                  className="h-12 flex items-center justify-center px-8 text-gray-600 font-semibold text-sm"
                  style={{
                    color: COLORS.navy[400],
                  }}
                >
                  {logo.name}
                </div>
              </div>
            ))}

            {/* Duplicate for seamless loop */}
            {CLIENT_LOGOS.map((logo, idx) => (
              <div
                key={`duplicate-${idx}`}
                className="flex-shrink-0 min-w-max"
              >
                <div
                  className="h-12 flex items-center justify-center px-8 text-gray-600 font-semibold text-sm"
                  style={{
                    color: COLORS.navy[400],
                  }}
                >
                  {logo.name}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hover pause notice */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Scroll to explore · Hover to pause
        </p>
      </div>
    </section>
  );
}
