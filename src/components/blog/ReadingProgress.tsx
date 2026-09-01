"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 w-full bg-slate-200">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-orange-500 to-sky-500"
        style={{ scaleX }}
      />
    </div>
  );
}
