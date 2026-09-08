import { GALLERY_ITEMS } from "@/data/gallery";
import { fetchAPI } from "@/lib/fetchAPI";
import { getStrapiMediaSource, unwrapStrapiEntry } from "@/lib/strapi-image";
import type { GalleryItem, StrapiGalleryEntry } from "@/types/gallery";

export async function getGallery(): Promise<GalleryItem[]> {
  const response = await fetchAPI<{ data: Array<StrapiGalleryEntry | { id?: number | string; attributes?: StrapiGalleryEntry }> } | Array<StrapiGalleryEntry>>('/galleries', {
    populate: '*',
    sort: 'displayOrder:asc',
  });

  const entries = response ? (Array.isArray(response) ? response : response.data) : [];
  const mapped = entries
    .flatMap((entry) => {
      const attributes = unwrapStrapiEntry<StrapiGalleryEntry>(entry);
      if (!attributes) return null;

      const mediaItems = Array.isArray(attributes.images)
        ? attributes.images
        : attributes.images
          ? [attributes.images]
          : [attributes.image ?? null];

      return mediaItems.map((media, index) => {
        const imageUrl = getStrapiMediaSource(media);
        return {
          id: `${String((entry as { id?: number | string }).id ?? attributes.title ?? 'gallery-item')}-${index + 1}`,
          title: attributes.title ?? 'Gallery Item',
          category: attributes.category ?? 'Products',
          location: attributes.location ?? 'Industrial Facility',
          image: imageUrl ?? "/logo.png",
          width: Number(media && typeof media === 'object' && 'width' in media ? (media as { width?: number }).width : 1200),
          height: Number(media && typeof media === 'object' && 'height' in media ? (media as { height?: number }).height : 900),
        } satisfies GalleryItem;
      });
    })
    .flat()
    .filter((item): item is GalleryItem => Boolean(item));

  if (mapped.length > 0) {
    return mapped;
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

export async function getGalleryPreview(): Promise<GalleryItem[]> {
  return getFeaturedGallery();
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return getGallery();
}

export async function getGalleryFilters(): Promise<string[]> {
  const items = await getGallery();
  return ['All', ...new Set(items.map((item) => item.category))];
}
