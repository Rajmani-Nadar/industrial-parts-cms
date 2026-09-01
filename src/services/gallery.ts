import { GALLERY_ITEMS } from "@/data/gallery";
import { fetchAPI } from "@/lib/fetchAPI";
import type { GalleryItem, StrapiGalleryEntry } from "@/types/gallery";

export async function getGallery(): Promise<GalleryItem[]> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiGalleryEntry }> }>('/galleries', {
    populate: ['images'],
    sort: 'displayOrder:asc',
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => {
        const attributes = entry?.attributes;
        if (!attributes) return null;

        return {
          id: String(entry.id ?? attributes.title ?? 'gallery-item'),
          title: attributes.title ?? 'Gallery Item',
          category: attributes.category ?? 'Products',
          location: attributes.location ?? 'Industrial Facility',
          image: attributes.image?.url ?? '/products/placeholder.jpg',
          width: Number(attributes.image?.width ?? 1200),
          height: Number(attributes.image?.height ?? 900),
        } satisfies GalleryItem;
      })
      .filter((item): item is GalleryItem => Boolean(item));

    if (mapped.length > 0) {
      return mapped;
    }
  }

  return GALLERY_ITEMS;
}

export async function getGalleryByCategory(category: string): Promise<GalleryItem[]> {
  const gallery = await getGallery();
  return gallery.filter((item) => item.category.toLowerCase() === category.toLowerCase());
}

export async function getFeaturedGallery(): Promise<GalleryItem[]> {
  const gallery = await getGallery();
  return gallery.slice(0, 6);
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return getGallery();
}

export async function getGalleryFilters(): Promise<string[]> {
  const items = await getGallery();
  return ['All', ...new Set(items.map((item) => item.category))];
}
