// src/app/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import Hero from "./components/Hero";
import HomeSectionsWithImages from "./components/HomeSections";
import ExtendedHomeSections from "./components/ExtendedHomeSections";
import TrustLogos from "./components/TrustLogos";

export const metadata: Metadata = {
  title: "Evermount Capital | AI-Powered Hedge Fund Platform",
  description:
    "Accelerate your investment growth with Evermount Capital's AI-powered hedge fund platform. Trusted by investors worldwide for high-performance quantitative trading, portfolio management, and risk-optimized strategies.",
  keywords: [
    "hedge fund",
    "AI trading",
    "quantitative investing",
    "portfolio management",
    "alternative investments",
    "Evermount Capital",
    "automated trading",
    "risk management",
  ],
  alternates: {
    canonical: "https://www.evermount.co",
  },
  openGraph: {
    type: "website",
    url: "https://www.evermount.co",
    siteName: "Evermount Capital",
    title: "Evermount Capital | AI-Powered Hedge Fund Platform",
    description:
      "Accelerate your investment growth with AI-powered hedge fund strategies. Trusted by investors worldwide.",
    images: [
      {
        url: "https://www.evermount.co/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evermount Capital Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@evermountcapital",
    creator: "@evermountcapital",
    title: "Evermount Capital | AI-Powered Hedge Fund Platform",
    description:
      "Accelerate your investment growth with AI-powered hedge fund strategies.",
    images: ["https://www.evermount.co/og-image.png"],
  },
};

export default function Home() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What exactly does Evermount Capital do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evermount Capital is an AI-powered hedge fund platform that provides quantitative trading strategies, portfolio management, and risk-optimized investment solutions. We use machine learning and algorithmic trading to help investors grow their wealth through automated, data-driven investment strategies across global markets including forex, stocks, commodities, and cryptocurrencies.",
        },
      },
      {
        "@type": "Question",
        name: "How does Evermount Capital's AI trading work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI trading system uses proprietary machine learning models trained on over a decade of financial data. The system analyzes market patterns, volatility trends, and sentiment data in real-time to execute trades autonomously. It includes automatic risk management, portfolio rebalancing, and stress testing to optimize returns while minimizing risk.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum investment amount?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The minimum investment amount varies by fund type. For most funds, the minimum is $1,000. Premium funds may have higher minimums. You can check specific requirements on each fund's details page in your dashboard.",
        },
      },
      {
        "@type": "Question",
        name: "Is my money safe with Evermount Capital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we use bank-level encryption and security measures. Funds are held in segregated accounts, and we're regulated by financial authorities. We also offer insurance coverage for eligible accounts. All transactions are secured and monitored 24/7.",
        },
      },
      {
        "@type": "Question",
        name: "What fees does Evermount Capital charge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We charge a management fee of 2% annually and a performance fee of 20% on profits above the high-water mark. There are no deposit or withdrawal fees for most methods. See our Pricing page for complete fee details.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get started with Evermount Capital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Getting started is easy. Simply create an account, complete the KYC verification process, deposit funds into your wallet, and start investing in our available funds. You can also book a demo to learn more about our platform and strategies.",
        },
      },
      {
        "@type": "Question",
        name: "What investment strategies does Evermount Capital offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evermount Capital offers diverse investment strategies including global forex trading, stocks and ETFs, commodities (gold, oil, agriculture), and cryptocurrency investments. All strategies are powered by AI and quantitative models for optimal performance.",
        },
      },
      {
        "@type": "Question",
        name: "How does Evermount Capital ensure security?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use bank-level encryption, segregated accounts for client funds, regular security audits, and compliance with global financial regulations. Our platform includes multi-layer risk management, 24/7 monitoring, and investor capital protection through isolation and limits.",
        },
      },
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Evermount Capital",
    url: "https://www.evermount.co",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.evermount.co/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Evermount Capital",
    url: "https://www.evermount.co",
    logo: "https://www.evermount.co/logos/logo.png",
    description:
      "AI-powered hedge fund platform providing quantitative trading strategies and portfolio management services.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254758578816",
      contactType: "Customer Support",
      email: "info@evermount.co",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://twitter.com/evermountcapital",
      "https://linkedin.com/company/evermount-capital",
      "https://x.com/evermountcapital",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
  };

  return (
    <>
      {/* FAQ Structured Data for "People also ask" */}
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      {/* Website Structured Data */}
      <Script
        id="website-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />

      {/* Organization Structured Data */}
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

      <main>
        <Hero />
        <TrustLogos />
        <HomeSectionsWithImages />
        <ExtendedHomeSections />
      </main>
    </>
  );
}
