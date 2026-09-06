import PageHero from "@/app/components/marketing/PageHero";
import BulletSection from "@/app/components/marketing/BulletSection";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Market & Portfolio Analytics",
  "Performance, risk, exposure, attribution and stress-testing analytics capabilities in the Evermount platform.",
  "/analytics",
);

export default function AnalyticsPage() {
  return (
    <main className="px-6 py-16 max-w-5xl mx-auto space-y-12">
      <PageHero
        eyebrow="Analytics"
        title="Market & Portfolio Analytics"
        body="Analytics capabilities for performance, risk and exposure. Figures shown in product demos are illustrative unless labeled as a customer's own data. Evermount does not publish investment returns or Sharpe ratios as company performance."
        primaryHref="/platform"
        primaryLabel="Explore Platform"
        secondaryHref="/book-demo"
        secondaryLabel="Request Access"
      />
      <BulletSection
        title="Capabilities"
        items={[
          "Performance analytics",
          "Risk analytics",
          "Exposure",
          "Volatility",
          "Drawdown",
          "Sharpe ratio (as an analytics metric on customer portfolios)",
          "Factor exposure",
          "Attribution",
          "Scenario analysis",
          "Stress testing",
        ]}
      />
      <CtaBand
        title="See analytics in context"
        body="Request access to discuss how analytics APIs and dashboards fit your workflow."
      />
    </main>
  );
}
