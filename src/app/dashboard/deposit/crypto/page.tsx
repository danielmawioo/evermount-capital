"use client";

export default function DepositCryptoPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="max-w-md w-full bg-white dark:bg-[#161a23] p-8 rounded-lg shadow border border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6">
          Deposit with Crypto
        </h1>

        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Send your crypto to:
          </p>
          <p className="font-mono break-all bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
            0xAbcd...Ef123 (USDT ERC-20)
          </p>
          <button className="btn-primary w-full">I've Sent Payment</button>
        </div>
      </div>
    </main>
  );
}
