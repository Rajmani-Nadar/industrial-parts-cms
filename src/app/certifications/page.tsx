import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownToLine, BadgeCheck, ShieldCheck, Sparkles, Wrench, Award, FileText, Factory } from "lucide-react";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/about/Shared";
import { CertificationCard } from "@/components/certifications/CertificationCard";

export const metadata: Metadata = generatePageMetadata({
  title: "Certifications",
  description: "See our ISO and quality assurance standards, testing process, and product certification support.",
  keywords: [
    "ISO certification",
    "quality assurance",
    "industrial testing",
    "OEM compatibility",
    "quality policy",
    "product catalogue",
  ],
  url: "https://industrial.com/certifications",
  type: "website",
  author: "Industrial",
});

const standards = [
  {
    title: "ISO 9001",
    description: "Quality management systems designed for consistent manufacturing discipline and process control.",
    icon: "iso",
  },
  {
    title: "OEM Compatible",
    description: "Engineering and tolerances aligned with major OEM specifications for dependable interchangeability.",
    icon: "oem",
  },
  {
    title: "Quality Tested",
    description: "Each product category is evaluated against operating stress, durability, and safety criteria.",
    icon: "tested",
  },
  {
    title: "Heavy Duty Performance",
    description: "Components constructed for extended operation in severe-duty industrial and power systems.",
    icon: "warranty",
  },
  {
    title: "Warranty Support",
    description: "Clear post-sale coverage and support for site reliability and maintenance planning.",
    icon: "quality",
  },
];

const testingSteps = [
  "Incoming Material Inspection",
  "Precision Manufacturing",
  "Performance Testing",
  "Quality Verification",
  "Packaging Inspection",
  "Dispatch Approval",
];

const whyQualityMatters = [
  {
    title: "Safer operations",
    description: "Validated components reduce failure risk and strengthen operational safety in critical industrial systems.",
  },
  {
    title: "Lower downtime",
    description: "Quality control and traceability help reduce unplanned maintenance and equipment interruptions.",
  },
  {
    title: "Long-term reliability",
    description: "Consistent standards support product lifecycle performance across harsh and heavy-duty environments.",
  },
];

const downloads = [
  { title: "ISO Certificate", type: "PDF", icon: "download" },
  { title: "Product Catalogue", type: "PDF", icon: "download" },
  { title: "Quality Policy", type: "PDF", icon: "download" },
  { title: "Testing Report", type: "PDF", icon: "download" },
];

const warrantyCards = [
  { title: "12-Month Coverage", description: "Standard warranty support across major industrial component lines." },
  { title: "Technical Assistance", description: "Dedicated engineering help for installation, troubleshooting, and compatibility checks." },
  { title: "Support Timeline", description: "Maintenance planning and issue resolution with team-based follow-up throughout the warranty period." },
];

export default function CertificationsPage() {
  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80" alt="Factory quality assurance" fill className="object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-sky-900/60" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Certifications" }]} />
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Quality assurance</p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">Quality standards that support reliability.</h1>
            <p className="mt-6 text-lg text-slate-200">Our certifications, testing protocols, and warranty support reflect a disciplined approach to industrial product performance.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Quality standards"
          title="Built around disciplined performance controls"
          description="Every product line is aligned with manufacturing quality, documentation, and support standards."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {standards.map((item) => (
            <CertificationCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Testing process"
            title="A structured quality journey"
            description="From incoming inspection to dispatch approval, every step is designed to protect product reliability."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testingSteps.map((step, index) => (
              <div key={step} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Why it matters"
          title="Quality is part of product performance"
          description="The right standards reduce operational risk and increase confidence across critical industrial systems."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {whyQualityMatters.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Downloads"
            title="Documentation and support materials"
            description="Access the standard documentation supporting our operational and quality commitments."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {downloads.map((file) => (
              <a
                key={file.title}
                href="#"
                className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-orange-300 hover:bg-white"
              >
                <div>
                  <div className="text-lg font-bold text-slate-900">{file.title}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{file.type}</div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <ArrowDownToLine className="h-5 w-5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Warranty"
          title="Support that extends beyond delivery"
          description="We provide continued support for product fit, installation guidance, and maintenance confidence."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {warrantyCards.map((card) => (
            <div key={card.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
