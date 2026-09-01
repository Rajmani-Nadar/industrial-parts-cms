import type { Metadata } from "next";
import { DownloadsPageContent } from "@/components/downloads/DownloadsPageContent";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Technical Resources & Downloads",
  description:
    "Download product catalogues, installation manuals, datasheets, and specification documents for industrial power, engine, and control systems.",
  keywords: [
    "industrial downloads",
    "technical resources",
    "datasheets",
    "installation manuals",
    "product catalogues",
  ],
  url: "https://industrial.com/downloads",
  type: "website",
  author: "Industrial",
});

export default function DownloadsPage() {
  return <DownloadsPageContent />;
}
