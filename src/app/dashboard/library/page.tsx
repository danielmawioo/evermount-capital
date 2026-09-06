"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useState } from "react";
import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  VideoCameraIcon,
  BookmarkIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

interface Resource {
  id: string;
  title: string;
  category: "video" | "article" | "guide" | "webinar";
  description: string;
  duration?: string;
  author: string;
  date: string;
  bookmarked: boolean;
  thumbnail?: string;
}

export default function LibraryPage() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      title: "Introduction to Quantitative Trading",
      category: "video",
      description:
        "Learn the fundamentals of quantitative trading strategies and how they work.",
      duration: "15:30",
      author: "Dr. Sarah Johnson",
      date: "2024-03-15",
      bookmarked: true,
    },
    {
      id: "2",
      title: "Risk Management Best Practices",
      category: "article",
      description:
        "A comprehensive guide to managing portfolio risk in volatile markets.",
      author: "Michael Chen",
      date: "2024-03-10",
      bookmarked: false,
    },
    {
      id: "3",
      title: "Getting Started with Portfolio Diversification",
      category: "guide",
      description:
        "Step-by-step guide to building a well-diversified investment portfolio.",
      author: "Evermount Team",
      date: "2024-02-28",
      bookmarked: true,
    },
    {
      id: "4",
      title: "Market Analysis Webinar: Q2 2024",
      category: "webinar",
      description:
        "Join our experts for an in-depth analysis of market trends and opportunities.",
      duration: "45:00",
      author: "John Smith",
      date: "2024-04-01",
      bookmarked: false,
    },
    {
      id: "5",
      title: "Understanding Cryptocurrency Investments",
      category: "article",
      description:
        "Everything you need to know about investing in digital assets safely.",
      author: "Alice Williams",
      date: "2024-03-20",
      bookmarked: false,
    },
    {
      id: "6",
      title: "Advanced Trading Strategies",
      category: "video",
      description:
        "Master advanced trading techniques used by professional investors.",
      duration: "22:15",
      author: "Dr. Sarah Johnson",
      date: "2024-03-05",
      bookmarked: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<
    "all" | Resource["category"]
  >("all");
  const [showBookmarked, setShowBookmarked] = useState(false);

  const toggleBookmark = (id: string) => {
    setResources(
      resources.map((r) =>
        r.id === id ? { ...r, bookmarked: !r.bookmarked } : r,
      ),
    );
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || resource.category === filterCategory;
    const matchesBookmark = !showBookmarked || resource.bookmarked;
    return matchesSearch && matchesCategory && matchesBookmark;
  });

  const getCategoryIcon = (category: Resource["category"]) => {
    switch (category) {
      case "video":
        return <PlayIcon className="w-5 h-5" />;
      case "article":
        return <DocumentTextIcon className="w-5 h-5" />;
      case "guide":
        return <AcademicCapIcon className="w-5 h-5" />;
      case "webinar":
        return <VideoCameraIcon className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: Resource["category"]) => {
    switch (category) {
      case "video":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case "article":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "guide":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "webinar":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
    }
  };

  return (
    <TranslateTree>
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BookOpenIcon className="w-8 h-8 text-[#00a76f]" />
          Educational Library
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
          Access educational resources, guides, videos, and webinars to enhance
          your investment knowledge.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) =>
                  setFilterCategory(
                    e.target.value as "all" | Resource["category"],
                  )
                }
                className="pl-10 pr-8 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f] appearance-none"
              >
                <option value="all">All Categories</option>
                <option value="video">Videos</option>
                <option value="article">Articles</option>
                <option value="guide">Guides</option>
                <option value="webinar">Webinars</option>
              </select>
            </div>
            <button
              onClick={() => setShowBookmarked(!showBookmarked)}
              className={`px-4 py-2.5 border rounded-lg font-medium transition ${
                showBookmarked
                  ? "bg-[#00a76f] text-white border-[#00a76f]"
                  : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <BookmarkIcon className="w-5 h-5 inline mr-2" />
              Bookmarked
            </button>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}
                >
                  {getCategoryIcon(resource.category)}
                  {resource.category.charAt(0).toUpperCase() +
                    resource.category.slice(1)}
                </span>
                {resource.duration && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {resource.duration}
                  </span>
                )}
              </div>
              <button
                onClick={() => toggleBookmark(resource.id)}
                className={`p-1.5 rounded-md transition ${
                  resource.bookmarked
                    ? "text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                    : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <BookmarkIcon
                  className={`w-5 h-5 ${resource.bookmarked ? "fill-current" : ""}`}
                />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {resource.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>{resource.author}</p>
                <p>{new Date(resource.date).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <ArrowDownTrayIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button className="px-4 py-1.5 bg-[#00a76f] hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            No resources found matching your criteria.
          </p>
        </div>
      )}
    </div>
      </TranslateTree>
  );
}
