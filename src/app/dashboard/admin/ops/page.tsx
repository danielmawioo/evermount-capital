"use client";

import {
  BoltIcon,
  ShieldExclamationIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  useTradingOps,
  FLIPBOT_STRATEGY_KEYS,
  STRATEGY_SYMBOLS,
} from "@/hooks/useTradingOps";

export default function TradingOpsPage() {
  const {
    status,
    flipbot,
    lifecycle,
    loading,
    actionLoading,
    reconHistory,
    flipbotPool,
    exnessPartner,
    signalForm,
    setSignalForm,
    quant,
    killActive,
    loadStatus,
    handleKillSwitch,
    handlePromotionCheck,
    handlePromote,
    handleSyncPositions,
    handleDemoReconciliation,
    handlePushFlipbotSignal,
    handleNavBatch,
  } = useTradingOps();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BoltIcon className="w-8 h-8 text-[#00a76f]" />
            Trading Ops
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor quant engine, kill switch, and NAV publishing
          </p>
        </div>
        <button
          onClick={loadStatus}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
            Quant Connection
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Status:{" "}
            <span
              className={
                status?.connected ? "text-green-600 font-medium" : "text-red-600"
              }
            >
              {status?.connected ? "Connected" : "Disconnected"}
            </span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Mode: {quant?.mode ?? "—"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Last updated:{" "}
            {quant?.last_updated
              ? new Date(quant.last_updated).toLocaleString()
              : "—"}
          </p>
        </div>

        <div
          className={`rounded-xl border p-5 ${
            killActive
              ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          }`}
        >
          <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
            <ShieldExclamationIcon className="w-5 h-5" />
            Kill Switch
          </h2>
          <p className="text-sm mb-4">
            {killActive ? (
              <span className="text-red-700 dark:text-red-300 font-medium">
                ACTIVE — {quant?.kill_switch_reason || "No reason provided"}
              </span>
            ) : (
              <span className="text-green-700 dark:text-green-300">
                Inactive — trading allowed
              </span>
            )}
          </p>
          <div className="flex gap-2">
            {!killActive ? (
              <button
                disabled={actionLoading}
                onClick={() => handleKillSwitch(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg disabled:opacity-50"
              >
                Activate Kill Switch
              </button>
            ) : (
              <button
                disabled={actionLoading}
                onClick={() => handleKillSwitch(false)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg disabled:opacity-50"
              >
                Deactivate
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            NAV Publishing
          </h2>
          <button
            disabled={actionLoading}
            onClick={handleNavBatch}
            className="px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white text-sm rounded-lg disabled:opacity-50"
          >
            Run NAV Batch
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Pulls strategy NAV from evermount-quant and updates investor portfolio
          values.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
          Strategies
        </h2>
        {!quant?.strategies?.length ? (
          <p className="text-sm text-gray-500">No strategies reported</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b dark:border-gray-700">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Active</th>
                  <th className="pb-2">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {quant.strategies.map((s) => (
                  <tr key={s.name} className="border-b dark:border-gray-700/50">
                    <td className="py-2 font-medium text-gray-900 dark:text-white">
                      {s.name}
                    </td>
                    <td className="py-2">{s.active ? "Yes" : "No"}</td>
                    <td className="py-2">
                      {(s.capital_allocation * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-2">
          Open Positions
        </h2>
        <p className="text-sm text-gray-500">
          {quant?.positions?.length
            ? `${quant.positions.length} position(s)`
            : "No open positions reported (paper trading)"}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
          Flipbot — Pooled Exness MT5 Demo Execution
        </h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <p>
            API:{" "}
            <span
              className={
                flipbot?.connected ? "text-green-600 font-medium" : "text-red-600"
              }
            >
              {flipbot?.connected ? "Connected" : "Disconnected"}
            </span>
          </p>
          <p>
            Bridge:{" "}
            <span
              className={
                flipbot?.bridgeEnabled
                  ? "text-green-600 font-medium"
                  : "text-amber-600"
              }
            >
              {flipbot?.bridgeEnabled ? "Enabled" : "Disabled"}
            </span>
          </p>
          <p>
            Model:{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {flipbot?.executionModel ?? "pooled"}
            </span>
          </p>
        </div>
        {flipbot?.health && (
          <p className="text-sm text-gray-500 mb-1">
            v{flipbot.health.version ?? "?"} — {flipbot.health.status}
          </p>
        )}
        {flipbot?.tradingStyle?.trading_style && (
          <p className="text-sm text-gray-500 mb-4">
            Style: {flipbot.tradingStyle.trading_style}
          </p>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Queue demo trade (Exness MT5 account)
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            FlipbotEA polls the signal queue and executes on the logged-in Exness MT5
            demo. Successful fills bump investor NAV via FillRecorded.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            <label className="block text-xs text-gray-500">
              Strategy
              <select
                value={signalForm.strategyKey}
                onChange={(e) => {
                  const key = e.target.value;
                  setSignalForm((f) => ({
                    ...f,
                    strategyKey: key,
                    symbol: STRATEGY_SYMBOLS[key] ?? f.symbol,
                  }));
                }}
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                {FLIPBOT_STRATEGY_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs text-gray-500">
              Symbol
              <input
                type="text"
                value={signalForm.symbol}
                onChange={(e) =>
                  setSignalForm((f) => ({ ...f, symbol: e.target.value.toUpperCase() }))
                }
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-xs text-gray-500">
              Side
              <select
                value={signalForm.side}
                onChange={(e) =>
                  setSignalForm((f) => ({
                    ...f,
                    side: e.target.value as "buy" | "sell",
                  }))
                }
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </label>

            <label className="block text-xs text-gray-500">
              Lots
              <input
                type="number"
                min={0.01}
                step={0.01}
                value={signalForm.volumeLots}
                onChange={(e) =>
                  setSignalForm((f) => ({
                    ...f,
                    volumeLots: parseFloat(e.target.value) || 0.01,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-xs text-gray-500">
              SL (pips)
              <input
                type="number"
                min={1}
                value={signalForm.slPips}
                onChange={(e) =>
                  setSignalForm((f) => ({
                    ...f,
                    slPips: parseInt(e.target.value, 10) || 20,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-xs text-gray-500">
              TP (pips)
              <input
                type="number"
                min={1}
                value={signalForm.tpPips}
                onChange={(e) =>
                  setSignalForm((f) => ({
                    ...f,
                    tpPips: parseInt(e.target.value, 10) || 40,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              />
            </label>
          </div>

          {flipbotPool && (
            <p className="text-xs text-gray-500 mb-3">
              Pooled AUM ({flipbotPool.strategyKey}):{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                ${flipbotPool.poolAum.toLocaleString()}
              </span>
            </p>
          )}

          <button
            disabled={actionLoading || !flipbot?.connected}
            onClick={handlePushFlipbotSignal}
            className="px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white text-sm rounded-lg disabled:opacity-50"
          >
            Queue signal on MT5 demo
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
          Exness Partner Broker
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Partnership API for referral links, client reports, and commission data.
          Trading execution uses Exness MT5 above — not this API.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <p>
            API:{" "}
            <span
              className={
                exnessPartner?.status?.connected
                  ? "text-green-600 font-medium"
                  : exnessPartner?.status?.enabled
                    ? "text-amber-600"
                    : "text-gray-500"
              }
            >
              {exnessPartner?.status?.connected
                ? "Connected"
                : exnessPartner?.status?.enabled
                  ? "Not connected"
                  : "Disabled"}
            </span>
          </p>
          {exnessPartner?.summary?.wallet?.summary_equity != null && (
            <p>
              Wallet equity:{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                ${exnessPartner.summary.wallet.summary_equity.toLocaleString()}
              </span>
            </p>
          )}
          {exnessPartner?.summary?.clients?.total != null && (
            <p>
              Referred clients:{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {exnessPartner.summary.clients.total}
              </span>
            </p>
          )}
          {exnessPartner?.summary?.rewards?.totalCommissionUsd != null && (
            <p>
              Commission (USD):{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                $
                {exnessPartner.summary.rewards.totalCommissionUsd.toLocaleString()}
              </span>
            </p>
          )}
        </div>
        {(exnessPartner?.summary?.referralLink ||
          exnessPartner?.status?.referralLink) && (
          <p className="text-xs text-gray-500 break-all">
            Referral link
            {exnessPartner?.summary?.referralLinkSource === "configured" ||
            exnessPartner?.status?.referralLinkSource === "configured"
              ? " (configured)"
              : ""}
            :{" "}
            <a
              href={
                exnessPartner?.summary?.referralLink ||
                exnessPartner?.status?.referralLink
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00a76f] hover:underline"
            >
              {exnessPartner?.summary?.referralLink ||
                exnessPartner?.status?.referralLink}
            </a>
          </p>
        )}
        {exnessPartner?.status?.error && (
          <p className="text-xs text-amber-600 mt-2">{exnessPartner.status.error}</p>
        )}
        {!exnessPartner?.status?.enabled &&
          !exnessPartner?.summary?.referralLink &&
          !exnessPartner?.status?.referralLink && (
          <p className="text-xs text-gray-500 mt-2">
            Set EXNESS_PARTNER_REFERRAL_LINK or enable EXNESS_PARTNER_ENABLED with
            PPA credentials in backend env.
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Demo reconciliation (30d)
          </h2>
          <div className="flex gap-2">
            <button
              disabled={actionLoading}
              onClick={handleSyncPositions}
              className="text-xs px-3 py-1.5 border rounded-lg"
            >
              Sync positions
            </button>
            <button
              disabled={actionLoading}
              onClick={handleDemoReconciliation}
              className="text-xs px-3 py-1.5 bg-[#00a76f] text-white rounded-lg"
            >
              Run reconciliation
            </button>
          </div>
        </div>
        {reconHistory.length === 0 ? (
          <p className="text-sm text-gray-500">No reconciliation runs yet</p>
        ) : (
          <ul className="text-sm space-y-2">
            {reconHistory.slice(0, 5).map((r) => (
              <li key={r.id} className="flex justify-between gap-4">
                <span>
                  <span className="font-medium">{r.status}</span> — {r.navDriftCount}{" "}
                  drift(s)
                </span>
                <span className="text-gray-500">
                  {new Date(r.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
          Strategy lifecycle
        </h2>
        {lifecycle.length === 0 && quant?.strategies?.length ? (
          <div className="space-y-2">
            {quant.strategies.map((s) => (
              <div
                key={s.name}
                className="flex flex-wrap items-center justify-between gap-2 py-2 border-b dark:border-gray-700/50"
              >
                <span className="font-medium">{s.name}</span>
                <div className="flex gap-2">
                  <button
                    disabled={actionLoading}
                    onClick={() => handlePromotionCheck(s.name)}
                    className="text-xs px-3 py-1 border rounded-lg"
                  >
                    Walk-forward check
                  </button>
                  <button
                    disabled={actionLoading}
                    onClick={() => handlePromote(s.name, "PAPER")}
                    className="text-xs px-3 py-1 bg-[#00a76f] text-white rounded-lg"
                  >
                    Promote to PAPER
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : lifecycle.length === 0 ? (
          <p className="text-sm text-gray-500">No lifecycle records</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b dark:border-gray-700">
                <th className="pb-2">Strategy</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">WF score</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lifecycle.map((row) => (
                <tr key={row.id} className="border-b dark:border-gray-700/50">
                  <td className="py-2 font-medium">{row.strategyKey}</td>
                  <td className="py-2">{row.status}</td>
                  <td className="py-2">
                    {row.walkForwardScore != null
                      ? Number(row.walkForwardScore).toFixed(2)
                      : "—"}
                  </td>
                  <td className="py-2 flex gap-2">
                    <button
                      disabled={actionLoading}
                      onClick={() => handlePromotionCheck(row.strategyKey)}
                      className="text-xs px-2 py-1 border rounded"
                    >
                      Check
                    </button>
                    {row.status !== "PAPER" && row.status !== "PRODUCTION" && (
                      <button
                        disabled={actionLoading}
                        onClick={() => handlePromote(row.strategyKey, "PAPER")}
                        className="text-xs px-2 py-1 bg-[#00a76f] text-white rounded"
                      >
                        → PAPER
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
