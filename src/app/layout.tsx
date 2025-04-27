// src/app/layout.tsx

import "./styles/globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evermount Capital | High-Performance Hedge Fund Platform",
  description:
    "Manage your portfolio, optimize investments, and grow your wealth with Evermount Capital's smart hedge fund platform.",
  metadataBase: new URL("https://evermount-capital-5cu3.vercel.app"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://evermount-capital-5cu3.vercel.app",
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
      <body className="bg-white text-gray-900">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
