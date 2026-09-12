import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";

export type StrategyRow = {
  strategyKey: string;
  displayName: string;
  lifecycleStatus: string | null;
  isActive: boolean;
  isPrimary: boolean;
  isRunning: boolean;
  executionPlane: "quant" | "flipbot" | "both";
  capitalAllocation: number;
  poolAum: number;
  investorCount: number;
  navPerUnit: number;
  dailyReturnPct: number;
  cumulativeReturnPct: number;
  walkForwardScore: number | null;
  productName: string | null;
};

export type CombinedMetrics = {
  totalPoolAum: number;
  totalInvestors: number;
  strategyCount: number;
  activeCount: number;
  primaryStrategy: string | null;
  weightedDailyReturnPct: number;
  weightedCumulativeReturnPct: number;
  blendedNavPerUnit: number;
  quantConnected: boolean;
  flipbotConnected: boolean;
  killSwitchActive: boolean;
  tradingMode: string | null;
};

export function useManagerStrategies() {
  const [strategies, setStrategies] = useState<StrategyRow[]>([]);
  const [combined, setCombined] = useState<CombinedMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionKey, setActionKey] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.portfolioManager.getStrategies();
      setStrategies(data.strategies);
      setCombined(data.combined);
    } catch (error) {
      logger.error("Failed to load strategies", error);
      toast.error("Failed to load strategies");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSwitch = async (strategyKey: string) => {
    setActionKey(strategyKey);
    try {
      const { data } = await api.portfolioManager.switchStrategy(strategyKey);
      setStrategies(data.strategies);
      setCombined(data.combined);
      toast.success(`${strategyKey} is now the running strategy`);
    } catch (error) {
      logger.error("Failed to switch strategy", error);
      toast.error("Failed to switch strategy");
    } finally {
      setActionKey(null);
    }
  };

  const handleToggleActive = async (strategyKey: string, active: boolean) => {
    setActionKey(strategyKey);
    try {
      const { data } = await api.portfolioManager.setStrategyActive(
        strategyKey,
        active,
      );
      setStrategies(data.strategies);
      setCombined(data.combined);
      toast.success(active ? "Strategy activated" : "Strategy deactivated");
    } catch (error) {
      logger.error("Failed to update strategy", error);
      toast.error("Failed to update strategy");
    } finally {
      setActionKey(null);
    }
  };

  return {
    strategies,
    combined,
    loading,
    actionKey,
    load,
    handleSwitch,
    handleToggleActive,
  };
}
