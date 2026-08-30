// src/app/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import Hero from "./components/Hero";
import HomeSectionsWithImages from "./components/HomeSections";
import ExtendedHomeSections from "./components/ExtendedHomeSections";
import TrustLogos from "./components/TrustLogos";

export const metadata: Metadata = {
  title: "Evermount | AI Financial Intelligence & Trading Infrastructure for Africa",
  description:
    "Evermount builds AI-powered financial intelligence, quantitative research, risk and trading infrastructure for Africa's financial markets.",
  keywords: [
    "AI financial infrastructure Africa",
    "quantitative trading Africa",
    "AI trading infrastructure",
    "African financial markets",
    "quantitative research Africa",
    "financial AI Africa",
    "algorithmic trading infrastructure",
    "African market data",
    "systematic trading Africa",
    "financial intelligence platform",
  ],
  alternates: {
    canonical: "https://www.evermount.co",
  },
  openGraph: {
    type: "website",
    url: "https://www.evermount.co",
    siteName: "Evermount",
    title:
      "Evermount | AI Financial Intelligence & Trading Infrastructure for Africa",
    description:
      "Evermount builds AI-powered financial intelligence, quantitative research, risk and trading infrastructure for Africa's financial markets.",
    images: [
      {
        url: "https://www.evermount.co/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evermount AI financial intelligence platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@evermountcapital",
    creator: "@evermountcapital",
    title:
      "Evermount | AI Financial Intelligence & Trading Infrastructure for Africa",
    description:
      "Evermount builds AI-powered financial intelligence, quantitative research, risk and trading infrastructure for Africa's financial markets.",
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
        name: "What does Evermount do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evermount is an AI financial intelligence and trading infrastructure company for Africa. We build systems that understand markets, discover opportunities, manage risk and execute capital — combining AI, quantitative research, market data, risk intelligence and systematic execution.",
        },
      },
      {
        "@type": "Question",
        name: "Is Evermount a fund or a technology company?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evermount is primarily a technology company. Our platform includes intelligence, quantitative research, data, risk and execution infrastructure. Evermount Capital is one application of that stack: systematic capital management powered by the same technology.",
        },
      },
      {
        "@type": "Question",
        name: "How does Evermount AI work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evermount AI is an intelligence layer designed to help financial systems understand markets, assist quantitative research and support risk-aware decisions. It is AI-assisted research and decision intelligence — we do not claim autonomous AI is currently trading live capital without human-designed controls.",
        },
      },
      {
        "@type": "Question",
        name: "Where does Evermount operate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We start with African financial markets and are building toward systematic trading, market infrastructure and connectivity between African and global financial systems.",
        },
      },
      {
        "@type": "Question",
        name: "Does Evermount manage capital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Evermount Capital offers systematic investment strategies as one product of the broader Evermount platform. Fee structure, minimums and lock-in terms are documented on the Capital and Pricing pages.",
        },
      },
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Evermount",
    url: "https://www.evermount.co",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.evermount.co/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Evermount",
    url: "https://www.evermount.co",
    logo: "https://www.evermount.co/logos/logo.png",
    description:
      "The AI financial intelligence and trading infrastructure company for Africa — combining artificial intelligence, quantitative research, market data, risk intelligence and systematic execution.",
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
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <Script
        id="website-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />

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
