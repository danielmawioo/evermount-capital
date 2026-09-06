"use client";

import TranslateTree from "@/app/components/TranslateTree";

import Link from "next/link";
import {
  PlusIcon,
  MinusIcon,
  BoltIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { canPerformAction, InvestorTier } from "@/lib/investor-tiers";

interface InvestorQuickActionsProps {
  tier: InvestorTier;
  kycApproved: boolean;
}

export default function InvestorQuickActions({
  tier,
  kycApproved,
}: InvestorQuickActionsProps) {
  if (!kycApproved) {
    return (
      <TranslateTree>
        <Link
          href="/dashboard/kyc"
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-semibold py-4 px-4 transition hover:bg-amber-100 dark:hover:bg-amber-900/30"
        >
          <ShieldCheckIcon className="w-5 h-5" />
          Complete verification to start investing
        </Link>
      </TranslateTree>
    );
  }

  const actions = [
    {
      id: "deposit",
      label: "Deposit",
      href: "/dashboard/deposit",
      icon: PlusIcon,
      enabled: canPerformAction(tier, "deposit"),
      color:
        "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30",
    },
    {
      id: "withdraw",
      label: "Withdraw",
      href: "/dashboard/withdraw",
      icon: MinusIcon,
      enabled: canPerformAction(tier, "withdraw"),
      color:
        "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30",
    },
    {
      id: "trade",
      label: "Trade",
      href: "/dashboard/trade",
      icon: BoltIcon,
      enabled: canPerformAction(tier, "invest"),
      color:
        "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30",
    },
    {
      id: "statements",
      label: "Statements",
      href: "/dashboard/statements",
      icon: DocumentTextIcon,
      enabled: canPerformAction(tier, "statements"),
      color:
        "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
    },
  ].filter((a) => a.enabled);

  const showSupport = canPerformAction(tier, "dedicatedSupport");

  return (
    <TranslateTree>
      <div className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actions.map(({ id, label, href, icon: Icon, color }) => (
            <Link
              key={id}
              href={href}
              className={`flex flex-col items-center justify-center gap-2 rounded-xl border font-semibold py-4 px-3 text-center transition ${color}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </div>
        {showSupport && (
          <Link
            href="/dashboard/help"
            className="flex items-center justify-center gap-2 rounded-lg border border-[#00a76f]/30 bg-[#00a76f]/5 text-[#00a76f] text-sm font-medium py-2.5 hover:bg-[#00a76f]/10 transition"
          >
            <UserGroupIcon className="w-4 h-4" />
            Contact your {tier.support.toLowerCase()}
          </Link>
        )}
      </div>
    </TranslateTree>
  );
}
