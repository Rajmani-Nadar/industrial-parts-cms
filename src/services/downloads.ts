import { DOWNLOADS } from "@/data/downloads";
import { get } from "@/lib/strapi";
import type { DownloadDocument } from "@/types/download";

export async function getDownloads(): Promise<DownloadDocument[]> {
  const response = await get<{ data: Array<{ id: number; attributes: Record<string, unknown> }> }>("/downloads", {
    populate: "*",
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => {
        const attrs = entry?.attributes as Record<string, unknown> | undefined;
        if (!attrs) return null;
        return {
          id: String(entry.id ?? attrs.title ?? Math.random()),
          title: String(attrs.title ?? "Document"),
          category: String(attrs.category ?? "Datasheets"),
          version: String(attrs.version ?? "v1.0"),
          fileSize: String(attrs.fileSize ?? "0 KB"),
          updatedAt: String(attrs.updatedAt ?? new Date().toISOString()),
          compatibleEngine: String(attrs.compatibleEngine ?? "All"),
          product: String(attrs.product ?? "Industrial"),
          partNumber: String(attrs.partNumber ?? "N/A"),
          description: String(attrs.description ?? ""),
          href: String(attrs.href ?? attrs.url ?? "/downloads/placeholder.pdf"),
        } satisfies DownloadDocument;
      })
      .filter(Boolean) as DownloadDocument[];

    if (mapped.length > 0) {
      return mapped;
    }
  }

  return DOWNLOADS;
}

export async function getDownloadCategories(): Promise<string[]> {
  const downloads = await getDownloads();
  return [...new Set(downloads.map((item) => item.category))];
}
