export interface BlogAuthor {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

export interface BlogTocItem {
  id: string;
  label: string;
}

export interface BlogSection {
  id: string;
  heading: string;
  type: "paragraph" | "list" | "callout" | "tips" | "faq";
  body?: string[];
  items?: string[];
  title?: string;
  content?: string;
  question?: string;
  answer?: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  author: BlogAuthor;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  toc: BlogTocItem[];
  sections: BlogSection[];
}

export interface StrapiMedia {
  id?: number;
  url?: string;
  name?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url?: string };
    small?: { url?: string };
    medium?: { url?: string };
    large?: { url?: string };
  };
}

export interface StrapiBlogEntry {
  id?: number;
  slug?: string;
  title?: string;
  category?: string;
  excerpt?: string;
  image?: StrapiMedia | null;
  author?: {
    name?: string;
    role?: string;
    bio?: string;
    avatar?: StrapiMedia | null;
  };
  publishedAt?: string;
  readTime?: string;
  featured?: boolean;
  tags?: string[];
  content?: Array<{ type?: string; children?: Array<{ text?: string }> }>;
  sections?: BlogSection[];
  toc?: BlogTocItem[];
}
