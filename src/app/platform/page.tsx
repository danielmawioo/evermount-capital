import PageHero from "@/app/components/marketing/PageHero";
import BulletSection from "@/app/components/marketing/BulletSection";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "The Evermount Financial Infrastructure Platform",
  "Market data, quantitative research, AI, execution, risk and portfolio infrastructure for modern financial markets.",
  "/platform",
);

const SECTIONS = [
  {
    id: "market-data",
    title: "Market Data Infrastructure",
    body: "Infrastructure for ingesting, normalizing and distributing market data.",
    items: [
      "Real-time data",
      "Historical data",
      "Data normalization",
      "Data validation",
      "Streaming data",
      "WebSockets",
      "Market data APIs",
      "Alternative data integrations",
    ],
  },
  {
    id: "quantitative-research",
    title: "Quantitative Research",
    body: "Research, modeling, simulation and backtesting infrastructure.",
    items: [
      "Backtesting",
      "Simulation",
      "Statistical modeling",
      "Factor research",
      "Strategy research",
      "Portfolio construction",
      "Scenario analysis",
    ],
  },
  {
    id: "ai-intelligence",
    title: "AI & Intelligence",
    body: "Machine learning, market intelligence, signal generation and analytics.",
    items: [
      "Machine learning",
      "Market regime detection",
      "Signal generation",
      "NLP",
      "Predictive analytics",
      "AI research assistants",
      "Agentic workflows",
    ],
  },
  {
    id: "execution",
    title: "Execution",
    body: "Algorithmic execution, order management and execution analytics. Connectivity to brokers and venues depends on integration status and applicable regulation.",
    items: [
      "Algorithmic execution",
      "Order management",
      "Execution analytics",
      "Smart routing",
      "Broker connectivity",
      "Venue connectivity",
    ],
  },
  {
    id: "risk",
    title: "Risk Infrastructure",
    body: "Pre-trade and real-time risk controls embedded in the platform.",
    items: [
      "Pre-trade risk",
      "Real-time risk",
      "Exposure monitoring",
      "Position limits",
      "Margin monitoring",
      "Stress testing",
      "Scenario analysis",
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio Infrastructure",
    body: "Portfolio construction, optimization and analytics — not a managed investment product.",
    items: [
      "Portfolio construction",
      "Optimization",
      "Rebalancing",
      "Attribution",
      "Performance analytics",
      "Exposure analytics",
    ],
  },
];

export default function PlatformPage() {
  return (
    <main className="px-6 py-16 max-w-5xl mx-auto space-y-16">
      <PageHero
        eyebrow="Platform"
        title="The Evermount Financial Infrastructure Platform"
        body="Build, connect, analyze and execute across financial markets using Evermount infrastructure."
        primaryHref="/book-demo"
        primaryLabel="Request Access"
        secondaryHref="/developers"
        secondaryLabel="Explore APIs"
      />
      {SECTIONS.map((section) => (
        <BulletSection key={section.id} {...section} />
      ))}
      <CtaBand
        title="See the platform architecture"
        body="Explore how market data, research, intelligence, risk and execution connect."
        secondaryHref="/infrastructure"
        secondaryLabel="View Infrastructure"
      />
    </main>
  );
}
