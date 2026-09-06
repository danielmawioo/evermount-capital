"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useCallback, useEffect, useState } from "react";
import { ShieldCheckIcon, KeyIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";

export default function AdminSecurityPage() {
  const [status, setStatus] = useState<{
    mfaEnabled: boolean;
    requiredForRole: boolean;
  } | null>(null);
  const [setup, setSetup] = useState<{
    secret: string;
    otpauthUrl: string;
  } | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.security.mfa.getStatus();
      setStatus(data);
    } catch (error) {
      logger.error("Failed to load MFA status", error);
      toast.error("Failed to load MFA status");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSetup = async () => {
    try {
      const { data } = await api.security.mfa.setup();
      setSetup(data);
      toast.success("Scan the secret with your authenticator app");
    } catch (error) {
      logger.error("MFA setup failed", error);
      toast.error("MFA setup failed");
    }
  };

  const handleEnable = async () => {
    try {
      await api.security.mfa.enable({ token });
      toast.success("MFA enabled");
      setSetup(null);
      setToken("");
      await load();
    } catch (error) {
      logger.error("Failed to enable MFA", error);
      toast.error("Invalid token — could not enable MFA");
    }
  };

  const handleDisable = async () => {
    try {
      await api.security.mfa.disable({ token });
      toast.success("MFA disabled");
      setToken("");
      await load();
    } catch (error) {
      logger.error("Failed to disable MFA", error);
      toast.error("Invalid token — could not disable MFA");
    }
  };

  return (
    <TranslateTree>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheckIcon className="w-8 h-8 text-[#00a76f]" />
            Admin Security
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            TOTP two-factor authentication for admin accounts
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border p-5 space-y-4">
          {loading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : (
            <>
              <p className="text-sm">
                MFA status:{" "}
                <span
                  className={
                    status?.mfaEnabled
                      ? "text-green-600 font-medium"
                      : "text-amber-600 font-medium"
                  }
                >
                  {status?.mfaEnabled ? "Enabled" : "Disabled"}
                </span>
              </p>

              {!status?.mfaEnabled && !setup && (
                <button
                  onClick={handleSetup}
                  className="flex items-center gap-2 px-4 py-2 bg-[#00a76f] text-white rounded-lg text-sm"
                >
                  <KeyIcon className="w-4 h-4" />
                  Set up MFA
                </button>
              )}

              {setup && (
                <div className="space-y-3 text-sm">
                  <p className="font-medium">
                    Add this secret to Google Authenticator / 1Password:
                  </p>
                  <code className="block p-3 bg-gray-100 dark:bg-gray-900 rounded break-all">
                    {setup.secret}
                  </code>
                  <p className="text-xs text-gray-500 break-all">
                    {setup.otpauthUrl}
                  </p>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="6-digit code"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                  <button
                    onClick={handleEnable}
                    disabled={token.length < 6}
                    className="px-4 py-2 bg-[#00a76f] text-white rounded-lg text-sm disabled:opacity-50"
                  >
                    Enable MFA
                  </button>
                </div>
              )}

              {status?.mfaEnabled && (
                <div className="space-y-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="6-digit code to disable"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 text-sm"
                  />
                  <button
                    onClick={handleDisable}
                    disabled={token.length < 6}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm disabled:opacity-50"
                  >
                    Disable MFA
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </TranslateTree>
  );
}
