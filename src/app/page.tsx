// src/app/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import Hero from "./components/Hero";
import HomeSectionsWithImages from "./components/HomeSections";
import ExtendedHomeSections from "./components/ExtendedHomeSections";
import TrustLogos from "./components/TrustLogos";

export const metadata: Metadata = {
  title: "Evermount Capital | Quantitative Trading Infrastructure for Africa",
  description:
    "Evermount is building an Africa-focused quantitative trading and market-making technology company — combining quantitative research, AI and high-performance trading infrastructure.",
  keywords: [
    "quantitative trading",
    "market making",
    "Africa fintech",
    "algorithmic trading",
    "AI trading infrastructure",
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
    title: "Evermount Capital | Quantitative Trading Infrastructure for Africa",
    description:
      "Building an Africa-focused quantitative trading and market-making technology company.",
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
    title: "Evermount Capital | Quantitative Trading Infrastructure for Africa",
    description:
      "Building an Africa-focused quantitative trading and market-making technology company.",
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
          text: "Evermount is building quantitative trading and market-making technology focused on African financial markets. Our current platform provides systematic, AI-assisted investment strategies for individual and institutional investors; our long-term vision is to build institutional-grade trading and liquidity infrastructure for Africa.",
        },
      },
      {
        "@type": "Question",
        name: "How does Evermount Capital's AI trading work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI trading system uses proprietary machine learning models trained on historical financial data. The system analyzes market patterns, volatility trends, and sentiment data in real-time to execute trades autonomously. It includes automatic risk management, portfolio rebalancing, and stress testing to help manage risk.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum investment amount?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The minimum investment amount varies by strategy tier. Our entry-level tier requires $10,000, with higher tiers available at $50,000, $250,000, and $1,000,000+. Each tier offers different strategy access and fee structures. See our Pricing page for complete details.",
        },
      },
      {
        "@type": "Question",
        name: "Is my money safe with Evermount Capital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use bank-level encryption and security measures, and funds are held in segregated accounts. Evermount is not currently a licensed financial institution — see our Risk Disclosure and Terms pages for details. All transactions are monitored around the clock.",
        },
      },
      {
        "@type": "Question",
        name: "What fees does Evermount Capital charge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We charge management fees ranging from 1.0% to 2.5% annually (depending on investment tier) and a performance fee of 20% on realized profits above the high-water mark. Management fees are charged quarterly in advance. See our Pricing page for complete fee details.",
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
          text: "Evermount Capital offers diverse investment strategies including global forex trading, stocks and ETFs, commodities (gold, oil, agriculture), and cryptocurrency investments. All strategies are powered by AI and quantitative models for systematic, risk-managed execution.",
        },
      },
      {
        "@type": "Question",
        name: "How does Evermount Capital ensure security?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use bank-level encryption, segregated accounts for client funds, and a multi-layered internal risk management framework, with 24/7 monitoring and capital protection controls.",
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
      "Africa-focused quantitative trading and market-making technology company, building AI-driven research, portfolio management, and trading infrastructure.",
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
