"use client";

import { useState } from "react";
import { FaIdCard, FaFileAlt, FaUpload } from "react-icons/fa";

export default function KYCPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please upload your document.");
      return;
    }
    // TODO: send selectedFile to API
    console.log("Uploading file:", selectedFile);
    alert("✅ Document submitted successfully!");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="w-full max-w-2xl bg-white dark:bg-[#161a23] p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          KYC Verification
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#161a23] text-gray-900 dark:text-white focus:ring-[#00a76f] focus:border-[#00a76f] focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
              National ID or Passport Number
            </label>
            <input
              type="text"
              required
              placeholder="ID12345678"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#161a23] text-gray-900 dark:text-white focus:ring-[#00a76f] focus:border-[#00a76f] focus:outline-none text-sm"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
              Upload ID Document (PDF or Image)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#00a76f]/20 file:text-[#00a76f] hover:file:bg-[#00a76f]/30"
              />
              {selectedFile && (
                <span className="text-gray-700 dark:text-white text-sm">
                  {selectedFile.name}
                </span>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center gap-2 w-full justify-center bg-[#00a76f] hover:bg-emerald-700 text-white py-2 rounded-md font-semibold transition"
          >
            <FaUpload />
            Submit Verification
          </button>
        </form>
      </div>
    </main>
  );
}
