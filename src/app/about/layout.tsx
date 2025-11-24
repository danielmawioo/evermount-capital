import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Evermount Capital",
  description:
    "Meet the Evermount team, our mission, vision, and how we secure your capital with next-gen hedge fund strategies. Learn about our founders and our commitment to AI-powered investing.",
  openGraph: {
    title: "About Us | Evermount Capital",
    description:
      "Meet the Evermount team, our mission, vision, and how we secure your capital with next-gen hedge fund strategies.",
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

