import { fetchAPI } from "@/lib/fetchAPI";
import type { Certification, StrapiCertificationEntry } from "@/types/certification";

const FALLBACK_CERTIFICATIONS: Certification[] = [
  { id: "iso-9001", name: "ISO 9001", description: "Quality management", featured: true },
  { id: "iso-14001", name: "ISO 14001", description: "Environmental management", featured: true },
  { id: "ohsas", name: "OHSAS", description: "Workplace safety", featured: true },
];

function normalizeCertification(entry: { id?: number | string; attributes?: StrapiCertificationEntry }): Certification | null {
  const attributes = entry?.attributes;
  if (!attributes) {
    return null;
  }

  return {
    id: String(entry.id ?? attributes.name ?? "certification"),
    name: attributes.name ?? "Certification",
    description: attributes.description ?? "Industry certification.",
    icon: attributes.icon?.url,
    featured: attributes.featured ?? false,
    displayOrder: attributes.displayOrder ?? 0,
  };
}

export async function getCertifications(): Promise<Certification[]> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiCertificationEntry }> }>('/certifications');

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => normalizeCertification(entry))
      .filter((item): item is Certification => Boolean(item));

    if (mapped.length > 0) {
      return mapped;
    }
  }

  return FALLBACK_CERTIFICATIONS;
}

export async function getFeaturedCertifications(): Promise<Certification[]> {
  const certifications = await getCertifications();
  return certifications.filter((certification) => certification.featured === true);
}
