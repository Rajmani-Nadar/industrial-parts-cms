import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { generatePageMetadata } from "@/lib/seo";
import { getGalleryItems, getGalleryFilters } from "@/services/gallery";

export const metadata: Metadata = generatePageMetadata({
  title: "Industrial Gallery",
  description:
    "Explore our manufacturing facilities, product range, quality testing areas, installation projects, and warehouse operations.",
  keywords: [
    "industrial gallery",
    "warehouse operations",
    "factory tour",
    "quality testing",
    "installation projects",
  ],
  url: "https://industrial.com/gallery",
  type: "website",
  author: "Industrial",
});

export default async function GalleryPage() {
  const [items, filters] = await Promise.all([getGalleryItems(), getGalleryFilters()]);

  return (
    <div className="bg-slate-50 pb-20">
      <GalleryHero />
      <GalleryGrid items={items} filters={filters} />

      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mb-6 text-2xl font-black text-slate-900">Video showcase</div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Factory Tour", description: "A walkthrough of our manufacturing and assembly operations.", duration: "3:42" },
            { title: "Quality Testing", description: "See validation and performance testing in action.", duration: "5:10" },
            { title: "Product Installation", description: "Field installation insights from real site deployments.", duration: "4:18" },
            { title: "Warehouse Logistics", description: "Operational flow for sealing, packaging, and dispatch.", duration: "2:56" },
          ].map((video) => (
            <div key={video.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-orange-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <div className="h-0 w-0 border-y-[10px] border-l-[18px] border-y-transparent border-l-white" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">{video.duration}</div>
                <h3 className="mt-3 text-xl font-bold text-slate-900">{video.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 px-8 py-10 text-center text-white shadow-xl">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">Visit our facility</div>
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">Request a Product Demo</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Explore our facilities, product display floor, and technical demonstration areas with our engineering team.
          </p>
          <a href="/contact" className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-400">
            Book a consultation
          </a>
        </div>
      </section>
    </div>
  );
}
