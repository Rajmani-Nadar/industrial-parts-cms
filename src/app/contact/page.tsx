import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Speak with our engineering and sales team about industrial components, system support, and custom sourcing projects.",
  keywords: [
    "industrial contact",
    "sales support",
    "engineering team",
    "customer service",
  ],
  url: "https://industrial.com/contact",
  type: "website",
  author: "Industrial",
});

export default function ContactPage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
              Contact our team
            </p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Let’s talk about your next industrial project.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Whether you need component sourcing, specification guidance, or engineering assistance, our team is ready to help move your operation forward.
            </p>

            <div className="mt-8 space-y-4 text-slate-700">
              <p><strong>Email:</strong> hello@industrial.com</p>
              <p><strong>Phone:</strong> +1 (234) 567-890</p>
              <p><strong>Location:</strong> San Francisco, CA</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                <input className="w-full rounded-xl border border-slate-200 px-3 py-2.5" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input className="w-full rounded-xl border border-slate-200 px-3 py-2.5" placeholder="you@company.com" type="email" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Project details</label>
                <textarea className="w-full rounded-xl border border-slate-200 px-3 py-2.5" rows={5} placeholder="Tell us about your requirements" />
              </div>
              <button type="submit" className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600">
                Send inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
