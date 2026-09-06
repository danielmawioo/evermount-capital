import PageHero from "@/app/components/marketing/PageHero";
import BulletSection from "@/app/components/marketing/BulletSection";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Technology",
  "Evermount technology architecture across data engineering, quantitative computing, AI, trading systems and risk.",
  "/technology",
);

export default function TechnologyPage() {
  return (
    <main className="px-6 py-16 max-w-5xl mx-auto space-y-16">
      <PageHero
        eyebrow="Technology"
        title="Technology Architecture"
        body="The stack below reflects systems we use today and capabilities on the engineering roadmap. We do not publish latency, uptime or throughput figures unless independently verified."
        primaryHref="/infrastructure"
        primaryLabel="View Infrastructure"
        secondaryHref="/developers"
        secondaryLabel="Explore APIs"
      />
      <BulletSection
        title="Data Engineering"
        items={[
          "Streaming",
          "Data normalization",
          "Event-driven systems",
          "Data quality",
          "Historical storage",
        ]}
      />
      <BulletSection
        title="Quantitative Computing"
        body="Languages in active use include TypeScript and Python. C++ and Rust are on the systems roadmap."
        items={[
          "Python",
          "TypeScript / JavaScript",
          "C++ — roadmap",
          "Rust — roadmap",
          "Numerical computing",
          "Distributed computing — roadmap",
        ]}
      />
      <BulletSection
        title="AI / Machine Learning"
        items={[
          "ML models",
          "NLP",
          "Forecasting",
          "Regime detection",
          "Agentic systems",
        ]}
      />
      <BulletSection
        title="Trading Systems"
        items={[
          "Market data handlers",
          "Order management",
          "Execution systems",
          "Connectivity",
          "Low-latency architecture — roadmap",
        ]}
      />
      <BulletSection
        title="Risk Systems"
        items={[
          "Pre-trade risk",
          "Real-time risk",
          "Exposure",
          "Limits",
          "Stress testing",
        ]}
      />
      <BulletSection
        title="Infrastructure"
        body="Production hosting and operations details are confirmed with customers during deployment planning."
        items={[
          "Cloud",
          "Containers — roadmap",
          "Kubernetes — roadmap",
          "Observability",
          "High availability — planned for enterprise deployments",
          "Disaster recovery — planned for enterprise deployments",
        ]}
      />
      <CtaBand
        title="Talk to engineering"
        body="Discuss architecture and integration without invented performance claims."
        primaryLabel="Talk to Engineering"
      />
    </main>
  );
}
