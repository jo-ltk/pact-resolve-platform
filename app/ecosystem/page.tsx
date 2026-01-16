"use client";

import { EcosystemHero } from "@/components/sections/ecosystem/ecosystem-hero";
import { AboutUs } from "@/components/sections/ecosystem/about-us";
import { Collaborations } from "@/components/sections/ecosystem/collaborations";
import { TeamSection } from "@/components/sections/ecosystem/team";
import { PledgeSection } from "@/components/sections/ecosystem/pledge";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn } from "@/components/motion-wrapper";

export default function EcosystemPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
        {/* 1. Hero Section */}
        <EcosystemHero />
        
        {/* 2. About Us (Who We Are, What We Do, Values NICER, Accolades, Timeline) */}
        <AboutUs />
        
        {/* 3. Collaborations & Alliances */}
        <Collaborations />
        
        {/* 4. Team Section */}
        <TeamSection />
        
        {/* 5. The PACT Mediation Pledge */}
        <PledgeSection />
        
        <Footer />
      </FadeIn>
    </main>
  );
}
