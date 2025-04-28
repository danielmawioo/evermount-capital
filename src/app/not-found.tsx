"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0f1117] px-6 py-16 text-center">
      {/* Image */}
      <div className="mb-8">
        <Image
          src="/images/404.avif" // make sure you have this under /public/images/404.png
          alt="404 Not Found"
          width={300}
          height={300}
          className="mx-auto object-contain"
        />
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Sorry, page not found!
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
        We couldn’t find the page you were looking for. Maybe you mistyped the
        URL, or the page has moved.
      </p>

      {/* Button */}
      <Link href="/">
        <button className="inline-flex items-center px-6 py-3 rounded-lg bg-[#00a76f] hover:bg-[#029866] text-white text-sm font-semibold shadow-md transition-all duration-200">
          Go to Home
        </button>
      </Link>
    </main>
  );
}
