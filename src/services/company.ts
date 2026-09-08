import { fetchAPI } from "@/lib/fetchAPI";
import { getStrapiMediaUrl, unwrapStrapiEntry } from "@/lib/strapi-image";
import type { CompanySettings, StrapiCompanyEntry } from "@/types/company";

const FALLBACK_COMPANY: CompanySettings = {
  id: "default-company",
  companyName: "Industrial Components",
  logo: "/logo.png",
  phone: "+1 (234) 567-890",
  whatsappNumber: "+1234567890",
  email: "hello@industrial.com",
  address: "San Francisco, CA",
  workingHours: "Mon-Fri: 9:00 AM - 6:00 PM",
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Instagram", url: "https://instagram.com" },
  ],
  heroCtaText: "Request a Quote",
  footerCopyright: "© 2026 Industrial Components. All rights reserved.",
  navbarLogo: "/logo.png",
};

export async function getCompanySettings(): Promise<CompanySettings> {
  const response = await fetchAPI<{ data: StrapiCompanyEntry | { attributes: StrapiCompanyEntry } | null }>('/company-setting', {
    populate: "*",
    revalidate: 3600,
  });

  const entry = unwrapStrapiEntry<StrapiCompanyEntry>(response?.data ?? null);
  if (entry) {
    const socialLinks = [
      entry.linkedin ? { platform: "LinkedIn", url: entry.linkedin } : null,
      entry.instagram ? { platform: "Instagram", url: entry.instagram } : null,
      entry.facebook ? { platform: "Facebook", url: entry.facebook } : null,
      entry.youtube ? { platform: "YouTube", url: entry.youtube } : null,
    ].filter((link): link is { platform: string; url: string } => Boolean(link));

    return {
      id: String(entry.id ?? 'company-settings'),
      companyName: entry.companyName ?? FALLBACK_COMPANY.companyName,
      logo: getStrapiMediaUrl(entry.logo, FALLBACK_COMPANY.logo),
      phone: entry.phone ?? FALLBACK_COMPANY.phone,
      whatsappNumber: entry.whatsappNumber ?? FALLBACK_COMPANY.whatsappNumber,
      email: entry.email ?? FALLBACK_COMPANY.email,
      address: entry.address ?? FALLBACK_COMPANY.address,
      workingHours: entry.workingHours ?? FALLBACK_COMPANY.workingHours,
      socialLinks: socialLinks.length > 0 ? socialLinks : FALLBACK_COMPANY.socialLinks,
      heroCtaText: entry.heroCtaText ?? FALLBACK_COMPANY.heroCtaText,
      footerCopyright: entry.footerCopyright ?? FALLBACK_COMPANY.footerCopyright,
      navbarLogo: getStrapiMediaUrl(entry.navbarLogo ?? entry.logo, FALLBACK_COMPANY.navbarLogo),
    };
  }

  return FALLBACK_COMPANY;
}
