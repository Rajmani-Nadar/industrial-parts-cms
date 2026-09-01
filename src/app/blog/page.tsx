import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Technical Blog",
  description:
    "Expert articles and field knowledge covering industrial maintenance, power systems, and equipment reliability.",
  keywords: [
    "industrial blog",
    "technical insight",
    "equipment maintenance",
    "power systems",
  ],
  url: "https://industrial.com/blog",
  type: "website",
  author: "Industrial",
});

const posts = [
  {
    title: "Reducing downtime in heavy-duty engine systems",
    summary: "A practical guide to predictive checks, component compatibility, and maintenance planning.",
  },
  {
    title: "Choosing the right generator accessories for critical power loads",
    summary: "How to evaluate compatibility, surge protection, and long-cycle reliability for generator fleets.",
  },
  {
    title: "Best practices for ATS and voltage control reliability",
    summary: "Key design checks, commissioning advice, and signage standards for systems operating in harsh environments.",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Technical blog
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Insights from the field.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                Article
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">{post.title}</h2>
              <p className="mt-3 text-slate-600">{post.summary}</p>
              <Link href="/resources" className="mt-5 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700">
                Explore resources
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
