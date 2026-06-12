// src/app/layout.tsx

import "./styles/globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { Metadata } from "next";
import IntercomProvider from "./components/IntercomProvider";
import Analytics from "./components/Analytics";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Evermount Capital | AI-Powered Hedge Fund Platform",
    template: "%s | Evermount Capital",
  },
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
    "investment platform",
    "AI hedge fund",
  ],
  authors: [{ name: "Evermount Capital" }],
  creator: "Evermount Capital",
  publisher: "Evermount Capital",
  metadataBase: new URL("https://www.evermount.co"),
  alternates: {
    canonical: "https://www.evermount.co",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
    locale: "en_US",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
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
        {/* Theme initialization script - runs before React hydration to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    // No saved theme, check system preference
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (prefersDark) {
                      document.documentElement.classList.add('dark');
                      localStorage.setItem('theme', 'dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                      localStorage.setItem('theme', 'light');
                    }
                  }
                } catch (e) {
                  console.error('Theme initialization error:', e);
                }
              })();
            `,
          }}
        />
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#00a76f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Evermount Capital" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* JSON-LD Rich Schema */}
        {/* Enhanced Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "@id": "https://www.evermount.co/#organization",
              name: "Evermount Capital",
              alternateName: "Evermount",
              url: "https://www.evermount.co",
              logo: {
                "@type": "ImageObject",
                url: "https://www.evermount.co/logos/logo.png",
                width: 512,
                height: 512,
              },
              image: "https://www.evermount.co/og-image.png",
              description:
                "AI-powered hedge fund platform providing quantitative trading strategies, portfolio management, and risk-optimized investment solutions for global investors.",
              foundingDate: "2023",
              founder: [
                {
                  "@type": "Person",
                  name: "Daniel Mawioo",
                  jobTitle: "CEO & Co-Founder",
                },
                {
                  "@type": "Person",
                  name: "Evans Kipngetich",
                  jobTitle: "Chief Data Officer & Co-Founder",
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "KE",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+254758578816",
                  contactType: "Customer Support",
                  email: "info@evermount.co",
                  areaServed: "Worldwide",
                  availableLanguage: ["English"],
                },
                {
                  "@type": "ContactPoint",
                  email: "support@evermount.co",
                  contactType: "Technical Support",
                  areaServed: "Worldwide",
                },
              ],
              sameAs: [
                "https://twitter.com/evermountcapital",
                "https://x.com/evermountcapital",
                "https://linkedin.com/company/evermount-capital",
                "https://tiktok.com/@evermount",
                "https://discord.gg/evermount",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
              offers: {
                "@type": "Offer",
                name: "Hedge Fund Investment Services",
                description:
                  "AI-powered quantitative trading and portfolio management",
              },
            }),
          }}
        />

        {/* Breadcrumb List Schema */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
      </head>
      <body className="bg-white text-gray-900 dark:bg-[#0b0b12] dark:text-gray-100 antialiased" suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
        <IntercomProvider />
        <Analytics />
      </body>
    </html>
  );
}

