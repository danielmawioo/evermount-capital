import type { Locale } from "./locales";
import type { Messages } from "./types";

export function normalizeCopy(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function buildEnglishIndex(en: Messages): Map<string, string> {
  const index = new Map<string, string>();
  for (const [key, value] of Object.entries(en)) {
    if (typeof value !== "string") continue;
    const normalized = normalizeCopy(value);
    if (normalized.length < 2) continue;
    if (!index.has(normalized)) {
      index.set(normalized, key);
    }
  }
  return index;
}

export function lookupTranslation(
  catalog: Record<Locale, Messages>,
  index: Map<string, string>,
  locale: Locale,
  text: string,
): string {
  const normalized = normalizeCopy(text);
  if (!normalized) return text;
  const key = index.get(normalized);
  if (!key) return text;
  const translated = catalog[locale][key] ?? catalog.en[key];
  return typeof translated === "string" ? translated : text;
}
