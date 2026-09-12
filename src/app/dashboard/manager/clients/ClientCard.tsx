"use client";

import { CurrencyDollarIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import AllocationPreviewPanel from "./AllocationPreviewPanel";
import { formatCurrency } from "@/lib/format";
import type {
  Client,
  ClientForm,
  InvestmentOption,
} from "@/hooks/useManagerClients";
import type { AllocationPreview } from "./AllocationPreviewPanel";

const LOCK_IN_OPTIONS = [
  { value: 6, label: "6 months" },
  { value: 12, label: "12 months" },
  { value: 24, label: "24 months" },
] as const;

function formatUsd(n: number) {
  return formatCurrency(n, "USD", { maximumFractionDigits: 0 });
}

type Props = {
  client: Client;
  options: InvestmentOption[];
  form: ClientForm;
  preview?: AllocationPreview;
  isPreviewLoading: boolean;
  allocating: string | null;
  unassigning: string | null;
  updateForm: (
    clientId: string,
    patch: Partial<ClientForm>,
    maxBalance?: number,
  ) => void;
  requestAllocate: (clientId: string) => void;
  handleUnassign: (clientId: string, name: string) => void;
};

export default function ClientCard({
  client,
  options,
  form,
  preview,
  isPreviewLoading,
  allocating,
  unassigning,
  updateForm,
  requestAllocate,
  handleUnassign,
}: Props) {
  const balance = client.wallet?.availableBalance ?? 0;
  const canUnassign = client.activeInvestments.length === 0;
  const parsedAmount = parseFloat(form.amount) || 0;
  const exceedsBalance = parsedAmount > balance;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {client.fullName}
          </h2>
          <p className="text-sm text-gray-500">{client.email}</p>
          <p className="text-xs text-gray-400 mt-1">KYC: {client.kycStatus}</p>
        </div>
        <div className="text-right space-y-2">
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
              <CurrencyDollarIcon className="w-4 h-4" />
              Available
            </p>
            <p className="text-xl font-bold text-[#00a76f] tabular-nums">
              {formatUsd(balance)}
            </p>
            <p className="text-xs text-gray-500">
              Invested: {formatUsd(client.totalInvested)}
            </p>
          </div>
          {canUnassign ? (
            <button
              type="button"
              onClick={() =>
                void handleUnassign(client.clientId, client.fullName)
              }
              disabled={unassigning === client.clientId}
              className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              <UserMinusIcon className="w-3.5 h-3.5" />
              {unassigning === client.clientId ? "Removing…" : "Unassign"}
            </button>
          ) : null}
        </div>
      </div>

      {client.activeInvestments.length > 0 ? (
        <div className="mb-4 text-sm">
          <p className="text-xs uppercase text-gray-500 mb-2">
            Active allocations
          </p>
          <ul className="space-y-1">
            {client.activeInvestments.map((inv) => (
              <li
                key={inv.assetName + inv.amountInvested}
                className="text-gray-700 dark:text-gray-300"
              >
                {inv.assetName}
                {inv.strategyKey ? (
                  <span className="text-gray-500"> ({inv.strategyKey})</span>
                ) : null}{" "}
                — {formatUsd(inv.currentValue ?? inv.amountInvested)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {balance > 0 ? (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Allocate strategy
          </p>
          <div className="flex flex-wrap gap-3 items-end">
            <label className="block text-xs text-gray-500 min-w-[200px] flex-1">
              Strategy product
              <select
                value={form.investmentOptionId}
                onChange={(e) =>
                  updateForm(client.clientId, {
                    investmentOptionId: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                {options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                    {o.strategyKey ? ` (${o.strategyKey})` : ""} — {o.riskLevel}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs text-gray-500 w-44">
              Amount (USD)
              <div className="mt-1 flex gap-1">
                <input
                  type="number"
                  min={1}
                  max={balance}
                  step="0.01"
                  value={form.amount}
                  onChange={(e) =>
                    updateForm(
                      client.clientId,
                      { amount: e.target.value },
                      balance,
                    )
                  }
                  className={`w-full rounded-lg border bg-white dark:bg-gray-900 px-3 py-2 text-sm ${
                    exceedsBalance
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                <button
                  type="button"
                  onClick={() =>
                    updateForm(
                      client.clientId,
                      { amount: String(balance) },
                      balance,
                    )
                  }
                  className="shrink-0 px-2 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  title="Use full available balance"
                >
                  Max
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Max {formatUsd(balance)}
              </p>
              {exceedsBalance ? (
                <p className="text-[10px] text-red-600 mt-0.5">
                  Cannot exceed available balance
                </p>
              ) : null}
            </label>
            <label className="block text-xs text-gray-500 w-36">
              Lock-in
              <select
                value={form.lockInMonths}
                onChange={(e) =>
                  updateForm(client.clientId, {
                    lockInMonths: Number(e.target.value),
                  })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                {LOCK_IN_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              disabled={
                allocating === client.clientId ||
                isPreviewLoading ||
                exceedsBalance ||
                parsedAmount <= 0 ||
                (preview !== undefined && !preview?.canAllocate)
              }
              onClick={() => requestAllocate(client.clientId)}
              className="px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white text-sm rounded-lg disabled:opacity-50"
            >
              Review & Allocate
            </button>
          </div>
          <AllocationPreviewPanel
            preview={preview ?? null}
            loading={isPreviewLoading}
          />
        </div>
      ) : null}
    </div>
  );
}
