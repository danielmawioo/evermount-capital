import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Evermount Capital",
  description:
    "Meet the Evermount team, our mission, vision, and how we're building AI financial intelligence and trading infrastructure for Africa.",
  openGraph: {
    title: "About Us | Evermount Capital",
    description:
      "Meet the Evermount team, our mission, vision, and how we're building AI financial intelligence and trading infrastructure for Africa.",
    url: "https://www.evermount.co/about",
    type: "website",
  },
  alternates: {
    canonical: "https://www.evermount.co/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
