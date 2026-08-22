import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";
import { CreditAmountSchema, EmailSchema, minimumPasswordSchema } from "@/lib/schemas";

export interface ApiUser {
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

export function useAdminUsers() {
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
    } catch (error) {
      logger.error("Failed to load users", error);
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
    } catch (error) {
      logger.error("Failed to update user status", error);
      toast.error("Failed to update user status");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.password) {
      toast.error("All fields are required");
      return;
    }
    if (!EmailSchema.safeParse(form.email.trim()).success) {
      toast.error("Enter a valid email address");
      return;
    }
    if (!minimumPasswordSchema(8, "Password must be at least 8 characters").safeParse(form.password).success) {
      toast.error("Password must be at least 8 characters");
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
      logger.error("Failed to create user", err);
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
    } catch (error) {
      logger.error("Failed to load managers", error);
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
      logger.error("Failed to assign investor", err);
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
      logger.error("Failed to credit wallet", err);
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
    } catch (error) {
      logger.error("Failed to delete user", error);
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
    } catch (error) {
      logger.error("Failed to update user", error);
      toast.error("Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return {
    users,
    setUsers,
    loading,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    page,
    setPage,
    total,
    setTotal,
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
    loadUsers,
    handleSuspend,
    handleCreate,
    openAssignModal,
    handleAssignToManager,
    handleCreditWallet,
    handleDelete,
    handleUpdateUser,
    totalPages,
  };
}
