/**
 * Floating WhatsApp Button Component
 * Sticky bottom-right button with animated hover effect
 */

"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { COLORS } from "@/constants";

export function FloatingWhatsAppButton() {
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.15, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  const handleClick = () => {
    // Open WhatsApp with pre-filled message
    const phoneNumber = "+1234567890"; // Replace with actual number
    const message = "Hi, I'm interested in your industrial components.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40 pointer-events-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          backgroundColor: COLORS.orange[500] + "20",
          width: "100%",
          height: "100%",
        }}
        variants={pulseVariants}
        animate="pulse"
      />

      {/* Button */}
      <motion.button
        className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg pointer-events-auto transition-all"
        style={{ backgroundColor: "#25D366" }}
        variants={buttonVariants}
        whileHover="hover"
        onClick={handleClick}
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-8 h-8 text-white" />

        {/* Tooltip */}
        <motion.div
          className="absolute right-20 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none"
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          Chat with us
          <div
            className="absolute left-full top-1/2 -translate-y-1/2 w-2 h-2"
            style={{ backgroundColor: "#1f2937" }}
          />
        </motion.div>
      </motion.button>

      {/* Floating text on desktop */}
      <motion.div
        className="hidden md:block absolute -top-12 right-0 bg-white rounded-lg shadow-lg p-3 whitespace-nowrap text-sm"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <p className="font-semibold text-gray-900">Need Help?</p>
        <p className="text-gray-600 text-xs">Chat with our team</p>
      </motion.div>
    </motion.div>
  );
}
