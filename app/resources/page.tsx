"use client";

import { PageHero } from "@/components/page-hero";
import { ResourcesSection } from "@/components/sections/resources-section";
import { ContactSection } from "@/components/sections/contact-section";
import { MagneticButton } from "@/components/magnetic-button";
import { Library } from "lucide-react";

export default function ResourcesPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <PageHero 
        subtitle="Knowledge Base"
        title="Resources"
        description="Access our comprehensive library of mediation guides, research papers, and institutional frameworks."
      >
        <MagneticButton
          size="lg"
          variant="primary"
          className="flex items-center gap-2"
        >
          Access Library
          <Library className="h-5 w-5" />
        </MagneticButton>
      </PageHero>
      
      <div className="py-24">
        <ResourcesSection />
      </div>
      
      <ContactSection />
    </main>
  );
}
