"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowPathIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  PlusIcon,
  XMarkIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { useInvestor } from "@/hooks/useInvestor";
import AllocationPreviewPanel, {
  type AllocationPreview,
} from "./AllocationPreviewPanel";

type Client = {
  clientId: string;
  fullName: string;
  email: string;
  kycStatus: string;
  wallet: { availableBalance: number; currency: string } | null;
  totalInvested: number;
  activeInvestments: Array<{
    assetName: string;
    strategyKey: string | null;
    currentValue: number | null;
    amountInvested: number;
  }>;
};

type InvestmentOption = {
  id: string;
  name: string;
  strategyKey: string | null;
  minInvestment: number;
  riskLevel: string;
};

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
  const [clients, setClients] = useState<Client[]>([]);
  const [options, setOptions] = useState<InvestmentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [allocating, setAllocating] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<string, AllocationPreview>>({});
  const [forms, setForms] = useState<
    Record<
      string,
      { investmentOptionId: string; amount: string; lockInMonths: number }
    >
  >({});
  const [confirmClientId, setConfirmClientId] = useState<string | null>(null);
  const [unassigning, setUnassigning] = useState<string | null>(null);
  const [showAddClient, setShowAddClient] = useState(false);
  const [addMode, setAddMode] = useState<"create" | "assign">("create");
  const [addingClient, setAddingClient] = useState(false);
  const [clientForm, setClientForm] = useState({
    fullName: "",
    email: "",
    password: "",
    notes: "",
  });
  const debounceRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [clientsRes, optionsRes] = await Promise.all([
        api.portfolioManager.getClients(),
        api.portfolioManager.getInvestmentOptions(),
      ]);
      setClients(clientsRes.data.clients);
      setOptions(optionsRes.data.options);

      const initialForms: Record<
        string,
        { investmentOptionId: string; amount: string; lockInMonths: number }
      > = {};
      for (const c of clientsRes.data.clients) {
        const balance = c.wallet?.availableBalance ?? 0;
        initialForms[c.clientId] = {
          investmentOptionId: optionsRes.data.options[0]?.id ?? "",
          amount: String(Math.floor(balance)),
          lockInMonths: 6,
        };
      }
      setForms(initialForms);
    } catch {
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPreview = useCallback(
    async (
      clientId: string,
      investmentOptionId: string,
      amount: number,
      lockInMonths: number,
    ) => {
      if (!investmentOptionId || amount <= 0) {
        setPreviews((p) => {
          const next = { ...p };
          delete next[clientId];
          return next;
        });
        return;
      }

      setPreviewLoading(clientId);
      try {
        const { data } = await api.portfolioManager.previewAllocation(clientId, {
          investmentOptionId,
          amount,
          lockInMonths,
        });
        setPreviews((p) => ({ ...p, [clientId]: data }));
      } catch (error: unknown) {
        setPreviews((p) => {
          const next = { ...p };
          delete next[clientId];
          return next;
        });
        toast.error(getApiErrorMessage(error, "Failed to preview allocation"));
      } finally {
        setPreviewLoading((id) => (id === clientId ? null : id));
      }
    },
    [],
  );

  const schedulePreview = useCallback(
    (
      clientId: string,
      investmentOptionId: string,
      amountStr: string,
      lockInMonths: number,
    ) => {
      if (debounceRef.current[clientId]) {
        clearTimeout(debounceRef.current[clientId]);
      }
      debounceRef.current[clientId] = setTimeout(() => {
        const amount = parseFloat(amountStr) || 0;
        void fetchPreview(clientId, investmentOptionId, amount, lockInMonths);
      }, 350);
    },
    [fetchPreview],
  );

  useEffect(() => {
    if (!authLoading && !isAdmin && !isManager) {
      router.replace("/dashboard");
      return;
    }
    if (!authLoading) void load();
  }, [authLoading, isAdmin, isManager, router, load]);

  useEffect(() => {
    for (const client of clients) {
      const form = forms[client.clientId];
      if (form) {
        schedulePreview(
          client.clientId,
          form.investmentOptionId,
          form.amount,
          form.lockInMonths,
        );
      }
    }
  }, [clients, forms, schedulePreview]);

  const updateForm = (
    clientId: string,
    patch: Partial<{
      investmentOptionId: string;
      amount: string;
      lockInMonths: number;
    }>,
    maxBalance?: number,
  ) => {
    setForms((f) => {
      const current = f[clientId] ?? {
        investmentOptionId: options[0]?.id ?? "",
        amount: "0",
        lockInMonths: 6,
      };
      const next = { ...current, ...patch };

      if (patch.amount !== undefined && maxBalance !== undefined) {
        const parsed = parseFloat(patch.amount);
        if (!Number.isNaN(parsed) && parsed > maxBalance) {
          next.amount = String(Math.floor(maxBalance * 100) / 100);
        }
      }

      schedulePreview(
        clientId,
        next.investmentOptionId,
        next.amount,
        next.lockInMonths,
      );
      return { ...f, [clientId]: next };
    });
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingClient(true);
    try {
      if (addMode === "create") {
        if (!clientForm.fullName.trim() || !clientForm.email.trim() || !clientForm.password) {
          toast.error("Name, email, and password are required");
          return;
        }
        await api.portfolioManager.createClient({
          fullName: clientForm.fullName.trim(),
          email: clientForm.email.trim(),
          password: clientForm.password,
          notes: clientForm.notes.trim() || undefined,
        });
        toast.success("Client created and assigned to you");
      } else {
        if (!clientForm.email.trim()) {
          toast.error("Email is required");
          return;
        }
        await api.portfolioManager.assignClient({
          email: clientForm.email.trim(),
          notes: clientForm.notes.trim() || undefined,
        });
        toast.success("Client assigned to you");
      }
      setShowAddClient(false);
      setClientForm({ fullName: "", email: "", password: "", notes: "" });
      await load();
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to add client"));
    } finally {
      setAddingClient(false);
    }
  };

  const requestAllocate = (clientId: string) => {
    const form = forms[clientId];
    const preview = previews[clientId];
    if (!form?.investmentOptionId) {
      toast.error("Select a strategy");
      return;
    }
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (preview && !preview.canAllocate) {
      toast.error(preview.warnings[0] ?? "Allocation not permitted");
      return;
    }
    setConfirmClientId(clientId);
  };

  const confirmAllocate = async () => {
    if (!confirmClientId) return;
    const form = forms[confirmClientId];
    const amount = parseFloat(form.amount);
    if (!form?.investmentOptionId || !amount) return;

    setAllocating(confirmClientId);
    try {
      await api.portfolioManager.allocateForClient(confirmClientId, {
        investmentOptionId: form.investmentOptionId,
        amount,
        lockInMonths: form.lockInMonths,
      });
      toast.success("Strategy allocated for client");
      setConfirmClientId(null);
      await load();
    } catch {
      toast.error("Allocation failed — check preview warnings");
    } finally {
      setAllocating(null);
    }
  };

  const handleUnassign = async (clientId: string, clientName: string) => {
    if (
      !confirm(
        `Unassign ${clientName}? They will no longer appear in your client list.`,
      )
    ) {
      return;
    }
    setUnassigning(clientId);
    try {
      await api.portfolioManager.unassignClient(clientId);
      toast.success("Client unassigned");
      await load();
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to unassign client"));
    } finally {
      setUnassigning(null);
    }
  };

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
            Assigned investors, balances, and strategy allocation with live risk metrics
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
            <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
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
                              {o.strategyKey ? ` (${o.strategyKey})` : ""} —{" "}
                              {o.riskLevel}
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
