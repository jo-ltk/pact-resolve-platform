"use client";

import { useEffect, useState } from "react";
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

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      
      <div
        className={`relative z-10 w-full transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
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
      </div>
    </main>
  );
}
