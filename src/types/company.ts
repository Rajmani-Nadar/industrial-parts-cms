export interface StrapiMedia {
  id?: number;
  url?: string;
  name?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url?: string };
    small?: { url?: string };
    medium?: { url?: string };
    large?: { url?: string };
  };
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface CompanySettings {
  id: string;
  companyName: string;
  logo: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  workingHours: string;
  socialLinks: SocialLink[];
  heroCtaText: string;
  footerCopyright: string;
  navbarLogo: string;
}

export interface ContactInformation {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: string;
}

export interface StrapiCompanyEntry {
  id?: number;
  companyName?: string;
  logo?: StrapiMedia | null;
  phone?: string;
  whatsappNumber?: string;
  email?: string;
  address?: string;
  workingHours?: string;
  socialLinks?: Array<{ platform?: string; url?: string }>;
  heroCtaText?: string;
  footerCopyright?: string;
  navbarLogo?: StrapiMedia | null;
}
