/**
 * Certifications Section Component
 * Display ISO and API certifications
 */

"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { CERTIFICATIONS } from "@/constants/homepage";
import { COLORS } from "@/constants";

type CertificationCard = {
  id: string;
  name: string;
  description: string;
};

type CertificationsSectionProps = {
  certifications?: CertificationCard[];
};

export function CertificationsSection({ certifications = CERTIFICATIONS }: CertificationsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
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
            Global Certifications
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Internationally recognized standards and certifications
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 text-center border border-gray-200 hover:shadow-2xl transition-shadow"
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              {/* Badge */}
              <motion.div
                className="flex justify-center mb-6"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: COLORS.orange[500] + "20",
                  }}
                >
                  <Shield
                    className="w-8 h-8"
                    style={{ color: COLORS.orange[500] }}
                  />
                </div>
              </motion.div>

              {/* Name */}
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: COLORS.navy[500] }}
              >
                {cert.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">
                {cert.description}
              </p>

              {/* Verification Badge */}
              <motion.div
                className="mt-6 pt-6 border-t border-gray-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ borderColor: COLORS.orange[500] + "40" }}
              />
              <p
                className="text-xs font-semibold mt-4 uppercase tracking-wide"
                style={{ color: COLORS.orange[500] }}
              >
                Verified &amp; Compliant
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
