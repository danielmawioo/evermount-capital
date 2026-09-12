"use client";

import StatsSection from "./home-sections/StatsSection";
import KeyHighlightsSection from "./home-sections/KeyHighlightsSection";
import WhyEvermountSection from "./home-sections/WhyEvermountSection";
import MarketsSection from "./home-sections/MarketsSection";
import FinalCtaSection from "./home-sections/FinalCtaSection";

export default function HomeSectionsWithImages() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <StatsSection />
      <KeyHighlightsSection />
      <WhyEvermountSection />
      <MarketsSection />
      <FinalCtaSection />
    </div>
  );
}
