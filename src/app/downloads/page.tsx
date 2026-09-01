import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Downloads",
  description:
    "Download product datasheets, installation guidance, and technical documentation for industrial components.",
  keywords: [
    "industrial downloads",
    "datasheets",
    "technical manuals",
    "product documentation",
  ],
  url: "https://industrial.com/downloads",
  type: "website",
  author: "Industrial",
});

const files = [
  { name: "Engine Braking System Datasheet", type: "PDF", url: "/products?category=engine-braking-systems" },
  { name: "Bleeder Brakes Installation Guide", type: "Manual", url: "/products?category=bleeder-brakes" },
  { name: "Generator Accessories Catalogue", type: "Catalogue", url: "/products?category=generator-accessories" },
  { name: "ATS Controller Specification Sheet", type: "PDF", url: "/products?category=ats-controllers" },
  { name: "AVR Module Technical Notes", type: "Notes", url: "/products?category=avr-modules" },
  { name: "Heavy Duty Components Overview", type: "Overview", url: "/products?category=heavy-duty-components" },
];

export default function DownloadsPage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Downloads
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Technical documentation at your fingertips.
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Browse the focused documentation and reference materials your team needs to specify, install, and operate industrial equipment with confidence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {files.map((file) => (
            <Link
              key={file.name}
              href={file.url}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
            >
              <span className="inline-flex rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                {file.type}
              </span>
              <h2 className="mt-4 text-lg font-bold text-slate-900">{file.name}</h2>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
