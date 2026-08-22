import { useEffect, useState } from "react";
import { MarketData, SAMPLE_MARKET_DATA } from "@/lib/mock-market-data";

const TOP_MOVERS_COUNT = 10;
const SIMULATION_INTERVAL_MS = 5000;

/**
 * Drives the homepage's decorative "top movers" widget: seeds from
 * SAMPLE_MARKET_DATA (sorted by absolute % change) and then simulates small
 * price movements on an interval. Not connected to any real market feed.
 */
export function useMarketTicker() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useEffect(() => {
    const sortedData = [...SAMPLE_MARKET_DATA].sort(
      (a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent),
    );
    setMarketData(sortedData.slice(0, TOP_MOVERS_COUNT));

    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => {
          const randomChange = (Math.random() - 0.5) * 0.5;
          const newChangePercent = item.changePercent + randomChange;
          const newChange = (item.price * newChangePercent) / 100;
          return {
            ...item,
            price: item.price + newChange,
            change: newChange,
            changePercent: newChangePercent,
          };
        }),
      );
    }, SIMULATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return { marketData, simulationIntervalMs: SIMULATION_INTERVAL_MS };
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
