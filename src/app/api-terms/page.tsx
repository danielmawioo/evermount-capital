import { pageMetadata } from "@/lib/page-metadata";
import LegalView from "./LegalView";

export const metadata = pageMetadata(
  "API Terms",
  "Terms for Evermount API usage, authentication, rate limits, data use and security.",
  "/api-terms",
);

export default function Page() {
  return <LegalView />;
}
