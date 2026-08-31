import type {
  Product,
  ProductAvailability,
  ProductCategory,
  ProductDownload,
  ProductImage,
  ProductSpecification,
} from "@/types/product";

type StrapiMedia = Partial<{ id?: string; url?: string; alternativeText?: string; width?: number; height?: number }>;
type StrapiRecord = Record<string, unknown>;

export function mapStrapiImage(
  media?: StrapiMedia,
  fallbackAlt = "Product image",
): ProductImage {
  const url = media?.url ?? "/products/placeholder.jpg";

  return {
    id: media?.id ?? `${fallbackAlt.toLowerCase().replace(/\s+/g, "-")}-image`,
    url,
    alt: media?.alternativeText ?? fallbackAlt,
    width: media?.width ?? 1200,
    height: media?.height ?? 1200,
  };
}

export function mapStrapiCategory(category?: string): ProductCategory {
  const safeCategory = category ?? "Diesel Engine Spare Parts";
  return safeCategory as ProductCategory;
}

export function mapStrapiProduct(input: StrapiRecord, fallbackName = "Industrial Component"): Product {
  const images = Array.isArray(input.images)
    ? input.images.map((image, index) =>
        mapStrapiImage((image as StrapiMedia) ?? undefined, `${String(input.name ?? fallbackName)} image ${index + 1}`),
      )
    : [mapStrapiImage(undefined, `${String(input.name ?? fallbackName)} image 1`)]

  const specifications: ProductSpecification[] = Array.isArray(input.specifications)
    ? input.specifications.map((spec) => ({
        label: String((spec as StrapiRecord)?.label ?? (spec as StrapiRecord)?.name ?? "Specification"),
        value: String((spec as StrapiRecord)?.value ?? (spec as StrapiRecord)?.text ?? "N/A"),
      }))
    : [];

  const downloads: ProductDownload[] = Array.isArray(input.downloads)
    ? input.downloads.map((download) => ({
        name: String((download as StrapiRecord)?.name ?? "Document"),
        type: ((download as StrapiRecord)?.type ?? "PDF") as ProductDownload["type"],
        url: String((download as StrapiRecord)?.url ?? "/downloads/placeholder.pdf"),
      }))
    : [];

  const applications: string[] = Array.isArray(input.applications)
    ? input.applications.map((application) =>
        typeof application === "string" ? application : String((application as StrapiRecord)?.name ?? "Application"),
      )
    : [];

  const availability = (input.availability ?? "In Stock") as ProductAvailability;

  return {
    id: String(input.id ?? input.slug ?? `${String(input.name ?? fallbackName).toLowerCase().replace(/\s+/g, "-")}-product`),
    slug: String(input.slug ?? String(input.name ?? fallbackName).toLowerCase().replace(/\s+/g, "-")),
    sku: String(input.sku ?? "N/A"),
    brand: String(input.brand ?? "Industrial"),
    name: String(input.name ?? fallbackName),
    category: String(input.category ?? "Diesel Engine Spare Parts"),
    shortDescription: String(input.shortDescription ?? input.summary ?? "Industrial heavy-duty component."),
    description: String(input.description ?? input.summary ?? "Industrial heavy-duty component."),
    summary: String(input.summary ?? input.shortDescription ?? "Industrial heavy-duty component."),
    availability,
    compatibleEngines: Array.isArray(input.compatibleEngines)
      ? input.compatibleEngines.map((engine) => String(engine))
      : [],
    applications,
    features: Array.isArray(input.features) ? input.features.map((feature) => String(feature)) : [],
    images,
    specifications,
    downloads,
    tags: Array.isArray(input.tags) ? input.tags.map((tag) => String(tag)) : [],
  };
}
