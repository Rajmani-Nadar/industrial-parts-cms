import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  category: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  readTime: string;
  author: string;
  slug: string;
}

export function BlogCard({ title, category, excerpt, image, publishedAt, readTime, author, slug }: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-700">{category}</span>
          <span>{readTime}</span>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>{new Date(publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          <span>by {author}</span>
        </div>

        <h3 className="mt-4 text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{excerpt}</p>

        <Link href={`/blog/${slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700">
          Read More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
