"use client";

import Image from "next/image";
import { History } from "lucide-react";
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

export function AboutPact() {
  return (
    <section className="relative py-16 md:py-24 bg-navy-950 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <FadeInUp className="text-center mb-16 md:mb-20 space-y-6">
          <div className="inline-flex items-center gap-4 opacity-40">
            <span className="text-xs font-mono tracking-[0.4em] uppercase text-white">Chapter One</span>
            <div className="h-px w-8 md:w-12 bg-white/30" />
            <span className="text-xs font-mono tracking-[0.4em] uppercase text-white">The Legacy</span>
          </div>
          
          <h2 className="text-4xl md:text-7xl font-light tracking-tight text-white leading-[1.1]">
            About <span className="text-gold-500 font-medium">PACT</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed font-light">
            Founded on the principles of excellence and innovation, PACT has transformed the landscape of mediation. 
            Our journey is a testament to the power of collaborative conflict resolution.
          </p>
        </FadeInUp>

        {/* Stats Section */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-24 pb-12 border-b border-white/5">
          <StaggerItem className="text-center space-y-2 group">
            <span className="block text-3xl md:text-5xl font-light text-white group-hover:text-gold-500 transition-colors duration-300">2500+</span>
            <span className="text-[9px] md:text-xs font-mono uppercase tracking-widest text-white/40">Cases Resolved</span>
          </StaggerItem>
          <StaggerItem className="text-center space-y-2 group">
            <span className="block text-3xl md:text-5xl font-light text-white group-hover:text-gold-500 transition-colors duration-300">98%</span>
            <span className="text-[9px] md:text-xs font-mono uppercase tracking-widest text-white/40">Success Rate</span>
          </StaggerItem>
          <StaggerItem className="text-center space-y-2 group">
            <span className="block text-3xl md:text-5xl font-light text-white group-hover:text-gold-500 transition-colors duration-300">15+</span>
            <span className="text-[9px] md:text-xs font-mono uppercase tracking-widest text-white/40">Global Chapters</span>
          </StaggerItem>
          <StaggerItem className="text-center space-y-2 group">
            <span className="block text-3xl md:text-5xl font-light text-white group-hover:text-gold-500 transition-colors duration-300">5000+</span>
            <span className="text-[9px] md:text-xs font-mono uppercase tracking-widest text-white/40">Trained Neutrals</span>
          </StaggerItem>
        </StaggerContainer>

        {/* The Massive Journey Display */}
        <FadeIn className="relative group -mx-6 md:mx-0" delay={0.2}>
          <div className="absolute -inset-1 bg-linear-to-r from-gold-500/20 via-blue-500/20 to-gold-500/20 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500 hidden md:block"></div>
          <div className="relative bg-black rounded-none md:rounded-2xl overflow-hidden shadow-2xl border-y md:border border-white/10">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
            <Image
              src="/images/pact-journey.png"
              alt="Journey with The PACT - Timeline from 2015 to 2026"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover transform transition duration-700 md:group-hover:scale-[1.01]"
              priority
            />
          </div>
          
          {/* Subtle Float Label */}
          <div className="absolute -top-4 -right-4 bg-navy-950 border border-white/10 px-6 py-3 rounded-full shadow-xl hidden md:block">
            <div className="flex items-center gap-3">
              <History className="w-4 h-4 text-gold-500" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/80">Interactive Timeline 2015 - 2026</span>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
