"use client";

import { Shader, ChromaFlow, Swirl } from "shaders/react";
import { GrainOverlay } from "@/components/grain-overlay";
import { ContactSection } from "@/components/sections/contact-section";
import { MagneticButton } from "@/components/magnetic-button";
import { useRef, useEffect, useState } from "react";
import { MousePointer2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const shaderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas");
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true);
          return true;
        }
      }
      return false;
    };

    if (checkShaderReady()) return;

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId);
      }
    }, 100);

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <div
        className={`relative z-10 w-full transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero Section - Balanced 50/50 Layout */}
        <section
          id="hero"
          className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40"
        >
          <div
            ref={shaderContainerRef}
            className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
            style={{ contain: "strict" }}
          >
            <Shader className="h-full w-full">
              <Swirl
                colorA="#1e3a5f"
                colorB="#d4a574"
                speed={0.8}
                detail={0.8}
                blend={50}
                coarseX={40} coarseY={40}
                mediumX={40} mediumY={40}
                fineX={40} fineY={40}
              />
              <ChromaFlow
                baseColor="#1e3a5f"
                upColor="#1e3a5f"
                downColor="#e8e8e8"
                leftColor="#d4a574"
                rightColor="#d4a574"
                intensity={0.9}
                radius={1.8}
                momentum={25}
                maskType="alpha"
                opacity={0.97}
              />
            </Shader>
            <div className="absolute inset-0 bg-white/10" />
            <GrainOverlay />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: Content */}
            <div className="flex flex-col items-start">
              <div className="mb-6 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 backdrop-blur-md duration-700">
                <p className="font-mono text-xs text-foreground/90 [text-shadow:0_1px_2px_rgba(255,255,255,0.15)]">
                  Confidential • Neutral • Professional
                </p>
              </div>
              <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl">
                <span className="transition-all duration-1000">
                  Global Excellence<br />in Conflict Resolution.
                </span>
              </h1>
              <p className="mb-8 max-w-lg animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/80 duration-1000 delay-200">
                <span className="text-pretty">
                  Professional mediation services and accredited training for a global network of dispute resolution specialists.
                </span>
              </p>
              
              <div className="mb-10 flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-3 duration-1000 delay-300">
                <div className="flex items-center gap-2 text-sm text-foreground/60 font-mono">
                  <div className="h-1 w-1 rounded-full bg-primary" />
                  <span>Institutional Trust</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60 font-mono">
                  <div className="h-1 w-1 rounded-full bg-primary" />
                  <span>Global Reach</span>
                </div>
              </div>

              <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
                <Link href="/mediation">
                  <MagneticButton
                    size="lg"
                    variant="primary"
                    enableMotion={true}
                    className="flex items-center gap-2"
                  >
                    Explore Mediation
                    <MousePointer2 className="h-4 w-4" />
                  </MagneticButton>
                </Link>
                <Link href="/academy">
                  <MagneticButton
                    size="lg"
                    variant="secondary"
                    enableMotion={true}
                  >
                    Join Academy
                  </MagneticButton>
                </Link>
              </div>
            </div>

            {/* Right: Single Hero Visual */}
            <div className="relative hidden w-full lg:block">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                <Image
                  src="/hero/mediation.png"
                  alt="Professional Mediation Meeting"
                  fill
                  className="object-cover opacity-95 transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Mediation Preview */}
        <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-6">
                <h2 className="text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">Mediation</h2>
                <p className="font-mono text-sm text-foreground/60 md:text-base">/ Core dispute resolution services</p>
              </div>
              <Link href="/mediation">
                <MagneticButton variant="secondary" className="group flex items-center gap-2 whitespace-nowrap">
                  View Full Framework <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-light text-foreground">Strategic Efficiency</h3>
                <p className="text-foreground/70 leading-relaxed text-lg">
                  Accelerate dispute resolution by bypassing lengthy judicial queues, typically reaching sustainable settlements in less than 30% of the time required for traditional litigation.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-light text-foreground">Strict Confidentiality</h3>
                <p className="text-foreground/70 leading-relaxed text-lg">
                  Ensure complete privacy for sensitive commercial interests and personal matters, protected by robust legal frameworks and professional ethical standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Academy Preview */}
        <section className="py-24 px-6 md:px-12 lg:px-16 bg-foreground/[0.02] border-y border-foreground/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-6">
                <h2 className="text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">Academy</h2>
                <p className="font-mono text-sm text-foreground/60 md:text-base">/ Professional training & certification</p>
              </div>
              <Link href="/academy">
                <MagneticButton variant="secondary" className="group flex items-center gap-2 whitespace-nowrap">
                  Explore Courses <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Global Accredited Training",
                "Advanced Advocacy",
                "Negotiation & Diplomacy"
              ].map((title, i) => (
                <div key={i} className="pt-6 border-t border-foreground/10">
                  <span className="font-mono text-xs text-foreground/40 block mb-4">0{i + 1}</span>
                  <h3 className="text-xl font-medium text-foreground">{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources & Events Preview */}
        <section className="py-24 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24">
            <div>
              <div className="mb-12 flex flex-col md:flex-row md:items-baseline gap-4">
                <h2 className="text-4xl font-light tracking-tight text-foreground">Resources</h2>
                <p className="font-mono text-xs text-foreground/60">/ Knowledge base & research</p>
              </div>
              <p className="text-foreground/70 mb-8 max-w-md">
                Access our comprehensive library of mediation guides, research papers, and institutional frameworks.
              </p>
              <Link href="/resources">
                <MagneticButton variant="secondary" className="group flex items-center gap-2 whitespace-nowrap">
                  Access Library <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </Link>
            </div>
            <div>
              <div className="mb-12 flex flex-col md:flex-row md:items-baseline gap-4">
                <h2 className="text-4xl font-light tracking-tight text-foreground">Events</h2>
                <p className="font-mono text-xs text-foreground/60">/ Global summits & networking</p>
              </div>
              <p className="text-foreground/70 mb-8 max-w-md">
                Join international summits, webinars, and networking events for global mediation professionals.
              </p>
              <Link href="/events">
                <MagneticButton variant="secondary" className="group flex items-center gap-2 whitespace-nowrap">
                  View Events <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Ecosystem Preview */}
        <section className="py-32 px-6 md:px-12 lg:px-16 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl mb-6">
                Ecosystem
              </h2>
              <p className="text-foreground/70 text-xl font-light leading-relaxed">
                A collaborative environment connecting ADR professionals, institutions, and enterprises across the globe. Join the network that is defining the future of neutral facilitation.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/ecosystem">
                <MagneticButton variant="secondary" size="lg" className="group flex items-center gap-2 whitespace-nowrap">
                  Join the Network 
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </Link>
            </div>
          </div>
        </section>

        <div id="contact">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
