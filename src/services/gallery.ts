import { GALLERY_ITEMS } from "@/data/gallery";
import { get } from "@/lib/strapi";
import type { GalleryItem } from "@/types/gallery";

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const response = await get<{ data: Array<{ id: number; attributes: Record<string, unknown> }> }>("/galleries", {
    populate: "*",
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => {
        const attrs = entry?.attributes as Record<string, unknown> | undefined;
        if (!attrs) return null;
        return {
          id: String(entry.id ?? attrs.title ?? Math.random()),
          title: String(attrs.title ?? "Gallery Item"),
          category: String(attrs.category ?? "Products"),
          location: String(attrs.location ?? "Industrial Facility"),
          image: String((attrs.image as Record<string, unknown> | undefined)?.url ?? "/products/placeholder.jpg"),
          width: Number((attrs.image as Record<string, unknown> | undefined)?.width ?? 1200),
          height: Number((attrs.image as Record<string, unknown> | undefined)?.height ?? 900),
        } satisfies GalleryItem;
      })
      .filter(Boolean) as GalleryItem[];

    if (mapped.length > 0) {
      return mapped;
    }
  }

  return GALLERY_ITEMS;
}

export async function getGalleryFilters(): Promise<string[]> {
  const items = await getGalleryItems();
  return ["All", ...new Set(items.map((item) => item.category))];
}
