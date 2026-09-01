"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export type IndustryCardItem = {
  title: string;
  description: string;
  image: string;
  products: string[];
  applications: string[];
  href: string;
};

export function IndustryCard({ item }: { item: IndustryCardItem }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl"
    >
      <div className="relative h-56 overflow-hidden">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-slate-900/10" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Products supplied</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.products.map((product) => (
              <span key={product} className="rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-800">
                {product}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Common applications</p>
          <p className="mt-2 text-sm text-slate-600">{item.applications.join(" • ")}</p>
        </div>

        <Link
          href={item.href}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-sky-800 px-4 py-2 text-sm font-semibold text-sky-800 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          Explore Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
