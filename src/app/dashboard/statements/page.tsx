"use client";

import { useCallback, useEffect, useState } from "react";
import { DocumentTextIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getAccessToken } from "@/lib/auth-storage";

interface Statement {
  id: string;
  periodStart: string;
  periodEnd: string;
  fileUrl: string;
  metadata?: {
    totalValue?: number;
    totalReturnPercent?: number;
  };
  createdAt: string;
}

export default function StatementsPage() {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.statements.list();
      setStatements(data);
    } catch {
      toast.error("Failed to load statements");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const download = async (id: string) => {
    try {
      const token = getAccessToken();
      const res = await fetch(api.statements.downloadUrl(id), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `evermount-statement-${id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Could not download statement");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <DocumentTextIcon className="w-8 h-8 text-[#00a76f]" />
          Monthly Statements
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Download PDF statements with portfolio summary and performance
          attribution.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-gray-500">Loading…</p>
        ) : statements.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            No statements yet. Statements are generated monthly by the platform.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr className="text-left text-gray-500">
                <th className="px-5 py-3">Period</th>
                <th className="px-5 py-3">Value</th>
                <th className="px-5 py-3">Return</th>
                <th className="px-5 py-3">Generated</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {statements.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-gray-100 dark:border-gray-700"
                >
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">
                    {new Date(s.periodStart).toLocaleDateString(undefined, {
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3">
                    {s.metadata?.totalValue != null
                      ? `$${s.metadata.totalValue.toFixed(2)}`
                      : "—"}
                  </td>
                  <td className="px-5 py-3">
                    {s.metadata?.totalReturnPercent != null
                      ? `${s.metadata.totalReturnPercent.toFixed(2)}%`
                      : "—"}
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => download(s.id)}
                      className="inline-flex items-center gap-1 text-[#00a76f] hover:underline"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
