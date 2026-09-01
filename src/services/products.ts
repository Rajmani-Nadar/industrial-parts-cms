import { PRODUCTS } from "@/data/products";
import { get, getBySlug } from "@/lib/strapi";
import { mapStrapiProduct } from "@/lib/strapi-mappers";
import type { Product, StrapiProductEntry } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const response = await get<{ data: Array<{ id: number; attributes: StrapiProductEntry }> }>("/products", {
    populate: "*",
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => entry?.attributes ? mapStrapiProduct(entry.attributes) : null)
      .filter(Boolean) as Product[];

    if (mapped.length > 0) {
      return mapped;
    }
  }

  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const response = await getBySlug<{ data: Array<{ id: number; attributes: StrapiProductEntry }> }>("/products", slug, {
    populate: "*",
  });

  if (response?.data && Array.isArray(response.data)) {
    const match = response.data.find((entry) => entry?.attributes?.slug === slug);
    if (match?.attributes) {
      return mapStrapiProduct(match.attributes);
    }
  }

  return PRODUCTS.find((product) => product.slug === slug) ?? null;
}

export async function getProductCategories(): Promise<string[]> {
  const products = await getProducts();
  return [...new Set(products.map((product) => product.category))];
}
