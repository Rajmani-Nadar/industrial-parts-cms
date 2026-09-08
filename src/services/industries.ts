import { fetchAPI } from "@/lib/fetchAPI";
import { resolveMediaUrl } from "@/lib/utils";

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
  const response = await fetchAPI<{ data: Array<Record<string, unknown> | { id?: number | string; attributes?: Record<string, unknown> }> } | Array<Record<string, unknown>>>("/industries", {
    populate: "*",
    sort: "displayOrder:asc",
  });

  const entries = response ? (Array.isArray(response) ? response : response.data) : [];
  const mapped = entries
    .map((entry) => {
      const attributes = entry && typeof entry === "object" && "attributes" in entry && entry.attributes && typeof entry.attributes === "object"
        ? (entry.attributes as Record<string, unknown>)
        : (entry as Record<string, unknown>);
      if (!attributes) return null;

      const iconValue = attributes.icon as { url?: string } | string | null | undefined;
      const coverImageValue = attributes.coverImage as { url?: string } | null | undefined;
      const products = Array.isArray(attributes.products)
        ? attributes.products.map((product) => {
            if (!product || typeof product !== "object") return String(product ?? "");
            const productRecord = product as Record<string, unknown>;
            if (typeof productRecord.name === "string") return productRecord.name;
            if (typeof productRecord.title === "string") return productRecord.title;
            return String(productRecord.slug ?? "");
          }).filter(Boolean)
        : [];

      return {
        id: String((entry as { id?: number | string })?.id ?? attributes.slug ?? attributes.name ?? "industry"),
        slug: String(attributes.slug ?? String(attributes.name ?? "industry").toLowerCase().replace(/\s+/g, "-")),
        name: String(attributes.name ?? "Industry"),
        description: String(attributes.description ?? "Industrial solutions."),
        icon: typeof iconValue === "string" ? iconValue : iconValue?.url ?? "Factory",
        coverImage: resolveMediaUrl(coverImageValue?.url, "/logo.png"),
        products,
        displayOrder: Number(attributes.displayOrder ?? 0),
      } satisfies IndustryRecord;
    })
    .filter((item): item is IndustryRecord => Boolean(item));

  if (mapped.length > 0) {
    return [...mapped].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  return FALLBACK_INDUSTRIES;
}

export async function getIndustryBySlug(slug: string): Promise<IndustryRecord | null> {
  const industries = await getIndustries();
  return industries.find((industry) => industry.slug === slug) ?? null;
}

export async function getFeaturedIndustries(): Promise<IndustryRecord[]> {
  const industries = await getIndustries();
  return industries.slice(0, 8);
}
