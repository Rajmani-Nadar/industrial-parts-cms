import { fetchAPI } from "@/lib/fetchAPI";
import { getStrapiMediaSource, unwrapStrapiEntry } from "@/lib/strapi-image";
import type { Certification, StrapiCertificationEntry } from "@/types/certification";

const FALLBACK_CERTIFICATIONS: Certification[] = [
  { id: "iso-9001", name: "ISO 9001", description: "Quality management", featured: true },
  { id: "iso-14001", name: "ISO 14001", description: "Environmental management", featured: true },
  { id: "ohsas", name: "OHSAS", description: "Workplace safety", featured: true },
];

function normalizeCertification(entry: { id?: number | string; attributes?: StrapiCertificationEntry } | StrapiCertificationEntry): Certification | null {
  const attributes = unwrapStrapiEntry<StrapiCertificationEntry>(entry);
  if (!attributes) return null;

  const imageUrl = getStrapiMediaSource(attributes.image ?? attributes.icon);

  return {
    id: String((entry as { id?: number | string }).id ?? attributes.slug ?? attributes.title ?? attributes.name ?? "certification"),
    name: attributes.title ?? attributes.name ?? "Certification",
    description: attributes.description ?? attributes.issuer ?? "Industry certification.",
    image: imageUrl,
    featured: Boolean(attributes.featured),
    displayOrder: attributes.displayOrder ?? 0,
  };
}

export async function getCertifications(): Promise<Certification[]> {
  const response = await fetchAPI<{ data: Array<StrapiCertificationEntry | { id?: number | string; attributes?: StrapiCertificationEntry }> } | Array<StrapiCertificationEntry>>('/certifications', {
    populate: '*',
    sort: 'displayOrder:asc',
  });

  const entries = response ? (Array.isArray(response) ? response : response.data) : [];
  const mapped = entries
    .map((entry) => normalizeCertification(entry as { id?: number | string; attributes?: StrapiCertificationEntry } | StrapiCertificationEntry))
    .filter((item): item is Certification => Boolean(item));

  if (mapped.length > 0) {
    return mapped;
  }

  return FALLBACK_CERTIFICATIONS;
}

export async function getFeaturedCertifications(): Promise<Certification[]> {
  const certifications = await getCertifications();
  return certifications.filter((certification) => certification.featured === true);
}
