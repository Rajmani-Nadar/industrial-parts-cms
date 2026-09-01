import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Solutions",
  description:
    "Industrial automation, power systems, and critical infrastructure solutions engineered for performance, uptime, and safety.",
  keywords: [
    "industrial solutions",
    "manufacturing systems",
    "power management",
    "critical infrastructure",
    "industrial maintenance",
  ],
  url: "https://industrial.com/solutions",
  type: "website",
  author: "Industrial",
});

const solutions = [
  {
    title: "Manufacturing",
    description:
      "Smart factory automation, predictive monitoring, and dependable engine support for production uptime.",
  },
  {
    title: "Logistics",
    description:
      "Fleet-ready braking, power, and safety components for transport and mobile operations.",
  },
  {
    title: "Energy",
    description:
      "Generator controls, voltage regulation, and resilient power distribution systems for mission-critical sites.",
  },
  {
    title: "Infrastructure",
    description:
      "Reliable components for water, power, transport, and municipal systems operating under demanding conditions.",
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Engineered solutions
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Built for the harshest industrial environments.
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            From heavy-duty vehicle systems to plant automation and power infrastructure, we design and source components that help teams run safer, longer, and with less downtime.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
            >
              <div className="mb-4 h-11 w-11 rounded-xl bg-orange-100 text-lg font-bold text-orange-600 flex items-center justify-center">
                {solution.title.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{solution.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{solution.description}</p>
              <Link
                href="/industries"
                className="mt-5 inline-flex text-sm font-semibold text-orange-600 transition hover:text-orange-700"
              >
                Explore application
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
