// src/app/login/metadata.ts
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Portal Login | Evermount Capital",
  description:
    "Login securely to the Evermount Capital investor portal. Manage your hedge fund portfolio, track returns, and access powerful investment tools.",
  openGraph: {
    title: "Investor Portal Login | Evermount Capital",
    description:
      "Access your Evermount Capital account to manage investments, analyze performance, and optimize your strategy.",
    url: "https://evermount.co/login",
    siteName: "Evermount Capital",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evermount Login Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login | Evermount Capital",
    description:
      "Secure investor login to your Evermount Capital hedge fund dashboard.",
    images: ["/og-image.png"],
  },
};
