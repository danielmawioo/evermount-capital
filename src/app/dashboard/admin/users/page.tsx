"use client";

import { useCallback, useEffect, useState } from "react";
import {
  UsersIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { CreditAmountSchema } from "@/lib/schemas";

interface ApiUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  isActive?: boolean;
  kycStatus?: string;
  createdAt: string;
  totalDeposits?: number;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "INVESTOR",
  });
  const [creditUser, setCreditUser] = useState<ApiUser | null>(null);
  const [creditAmount, setCreditAmount] = useState("");
  const [crediting, setCrediting] = useState(false);
  const [assignUser, setAssignUser] = useState<ApiUser | null>(null);
  const [editUser, setEditUser] = useState<ApiUser | null>(null);
  const [editForm, setEditForm] = useState({ fullName: "", role: "INVESTOR" });
  const [updating, setUpdating] = useState(false);
  const [managers, setManagers] = useState<
    Array<{ id: string; fullName: string; email: string }>
  >([]);
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [assigning, setAssigning] = useState(false);
  const limit = 10;

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.admin.users.getAll({
        search: searchTerm || undefined,
        status: filterStatus !== "all" ? filterStatus : undefined,
        page,
        limit,
      });
      setUsers(data.users || []);
      setTotal(data.total || 0);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterStatus, page]);

  useEffect(() => {
    const timer = setTimeout(loadUsers, searchTerm ? 300 : 0);
    return () => clearTimeout(timer);
  }, [loadUsers, searchTerm]);

  const handleSuspend = async (userId: string, action: "suspend" | "activate") => {
    try {
      await api.admin.users.suspend(userId, { action });
      toast.success(`User ${action === "suspend" ? "suspended" : "activated"}`);
      loadUsers();
    } catch {
      toast.error("Failed to update user status");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.password) {
      toast.error("All fields are required");
      return;
    }
    setSubmitting(true);
    try {
      await api.admin.users.create({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      toast.success("User created");
      setShowAddModal(false);
      setForm({ fullName: "", email: "", password: "", role: "INVESTOR" });
      loadUsers();
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to create user"));
    } finally {
      setSubmitting(false);
    }
  };

  const openAssignModal = async (user: ApiUser) => {
    setAssignUser(user);
    setSelectedManagerId("");
    try {
      const { data } = await api.admin.managers.getAll();
      setManagers(
        (data.managers ?? []).filter((m) => m.status === "active"),
      );
    } catch {
      toast.error("Failed to load managers");
      setAssignUser(null);
    }
  };

  const handleAssignToManager = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignUser || !selectedManagerId) return;
    setAssigning(true);
    try {
      await api.admin.managers.assignClient(selectedManagerId, {
        email: assignUser.email,
      });
      toast.success("Investor assigned to portfolio manager");
      setAssignUser(null);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to assign investor"));
    } finally {
      setAssigning(false);
    }
  };

  const handleCreditWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditUser) return;
    const parsedAmount = CreditAmountSchema.safeParse(parseFloat(creditAmount));
    if (!parsedAmount.success) {
      toast.error(parsedAmount.error.issues[0]?.message ?? "Enter a valid amount");
      return;
    }
    const amount = parsedAmount.data;
    setCrediting(true);
    try {
      await api.admin.wallets.creditUser(creditUser.id, {
        amount,
        description: `Admin credit for ${creditUser.fullName}`,
      });
      toast.success(`Credited $${amount.toLocaleString()}`);
      setCreditUser(null);
      setCreditAmount("");
      loadUsers();
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to credit wallet"));
    } finally {
      setCrediting(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Delete this user permanently?")) return;
    try {
      await api.admin.users.delete(userId);
      toast.success("User deleted");
      loadUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    setUpdating(true);
    try {
      await api.admin.users.update(editUser.id, {
        fullName: editForm.fullName.trim(),
        role: editForm.role,
      });
      toast.success("User updated");
      setEditUser(null);
      loadUsers();
    } catch {
      toast.error("Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UsersIcon className="w-8 h-8 text-[#00a76f]" />
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage investor accounts and access. Portfolio managers are created
            under Admin → Managers.
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
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {user.fullName}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {user.kycStatus || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      ${(user.totalDeposits || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {user.status === "active" ? (
                          <CheckCircleIcon className="w-3.5 h-3.5" />
                        ) : (
                          <XCircleIcon className="w-3.5 h-3.5" />
                        )}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditUser(user);
                            setEditForm({
                              fullName: user.fullName,
                              role: user.role,
                            });
                          }}
                          className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        >
                          Edit
                        </button>
                        {user.role === "INVESTOR" && (
                          <>
                            <button
                              onClick={() => void openAssignModal(user)}
                              className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                              Assign
                            </button>
                            <button
                              onClick={() => {
                                setCreditUser(user);
                                setCreditAmount("");
                              }}
                              className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                            >
                              Credit
                            </button>
                          </>
                        )}
                        {user.status === "active" ? (
                          <button
                            onClick={() => handleSuspend(user.id, "suspend")}
                            className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSuspend(user.id, "activate")}
                            className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          >
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
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

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Add User
            </h2>
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  minLength={8}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="INVESTOR">Investor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 disabled:opacity-60 text-white rounded-lg font-semibold"
                >
                  {submitting ? "Creating…" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
  );
}
