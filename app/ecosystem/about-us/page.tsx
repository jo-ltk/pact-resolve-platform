"use client";

import { AboutUs } from "@/components/sections/ecosystem/about-us";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn } from "@/components/motion-wrapper";

export default function AboutUsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      <FadeIn className="relative z-10 w-full">

        <AboutUs />
        <Footer />
      </FadeIn>
    </main>
  );
}
