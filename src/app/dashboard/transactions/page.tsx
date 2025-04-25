"use client";

export default function TransactionsPage() {
  const txns = [
    { date: "Apr 5, 2024", asset: "Bitcoin", type: "Buy", amount: "$5,000" },
    { date: "Apr 3, 2024", asset: "Apple", type: "Sell", amount: "$3,200" },
    {
      date: "Mar 29, 2024",
      asset: "Real Estate",
      type: "Dividend",
      amount: "$600",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Transaction History
      </h1>

      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full text-sm bg-white dark:bg-gray-900 text-left border border-gray-100 dark:border-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Asset</th>
              <th className="p-4">Type</th>
              <th className="p-4">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-200 divide-y divide-gray-100 dark:divide-gray-800">
            {txns.map((txn, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="p-4">{txn.date}</td>
                <td className="p-4">{txn.asset}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      txn.type === "Buy"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : txn.type === "Sell"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    }`}
                  >
                    {txn.type}
                  </span>
                </td>
                <td className="p-4 font-semibold">{txn.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
