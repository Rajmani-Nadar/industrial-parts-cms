"use client";

import { useMemo, useState } from "react";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { FeaturedBlog } from "@/components/blog/FeaturedBlog";
import { BLOG_ARTICLES, blogCategories } from "@/data/blogs";

const PAGE_SIZE = 6;

export function BlogPageContent() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const matchesSearch =
        !normalized ||
        article.title.toLowerCase().includes(normalized) ||
        article.excerpt.toLowerCase().includes(normalized) ||
        article.tags.some((tag) => tag.toLowerCase().includes(normalized));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const featuredArticle = BLOG_ARTICLES.find((article) => article.featured) ?? BLOG_ARTICLES[0];
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));

  const paginatedArticles = filteredArticles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const categories = ["All", ...blogCategories];

  return (
    <div className="bg-slate-50 pb-20">
      <BlogHero
        featuredTitle={featuredArticle.title}
        featuredExcerpt={featuredArticle.excerpt}
        featuredImage={featuredArticle.image}
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setPage(1);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === category
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:text-orange-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <FeaturedBlog
          title={featuredArticle.title}
          excerpt={featuredArticle.excerpt}
          image={featuredArticle.image}
          category={featuredArticle.category}
          publishedAt={featuredArticle.publishedAt}
          readTime={featuredArticle.readTime}
          author={featuredArticle.author.name}
          slug={featuredArticle.slug}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 text-2xl font-black text-slate-900">Latest articles</div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {paginatedArticles.map((article) => (
            <BlogCard
              key={article.slug}
              title={article.title}
              category={article.category}
              excerpt={article.excerpt}
              image={article.image}
              publishedAt={article.publishedAt}
              readTime={article.readTime}
              author={article.author.name}
              slug={article.slug}
            />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            No articles match your current search or category filter.
          </div>
        )}

        {filteredArticles.length > PAGE_SIZE && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-700">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
