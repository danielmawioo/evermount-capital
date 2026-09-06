import PageHero from "@/app/components/marketing/PageHero";
import CapabilityGrid from "@/app/components/marketing/CapabilityGrid";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Markets",
  "Market-agnostic infrastructure for equities, FX, fixed income, commodities, derivatives and digital assets.",
  "/markets",
);

export default function MarketsPage() {
  return (
    <main className="px-6 py-16 max-w-6xl mx-auto space-y-12">
      <PageHero
        eyebrow="Markets"
        title="Infrastructure Across Asset Classes"
        body="Evermount is positioned as market-agnostic. The sections below describe infrastructure for each market — not a claim that Evermount provides regulated access to every venue or instrument."
      />
      <CapabilityGrid
        items={[
          {
            id: "equities",
            title: "Equities",
            description:
              "Technology and analytics infrastructure for equity markets.",
          },
          {
            id: "fx",
            title: "Foreign Exchange",
            description:
              "Market data, analytics, risk and execution infrastructure for FX.",
          },
          {
            id: "fixed-income",
            title: "Fixed Income",
            description:
              "Infrastructure for rates, bonds and credit markets.",
          },
          {
            id: "commodities",
            title: "Commodities",
            description:
              "Market data, analytics and execution infrastructure for commodity markets.",
          },
          {
            id: "derivatives",
            title: "Derivatives",
            description:
              "Infrastructure for futures, options and other derivatives.",
          },
          {
            id: "digital-assets",
            title: "Digital Assets",
            description:
              "Technology infrastructure for digital asset markets where supported.",
          },
        ]}
      />
      <CtaBand
        title="Discuss markets of interest"
        body="Tell us which asset classes and data requirements matter for your institution."
        primaryLabel="Talk to Evermount"
      />
    </main>
  );
}
