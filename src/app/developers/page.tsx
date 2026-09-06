import PageHero from "@/app/components/marketing/PageHero";
import CtaBand from "@/app/components/marketing/CtaBand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Build on Evermount",
  "Request access for credentials. The public surface today is the gold GEX research overlay — not a general market-data or execution API catalog.",
  "/developers",
);

export default function DevelopersPage() {
  return (
    <main className="px-6 py-16 max-w-5xl mx-auto space-y-12">
      <PageHero
        eyebrow="Developers"
        title="Access, not a catalog of unbuilt APIs"
        body="Evermount does not publish a public Market Data, Risk, or Execution API today. Production credentials and documentation are issued after access is approved. What you can inspect now is the gold GEX overlay used on the research page."
        primaryHref="/book-demo"
        primaryLabel="Request Access"
        secondaryHref="/research#gold-gex"
        secondaryLabel="View gold GEX"
      />
      <section id="gex-overlay" className="scroll-mt-28 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Available now
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          The GEX engine exposes an overlay used by research and (internally)
          MetaTrader. The website proxies a public subset — spot, futures, gamma
          flip, max pain, session, expected move, and paper risk caps — at{" "}
          <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
            GET /api/research/gex
          </code>
          . That is not a general SDK, sandbox, webhook platform, or the
          private decision/OMS API.
        </p>
      </section>
      <section id="documentation" className="scroll-mt-28 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Documentation
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Full API documentation, keys and rate limits ship with approved
          access. Until then, the research board and API terms are the public
          record.
        </p>
      </section>
      <CtaBand
        title="Request developer access"
        body="Tell us your firm, role and what you need to integrate. We will not list SDKs or sandboxes that are not callable yet."
        secondaryHref="/api-terms"
        secondaryLabel="API Terms"
      />
    </main>
  );
}
