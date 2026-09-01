import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { generatePageMetadata } from "@/lib/seo";
import { getCompanySettings } from "@/services/company";

export const metadata: Metadata = generatePageMetadata({
  title: "About",
  description:
    "Learn about our industrial manufacturing heritage, engineering expertise, and global support for industrial diesel and power systems.",
  keywords: [
    "industrial company",
    "engineering support",
    "diesel engine components",
    "generator accessories",
    "ATS controllers",
    "industrial manufacturing",
  ],
  url: "https://industrial.com/about",
  type: "website",
  author: "Industrial",
});

export default async function AboutPage() {
  const company = await getCompanySettings();
  return <AboutPageContent company={company} />;
}
