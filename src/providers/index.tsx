"use client";

import { ReactNode } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

/**
 * Providers Component
 * Wraps the application with necessary providers (Framer Motion, Theme, etc.)
 */
interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <div key="page-shell">{children}</div>
      </AnimatePresence>
    </LazyMotion>
  );
}
