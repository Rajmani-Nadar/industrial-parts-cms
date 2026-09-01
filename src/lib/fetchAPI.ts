import { getStrapiEnv } from "@/lib/env";

export type JsonBody = Record<string, unknown>;

export type FetchAPIOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | JsonBody | string | null;
  populate?: string | string[];
  sort?: string | string[];
  filters?: Record<string, string | number | boolean | null | undefined>;
  fields?: string | string[];
};

export type StrapiCollectionResponse<T> = {
  data: Array<{ id: number | string; attributes: T }>;
  meta?: Record<string, unknown>;
};

export type StrapiSingleResponse<T> = {
  data: { id: number | string; attributes: T } | null;
  meta?: Record<string, unknown>;
};

function toQueryValue(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function buildQueryString(options: FetchAPIOptions): string {
  const params = new URLSearchParams();

  const populate = toQueryValue(options.populate);
  populate.forEach((item) => {
    if (item) params.append("populate", item);
  });

  const fields = toQueryValue(options.fields);
  fields.forEach((item) => {
    if (item) params.append("fields", item);
  });

  const sort = toQueryValue(options.sort);
  sort.forEach((item) => {
    if (item) params.append("sort", item);
  });

  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      params.append(`filters[${key}][$eq]`, String(value));
    });
  }

  return params.toString();
}

export async function fetchAPI<T>(endpoint: string, options: FetchAPIOptions = {}): Promise<T | null> {
  const { strapiUrl, apiToken, hasConfig } = getStrapiEnv();

  if (!hasConfig) {
    console.warn("Strapi is not configured. Falling back to local data.");
    return null;
  }

  const baseUrl = strapiUrl.replace(/\/$/, "");
  const url = new URL(`/api${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`, `${baseUrl}/`);
  const query = buildQueryString(options);

  if (query) {
    url.search = query;
  }

  const method = options.method ?? "GET";
  const headers = new Headers(options.headers ?? {});

  headers.set("Content-Type", "application/json");

  if (apiToken) {
    headers.set("Authorization", `Bearer ${apiToken}`);
  }

  let body: BodyInit | undefined;
  if (options.body && typeof options.body === "object" && !(options.body instanceof FormData) && !(options.body instanceof Blob)) {
    body = JSON.stringify(options.body);
  } else if (typeof options.body === "string") {
    body = options.body;
  }

  try {
    const response = await fetch(url.toString(), {
      ...options,
      method,
      headers,
      body,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(`Strapi request failed for ${endpoint}: ${response.status} ${response.statusText}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn(`Strapi request error for ${endpoint}:`, error);
    return null;
  }
}
