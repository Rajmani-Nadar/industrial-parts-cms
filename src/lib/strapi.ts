import { getStrapiEnv } from "@/lib/env";

export type StrapiQueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | string[]
  | number[]
  | boolean[];

export type StrapiQuery = Record<string, StrapiQueryValue>;

export function buildQuery(query: StrapiQuery = {}): string {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined) {
          params.append(key, String(item));
        }
      });
      return;
    }

    if (typeof value === "boolean") {
      params.append(key, value ? "true" : "false");
      return;
    }

    params.append(key, String(value));
  });

  return params.toString();
}

export function populateHelper(fields: string | string[] | undefined): string {
  if (!fields) {
    return "populate=*";
  }

  const normalized = Array.isArray(fields) ? fields : [fields];
  const params = new URLSearchParams();

  normalized.filter(Boolean).forEach((field, index) => {
    params.append(`populate[${index}]`, field);
  });

  return params.toString() || "populate=*";
}

export async function get<T>(
  endpoint: string,
  query: StrapiQuery = {},
  init: RequestInit = {},
): Promise<T | null> {
  const { strapiUrl, apiToken, hasConfig } = getStrapiEnv();

  if (!hasConfig) {
    return null;
  }

  const base = strapiUrl.replace(/\/$/, "");
  const url = new URL(`/api${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`, `${base}/`);
  const queryString = buildQuery(query);

  if (queryString) {
    url.search = queryString;
  }

  try {
    const response = await fetch(url.toString(), {
      ...init,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
        ...(init.headers ?? {}),
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(`Strapi fetch failed for ${url.toString()}: ${response.status}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn("Strapi request error:", error);
    return null;
  }
}

export async function getBySlug<T>(
  collection: string,
  slug: string,
  query: StrapiQuery = {},
  init: RequestInit = {},
): Promise<T | null> {
  return get<T>(collection, { ...query, "filters[slug][$eq]": slug }, init);
}

export async function post<T>(
  endpoint: string,
  body: Record<string, unknown>,
  init: RequestInit = {},
): Promise<T | null> {
  const { strapiUrl, apiToken, hasConfig } = getStrapiEnv();

  if (!hasConfig) {
    return null;
  }

  try {
    const response = await fetch(`${strapiUrl.replace(/\/$/, "")}/api${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`, {
      ...init,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
        ...(init.headers ?? {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.warn(`Strapi POST failed for ${endpoint}: ${response.status}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn("Strapi POST error:", error);
    return null;
  }
}
