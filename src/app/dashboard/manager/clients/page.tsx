"use client";

import TranslateTree from "@/app/components/TranslateTree";
import { useEffect } from "react";
import {
  ArrowPathIcon,
  UserGroupIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useInvestor } from "@/hooks/useInvestor";
import { useManagerClients } from "@/hooks/useManagerClients";
import ClientCard from "./ClientCard";
import AddClientModal from "./AddClientModal";
import ConfirmAllocateModal from "./ConfirmAllocateModal";

export default function ManagerClientsPage() {
  const router = useRouter();
  const { isAdmin, isManager, loading: authLoading } = useInvestor();
  const clientsState = useManagerClients();
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
  } = clientsState;

  useEffect(() => {
    if (!authLoading && !isAdmin && !isManager) {
      router.replace("/dashboard");
      return;
    }
    if (!authLoading) void load();
  }, [authLoading, isAdmin, isManager, router, load]);

  if (authLoading) return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <TranslateTree>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <UserGroupIcon className="w-8 h-8 text-[#00a76f]" />
              My Clients
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Assigned investors, balances, and strategy allocation with live
              risk metrics
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
              return (
                <ClientCard
                  key={client.clientId}
                  client={client}
                  options={options}
                  form={form}
                  preview={previews[client.clientId]}
                  isPreviewLoading={previewLoading === client.clientId}
                  allocating={allocating}
                  unassigning={unassigning}
                  updateForm={updateForm}
                  requestAllocate={requestAllocate}
                  handleUnassign={handleUnassign}
                />
              );
            })}
          </div>
        )}

        {confirmClientId && previews[confirmClientId] ? (
          <ConfirmAllocateModal
            preview={previews[confirmClientId]}
            allocating={allocating === confirmClientId}
            onCancel={() => setConfirmClientId(null)}
            onConfirm={() => void confirmAllocate()}
          />
        ) : null}

        {showAddClient ? (
          <AddClientModal
            addMode={addMode}
            setAddMode={setAddMode}
            clientForm={clientForm}
            setClientForm={setClientForm}
            addingClient={addingClient}
            onClose={() => setShowAddClient(false)}
            onSubmit={handleAddClient}
          />
        ) : null}
      </div>
    </TranslateTree>
  );
}
