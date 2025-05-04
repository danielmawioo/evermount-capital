import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Plans | Evermount Capital",
  description:
    "Compare transparent Evermount pricing tiers — choose the strategy that fits your capital, goals, and timeline.",
  openGraph: {
    title: "Investment Plans | Evermount Capital",
    description:
      "Explore Evermount Capital’s pricing tiers — tailored plans for different capital sizes, ROI expectations, and advisory access.",
    url: "https://evermount.co/pricing",
    siteName: "Evermount Capital",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evermount Pricing Tiers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investment Plans | Evermount Capital",
    description:
      "Choose your Evermount investment strategy — from AI-driven insights to dedicated manager support, scaled by capital tiers.",
    images: ["/og-image.png"],
  },
};
