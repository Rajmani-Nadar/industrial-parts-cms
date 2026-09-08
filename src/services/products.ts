import { PRODUCTS } from "@/data/products";
import { fetchAPI } from "@/lib/fetchAPI";
import { getStrapiMediaUrl, unwrapStrapiEntry } from "@/lib/strapi-image";
import type { Product, StrapiProductEntry } from "@/types/product";

function toPlainText(value: unknown): string {
  if (!value) return "";

  if (typeof value === "string") return value;

  if (Array.isArray(value)) {
    return value
      .map((item) => toPlainText(item))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof record.text === "string") return record.text;
    if (Array.isArray(record.children)) return toPlainText(record.children);
    if (Array.isArray(record.content)) return toPlainText(record.content);

    const nestedText = Object.values(record)
      .map((item) => toPlainText(item))
      .filter(Boolean)
      .join(" ");

    if (nestedText) return nestedText.replace(/\s+/g, " ").trim();
  }

  return String(value);
}

function getRelationName(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  const relation = value as Record<string, unknown>;
  const nested = relation.data && typeof relation.data === "object" ? relation.data as Record<string, unknown> : relation;
  const attributes = nested.attributes && typeof nested.attributes === "object" ? nested.attributes as Record<string, unknown> : nested;
  return typeof attributes.name === "string" ? attributes.name : typeof attributes.slug === "string" ? attributes.slug : undefined;
}

function getRelationSlug(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  const relation = value as Record<string, unknown>;
  const nested = relation.data && typeof relation.data === "object" ? relation.data as Record<string, unknown> : relation;
  const attributes = nested.attributes && typeof nested.attributes === "object" ? nested.attributes as Record<string, unknown> : nested;
  return typeof attributes.slug === "string" ? attributes.slug : undefined;
}

function normalizeProduct(entry: { id?: number | string; attributes?: StrapiProductEntry } | StrapiProductEntry): Product | null {
  const product = unwrapStrapiEntry<StrapiProductEntry>(entry);
  if (!product) return null;
  const name = product.name ?? "Industrial Component";
  const category = getRelationName(product.product_category) ?? product.category ?? "Industrial Components";
  const categorySlug = getRelationSlug(product.product_category) ?? category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const industryName = getRelationName(product.industry);
  const applications = Array.isArray(product.applications)
    ? product.applications.map((application) =>
        typeof application === "string" ? application : String(application?.name ?? "Application"),
      )
    : industryName
      ? [industryName]
      : [];

  const descriptionText = toPlainText(product.description ?? product.summary ?? "Industrial heavy-duty component.");
  const shortDescriptionText = toPlainText(product.shortDescription ?? product.summary ?? (descriptionText || "Industrial heavy-duty component."));
  const summaryText = toPlainText(product.summary ?? product.shortDescription ?? (descriptionText || "Industrial heavy-duty component."));
  const imgList = Array.isArray(product.images) ? product.images : [];
  const tags = Array.isArray(product.tags) ? product.tags.map(String) : [];
  if (product.featured) tags.push("featured");

  return {
    id: String(("id" in entry ? entry.id : product.id) ?? product.slug ?? name),
    slug: product.slug ?? name.toLowerCase().replace(/\s+/g, "-"),
    sku: product.sku ?? "N/A",
    brand: product.brand ?? "Industrial",
    name,
    category,
    categorySlug,
    shortDescription: shortDescriptionText || "Industrial heavy-duty component.",
    description: descriptionText || "Industrial heavy-duty component.",
    summary: summaryText || "Industrial heavy-duty component.",
    availability: product.availability ?? "In Stock",
    compatibleEngines: Array.isArray(product.compatibleEngines) ? product.compatibleEngines : [],
    applications: [...new Set(applications)],
    features: Array.isArray(product.features) ? product.features.map(String) : [],
    images: imgList.length > 0
      ? imgList.map((image, index) => ({
          id: String(image?.id ?? `${name.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`),
          url: getStrapiMediaUrl(image, "/logo.png"),
          alt: image?.alternativeText ?? `${name} image ${index + 1}`,
          width: Number(image?.width ?? 1200),
          height: Number(image?.height ?? 1200),
        }))
      : [{
          id: `${name.toLowerCase().replace(/\s+/g, "-")}-image-1`,
          url: "/logo.png",
          alt: `${name} image 1`,
          width: 1200,
          height: 1200,
        }],
    specifications: Array.isArray(product.specifications)
      ? product.specifications.map((spec) => ({
          label: String(spec?.label ?? spec?.name ?? "Specification"),
          value: String(spec?.value ?? spec?.text ?? "N/A"),
        }))
      : [],
    downloads: Array.isArray(product.downloads)
      ? product.downloads.map((download) => ({
          name: String(download?.name ?? "Document"),
          type: (download?.type as Product["downloads"][number]["type"]) ?? "PDF",
          url: getStrapiMediaUrl(download, "/downloads/placeholder.pdf"),
        }))
      : [],
    tags: [...new Set(tags)],
  };
}

function getEntries(response: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(response)) return response as Array<Record<string, unknown>>;
  if (response && typeof response === "object") {
    const source = response as { data?: unknown };
    if (Array.isArray(source.data)) return source.data as Array<Record<string, unknown>>;
    if (source.data && typeof source.data === "object") return [source.data as Record<string, unknown>];
  }
  return [];
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiProductEntry }> } | Array<StrapiProductEntry>>('/products', {
    populate: ["images", "datasheet", "installationManual", "product_category", "industry"],
    sort: "displayOrder:asc",
  });

  const entries = getEntries(response);
  const mapped = entries
    .map((entry) => normalizeProduct(entry as { id?: number | string; attributes?: StrapiProductEntry } | StrapiProductEntry))
    .filter((item): item is Product => Boolean(item));

  if (mapped.length > 0) {
    console.log("Products fetched:", mapped.length);
    return mapped;
  }

  console.log("Products fetched:", PRODUCTS.length);
  return PRODUCTS;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, 6);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiProductEntry }> } | Array<StrapiProductEntry>>('/products', {
    populate: ["images", "datasheet", "installationManual", "product_category", "industry"],
    filters: { slug: slug },
  });

  const entries = getEntries(response);
  const match = entries.find((entry) => {
    const product = ("attributes" in entry && entry.attributes ? entry.attributes : entry) as StrapiProductEntry;
    return String(product.slug ?? "") === slug;
  });

  if (match) {
    const normalized = normalizeProduct(match as { id?: number | string; attributes?: StrapiProductEntry } | StrapiProductEntry);
    if (normalized) return normalized;
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
