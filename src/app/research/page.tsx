import PageHero from "@/app/components/marketing/PageHero";
import CapabilityGrid from "@/app/components/marketing/CapabilityGrid";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Research",
  "Quantitative research, market structure, AI, risk and execution research from Evermount.",
  "/research",
);

export default function ResearchPage() {
  return (
    <main className="px-6 py-16 max-w-6xl mx-auto space-y-12">
      <PageHero
        eyebrow="Research"
        title="Quantitative Research and Market Intelligence"
        body="Evermount is a quantitative research and financial technology organization. Public research notes will be listed here when published. We do not fabricate papers, performance or customer results."
      />
      <CapabilityGrid
        items={[
          {
            id: "quantitative-research",
            title: "Quantitative Research",
            description:
              "Modeling, simulation, factor research and strategy research infrastructure.",
          },
          {
            id: "market-structure",
            title: "Market Structure",
            description:
              "Research into how venues, liquidity and market microstructure interact with technology.",
          },
          {
            id: "ai-ml",
            title: "AI & Machine Learning",
            description:
              "Methods for regime detection, NLP, forecasting and research assistants.",
          },
          {
            id: "risk-research",
            title: "Risk Research",
            description:
              "Exposure, stress testing, scenario analysis and limit frameworks.",
          },
          {
            id: "execution-research",
            title: "Execution Research",
            description:
              "Execution analytics, routing research and operational controls.",
          },
          {
            id: "market-intelligence",
            title: "Market Intelligence",
            description:
              "Structured intelligence from market data and alternative datasets.",
          },
        ]}
      />
      <p className="text-center text-gray-500 dark:text-gray-400">
        Publications: coming soon.
      </p>
      <CtaBand
        title="Collaborate on research"
        body="Institutions and researchers can discuss data, methods and partnership opportunities."
        primaryLabel="Talk to Evermount"
        secondaryHref="/partners"
        secondaryLabel="Research Partnerships"
      />
    </main>
  );
}
