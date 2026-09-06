"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Script from "next/script";
import {
  CalendarIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";
import { EmailSchema } from "@/lib/schemas";

export default function BookDemoModal() {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const [showModal, setShowModal] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    date: null as Date | null,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    date: "",
  });

  const [bookedSlots, setBookedSlots] = useState<Date[]>([]);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    router.push("/");
  }, [router]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const { data } = await api.demo.getBookedSlots();

        const dates = (data.bookedSlots || []).map(
          (iso: string) => new Date(iso),
        );
        setBookedSlots(dates);
      } catch (error) {
        logger.error("Failed to fetch booked slots", error);
      }
    };

    fetchBookedSlots();
  }, []);

  const validate = () => {
    const newErrors = {
      name: form.name ? "" : "Name is required",
      email: EmailSchema.safeParse(form.email).success
        ? ""
        : "Valid email required",
      date: form.date ? "" : "Date & time required",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleChange = (field: string, value: string | Date | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      fullName: form.name,
      email: form.email,
      company: form.company,
      preferredDateTime: form.date!.toISOString(),
      message: form.message,
    };

    setLoading(true);

    try {
      await api.demo.book(payload);

      setSuccess(true);
      toast.success("Demo booked successfully!");
      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 2000);
    } catch (error) {
      logger.error("Demo booking failed", error);
      toast.error(
        getApiErrorMessage(error, "There was an error booking the demo."),
      );
    } finally {
      setLoading(false);
    }
  };

  const getExcludedTimes = (date: Date) => {
    return bookedSlots.filter(
      (slot) => slot.toDateString() === date.toDateString(),
    );
  };

  if (!showModal) return null;

  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Evermount Platform Demo",
    description:
      "Schedule a conversation about Evermount data, research, risk and execution infrastructure.",
    organizer: {
      "@type": "Organization",
      name: "Evermount",
      url: "https://www.evermount.co",
    },
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: "https://www.evermount.co/book-demo",
    },
  };

  return (
    <TranslateTree>
    <>
      <Script
        id="book-demo-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventStructuredData),
        }}
      />
      <Toaster position="top-center" />
      <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4 py-4 overflow-y-auto">
        <div
          ref={modalRef}
          className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl relative my-auto"
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition p-1"
          >
            <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {success ? (
            <div className="flex flex-col items-center text-center py-10">
              <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
              <h2 className="text-lg sm:text-xl font-semibold text-green-600 dark:text-green-400">
                Demo Booked Successfully!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Redirecting...
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-center text-[#00a76f] dark:text-green-400">
                Request Access
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center mb-4 sm:mb-6 mt-1">
                Tell us about your institution and infrastructure needs. We will
                follow up with next steps.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`mt-1 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm outline-none focus:ring-[#00a76f] focus:border-[#00a76f] ${
                      errors.name && "border-red-500"
                    }`}
                    placeholder="Jane Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`mt-1 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm outline-none focus:ring-[#00a76f] focus:border-[#00a76f] ${
                      errors.email && "border-red-500"
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    className="mt-1 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm outline-none focus:ring-[#00a76f] focus:border-[#00a76f]"
                    placeholder="Your institution"
                  />
                </div>

                {/* Date & Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Preferred Date & Time{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <DatePicker
                      selected={form.date}
                      onChange={(date) => handleChange("date", date)}
                      showTimeSelect
                      minDate={new Date()}
                      dateFormat="Pp"
                      placeholderText="Select date & time"
                      excludeTimes={
                        form.date ? getExcludedTimes(form.date) : []
                      }
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm outline-none focus:ring-[#00a76f] focus:border-[#00a76f] ${
                        errors.date && "border-red-500"
                      }`}
                    />
                    <CalendarIcon className="absolute right-3 sm:right-4 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Anything you&apos;d like us to cover?
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Your message — role, company type, markets, data/API needs, expected scale..."
                    className="mt-1 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm outline-none focus:ring-[#00a76f] focus:border-[#00a76f]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center bg-[#00a76f] hover:bg-emerald-700 text-white py-3 px-6 rounded-lg text-base font-semibold transition shadow ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  )}
                  {loading ? "Submitting..." : "Request Access"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
    </TranslateTree>
  );
}
