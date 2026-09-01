export type StrapiEnvConfig = {
  strapiUrl: string;
  apiToken: string;
  hasConfig: boolean;
};

const DEFAULT_STRAPI_URL = "http://localhost:1337";

export function getStrapiEnv(): StrapiEnvConfig {
  const strapiUrl = (process.env.NEXT_PUBLIC_STRAPI_URL ?? DEFAULT_STRAPI_URL).trim();
  const apiToken = (process.env.STRAPI_API_TOKEN ?? "").trim();

  return {
    strapiUrl,
    apiToken,
    hasConfig: Boolean(strapiUrl && apiToken),
  };
}

export function validateStrapiEnv(): StrapiEnvConfig {
  const config = getStrapiEnv();

  if (!config.strapiUrl) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is required.");
  }

  if (!config.apiToken) {
    throw new Error("STRAPI_API_TOKEN is required for content sync.");
  }

  return config;
}

export function hasStrapiConfig(): boolean {
  return getStrapiEnv().hasConfig;
}
