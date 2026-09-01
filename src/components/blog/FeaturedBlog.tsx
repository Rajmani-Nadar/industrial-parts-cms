import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface FeaturedBlogProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: string;
  slug: string;
}

export function FeaturedBlog({ title, excerpt, image, category, publishedAt, readTime, author, slug }: FeaturedBlogProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative h-80 overflow-hidden rounded-3xl">
          <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-700">{category}</span>
            <span>{readTime}</span>
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900">{title}</h2>
          <div className="mt-3 text-sm text-slate-500">
            {new Date(publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} • by {author}
          </div>
          <p className="mt-4 text-base leading-7 text-slate-600">{excerpt}</p>
          <Link href={`/blog/${slug}`} className="mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
            Read article <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
