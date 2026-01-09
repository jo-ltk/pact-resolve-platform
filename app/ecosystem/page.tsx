"use client";

import { PageHero } from "@/components/page-hero";
import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { ContactSection } from "@/components/sections/contact-section";
import { MagneticButton } from "@/components/magnetic-button";
import { Network } from "lucide-react";

export default function EcosystemPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <PageHero 
        subtitle="Global Network"
        title="Ecosystem"
        description="A collaborative environment connecting ADR professionals, institutions, and enterprises across the globe."
      >
        <MagneticButton
          size="lg"
          variant="primary"
          className="flex items-center gap-2"
        >
          Join Network
          <Network className="h-5 w-5" />
        </MagneticButton>
      </PageHero>
      
      <div className="py-24">
        <EcosystemSection />
      </div>
      
      <ContactSection />
    </main>
  );
}
