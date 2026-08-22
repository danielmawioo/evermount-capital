"use client";

import {
  BriefcaseIcon,
  PlusIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useAdminManagers } from "@/hooks/useAdminManagers";

export default function AdminManagersPage() {
  const {
    loading,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    showAddModal,
    setShowAddModal,
    submitting,
    form,
    setForm,
    manageManager,
    setManageManager,
    managerClients,
    clientsLoading,
    assignEmail,
    setAssignEmail,
    assigning,
    creditClient,
    setCreditClient,
    creditAmount,
    setCreditAmount,
    crediting,
    filteredManagers,
    handleToggleStatus,
    openManageClients,
    handleAssignClient,
    handleUnassignClient,
    handleCreditClient,
    handleCreate,
  } = useAdminManagers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BriefcaseIcon className="w-8 h-8 text-[#00a76f]" />
            Portfolio Managers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
            Create and manage portfolio managers who onboard and serve clients.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#00a76f] hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-semibold transition shadow-sm hover:shadow-md"
        >
          <PlusIcon className="w-5 h-5" />
          Add Manager
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search managers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
          <svg
            className="absolute left-3 top-3 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex gap-2">
          {(["all", "active", "inactive"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2.5 rounded-lg font-medium transition ${
                filterStatus === status
                  ? "bg-[#00a76f] text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading managers...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredManagers.map((manager) => (
            <div
              key={manager.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00a76f] to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                    {manager.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {manager.fullName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Portfolio Manager
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Email:</span>
                  <span className="text-gray-900 dark:text-white truncate">
                    {manager.email}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {manager.clientCount} client
                    {manager.clientCount === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700 gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Joined:{" "}
                    {new Date(manager.joinDate).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => void openManageClients(manager)}
                      className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#00a76f]/10 text-[#00a76f] hover:bg-[#00a76f]/20"
                    >
                      Clients
                    </button>
                    <button
                      onClick={() => void handleToggleStatus(manager)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition ${
                        manager.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {manager.status === "active" ? (
                        <CheckCircleIcon className="w-3 h-3" />
                      ) : (
                        <XCircleIcon className="w-3 h-3" />
                      )}
                      {manager.status.charAt(0).toUpperCase() +
                        manager.status.slice(1)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredManagers.length === 0 && (
        <div className="text-center py-12">
          <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            No portfolio managers found.
          </p>
        </div>
      )}

      {manageManager && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {manageManager.fullName}&apos;s clients
                </h2>
                <p className="text-sm text-gray-500">{manageManager.email}</p>
              </div>
              <button
                onClick={() => setManageManager(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={handleAssignClient}
              className="flex gap-2 mb-4"
            >
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

            {clientsLoading ? (
              <p className="text-sm text-gray-500 py-6">Loading clients…</p>
            ) : managerClients.length === 0 ? (
              <p className="text-sm text-gray-500 py-6 text-center">
                No clients assigned yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {managerClients.map((client) => (
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
                        onClick={() => {
                          setCreditClient(client);
                          setCreditAmount("");
                        }}
                        className="text-xs px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg"
                      >
                        Credit wallet
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleUnassignClient(client)}
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
      )}

      {creditClient && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              Credit wallet
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {creditClient.fullName} ({creditClient.email})
            </p>
            <form onSubmit={handleCreditClient} className="space-y-4">
              <input
                type="number"
                min={1}
                step="0.01"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                placeholder="Amount (USD)"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                required
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setCreditClient(null)}
                  className="flex-1 px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={crediting}
                  className="flex-1 px-4 py-2 bg-[#00a76f] text-white rounded-lg font-semibold disabled:opacity-60"
                >
                  {crediting ? "Crediting…" : "Credit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add Portfolio Manager
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fullName: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                  placeholder="jane@evermount.co"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Temporary Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                  placeholder="Min. 8 characters"
                  minLength={8}
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 disabled:opacity-60 text-white rounded-lg font-semibold transition"
                >
                  {submitting ? "Creating..." : "Add Manager"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
