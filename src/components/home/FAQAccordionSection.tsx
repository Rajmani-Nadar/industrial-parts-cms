/**
 * FAQ Accordion Section Component
 * Expandable FAQ items with smooth animations
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/constants/homepage";
import { COLORS } from "@/constants";

export function FAQAccordionSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const categories = [...new Set(FAQS.map((faq) => faq.category))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
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
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about our products and services
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all capitalize"
              style={{
                backgroundColor: COLORS.orange[500] + "20",
                color: COLORS.orange[500],
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FAQS.map((faq) => (
            <motion.div key={faq.id} variants={itemVariants}>
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full text-left p-6 rounded-xl border border-gray-200 hover:border-orange-400 hover:bg-orange-50/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <h3
                    className="text-lg font-semibold pr-6"
                    style={{ color: COLORS.navy[500] }}
                  >
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{
                      rotate: openId === faq.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className="w-5 h-5"
                      style={{ color: COLORS.orange[500] }}
                    />
                  </motion.div>
                </div>

                {/* Answer */}
                <AnimatePresence mode="wait">
                  {openId === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4"
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>

                      {/* Category Badge */}
                      <div className="mt-4 flex items-center space-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Category:
                        </span>
                        <span
                          className="text-xs font-medium capitalize px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: COLORS.orange[500] + "15",
                            color: COLORS.orange[500],
                          }}
                        >
                          {faq.category}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="mt-12 p-6 rounded-xl text-center"
          style={{
            backgroundColor: COLORS.orange[500] + "10",
            borderColor: COLORS.orange[500] + "30",
            borderWidth: "1px",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 mb-4">
            Didn&apos;t find your answer? Our support team is ready to help.
          </p>
          <motion.button
            className="px-6 py-2 rounded-lg font-semibold text-white"
            style={{ backgroundColor: COLORS.orange[500] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
