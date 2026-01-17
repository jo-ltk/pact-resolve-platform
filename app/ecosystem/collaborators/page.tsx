"use client";

import { Collaborations } from "@/components/sections/ecosystem/collaborations";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn } from "@/components/motion-wrapper";

export default function CollaboratorsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      <FadeIn className="relative z-10 w-full">

        <Collaborations />
        <Footer />
      </FadeIn>
    </main>
  );
}
