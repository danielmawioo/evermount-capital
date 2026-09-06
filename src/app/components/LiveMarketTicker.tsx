"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { motion } from "framer-motion";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";
import {
  useMarketTicker,
  getMarketTypeColor,
  getMarketTypeBadge,
} from "@/hooks/useMarketTicker";

export default function LiveMarketTicker() {
  const { theme } = useTheme();
  const { marketData } = useMarketTicker();

  return (
    <TranslateTree>
    <div className="hidden lg:block w-56">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-xl p-4 overflow-hidden relative"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(135deg, rgba(17, 24, 39, 0.4) 0%, rgba(17, 24, 39, 0.3) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.4) 100%)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow:
            theme === "dark"
              ? "0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08) inset, 0 1px 0 rgba(255, 255, 255, 0.08) inset"
              : "0 8px 32px 0 rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.3) inset, 0 1px 0 rgba(255, 255, 255, 0.5) inset",
          border:
            theme === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(255, 255, 255, 0.35)",
        }}
      >
        <div
          className="flex items-center justify-between mb-3 pb-3 border-b"
          style={{
            borderColor:
              theme === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center gap-2">
            <h3
              className="text-sm font-bold"
              style={{
                color:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.95)"
                    : "rgba(0, 0, 0, 0.9)",
                textShadow:
                  theme === "dark"
                    ? "0 1px 2px rgba(0, 0, 0, 0.5)"
                    : "0 1px 2px rgba(255, 255, 255, 0.8)",
              }}
            >
              Top Movers
            </h3>
            <span
              className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
              style={{
                color:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.65)"
                    : "rgba(0, 0, 0, 0.55)",
                border:
                  theme === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.15)"
                    : "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              Sample
            </span>
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
                transition: { duration: 0.2 },
              }}
              className="rounded-lg p-2.5 border transition-all cursor-pointer group"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.06)"
                    : "rgba(255, 255, 255, 0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(0, 0, 0, 0.12)",
                boxShadow:
                  theme === "dark"
                    ? "0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
                    : "0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3) inset",
              }}
              onHoverStart={(e) => {
                const target = e.currentTarget as HTMLElement | null;
                if (!target) return;
                if (theme === "dark") {
                  target.style.background = "rgba(255, 255, 255, 0.08)";
                  target.style.borderColor = "rgba(0, 167, 111, 0.4)";
                } else {
                  target.style.background = "rgba(0, 167, 111, 0.1)";
                  target.style.borderColor = "rgba(0, 167, 111, 0.3)";
                }
              }}
              onHoverEnd={(e) => {
                const target = e.currentTarget as HTMLElement | null;
                if (!target) return;
                if (theme === "dark") {
                  target.style.background = "rgba(255, 255, 255, 0.04)";
                  target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                } else {
                  target.style.background = "rgba(255, 255, 255, 0.5)";
                  target.style.borderColor = "rgba(0, 0, 0, 0.08)";
                }
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="font-bold text-xs truncate"
                      style={{
                        color:
                          theme === "dark"
                            ? "rgba(255, 255, 255, 0.95)"
                            : "rgba(0, 0, 0, 0.9)",
                        textShadow:
                          theme === "dark"
                            ? "0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.4)"
                            : "0 1px 2px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {item.symbol}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                        getMarketTypeColor(item.type).text
                      } flex-shrink-0`}
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? `rgba(${getMarketTypeColor(item.type).rgb}, 0.2)`
                            : `rgba(${getMarketTypeColor(item.type).rgb}, 0.15)`,
                        textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                        border: `1px solid rgba(${getMarketTypeColor(item.type).rgb}, 0.3)`,
                      }}
                    >
                      {getMarketTypeBadge(item.type).charAt(0)}
                    </span>
                  </div>
                  <p
                    className="text-[10px] truncate font-medium"
                    style={{
                      color:
                        theme === "dark"
                          ? "rgba(255, 255, 255, 0.85)"
                          : "rgba(0, 0, 0, 0.75)",
                      textShadow:
                        theme === "dark"
                          ? "0 1px 2px rgba(0, 0, 0, 0.6)"
                          : "0 1px 2px rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {item.name}
                  </p>
                </div>
                {item.changePercent >= 0 ? (
                  <ArrowTrendingUpIcon
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{
                      color: "#10b981",
                      filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))",
                    }}
                  />
                ) : (
                  <ArrowTrendingDownIcon
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{
                      color: "#ef4444",
                      filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))",
                    }}
                  />
                )}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p
                    className="text-xs font-bold"
                    style={{
                      color:
                        theme === "dark"
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(0, 0, 0, 0.9)",
                      textShadow:
                        theme === "dark"
                          ? "0 1px 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.4)"
                          : "0 1px 2px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    $
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: item.type === "forex" ? 4 : 2,
                      maximumFractionDigits: item.type === "forex" ? 4 : 2,
                    })}
                  </p>
                </div>
                <div
                  className="text-xs font-bold flex items-center gap-0.5"
                  style={{
                    color: item.changePercent >= 0 ? "#10b981" : "#ef4444",
                    textShadow:
                      "0 1px 3px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.3)",
                    fontWeight: "700",
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
            borderColor:
              theme === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            className="text-[10px] font-medium"
            style={{
              color:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(0, 0, 0, 0.6)",
              textShadow:
                theme === "dark"
                  ? "0 1px 2px rgba(0, 0, 0, 0.5)"
                  : "0 1px 2px rgba(255, 255, 255, 0.8)",
            }}
          >
            Sample data • Illustrative only
          </p>
        </motion.div>
      </motion.div>
    </div>
  
    </TranslateTree>
  );
}
