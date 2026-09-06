import PageHero from "@/app/components/marketing/PageHero";
import BulletSection from "@/app/components/marketing/BulletSection";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Platform Tour",
  "A seven-step journey from connecting systems to monitoring markets, risk and execution on Evermount.",
  "/platform-tour",
);

const STEPS = [
  {
    title: "1. Connect",
    items: [
      "Connect data sources, brokers, venues or institutional systems where integrations exist.",
    ],
  },
  {
    title: "2. Integrate",
    items: ["Integrate Evermount APIs and infrastructure."],
  },
  {
    title: "3. Research",
    items: ["Build and test quantitative models."],
  },
  {
    title: "4. Analyze",
    items: ["Use analytics and AI to understand markets."],
  },
  {
    title: "5. Manage Risk",
    items: ["Apply real-time risk controls."],
  },
  {
    title: "6. Execute",
    items: ["Deploy execution infrastructure where enabled."],
  },
  {
    title: "7. Monitor",
    items: ["Monitor markets, systems, positions and risk."],
  },
];

export default function PlatformTourPage() {
  return (
    <main className="px-6 py-16 max-w-5xl mx-auto space-y-12">
      <PageHero
        eyebrow="Platform tour"
        title="From Connect to Monitor"
        body="A practical journey for institutions and developers using Evermount infrastructure — not a fund onboarding flow."
        primaryHref="/platform"
        primaryLabel="Explore Platform"
        secondaryHref="/book-demo"
        secondaryLabel="Request Access"
      />
      {STEPS.map((step) => (
        <BulletSection key={step.title} title={step.title} items={step.items} />
      ))}
      <CtaBand
        title="Request a guided walkthrough"
        body="Talk with Evermount about your data, API and risk requirements."
      />
    </main>
  );
}
