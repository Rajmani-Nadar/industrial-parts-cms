/**
 * Testimonials Section Component
 * Carousel of customer testimonials
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/constants/homepage";
import { COLORS } from "@/constants";

type TestimonialCard = {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  rating: number;
};

type TestimonialsSectionProps = {
  testimonials?: TestimonialCard[];
};

export function TestimonialsSection({ testimonials = TESTIMONIALS }: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);

  const safeTestimonials = testimonials.length > 0 ? testimonials : TESTIMONIALS;

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? safeTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === safeTestimonials.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
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
            Customer Testimonials
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trusted by leading enterprises worldwide
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <div className="max-w-3xl mx-auto">
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-6">
                  {Array.from({ length: safeTestimonials[current].rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5"
                      fill={COLORS.orange[500]}
                      style={{ color: COLORS.orange[500] }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xl md:text-2xl font-semibold mb-8 text-gray-900">
                  &quot;{safeTestimonials[current].quote}&quot;
                </p>

                {/* Author Info */}
                <div className="flex items-center space-x-4 border-t pt-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{
                      backgroundColor: COLORS.orange[500] + "20",
                      color: COLORS.orange[500],
                    }}
                  >
                    👤
                  </div>
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: COLORS.navy[500] }}
                    >
                      {safeTestimonials[current].author}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {safeTestimonials[current].title} at {safeTestimonials[current].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <motion.button
              onClick={handlePrev}
              className="p-2 rounded-full border-2 transition-all"
              style={{ borderColor: COLORS.navy[500], color: COLORS.navy[500] }}
              whileHover={{
                backgroundColor: COLORS.navy[500],
                color: "white",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {safeTestimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className="rounded-full transition-all"
                  style={{
                    width: current === idx ? "32px" : "8px",
                    height: "8px",
                    backgroundColor: current === idx ? COLORS.orange[500] : COLORS.navy[200],
                  }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="p-2 rounded-full border-2 transition-all"
              style={{ borderColor: COLORS.navy[500], color: COLORS.navy[500] }}
              whileHover={{
                backgroundColor: COLORS.navy[500],
                color: "white",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Counter */}
          <p className="text-center text-gray-600 text-sm mt-6">
            {current + 1} / {safeTestimonials.length}
          </p>
        </div>
      </div>
    </section>
  );
}
