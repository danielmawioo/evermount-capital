import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Insights | Evermount Capital - Performance Analytics",
  description:
    "Explore portfolio growth, performance metrics, and capital risk breakdown through the Evermount insights dashboard. Track returns, volatility, and Sharpe ratios in real-time.",
  keywords: [
    "portfolio analytics",
    "investment performance",
    "risk metrics",
    "hedge fund analytics",
    "portfolio dashboard",
  ],
  openGraph: {
    title: "Portfolio Insights | Evermount Capital - Performance Analytics",
    description:
      "Explore portfolio growth, performance metrics, and capital risk breakdown through the Evermount insights dashboard.",
    url: "https://www.evermount.co/portfolio-insights",
    siteName: "Evermount Capital",
    type: "website",
    images: [
      {
        url: "https://www.evermount.co/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evermount Portfolio Insights Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Insights | Evermount Capital - Performance Analytics",
    description:
      "Visualize your portfolio's growth, volatility, and Sharpe ratio using Evermount's real-time dashboard.",
    images: ["https://www.evermount.co/og-image.png"],
  },
  alternates: {
    canonical: "https://www.evermount.co/portfolio-insights",
  },
};
