"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useRouter } from "next/navigation";
import {
  FaCreditCard,
  FaUniversity,
  FaBitcoin,
  FaMobileAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

interface PaymentMethodsPageProps {
  type: "deposit" | "withdraw";
}

const PaymentMethodsPage = ({ type }: PaymentMethodsPageProps) => {
  const router = useRouter();

  const handleSelect = (method: string, available: boolean) => {
    if (!available) {
      toast("This payment method is coming soon.", { icon: "ℹ️" });
      return;
    }
    router.push(`/dashboard/${type}/${method}`);
  };

  const cardAvailable = type === "deposit";
  const bankAvailable = type === "withdraw";
  const mpesaAvailable = true;
  const cryptoAvailable = true;

  return (
    <TranslateTree>
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          {type === "deposit"
            ? "Choose Deposit Method"
            : "Choose Withdrawal Method"}
        </h1>
        {type === "deposit" && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-10">
            Card, M-Pesa, and crypto deposits are available. Bank transfers are
            coming soon.
          </p>
        )}
        {type === "withdraw" && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-10">
            Bank, M-Pesa, and crypto withdrawals are available after KYC
            verification.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            onClick={() => handleSelect("card", cardAvailable)}
            className="cursor-pointer bg-white dark:bg-[#161a23] p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition"
          >
            <FaCreditCard size={40} className="text-[#00a76f] mb-4" />
            <p className="font-semibold text-gray-800 dark:text-white">Card</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Available
            </p>
          </div>

          <div
            onClick={() => handleSelect("bank", bankAvailable)}
            className={`cursor-pointer bg-white dark:bg-[#161a23] p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition ${
              !bankAvailable ? "opacity-60" : ""
            }`}
          >
            <FaUniversity size={40} className="text-[#00a76f] mb-4" />
            <p className="font-semibold text-gray-800 dark:text-white">Bank</p>
            <p className="text-xs text-gray-400 mt-1">
              {bankAvailable ? "Available" : "Coming soon"}
            </p>
          </div>

          <div
            onClick={() => handleSelect("mpesa", mpesaAvailable)}
            className="cursor-pointer bg-white dark:bg-[#161a23] p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition"
          >
            <FaMobileAlt size={40} className="text-[#00a76f] mb-4" />
            <p className="font-semibold text-gray-800 dark:text-white">
              M-Pesa
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Available
            </p>
          </div>

          <div
            onClick={() => handleSelect("crypto", cryptoAvailable)}
            className={`cursor-pointer bg-white dark:bg-[#161a23] p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition ${
              !cryptoAvailable ? "opacity-60" : ""
            }`}
          >
            <FaBitcoin size={40} className="text-[#00a76f] mb-4" />
            <p className="font-semibold text-gray-800 dark:text-white">
              Crypto
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {cryptoAvailable ? "Available" : "Coming soon"}
            </p>
          </div>
        </div>
      </div>
    </main>
      </TranslateTree>
  );
};

export default PaymentMethodsPage;
