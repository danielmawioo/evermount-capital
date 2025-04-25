"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const navItems = [
  {
    label: "Main",
    links: [
      { label: "Overview", href: "/dashboard", icon: HomeIcon },
      {
        label: "Portfolio",
        href: "/dashboard/portfolio",
        icon: Squares2X2Icon,
      },
      { label: "Risk Metrics", href: "/dashboard/risk", icon: ShieldCheckIcon },
    ],
  },
  {
    label: "Management",
    links: [
      {
        label: "Transactions",
        href: "/dashboard/transactions",
        icon: ChartBarIcon,
      },
      { label: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
    ],
  },
];

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden transition-opacity",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed md:static z-40 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800 px-6 py-8 flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-[#00a76f] dark:text-white mb-10"
        >
          Evermount
        </Link>

        {/* Navigation Sections */}
        <nav className="flex-1 space-y-8 overflow-y-auto">
          {navItems.map((section) => (
            <div key={section.label}>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3 tracking-wider pl-1">
                {section.label}
              </p>
              <div className="space-y-2">
                {section.links.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition group",
                      pathname === href
                        ? "bg-[#00a76f] text-white shadow"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon
                      className={clsx(
                        "w-5 h-5",
                        pathname === href ? "text-white" : "text-[#00a76f]"
                      )}
                    />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
