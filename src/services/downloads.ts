import { DOWNLOADS } from "@/data/downloads";
import { fetchAPI } from "@/lib/fetchAPI";
import type { DownloadDocument, StrapiDownloadEntry } from "@/types/download";

export async function getDownloads(): Promise<DownloadDocument[]> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiDownloadEntry }> }>('/downloads', {
    populate: ['file', 'thumbnail'],
    sort: 'displayOrder:asc',
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => {
        const attributes = entry?.attributes;
        if (!attributes) return null;

        return {
          id: String(entry.id ?? attributes.title ?? 'download'),
          title: attributes.title ?? 'Document',
          category: attributes.category ?? 'Datasheets',
          version: attributes.version ?? 'v1.0',
          fileSize: attributes.fileSize ?? '0 KB',
          updatedAt: attributes.updatedAt ?? new Date().toISOString(),
          compatibleEngine: attributes.compatibleEngine ?? 'All',
          product: attributes.product ?? 'Industrial',
          partNumber: attributes.partNumber ?? 'N/A',
          description: attributes.description ?? 'Industrial document.',
          href: attributes.file?.url ?? attributes.url ?? '/downloads/placeholder.pdf',
        } satisfies DownloadDocument;
      })
      .filter((item): item is DownloadDocument => Boolean(item));

    if (mapped.length > 0) {
      return mapped;
    }
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
