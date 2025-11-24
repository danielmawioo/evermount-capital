"use client";

import { motion } from "framer-motion";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: "stock" | "crypto" | "forex" | "index";
}

export default function LiveMarketTicker() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  // Mock data - in production, this would come from an API
  useEffect(() => {
    const mockData: MarketData[] = [
      // Stocks
      { symbol: "AAPL", name: "Apple Inc.", price: 178.45, change: 2.35, changePercent: 1.33, type: "stock" },
      { symbol: "TSLA", name: "Tesla", price: 248.92, change: -5.23, changePercent: -2.06, type: "stock" },
      { symbol: "MSFT", name: "Microsoft", price: 378.21, change: 4.12, changePercent: 1.10, type: "stock" },
      { symbol: "NVDA", name: "NVIDIA", price: 485.67, change: 12.45, changePercent: 2.63, type: "stock" },
      { symbol: "AMZN", name: "Amazon", price: 145.32, change: 1.89, changePercent: 1.32, type: "stock" },
      
      // Crypto
      { symbol: "BTC/USD", name: "Bitcoin", price: 43250.50, change: 1250.30, changePercent: 2.98, type: "crypto" },
      { symbol: "ETH/USD", name: "Ethereum", price: 2650.75, change: -45.20, changePercent: -1.68, type: "crypto" },
      { symbol: "BNB/USD", name: "Binance Coin", price: 315.42, change: 8.75, changePercent: 2.85, type: "crypto" },
      { symbol: "SOL/USD", name: "Solana", price: 98.25, change: 3.45, changePercent: 3.64, type: "crypto" },
      
      // Forex
      { symbol: "EUR/USD", name: "Euro", price: 1.0856, change: 0.0023, changePercent: 0.21, type: "forex" },
      { symbol: "GBP/USD", name: "British Pound", price: 1.2645, change: -0.0015, changePercent: -0.12, type: "forex" },
      { symbol: "USD/JPY", name: "US Dollar/Yen", price: 149.82, change: 0.45, changePercent: 0.30, type: "forex" },
      { symbol: "USD/CHF", name: "US Dollar/Franc", price: 0.8845, change: -0.0012, changePercent: -0.14, type: "forex" },
      
      // Indices
      { symbol: "SPX", name: "S&P 500", price: 4567.89, change: 23.45, changePercent: 0.52, type: "index" },
      { symbol: "DJI", name: "Dow Jones", price: 34567.12, change: -123.45, changePercent: -0.36, type: "index" },
      { symbol: "IXIC", name: "NASDAQ", price: 14234.56, change: 67.89, changePercent: 0.48, type: "index" },
    ];

    // Sort by absolute change percentage (biggest movers first)
    const sortedData = mockData.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
    setMarketData(sortedData.slice(0, 10)); // Show top 10 movers

    // Simulate live updates every 5 seconds
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => {
          // Simulate small price movements
          const randomChange = (Math.random() - 0.5) * 0.5;
          const newChangePercent = item.changePercent + randomChange;
          const newChange = (item.price * newChangePercent) / 100;
          return {
            ...item,
            price: item.price + newChange,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "crypto":
        return "text-yellow-500";
      case "forex":
        return "text-blue-500";
      case "index":
        return "text-purple-500";
      default:
        return "text-green-500";
    }
  };

  const getTypeBadge = (type: string) => {
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
  };

  return (
    <div className="hidden xl:block w-64 sticky top-24">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Top Movers
          </h3>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-green-500 rounded-full"
          />
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
          {marketData.map((item, index) => (
            <motion.div
              key={`${item.symbol}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 3 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-2 border border-gray-200/50 dark:border-gray-700/50 hover:border-[#00a76f]/50 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-bold text-xs text-gray-900 dark:text-white truncate">
                      {item.symbol}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${getTypeColor(
                        item.type
                      )} bg-opacity-10 flex-shrink-0`}
                    >
                      {getTypeBadge(item.type).charAt(0)}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 truncate">
                    {item.name}
                  </p>
                </div>
                {item.changePercent >= 0 ? (
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                ) : (
                  <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
                )}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    ${item.price.toLocaleString(undefined, {
                      minimumFractionDigits: item.type === "forex" ? 4 : 2,
                      maximumFractionDigits: item.type === "forex" ? 4 : 2,
                    })}
                  </p>
                </div>
                <div
                  className={`text-xs font-bold ${
                    item.changePercent >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span>{item.changePercent >= 0 ? "+" : ""}</span>
                  <span>{item.changePercent.toFixed(2)}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-center"
        >
          <p className="text-[10px] text-gray-500 dark:text-gray-400">
            Live • Updates 5s
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

