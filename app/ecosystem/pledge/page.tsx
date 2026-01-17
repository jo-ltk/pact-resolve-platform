"use client";

import { PledgeSection } from "@/components/sections/ecosystem/pledge";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn } from "@/components/motion-wrapper";
import { EcosystemHero } from "@/components/sections/ecosystem/ecosystem-hero";

export default function PledgePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      <FadeIn className="relative z-10 w-full">
        {/* Optional: We might want a smaller hero or the same hero but indicating the section. 
            For now, relying on the section itself to provide context or reusing the main hero.
            Given the components are "Sections", they might expect to be part of a flow. 
            Let's add a spacer or reuse the EcosystemHero but maybe we can pass props later.
            For now, just simpler layout. */}
 
        <PledgeSection />
        <Footer />
      </FadeIn>
    </main>
  );
}
