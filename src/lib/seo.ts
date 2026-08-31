/**
 * SEO and Metadata Utilities
 */

import { Metadata } from "next";

interface PageMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  published?: string;
  updated?: string;
}

export function generatePageMetadata(props: PageMetadataProps): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = "https://industrial.com/og-image.jpg",
    url = "https://industrial.com",
    type = "website",
    author,
    published,
    updated,
  } = props;

  return {
    title,
    description,
    keywords,
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      type,
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      siteName: "Industrial",
      publishedTime: published,
      modifiedTime: updated,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Generate JSON-LD structured data for SEO
 */
export function generateStructuredData(
  type: "Organization" | "BreadcrumbList" | "FAQPage" | "Product",
  data: Record<string, unknown>
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbs(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
