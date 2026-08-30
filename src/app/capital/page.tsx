import { Metadata } from "next";
import CapitalPageContent from "./CapitalPageContent";

export const metadata: Metadata = {
  title: "Evermount Capital | Systematic Capital Management",
  description:
    "Evermount Capital applies Evermount's AI financial intelligence, quantitative research, risk and execution infrastructure to systematic investment strategies.",
  alternates: {
    canonical: "https://www.evermount.co/capital",
  },
};

export default function CapitalPage() {
  return <CapitalPageContent />;
}
