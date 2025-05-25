// src/app/layout.tsx

import "./styles/globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { Metadata } from "next";
import IntercomProvider from "./components/IntercomProvider";
import Analytics from "./components/Analytics";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Evermount Capital | High-Performance Hedge Fund Platform",
  description:
    "Manage your portfolio, optimize investments, and grow your wealth with Evermount Capital's smart hedge fund platform.",
  metadataBase: new URL("https://www.evermount.co"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.evermount.co",
    siteName: "Evermount Capital",
    title: "Evermount Capital | High-Performance Hedge Fund Platform",
    description:
      "Access a modern hedge fund management platform — track portfolios, analyze risk, and optimize investment growth.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evermount Capital Platform",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@evermountcapital",
    creator: "@evermountcapital",
    title: "Evermount Capital | High-Performance Hedge Fund Platform",
    description:
      "Grow your portfolio with high-performance investment strategies at Evermount Capital.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Rich Schema */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Evermount Capital",
              url: "https://www.evermount.co",
              logo: "https://www.evermount.co/logo.png",
              sameAs: [
                "https://twitter.com/evermountcapital",
                "https://linkedin.com/company/evermountcapital",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+254758578816",
                contactType: "Customer Support",
                areaServed: "Worldwide",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.evermount.co/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
        <IntercomProvider />
        <Analytics />
      </body>
    </html>
  );
}
