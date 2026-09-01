/**
 * Floating WhatsApp Button Component
 * Sticky bottom-right button with animated hover effect
 */

"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { COLORS } from "@/constants";

const WHATSAPP_PHONE_NUMBER = "+14155550142";

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
    const message = "Hi, I need technical support for an industrial equipment query.";
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40 pointer-events-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
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

      <motion.button
        className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-lg pointer-events-auto transition-all"
        style={{ backgroundColor: "#25D366" }}
        variants={buttonVariants}
        whileHover="hover"
        onClick={handleClick}
        aria-label="Chat with Technical Support"
        title="Chat with Technical Support"
      >
        <MessageCircle className="h-8 w-8 text-white" />

        <motion.div
          className="absolute right-20 whitespace-nowrap rounded-lg bg-gray-900 px-4 py-2 text-sm text-white pointer-events-none"
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          Chat with Technical Support
          <div className="absolute left-full top-1/2 h-2 w-2 -translate-y-1/2 bg-gray-900" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
