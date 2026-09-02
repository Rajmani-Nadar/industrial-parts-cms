"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { GALLERY_FILTERS, type GalleryCategory, GALLERY_ITEMS } from "@/data/gallery";
import { LightboxModal } from "@/components/gallery/LightboxModal";
import type { GalleryItem } from "@/types/gallery";

const columnClasses = ["md:col-span-2", "", "", "md:col-span-2", "", "", "md:col-span-2"]; 

export function GalleryGrid({ items = GALLERY_ITEMS, filters = GALLERY_FILTERS }: { items?: GalleryItem[]; filters?: readonly string[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filterOptions = useMemo(
    () => ["All", ...filters.filter((filter) => filter && filter !== "All")].filter((filter, index, allFilters) => allFilters.indexOf(filter) === index),
    [filters]
  );

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter, items]);

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] ?? null : null;

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredItems.length);
  };

  const showPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap gap-3">
        {filterOptions.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={`${filter}-${filterOptions.indexOf(filter)}`}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:text-orange-700"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-3 md:auto-rows-[180px]">
        {filteredItems.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm ${columnClasses[index % columnClasses.length]} ${index % 2 === 0 ? "md:row-span-2" : ""}`}
          >
            <div className="absolute inset-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">{item.category}</div>
              <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-slate-200">{item.location}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <LightboxModal
        item={selectedItem ? { title: selectedItem.title, image: selectedItem.image, location: selectedItem.location } : null}
        index={selectedIndex ?? 0}
        total={filteredItems.length}
        onClose={closeLightbox}
        onNext={showNext}
        onPrevious={showPrevious}
      />
    </section>
  );
}
