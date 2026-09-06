import { useMemo } from "react";
import { MarketData, SAMPLE_MARKET_DATA } from "@/lib/mock-market-data";

const TOP_MOVERS_COUNT = 10;

/**
 * Homepage decorative "top movers" widget. Static sample quotes only —
 * not connected to any market feed and not simulated as live prices.
 */
export function useMarketTicker() {
  const marketData = useMemo(() => {
    return [...SAMPLE_MARKET_DATA]
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
      .slice(0, TOP_MOVERS_COUNT);
  }, []);

  return { marketData };
}

export function getMarketTypeColor(type: MarketData["type"]) {
  switch (type) {
    case "crypto":
      return { text: "text-yellow-500", rgb: "251, 191, 36" };
    case "forex":
      return { text: "text-blue-500", rgb: "59, 130, 246" };
    case "index":
      return { text: "text-purple-500", rgb: "168, 85, 247" };
    default:
      return { text: "text-green-500", rgb: "34, 197, 94" };
  }
}

export function getMarketTypeBadge(type: MarketData["type"]) {
  switch (type) {
    case "crypto":
      return "Crypto";
    case "forex":
      return "Forex";
    case "index":
      return "Index";
    default:
      return "Stock";
  }
}
