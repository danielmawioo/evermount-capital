"use client";

export default function PortfolioPage() {
  const assets = [
    { name: "Bitcoin", value: "$12,000", change: "+5.2%", type: "Crypto" },
    { name: "Apple", value: "$7,800", change: "+2.1%", type: "Equity" },
    { name: "Gold ETF", value: "$4,300", change: "-0.8%", type: "Commodity" },
    {
      name: "Real Estate Fund",
      value: "$10,000",
      change: "+1.5%",
      type: "Real Estate",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        My Portfolio
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {asset.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {asset.type}
                </p>
              </div>
              <div
                className={`text-sm font-medium px-2 py-1 rounded-full ${
                  asset.change.startsWith("+")
                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {asset.change}
              </div>
            </div>

            <div className="mt-4 text-2xl font-bold text-[#00a76f] dark:text-green-400">
              {asset.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
