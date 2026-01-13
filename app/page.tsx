"use client";

import { HeroCarousel } from "@/components/sections/home/hero-carousel";
import { NewsSection } from "@/components/sections/home/news-section";
import { AboutPact } from "@/components/sections/home/about-pact";
import { CTASection } from "@/components/sections/home/cta-section";
import { WhyPact } from "@/components/sections/home/why-pact";
import { PanelNeutrals } from "@/components/sections/home/panel-neutrals";
import { Collaborators } from "@/components/sections/home/collaborators";
import { Supporters } from "@/components/sections/home/supporters";
import { NetworkLogos } from "@/components/sections/home/network-logos";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn } from "@/components/motion-wrapper";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
        <HeroCarousel />
        
        <div id="news">
          <NewsSection />
        </div>
        
        <div id="about">
          <AboutPact />
        </div>
        
        <div id="contact">
          <CTASection />
        </div>
        
        <div id="why-pact">
          <WhyPact />
        </div>
        
        <div id="panel">
          <PanelNeutrals />
        </div>
        
        <div id="collaborators">
          <Collaborators />
        </div>
        
        <div id="testimonials">
          <Supporters />
        </div>
        
        <div id="network">
          <NetworkLogos />
        </div>
        
        <Footer />
      </FadeIn>
    </main>
  );
}
