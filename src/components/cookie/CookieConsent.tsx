"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import {
  type CookieConsent as CookieConsentState,
  readCookieConsent,
  saveCookieConsent,
} from "@/lib/cookie-consent";

type PreferenceKey = "analytics" | "marketing";

const preferenceDetails: Array<{
  key: PreferenceKey;
  label: string;
  description: string;
}> = [
  {
    key: "analytics",
    label: "Analytics",
    description: "Helps us understand how visitors use the website and improve the experience.",
  },
  {
    key: "marketing",
    label: "Marketing",
    description: "Used for advertising, remarketing, or marketing measurement.",
  },
];

function dispatchCookieSettingsEvent() {
  window.dispatchEvent(new CustomEvent("industrial:open-cookie-settings"));
}

export function CookieConsent() {
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [preferences, setPreferences] = useState({ analytics: false, marketing: false });
  const [isReady, setIsReady] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const storedConsent = readCookieConsent();
    const initializeConsent = () => {
      setConsent(storedConsent);
      setPreferences({
        analytics: storedConsent?.analytics ?? false,
        marketing: storedConsent?.marketing ?? false,
      });
      setIsReady(true);
    };
    queueMicrotask(initializeConsent);

    const openPreferences = () => {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      setIsPreferencesOpen(true);
    };
    window.addEventListener("industrial:open-cookie-settings", openPreferences);
    return () => {
      window.removeEventListener("industrial:open-cookie-settings", openPreferences);
    };
  }, []);

  useEffect(() => {
    if (!isPreferencesOpen) return;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPreferencesOpen(false);
        previouslyFocusedRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isPreferencesOpen]);

  const closePreferences = () => {
    setIsPreferencesOpen(false);
    previouslyFocusedRef.current?.focus();
  };

  const commitConsent = (nextPreferences: { analytics: boolean; marketing: boolean }) => {
    const nextConsent = saveCookieConsent(nextPreferences);
    setConsent(nextConsent);
    setPreferences(nextPreferences);
    setIsPreferencesOpen(false);
    previouslyFocusedRef.current?.focus();
  };

  if (!isReady) return null;

  return (
    <>
      {!consent && !isPreferencesOpen ? (
        <section
          className="cookie-consent-enter fixed inset-x-4 bottom-32 z-[1060] mx-auto max-w-3xl border border-slate-200 bg-white p-5 shadow-2xl sm:inset-x-6 sm:p-6 lg:bottom-6 lg:max-w-4xl"
          aria-label="Cookie consent"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="max-w-2xl">
              <p className="text-lg font-semibold text-slate-900">We value your privacy</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We use cookies to improve your browsing experience, analyze website traffic, and remember your preferences. You can accept all cookies or manage your choices.
              </p>
              <Link href="/privacy" className="mt-2 inline-block text-sm font-medium text-slate-700 underline decoration-orange-500 underline-offset-4 hover:text-orange-700">
                Privacy Policy
              </Link>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:min-w-48">
              <button type="button" onClick={() => commitConsent({ analytics: true, marketing: true })} className="w-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
                Accept All
              </button>
              <button type="button" onClick={() => commitConsent({ analytics: false, marketing: false })} className="w-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-500 hover:bg-slate-50">
                Reject Non-Essential
              </button>
              <button type="button" onClick={() => { previouslyFocusedRef.current = document.activeElement as HTMLElement | null; setIsPreferencesOpen(true); }} className="w-full px-4 py-2 text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-orange-700">
                Manage Preferences
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {isPreferencesOpen ? (
        <div className="fixed inset-0 z-[1060] flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePreferences(); }}>
          <section className="cookie-consent-enter max-h-[90vh] w-full overflow-y-auto border border-slate-200 bg-white p-6 shadow-2xl sm:max-w-xl sm:p-8" role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-orange-600">Privacy controls</p>
                <h2 id="cookie-preferences-title" className="mt-2 text-2xl font-semibold text-slate-900">Cookie Preferences</h2>
              </div>
              <button ref={closeButtonRef} type="button" onClick={closePreferences} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Close cookie preferences">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Necessary cookies are always enabled. Optional categories only apply to services that are added to this website and enabled with your permission.
            </p>

            <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
              <div className="flex items-start justify-between gap-6 py-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Necessary</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Required for the website to function correctly.</p>
                </div>
                <span className="mt-1 shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-500">Always on</span>
              </div>
              {preferenceDetails.map(({ key, label, description }) => (
                <div key={key} className="flex items-start justify-between gap-6 py-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{label}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                  </div>
                  <button type="button" role="switch" aria-checked={preferences[key]} aria-label={`${label} cookies`} onClick={() => setPreferences((current) => ({ ...current, [key]: !current[key] }))} className={`relative mt-1 inline-flex h-6 w-11 shrink-0 overflow-hidden rounded-full p-0 transition-colors ${preferences[key] ? "bg-orange-500" : "bg-slate-300"}`}>
                    <span className={`absolute left-1 top-1 h-4 w-4 rounded-full border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.28)] transition-transform ${preferences[key] ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => commitConsent({ analytics: false, marketing: false })} className="border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-500 hover:bg-slate-50">Reject Non-Essential</button>
              <button type="button" onClick={() => commitConsent({ analytics: true, marketing: true })} className="border border-orange-500 px-4 py-2.5 text-sm font-semibold text-orange-700 hover:bg-orange-50">Accept All</button>
              <button type="button" onClick={() => commitConsent(preferences)} className="bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Save Preferences</button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

export function openCookieSettings() {
  if (typeof window !== "undefined") dispatchCookieSettingsEvent();
}