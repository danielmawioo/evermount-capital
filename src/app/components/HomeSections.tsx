"use client";

import StatsSection from "./home-sections/StatsSection";
import KeyHighlightsSection from "./home-sections/KeyHighlightsSection";
import WhyEvermountSection from "./home-sections/WhyEvermountSection";
import FundHighlightsSection from "./home-sections/FundHighlightsSection";
import InvestmentTimelineSection from "./home-sections/InvestmentTimelineSection";
import FinalCtaSection from "./home-sections/FinalCtaSection";

export default function HomeSectionsWithImages() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <StatsSection />
      <KeyHighlightsSection />
      <WhyEvermountSection />
      <FundHighlightsSection />
      <InvestmentTimelineSection />
      <FinalCtaSection />
    </div>
  );
}
