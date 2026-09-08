export const COOKIE_CONSENT_KEY = "industrial_cookie_consent";
export const COOKIE_CONSENT_VERSION = "1.0";

export type OptionalCookieCategory = "analytics" | "marketing";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
};

const defaultConsent: Omit<CookieConsent, "timestamp"> = {
  necessary: true,
  analytics: false,
  marketing: false,
  version: COOKIE_CONSENT_VERSION,
};

function isCookieConsent(value: unknown): value is CookieConsent {
  if (!value || typeof value !== "object") return false;

  const consent = value as Partial<CookieConsent>;
  return (
    consent.necessary === true &&
    typeof consent.analytics === "boolean" &&
    typeof consent.marketing === "boolean" &&
    typeof consent.timestamp === "string" &&
    consent.version === COOKIE_CONSENT_VERSION
  );
}

export function readCookieConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null;

  const entry = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${COOKIE_CONSENT_KEY}=`));

  if (!entry) return null;

  try {
    const value = JSON.parse(decodeURIComponent(entry.slice(COOKIE_CONSENT_KEY.length + 1)));
    return isCookieConsent(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(preferences: Pick<CookieConsent, "analytics" | "marketing">): CookieConsent {
  const consent: CookieConsent = {
    ...defaultConsent,
    ...preferences,
    timestamp: new Date().toISOString(),
  };

  document.cookie = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(JSON.stringify(consent))}; path=/; max-age=31536000; SameSite=Lax`;
  return consent;
}

export function hasConsent(category: "necessary" | OptionalCookieCategory): boolean {
  if (category === "necessary") return true;
  return readCookieConsent()?.[category] ?? false;
}