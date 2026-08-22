"use client";

import { useEffect } from "react";
import {
  ArrowPathIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  PlusIcon,
  XMarkIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useInvestor } from "@/hooks/useInvestor";
import { useManagerClients } from "@/hooks/useManagerClients";
import AllocationPreviewPanel from "./AllocationPreviewPanel";

const LOCK_IN_OPTIONS = [
  { value: 6, label: "6 months" },
  { value: 12, label: "12 months" },
  { value: 24, label: "24 months" },
] as const;

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ManagerClientsPage() {
  const router = useRouter();
  const { isAdmin, isManager, loading: authLoading } = useInvestor();
  const {
    clients,
    options,
    loading,
    allocating,
    previewLoading,
    previews,
    forms,
    confirmClientId,
    setConfirmClientId,
    unassigning,
    showAddClient,
    setShowAddClient,
    addMode,
    setAddMode,
    addingClient,
    clientForm,
    setClientForm,
    load,
    updateForm,
    handleAddClient,
    requestAllocate,
    confirmAllocate,
    handleUnassign,
  } = useManagerClients();

  useEffect(() => {
    if (!authLoading && !isAdmin && !isManager) {
      router.replace("/dashboard");
      return;
    }
    if (!authLoading) void load();
  }, [authLoading, isAdmin, isManager, router, load]);

  if (authLoading) return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserGroupIcon className="w-8 h-8 text-[#00a76f]" />
            My Clients
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Assigned investors, balances, and strategy allocation with live risk
            metrics
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddClient(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold"
          >
            <PlusIcon className="w-4 h-4" />
            Add Client
          </button>
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium"
          >
            <ArrowPathIcon
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading clients…</p>
      ) : clients.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border p-8 text-center text-gray-500">
          <p>No clients assigned yet.</p>
          <button
            onClick={() => setShowAddClient(true)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold"
          >
            <PlusIcon className="w-4 h-4" />
            Add your first client
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {clients.map((client) => {
            const balance = client.wallet?.availableBalance ?? 0;
            const form = forms[client.clientId] ?? {
              investmentOptionId: options[0]?.id ?? "",
              amount: String(balance),
              lockInMonths: 6,
            };
            const canUnassign = client.activeInvestments.length === 0;
            const preview = previews[client.clientId];
            const isPreviewLoading = previewLoading === client.clientId;
            const parsedAmount = parseFloat(form.amount) || 0;
            const exceedsBalance = parsedAmount > balance;

            return (
              <div
                key={client.clientId}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {client.fullName}
                    </h2>
                    <p className="text-sm text-gray-500">{client.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      KYC: {client.kycStatus}
                    </p>
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
                    {canUnassign && (
                      <button
                        type="button"
                        onClick={() =>
                          void handleUnassign(client.clientId, client.fullName)
                        }
                        disabled={unassigning === client.clientId}
                        className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 disabled:opacity-50"
                      >
                        <UserMinusIcon className="w-3.5 h-3.5" />
                        {unassigning === client.clientId
                          ? "Removing…"
                          : "Unassign"}
                      </button>
                    )}
                  </div>
                </div>

                {client.activeInvestments.length > 0 && (
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
                          {inv.strategyKey && (
                            <span className="text-gray-500">
                              {" "}
                              ({inv.strategyKey})
                            </span>
                          )}{" "}
                          — {formatUsd(inv.currentValue ?? inv.amountInvested)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {balance > 0 && (
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
                              {o.strategyKey
                                ? ` (${o.strategyKey})`
                                : ""} — {o.riskLevel}
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
                        {exceedsBalance && (
                          <p className="text-[10px] text-red-600 mt-0.5">
                            Cannot exceed available balance
                          </p>
                        )}
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
                )}
              </div>
            );
          })}
        </div>
      )}

      {confirmClientId && previews[confirmClientId] && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Confirm allocation
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Review the allocation details before committing client capital.
            </p>
            <AllocationPreviewPanel
              preview={previews[confirmClientId]}
              loading={false}
            />
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setConfirmClientId(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void confirmAllocate()}
                disabled={allocating === confirmClientId}
                className="flex-1 px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 disabled:opacity-60 text-white rounded-lg font-semibold"
              >
                {allocating === confirmClientId
                  ? "Allocating…"
                  : "Confirm allocation"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddClient && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add Client
              </h2>
              <button
                onClick={() => setShowAddClient(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setAddMode("create")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  addMode === "create"
                    ? "bg-[#00a76f] text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                New account
              </button>
              <button
                type="button"
                onClick={() => setAddMode("assign")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  addMode === "assign"
                    ? "bg-[#00a76f] text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Assign existing
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4">
              {addMode === "create" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={clientForm.fullName}
                    onChange={(e) =>
                      setClientForm((f) => ({ ...f, fullName: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="Client name"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={clientForm.email}
                  onChange={(e) =>
                    setClientForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="client@example.com"
                  required
                />
              </div>
              {addMode === "create" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Temporary Password
                  </label>
                  <input
                    type="password"
                    value={clientForm.password}
                    onChange={(e) =>
                      setClientForm((f) => ({ ...f, password: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="Min. 8 characters"
                    minLength={8}
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={clientForm.notes}
                  onChange={(e) =>
                    setClientForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Onboarding notes"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddClient(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingClient}
                  className="flex-1 px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 disabled:opacity-60 text-white rounded-lg font-semibold"
                >
                  {addingClient
                    ? "Saving…"
                    : addMode === "create"
                      ? "Create Client"
                      : "Assign Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
