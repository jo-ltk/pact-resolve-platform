"use client";

import { PageHero } from "@/components/page-hero";
import { WorkSection } from "@/components/sections/work-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ContactSection } from "@/components/sections/contact-section";
import { MagneticButton } from "@/components/magnetic-button";
import { MousePointer2 } from "lucide-react";

export default function MediationPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <PageHero 
        subtitle="Core Services"
        title="Mediation"
        description="Structured, confidential, and internationally recognized conflict resolution services for global institutions and enterprises."
      >
        <MagneticButton
          size="lg"
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Book a Session
          <MousePointer2 className="h-5 w-5" />
        </MagneticButton>
      </PageHero>
      
      <div className="space-y-24 py-24">
        <WorkSection />
        <div className="bg-slate-50/50">
          <ServicesSection />
        </div>
      </div>
      
      <div id="contact">
        <ContactSection />
      </div>
    </main>
  );
}
