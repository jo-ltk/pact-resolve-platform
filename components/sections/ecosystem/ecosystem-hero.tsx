"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Network, ArrowRight } from "lucide-react";
import { FadeInUp } from "@/components/motion-wrapper";

export function EcosystemHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Web Pic 5.png" // Using the timeline image as a subtle background element
          alt="Ecosystem background"
          fill
          className="object-cover opacity-20 scale-110 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy-950/60 via-navy-950/90 to-navy-950" />
        <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
        <FadeInUp>
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="h-px w-8 md:w-12 bg-gold-500" />
            <span className="text-gold-500 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase">
              Global Network
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] mb-8 md:mb-12 italic uppercase">
            ECOSYSTEM
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="space-y-6 md:space-y-8">
              <p className="text-lg sm:text-2xl md:text-3xl text-white/90 font-light leading-tight tracking-tight">
                A collaborative environment connecting ADR professionals, institutions, and enterprises across the globe.
              </p>
              <div className="h-px w-full bg-white/10" />
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#pledge"
                  className="rounded-full bg-gold-500 px-8 py-4 font-sans text-sm font-semibold tracking-wide text-navy-950 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 flex items-center gap-2"
                >
                  The PACT Pledge
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="#collaborations"
                  className="rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 font-sans text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-white/10 flex items-center gap-2"
                >
                  Join the Network
                  <Network className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative p-10 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-md">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center blur-lg" />
                <p className="text-xl text-white/50 font-light italic leading-relaxed">
                  "Building a community that can Network, Inspire, Create, Empower, and Resolve. We are stronger together."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">17,000+ Users Impacted</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
