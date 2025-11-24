import Script from "next/script";
import { metadata as meta } from "./metadata";

export const metadata = meta;

export default function PlatformPage() {
  const softwareApplicationStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Evermount Capital Platform",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    description:
      "AI-powered hedge fund platform providing quantitative trading strategies, portfolio management, and real-time analytics.",
  };

  return (
    <>
      <Script
        id="platform-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationStructuredData),
        }}
      />
      <div className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-[#00a76f] mb-6">The Platform</h2>
      <p className="text-gray-700 text-lg">
        Evermount delivers performance via quant strategies, algorithmic
        execution, and real-time investor dashboards. Designed for Africas
        investors, powered by global tech.
      </p>
    </div>
    </>
  );
}
