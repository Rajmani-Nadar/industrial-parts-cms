import type { StrapiMedia } from "@/types/company";
import { resolveMediaUrl } from "@/lib/utils";

export function unwrapStrapiEntry<T>(input: unknown): T | null {
  if (!input || typeof input !== "object") return null;

  const record = input as Record<string, unknown>;
  if (record.attributes && typeof record.attributes === "object") {
    return record.attributes as T;
  }

  return input as T;
}

function unwrapMediaRecord(input: unknown): StrapiMedia | null {
  if (!input) return null;

  if (Array.isArray(input)) {
    return unwrapMediaRecord(input[0] ?? null);
  }

  if (typeof input === "string") {
    return { url: input };
  }

  if (typeof input !== "object") {
    return null;
  }

  const record = input as Record<string, unknown>;
  if (record.data && typeof record.data === "object") {
    return unwrapMediaRecord(record.data as unknown);
  }

  if (record.attributes && typeof record.attributes === "object") {
    return unwrapMediaRecord(record.attributes as unknown);
  }

  return {
    id: typeof record.id === "number" ? record.id : undefined,
    url: typeof record.url === "string" ? record.url : undefined,
    name: typeof record.name === "string" ? record.name : undefined,
    alternativeText: typeof record.alternativeText === "string" ? record.alternativeText : undefined,
    width: typeof record.width === "number" ? record.width : undefined,
    height: typeof record.height === "number" ? record.height : undefined,
    formats: record.formats as StrapiMedia["formats"] | undefined,
  };
}

export function getStrapiMediaUrl(media?: unknown, fallback = "/logo.png") {
  const normalized = unwrapMediaRecord(media);
  if (!normalized) return fallback;

  const mediaUrl = normalized.url ?? normalized.formats?.large?.url ?? normalized.formats?.medium?.url ?? normalized.formats?.small?.url ?? normalized.formats?.thumbnail?.url;
  if (!mediaUrl) return fallback;

  return resolveMediaUrl(mediaUrl, fallback);
}

export function getStrapiMediaSource(media?: unknown): string | undefined {
  const normalized = unwrapMediaRecord(media);
  if (!normalized) return undefined;

  const mediaUrl = normalized.url ?? normalized.formats?.large?.url ?? normalized.formats?.medium?.url ?? normalized.formats?.small?.url ?? normalized.formats?.thumbnail?.url;
  return mediaUrl ? resolveMediaUrl(mediaUrl) : undefined;
}

export function getStrapiImageProps(media?: unknown, fallback = "/logo.png") {
  const normalized = unwrapMediaRecord(media);
  return {
    src: getStrapiMediaUrl(normalized ?? media, fallback),
    alt: normalized?.alternativeText ?? normalized?.name ?? "Industrial image",
  };
}
