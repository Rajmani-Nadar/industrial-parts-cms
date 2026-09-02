import { BLOG_ARTICLES } from "@/data/blogs";
import { fetchAPI } from "@/lib/fetchAPI";
import type { BlogArticle, StrapiBlogEntry } from "@/types/blog";

const normalizeBlog = (entry: { id?: number | string; attributes?: StrapiBlogEntry }): BlogArticle | null => {
  const attributes = entry?.attributes as Record<string, unknown> | undefined;
  if (!attributes) return null;

  const authorValue = attributes.author;
  const authorName = typeof authorValue === 'string' && authorValue.trim().length > 0
    ? authorValue
    : 'Industrial Team';

  const coverImage = attributes.coverImage as { url?: string } | null | undefined;
  const publishedDate = attributes.publishedDate as string | undefined;
  const readingTime = attributes.readingTime as number | undefined;

  return {
    slug: (attributes.slug as string | undefined) ?? 'untitled-article',
    title: (attributes.title as string | undefined) ?? 'Untitled Article',
    category: (attributes.category as string | undefined) ?? 'Industry News',
    excerpt: (attributes.excerpt as string | undefined) ?? '',
    image: coverImage?.url ?? '/products/placeholder.jpg',
    author: {
      name: authorName,
      role: 'Editor',
      bio: '',
      avatar: '/products/placeholder.jpg',
    },
    publishedAt: publishedDate ?? new Date().toISOString(),
    readTime: typeof readingTime === 'number' ? `${readingTime} min read` : '5 min read',
    featured: Boolean(attributes.featured),
    tags: [],
    toc: [],
    sections: [],
  };
};

export async function getBlogs(): Promise<BlogArticle[]> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiBlogEntry }> }>("/blogs", {
    populate: ['coverImage'],
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

export async function getLatestBlogs(): Promise<BlogArticle[]> {
  const blogs = await getBlogs();
  return blogs.slice(0, 3);
}

export async function getBlogBySlug(slug: string): Promise<BlogArticle | null> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiBlogEntry }> }>("/blogs", {
    populate: ['coverImage'],
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
