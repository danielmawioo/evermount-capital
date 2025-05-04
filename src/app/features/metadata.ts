import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Features | Evermount Capital",
  description:
    "Explore the proprietary strategies and trading infrastructure that give Evermount its performance edge.",
  openGraph: {
    title: "Platform Features | Evermount Capital",
    description:
      "Discover the systems powering Evermount — from AI trading engines to real-time dashboards and compliance tools.",
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
      "Explore the AI and quant tech powering Evermount’s hedge fund strategies.",
    images: ["/og-image.png"],
  },
};
