import { BLOG_ARTICLES } from "@/data/blogs";
import { get, getBySlug } from "@/lib/strapi";
import type { BlogArticle } from "@/types/blog";

const normalizeBlog = (article: Partial<BlogArticle>): BlogArticle => ({
  slug: article.slug ?? "",
  title: article.title ?? "Untitled article",
  category: article.category ?? "Industry News",
  excerpt: article.excerpt ?? "",
  image: article.image ?? "/products/placeholder.jpg",
  author: {
    name: article.author?.name ?? "Industrial Team",
    role: article.author?.role ?? "Editor",
    bio: article.author?.bio ?? "",
    avatar: article.author?.avatar ?? "/products/placeholder.jpg",
  },
  publishedAt: article.publishedAt ?? new Date().toISOString(),
  readTime: article.readTime ?? "5 min read",
  featured: article.featured ?? false,
  tags: article.tags ?? [],
  toc: article.toc ?? [],
  sections: article.sections ?? [],
});

export async function getBlogs(): Promise<BlogArticle[]> {
  const response = await get<{ data: Array<{ id: number; attributes: Record<string, unknown> }> }>("/articles", {
    populate: "*",
    sort: ["publishedAt:desc"],
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => {
        const attrs = entry?.attributes as Record<string, unknown> | undefined;
        if (!attrs) return null;
        return normalizeBlog({
          slug: String(attrs.slug ?? ""),
          title: String(attrs.title ?? ""),
          category: String(attrs.category ?? "Industry News"),
          excerpt: String(attrs.excerpt ?? ""),
          image: String(attrs.image ?? "/products/placeholder.jpg"),
          author: {
            name: String((attrs.author as Record<string, unknown> | undefined)?.name ?? "Industrial Team"),
            role: String((attrs.author as Record<string, unknown> | undefined)?.role ?? "Editor"),
            bio: String((attrs.author as Record<string, unknown> | undefined)?.bio ?? ""),
            avatar: String((attrs.author as Record<string, unknown> | undefined)?.avatar ?? "/products/placeholder.jpg"),
          },
          publishedAt: String(attrs.publishedAt ?? new Date().toISOString()),
          readTime: String(attrs.readTime ?? "5 min read"),
          featured: Boolean(attrs.featured),
          tags: Array.isArray(attrs.tags) ? attrs.tags.map((tag) => String(tag)) : [],
          toc: Array.isArray(attrs.toc) ? attrs.toc as BlogArticle["toc"] : [],
          sections: Array.isArray(attrs.sections) ? attrs.sections as BlogArticle["sections"] : [],
        });
      })
      .filter(Boolean) as BlogArticle[];

    if (mapped.length > 0) {
      return mapped;
    }
  }

  return BLOG_ARTICLES;
}

export async function getBlogBySlug(slug: string): Promise<BlogArticle | null> {
  const response = await getBySlug<{ data: Array<{ id: number; attributes: Record<string, unknown> }> }>("/articles", slug, {
    populate: "*",
  });

  if (response?.data && Array.isArray(response.data)) {
    const match = response.data.find((entry) => String((entry?.attributes as Record<string, unknown> | undefined)?.slug ?? "") === slug);
    if (match?.attributes) {
      return normalizeBlog({
        slug: String((match.attributes as Record<string, unknown>).slug ?? slug),
        title: String((match.attributes as Record<string, unknown>).title ?? ""),
        category: String((match.attributes as Record<string, unknown>).category ?? "Industry News"),
        excerpt: String((match.attributes as Record<string, unknown>).excerpt ?? ""),
        image: String((match.attributes as Record<string, unknown>).image ?? "/products/placeholder.jpg"),
        author: {
          name: String(((match.attributes as Record<string, unknown>).author as Record<string, unknown> | undefined)?.name ?? "Industrial Team"),
          role: String(((match.attributes as Record<string, unknown>).author as Record<string, unknown> | undefined)?.role ?? "Editor"),
          bio: String(((match.attributes as Record<string, unknown>).author as Record<string, unknown> | undefined)?.bio ?? ""),
          avatar: String(((match.attributes as Record<string, unknown>).author as Record<string, unknown> | undefined)?.avatar ?? "/products/placeholder.jpg"),
        },
        publishedAt: String((match.attributes as Record<string, unknown>).publishedAt ?? new Date().toISOString()),
        readTime: String((match.attributes as Record<string, unknown>).readTime ?? "5 min read"),
        featured: Boolean((match.attributes as Record<string, unknown>).featured),
        tags: Array.isArray((match.attributes as Record<string, unknown>).tags) ? ((match.attributes as Record<string, unknown>).tags as string[]).map(String) : [],
        toc: Array.isArray((match.attributes as Record<string, unknown>).toc) ? ((match.attributes as Record<string, unknown>).toc as BlogArticle["toc"]) : [],
        sections: Array.isArray((match.attributes as Record<string, unknown>).sections) ? ((match.attributes as Record<string, unknown>).sections as BlogArticle["sections"]) : [],
      });
    }
  }

  return BLOG_ARTICLES.find((article) => article.slug === slug) ?? null;
}

export async function getBlogCategories(): Promise<string[]> {
  const blogs = await getBlogs();
  return [...new Set(blogs.map((article) => article.category))];
}
