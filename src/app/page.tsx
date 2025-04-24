// src/app/page.tsx
import Hero from "./components/Hero";
import HomeSectionsWithImages from "./components/HomeSections";
import TrustLogos from "./components/TrustLogos";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustLogos />
      <HomeSectionsWithImages />
    </main>
  );
}
