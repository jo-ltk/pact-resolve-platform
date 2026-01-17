"use client";

import { TeamSection } from "@/components/sections/ecosystem/team";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn } from "@/components/motion-wrapper";

export default function TeamPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      <FadeIn className="relative z-10 w-full">

        <TeamSection />
        <Footer />
      </FadeIn>
    </main>
  );
}
