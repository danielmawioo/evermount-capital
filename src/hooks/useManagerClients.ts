import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";
import { EmailSchema, minimumPasswordSchema } from "@/lib/schemas";
import type { AllocationPreview } from "@/app/dashboard/manager/clients/AllocationPreviewPanel";

export type Client = {
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

export type InvestmentOption = {
  id: string;
  name: string;
  strategyKey: string | null;
  minInvestment: number;
  riskLevel: string;
};

export type ClientForm = {
  investmentOptionId: string;
  amount: string;
  lockInMonths: number;
};

export function useManagerClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [options, setOptions] = useState<InvestmentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [allocating, setAllocating] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<string, AllocationPreview>>({});
  const [forms, setForms] = useState<Record<string, ClientForm>>({});
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

      const initialForms: Record<string, ClientForm> = {};
      for (const c of clientsRes.data.clients) {
        const balance = c.wallet?.availableBalance ?? 0;
        initialForms[c.clientId] = {
          investmentOptionId: optionsRes.data.options[0]?.id ?? "",
          amount: String(Math.floor(balance)),
          lockInMonths: 6,
        };
      }
      setForms(initialForms);
    } catch (error) {
      logger.error("Failed to load clients", error);
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
        logger.error("Failed to preview allocation", error);
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
    patch: Partial<ClientForm>,
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
        if (!EmailSchema.safeParse(clientForm.email.trim()).success) {
          toast.error("Enter a valid email address");
          return;
        }
        if (!minimumPasswordSchema(8, "Password must be at least 8 characters").safeParse(clientForm.password).success) {
          toast.error("Password must be at least 8 characters");
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
        if (!EmailSchema.safeParse(clientForm.email.trim()).success) {
          toast.error("Enter a valid email address");
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
      logger.error("Failed to add client", err);
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
    } catch (error) {
      logger.error("Allocation failed — check preview warnings", error);
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
      logger.error("Failed to unassign client", err);
      toast.error(getApiErrorMessage(err, "Failed to unassign client"));
    } finally {
      setUnassigning(null);
    }
  };

  return {
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
  };
}
