import { renderHook } from "@testing-library/react";
import {
  useMarketTicker,
  getMarketTypeColor,
  getMarketTypeBadge,
} from "./useMarketTicker";

describe("useMarketTicker", () => {
  it("seeds the top 10 movers sorted by absolute change percent", () => {
    const { result } = renderHook(() => useMarketTicker());

    expect(result.current.marketData).toHaveLength(10);
    expect(result.current.marketData[0].name).toBe("Solana");
  });

  it("does not simulate live price movement", () => {
    jest.useFakeTimers();
    jest.spyOn(Math, "random").mockReturnValue(1);
    const { result } = renderHook(() => useMarketTicker());
    const initialPercent = result.current.marketData[0].changePercent;
    jest.advanceTimersByTime(30_000);
    expect(result.current.marketData[0].changePercent).toBe(initialPercent);
    jest.useRealTimers();
    jest.restoreAllMocks();
  });
});

describe("getMarketTypeColor", () => {
  it("returns a distinct color per type", () => {
    expect(getMarketTypeColor("crypto").text).toBe("text-yellow-500");
    expect(getMarketTypeColor("forex").text).toBe("text-blue-500");
    expect(getMarketTypeColor("index").text).toBe("text-purple-500");
    expect(getMarketTypeColor("stock").text).toBe("text-green-500");
  });
});

describe("getMarketTypeBadge", () => {
  it("returns a label per type", () => {
    expect(getMarketTypeBadge("crypto")).toBe("Crypto");
    expect(getMarketTypeBadge("forex")).toBe("Forex");
    expect(getMarketTypeBadge("index")).toBe("Index");
    expect(getMarketTypeBadge("stock")).toBe("Stock");
  });
});
