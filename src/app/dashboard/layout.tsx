// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  HomeIcon,
  Squares2X2Icon,
  ShieldCheckIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const pathname = usePathname();

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
        {
          label: "Risk Metrics",
          href: "/dashboard/risk",
          icon: ShieldCheckIcon,
        },
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

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden transition-opacity",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={toggleSidebar}
      />

      <aside
        className={clsx(
          "fixed md:static z-40 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg border-r px-6 py-8 flex flex-col space-y-8 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <Link
          href="/"
          className="text-2xl font-extrabold text-[#00a76f] dark:text-white"
        >
          Evermount
        </Link>

        <nav className="flex-1 space-y-6">
          {navItems.map((section) => (
            <div key={section.label}>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 tracking-wider">
                {section.label}
              </p>
              <div className="space-y-2">
                {section.links.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition",
                      pathname === href
                        ? "bg-[#00a76f] text-white"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
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
