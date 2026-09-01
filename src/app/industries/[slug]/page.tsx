import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, Factory, Globe2, MapPinned } from "lucide-react";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { getIndustryBySlug } from "@/services/industries";
import { getProducts } from "@/services/products";

export async function generateStaticParams() {
  const industries = await import("@/services/industries").then(({ getIndustries }) => getIndustries());
  const items = await industries;
  return items.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  if (!industry) {
    return generatePageMetadata({
      title: "Industry Not Found",
      description: "The requested industry could not be found.",
      url: "https://industrial.com/industries",
      type: "website",
    });
  }

  return generatePageMetadata({
    title: `${industry.name} | Industrial Solutions`,
    description: industry.description,
    keywords: [industry.name, "industrial solutions", industry.slug],
    image: industry.coverImage,
    url: `https://industrial.com/industries/${industry.slug}`,
    type: "website",
  });
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const products = await getProducts();
  const relatedProducts = products
    .filter((product) => {
      const categoryMatch = product.category.toLowerCase() === industry.name.toLowerCase() || product.category.toLowerCase().includes(industry.slug.toLowerCase().replace(/-/g, " "));
      const applicationMatch = product.applications.some((application) => application.toLowerCase().includes(industry.name.toLowerCase().split(" ")[0] || ""));
      return categoryMatch || applicationMatch;
    })
    .slice(0, 4);

  const fallbackProducts = industry.products.length > 0 ? industry.products.slice(0, 3) : ["Engine Systems", "Spare Parts", "Industrial Support"];

  return (
    <div className="bg-slate-50 pb-20 pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: industry.name }]} />

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[360px]">
              <Image src={industry.coverImage || "/products/placeholder.jpg"} alt={industry.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 56vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 to-slate-900/20" />
              <div className="absolute inset-0 p-8 md:p-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                  <Building2 className="h-3.5 w-3.5" /> Industry focus
                </div>
                <h1 className="mt-6 max-w-xl text-3xl font-black tracking-tight text-white md:text-5xl">{industry.name}</h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">{industry.description}</p>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="space-y-5">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="rounded-xl bg-orange-100 p-2 text-orange-600"><Factory className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Core products</div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">{fallbackProducts.join(" • ")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="rounded-xl bg-sky-100 p-2 text-sky-700"><MapPinned className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Operational coverage</div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">Transport, power generation, heavy-duty infrastructure</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700"><Globe2 className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Application fit</div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">Mission-critical support across global industrial operations</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400">
                  Explore related products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/request-quote" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Request a quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6 text-2xl font-black text-slate-900">Related products</div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="relative h-44 overflow-hidden">
                    <img src={product.images[0]?.url ?? "/products/placeholder.jpg"} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-700">{product.category}</div>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">{product.name}</h3>
                    <p className="mt-2 text-sm text-slate-600">{product.shortDescription}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                No related products are currently available for this industry.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
