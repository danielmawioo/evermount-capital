import PageHero from "@/app/components/marketing/PageHero";
import CapabilityGrid from "@/app/components/marketing/CapabilityGrid";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Infrastructure Pricing",
  "Developer, Professional, Institutional and Enterprise access tiers. Commercial terms are provided by sales — no invented list prices.",
  "/pricing",
);

export default function PricingPage() {
  return (
    <main className="px-6 py-16 max-w-6xl mx-auto space-y-12">
      <PageHero
        eyebrow="Pricing"
        title="Infrastructure Pricing"
        body="Commercial terms depend on data, markets, API volume and deployment model. We do not publish invented list prices. Contact sales for a proposal."
        primaryHref="/book-demo"
        primaryLabel="Contact Sales"
        secondaryHref="/book-demo"
        secondaryLabel="Request Access"
      />
      <CapabilityGrid
        columns="grid-cols-1 md:grid-cols-2"
        items={[
          {
            title: "Developer",
            description:
              "For developers and researchers. Potential capabilities: sandbox, limited API access, historical data, research tools and documentation.",
          },
          {
            title: "Professional",
            description:
              "For trading firms, fintechs and professional users. Potential capabilities: real-time data, advanced APIs, analytics, risk APIs and execution capabilities where enabled.",
          },
          {
            title: "Institutional",
            description:
              "For banks, brokers and asset managers. Potential capabilities: institutional APIs, dedicated infrastructure, market connectivity, risk and execution infrastructure, and enterprise support.",
          },
          {
            title: "Enterprise",
            description:
              "For large-scale deployments. Potential capabilities: dedicated deployment, private connectivity, custom integrations, high availability, dedicated engineering and SLA — subject to contract.",
          },
        ]}
      />
      <CtaBand
        title="Request a commercial discussion"
        body="Share expected scale, markets and infrastructure requirements. Pricing is quoted, not listed as fund fees."
        primaryLabel="Contact Sales"
      />
    </main>
  );
}
