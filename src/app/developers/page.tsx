import PageHero from "@/app/components/marketing/PageHero";
import BulletSection from "@/app/components/marketing/BulletSection";
import CapabilityGrid from "@/app/components/marketing/CapabilityGrid";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Build on Evermount",
  "Programmatic access to financial data, analytics, intelligence and infrastructure.",
  "/developers",
);

export default function DevelopersPage() {
  return (
    <main className="px-6 py-16 max-w-5xl mx-auto space-y-16">
      <PageHero
        eyebrow="Developers"
        title="Build on Evermount"
        body="Programmatic access to financial data, analytics, intelligence and infrastructure. Public API documentation and production credentials are provided after access is approved."
        primaryHref="/book-demo"
        primaryLabel="Request Access"
        secondaryHref="/developers#documentation"
        secondaryLabel="View Documentation"
      />
      <BulletSection
        id="apis"
        title="APIs"
        body="Planned and in-development API surfaces. Availability is confirmed during onboarding — do not assume every API is live in production."
        items={[
          "Market Data API",
          "Historical Data API",
          "Analytics API",
          "Risk API",
          "Execution API",
        ]}
      />
      <BulletSection
        id="connectivity"
        title="Connectivity"
        items={["REST", "WebSockets", "Streaming", "Webhooks"]}
      />
      <section id="sdks" className="scroll-mt-28">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          SDKs
        </h2>
        <CapabilityGrid
          columns="grid-cols-1 sm:grid-cols-2"
          items={[
            {
              title: "Python",
              description:
                "Primary research and integration language internally.",
              badge: "Coming soon",
            },
            {
              title: "TypeScript / JavaScript",
              description: "Web and application integrations.",
              badge: "Coming soon",
            },
            {
              title: "C++",
              description: "Low-latency systems on the engineering roadmap.",
              badge: "Coming soon",
            },
            {
              title: "Rust",
              description: "Systems programming on the engineering roadmap.",
              badge: "Coming soon",
            },
          ]}
        />
      </section>
      <BulletSection
        id="documentation"
        title="Documentation"
        body="Authentication, API keys, rate limits and examples are published to approved developers. Until then, request access."
        items={[
          "API documentation",
          "Authentication",
          "API keys",
          "Rate limits",
          "Examples",
        ]}
      />
      <BulletSection
        id="sandbox"
        title="Sandbox"
        body="Non-production environments for integration testing are planned for approved developers."
        items={["Sandbox access — coming soon"]}
      />
      <section id="status" className="scroll-mt-28">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          System Status
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          A public status page is coming soon. For incidents, contact
          support@evermount.co.
        </p>
      </section>
      <CtaBand
        title="Request developer access"
        body="Share your company, role and API requirements so we can provision the right environment."
        secondaryHref="/api-terms"
        secondaryLabel="API Terms"
      />
    </main>
  );
}
