"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import type { FormEvent } from "react";
import type { Manager, ManagerClient } from "@/hooks/useAdminManagers";

type Props = {
  manager: Manager;
  clients: ManagerClient[];
  loading: boolean;
  assignEmail: string;
  setAssignEmail: (value: string) => void;
  assigning: boolean;
  onClose: () => void;
  onAssign: (event: FormEvent) => void;
  onUnassign: (client: ManagerClient) => void;
  onCredit: (client: ManagerClient) => void;
};

export default function ManageClientsModal({
  manager,
  clients,
  loading,
  assignEmail,
  setAssignEmail,
  assigning,
  onClose,
  onAssign,
  onUnassign,
  onCredit,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {manager.fullName}&apos;s clients
            </h2>
            <p className="text-sm text-gray-500">{manager.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircleIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={onAssign} className="flex gap-2 mb-4">
          <input
            type="email"
            value={assignEmail}
            onChange={(e) => setAssignEmail(e.target.value)}
            placeholder="Assign investor by email"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm"
            required
          />
          <button
            type="submit"
            disabled={assigning}
            className="px-4 py-2 bg-[#00a76f] text-white rounded-lg text-sm font-semibold disabled:opacity-60"
          >
            {assigning ? "Assigning…" : "Assign"}
          </button>
        </form>

        {loading ? (
          <p className="text-sm text-gray-500 py-6">Loading clients…</p>
        ) : clients.length === 0 ? (
          <p className="text-sm text-gray-500 py-6 text-center">
            No clients assigned yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {clients.map((client) => (
              <li
                key={client.clientId}
                className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {client.fullName}
                  </p>
                  <p className="text-xs text-gray-500">{client.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    KYC: {client.kycStatus} · Balance: $
                    {client.availableBalance.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onCredit(client)}
                    className="text-xs px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg"
                  >
                    Credit wallet
                  </button>
                  <button
                    type="button"
                    onClick={() => onUnassign(client)}
                    className="text-xs px-3 py-1.5 text-red-600 border border-red-200 dark:border-red-900 rounded-lg"
                  >
                    Unassign
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
