"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useState } from "react";
import {
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PhoneIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I deposit funds into my account?",
      answer:
        "You can deposit funds using multiple methods: bank transfer, credit/debit card, or cryptocurrency. Navigate to the Wallets page and click 'Deposit' to choose your preferred method. Bank transfers typically take 1-3 business days, while card and crypto deposits are usually instant.",
      category: "account",
    },
    {
      id: "2",
      question: "What is the minimum investment amount?",
      answer:
        "The minimum investment amount varies by fund type. For most funds, the minimum is $1,000. Premium funds may have higher minimums. Check the fund details page for specific requirements.",
      category: "investing",
    },
    {
      id: "3",
      question: "How do I withdraw my funds?",
      answer:
        "To withdraw funds, go to the Withdraw page and select your preferred withdrawal method. You can withdraw to your bank account or crypto wallet. Withdrawals typically process within 1-5 business days depending on the method chosen.",
      category: "account",
    },
    {
      id: "4",
      question: "What fees do you charge?",
      answer:
        "We charge a management fee of 2% annually and a performance fee of 20% on profits above the high-water mark. There are no deposit or withdrawal fees for most methods. See our Pricing page for complete fee details.",
      category: "fees",
    },
    {
      id: "5",
      question: "How is my portfolio performance calculated?",
      answer:
        "Portfolio performance is calculated using time-weighted returns, which account for deposits and withdrawals. This ensures accurate performance measurement regardless of when you add or remove funds.",
      category: "portfolio",
    },
    {
      id: "6",
      question: "Is my money safe and secure?",
      answer:
        "We use bank-level encryption and security measures, and funds are held in segregated accounts. Evermount is not currently a licensed financial institution — see our Risk Disclosure and Terms pages for details.",
      category: "security",
    },
    {
      id: "7",
      question: "Can I change my investment strategy?",
      answer:
        "Yes, you can reallocate your investments at any time through the Portfolio page. You can also set up automatic rebalancing based on your preferences.",
      category: "investing",
    },
    {
      id: "8",
      question: "How do I update my personal information?",
      answer:
        "Go to Settings and click on 'Profile' to update your personal information, contact details, and preferences. Some changes may require verification for security purposes.",
      category: "account",
    },
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "account", name: "Account" },
    { id: "investing", name: "Investing" },
    { id: "fees", name: "Fees" },
    { id: "portfolio", name: "Portfolio" },
    { id: "security", name: "Security" },
  ];

  const popularArticles = faqs.slice(0, 3);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you for contacting us! We'll get back to you within 24 hours.",
    );
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <TranslateTree>
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <QuestionMarkCircleIcon className="w-8 h-8 text-[#00a76f]" />
          Help Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
          Find answers to common questions or contact our support team.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
        </div>
      </div>

      {/* Popular Articles */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Popular Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {popularArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition cursor-pointer"
              onClick={() => setOpenFAQ(article.id)}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {article.question}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {article.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedCategory === category.id
                    ? "bg-[#00a76f] text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition rounded-xl"
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                {openFAQ === faq.id ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#00a76f]" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Contact Support
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Can&apos;t find what you&apos;re looking for? Send us a message and
            we&apos;ll get back to you within 24 hours.
          </p>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={contactForm.subject}
                onChange={(e) =>
                  setContactForm({ ...contactForm, subject: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                placeholder="What can we help with?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                placeholder="Tell us more about your question..."
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#00a76f] hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition shadow-sm hover:shadow-md"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Other Ways to Reach Us
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <PhoneIcon className="w-6 h-6 text-[#00a76f]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Phone Support
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Call us at{" "}
                  <a
                    href="tel:+254758578816"
                    className="text-[#00a76f] hover:underline"
                  >
                    +254 758 578 816
                  </a>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Mon-Fri, 9 AM - 5 PM EAT
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <EnvelopeIcon className="w-6 h-6 text-[#00a76f]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Email Support
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Email us at{" "}
                  <a
                    href="mailto:support@evermount.co"
                    className="text-[#00a76f] hover:underline"
                  >
                    support@evermount.co
                  </a>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  We respond within 24 hours
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#00a76f]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Live Chat
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Chat with us in real-time
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Available in the bottom right corner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </TranslateTree>
  );
}
