import Link from "next/link";
import Image from "next/image";

interface RelatedArticlesProps {
  articles: Array<{
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
  }>;
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Link key={article.slug} href={`/blog/${article.slug}`} className="group flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:border-orange-200 hover:bg-orange-50/40">
          <div className="relative h-20 w-20 overflow-hidden rounded-xl">
            <Image src={article.image} alt={article.title} fill className="object-cover" sizes="80px" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-600">{article.category}</div>
            <h4 className="mt-2 text-sm font-bold text-slate-900 group-hover:text-orange-700">{article.title}</h4>
            <p className="mt-1 text-xs leading-5 text-slate-600">{article.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
