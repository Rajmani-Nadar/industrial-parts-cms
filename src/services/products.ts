import { PRODUCTS } from "@/data/products";
import { fetchAPI } from "@/lib/fetchAPI";
import type { Product, StrapiProductEntry } from "@/types/product";

function normalizeProduct(entry: { id?: number | string; attributes?: StrapiProductEntry }): Product | null {
  const attributes = entry?.attributes;
  if (!attributes) return null;

  const name = attributes.name ?? "Industrial Component";

  return {
    id: String(entry.id ?? attributes.slug ?? name),
    slug: attributes.slug ?? name.toLowerCase().replace(/\s+/g, "-"),
    sku: attributes.sku ?? "N/A",
    brand: attributes.brand ?? "Industrial",
    name,
    category: attributes.category ?? "Diesel Engine Spare Parts",
    shortDescription: attributes.shortDescription ?? attributes.summary ?? "Industrial heavy-duty component.",
    description: attributes.description ?? attributes.summary ?? "Industrial heavy-duty component.",
    summary: attributes.summary ?? attributes.shortDescription ?? "Industrial heavy-duty component.",
    availability: attributes.availability ?? "In Stock",
    compatibleEngines: Array.isArray(attributes.compatibleEngines) ? attributes.compatibleEngines : [],
    applications: Array.isArray(attributes.applications)
      ? attributes.applications.map((application) =>
          typeof application === "string" ? application : String(application?.name ?? "Application"),
        )
      : [],
    features: Array.isArray(attributes.features) ? attributes.features.map(String) : [],
    images: Array.isArray(attributes.images)
      ? attributes.images.map((image, index) => ({
          id: String(image?.id ?? `${name.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`),
          url: image?.url ?? "/products/placeholder.jpg",
          alt: image?.alternativeText ?? `${name} image ${index + 1}`,
          width: Number(image?.width ?? 1200),
          height: Number(image?.height ?? 1200),
        }))
      : [{
          id: `${name.toLowerCase().replace(/\s+/g, "-")}-image-1`,
          url: "/products/placeholder.jpg",
          alt: `${name} image 1`,
          width: 1200,
          height: 1200,
        }],
    specifications: Array.isArray(attributes.specifications)
      ? attributes.specifications.map((spec) => ({
          label: String(spec?.label ?? spec?.name ?? "Specification"),
          value: String(spec?.value ?? spec?.text ?? "N/A"),
        }))
      : [],
    downloads: Array.isArray(attributes.downloads)
      ? attributes.downloads.map((download) => ({
          name: String(download?.name ?? "Document"),
          type: (download?.type as Product["downloads"][number]["type"]) ?? "PDF",
          url: String(download?.url ?? "/downloads/placeholder.pdf"),
        }))
      : [],
    tags: Array.isArray(attributes.tags) ? attributes.tags.map(String) : [],
  };
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiProductEntry }> }>("/products", {
    populate: ["images", "downloads", "product_category", "industry"],
    sort: "displayOrder:asc",
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => normalizeProduct(entry))
      .filter((item): item is Product => Boolean(item));

    if (mapped.length > 0) {
      return mapped;
    }
  }

  return PRODUCTS;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.tags.includes("featured") || product.category.toLowerCase().includes("generator")).slice(0, 6);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiProductEntry }> }>("/products", {
    populate: ["images", "downloads", "product_category", "industry"],
    filters: { slug },
  });

  if (response?.data && Array.isArray(response.data)) {
    const match = response.data.find((entry) => String(entry?.attributes?.slug ?? "") === slug);
    const normalized = match ? normalizeProduct(match) : null;
    if (normalized) {
      return normalized;
    }
  }

  return PRODUCTS.find((product) => product.slug === slug) ?? null;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.category.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase());
}

export async function getProductsByIndustry(slug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(
    (product) =>
      product.applications.some((application) => application.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()) ||
      product.category.toLowerCase().includes(slug.toLowerCase()),
  );
}

export async function searchProducts(query: string): Promise<Product[]> {
  const normalized = query.trim();
  if (!normalized) {
    return getProducts();
  }

  const products = await getProducts();
  const search = normalized.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.tags.some((tag) => tag.toLowerCase().includes(search)) ||
      product.applications.some((application) => application.toLowerCase().includes(search)),
  );
}

export async function getProductCategories(): Promise<string[]> {
  const products = await getProducts();
  return [...new Set(products.map((product) => product.category))];
}
