import { BLOG_ARTICLES } from "@/data/blogs";
import { fetchAPI } from "@/lib/fetchAPI";
import type { BlogArticle, StrapiBlogEntry } from "@/types/blog";

const normalizeBlog = (entry: { id?: number | string; attributes?: StrapiBlogEntry }): BlogArticle | null => {
  const attributes = entry?.attributes;
  if (!attributes) return null;

  return {
    slug: attributes.slug ?? "untitled-article",
    title: attributes.title ?? "Untitled Article",
    category: attributes.category ?? "Industry News",
    excerpt: attributes.excerpt ?? "",
    image: attributes.image?.url ?? "/products/placeholder.jpg",
    author: {
      name: attributes.author?.name ?? "Industrial Team",
      role: attributes.author?.role ?? "Editor",
      bio: attributes.author?.bio ?? "",
      avatar: attributes.author?.avatar?.url ?? "/products/placeholder.jpg",
    },
    publishedAt: attributes.publishedAt ?? new Date().toISOString(),
    readTime: attributes.readTime ?? "5 min read",
    featured: attributes.featured ?? false,
    tags: Array.isArray(attributes.tags) ? attributes.tags.map(String) : [],
    toc: Array.isArray(attributes.toc) ? attributes.toc : [],
    sections: Array.isArray(attributes.sections) ? attributes.sections : [],
  };
};

export async function getBlogs(): Promise<BlogArticle[]> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiBlogEntry }> }>("/articles", {
    populate: ["coverImage", "author.avatar"],
    sort: ["publishedAt:desc", "publishedDate:desc"],
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => normalizeBlog(entry))
      .filter((item): item is BlogArticle => Boolean(item));

    if (mapped.length > 0) {
      return mapped;
    }
  }

  return BLOG_ARTICLES;
}

export async function getFeaturedBlogs(): Promise<BlogArticle[]> {
  const blogs = await getBlogs();
  return blogs.filter((blog) => blog.featured).slice(0, 3);
}

export async function getBlogBySlug(slug: string): Promise<BlogArticle | null> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiBlogEntry }> }>("/articles", {
    populate: ["coverImage", "author.avatar"],
    filters: { slug },
  });

  if (response?.data && Array.isArray(response.data)) {
    const match = response.data.find((entry) => String(entry?.attributes?.slug ?? "") === slug);
    const normalized = match ? normalizeBlog(match) : null;
    if (normalized) {
      return normalized;
    }
  }

  return BLOG_ARTICLES.find((article) => article.slug === slug) ?? null;
}

export async function getRelatedBlogs(slug: string): Promise<BlogArticle[]> {
  const blogs = await getBlogs();
  return blogs.filter((blog) => blog.slug !== slug).slice(0, 3);
}

export async function getBlogCategories(): Promise<string[]> {
  const blogs = await getBlogs();
  return [...new Set(blogs.map((article) => article.category))];
}
