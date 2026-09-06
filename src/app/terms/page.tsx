import LegalNotice from "@/app/components/marketing/LegalNotice";
import { pageMetadata } from "@/lib/page-metadata";
import LegalView from "./LegalView";

export const metadata = pageMetadata(
  "Platform Services Agreement",
  "Terms governing platform access, software services, APIs, data and infrastructure provided by Evermount.",
  "/terms",
);

export default function Page() {
  return <LegalView />;
}
