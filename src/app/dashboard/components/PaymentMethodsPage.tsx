"use client";

import { useRouter } from "next/navigation";
import { FaCreditCard, FaUniversity, FaBitcoin } from "react-icons/fa";

interface PaymentMethodsPageProps {
  type: "deposit" | "withdraw";
}

const PaymentMethodsPage = ({ type }: PaymentMethodsPageProps) => {
  const router = useRouter();

  const handleSelect = (method: string) => {
    router.push(`/dashboard/${type}/${method}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          {type === "deposit"
            ? "Choose Deposit Method"
            : "Choose Withdrawal Method"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Card Option */}
          <div
            onClick={() => handleSelect("card")}
            className="cursor-pointer bg-white dark:bg-[#161a23] p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition"
          >
            <FaCreditCard size={40} className="text-[#00a76f] mb-4" />
            <p className="font-semibold text-gray-800 dark:text-white">Card</p>
          </div>

          {/* Bank Option */}
          <div
            onClick={() => handleSelect("bank")}
            className="cursor-pointer bg-white dark:bg-[#161a23] p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition"
          >
            <FaUniversity size={40} className="text-[#00a76f] mb-4" />
            <p className="font-semibold text-gray-800 dark:text-white">Bank</p>
          </div>

          {/* Crypto Option */}
          <div
            onClick={() => handleSelect("crypto")}
            className="cursor-pointer bg-white dark:bg-[#161a23] p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition"
          >
            <FaBitcoin size={40} className="text-[#00a76f] mb-4" />
            <p className="font-semibold text-gray-800 dark:text-white">
              Crypto
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentMethodsPage;
