import PageHero from "@/app/components/marketing/PageHero";
import CapabilityGrid from "@/app/components/marketing/CapabilityGrid";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Infrastructure for Financial Institutions",
  "Market data, analytics, risk, execution and connectivity infrastructure for banks, brokers, asset managers and trading firms.",
  "/institutions",
);

export default function InstitutionsPage() {
  return (
    <main className="px-6 py-16 max-w-6xl mx-auto space-y-12">
      <PageHero
        eyebrow="Institutions"
        title="Infrastructure for Financial Institutions"
        body="Evermount provides technology and infrastructure services. Institutional customers remain responsible for their own regulatory obligations where applicable."
        primaryHref="/book-demo"
        primaryLabel="Talk to Evermount"
        secondaryHref="/platform"
        secondaryLabel="Explore Platform"
      />
      <CapabilityGrid
        items={[
          {
            id: "banks",
            title: "Banks",
            description:
              "Market data, analytics, risk and execution infrastructure.",
          },
          {
            id: "brokers",
            title: "Brokers",
            description: "Connectivity, execution and risk infrastructure.",
          },
          {
            id: "asset-managers",
            title: "Asset Managers",
            description:
              "Research, portfolio analytics, risk and execution tooling.",
          },
          {
            id: "exchanges",
            title: "Exchanges & Venues",
            description:
              "Market infrastructure, analytics and technology integrations.",
          },
          {
            id: "market-makers",
            title: "Market Makers",
            description:
              "High-performance data, research, execution and risk infrastructure.",
          },
          {
            id: "fintechs",
            title: "Fintechs",
            description:
              "APIs and financial infrastructure that can be integrated into products.",
          },
          {
            id: "trading-firms",
            title: "Trading Firms",
            description:
              "Quantitative research, data, execution and risk infrastructure.",
          },
        ]}
      />
      <CtaBand
        title="Talk to Evermount"
        body="Share your institution type, markets of interest and infrastructure requirements."
        primaryLabel="Talk to Sales"
      />
    </main>
  );
}
