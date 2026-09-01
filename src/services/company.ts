import { fetchAPI } from "@/lib/fetchAPI";
import { resolveMediaUrl } from "@/lib/utils";
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
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiCompanyEntry }> }>('/company-settings', {
    populate: ['logo', 'navbarLogo'],
    revalidate: 3600,
  });

  if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
    const entry = response.data[0]?.attributes;
    if (entry) {
      return {
        id: String(entry.id ?? 'company-settings'),
        companyName: entry.companyName ?? FALLBACK_COMPANY.companyName,
        logo: resolveMediaUrl(entry.logo?.url, FALLBACK_COMPANY.logo),
        phone: entry.phone ?? FALLBACK_COMPANY.phone,
        whatsappNumber: entry.whatsappNumber ?? FALLBACK_COMPANY.whatsappNumber,
        email: entry.email ?? FALLBACK_COMPANY.email,
        address: entry.address ?? FALLBACK_COMPANY.address,
        workingHours: entry.workingHours ?? FALLBACK_COMPANY.workingHours,
        socialLinks: (entry.socialLinks ?? FALLBACK_COMPANY.socialLinks).map((link) => ({
          platform: link.platform ?? 'Social',
          url: link.url ?? '#',
        })),
        heroCtaText: entry.heroCtaText ?? FALLBACK_COMPANY.heroCtaText,
        footerCopyright: entry.footerCopyright ?? FALLBACK_COMPANY.footerCopyright,
        navbarLogo: resolveMediaUrl(entry.navbarLogo?.url, FALLBACK_COMPANY.navbarLogo),
      };
    }
  }

  return FALLBACK_COMPANY;
}
