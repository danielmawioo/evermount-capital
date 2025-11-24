"use client";

import { useState } from "react";
import {
  BriefcaseIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface Manager {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  portfolios: number;
  performance: string;
  joinDate: string;
}

export default function AdminManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@evermount.co",
      role: "Senior Portfolio Manager",
      status: "active",
      portfolios: 12,
      performance: "+15.3%",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@evermount.co",
      role: "Quantitative Analyst",
      status: "active",
      portfolios: 8,
      performance: "+12.7%",
      joinDate: "2023-03-20",
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "m.chen@evermount.co",
      role: "Risk Manager",
      status: "inactive",
      portfolios: 5,
      performance: "+8.9%",
      joinDate: "2023-06-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  const filteredManagers = managers.filter((manager) => {
    const matchesSearch =
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || manager.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this manager?")) {
      setManagers(managers.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BriefcaseIcon className="w-8 h-8 text-[#00a76f]" />
            Manager Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
            Manage portfolio managers, their roles, and permissions.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#00a76f] hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-semibold transition shadow-sm hover:shadow-md"
        >
          <PlusIcon className="w-5 h-5" />
          Add Manager
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search managers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
          <svg
            className="absolute left-3 top-3 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2.5 rounded-lg font-medium transition ${
              filterStatus === "all"
                ? "bg-[#00a76f] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("active")}
            className={`px-4 py-2.5 rounded-lg font-medium transition ${
              filterStatus === "active"
                ? "bg-[#00a76f] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus("inactive")}
            className={`px-4 py-2.5 rounded-lg font-medium transition ${
              filterStatus === "inactive"
                ? "bg-[#00a76f] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Managers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredManagers.map((manager) => (
          <div
            key={manager.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00a76f] to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                  {manager.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {manager.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {manager.role}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <PencilIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => handleDelete(manager.id)}
                  className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                >
                  <TrashIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Email:</span>
                <span className="text-gray-900 dark:text-white">{manager.email}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {manager.portfolios} Portfolios
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ChartBarIcon className="w-4 h-4 text-[#00a76f]" />
                  <span className="text-sm font-semibold text-[#00a76f]">
                    {manager.performance}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Joined: {new Date(manager.joinDate).toLocaleDateString()}
                </span>
                <span
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    manager.status === "active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {manager.status === "active" ? (
                    <CheckCircleIcon className="w-3 h-3" />
                  ) : (
                    <XCircleIcon className="w-3 h-3" />
                  )}
                  {manager.status.charAt(0).toUpperCase() + manager.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredManagers.length === 0 && (
        <div className="text-center py-12">
          <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            No managers found matching your criteria.
          </p>
        </div>
      )}

      {/* Add Manager Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add New Manager
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                  placeholder="john@evermount.co"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]">
                  <option>Portfolio Manager</option>
                  <option>Quantitative Analyst</option>
                  <option>Risk Manager</option>
                  <option>Senior Portfolio Manager</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white rounded-lg font-semibold transition"
                >
                  Add Manager
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
