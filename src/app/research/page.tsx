import PageHero from "@/app/components/marketing/PageHero";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";
import GexLevelsPanel from "./GexLevelsPanel";

export const metadata = pageMetadata(
  "Gold GEX research",
  "Evermount publishes gold market-structure levels from its GEX engine: spot, COMEX basis, gamma flip and max pain.",
  "/research",
);

export default function ResearchPage() {
  return (
    <main className="px-6 py-16 max-w-6xl mx-auto space-y-12">
      <PageHero
        eyebrow="Research"
        title="Gold market structure"
        body="This page shows levels from Evermount’s GEX engine for XAU / COMEX gold. When the engine is connected, numbers refresh from the live overlay. Otherwise you see the published fixture snapshot — not invented performance."
        primaryHref="/book-demo"
        primaryLabel="Talk to research"
        secondaryHref="/markets#commodities"
        secondaryLabel="Commodities"
      />
      <GexLevelsPanel />
      <CtaBand
        title="Institutional research access"
        body="The public board is a subset of the overlay (spot, futures, gamma flip, max pain). Deeper chain analytics stay behind access review."
        primaryLabel="Request Access"
        secondaryHref="/partners"
        secondaryLabel="Research Partnerships"
      />
    </main>
  );
}
