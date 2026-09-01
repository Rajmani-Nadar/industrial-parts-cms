import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Industrial product information, support requests, and customer communications.",
  url: "https://industrial.com/privacy",
  type: "website",
  author: "Industrial",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-slate-700 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-slate-900 md:text-5xl">Privacy Policy</h1>
      <div className="mt-8 space-y-6 text-base leading-7">
        <p>Industrial respects the privacy of our customers, partners, and visitors. Information collected through our website is used to support sales, product documentation, and service inquiries.</p>
        <p>We may collect details such as name, company, email address, and inquiry information when you contact us or request product support. This information is used only to respond to your request and improve our product experience.</p>
        <p>We do not sell personal data. We may share limited information with trusted suppliers, service providers, or legal authorities when required by law or necessary to fulfill a contract.</p>
        <p>By using this website, you consent to the collection and processing of data as described in this policy.</p>
      </div>
    </div>
  );
}
