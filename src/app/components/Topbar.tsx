"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MoonIcon,
  SunIcon,
  BellIcon,
  GlobeAltIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";

export default function Topbar() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [greeting, setGreeting] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [selectedLang, setSelectedLang] = useState("🇬🇧 English");

  const langRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Set greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning 🌅");
    else if (hour < 18) setGreeting("Good afternoon ☀️");
    else setGreeting("Good evening 🌙");
  }, []);

  // Close dropdowns if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node))
        setLangOpen(false);
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

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setLogoutMessage("✅ Logged out successfully!");

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
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Let’s grow your portfolio today 🚀
        </p>

        {logoutMessage && (
          <div className="mt-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md px-3 py-2 text-xs font-semibold transition-all animate-fade-in">
            {logoutMessage}
          </div>
        )}
      </div>

      {/* Right tools */}
      <div className="flex items-center gap-4 relative">
        {/* Search */}
        <div className="relative hidden md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-md px-3 py-1.5 w-48 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
        </div>

        {/* Language selector */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => {
              setLangOpen((prev) => !prev);
              setNotifOpen(false);
              setProfileOpen(false);
            }}
            className="flex items-center gap-1 px-2 py-1.5 text-sm text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <GlobeAltIcon className="w-5 h-5" />
            <span>{selectedLang}</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {langOpen && (
            <ul className="absolute right-0 mt-2 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 rounded shadow-md w-36 z-50 border dark:border-gray-700">
              {["🇬🇧 English", "🇫🇷 French", "🇪🇸 Spanish"].map((lang) => (
                <li
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setLangOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    selectedLang === lang
                      ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                      : ""
                  }`}
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setLangOpen(false);
              setProfileOpen(false);
            }}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <BellIcon className="w-5 h-5 text-gray-600 dark:text-white" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-md border border-gray-100 dark:border-gray-700 z-50 p-4 text-sm">
              <p className="font-bold">Notifications</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                No new notifications.
              </p>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotifOpen(false);
              setLangOpen(false);
            }}
            className="rounded-full w-9 h-9 overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-[#00a76f]"
          >
            <Image
              src="/images/avatar.avif"
              alt="User Avatar"
              width={36}
              height={36}
              className="object-cover rounded-full"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-md border border-gray-100 dark:border-gray-700 z-50 text-sm overflow-hidden transition-all">
              <Link
                href="/settings"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                Edit Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                Account Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500 dark:text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunIcon className="w-5 h-5 text-yellow-400" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>
    </header>
  );
}
