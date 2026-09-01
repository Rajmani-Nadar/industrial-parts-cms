export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  coverImage: string;
  displayOrder: number;
}

export interface StrapiCategoryEntry {
  id?: number | string;
  slug?: string;
  name?: string;
  description?: string;
  icon?: string;
  coverImage?: {
    url?: string;
    alternativeText?: string;
  } | null;
  displayOrder?: number;
}
