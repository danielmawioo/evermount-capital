"use client";

import TranslateTree from "@/app/components/TranslateTree";

import {
  UsersIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import UserRow from "./UserRow";
import AddUserModal from "./AddUserModal";

export default function UserManagementPage() {
  const {
    users,
    loading,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    page,
    setPage,
    total,
    showAddModal,
    setShowAddModal,
    submitting,
    form,
    setForm,
    creditUser,
    setCreditUser,
    creditAmount,
    setCreditAmount,
    crediting,
    assignUser,
    setAssignUser,
    editUser,
    setEditUser,
    editForm,
    setEditForm,
    updating,
    managers,
    selectedManagerId,
    setSelectedManagerId,
    assigning,
    handleSuspend,
    handleCreate,
    openAssignModal,
    handleAssignToManager,
    handleCreditWallet,
    handleDelete,
    handleUpdateUser,
    totalPages,
  } = useAdminUsers();

  return (
    <TranslateTree>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <UsersIcon className="w-8 h-8 text-[#00a76f]" />
              User Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage investor accounts and access. Portfolio managers are
              created under Admin → Managers.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#00a76f] hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-semibold"
          >
            <PlusIcon className="w-5 h-5" />
            Add User
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-8 text-gray-500">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="p-8 text-center text-gray-500">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      KYC
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Deposits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      onEdit={(u) => {
                        setEditUser(u);
                        setEditForm({
                          fullName: u.fullName,
                          role: u.role,
                        });
                      }}
                      onAssign={(u) => void openAssignModal(u)}
                      onCredit={(u) => {
                        setCreditUser(u);
                        setCreditAmount("");
                      }}
                      onSuspend={handleSuspend}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages} ({total} users)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 border rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 border rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {assignUser && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Assign to manager
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {assignUser.fullName} ({assignUser.email})
              </p>
              <form onSubmit={handleAssignToManager} className="space-y-4">
                <select
                  value={selectedManagerId}
                  onChange={(e) => setSelectedManagerId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                  required
                >
                  <option value="">Select portfolio manager</option>
                  {managers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.fullName} ({m.email})
                    </option>
                  ))}
                </select>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAssignUser(null)}
                    className="flex-1 px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={assigning}
                    className="flex-1 px-4 py-2 bg-[#00a76f] text-white rounded-lg font-semibold disabled:opacity-60"
                  >
                    {assigning ? "Assigning…" : "Assign"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {creditUser && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Credit wallet
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {creditUser.fullName} ({creditUser.email})
              </p>
              <form onSubmit={handleCreditWallet} className="space-y-4">
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
                    onClick={() => setCreditUser(null)}
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

        <AddUserModal
          open={showAddModal}
          form={form}
          setForm={setForm}
          submitting={submitting}
          onSubmit={handleCreate}
          onCancel={() => setShowAddModal(false)}
        />

        {editUser && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Edit user
              </h2>
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, fullName: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    value={editForm.role}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, role: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                  >
                    <option value="INVESTOR">Investor</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditUser(null)}
                    className="flex-1 px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 px-4 py-2 bg-[#00a76f] text-white rounded-lg font-semibold disabled:opacity-60"
                  >
                    {updating ? "Saving…" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </TranslateTree>
  );
}
