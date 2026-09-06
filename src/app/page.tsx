import { Metadata } from "next";
import Script from "next/script";
import Hero from "./components/Hero";
import HomeSectionsWithImages from "./components/HomeSections";
import ExtendedHomeSections from "./components/ExtendedHomeSections";
import TrustLogos from "./components/TrustLogos";

const TITLE =
  "Evermount | AI Financial Intelligence & Trading Infrastructure for Africa";
const DESCRIPTION =
  "Evermount is the AI financial intelligence and trading infrastructure company for Africa. Capital management is one application of the platform, not the whole company.";

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
    site: "@evermount",
    creator: "@evermount",
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
          text: "Evermount is a financial technology company built for African and global markets. We build data, quantitative research, intelligence, risk, execution and connectivity infrastructure. Evermount Capital is a separate product that applies that platform to systematic strategies.",
        },
      },
      {
        "@type": "Question",
        name: "Is Evermount a fund or a technology company?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evermount Capital is an application of the platform. The public website describes infrastructure first. Capital accounts use a separate login.",
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
          text: "Evermount is positioned from Africa for global financial markets. Availability of specific services depends on jurisdiction and applicable regulation.",
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
      availableLanguage: ["English", "French", "Spanish", "German", "Dutch"],
    },
    sameAs: [
      "https://twitter.com/evermount",
      "https://linkedin.com/company/evermount",
      "https://x.com/evermount",
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
