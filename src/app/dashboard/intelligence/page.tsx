"use client";

import TranslateTree from "@/app/components/TranslateTree";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import type { MarketInstrument, DelayClass } from "@/lib/api/markets";
import {
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface IntelligencePageState {
  instruments: MarketInstrument[];
  loading: boolean;
  error: string | null;
  authError: boolean;
}

export default function IntelligencePage() {
  const router = useRouter();
  const [state, setState] = useState<IntelligencePageState>({
    instruments: [],
    loading: true,
    error: null,
    authError: false,
  });

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      setState((prev) => ({ ...prev, authError: true, loading: false }));
      return;
    }
    loadMarkets();
  }, []);

  const loadMarkets = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.markets.list();
      setState({
        instruments: response.data.instruments || [],
        loading: false,
        error: null,
        authError: false,
      });
    } catch (error: any) {
      logger.error("Failed to load markets", error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        setState({
          instruments: [],
          loading: false,
          error: null,
          authError: true,
        });
      } else {
        setState({
          instruments: [],
          loading: false,
          error: error.response?.status >= 500
            ? "Service temporarily unavailable. Please try again."
            : "Failed to load market data",
          authError: false,
        });
      }
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  const formatTimestamp = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
    } catch {
      return "—";
    }
  };

  const formatAge = (ageMs: number) => {
    const seconds = Math.floor(ageMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };

  const getDelayBadge = (delayClass: DelayClass) => {
    switch (delayClass) {
      case "DELAYED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-semibold px-3 py-1">
            <ClockIcon className="w-3.5 h-3.5" />
            Delayed
          </span>
        );
      case "STALE":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 text-xs font-semibold px-3 py-1">
            <ExclamationTriangleIcon className="w-3.5 h-3.5" />
            Stale
          </span>
        );
      case "UNAVAILABLE":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-xs font-semibold px-3 py-1">
            <ExclamationTriangleIcon className="w-3.5 h-3.5" />
            Unavailable
          </span>
        );
    }
  };

  if (state.authError) {
    return (
      <TranslateTree>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Market Intelligence
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Real-time market data and analysis
            </p>
          </div>

          <div className="bg-white dark:bg-[#161a23] rounded-xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm text-center">
            <InformationCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Request Access
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Market intelligence features require authentication. Please sign in
              or contact support to request access to delayed market data.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center justify-center rounded-lg bg-[#00a76f] text-white text-sm font-semibold px-6 py-2.5 hover:bg-[#008f5d] transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </TranslateTree>
    );
  }

  if (state.loading) {
    return (
      <TranslateTree>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Market Intelligence
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Real-time market data and analysis
            </p>
          </div>

          <div className="bg-white dark:bg-[#161a23] rounded-xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00a76f] mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Loading market data...
            </p>
          </div>
        </div>
      </TranslateTree>
    );
  }

  if (state.error) {
    return (
      <TranslateTree>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Market Intelligence
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Real-time market data and analysis
            </p>
          </div>

          <div className="bg-white dark:bg-[#161a23] rounded-xl p-8 border border-red-200 dark:border-red-900/30 shadow-sm text-center">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {state.error}
            </h3>
            <button
              onClick={loadMarkets}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00a76f] text-white text-sm font-semibold px-6 py-2.5 hover:bg-[#008f5d] transition mt-4"
            >
              <ArrowPathIcon className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      </TranslateTree>
    );
  }

  if (state.instruments.length === 0) {
    return (
      <TranslateTree>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Market Intelligence
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Real-time market data and analysis
            </p>
          </div>

          <div className="bg-white dark:bg-[#161a23] rounded-xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm text-center">
            <InformationCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No market data available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Market instruments will appear here when available.
            </p>
          </div>
        </div>
      </TranslateTree>
    );
  }

  return (
    <TranslateTree>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Market Intelligence
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Real-time market data and analysis
            </p>
          </div>
          <button
            onClick={loadMarkets}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {state.instruments.map((instrument) => (
            <div
              key={instrument.symbol}
              className="bg-white dark:bg-[#161a23] rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {instrument.symbol}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {instrument.name}
                  </p>
                </div>
                {getDelayBadge(instrument.delayClass)}
              </div>

              {instrument.quote && instrument.delayClass !== "UNAVAILABLE" ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-[#00a76f] tabular-nums">
                      ${formatPrice(instrument.quote.last)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Last price
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Bid
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white tabular-nums">
                        ${formatPrice(instrument.quote.bid)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ask
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white tabular-nums">
                        ${formatPrice(instrument.quote.ask)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Volume
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white tabular-nums">
                        {instrument.quote.volume.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Source
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {instrument.quote.source}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <ClockIcon className="w-3.5 h-3.5" />
                      <span>
                        {formatTimestamp(instrument.quote.observedAt)} ·{" "}
                        {formatAge(instrument.quote.ageMs)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <ExclamationTriangleIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quote data unavailable
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Please try again later or contact support
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
          <div className="flex gap-3">
            <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-semibold mb-1">About Market Data</p>
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Delayed:</strong> Data delayed by up to 15 minutes.{" "}
                <strong>Stale:</strong> Data older than 15 minutes.{" "}
                <strong>Unavailable:</strong> Quote data not currently available.
                This data is provided for informational purposes only and should
                not be used as the sole basis for trading decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TranslateTree>
  );
}
