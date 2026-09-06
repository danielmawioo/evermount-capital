import { Metadata } from "next";
import Script from "next/script";
import Hero from "./components/Hero";
import HomeSectionsWithImages from "./components/HomeSections";
import ExtendedHomeSections from "./components/ExtendedHomeSections";
import TrustLogos from "./components/TrustLogos";

const TITLE = "Evermount | Financial Infrastructure for Modern Markets";
const DESCRIPTION =
  "Evermount builds the data, quantitative research, intelligence, execution and risk infrastructure powering the next generation of financial markets.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "financial infrastructure",
    "market data infrastructure",
    "quantitative research platform",
    "trading infrastructure",
    "risk infrastructure",
    "execution infrastructure",
    "financial APIs",
  ],
  alternates: {
    canonical: "https://www.evermount.co",
  },
  openGraph: {
    type: "website",
    url: "https://www.evermount.co",
    siteName: "Evermount",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "https://www.evermount.co/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evermount financial infrastructure platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@evermountcapital",
    creator: "@evermountcapital",
    title: TITLE,
    description: DESCRIPTION,
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
          text: "Evermount is a financial technology and infrastructure company. We build data, quantitative research, intelligence, risk, execution and connectivity infrastructure for modern financial markets.",
        },
      },
      {
        "@type": "Question",
        name: "Is Evermount a fund or a technology company?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evermount is a technology and infrastructure provider. The website describes platform, data, research, risk and execution capabilities — not a public invitation to deposit capital for discretionary investment management.",
        },
      },
      {
        "@type": "Question",
        name: "Who is Evermount for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evermount is designed for institutions, financial technology companies, trading firms, developers and researchers who need programmable market infrastructure.",
        },
      },
      {
        "@type": "Question",
        name: "Does Evermount operate as an exchange, broker or custodian?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Evermount provides technology and infrastructure services. It does not claim to be an exchange, broker, bank, custodian or regulated investment manager unless separately and expressly stated.",
        },
      },
      {
        "@type": "Question",
        name: "Where does Evermount operate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evermount is positioned for global financial markets. Availability of specific services depends on jurisdiction and applicable regulation.",
        },
      },
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Evermount",
    url: "https://www.evermount.co",
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Evermount",
    url: "https://www.evermount.co",
    logo: "https://www.evermount.co/logos/logo.png",
    description:
      "Financial infrastructure for modern markets — market data, quantitative research, intelligence, risk, execution and connectivity.",
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
