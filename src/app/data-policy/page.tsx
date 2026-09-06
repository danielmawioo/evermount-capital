import { pageMetadata } from "@/lib/page-metadata";
import LegalView from "./LegalView";

export const metadata = pageMetadata(
  "Market Data Policy",
  "Licensing, redistribution, permitted use and accuracy disclaimers for Evermount and third-party market data.",
  "/data-policy",
);

export default function Page() {
  return <LegalView />;
}
