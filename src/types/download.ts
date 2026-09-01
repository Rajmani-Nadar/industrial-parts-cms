export type DownloadCategory =
  | "Product Catalogues"
  | "Datasheets"
  | "Installation Manuals"
  | "Compatibility Charts"
  | "Wiring Diagrams"
  | "Safety Documents"
  | "Warranty Documents";

export interface DownloadDocument {
  id: string;
  title: string;
  category: DownloadCategory | string;
  version: string;
  fileSize: string;
  updatedAt: string;
  compatibleEngine: string;
  product: string;
  partNumber: string;
  description: string;
  href: string;
}

export interface StrapiDownloadEntry {
  id?: number;
  title?: string;
  category?: string;
  version?: string;
  fileSize?: string;
  updatedAt?: string;
  compatibleEngine?: string;
  product?: string;
  partNumber?: string;
  description?: string;
  url?: string;
  file?: {
    url?: string;
    name?: string;
    size?: number;
  } | null;
}
