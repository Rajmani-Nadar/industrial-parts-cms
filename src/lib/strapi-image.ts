import type { StrapiMedia } from "@/types/company";

export function getStrapiMediaUrl(media?: StrapiMedia | null, fallback = "/products/placeholder.jpg") {
  if (!media) return fallback;

  const mediaUrl = media.url ?? media.formats?.large?.url ?? media.formats?.medium?.url ?? media.formats?.small?.url;
  if (!mediaUrl) return fallback;

  return mediaUrl.startsWith("http") ? mediaUrl : `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}${mediaUrl}`;
}

export function getStrapiImageProps(media?: StrapiMedia | null, fallback = "/products/placeholder.jpg") {
  return {
    src: getStrapiMediaUrl(media, fallback),
    alt: media?.alternativeText ?? media?.name ?? "Industrial image",
  };
}
