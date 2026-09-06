export const LOCALES = ["en", "fr", "es", "de", "nl", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_STORAGE_KEY = "evermount-locale";

export const LOCALE_META: Record<
  Locale,
  { code: Locale; name: string; htmlLang: string; dir: "ltr" | "rtl" }
> = {
  en: { code: "en", name: "English", htmlLang: "en", dir: "ltr" },
  fr: { code: "fr", name: "Français", htmlLang: "fr", dir: "ltr" },
  es: { code: "es", name: "Español", htmlLang: "es", dir: "ltr" },
  de: { code: "de", name: "Deutsch", htmlLang: "de", dir: "ltr" },
  nl: { code: "nl", name: "Nederlands", htmlLang: "nl", dir: "ltr" },
  ar: { code: "ar", name: "العربية", htmlLang: "ar-AE", dir: "rtl" },
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
