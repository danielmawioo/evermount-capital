import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Features | Evermount Capital",
  description:
    "Explore the quantitative research and trading infrastructure Evermount is building for African financial markets.",
  openGraph: {
    title: "Platform Features | Evermount Capital",
    description:
      "Discover the systems powering Evermount — from AI-driven trading research engines to real-time dashboards.",
    url: "https://evermount.co/features",
    siteName: "Evermount Capital",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evermount Capital Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Features | Evermount Capital",
    description:
      "Explore the AI and quant tech powering Evermount's trading strategies.",
    images: ["/og-image.png"],
  },
};
