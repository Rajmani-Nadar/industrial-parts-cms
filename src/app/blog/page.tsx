import type { Metadata } from "next";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Industrial Insights & Technical Resources",
  description:
    "Read field-tested technical guidance covering engine braking, generator systems, ATS controllers, installation strategy, and maintenance best practices.",
  keywords: [
    "industrial blog",
    "technical resources",
    "industrial maintenance",
    "engine braking",
    "generator accessories",
    "ATS controllers",
  ],
  url: "https://industrial.com/blog",
  type: "website",
  author: "Industrial",
});

export default function BlogPage() {
  return <BlogPageContent />;
}
