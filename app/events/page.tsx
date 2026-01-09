"use client";

import { PageHero } from "@/components/page-hero";
import { EventsSection } from "@/components/sections/events-section";
import { ContactSection } from "@/components/sections/contact-section";
import { MagneticButton } from "@/components/magnetic-button";
import { Calendar } from "lucide-react";

export default function EventsPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <PageHero 
        subtitle="Connect & Engage"
        title="Events"
        description="Join international summits, webinars, and networking events for global mediation professionals."
      >
        <MagneticButton
          size="lg"
          variant="primary"
          className="flex items-center gap-2"
        >
          View Calendar
          <Calendar className="h-5 w-5" />
        </MagneticButton>
      </PageHero>
      
      <div className="py-24">
        <EventsSection />
      </div>
      
      <ContactSection />
    </main>
  );
}
