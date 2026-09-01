import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Cookie Policy",
  description: "Cookie policy describing the limited analytics and functional data used on the Industrial website.",
  url: "https://industrial.com/cookies",
  type: "website",
  author: "Industrial",
});

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-slate-700 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-slate-900 md:text-5xl">Cookie Policy</h1>
      <div className="mt-8 space-y-6 text-base leading-7">
        <p>Industrial uses cookies to help improve website performance, understand usage patterns, and provide a smoother browsing experience.</p>
        <p>Cookies may be used to remember user preferences, support site security, and support statistical analysis. Analytics cookies do not contain personally identifying information.</p>
        <p>You may disable cookies in your browser settings, but some website features may function less effectively as a result.</p>
      </div>
    </div>
  );
}
