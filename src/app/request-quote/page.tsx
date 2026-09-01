import type { Metadata } from "next";
import { Suspense } from "react";
import { generatePageMetadata, generateBreadcrumbs } from "@/lib/seo";
import { RFQPageContent } from "@/components/rfq/RFQPageContent";

export const metadata: Metadata = generatePageMetadata({
  title: "Request a Product Quotation",
  description:
    "Submit OEM and industrial RFQ requests for product sourcing, technical support, and custom quotation support.",
  keywords: [
    "request quote",
    "RFQ",
    "industrial quotation",
    "OEM quote",
    "product enquiry",
  ],
  url: "https://industrial.com/request-quote",
  type: "website",
  author: "Industrial",
});

export default function RequestQuotePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbs([
              { name: "Home", url: "https://industrial.com/" },
              { name: "Request Quote", url: "https://industrial.com/request-quote" },
            ])
          ),
        }}
      />
      <Suspense fallback={<div className="bg-slate-50 py-20 text-center text-slate-600">Loading quotation form…</div>}>
        <RFQPageContent />
      </Suspense>
    </>
  );
}
