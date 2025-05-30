"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";

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

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    date: "",
  });

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

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
  }, []);

  const handleClose = () => {
    setShowModal(false);
    router.push("/");
  };

  const validate = () => {
    const newErrors = {
      name: form.name ? "" : "Name is required",
      email: /^\S+@\S+\.\S+$/.test(form.email) ? "" : "Valid email required",
      date: form.date ? "" : "Date & time required",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      date: form.date?.toISOString(),
    };

    try {
      const res = await fetch("https://api.evermount.co/demo-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error response:", data);
        alert(data.message || "There was an error booking the demo.");
        return;
      }

      console.log("Success response:", data);
      setShowModal(false);
      router.push("/thank-you");
    } catch (err) {
      console.error("Network or unexpected error:", err);
      alert("Network error. Please try again later.");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#00a76f]">
          Book a Demo
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6 mt-1">
          Choose a date and time that works best. We’ll send you a meeting
          invite.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`mt-1 w-full px-4 py-3 border rounded-lg text-sm shadow-sm outline-none focus:ring-[#00a76f] focus:border-[#00a76f] ${
                errors.name && "border-red-500"
              }`}
              placeholder="Jane Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`mt-1 w-full px-4 py-3 border rounded-lg text-sm shadow-sm outline-none focus:ring-[#00a76f] focus:border-[#00a76f] ${
                errors.email && "border-red-500"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company (optional)
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className="mt-1 w-full px-4 py-3 border rounded-lg text-sm shadow-sm outline-none focus:ring-[#00a76f] focus:border-[#00a76f]"
              placeholder="Evermount Capital"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Date & Time <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <DatePicker
                selected={form.date}
                onChange={(date) => handleChange("date", date)}
                showTimeSelect
                minDate={new Date()}
                dateFormat="Pp"
                placeholderText="Select date & time"
                className={`w-full px-4 py-3 border rounded-lg text-sm shadow-sm outline-none focus:ring-[#00a76f] focus:border-[#00a76f] ${
                  errors.date && "border-red-500"
                }`}
              />
              <CalendarIcon className="absolute right-4 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Anything you'd like us to cover?
            </label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Your message..."
              className="mt-1 w-full px-4 py-3 border rounded-lg text-sm shadow-sm outline-none focus:ring-[#00a76f] focus:border-[#00a76f]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 px-6 rounded-lg text-base font-semibold transition shadow"
          >
            Book Demo
          </button>
        </form>
      </div>
    </div>
  );
}
