"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface LightboxModalProps {
  item: { title: string; image: string; location: string } | null;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function LightboxModal({ item, index, total, onClose, onNext, onPrevious }: LightboxModalProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose, onNext, onPrevious]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-slate-900/70 p-2 text-white transition-colors hover:bg-slate-800"
              aria-label="Close gallery image"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-[70vh] w-full">
              <Image src={item.image} alt={item.title} fill className="object-contain" sizes="(max-width: 768px) 100vw, 80vw" />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
              <div>
                <div className="font-semibold text-white">{item.title}</div>
                <div className="text-slate-300">{item.location}</div>
              </div>

              <div className="flex items-center gap-2">
                <button type="button" onClick={onPrevious} className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/10" aria-label="Previous image">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <span className="min-w-[90px] text-center text-xs uppercase tracking-[0.2em] text-orange-300">
                  {index + 1}/{total}
                </span>
                <button type="button" onClick={onNext} className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/10" aria-label="Next image">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
