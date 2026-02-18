"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Network, ArrowRight } from "lucide-react";
import { FadeInUp } from "@/components/motion-wrapper";

export function EcosystemHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ecosystem-bg.png"
          alt="Ecosystem background"
          fill
          className="object-cover opacity-30 scale-105"
          priority
        />
        {/* Advanced Gradient Overlays */}
        <div className="absolute inset-0 bg-navy-950/60 z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-transparent to-transparent z-10" />
        
        {/* Ambient Glows for depth */}
        <div className="hidden md:block absolute top-1/4 -right-20 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full z-0" />
        <div className="hidden md:block absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-navy-900/20 blur-[100px] rounded-full z-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
        <FadeInUp>
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="h-px w-8 md:w-12 bg-gold-500" />
            <span className="text-gold-500 font-mono text-xs md:text-xs tracking-[0.4em] uppercase">
              Global Network
            </span>
          </div>
          
          <h1 className="text-[14vw] sm:text-7xl lg:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] mb-8 md:mb-12 italic uppercase">
            ECOSYSTEM
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="space-y-6 md:space-y-8">
              <p className="text-lg sm:text-2xl md:text-3xl text-white/90 font-light leading-tight tracking-tight">
                A collaborative environment connecting ADR professionals, institutions, and enterprises across the globe.
              </p>
              <div className="h-px w-full bg-white/10" />
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/ecosystem/pledge"
                  className="w-full sm:w-auto justify-center rounded-full bg-gold-500 px-8 py-4 font-sans text-sm font-semibold tracking-wide text-navy-950 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 flex items-center gap-2"
                >
                  The PACT Pledge
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/ecosystem/collaborators"
                  className="w-full sm:w-auto justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 font-sans text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-white/10 flex items-center gap-2"
                >
                  Join the Network
                  <Network className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative p-10 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-md">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center blur-lg" />
                <p className="text-xl text-white/50 font-light leading-relaxed">
                  "Building a community that can Network, Inspire, Create, Empower, and Resolve. We are stronger together."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                  </div>
                  <span className="text-xs font-mono text-white/40 uppercase tracking-widest font-bold">17,000+ Users Impacted</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
