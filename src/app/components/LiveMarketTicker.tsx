"use client";

import { motion } from "framer-motion";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: "stock" | "crypto" | "forex" | "index";
}

export default function LiveMarketTicker() {
  const { theme } = useTheme();
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
        return { text: "text-yellow-500", rgb: "251, 191, 36" }; // yellow-400
      case "forex":
        return { text: "text-blue-500", rgb: "59, 130, 246" }; // blue-500
      case "index":
        return { text: "text-purple-500", rgb: "168, 85, 247" }; // purple-500
      default:
        return { text: "text-green-500", rgb: "34, 197, 94" }; // green-500
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
    <div className="hidden lg:block w-56">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-xl p-4 overflow-hidden relative"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.4) 0%, rgba(17, 24, 39, 0.3) 100%)' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.4) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: theme === 'dark'
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08) inset, 0 1px 0 rgba(255, 255, 255, 0.08) inset'
            : '0 8px 32px 0 rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.3) inset, 0 1px 0 rgba(255, 255, 255, 0.5) inset',
          border: theme === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(255, 255, 255, 0.35)',
        }}
      >
        <div 
          className="flex items-center justify-between mb-3 pb-3 border-b"
          style={{
            borderColor: theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex items-center gap-2">
            <h3 
              className="text-sm font-bold"
              style={{
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                textShadow: theme === 'dark' 
                  ? '0 1px 2px rgba(0, 0, 0, 0.5)' 
                  : '0 1px 2px rgba(255, 255, 255, 0.8)',
              }}
            >
              Top Movers
            </h3>
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-lg"
              style={{
                boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
              }}
            />
          </div>
        </div>

        <div className="space-y-2 max-h-[480px] overflow-y-auto custom-scrollbar pr-1">
          {marketData.map((item, index) => (
            <motion.div
              key={`${item.symbol}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.02, 
                x: 3,
                transition: { duration: 0.2 }
              }}
              className="rounded-lg p-2.5 border transition-all cursor-pointer group"
              style={{
                background: theme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.06)' 
                  : 'rgba(255, 255, 255, 0.55)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderColor: theme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.15)' 
                  : 'rgba(0, 0, 0, 0.12)',
                boxShadow: theme === 'dark'
                  ? '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
                  : '0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3) inset',
              }}
              onHoverStart={(e) => {
                if (!e.currentTarget) return;
                if (theme === 'dark') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(0, 167, 111, 0.4)';
                } else {
                  e.currentTarget.style.background = 'rgba(0, 167, 111, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 167, 111, 0.3)';
                }
              }}
              onHoverEnd={(e) => {
                if (!e.currentTarget) return;
                if (theme === 'dark') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                }
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span 
                      className="font-bold text-xs truncate"
                      style={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                        textShadow: theme === 'dark' 
                          ? '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.4)' 
                          : '0 1px 2px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 0.6)',
                      }}
                    >
                      {item.symbol}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${getTypeColor(
                        item.type
                      ).text} flex-shrink-0`}
                      style={{
                        backgroundColor: theme === 'dark' 
                          ? `rgba(${getTypeColor(item.type).rgb}, 0.2)` 
                          : `rgba(${getTypeColor(item.type).rgb}, 0.15)`,
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
                        border: `1px solid rgba(${getTypeColor(item.type).rgb}, 0.3)`,
                      }}
                    >
                      {getTypeBadge(item.type).charAt(0)}
                    </span>
                  </div>
                  <p 
                    className="text-[10px] truncate font-medium"
                    style={{
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)',
                      textShadow: theme === 'dark' 
                        ? '0 1px 2px rgba(0, 0, 0, 0.6)' 
                        : '0 1px 2px rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {item.name}
                  </p>
                </div>
                {item.changePercent >= 0 ? (
                  <ArrowTrendingUpIcon 
                    className="w-4 h-4 flex-shrink-0 mt-0.5" 
                    style={{
                      color: '#10b981',
                      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))',
                    }}
                  />
                ) : (
                  <ArrowTrendingDownIcon 
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{
                      color: '#ef4444',
                      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))',
                    }}
                  />
                )}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p 
                    className="text-xs font-bold"
                    style={{
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                      textShadow: theme === 'dark' 
                        ? '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.4)' 
                        : '0 1px 2px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    ${item.price.toLocaleString(undefined, {
                      minimumFractionDigits: item.type === "forex" ? 4 : 2,
                      maximumFractionDigits: item.type === "forex" ? 4 : 2,
                    })}
                  </p>
                </div>
                <div
                  className="text-xs font-bold flex items-center gap-0.5"
                  style={{
                    color: item.changePercent >= 0 ? '#10b981' : '#ef4444',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.3)',
                    fontWeight: '700',
                  }}
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
          className="mt-3 pt-3 border-t text-center"
          style={{
            borderColor: theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)',
          }}
        >
          <p 
            className="text-[10px] font-medium"
            style={{
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              textShadow: theme === 'dark' 
                ? '0 1px 2px rgba(0, 0, 0, 0.5)' 
                : '0 1px 2px rgba(255, 255, 255, 0.8)',
            }}
          >
            Live • Updates 5s
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

