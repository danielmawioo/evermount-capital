import PageHero from "@/app/components/marketing/PageHero";
import ArchitectureFlow from "@/app/components/marketing/ArchitectureFlow";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Infrastructure Built for Modern Financial Markets",
  "A technology foundation for market data, quantitative research, intelligence, risk and execution.",
  "/infrastructure",
);

export default function InfrastructurePage() {
  return (
    <main className="px-6 py-16 max-w-5xl mx-auto space-y-8">
      <PageHero
        eyebrow="Infrastructure"
        title="Infrastructure Built for Modern Financial Markets"
        body="A technology foundation for market data, quantitative research, intelligence, risk and execution."
        primaryHref="/book-demo"
        primaryLabel="Request Access"
        secondaryHref="/platform"
        secondaryLabel="Explore Platform"
      />
      <ArchitectureFlow
        title="How the stack connects"
        body="A conceptual architecture. Specific deployments, venues and integrations vary by customer and jurisdiction."
        stages={[
          "Market Data",
          "Data Platform",
          "Quant Research + AI",
          "Risk Engine",
          "Execution Engine",
          "Brokers / Exchanges / Venues",
          "Financial Applications",
        ]}
      />
      <CtaBand
        title="Talk to engineering"
        body="Discuss architecture, APIs and integration requirements with the Evermount team."
        primaryHref="/book-demo"
        primaryLabel="Talk to Engineering"
        secondaryHref="/developers"
        secondaryLabel="View Documentation"
      />
    </main>
  );
}
