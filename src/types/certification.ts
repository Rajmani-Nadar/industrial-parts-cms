export interface Certification {
  id: string;
  name: string;
  description: string;
  image?: string;
  icon?: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface StrapiCertificationEntry {
  id?: number | string;
  name?: string;
  title?: string;
  slug?: string;
  description?: string;
  icon?: {
    url?: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  } | null;
  image?: {
    url?: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  } | null;
  featured?: boolean;
  displayOrder?: number;
  issuer?: string;
}
