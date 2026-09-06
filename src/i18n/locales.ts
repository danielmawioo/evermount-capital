export const LOCALES = ["en", "fr", "es", "de", "nl"] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_STORAGE_KEY = "evermount-locale";

export const LOCALE_META: Record<
  Locale,
  { code: Locale; name: string; htmlLang: string }
> = {
  en: { code: "en", name: "English", htmlLang: "en" },
  fr: { code: "fr", name: "Français", htmlLang: "fr" },
  es: { code: "es", name: "Español", htmlLang: "es" },
  de: { code: "de", name: "Deutsch", htmlLang: "de" },
  nl: { code: "nl", name: "Nederlands", htmlLang: "nl" },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function localeFromBrowser(
  language = typeof navigator === "undefined" ? "en" : navigator.language,
): Locale {
  const prefix = language.toLowerCase().split("-")[0];
  if (isLocale(prefix)) return prefix;
  return "en";
}
