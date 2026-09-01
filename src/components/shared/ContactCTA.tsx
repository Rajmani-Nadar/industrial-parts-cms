import Link from "next/link";
import { ArrowRight, MessageSquareText, Phone } from "lucide-react";

export function ContactCTA({
  title = "Need a tailored industrial solution?",
  description = "Speak with our engineering team about pricing, compatibility and product sourcing.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Industrial partnership</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">{title}</h2>
            <p className="mt-4 text-base text-sky-100 md:text-lg">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200"
            >
              <Phone className="h-4 w-4" />
              Contact Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
