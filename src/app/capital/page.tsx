import { pageMetadata } from "@/lib/page-metadata";
import CapitalPageContent from "./CapitalPageContent";

export const metadata = pageMetadata(
  "Evermount Capital",
  "Evermount Capital applies the company’s research, risk and execution systems to systematic strategies. It is one product — not the whole company.",
  "/capital",
);

export default function CapitalPage() {
  return <CapitalPageContent />;
}
