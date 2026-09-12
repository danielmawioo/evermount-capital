"use client";

import TranslateTree from "@/app/components/TranslateTree";
import { BriefcaseIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAdminManagers } from "@/hooks/useAdminManagers";
import ManagerCard from "./ManagerCard";
import ManageClientsModal from "./ManageClientsModal";
import CreditWalletModal from "./CreditWalletModal";
import AddManagerModal from "./AddManagerModal";

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
    <TranslateTree>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BriefcaseIcon className="w-8 h-8 text-[#00a76f]" />
              Portfolio Managers
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
              Create and manage portfolio managers who onboard and serve
              clients.
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
          <div className="text-center py-12 text-gray-500">
            Loading managers...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredManagers.map((manager) => (
              <ManagerCard
                key={manager.id}
                manager={manager}
                onManageClients={(m) => void openManageClients(m)}
                onToggleStatus={(m) => void handleToggleStatus(m)}
              />
            ))}
          </div>
        )}

        {!loading && filteredManagers.length === 0 ? (
          <div className="text-center py-12">
            <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No portfolio managers found.
            </p>
          </div>
        ) : null}

        {manageManager ? (
          <ManageClientsModal
            manager={manageManager}
            clients={managerClients}
            loading={clientsLoading}
            assignEmail={assignEmail}
            setAssignEmail={setAssignEmail}
            assigning={assigning}
            onClose={() => setManageManager(null)}
            onAssign={handleAssignClient}
            onUnassign={(client) => void handleUnassignClient(client)}
            onCredit={(client) => {
              setCreditClient(client);
              setCreditAmount("");
            }}
          />
        ) : null}

        {creditClient ? (
          <CreditWalletModal
            client={creditClient}
            amount={creditAmount}
            setAmount={setCreditAmount}
            crediting={crediting}
            onClose={() => setCreditClient(null)}
            onSubmit={handleCreditClient}
          />
        ) : null}

        {showAddModal ? (
          <AddManagerModal
            form={form}
            setForm={setForm}
            submitting={submitting}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleCreate}
          />
        ) : null}
      </div>
    </TranslateTree>
  );
}
