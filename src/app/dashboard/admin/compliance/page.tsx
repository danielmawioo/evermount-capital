"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useCallback, useEffect, useState } from "react";
import {
  ShieldCheckIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";

interface ComplianceReport {
  generatedAt: string;
  accessControls: {
    adminAccounts: number;
    activeInvestors: number;
    mfaEnforced: boolean;
    note: string;
  };
  auditTrail: {
    eventsLast30Days: number;
    sensitiveActionsLast30Days: Array<{
      action: string;
      entity: string;
      createdAt: string;
    }>;
  };
  dataProtection: {
    readReplicaConfigured: boolean;
    fileStorageProvider: string;
  };
}

export default function CompliancePage() {
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [auditTotal, setAuditTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [reportRes, logsRes] = await Promise.all([
        api.compliance.getReport(),
        api.compliance.getAuditLogs({ limit: 10 }),
      ]);
      setReport(reportRes.data);
      setAuditTotal(logsRes.data.total);
    } catch (error) {
      logger.error("Failed to load compliance data", error);
      toast.error("Failed to load compliance data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const exportCsv = async () => {
    setExporting(true);
    try {
      const { data } = await api.compliance.exportAuditLogs();
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "audit-logs.csv";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Audit log exported");
    } catch (error) {
      logger.error("Failed to export audit logs", error);
      toast.error("Export failed");
    } finally {
      setExporting(false);
    }
  };

  return (
    <TranslateTree>
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheckIcon className="w-8 h-8 text-[#00a76f]" />
            Compliance
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Audit exports and SOC2-oriented controls snapshot
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
          >
            <ArrowPathIcon
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <button
            onClick={exportCsv}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2 bg-[#00a76f] text-white rounded-lg text-sm disabled:opacity-50"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export audit CSV
          </button>
        </div>
      </div>

      {loading && !report ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : report ? (
        <>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
              <p className="text-xs uppercase text-gray-500">
                Audit events (30d)
              </p>
              <p className="text-2xl font-bold mt-1">
                {report.auditTrail.eventsLast30Days}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {auditTotal}+ in recent query
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
              <p className="text-xs uppercase text-gray-500">Admin accounts</p>
              <p className="text-2xl font-bold mt-1">
                {report.accessControls.adminAccounts}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                MFA: {report.accessControls.mfaEnforced ? "On" : "Not enforced"}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
              <p className="text-xs uppercase text-gray-500">Read replica</p>
              <p className="text-2xl font-bold mt-1">
                {report.dataProtection.readReplicaConfigured ? "Yes" : "No"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Storage: {report.dataProtection.fileStorageProvider}
              </p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-900 dark:text-amber-200">
            {report.accessControls.note}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border p-5">
            <h2 className="font-semibold mb-3">Sensitive actions (30d)</h2>
            {report.auditTrail.sensitiveActionsLast30Days.length === 0 ? (
              <p className="text-sm text-gray-500">None recorded</p>
            ) : (
              <ul className="text-sm space-y-2">
                {report.auditTrail.sensitiveActionsLast30Days.map((a, i) => (
                  <li key={i} className="flex justify-between gap-4">
                    <span>
                      <span className="font-medium">{a.action}</span> —{" "}
                      {a.entity}
                    </span>
                    <span className="text-gray-500 shrink-0">
                      {new Date(a.createdAt).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : null}
    </div>
      </TranslateTree>
  );
}
