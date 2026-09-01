"use client";

import { useMemo, useState } from "react";
import { DownloadCard } from "@/components/downloads/DownloadCard";
import { DownloadCategoryTabs } from "@/components/downloads/DownloadCategoryTabs";
import { DownloadsHero } from "@/components/downloads/DownloadsHero";
import { DOWNLOADS, DOWNLOAD_CATEGORIES } from "@/data/downloads";
import type { DownloadDocument } from "@/types/download";

export function DownloadsPageContent({ documents = DOWNLOADS, categories = ["All", ...DOWNLOAD_CATEGORIES] }: { documents?: DownloadDocument[]; categories?: string[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDownloads = useMemo(() => {
    const phrase = searchTerm.trim().toLowerCase();

    return documents.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        !phrase ||
        item.title.toLowerCase().includes(phrase) ||
        item.product.toLowerCase().includes(phrase) ||
        item.partNumber.toLowerCase().includes(phrase) ||
        item.category.toLowerCase().includes(phrase) ||
        item.compatibleEngine.toLowerCase().includes(phrase);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="bg-slate-50 pb-20">
      <DownloadsHero />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <label htmlFor="download-search" className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Search downloads
              </label>
              <input
                id="download-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by product, part number, document type or category"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-orange-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <DownloadCategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-black text-slate-900">Available documents</h2>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            {filteredDownloads.length} results
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredDownloads.map((document) => (
            <DownloadCard key={document.id} {...document} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-2xl font-black text-slate-900">Featured catalogues</div>
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            {
              title: "Bleeder Brake Catalogue",
              description: "Premium braking components and service solutions for heavy-duty fleets.",
              image: "https://images.unsplash.com/photo-1581092921461-4a7e8a9f84f0?auto=format&fit=crop&w=1200&q=80",
              href: "/downloads/bleeder-brake-catalogue.pdf",
            },
            {
              title: "Generator Accessories Catalogue",
              description: "Control, protection, and generator support accessories for industrial uptime.",
              image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
              href: "/downloads/generator-accessories-catalogue.pdf",
            },
            {
              title: "ATS Controller Catalogue",
              description: "Transfer switch systems for mission-critical industrial operations.",
              image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
              href: "/downloads/ats-controller-catalogue.pdf",
            },
            {
              title: "Diesel Engine Components Catalogue",
              description: "OEM-grade replacement parts engineered for performance and reliability.",
              image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
              href: "/downloads/diesel-engine-components-catalogue.pdf",
            },
          ].map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-600">Featured catalogue</div>
                <h3 className="mt-3 text-2xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                <div className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
                  Download catalogue
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
