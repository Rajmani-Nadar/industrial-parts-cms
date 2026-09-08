import { DOWNLOADS } from "@/data/downloads";
import { fetchAPI } from "@/lib/fetchAPI";
import { getStrapiMediaSource, unwrapStrapiEntry } from "@/lib/strapi-image";
import type { DownloadDocument, StrapiDownloadEntry } from "@/types/download";

export async function getDownloads(): Promise<DownloadDocument[]> {
  const response = await fetchAPI<{ data: Array<StrapiDownloadEntry | { id?: number | string; attributes?: StrapiDownloadEntry }> } | Array<StrapiDownloadEntry>>('/downloads', {
    populate: '*',
    sort: 'displayOrder:asc',
  });

  const entries = response ? (Array.isArray(response) ? response : response.data) : [];
  const mapped = entries
    .map((entry) => {
      const attributes = unwrapStrapiEntry<StrapiDownloadEntry>(entry);
      if (!attributes) return null;

      return {
        id: String((entry as { id?: number | string }).id ?? attributes.title ?? 'download'),
        title: attributes.title ?? 'Document',
        category: attributes.category ?? 'Datasheets',
        version: attributes.version ?? 'v1.0',
        fileSize: attributes.fileSize ?? '0 KB',
        updatedAt: attributes.updatedAt ?? new Date().toISOString(),
        compatibleEngine: attributes.compatibleEngine ?? 'All',
        product: attributes.product ?? 'Industrial',
        partNumber: attributes.partNumber ?? 'N/A',
        description: attributes.description ?? 'Industrial document.',
        href: getStrapiMediaSource(attributes.file ?? attributes.url) ?? "",
      } satisfies DownloadDocument;
    })
    .filter((item): item is DownloadDocument => Boolean(item));

  if (mapped.length > 0) {
    return mapped;
  }

  return DOWNLOADS;
}

export async function getDownloadsByCategory(category: string): Promise<DownloadDocument[]> {
  const downloads = await getDownloads();
  return downloads.filter((item) => item.category.toLowerCase() === category.toLowerCase());
}

export async function getDownloadCategories(): Promise<string[]> {
  const downloads = await getDownloads();
  return [...new Set(downloads.map((item) => item.category))];
}

export async function getFeaturedDownloads(): Promise<DownloadDocument[]> {
  const downloads = await getDownloads();
  return downloads.slice(0, 3);
}
