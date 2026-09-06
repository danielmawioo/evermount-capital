"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MoonIcon,
  SunIcon,
  BellIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";
import { useLocale } from "@/context/LocaleContext";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import Link from "next/link";
import { clearAuth } from "@/lib/auth-storage";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";

export default function Topbar() {
  const router = useRouter();
  const { theme, setTheme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const [greeting, setGreeting] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t("topbar.goodMorning"));
    else if (hour < 18) setGreeting(t("topbar.goodAfternoon"));
    else setGreeting(t("topbar.goodEvening"));
  }, [t]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node))
        setNotifOpen(false);
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      )
        setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      // Clear local session even if API call fails
      logger.warn("Logout API call failed; clearing session locally", {
        error: String(error),
      });
    }
    clearAuth();
    setLogoutMessage(t("topbar.loggedOut"));
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#0b0b12] border-b border-gray-100 dark:border-gray-800 shadow-sm px-4 py-4 md:px-6 flex items-center justify-between">
      {/* Left Greeting */}
      <div className="flex flex-col gap-1">
        <h1 className="text-base md:text-lg font-bold text-gray-800 dark:text-white">
          {greeting}
        </h1>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <RocketLaunchIcon className="w-3 h-3 text-[#00a76f]" />
          {t("topbar.tagline")}
        </p>

        {logoutMessage && (
          <div className="mt-2 px-3 py-2 text-xs font-semibold rounded-md bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 animate-fade-in">
            {logoutMessage}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4 relative">
        {/* Search Input */}
        <div className="hidden lg:block relative">
          <input
            type="text"
            placeholder={t("topbar.search")}
            className="rounded-md px-3 py-1.5 w-40 xl:w-48 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
        </div>

        {/* Language Selector */}
        <LanguageSwitcher />

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <BellIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-white" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-md p-4 text-sm z-50">
              <p className="font-bold">{t("topbar.notifications")}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {t("topbar.noNotifications")}
              </p>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-[#00a76f] transition"
          >
            <Image
              src="/images/avatar.avif"
              alt="User Avatar"
              width={36}
              height={36}
              className="object-cover rounded-full w-full h-full"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-md text-sm overflow-hidden transition-all z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-800 dark:text-white">
                  Daniel Mawioo
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mem No. 30280376
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    {t("topbar.currentAccount")}
                  </span>
                  <button className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                    {t("topbar.switch")}
                  </button>
                </div>
              </div>

              {/* Profile Management */}
              <div className="py-2">
                <Link
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {t("topbar.profileSettings")}
                </Link>
                <Link
                  href="/add-account"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {t("topbar.addAccount")}
                </Link>
                <Link
                  href="/manage-accounts"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {t("topbar.manageAccounts")}
                </Link>
              </div>

              {/* Fund Management */}
              <div className="border-t border-gray-200 dark:border-gray-700 py-2">
                <Link
                  href="/topup"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {t("topbar.topUp")}
                </Link>
                <Link
                  href="/withdraw"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {t("topbar.withdraw")}
                </Link>
              </div>

              {/* Theme Toggle */}
              <div className="flex justify-around items-center border-t border-gray-200 dark:border-gray-700 py-3">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex flex-col items-center text-xs transition ${
                    theme === "light"
                      ? "text-[#00a76f] font-semibold"
                      : "text-gray-700 dark:text-gray-400"
                  }`}
                >
                  <SunIcon className="w-5 h-5 mb-1" />
                  {t("topbar.light")}
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex flex-col items-center text-xs transition ${
                    theme === "dark"
                      ? "text-[#00a76f] font-semibold"
                      : "text-gray-700 dark:text-gray-400"
                  }`}
                >
                  <MoonIcon className="w-5 h-5 mb-1" />
                  {t("topbar.dark")}
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <button
                  onClick={handleLogout}
                  className="w-full py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm font-bold rounded hover:bg-red-200 dark:hover:bg-red-800 transition"
                >
                  {t("topbar.logout")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label={t("common.toggleTheme")}
        >
          {theme === "dark" ? (
            <SunIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
          ) : (
            <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>
    </header>
  );
}
