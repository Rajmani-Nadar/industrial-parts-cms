"use client";

import Link from "next/link";
import { ArrowRight, MessageSquareQuote, ShieldCheck, Sparkles } from "lucide-react";
import { RFQForm } from "@/components/rfq/RFQForm";

export function RFQPageContent() {
  return (
    <div className="bg-slate-50 pb-20 pt-24 md:pt-28">
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-slate-900">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-sky-100">
            <Link href="/" className="hover:text-orange-300">Home</Link>
            <span>/</span>
            <span className="font-medium text-white">Request Quote</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-orange-300">B2B quotation support</p>
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Request a Product Quotation
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-sky-100">
                Share your OEM, industrial, or fleet requirements and our team will tailor pricing, compatibility guidance, and delivery timelines for your operation.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: "Fast Response" },
                  { icon: MessageSquareQuote, label: "Technical Review" },
                  { icon: Sparkles, label: "OEM Matching" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sky-50 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-orange-300" />
                    <p className="mt-3 text-sm font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="rounded-[1.5rem] bg-slate-950/40 p-5 text-sky-50">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Quote response target</p>
                <div className="mt-4 flex items-end gap-3">
                  <span className="text-5xl font-black text-white">24h</span>
                  <span className="pb-2 text-base text-sky-200">standard turnaround</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-sky-100">
                  Submit your project details and our team will follow up with commercial options, lead times, and technical recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <RFQForm />
      </section>
    </div>
  );
}
