"use client";

import { useState } from "react";
import {
  BriefcaseIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EnvelopeIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface Manager {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  portfolios: number;
  totalAUM: string;
  performance: number;
  clients: number;
  joinDate: string;
  avatar?: string;
}

export default function ManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([
    {
      id: "1",
      name: "John Smith",
      role: "Senior Portfolio Manager",
      email: "john.smith@evermount.co",
      phone: "+1 (555) 123-4567",
      portfolios: 12,
      totalAUM: "$2.5M",
      performance: 15.3,
      clients: 45,
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Quantitative Analyst",
      email: "sarah.j@evermount.co",
      phone: "+1 (555) 234-5678",
      portfolios: 8,
      totalAUM: "$1.8M",
      performance: 12.7,
      clients: 32,
      joinDate: "2023-03-20",
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Risk Manager",
      email: "m.chen@evermount.co",
      phone: "+1 (555) 345-6789",
      portfolios: 5,
      totalAUM: "$950K",
      performance: 8.9,
      clients: 18,
      joinDate: "2023-06-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);

  const filteredManagers = managers.filter((manager) =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BriefcaseIcon className="w-8 h-8 text-[#00a76f]" />
          Portfolio Managers
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
          View and manage your portfolio managers, track their performance, and communicate directly.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search managers by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
        </div>
      </div>

      {/* Managers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredManagers.map((manager) => (
          <div
            key={manager.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedManager(manager)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00a76f] to-emerald-600 flex items-center justify-center text-white font-bold text-xl">
                {manager.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {manager.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{manager.role}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Portfolios</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {manager.portfolios}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ChartBarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">AUM</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {manager.totalAUM}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Performance</span>
                <div className="flex items-center gap-1">
                  {manager.performance >= 0 ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`font-semibold ${
                      manager.performance >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {manager.performance >= 0 ? "+" : ""}
                    {manager.performance}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Clients</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {manager.clients}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition">
                <EnvelopeIcon className="w-4 h-4" />
                Message
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition">
                <ChartBarIcon className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredManagers.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            No managers found matching your search.
          </p>
        </div>
      )}

      {/* Manager Detail Modal */}
      {selectedManager && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00a76f] to-emerald-600 flex items-center justify-center text-white font-bold text-2xl">
                  {selectedManager.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedManager.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">{selectedManager.role}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedManager(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total AUM</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedManager.totalAUM}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Performance</p>
                <div className="flex items-center gap-1">
                  {selectedManager.performance >= 0 ? (
                    <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-5 h-5 text-red-500" />
                  )}
                  <p
                    className={`text-xl font-bold ${
                      selectedManager.performance >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {selectedManager.performance >= 0 ? "+" : ""}
                    {selectedManager.performance}%
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Portfolios</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedManager.portfolios}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Clients</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedManager.clients}
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <EnvelopeIcon className="w-4 h-4" />
                    <a
                      href={`mailto:${selectedManager.email}`}
                      className="hover:text-[#00a76f] transition"
                    >
                      {selectedManager.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <PhoneIcon className="w-4 h-4" />
                    <a
                      href={`tel:${selectedManager.phone}`}
                      className="hover:text-[#00a76f] transition"
                    >
                      {selectedManager.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">About</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Joined Evermount Capital on{" "}
                  {new Date(selectedManager.joinDate).toLocaleDateString()}. Specializes in
                  quantitative strategies and risk management.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition">
                <EnvelopeIcon className="w-5 h-5" />
                Send Message
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white rounded-lg font-medium transition">
                <ChartBarIcon className="w-5 h-5" />
                View Performance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
