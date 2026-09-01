export const PRODUCT_CATEGORIES = [
  "Engine Braking Systems",
  "Bleeder Brakes",
  "Generator Accessories",
  "ATS Controllers",
  "AVR Modules",
  "Diesel Engine Spare Parts",
  "Sensors",
  "Wiring Harnesses",
  "Heavy Duty Components",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type ProductAvailability = "In Stock" | "Custom Manufacturing" | "OEM Compatible";

export type ProductFeature = string;

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductDownload {
  name: string;
  type: "PDF" | "Manual" | "Chart" | "Safety";
  url: string;
}

export interface ProductApplication {
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  brand: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  summary: string;
  availability: ProductAvailability;
  compatibleEngines: string[];
  applications: string[];
  features: ProductFeature[];
  images: ProductImage[];
  specifications: ProductSpecification[];
  downloads: ProductDownload[];
  tags: string[];
}

export interface StrapiProductEntry extends Record<string, unknown> {
  id?: number | string;
  slug?: string;
  sku?: string;
  brand?: string;
  name?: string;
  category?: string;
  shortDescription?: string;
  description?: string;
  summary?: string;
  availability?: ProductAvailability;
  compatibleEngines?: string[];
  applications?: Array<string | { name?: string; description?: string; image?: string }>;
  features?: string[];
  images?: Array<{
    id?: string | number;
    url?: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  }>;
  specifications?: Array<{
    label?: string;
    value?: string;
    name?: string;
    text?: string;
  }>;
  downloads?: Array<{
    name?: string;
    type?: string;
    url?: string;
  }>;
  tags?: string[];
}

export type ProductSortOption = "newest" | "name" | "category" | "brand" | "application";

export interface ProductFilters {
  search: string;
  category: string;
  brand: string;
  application: string;
  availability: string;
  sort: ProductSortOption;
}
