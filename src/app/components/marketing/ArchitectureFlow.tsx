"use client";

import { useLocale } from "@/context/LocaleContext";

interface ArchitectureFlowProps {
  stages: string[];
  title?: string;
  body?: string;
}

export default function ArchitectureFlow({
  stages,
  title = "Platform architecture",
  body,
}: ArchitectureFlowProps) {
  const { tx } = useLocale();
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      {title ? (
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          {tx(title)}
        </h2>
      ) : null}
      {body ? (
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          {tx(body)}
        </p>
      ) : null}
      <ol className="rounded-2xl bg-[#0d1b2a] text-white p-6 space-y-2 font-mono text-sm shadow-lg">
        {stages.map((stage, i) => (
          <li key={stage}>
            <div className="rounded-lg border border-[#00a76f]/30 bg-[#11263a] px-4 py-3 text-center">
              {tx(stage)}
            </div>
            {i < stages.length - 1 ? (
              <div className="text-center text-[#00a76f] py-1" aria-hidden>
                ↓
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
