"use client";

import type { ExnessPartnerSummary } from "@/hooks/useTradingOps";

export interface ExnessPartnerCardProps {
  exnessPartner: ExnessPartnerSummary | null;
}

export default function ExnessPartnerCard({
  exnessPartner,
}: ExnessPartnerCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
        Exness Partner Broker
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        Partnership API for referral links, client reports, and commission data.
        Trading execution uses Exness MT5 above — not this API.
      </p>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <p>
          API:{" "}
          <span
            className={
              exnessPartner?.status?.connected
                ? "text-green-600 font-medium"
                : exnessPartner?.status?.enabled
                  ? "text-amber-600"
                  : "text-gray-500"
            }
          >
            {exnessPartner?.status?.connected
              ? "Connected"
              : exnessPartner?.status?.enabled
                ? "Not connected"
                : "Disabled"}
          </span>
        </p>
        {exnessPartner?.summary?.wallet?.summary_equity != null && (
          <p>
            Wallet equity:{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              ${exnessPartner.summary.wallet.summary_equity.toLocaleString()}
            </span>
          </p>
        )}
        {exnessPartner?.summary?.clients?.total != null && (
          <p>
            Referred clients:{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {exnessPartner.summary.clients.total}
            </span>
          </p>
        )}
        {exnessPartner?.summary?.rewards?.totalCommissionUsd != null && (
          <p>
            Commission (USD):{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              ${exnessPartner.summary.rewards.totalCommissionUsd.toLocaleString()}
            </span>
          </p>
        )}
      </div>
      {(exnessPartner?.summary?.referralLink ||
        exnessPartner?.status?.referralLink) && (
        <p className="text-xs text-gray-500 break-all">
          Referral link
          {exnessPartner?.summary?.referralLinkSource === "configured" ||
          exnessPartner?.status?.referralLinkSource === "configured"
            ? " (configured)"
            : ""}
          :{" "}
          <a
            href={
              exnessPartner?.summary?.referralLink ||
              exnessPartner?.status?.referralLink
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00a76f] hover:underline"
          >
            {exnessPartner?.summary?.referralLink ||
              exnessPartner?.status?.referralLink}
          </a>
        </p>
      )}
      {exnessPartner?.status?.error && (
        <p className="text-xs text-amber-600 mt-2">{exnessPartner.status.error}</p>
      )}
      {!exnessPartner?.status?.enabled &&
        !exnessPartner?.summary?.referralLink &&
        !exnessPartner?.status?.referralLink && (
        <p className="text-xs text-gray-500 mt-2">
          Set EXNESS_PARTNER_REFERRAL_LINK or enable EXNESS_PARTNER_ENABLED with
          PPA credentials in backend env.
        </p>
      )}
    </div>
  );
}
