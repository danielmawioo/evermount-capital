export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: "stock" | "crypto" | "forex" | "index";
}

/**
 * Sample market data for the homepage ticker widget (purely decorative —
 * this repo has no live market data feed). Not derived from any real quote
 * and not tied to actual trading activity.
 */
export const SAMPLE_MARKET_DATA: MarketData[] = [
  // Stocks
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.45,
    change: 2.35,
    changePercent: 1.33,
    type: "stock",
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: 248.92,
    change: -5.23,
    changePercent: -2.06,
    type: "stock",
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 378.21,
    change: 4.12,
    changePercent: 1.1,
    type: "stock",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    price: 485.67,
    change: 12.45,
    changePercent: 2.63,
    type: "stock",
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    price: 145.32,
    change: 1.89,
    changePercent: 1.32,
    type: "stock",
  },

  // Crypto
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 43250.5,
    change: 1250.3,
    changePercent: 2.98,
    type: "crypto",
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum",
    price: 2650.75,
    change: -45.2,
    changePercent: -1.68,
    type: "crypto",
  },
  {
    symbol: "BNB/USD",
    name: "Binance Coin",
    price: 315.42,
    change: 8.75,
    changePercent: 2.85,
    type: "crypto",
  },
  {
    symbol: "SOL/USD",
    name: "Solana",
    price: 98.25,
    change: 3.45,
    changePercent: 3.64,
    type: "crypto",
  },

  // Forex
  {
    symbol: "EUR/USD",
    name: "Euro",
    price: 1.0856,
    change: 0.0023,
    changePercent: 0.21,
    type: "forex",
  },
  {
    symbol: "GBP/USD",
    name: "British Pound",
    price: 1.2645,
    change: -0.0015,
    changePercent: -0.12,
    type: "forex",
  },
  {
    symbol: "USD/JPY",
    name: "US Dollar/Yen",
    price: 149.82,
    change: 0.45,
    changePercent: 0.3,
    type: "forex",
  },
  {
    symbol: "USD/CHF",
    name: "US Dollar/Franc",
    price: 0.8845,
    change: -0.0012,
    changePercent: -0.14,
    type: "forex",
  },

  // Indices
  {
    symbol: "SPX",
    name: "S&P 500",
    price: 4567.89,
    change: 23.45,
    changePercent: 0.52,
    type: "index",
  },
  {
    symbol: "DJI",
    name: "Dow Jones",
    price: 34567.12,
    change: -123.45,
    changePercent: -0.36,
    type: "index",
  },
  {
    symbol: "IXIC",
    name: "NASDAQ",
    price: 14234.56,
    change: 67.89,
    changePercent: 0.48,
    type: "index",
  },
];
