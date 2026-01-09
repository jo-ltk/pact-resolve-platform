"use client";

import { PageHero } from "@/components/page-hero";
import { AcademySection } from "@/components/sections/academy-section";
import { ContactSection } from "@/components/sections/contact-section";
import { MagneticButton } from "@/components/magnetic-button";
import { GraduationCap } from "lucide-react";

export default function AcademyPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <PageHero 
        subtitle="Education & Training"
        title="Academy"
        description="Advance your professional expertise with our world-class mediation training and certification programs."
      >
        <MagneticButton
          size="lg"
          variant="primary"
          className="flex items-center gap-2"
        >
          View Courses
          <GraduationCap className="h-5 w-5" />
        </MagneticButton>
      </PageHero>
      
      <div className="py-24">
        <AcademySection />
      </div>
      
      <ContactSection />
    </main>
  );
}
