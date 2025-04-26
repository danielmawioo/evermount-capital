import "./styles/globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evermount Capital | High-Performance Hedge Fund Platform",
  description:
    "Manage your portfolio, optimize investments, and grow your wealth with Evermount Capital's smart hedge fund platform.",
  icons: {
    icon: "/favicon.ico", // (Optional) make sure you have favicon in public/
  },
  openGraph: {
    type: "website",
    url: "https://evermount-capital-5cu3.vercel.app",
    title: "Evermount Capital | High-Performance Hedge Fund Platform",
    description:
      "Access a modern hedge fund management platform — track portfolios, analyze risk, and optimize investment growth.",
    images: [
      {
        url: "/og-image.png", // (Optional) Create and add this image in /public folder
        width: 1200,
        height: 630,
        alt: "Evermount Capital Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evermount Capital | High-Performance Hedge Fund Platform",
    description:
      "Grow your portfolio with high-performance investment strategies at Evermount Capital.",
    images: ["/og-image.png"], // Same image as Open Graph
    creator: "@evermountcapital", // (Optional) your Twitter handle
  },
  metadataBase: new URL("https://evermount-capital-5cu3.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-[#0b0b12] dark:text-white">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
