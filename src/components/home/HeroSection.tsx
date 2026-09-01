/**
 * Hero Section Component
 * Full viewport height with animated headline, CTAs, and scroll indicator
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { COLORS } from "@/constants";
import { buildRFQLink } from "@/lib/rfq";

export function HeroSection() {
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

  const scrollVariants = {
    animate: { y: [0, 8, 0], transition: { duration: 2, repeat: Infinity } },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(0, 51, 102, 0.9) 0%, rgba(42, 111, 165, 0.85) 100%)",
            backgroundColor: COLORS.navy[900],
          }}
        />
        {/* Industrial background pattern placeholder */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23ffffff\" fill-opacity=\"0.03\"><path d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/></g></g></svg>')",
          }}
        />
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          className="mb-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30"
          variants={itemVariants}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: COLORS.orange[500] }}
          />
          <span
            className="text-sm font-medium"
            style={{ color: COLORS.orange[500] }}
          >
            Industry Leading Quality
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-6 text-white leading-tight"
          variants={itemVariants}
        >
          Premium Industrial
          <br />
          <span style={{ color: COLORS.orange[500] }}>Components</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Trusted by global enterprises for OEM-quality diesel engine components,
          control systems, and heavy-duty industrial equipment
        </motion.p>

        {/* Statistics Badges */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-6 mb-12 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {[
            { number: "25+", label: "Years" },
            { number: "5000+", label: "Clients" },
            { number: "50+", label: "Countries" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="px-4 py-3 rounded-lg backdrop-blur-md"
              style={{
                backgroundColor: "rgba(255, 152, 0, 0.1)",
                borderColor: COLORS.orange[500],
                borderWidth: "1px",
              }}
            >
              <div
                className="text-2xl md:text-3xl font-bold"
                style={{ color: COLORS.orange[500] }}
              >
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={buildRFQLink()}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white transition-all"
              style={{ backgroundColor: COLORS.orange[500] }}
            >
              Request a Quote
            </Link>
          </motion.div>
          <motion.div whileHover={{ backgroundColor: COLORS.orange[500] + "20" }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold border-2 transition-all text-white"
              style={{
                borderColor: COLORS.orange[500],
                color: "white",
              }}
            >
              Explore Products
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate="animate"
          variants={scrollVariants}
        >
          <ChevronDown className="w-6 h-6 text-orange-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
