import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Insights | Evermount Capital",
  description:
    "Gain deep insights into your investment growth, risk exposure, and capital efficiency — all in one intelligent dashboard.",
  openGraph: {
    title: "Portfolio Insights | Evermount Capital",
    description:
      "Track your investment performance, benchmark comparisons, and risk allocation using Evermount’s intelligent insights dashboard.",
    url: "https://evermount.co/insights",
    siteName: "Evermount Capital",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evermount Portfolio Insights Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Insights | Evermount Capital",
    description:
      "Visualize your portfolio's growth, volatility, and Sharpe ratio using Evermount’s real-time dashboard.",
    images: ["/og-image.png"],
  },
};
