"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  HomeIcon,
  Squares2X2Icon,
  WalletIcon,
  ArrowsRightLeftIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  XMarkIcon,
  BoltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useInvestor } from "@/hooks/useInvestor";

interface SidebarProps {
  onClose?: () => void;
}

interface NavLink {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  links: NavLink[];
}

const investorLinks: NavLink[] = [
  { label: "Overview", href: "/dashboard", icon: HomeIcon },
  { label: "Trade", href: "/dashboard/trade", icon: BoltIcon },
  { label: "Portfolio", href: "/dashboard/portfolio", icon: Squares2X2Icon },
  { label: "Wallet", href: "/dashboard/wallets", icon: WalletIcon },
  { label: "Transactions", href: "/dashboard/transactions", icon: ArrowsRightLeftIcon },
  { label: "Documents", href: "/dashboard/statements", icon: DocumentTextIcon },
  { label: "Verification", href: "/dashboard/kyc", icon: DocumentDuplicateIcon },
  { label: "Help", href: "/dashboard/help", icon: QuestionMarkCircleIcon },
  { label: "Settings", href: "/dashboard/setting", icon: Cog6ToothIcon },
];

const adminLinks: NavLink[] = [
  { label: "Users", href: "/dashboard/admin/users", icon: UsersIcon },
  { label: "KYC Review", href: "/dashboard/admin/kyc", icon: DocumentDuplicateIcon },
  { label: "Trading Ops", href: "/dashboard/admin/ops", icon: BoltIcon },
  { label: "Compliance", href: "/dashboard/admin/compliance", icon: ShieldCheckIcon },
  { label: "Security", href: "/dashboard/admin/security", icon: ShieldCheckIcon },
];

const managerLinks: NavLink[] = [
  { label: "Managers", href: "/dashboard/admin/managers", icon: BriefcaseIcon },
  { label: "Admin Settings", href: "/dashboard/admin/settings", icon: Cog6ToothIcon },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { profile, tier, isAdmin, isManager, loading } = useInvestor();

  const sections: NavSection[] = [
    { title: "Investor", links: investorLinks },
  ];

  if (isAdmin) {
    sections.push({ title: "Admin", links: adminLinks });
  }
  if (isAdmin || isManager) {
    sections.push({ title: "Management", links: managerLinks });
  }

  return (
    <aside className="h-screen w-64 bg-white dark:bg-[#0f1117] border-r border-gray-200 dark:border-gray-800 shadow-md flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="text-2xl font-extrabold text-[#00a76f] dark:text-white"
          onClick={onClose}
        >
          Evermount
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>

      {!loading && profile && (
        <div className="mb-6 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 px-3 py-2.5">
          <p className="text-xs text-gray-500 dark:text-gray-400">Your plan</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {tier.label}
          </p>
        </div>
      )}

      <nav className="flex flex-col flex-1 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-xs uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider pl-2 mb-2">
              {section.title}
            </p>
            <div className="flex flex-col space-y-1">
              {section.links.map(({ label, href, icon: Icon }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/dashboard" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition",
                      isActive
                        ? "bg-[#00a76f] text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
