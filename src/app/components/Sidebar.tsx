"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  HomeIcon,
  Squares2X2Icon,
  BanknotesIcon,
  WalletIcon,
  ArrowsRightLeftIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  BriefcaseIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const pathname = usePathname();

  const navSections = [
    {
      title: "Invest",
      links: [
        { label: "Home", href: "/dashboard", icon: HomeIcon },
        {
          label: "Portfolio",
          href: "/dashboard/portfolio",
          icon: Squares2X2Icon,
        },
        { label: "My Funds", href: "/dashboard/funds", icon: BanknotesIcon },
        { label: "Wallets", href: "/dashboard/wallets", icon: WalletIcon },
        {
          label: "Transactions",
          href: "/dashboard/transactions",
          icon: ArrowsRightLeftIcon,
        },
        { label: "Library", href: "/dashboard/library", icon: BookOpenIcon },
        {
          label: "Help Center",
          href: "/dashboard/help",
          icon: QuestionMarkCircleIcon,
        },
      ],
    },
    {
      title: "Admin",
      links: [
        {
          label: "User Management",
          href: "/dashboard/admin/users",
          icon: UsersIcon,
        },
        {
          label: "KYC Verifications",
          href: "/dashboard/admin/kyc",
          icon: DocumentDuplicateIcon,
        },
      ],
    },
    {
      title: "Managers",
      links: [
        {
          label: "Managers",
          href: "/dashboard/admin/managers",
          icon: BriefcaseIcon,
        },
        {
          label: "Settings",
          href: "/dashboard/admin/settings",
          icon: Cog6ToothIcon,
        },
      ],
    },
  ];

  return (
    <aside className="h-screen w-64 fixed md:static bg-white dark:bg-[#0f1117] border-r border-gray-200 dark:border-gray-800 shadow-md flex flex-col p-6 space-y-10 overflow-y-auto">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-extrabold text-[#00a76f] dark:text-white mb-4"
      >
        Evermount
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col flex-1 space-y-8">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="text-xs uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider pl-2 mb-3">
              {section.title}
            </p>
            <div className="flex flex-col space-y-2">
              {section.links.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition",
                    pathname === href
                      ? "bg-gradient-to-r from-green-400 via-emerald-500 to-yellow-400 text-white shadow"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
