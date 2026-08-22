import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";

export type SettingsState = {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
    ipWhitelist: boolean;
  };
  platform: {
    maintenanceMode: boolean;
    registrationEnabled: boolean;
    apiEnabled: boolean;
  };
  integrations: {
    stripe: boolean;
    intercom: boolean;
    analytics: boolean;
  };
};

export function useAdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    security: {
      twoFactor: true,
      sessionTimeout: 30,
      ipWhitelist: false,
    },
    platform: {
      maintenanceMode: false,
      registrationEnabled: true,
      apiEnabled: true,
    },
    integrations: {
      stripe: true,
      intercom: true,
      analytics: true,
    },
  });

  useEffect(() => {
    api.admin.settings
      .get()
      .then(({ data }) => {
        setSettings((prev) => ({
          notifications: { ...prev.notifications, ...data.notifications },
          security: { ...prev.security, ...data.security },
          platform: { ...prev.platform, ...data.platform },
          integrations: { ...prev.integrations, ...data.integrations },
        }));
      })
      .catch((error) => {
        logger.error("Failed to load settings", error);
        toast.error("Failed to load settings");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const keys = [
        "notifications",
        "security",
        "platform",
        "integrations",
      ] as const;
      await Promise.all(
        keys.map((key) =>
          api.admin.settings.update(
            key,
            settings[key] as Record<string, unknown>,
          ),
        ),
      );
      toast.success("Settings saved");
    } catch (error: unknown) {
      logger.error("Failed to save settings", error);
      toast.error(getApiErrorMessage(error, "Failed to save settings"));
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = <K extends keyof SettingsState>(
    category: K,
    key: keyof SettingsState[K],
  ) => {
    setSettings((prev) => {
      const categorySettings = prev[category];
      const currentValue = (
        categorySettings as Record<string, boolean | number>
      )[key as string];
      if (typeof currentValue === "boolean") {
        return {
          ...prev,
          [category]: {
            ...categorySettings,
            [key]: !currentValue,
          } as SettingsState[K],
        };
      }
      return prev;
    });
  };

  const handleNumberChange = <K extends keyof SettingsState>(
    category: K,
    key: keyof SettingsState[K],
    value: number,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      } as SettingsState[K],
    }));
  };

  return {
    loading,
    saving,
    settings,
    handleSave,
    handleToggle,
    handleNumberChange,
  };
}
