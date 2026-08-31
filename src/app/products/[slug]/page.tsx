import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownToLine, FileText, MessageCircle, Phone, ShieldCheck, Star, Truck, Wrench } from "lucide-react";
import { APPLICATION_CARDS, PRODUCTS } from "@/data/products";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { RFQButton } from "@/components/products/RFQButton";
import { getProductBySlug, getRelatedProducts } from "@/lib/product-utils";

const featureIcons = [ShieldCheck, Wrench, Truck, Star];

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Industrial Components",
      description: "Industrial parts and accessories not found.",
      keywords: ["industrial components", "diesel engine parts", "generator accessories"],
    };
  }

  const keywords = [
    product.category,
    ...product.compatibleEngines,
    "industrial components",
    "diesel engine parts",
    "power generation",
  ];

  return {
    title: `${product.name} | Industrial Components`,
    description: product.shortDescription,
    keywords,
    alternates: { canonical: `https://industrialparts.example/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | Industrial Components`,
      description: product.shortDescription,
      url: `https://industrialparts.example/products/${product.slug}`,
      siteName: "Industrial Components",
      type: "website",
      images: [{ url: product.images[0]?.url ?? "/products/placeholder.jpg", width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Industrial Components`,
      description: product.shortDescription,
      images: [product.images[0]?.url ?? "/products/placeholder.jpg"],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);

  return (
    <div className="bg-slate-50 pb-20 pt-28">
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
            { label: product.name },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 grid gap-3 md:grid-cols-4">
                {product.images.map((image, index) => (
                  <div key={image.id} className={`overflow-hidden rounded-xl border ${index === 0 ? "border-orange-400" : "border-slate-200"}`}>
                    <img src={image.url} alt={image.alt} className="h-24 w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                <img src={product.images[0]?.url ?? "/products/placeholder.jpg"} alt={product.images[0]?.alt ?? product.name} className="h-[480px] w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-800">
                  {product.category}
                </span>
                <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-700">
                  {product.availability}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
              <div className="mt-3 flex items-center gap-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-800">SKU:</span>
                <span>{product.sku}</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {product.compatibleEngines.map((engine) => (
                  <span key={engine} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    {engine}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {product.applications.map((application) => (
                  <span key={application} className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800">
                    {application}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-slate-600">{product.description}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <RFQButton variant="primary" label="Request Quote" />
                <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-900 bg-white px-5 py-3 text-sm font-semibold text-sky-900 transition-colors hover:bg-sky-50">
                  <ArrowDownToLine className="h-4 w-4" />
                  Download Datasheet
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link href="https://wa.me/1234567890?text=Hi%20I%20need%20pricing%20for%20${encodeURIComponent(product.name)}" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-600">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Sales
                </Link>
                <Link href="tel:+1234567890" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  <Phone className="h-4 w-4" />
                  Technical Support
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-sky-950 p-5 text-white shadow-sm">
              <h3 className="text-lg font-bold">Need Pricing?</h3>
              <p className="mt-2 text-sm text-sky-100">Tell us about your equipment and power requirements for a tailored response.</p>
              <div className="mt-5 space-y-3">
                <RFQButton variant="secondary" label="Request Quote" />
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-sky-700 bg-sky-900 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-800">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Sales
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-sky-700 bg-sky-900 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-800">
                  <FileText className="h-4 w-4" />
                  Download Catalogue
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-sky-700 bg-sky-900 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-800">
                  <Phone className="h-4 w-4" />
                  Call Technical Support
                </button>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Product Features</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {product.features.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <div key={feature} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 inline-flex rounded-lg bg-orange-100 p-2 text-orange-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-slate-800">{feature}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Technical Specifications</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm text-slate-700">
              <tbody>
                {product.specifications.map((spec) => (
                  <tr key={spec.label} className="border-b border-slate-200 last:border-b-0">
                    <th className="bg-slate-50 px-5 py-4 font-semibold text-slate-800">{spec.label}</th>
                    <td className="px-5 py-4">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Product Downloads</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {product.downloads.map((download) => (
              <a key={download.name} href={download.url} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-orange-400 hover:bg-orange-50">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm">
                  <FileText className="h-5 w-5" />
                </div>
                <p className="text-base font-semibold text-slate-800">{download.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{download.type}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">Industries and Applications</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {APPLICATION_CARDS.map((application) => (
              <div key={application.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img src={application.image} alt={application.name} className="h-44 w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-800">{application.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{application.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">Related Products</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link key={item.slug} href={`/products/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="overflow-hidden rounded-xl">
                  <img src={item.images[0]?.url ?? "/products/placeholder.jpg"} alt={item.images[0]?.alt ?? item.name} className="h-36 w-full object-cover" loading="lazy" />
                </div>
                <div className="mt-4">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-700">{item.category}</div>
                  <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
