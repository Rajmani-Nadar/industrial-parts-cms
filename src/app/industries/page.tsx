import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Building2, Factory, Gauge, Globe2, MapPinned } from "lucide-react";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { SectionHeading, StatCard } from "@/components/about/Shared";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { getIndustries } from "@/services/industries";

export const metadata: Metadata = generatePageMetadata({
  title: "Industries",
  description: "Explore industrial applications across commercial trucks, diesel generators, marine, mining, construction, agriculture, and power systems.",
  keywords: [
    "industrial industries",
    "commercial trucks components",
    "diesel generator accessories",
    "marine engine parts",
    "construction machinery",
    "agriculture equipment",
  ],
  url: "https://industrial.com/industries",
  type: "website",
  author: "Industrial",
});

const detailSections = [
  {
    title: "Heavy-duty applications require dependable power control.",
    body: "Our products are selected for harsh duty cycles, high load demand, and the operational continuity required by industrial fleets and utilities.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
    categories: ["Engine Braking Systems", "Diesel Engine Spare Parts", "Heavy Duty Components"],
    reverse: false,
  },
  {
    title: "Reliable generation support for critical operations.",
    body: "From backup generators to continuous-load power plants, our accessory and control systems support safe transfer, stable voltage, and stronger uptime.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
    categories: ["Generator Accessories", "AVR Modules", "ATS Controllers"],
    reverse: true,
  },
];

export default async function IndustriesPage() {
  const industries = await getIndustries();
  const mappedIndustries = industries.map((industry) => ({
    title: industry.name,
    description: industry.description,
    image: industry.coverImage,
    products: industry.products.length > 0 ? industry.products : ["Industrial Support", "Critical Components"],
    applications: industry.products.length > 0 ? industry.products : ["Mission-critical operations", "Heavy-duty uptime"],
    href: `/products?category=${encodeURIComponent(industry.slug)}`,
  }));

  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80" alt="Industrial power systems" fill className="object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-sky-900/60" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Application expertise</p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">Industrial solutions for every demanding environment.</h1>
            <p className="mt-6 text-lg text-slate-200">We support critical industrial operations with dependable products, technical expertise, and a broad portfolio built for uptime and performance.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/products" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition hover:bg-orange-400">
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/request-quote" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Industries served"
          title="Components designed around real operating conditions"
          description="Our product range supports mission-critical power and transport environments across multiple sectors."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {mappedIndustries.map((industry) => (
            <IndustryCard key={industry.title} item={industry} />
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          {detailSections.map((section, index) => (
            <div key={section.title} className={`mb-16 grid items-center gap-8 lg:grid-cols-2 ${section.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg">
                <img src={section.image} alt={section.title} className="h-[420px] w-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">Industry focus {index + 1}</p>
                <h3 className="mt-4 text-3xl font-black text-slate-900">{section.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-600">{section.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {section.categories.map((category) => (
                    <span key={category} className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Impact"
          title="Performance across global industrial operations"
          description="Trusted by fleet operators, OEM partners, and mission-critical infrastructure teams."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard value={4200} label="Projects delivered" suffix="+" />
          <StatCard value={35} label="Countries" suffix="+" />
          <StatCard value={500} label="OEM clients" suffix="+" />
          <StatCard value={68000} label="Products installed" suffix="+" />
        </div>
      </section>

      <section className="bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">Need support for your sector?</p>
          <h2 className="mt-6 text-3xl font-black md:text-5xl">Need components for your industry?</h2>
          <p className="mt-4 text-lg text-sky-100">Connect with our engineering support team to find the right industrial solution for your project.</p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="/request-quote" className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
              Request Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
