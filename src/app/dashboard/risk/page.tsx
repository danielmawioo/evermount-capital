"use client";

export default function RiskMetricsPage() {
  const metrics = [
    { name: "Max Drawdown", value: "5.2%" },
    { name: "Volatility", value: "2.7%" },
    { name: "Sharpe Ratio", value: "1.23" },
    { name: "Beta", value: "0.86" },
    { name: "Exposure", value: "Moderate" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Risk Metrics Overview
      </h1>

      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
        These key indicators help evaluate portfolio risk using our AI-backed
        quant models and over a decade of backtested data. Keep track of
        exposure, volatility, and reward-to-risk ratios in real-time.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition p-6"
          >
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              {metric.name}
            </h2>
            <div className="text-2xl font-bold text-[#00a76f] dark:text-green-400">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
