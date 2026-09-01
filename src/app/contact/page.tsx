import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { generateBreadcrumbs, generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Our Engineering Team",
  description:
    "Speak with our industrial sales and engineering team for pricing, technical support, spare parts, and OEM sourcing enquiries.",
  keywords: [
    "industrial contact",
    "sales support",
    "engineering team",
    "technical support",
    "spare parts team",
    "international business",
  ],
  url: "https://industrial.com/contact",
  type: "website",
  author: "Industrial",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbs([
              { name: "Home", url: "https://industrial.com/" },
              { name: "Contact", url: "https://industrial.com/contact" },
            ])
          ),
        }}
      />
      <ContactPageContent />
    </>
  );
}
