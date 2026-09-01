export type GalleryCategory =
  | "Manufacturing"
  | "Products"
  | "Warehouse"
  | "Quality Testing"
  | "Installation"
  | "Packaging"
  | "Dispatch";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory | string;
  location: string;
  image: string;
  width: number;
  height: number;
}

export interface StrapiGalleryEntry {
  id?: number;
  title?: string;
  category?: string;
  location?: string;
  image?: {
    url?: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  } | null;
}
