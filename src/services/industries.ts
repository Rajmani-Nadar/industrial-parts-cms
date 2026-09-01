import { fetchAPI } from "@/lib/fetchAPI";

export interface IndustryRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  coverImage: string;
  products: string[];
  displayOrder: number;
}

const FALLBACK_INDUSTRIES: IndustryRecord[] = [
  {
    id: "power-generation",
    slug: "power-generation",
    name: "Power Generation",
    description: "Backup power and critical infrastructure support.",
    icon: "Factory",
    coverImage: "/images/industries/power-generation.jpg",
    products: ["Generator Accessories", "AVR Modules"],
    displayOrder: 1,
  },
  {
    id: "commercial-transport",
    slug: "commercial-transport",
    name: "Commercial Transport",
    description: "Heavy-duty braking and engine reliability.",
    icon: "Truck",
    coverImage: "/images/industries/commercial-transport.jpg",
    products: ["Engine Braking", "Bleeder Brakes"],
    displayOrder: 2,
  },
  {
    id: "mining-construction",
    slug: "mining-construction",
    name: "Mining & Construction",
    description: "Durable components for harsh-duty environments.",
    icon: "HardHat",
    coverImage: "/images/industries/mining-construction.jpg",
    products: ["Spare Parts", "Sensors"],
    displayOrder: 3,
  },
];

export async function getIndustries(): Promise<IndustryRecord[]> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: Record<string, unknown> }> }>("/industries", {
    populate: ["icon", "coverImage", "products"],
    sort: "displayOrder:asc",
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => {
        const attributes = entry?.attributes as Record<string, unknown> | undefined;
        if (!attributes) return null;

        return {
          id: String(entry.id ?? attributes.slug ?? attributes.name ?? "industry"),
          slug: String(attributes.slug ?? String(attributes.name ?? "industry").toLowerCase().replace(/\s+/g, "-")),
          name: String(attributes.name ?? "Industry"),
          description: String(attributes.description ?? "Industrial solutions."),
          icon: String((attributes.icon as string | undefined) ?? "Factory"),
          coverImage: String(((attributes.coverImage as Record<string, unknown> | undefined)?.url as string | undefined) ?? "/products/placeholder.jpg"),
          products: Array.isArray(attributes.products) ? attributes.products.map((product) => String(product)) : [],
          displayOrder: Number(attributes.displayOrder ?? 0),
        } satisfies IndustryRecord;
      })
      .filter((item): item is IndustryRecord => Boolean(item));

    if (mapped.length > 0) {
      return [...mapped].sort((a, b) => a.displayOrder - b.displayOrder);
    }
  }

  return FALLBACK_INDUSTRIES;
}

export async function getIndustryBySlug(slug: string): Promise<IndustryRecord | null> {
  const industries = await getIndustries();
  return industries.find((industry) => industry.slug === slug) ?? null;
}
