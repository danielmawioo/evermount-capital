"use client";

import CompanyStorySection from "./extended-home-sections/CompanyStorySection";
import TechnologyAndSecuritySection from "./extended-home-sections/TechnologyAndSecuritySection";
import EvermountAiSection from "./extended-home-sections/EvermountAiSection";
import PlatformSystemsSection from "./extended-home-sections/PlatformSystemsSection";
import TeamAndReachSection from "./extended-home-sections/TeamAndReachSection";
import MetricsAndCtaSection from "./extended-home-sections/MetricsAndCtaSection";

export default function ExtendedHomeSections() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <CompanyStorySection />
      <TechnologyAndSecuritySection />
      <EvermountAiSection />
      <PlatformSystemsSection />
      <TeamAndReachSection />
      <MetricsAndCtaSection />
    </div>
  );
}
