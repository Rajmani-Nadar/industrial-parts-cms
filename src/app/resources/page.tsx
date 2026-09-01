import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Resources",
  description:
    "Technical documentation, product literature, installation support, and engineering knowledge for industrial customers.",
  keywords: [
    "industrial resources",
    "product documentation",
    "technical manuals",
    "engineering support",
  ],
  url: "https://industrial.com/resources",
  type: "website",
  author: "Industrial",
});

const resources = [
  {
    title: "Downloads",
    description: "Product datasheets, manuals, compatibility charts, and certified reference documents.",
    href: "/downloads",
  },
  {
    title: "Technical Blog",
    description: "Maintenance advice, field notes, and application insights from our engineering team.",
    href: "/blog",
  },
  {
    title: "Certifications",
    description: "Quality and compliance credentials for our global industrial supply chain.",
    href: "/certifications",
  },
  {
    title: "Frequently Asked Questions",
    description: "Helpful responses covering product fit, installation, and support workflows.",
    href: "/#faq",
  },
];

export default function ResourcesPage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Resource center
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Support built into every specification.
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Access the reference material, product guides, and technical insight needed to choose, install, and maintain critical industrial components.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                Resource
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
