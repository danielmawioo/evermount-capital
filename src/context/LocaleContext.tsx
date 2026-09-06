"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  LOCALE_META,
  LOCALE_STORAGE_KEY,
  type Locale,
  isLocale,
  localeFromBrowser,
} from "@/i18n/locales";
import { messages } from "@/i18n/messages";
import { buildEnglishIndex, lookupTranslation } from "@/i18n/lookup";
import { logger } from "@/lib/logger";

const englishIndex = buildEnglishIndex(messages.en);

type TranslateVars = Record<string, string | number>;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: TranslateVars) => string;
  tList: (key: string) => string[];
  tx: (text: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch (error) {
    logger.warn("Failed to read locale from localStorage", {
      error: String(error),
    });
  }
  return localeFromBrowser();
}

function interpolate(value: string, vars?: TranslateVars): string {
  if (!vars) return value;
  return Object.entries(vars).reduce(
    (text, [name, replacement]) =>
      text.replaceAll(`{${name}}`, String(replacement)),
    value,
  );
}

function applyHtmlLang(locale: Locale) {
  if (typeof document === "undefined") return;
  const meta = LOCALE_META[locale];
  document.documentElement.lang = meta.htmlLang;
  document.documentElement.dir = meta.dir;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const next = readStoredLocale();
    setLocaleState(next);
    applyHtmlLang(next);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    applyHtmlLang(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch (error) {
      logger.warn("Failed to save locale to localStorage", {
        error: String(error),
      });
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: TranslateVars) => {
      const dict = messages[locale];
      const fallback = messages.en;
      const value = dict[key] ?? fallback[key];
      if (typeof value !== "string") return key;
      return interpolate(value, vars);
    },
    [locale],
  );

  const tList = useCallback(
    (key: string) => {
      const dict = messages[locale];
      const fallback = messages.en;
      const value = dict[key] ?? fallback[key];
      return Array.isArray(value) ? value : [];
    },
    [locale],
  );

  const tx = useCallback(
    (text: string) => lookupTranslation(messages, englishIndex, locale, text),
    [locale],
  );

  const context = useMemo(
    () => ({ locale, setLocale, t, tList, tx }),
    [locale, setLocale, t, tList, tx],
  );

  return (
    <LocaleContext.Provider value={context}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  if (!context) {
    return {
      locale: "en",
      setLocale: () => undefined,
      t: (key, vars) => {
        const value = messages.en[key];
        return typeof value === "string" ? interpolate(value, vars) : key;
      },
      tList: (key) => {
        const value = messages.en[key];
        return Array.isArray(value) ? value : [];
      },
      tx: (text) => lookupTranslation(messages, englishIndex, "en", text),
    };
  }
  return context;
}
