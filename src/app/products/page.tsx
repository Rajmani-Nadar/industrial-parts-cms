"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { RFQButton } from "@/components/products/RFQButton";
import { EmptyState } from "@/components/products/EmptyState";
import { getCategories as getCmsCategories } from "@/services/categories";
import type { Product } from "@/types/product";
import { filterProducts, getAvailabilityOptions } from "@/lib/product-utils";
import { getStrapiMediaUrl } from "@/lib/strapi-image";

type CategoryOption = { slug: string; name: string };

export default function ProductsPage({ initialProducts = [] }: { initialProducts?: Product[] }) {
  return (
    <Suspense fallback={<ProductsPageFallback />}>
      <ProductsPageContent initialProducts={initialProducts} />
    </Suspense>
  );
}

function ProductsPageFallback() {
  return (
    <div className="bg-slate-50 pb-16 pt-28">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="h-60 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "name", label: "Product Name" },
  { value: "category", label: "Category" },
  { value: "brand", label: "Engine Brand" },
  { value: "application", label: "Application" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

const slugifyCategory = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function ProductsPageContent({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [productCatalog, setProductCatalog] = useState<Product[]>(initialProducts);
  const [cmsCategories, setCmsCategories] = useState<CategoryOption[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [sortBy, setSortBy] = useState<SortValue>("newest");
  const [isQueryInitialized, setIsQueryInitialized] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const categoryOptions = useMemo(
    () => cmsCategories.length > 0
      ? cmsCategories
      : [...new Set(productCatalog.map((product) => ({ slug: product.categorySlug ?? slugifyCategory(product.category), name: product.category })))],
    [cmsCategories, productCatalog],
  );
  const brandOptions = useMemo(() => ["All", ...new Set(productCatalog.map((product) => product.brand))], [productCatalog]);
  const applicationOptions = useMemo(() => ["All", ...new Set(productCatalog.flatMap((product) => product.applications))], [productCatalog]);
  const availabilityOptions = useMemo(() => ["All", ...getAvailabilityOptions()], [productCatalog]);

  useEffect(() => {
    queueMicrotask(() => {
      setSearch(searchParams.get("q") ?? "");
      setSelectedCategory(searchParams.get("category") ?? "All");
      setSelectedBrand(searchParams.get("brand") ?? "All");
      setSelectedApplication(searchParams.get("application") ?? "All");
      setSelectedAvailability(searchParams.get("availability") ?? "All");
      setSortBy((searchParams.get("sort") as SortValue) ?? "newest");
      setIsQueryInitialized(true);
    });
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      const [{ getProducts }, categories] = await Promise.all([
        import("@/services/products"),
        getCmsCategories(),
      ]);
      const products = await getProducts();
      if (isMounted) {
        setProductCatalog(products);
        const categoryOptions = categories.map((category) => ({ slug: category.slug, name: category.name }));
        setCmsCategories(categoryOptions);
      }
    };

    if (initialProducts.length === 0) {
      loadProducts();
    }

    return () => {
      isMounted = false;
    };
  }, [initialProducts]);

  useEffect(() => {
    if (!isQueryInitialized) return;

    const params = new URLSearchParams();
    if (search) params.set("q", search.trim());
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (selectedBrand !== "All") params.set("brand", selectedBrand);
    if (selectedApplication !== "All") params.set("application", selectedApplication);
    if (selectedAvailability !== "All") params.set("availability", selectedAvailability);
    if (sortBy !== "newest") params.set("sort", sortBy);

    const next = params.toString();
    router.replace(next ? `?${next}` : "", { scroll: false });
  }, [isQueryInitialized, router, search, selectedCategory, selectedBrand, selectedApplication, selectedAvailability, sortBy]);

  const filteredProducts = useMemo(
    () =>
      filterProducts(
        {
          search,
          category: selectedCategory,
          brand: selectedBrand,
          application: selectedApplication,
          availability: selectedAvailability,
          sort: sortBy,
        },
        productCatalog,
      ),
    [productCatalog, search, selectedCategory, selectedBrand, selectedApplication, selectedAvailability, sortBy],
  );

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedApplication("All");
    setSelectedAvailability("All");
    setSortBy("newest");
  };

  return (
    <div className="bg-slate-50 pb-16 pt-24 md:pt-28">
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
        <div className="sticky top-16 z-20 -mt-12 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-md md:top-20">
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
              categoryOptions={categoryOptions}
              brandOptions={brandOptions}
              applicationOptions={applicationOptions}
              availabilityOptions={availabilityOptions}
            />
          </aside>

          <main>
            {filteredProducts.length === 0 ? (
              <EmptyState onReset={clearFilters} />
            ) : (
              <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
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
                categoryOptions={categoryOptions}
                brandOptions={brandOptions}
                applicationOptions={applicationOptions}
                availabilityOptions={availabilityOptions}
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
  categoryOptions,
  brandOptions,
  applicationOptions,
  availabilityOptions,
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
  categoryOptions: readonly CategoryOption[];
  brandOptions: readonly string[];
  applicationOptions: readonly string[];
  availabilityOptions: readonly string[];
}) {
  const filterGroups: Array<{ title: string; items: Array<{ value: string; label: string }>; value: string; onChange: (value: string) => void }> = [
    {
      title: "Product Category",
      items: [{ value: "All", label: "All" }, ...categoryOptions
        .filter((item, index, all) => all.findIndex((candidate) => candidate.slug === item.slug) === index)
        .map((item) => ({ value: item.slug, label: item.name }))],
      value: selectedCategory,
      onChange: onCategoryChange,
    },
    {
      title: "Engine Brand",
      items: [...new Set(["All", ...brandOptions])].map((item) => ({ value: item, label: item })),
      value: selectedBrand,
      onChange: onBrandChange,
    },
    {
      title: "Application",
      items: [...new Set(["All", ...applicationOptions])].map((item) => ({ value: item, label: item })),
      value: selectedApplication,
      onChange: onApplicationChange,
    },
    {
      title: "Availability",
      items: [...new Set(["All", ...availabilityOptions])].map((item) => ({ value: item, label: item })),
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
                {group.items.map((item, index) => (
                <label key={`${group.title}-${item.value}-${index}`} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="radio"
                    name={group.title}
                    checked={group.value === item.value}
                    onChange={() => group.onChange(item.value)}
                    className="h-4 w-4 accent-orange-500"
                  />
                  <span>{item.label}</span>
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
      className="group flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={getStrapiMediaUrl(product.images[0]?.url, "/logo.png")}
          alt={product.images[0]?.alt ?? product.name}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-x-3 top-3 flex flex-wrap items-center gap-2">
          <span className="max-w-[60%] truncate rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-900 shadow-sm">
            {product.category}
          </span>
          <span className="ml-auto max-w-[45%] truncate rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
            {product.compatibleEngines[0]}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-sky-700">
            {product.sku}
          </div>
          <h3 className="text-xl font-bold text-slate-800">{product.name}</h3>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">{product.shortDescription}</p>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm text-slate-600">
          <span>{product.availability}</span>
          <span className="font-medium text-sky-900">{product.compatibleEngines.length} fits</span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
          <a
            href={`/products/${product.slug}`}
            className="flex h-12 items-center justify-center rounded-lg border border-sky-800 px-3 text-center text-sm font-semibold text-sky-800 transition-colors hover:bg-sky-50"
          >
            View Details
          </a>
          <RFQButton
            variant="primary"
            label="Quote"
            compact
            className="h-12 w-full"
          />
        </div>
      </div>
    </motion.article>
  );
}
