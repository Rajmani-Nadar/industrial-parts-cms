"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, BadgeCheck, ShieldCheck, Sparkles, Wrench, FileText } from "lucide-react";
import type { ComponentType } from "react";

export type CertificationCardItem = {
  title: string;
  description: string;
  icon: string;
};

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  iso: BadgeCheck,
  oem: ShieldCheck,
  tested: Sparkles,
  warranty: Wrench,
  quality: FileText,
  download: ArrowDownToLine,
};

export function CertificationCard({ item }: { item: CertificationCardItem }) {
  const Icon = iconMap[item.icon] ?? BadgeCheck;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
    </motion.div>
  );
}
