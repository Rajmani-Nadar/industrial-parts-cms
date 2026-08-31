import { PRODUCT_APPLICATIONS, PRODUCT_BRANDS, PRODUCT_CATEGORIES, PRODUCTS } from "@/data/products";
import type {
  Product,
  ProductCategory,
  ProductFilters,
  ProductSortOption,
} from "@/types/product";

export function getAllProducts(): Product[] {
  return [...PRODUCTS];
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  ).slice(0, limit);
}

export function searchProducts(query: string, productList: Product[] = PRODUCTS): Product[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [...productList];
  }

  return productList.filter((product) => {
    const searchableText = [
      product.name,
      product.sku,
      product.category,
      product.brand,
      product.shortDescription,
      product.compatibleEngines.join(" "),
      product.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalized);
  });
}

export function filterProducts(filters: Partial<ProductFilters>, productList: Product[] = PRODUCTS): Product[] {
  const normalizedSearch = (filters.search ?? "").trim().toLowerCase();
  const selectedCategory = filters.category ?? "All";
  const selectedBrand = filters.brand ?? "All";
  const selectedApplication = filters.application ?? "All";
  const selectedAvailability = filters.availability ?? "All";

  const matchingProducts = productList.filter((product) => {
    const matchesSearch =
      !normalizedSearch ||
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.sku.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch) ||
      product.compatibleEngines.some((engine) => engine.toLowerCase().includes(normalizedSearch));

    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
    const matchesApplication =
      selectedApplication === "All" || product.applications.includes(selectedApplication);
    const matchesAvailability =
      selectedAvailability === "All" || product.availability === selectedAvailability;

    return matchesSearch && matchesCategory && matchesBrand && matchesApplication && matchesAvailability;
  });

  return sortProducts(matchingProducts, filters.sort ?? "newest");
}

export function sortProducts(products: Product[], option: ProductSortOption = "newest"): Product[] {
  const sortedProducts = [...products];

  switch (option) {
    case "name":
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case "category":
      return sortedProducts.sort(
        (a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
      );
    case "brand":
      return sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));
    case "application":
      return sortedProducts.sort(
        (a, b) =>
          (a.applications[0] ?? "").localeCompare(b.applications[0] ?? "") ||
          a.name.localeCompare(b.name),
      );
    default:
      return sortedProducts;
  }
}

export function getCategories(): ProductCategory[] {
  return [...PRODUCT_CATEGORIES];
}

export function getEngineBrands(): string[] {
  return [...PRODUCT_BRANDS];
}

export function getApplications(): string[] {
  return Object.keys(PRODUCT_APPLICATIONS);
}

export function getAvailabilityOptions(): string[] {
  return ["In Stock", "Custom Manufacturing", "OEM Compatible"];
}
