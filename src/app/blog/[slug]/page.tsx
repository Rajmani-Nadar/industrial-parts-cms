import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, Share2 } from "lucide-react";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { BLOG_ARTICLES, getBlogArticleBySlug } from "@/data/blogs";
import { generatePageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return generatePageMetadata({
      title: "Article Not Found",
      description: "The requested technical article could not be found.",
      url: "https://industrial.com/blog",
      type: "article",
    });
  }

  return generatePageMetadata({
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    image: article.image,
    url: `https://industrial.com/blog/${article.slug}`,
    type: "article",
    author: article.author.name,
    published: article.publishedAt,
    updated: article.publishedAt,
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = BLOG_ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <div className="bg-slate-50 pb-20 pt-8">
        <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-3 text-sm text-slate-600">
            <Link href="/blog" className="inline-flex items-center gap-2 font-medium text-orange-600 hover:text-orange-700">
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-[420px] w-full">
              <Image src={article.image} alt={article.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 1200px" />
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-700">{article.category}</span>
                <span className="inline-flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5" /> {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" /> {article.readTime}</span>
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">{article.title}</h1>

              <div className="mt-6 flex items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-slate-200">
                    <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{article.author.name}</div>
                    <div className="text-sm text-slate-500">{article.author.role}</div>
                  </div>
                </div>

                <button type="button" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-orange-200 hover:text-orange-700">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)_280px]">
            <aside className="lg:sticky lg:top-24 self-start">
              <TableOfContents items={article.toc} />
            </aside>

            <article className="space-y-8">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  {section.heading && <h2 className="text-2xl font-bold text-slate-900">{section.heading}</h2>}

                  {section.type === "paragraph" && section.body?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-base leading-8 text-slate-700">{paragraph}</p>
                  ))}

                  {section.type === "list" && (
                    <ul className="mt-4 space-y-3 text-base leading-7 text-slate-700">
                      {section.items?.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-orange-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.type === "callout" && (
                    <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">{section.title}</div>
                      <p className="mt-2 text-base leading-7 text-slate-700">{section.content}</p>
                    </div>
                  )}

                  {section.type === "tips" && (
                    <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{section.title}</div>
                      <p className="mt-2 text-base leading-7 text-slate-700">{section.content}</p>
                    </div>
                  )}

                  {section.type === "faq" && (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-lg font-bold text-slate-900">{section.question}</div>
                      <p className="mt-2 text-base leading-7 text-slate-700">{section.answer}</p>
                    </div>
                  )}
                </section>
              ))}
            </article>

            <aside className="lg:sticky lg:top-24 self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Trending</div>
                <RelatedArticles articles={relatedArticles.map((related) => ({
                  slug: related.slug,
                  title: related.title,
                  excerpt: related.excerpt,
                  image: related.image,
                  category: related.category,
                }))} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
