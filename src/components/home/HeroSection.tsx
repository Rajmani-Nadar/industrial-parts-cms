/**
 * Hero Section Component
 * Full viewport height with animated headline, CTAs, and scroll indicator
 */

"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { buildRFQLink } from "@/lib/rfq";
import type { CompanySettings } from "@/types/company";

const IndustrialHeroScene = dynamic(() => import("./IndustrialHeroScene"), {
  ssr: false,
  loading: () => (
    <div className="h-[360px] w-full animate-pulse rounded-[2rem] bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#e7edf1_58%,_#cbd5dc_100%)] md:h-[500px] lg:h-[620px]" />
  ),
});

type HeroSectionProps = {
  company?: CompanySettings;
};

export function HeroSection({ company }: HeroSectionProps = {}) {
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
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f8fafb_0%,#eef3f5_52%,#dce5e9_100%)] pt-24 md:pt-28">
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(0,51,102,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(0,51,102,0.055)_1px,transparent_1px)] [background-size:48px_48px]" />
      <motion.div
        className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-4 lg:px-8 lg:pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="max-w-2xl py-8 lg:py-12"
          variants={itemVariants}
        >
          <div className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-sky-800">
            <span className="h-px w-10 bg-orange-500" />
            Industrial engineering solutions
          </div>
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Engineered for
            <br />
            <span className="text-sky-900">Heavy-Duty</span>{" "}
            <span className="text-orange-500">Performance</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Precision engine braking systems, bleeder brakes, generator accessories, ATS controllers, AVR modules, diesel engine spare parts, and industrial components built for demanding applications.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={buildRFQLink()} className="inline-flex items-center justify-center rounded-xl border border-sky-900/20 bg-white/70 px-6 py-3.5 text-sm font-bold text-sky-900 transition hover:border-orange-400 hover:bg-white">
              {company?.heroCtaText ?? "Request a Quote"}
            </Link>
          </div>
          <div className="mt-9 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Engineered · Tested · Dependable
          </div>
        </motion.div>

        <motion.div className="relative min-w-0" variants={itemVariants}>
          <IndustrialHeroScene />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-slate-500 md:block">
        <ChevronDown className="h-5 w-5 animate-bounce text-orange-500" />
      </div>
    </section>
  );
}
