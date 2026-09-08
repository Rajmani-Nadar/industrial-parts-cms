import { BLOG_ARTICLES } from "@/data/blogs";
import { fetchAPI } from "@/lib/fetchAPI";
import { resolveMediaUrl } from "@/lib/utils";
import type { BlogArticle, BlogSection, StrapiBlogEntry } from "@/types/blog";

function unwrapEntry<T>(value: unknown): T | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  if (record.attributes && typeof record.attributes === "object") {
    return record.attributes as T;
  }
  return value as T;
}

function getMediaUrl(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const record = value as { url?: string; data?: { attributes?: { url?: string } } };
    if (record.url) return record.url;
    if (record.data && typeof record.data === "object" && record.data.attributes?.url) {
      return record.data.attributes.url;
    }
  }
  return undefined;
}

function toPlainText(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value.map((item) => toPlainText(item)).join(" ").replace(/\s+/g, " ").trim();
  }
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.text === "string") return record.text;
    if (Array.isArray(record.children)) return toPlainText(record.children);
    if (Array.isArray(record.content)) return toPlainText(record.content);
    return Object.values(record).map((item) => toPlainText(item)).join(" ").replace(/\s+/g, " ").trim();
  }
  return String(value);
}

function buildSections(content: unknown): BlogSection[] {
  if (!Array.isArray(content)) return [];

  return content
    .map((block) => {
      if (!block || typeof block !== "object") return null;
      const record = block as Record<string, unknown>;
      const type = String(record.type ?? "paragraph");
      const children = Array.isArray(record.children) ? record.children : [];
      const text = toPlainText(children);

      if (type === "heading") {
        return {
          id: `heading-${Math.random().toString(36).slice(2, 8)}`,
          heading: text || "Section",
          type: "paragraph",
          body: text ? [text] : [],
        } as BlogSection;
      }

      if (type === "list") {
        const items = children.map((child) => toPlainText(child)).filter(Boolean);
        return {
          id: `list-${Math.random().toString(36).slice(2, 8)}`,
          heading: "Key points",
          type: "list",
          items,
        } as BlogSection;
      }

      return {
        id: `paragraph-${Math.random().toString(36).slice(2, 8)}`,
        heading: "",
        type: "paragraph",
        body: text ? [text] : [],
      } as BlogSection;
    })
    .filter((item): item is BlogSection => Boolean(item));
}

const normalizeBlog = (entry: { id?: number | string; attributes?: StrapiBlogEntry } | StrapiBlogEntry): BlogArticle | null => {
  const attributes = unwrapEntry<StrapiBlogEntry>(entry);
  if (!attributes) return null;
  const record = attributes as StrapiBlogEntry & Record<string, unknown>;

  const authorValue = record.author as Record<string, unknown> | string | null | undefined;
  const authorName = typeof authorValue === 'string' && authorValue.trim().length > 0
    ? authorValue
    : typeof authorValue === 'object' && authorValue && typeof authorValue.name === 'string'
      ? authorValue.name
      : 'Industrial Team';

  const coverImage = getMediaUrl(record.coverImage ?? record.image);
  const publishedDate = String(record.publishedDate ?? record.publishedAt ?? new Date().toISOString());
  const rawReadingTime = record.readingTime ?? record.readTime;
  const readingTime = typeof rawReadingTime === 'number'
    ? `${rawReadingTime} min read`
    : typeof rawReadingTime === 'string'
      ? rawReadingTime.includes('min') ? rawReadingTime : `${rawReadingTime} min read`
      : '5 min read';
  const authorAvatar = typeof authorValue === 'object' && authorValue && 'avatar' in authorValue ? getMediaUrl((authorValue as { avatar?: unknown }).avatar) : undefined;

  return {
    slug: attributes.slug ?? 'untitled-article',
    title: attributes.title ?? 'Untitled Article',
    category: attributes.category ?? 'Industry News',
    excerpt: attributes.excerpt ?? '',
    image: resolveMediaUrl(coverImage, '/logo.png'),
    author: {
      name: authorName,
      role: typeof authorValue === 'object' && authorValue && typeof authorValue.role === 'string' ? authorValue.role : 'Editor',
      bio: typeof authorValue === 'object' && authorValue && typeof authorValue.bio === 'string' ? authorValue.bio : '',
      avatar: resolveMediaUrl(authorAvatar, '/logo.png'),
    },
    publishedAt: publishedDate,
    readTime: readingTime,
    featured: Boolean(attributes.featured),
    tags: Array.isArray(attributes.tags) ? attributes.tags.map(String) : [],
    toc: [],
    sections: buildSections(record.content),
  };
};

export async function getBlogs(): Promise<BlogArticle[]> {
  const response = await fetchAPI<{ data: Array<StrapiBlogEntry | { id?: number | string; attributes?: StrapiBlogEntry }> } | Array<StrapiBlogEntry>>("/blogs", {
    populate: "*",
  });

  const entries = response ? (Array.isArray(response) ? response : response.data) : [];
  const mapped = entries
    .map((entry) => normalizeBlog(entry as { id?: number | string; attributes?: StrapiBlogEntry } | StrapiBlogEntry))
    .filter((item): item is BlogArticle => Boolean(item));

  if (mapped.length > 0) {
    return mapped;
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
  const response = await fetchAPI<{ data: Array<StrapiBlogEntry | { id?: number | string; attributes?: StrapiBlogEntry }> } | Array<StrapiBlogEntry>>("/blogs", {
    populate: "*",
  });

  const entries = response ? (Array.isArray(response) ? response : response.data) : [];
  const match = entries.find((entry) => {
    const item = unwrapEntry<StrapiBlogEntry>(entry);
    return String(item?.slug ?? "") === slug;
  });
  const normalized = match ? normalizeBlog(match as { id?: number | string; attributes?: StrapiBlogEntry } | StrapiBlogEntry) : null;
  if (normalized) {
    return normalized;
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
