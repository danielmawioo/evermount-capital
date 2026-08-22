import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";
import { CreditAmountSchema } from "@/lib/schemas";

export interface Manager {
  id: string;
  email: string;
  fullName: string;
  status: "active" | "inactive";
  clientCount: number;
  joinDate: string;
}

export interface ManagerClient {
  assignmentId: string;
  clientId: string;
  email: string;
  fullName: string;
  kycStatus: string;
  availableBalance: number;
  currency: string;
  assignedAt: string;
}

export function useAdminManagers() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">(
    "all",
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [manageManager, setManageManager] = useState<Manager | null>(null);
  const [managerClients, setManagerClients] = useState<ManagerClient[]>([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [assignEmail, setAssignEmail] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [creditClient, setCreditClient] = useState<ManagerClient | null>(null);
  const [creditAmount, setCreditAmount] = useState("");
  const [crediting, setCrediting] = useState(false);

  const loadManagers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.admin.managers.getAll();
      setManagers(data.managers ?? []);
    } catch (error) {
      logger.error("Failed to load portfolio managers", error);
      toast.error("Failed to load portfolio managers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadManagers();
  }, [loadManagers]);

  const filteredManagers = managers.filter((manager) => {
    const matchesSearch =
      manager.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || manager.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = async (manager: Manager) => {
    const nextStatus = manager.status === "active" ? "inactive" : "active";
    try {
      await api.admin.managers.update(manager.id, { status: nextStatus });
      toast.success(
        `Manager ${nextStatus === "active" ? "activated" : "deactivated"}`,
      );
      void loadManagers();
    } catch (error) {
      logger.error("Failed to update manager status", error);
      toast.error("Failed to update manager status");
    }
  };

  const openManageClients = async (manager: Manager) => {
    setManageManager(manager);
    setAssignEmail("");
    setClientsLoading(true);
    try {
      const { data } = await api.admin.managers.getClients(manager.id);
      setManagerClients(data.clients ?? []);
    } catch (error) {
      logger.error("Failed to load manager clients", error);
      toast.error("Failed to load manager clients");
      setManageManager(null);
    } finally {
      setClientsLoading(false);
    }
  };

  const refreshManagerClients = async () => {
    if (!manageManager) return;
    const { data } = await api.admin.managers.getClients(manageManager.id);
    setManagerClients(data.clients ?? []);
    void loadManagers();
  };

  const handleAssignClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manageManager || !assignEmail.trim()) return;
    setAssigning(true);
    try {
      await api.admin.managers.assignClient(manageManager.id, {
        email: assignEmail.trim(),
      });
      toast.success("Client assigned");
      setAssignEmail("");
      await refreshManagerClients();
    } catch (err: unknown) {
      logger.error("Failed to assign client", err);
      toast.error(getApiErrorMessage(err, "Failed to assign client"));
    } finally {
      setAssigning(false);
    }
  };

  const handleUnassignClient = async (client: ManagerClient) => {
    if (!manageManager) return;
    if (!confirm(`Unassign ${client.fullName} from ${manageManager.fullName}?`)) {
      return;
    }
    try {
      await api.admin.managers.unassignClient(
        manageManager.id,
        client.clientId,
      );
      toast.success("Client unassigned");
      await refreshManagerClients();
    } catch (err: unknown) {
      logger.error("Failed to unassign client", err);
      toast.error(getApiErrorMessage(err, "Failed to unassign client"));
    }
  };

  const handleCreditClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditClient) return;
    const parsedAmount = CreditAmountSchema.safeParse(parseFloat(creditAmount));
    if (!parsedAmount.success) {
      toast.error(parsedAmount.error.issues[0]?.message ?? "Enter a valid amount");
      return;
    }
    const amount = parsedAmount.data;
    setCrediting(true);
    try {
      await api.admin.wallets.creditUser(creditClient.clientId, {
        amount,
        description: `Admin credit for ${creditClient.fullName}`,
      });
      toast.success(`Credited $${amount.toLocaleString()}`);
      setCreditClient(null);
      setCreditAmount("");
      if (manageManager) await refreshManagerClients();
      else void loadManagers();
    } catch (err: unknown) {
      logger.error("Failed to credit wallet", err);
      toast.error(getApiErrorMessage(err, "Failed to credit wallet"));
    } finally {
      setCrediting(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.password) {
      toast.error("All fields are required");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setSubmitting(true);
    try {
      await api.admin.managers.create({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      toast.success("Portfolio manager created");
      setShowAddModal(false);
      setForm({ fullName: "", email: "", password: "" });
      void loadManagers();
    } catch (err: unknown) {
      logger.error("Failed to create manager", err);
      toast.error(getApiErrorMessage(err, "Failed to create manager"));
    } finally {
      setSubmitting(false);
    }
  };

  return {
    managers,
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
    loadManagers,
    filteredManagers,
    handleToggleStatus,
    openManageClients,
    refreshManagerClients,
    handleAssignClient,
    handleUnassignClient,
    handleCreditClient,
    handleCreate,
  };
}
