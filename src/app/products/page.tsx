"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { PRODUCT_APPLICATIONS, PRODUCT_BRANDS, PRODUCT_CATEGORIES, PRODUCTS, Product } from "@/data/products";
import { RFQButton } from "@/components/products/RFQButton";
import { EmptyState } from "@/components/products/EmptyState";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "name", label: "Product Name" },
  { value: "category", label: "Category" },
  { value: "brand", label: "Engine Brand" },
  { value: "application", label: "Application" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

const categoryOptions = [...PRODUCT_CATEGORIES];
const brandOptions = [...PRODUCT_BRANDS];
const availabilityOptions = ["In Stock", "Custom Manufacturing", "OEM Compatible"] as const;

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [sortBy, setSortBy] = useState<SortValue>("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (selectedBrand !== "All") params.set("brand", selectedBrand);
    if (selectedApplication !== "All") params.set("application", selectedApplication);
    if (selectedAvailability !== "All") params.set("availability", selectedAvailability);
    if (sortBy !== "newest") params.set("sort", sortBy);

    const url = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.replaceState({}, "", url);
  }, [search, selectedCategory, selectedBrand, selectedApplication, selectedAvailability, sortBy]);

  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return [...PRODUCTS]
      .filter((product) => {
        const matchesSearch =
          !normalized ||
          product.name.toLowerCase().includes(normalized) ||
          product.sku.toLowerCase().includes(normalized) ||
          product.category.toLowerCase().includes(normalized) ||
          product.compatibleEngines.some((engine) => engine.toLowerCase().includes(normalized));

        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
        const matchesApplication =
          selectedApplication === "All" || product.applications.includes(selectedApplication);
        const matchesAvailability =
          selectedAvailability === "All" || product.availability === selectedAvailability;

        return matchesSearch && matchesCategory && matchesBrand && matchesApplication && matchesAvailability;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "category":
            return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
          case "brand":
            return a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name);
          case "application":
            return a.applications[0].localeCompare(b.applications[0]) || a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [search, selectedCategory, selectedBrand, selectedApplication, selectedAvailability, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedApplication("All");
    setSelectedAvailability("All");
    setSortBy("newest");
  };

  return (
    <div className="bg-slate-50 pb-16 pt-28">
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-900 via-sky-800 to-sky-700">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300 bg-white/10 px-4 py-2 text-sm font-medium text-orange-200 backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
              OEM Quality & Lifetime Support
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Industrial Engine Components &amp; Generator Accessories
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-sky-100">
              Premium industrial parts for diesel engines, power generation, and heavy-duty equipment with unmatched reliability and engineering support.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <RFQButton variant="primary" label="Download Catalogue" compact={false} />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="sticky top-20 z-30 -mt-12 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by product name, part number, category or engine compatibility"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative min-w-[180px]">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as SortValue)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <ProductFilters
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              selectedApplication={selectedApplication}
              selectedAvailability={selectedAvailability}
              onCategoryChange={setSelectedCategory}
              onBrandChange={setSelectedBrand}
              onApplicationChange={setSelectedApplication}
              onAvailabilityChange={setSelectedAvailability}
              onReset={clearFilters}
            />
          </aside>

          <main>
            {filteredProducts.length === 0 ? (
              <EmptyState onReset={clearFilters} />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.aside
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full w-[88%] max-w-[320px] overflow-y-auto bg-white p-5"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">Filters</h3>
                <button type="button" onClick={() => setMobileFiltersOpen(false)} className="rounded-lg p-2 hover:bg-slate-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ProductFilters
                selectedCategory={selectedCategory}
                selectedBrand={selectedBrand}
                selectedApplication={selectedApplication}
                selectedAvailability={selectedAvailability}
                onCategoryChange={(value) => {
                  setSelectedCategory(value);
                  setMobileFiltersOpen(false);
                }}
                onBrandChange={(value) => {
                  setSelectedBrand(value);
                  setMobileFiltersOpen(false);
                }}
                onApplicationChange={(value) => {
                  setSelectedApplication(value);
                  setMobileFiltersOpen(false);
                }}
                onAvailabilityChange={(value) => {
                  setSelectedAvailability(value);
                  setMobileFiltersOpen(false);
                }}
                onReset={() => {
                  clearFilters();
                  setMobileFiltersOpen(false);
                }}
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductFilters({
  selectedCategory,
  selectedBrand,
  selectedApplication,
  selectedAvailability,
  onCategoryChange,
  onBrandChange,
  onApplicationChange,
  onAvailabilityChange,
  onReset,
}: {
  selectedCategory: string;
  selectedBrand: string;
  selectedApplication: string;
  selectedAvailability: string;
  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onApplicationChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onReset: () => void;
}) {
  const filterGroups = [
    {
      title: "Product Category",
      items: ["All", ...categoryOptions],
      value: selectedCategory,
      onChange: onCategoryChange,
    },
    {
      title: "Engine Brand",
      items: ["All", ...brandOptions],
      value: selectedBrand,
      onChange: onBrandChange,
    },
    {
      title: "Application",
      items: ["All", ...Object.keys(PRODUCT_APPLICATIONS)],
      value: selectedApplication,
      onChange: onApplicationChange,
    },
    {
      title: "Availability",
      items: ["All", ...availabilityOptions],
      value: selectedAvailability,
      onChange: onAvailabilityChange,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-800">
          <Filter className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-bold">Filters</h3>
        </div>
        <button type="button" onClick={onReset} className="text-sm font-medium text-sky-700 hover:text-sky-900">
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {filterGroups.map((group) => (
          <div key={group.title}>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">{group.title}</h4>
            <div className="space-y-2">
              {group.items.map((item) => (
                <label key={item} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="radio"
                    name={group.title}
                    checked={group.value === item}
                    onChange={() => group.onChange(item)}
                    className="h-4 w-4 accent-orange-500"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-900">
          {product.category}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          {product.compatibleEngines[0]}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-sky-700">
            {product.sku}
          </div>
          <h3 className="text-xl font-bold text-slate-800">{product.name}</h3>
        </div>

        <p className="text-sm leading-6 text-slate-600">{product.shortDescription}</p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-sm text-slate-600">
          <span>{product.availability}</span>
          <span className="font-medium text-sky-900">{product.compatibleEngines.length} fits</span>
        </div>

        <div className="flex gap-3 pt-2">
          <a
            href={`/products/${product.slug}`}
            className="flex-1 rounded-lg border border-sky-800 px-4 py-2.5 text-center text-sm font-semibold text-sky-800 transition-colors hover:bg-sky-50"
          >
            View Details
          </a>
          <RFQButton variant="primary" label="Quote" compact />
        </div>
      </div>
    </motion.article>
  );
}
