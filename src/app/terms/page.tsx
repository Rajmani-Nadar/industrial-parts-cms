import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms of Service",
  description: "Terms of service for using the Industrial website, product information, and support resources.",
  url: "https://industrial.com/terms",
  type: "website",
  author: "Industrial",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-slate-700 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-slate-900 md:text-5xl">Terms of Service</h1>
      <div className="mt-8 space-y-6 text-base leading-7">
        <p>Use of this website is subject to the terms below. By accessing the site, you agree to use the information and materials in a lawful and responsible manner.</p>
        <p>All product descriptions, specifications, and technical information are for general informational purposes and should be validated against formal documentation before purchase or installation.</p>
        <p>Industrial may update, modify, or remove content at any time without notice. We reserve the right to restrict access for misuse, abuse, or unauthorized commercial activities.</p>
        <p>Any disputes related to use of this website are governed by the laws of the applicable jurisdiction, without regard to conflict of law principles.</p>
      </div>
    </div>
  );
}
