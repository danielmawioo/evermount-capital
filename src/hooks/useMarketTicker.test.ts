import { renderHook, act } from "@testing-library/react";
import {
  useMarketTicker,
  getMarketTypeColor,
  getMarketTypeBadge,
} from "./useMarketTicker";

describe("useMarketTicker", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("seeds the top 10 movers sorted by absolute change percent", () => {
    const { result } = renderHook(() => useMarketTicker());

    expect(result.current.marketData).toHaveLength(10);
    expect(result.current.marketData[0].name).toBe("Solana");
  });

  it("simulates a price movement on each interval tick", () => {
    jest.spyOn(Math, "random").mockReturnValue(1);
    const { result } = renderHook(() => useMarketTicker());

    const initialPercent = result.current.marketData[0].changePercent;

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.marketData[0].changePercent).not.toBe(initialPercent);
  });

  it("clears the interval on unmount", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    const { unmount } = renderHook(() => useMarketTicker());

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
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
