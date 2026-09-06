"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COOKIE_ACCEPTED_KEY = "cookie-accepted";
const COOKIE_REJECTED_KEY = "cookie-rejected";
const REJECT_EXPIRY_HOURS = 24;

import { useLocale } from "@/context/LocaleContext";

export default function CookieConsent() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_ACCEPTED_KEY);
    const rejected = localStorage.getItem(COOKIE_REJECTED_KEY);

    if (!accepted) {
      if (!rejected) {
        setTimeout(() => setVisible(true), 500);
      } else {
        const rejectedTime = parseInt(rejected, 10);
        const now = Date.now();
        const hoursPassed = (now - rejectedTime) / (1000 * 60 * 60);

        if (hoursPassed > REJECT_EXPIRY_HOURS) {
          localStorage.removeItem(COOKIE_REJECTED_KEY);
          setTimeout(() => setVisible(true), 500);
        }
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_ACCEPTED_KEY, "true");
    localStorage.removeItem(COOKIE_REJECTED_KEY);
    setVisible(false);
  };

  const handleReject = () => {
    const now = Date.now();
    localStorage.setItem(COOKIE_REJECTED_KEY, now.toString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-[1000] flex justify-center px-4 sm:px-6">
      <div className="w-full max-w-4xl bg-gradient-to-r from-white via-[#f0fdf8] to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl px-6 py-5 animate-fade-in backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-sm sm:text-base text-gray-800 dark:text-gray-200">
          <p className="text-center sm:text-left leading-relaxed flex-1">
            {t("cookie.body")}{" "}
            <Link
              href="/privacy"
              className="underline text-[#00a76f] hover:text-emerald-700"
            >
              {t("common.learnMore")}
            </Link>
          </p>

          <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
            <button
              onClick={handleAccept}
              className="bg-[#00a76f] hover:bg-emerald-700 text-white px-5 py-2 rounded-md font-semibold text-sm shadow transition"
            >
              {t("cookie.accept")}
            </button>
            <button
              onClick={handleReject}
              className="bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 px-5 py-2 rounded-md font-semibold text-sm border border-red-300 dark:border-red-800 transition"
            >
              {t("cookie.reject")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
