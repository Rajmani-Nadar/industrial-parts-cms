"use client";

import Link from "next/link";
import { ArrowRight, Building2, Clock3, Mail, MapPin, MessageSquareText, Phone, ShieldAlert, Warehouse } from "lucide-react";
import { motion } from "framer-motion";
import type { ContactInfoBlock, ContactMethod } from "@/types/contact";

const contactMethods: ContactMethod[] = [
  {
    title: "Sales Enquiries",
    description: "Pricing, product sourcing and OEM supply coordination.",
    email: "sales@industrialcomponents.com",
    phone: "+1 (415) 555-0142",
    hours: "Mon–Fri · 08:00–18:00 PST",
    icon: "sales",
  },
  {
    title: "Technical Support",
    description: "Application guidance, compatibility checks and product support.",
    email: "support@industrialcomponents.com",
    phone: "+1 (415) 555-0188",
    hours: "Mon–Sat · 07:00–20:00 PST",
    icon: "support",
  },
  {
    title: "Spare Parts Team",
    description: "Urgent component replacements and maintenance scheduling.",
    email: "parts@industrialcomponents.com",
    phone: "+1 (415) 555-0134",
    hours: "24/7 for critical operations",
    icon: "parts",
  },
  {
    title: "International Business",
    description: "Cross-border procurement and multi-region service coordination.",
    email: "global@industrialcomponents.com",
    phone: "+1 (415) 555-0125",
    hours: "Mon–Fri · 08:00–17:00 GMT+8",
    icon: "global",
  },
];

const infoBlocks: ContactInfoBlock[] = [
  { label: "Office Address", value: "2400 Harbor Avenue, Suite 310, Oakland, CA 94607", hint: "Engineering warehouse and support hub" },
  { label: "Phone", value: "+1 (415) 555-0142", hint: "Sales and RFQ coordination" },
  { label: "Email", value: "sales@industrialcomponents.com", hint: "Fast response within one business day" },
  { label: "Business Hours", value: "Mon–Fri: 08:00–18:00 PST", hint: "Extended support for critical calls" },
];

const getIcon = (icon: ContactMethod["icon"]) => {
  switch (icon) {
    case "sales":
      return <Building2 className="h-6 w-6" />;
    case "support":
      return <MessageSquareText className="h-6 w-6" />;
    case "parts":
      return <Warehouse className="h-6 w-6" />;
    default:
      return <GlobeIcon className="h-6 w-6" />;
  }
};

function GlobeIcon({ className }: { className?: string }) {
  return <span className={className}>🌍</span>;
}

export function ContactPageContent() {
  return (
    <div className="bg-slate-50 pb-20 pt-24 md:pt-28">
      <section className="relative overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-sky-900/70" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-slate-200">
            <Link href="/" className="hover:text-orange-300">Home</Link>
            <span>/</span>
            <span className="font-medium text-white">Contact</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-orange-300">Contact our engineering team</p>
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Contact Our Engineering Team
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
                Connect with our sales specialists and technical engineers for system support, sourcing advice, and rapid commercial response on critical industrial requirements.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-orange-300">
                <ShieldAlert className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">Emergency support</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                For critical production disruption or asset downtime, contact the spare parts desk immediately for rapid dispatch prioritization.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {contactMethods.map((method, index) => (
            <motion.article
              key={method.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 inline-flex rounded-2xl bg-orange-50 p-3 text-orange-600">{getIcon(method.icon)}</div>
              <h2 className="text-xl font-bold text-slate-900">{method.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{method.description}</p>

              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-sky-700" />
                  <a href={`mailto:${method.email}`} className="hover:text-orange-600">{method.email}</a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-sky-700" />
                  <a href={`tel:${method.phone.replace(/\s+/g, "")}`} className="hover:text-orange-600">{method.phone}</a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-4 w-4 text-sky-700" />
                  <span>{method.hours}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Contact Information</h2>
            <div className="mt-6 space-y-5">
              {infoBlocks.map((block) => (
                <div key={block.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-3 text-sky-800">
                    {block.label === "Office Address" ? <MapPin className="h-4 w-4" /> : block.label === "Phone" ? <Phone className="h-4 w-4" /> : block.label === "Email" ? <Mail className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                    <span className="text-xs font-semibold uppercase tracking-[0.18em]">{block.label}</span>
                  </div>
                  <p className="text-base font-semibold text-slate-900">{block.value}</p>
                  {block.hint && <p className="mt-1 text-sm text-slate-600">{block.hint}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-950 via-sky-900 to-slate-900 p-6 text-white shadow-sm">
            <div className="flex items-center gap-3 text-orange-300">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">Visit our facility</span>
            </div>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="flex h-[240px] items-center justify-center rounded-2xl border border-dashed border-white/20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_rgba(255,255,255,0.03)_30%,_rgba(15,23,42,0.1)_70%)]">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-orange-300" />
                  <p className="mt-4 text-lg font-semibold">Map placeholder</p>
                  <p className="mt-2 text-sm text-slate-300">This section is ready for a future embedded location map.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 p-8 text-white shadow-2xl md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Need Immediate Assistance?</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">Need Immediate Assistance?</h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/request-quote" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300">
                Request Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://wa.me/14155550142?text=Hi%2C%20I%20need%20technical%20support%20for%20an%20industrial%20equipment%20issue." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200">
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
