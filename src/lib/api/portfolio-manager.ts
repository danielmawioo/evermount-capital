import { apiClient } from "./client";

export const portfolioManager = {
  getStrategies: () =>
    apiClient.get<{
      strategies: Array<{
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
      }>;
      combined: {
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
    }>("/portfolio-manager/strategies"),

  switchStrategy: (strategyKey: string) =>
    apiClient.post(`/portfolio-manager/strategies/${strategyKey}/switch`),

  setStrategyActive: (strategyKey: string, active: boolean) =>
    apiClient.post(`/portfolio-manager/strategies/${strategyKey}/active`, {
      active,
    }),

  createClient: (data: {
    email: string;
    password: string;
    fullName: string;
    phoneNumber?: string;
    notes?: string;
  }) =>
    apiClient.post<{
      message: string;
      client: {
        assignmentId: string;
        clientId: string;
        email: string;
        fullName: string;
        kycStatus: string;
      };
    }>("/portfolio-manager/clients", data),

  assignClient: (data: { email: string; notes?: string }) =>
    apiClient.post<{
      message: string;
      client: {
        assignmentId: string;
        clientId: string;
        email: string;
        fullName: string;
        kycStatus: string;
      };
    }>("/portfolio-manager/clients/assign", data),

  getClients: () =>
    apiClient.get<{
      clients: Array<{
        assignmentId: string;
        assignedAt: string;
        clientId: string;
        email: string;
        fullName: string;
        kycStatus: string;
        wallet: {
          currency: string;
          availableBalance: number;
          pendingBalance: number;
          lockedBalance: number;
        } | null;
        totalInvested: number;
        activeInvestments: Array<{
          id: string;
          amountInvested: number;
          currentValue: number | null;
          assetName: string;
          strategyKey: string | null;
          investmentOptionId: string | null;
        }>;
      }>;
    }>("/portfolio-manager/clients"),

  getInvestmentOptions: () =>
    apiClient.get<{
      options: Array<{
        id: string;
        name: string;
        symbol: string;
        strategyKey: string | null;
        minInvestment: number;
        riskLevel: string;
      }>;
    }>("/portfolio-manager/investment-options"),

  previewAllocation: (
    clientId: string,
    data: {
      investmentOptionId: string;
      amount: number;
      lockInMonths?: number;
    }
  ) =>
    apiClient.post(
      `/portfolio-manager/clients/${clientId}/allocate/preview`,
      data
    ),

  allocateForClient: (
    clientId: string,
    data: {
      investmentOptionId: string;
      amount: number;
      lockInMonths?: number;
    }
  ) => apiClient.post(`/portfolio-manager/clients/${clientId}/allocate`, data),

  unassignClient: (clientId: string) =>
    apiClient.delete(`/portfolio-manager/clients/${clientId}`),
};
