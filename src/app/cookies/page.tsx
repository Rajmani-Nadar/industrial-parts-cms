import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Cookie Policy",
  description: "Cookie policy describing the first-party consent preference used on the Industrial website.",
  url: "https://industrial.com/cookies",
  type: "website",
  author: "Industrial",
});

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-slate-700 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-slate-900 md:text-5xl">Cookie Policy</h1>
      <div className="mt-8 space-y-6 text-base leading-7">
        <p>Industrial uses a small first-party cookie to remember your cookie choices. Necessary site functions do not require optional consent.</p>
        <p>Analytics and marketing categories are optional and are not active on this website unless a corresponding service is added and enabled with your permission.</p>
        <p>You can review or change your optional choices at any time using Cookie Settings in the website footer. Clearing your browser cookies also removes the saved preference.</p>
      </div>
    </div>
  );
}
