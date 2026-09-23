import { apiClient } from "./client";

export type DelayClass = "DELAYED" | "STALE" | "UNAVAILABLE";

export interface MarketQuote {
  last: number;
  bid: number;
  ask: number;
  volume: number;
  source: string;
  observedAt: string;
  ingestedAt: string;
  ageMs: number;
}

export interface MarketInstrument {
  symbol: string;
  name: string;
  delayClass: DelayClass;
  quote: MarketQuote | null;
}

export interface MarketsListResponse {
  instruments: MarketInstrument[];
}

export const markets = {
  list: () => apiClient.get<MarketsListResponse>("/v1/markets"),

  getQuote: (symbol: string) =>
    apiClient.get<MarketInstrument>(`/v1/markets/${symbol}`),
};
