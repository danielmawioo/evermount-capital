import PageHero from "@/app/components/marketing/PageHero";
import CapabilityGrid from "@/app/components/marketing/CapabilityGrid";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Partners",
  "Build the financial ecosystem with Evermount through data, connectivity, technology and research partnerships.",
  "/partners",
);

export default function PartnersPage() {
  return (
    <main className="px-6 py-16 max-w-6xl mx-auto space-y-12">
      <PageHero
        eyebrow="Partners"
        title="Build the Financial Ecosystem With Evermount"
        body="We work with banks, brokers, exchanges, market data providers, fintechs, technology providers, liquidity providers and institutions. Named partnerships are listed only when they are real and approved to be public."
        primaryHref="/book-demo"
        primaryLabel="Become a Partner"
      />
      <CapabilityGrid
        items={[
          {
            title: "Data Partnerships",
            description: "Market data and alternative data integrations.",
          },
          {
            title: "Market Connectivity",
            description: "Broker, venue and institutional connectivity.",
          },
          {
            title: "Technology Integration",
            description: "APIs, platforms and infrastructure integrations.",
          },
          {
            title: "Institutional Infrastructure",
            description: "Deployments for banks, brokers and asset managers.",
          },
          {
            title: "Research Partnerships",
            description: "Quantitative and market-structure collaboration.",
          },
          {
            title: "Distribution Partnerships",
            description: "Channels that bring Evermount infrastructure to users.",
          },
        ]}
      />
      <CtaBand
        title="Start a partnership conversation"
        body="Describe the partnership type, markets and technical scope."
        primaryLabel="Become a Partner"
      />
    </main>
  );
}
