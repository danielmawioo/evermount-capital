"use client";

export default function DepositBankPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="max-w-md w-full bg-white dark:bg-[#161a23] p-8 rounded-lg shadow border border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6">
          Deposit via Bank Transfer
        </h1>

        <form className="space-y-4">
          <input type="text" placeholder="Bank Name" className="input" />
          <input type="text" placeholder="Account Number" className="input" />
          <input type="number" placeholder="Amount (USD)" className="input" />
          <button className="btn-primary w-full">Submit Deposit</button>
        </form>
      </div>
    </main>
  );
}
