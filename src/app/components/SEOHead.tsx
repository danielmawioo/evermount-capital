"use client";

import Script from "next/script";

/**
 * Additional SEO structured data component
 * Can be used on specific pages for enhanced SEO
 */
export default function SEOHead() {
  const reviewStructuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "FinancialService",
      name: "Evermount Capital",
      description: "AI-powered hedge fund platform",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "Evermount Capital Reviews",
    },
    reviewBody:
      "Evermount Capital provides excellent AI-powered investment services with transparent reporting and strong performance metrics.",
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.evermount.co",
      },
    ],
  };

  return (
    <>
      <Script
        id="review-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewStructuredData),
        }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
    </>
  );
}

