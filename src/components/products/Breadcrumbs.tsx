import Link from "next/link";
import { generateBreadcrumbs } from "@/lib/seo";

type BreadcrumbsProps = {
  items: Array<{ label: string; href?: string }>;
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const structuredData = generateBreadcrumbs(
    items.map((item) => ({
      name: item.label,
      url: item.href ?? "#",
    })),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-orange-500">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-800">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="text-slate-400">/</span>}
          </div>
        ))}
      </nav>
    </>
  );
}
