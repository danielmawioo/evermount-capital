"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import type { FormEvent } from "react";

type ClientFormState = {
  fullName: string;
  email: string;
  password: string;
  notes: string;
};

type Props = {
  addMode: "create" | "assign";
  setAddMode: (mode: "create" | "assign") => void;
  clientForm: ClientFormState;
  setClientForm: (updater: (form: ClientFormState) => ClientFormState) => void;
  addingClient: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
};

export default function AddClientModal({
  addMode,
  setAddMode,
  clientForm,
  setClientForm,
  addingClient,
  onClose,
  onSubmit,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add Client
          </h2>
          <button
            onClick={onClose}
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
        <form onSubmit={onSubmit} className="space-y-4">
          {addMode === "create" ? (
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
          ) : null}
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
          {addMode === "create" ? (
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
          ) : null}
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
              onClick={onClose}
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
  );
}
