"use client";

import Script from "next/script";
import HeroSection from "./components/HeroSection";
import StoryAndMissionSection from "./components/StoryAndMissionSection";
import ApproachAndValuesSection from "./components/ApproachAndValuesSection";
import TechnologySection from "./components/TechnologySection";
import FoundersSection from "./components/FoundersSection";
import WhyChooseUsAndClosingSection from "./components/WhyChooseUsAndClosingSection";

export default function AboutPage() {
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Evermount Capital",
    description:
      "Learn about Evermount Capital's mission, vision, and team of founders building the future of AI-powered hedge fund investing.",
    url: "https://www.evermount.co/about",
    mainEntity: {
      "@type": "Organization",
      name: "Evermount Capital",
      founder: [
        {
          "@type": "Person",
          name: "Daniel Mawioo",
          jobTitle: "CEO & Co-Founder",
          sameAs: "https://www.linkedin.com/in/danielmawioo/",
        },
        {
          "@type": "Person",
          name: "Evans Kipngetich",
          jobTitle: "Chief Data Officer & Co-Founder",
          sameAs: "https://www.linkedin.com/in/evans-kipngetich/",
        },
      ],
    },
  };

  return (
    <>
      <Script
        id="about-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutStructuredData),
        }}
      />
      <main className="px-6 py-20 max-w-7xl mx-auto space-y-20 bg-white dark:bg-gray-900">
        <HeroSection />
        <StoryAndMissionSection />
        <ApproachAndValuesSection />
        <TechnologySection />
        <FoundersSection />
        <WhyChooseUsAndClosingSection />
      </main>
    </>
  );
}
