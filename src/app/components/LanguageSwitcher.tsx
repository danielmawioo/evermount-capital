"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useLocale } from "@/context/LocaleContext";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/locales";

export default function LanguageSwitcher({
  align = "right",
}: {
  align?: "left" | "right";
}) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLocale = (next: Locale) => {
    setLocale(next);
    setOpen(false);
  };

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("common.language")}
        className="flex items-center gap-1 px-2 py-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">{LOCALE_META[locale].name}</span>
        <ChevronDownIcon className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("common.language")}
          className={`absolute mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-md text-sm z-50 ${
            align === "left" ? "start-0" : "end-0"
          }`}
        >
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={locale === code}
                onClick={() => selectLocale(code)}
                className={`w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  locale === code
                    ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                    : ""
                }`}
              >
                {LOCALE_META[code].name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
