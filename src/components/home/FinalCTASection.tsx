/**
 * Final CTA Banner Section Component
 * Full-width conversion-focused banner
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COLORS } from "@/constants";
import { buildRFQLink } from "@/lib/rfq";

export function FinalCTASection() {
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

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="relative rounded-2xl overflow-hidden p-12 md:p-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            backgroundImage: `linear-gradient(135deg, ${COLORS.navy[500]} 0%, ${COLORS.navy[700]} 50%, ${COLORS.steel[600]} 100%)`,
          }}
        >
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"30\" cy=\"30\" r=\"2\" fill=\"%23ffffff\"/></svg>')",
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Headline */}
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6"
              variants={itemVariants}
            >
              Need Reliable Industrial Components?
            </motion.h2>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Get premium OEM-certified components with expert support and
              competitive pricing
            </motion.p>

            {/* Stats Highlights */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-6 my-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {[
                { number: "5000+", label: "Happy Clients" },
                { number: "50+", label: "Countries" },
                { number: "25+", label: "Years Experience" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="text-2xl md:text-3xl font-bold mb-1"
                    style={{ color: COLORS.orange[400] }}
                  >
                    {stat.number}
                  </div>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={buildRFQLink()}
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white space-x-2 transition-all"
                  style={{ backgroundColor: COLORS.orange[500] }}
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-navy-500 transition-all"
                >
                  Explore Products
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center items-center gap-4 text-sm text-gray-300"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-1">
                <span>✓</span>
                <span>ISO Certified</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <div className="flex items-center space-x-1">
                <span>✓</span>
                <span>Money Back Guarantee</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <div className="flex items-center space-x-1">
                <span>✓</span>
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
