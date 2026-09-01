import { fetchAPI } from "@/lib/fetchAPI";
import type { Category, StrapiCategoryEntry } from "@/types/category";

const FALLBACK_CATEGORIES: Category[] = [
  {
    id: "generator-accessories",
    slug: "generator-accessories",
    name: "Generator Accessories",
    description: "Control, protection, and fuel system components for diesel gensets.",
    icon: "Cpu",
    coverImage: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 1,
  },
  {
    id: "engine-braking-systems",
    slug: "engine-braking-systems",
    name: "Engine Braking Systems",
    description: "Heavy-duty brake assemblies and related drivetrain control components.",
    icon: "Gauge",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 2,
  },
  {
    id: "ats-controllers",
    slug: "ats-controllers",
    name: "ATS Controllers",
    description: "Automatic transfer switch controls built for power continuity.",
    icon: "ShieldCheck",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 3,
  },
];

export async function getCategories(): Promise<Category[]> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiCategoryEntry }> }>("/categories", {
    populate: ["coverImage"],
    sort: "displayOrder:asc",
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => {
        const attributes = entry?.attributes;
        if (!attributes) return null;

        return {
          id: String(entry.id ?? attributes.slug ?? attributes.name ?? "category"),
          slug: attributes.slug ?? String(attributes.name ?? "category").toLowerCase().replace(/\s+/g, "-"),
          name: attributes.name ?? "Category",
          description: attributes.description ?? "Industrial component category.",
          icon: attributes.icon ?? "Cpu",
          coverImage: attributes.coverImage?.url ?? "/products/placeholder.jpg",
          displayOrder: Number(attributes.displayOrder ?? 0),
        } satisfies Category;
      })
      .filter((item): item is Category => Boolean(item));

    if (mapped.length > 0) {
      return [...mapped].sort((a, b) => a.displayOrder - b.displayOrder);
    }
  }

  return FALLBACK_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}
