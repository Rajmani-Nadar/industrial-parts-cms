/**
 * API Client Utilities
 * Handles API calls with error handling and type safety
 */

export interface ApiRequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean>;
  timeout?: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, any>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.industrial.com";
const DEFAULT_TIMEOUT = 30000; // 30 seconds

/**
 * Build query string from object
 */
function buildQueryString(query: Record<string, any>): string {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.append(key, String(value));
    }
  });
  return params.toString();
}

/**
 * Handle API response
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let errorData: any = {};
    if (contentType?.includes("application/json")) {
      errorData = await response.json();
    }
    throw {
      status: response.status,
      message: errorData.message || response.statusText,
      code: errorData.code,
      details: errorData.details,
    } as ApiError;
  }

  if (!contentType?.includes("application/json")) {
    return (await response.text()) as T;
  }

  return response.json();
}

/**
 * API GET request
 */
export async function apiGet<T = any>(
  endpoint: string,
  options?: ApiRequestOptions
): Promise<T> {
  const url = new URL(endpoint, API_BASE_URL);

  if (options?.query) {
    url.search = buildQueryString(options.query);
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options?.timeout ?? DEFAULT_TIMEOUT
  );

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    return handleResponse<T>(response);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * API POST request
 */
export async function apiPost<T = any>(
  endpoint: string,
  data?: Record<string, any>,
  options?: ApiRequestOptions
): Promise<T> {
  const url = new URL(endpoint, API_BASE_URL);

  if (options?.query) {
    url.search = buildQueryString(options.query);
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options?.timeout ?? DEFAULT_TIMEOUT
  );

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    return handleResponse<T>(response);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * API PUT request
 */
export async function apiPut<T = any>(
  endpoint: string,
  data?: Record<string, any>,
  options?: ApiRequestOptions
): Promise<T> {
  const url = new URL(endpoint, API_BASE_URL);

  if (options?.query) {
    url.search = buildQueryString(options.query);
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options?.timeout ?? DEFAULT_TIMEOUT
  );

  try {
    const response = await fetch(url.toString(), {
      method: "PUT",
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    return handleResponse<T>(response);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * API DELETE request
 */
export async function apiDelete<T = any>(
  endpoint: string,
  options?: ApiRequestOptions
): Promise<T> {
  const url = new URL(endpoint, API_BASE_URL);

  if (options?.query) {
    url.search = buildQueryString(options.query);
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options?.timeout ?? DEFAULT_TIMEOUT
  );

  try {
    const response = await fetch(url.toString(), {
      method: "DELETE",
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    return handleResponse<T>(response);
  } finally {
    clearTimeout(timeout);
  }
}
