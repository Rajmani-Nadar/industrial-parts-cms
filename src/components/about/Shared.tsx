"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe2, MapPinned, Quote } from "lucide-react";
import type { ComponentType } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">{title}</h2>
      <p className="mt-4 text-base text-slate-600 md:text-lg">{description}</p>
    </div>
  );
}

export function StatCard({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="text-3xl font-black text-sky-900 md:text-4xl">
        {value}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-slate-500">{label}</div>
    </motion.div>
  );
}

export function TimelineItem({
  year,
  title,
  description,
  isLast = false,
}: {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <div className="relative flex gap-4 pb-8 last:pb-0">
      <div className="flex flex-col items-center">
        <div className="flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-orange-500 shadow-md" />
        {!isLast && <div className="mt-2 h-full w-px bg-slate-200" />}
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">{year}</p>
        <h3 className="mt-3 text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </motion.div>
    </div>
  );
}

export function FeatureChecklist({
  items,
  icon: Icon = CheckCircle2,
}: {
  items: string[];
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <ul className="mt-8 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-slate-700">
          <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Icon className="h-4 w-4" />
          </span>
          <span className="text-base font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function WorldPresence() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-sky-950 to-sky-900 p-8 text-white shadow-xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-full bg-white/10 p-2"><Globe2 className="h-5 w-5 text-orange-300" /></div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-200">Global Reach</p>
          <h3 className="text-2xl font-bold">Worldwide industrial support</h3>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-3xl font-black text-orange-300">35+</div>
          <div className="mt-2 text-sm uppercase tracking-[0.2em] text-sky-100">Countries served</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-3xl font-black text-orange-300">120+</div>
          <div className="mt-2 text-sm uppercase tracking-[0.2em] text-sky-100">Export partners</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-3xl font-black text-orange-300">500+</div>
          <div className="mt-2 text-sm uppercase tracking-[0.2em] text-sky-100">OEM clients</div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-800/50 p-5">
        <div className="mb-3 flex items-center gap-2 text-sky-100">
          <MapPinned className="h-4 w-4 text-orange-300" />
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">Service coverage</span>
        </div>
        <div className="grid gap-2 text-sm text-slate-200 sm:grid-cols-3">
          <span>Middle East</span>
          <span>Asia Pacific</span>
          <span>Africa</span>
          <span>Europe</span>
          <span>North America</span>
          <span>Latin America</span>
        </div>
      </div>
    </div>
  );
}

export function CTASection({
  title,
  description,
  primaryLabel,
  secondaryLabel,
}: {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 p-8 text-white shadow-2xl md:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Industrial partnership</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">{title}</h2>
            <p className="mt-4 text-base text-sky-100 md:text-lg">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {primaryLabel}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
