"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Handshake, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { EcosystemHero } from "@/components/sections/ecosystem/ecosystem-hero";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

const features = [
  {
    id: "01",
    title: "About Us",
    subtitle: "Who We Are",
    description: "The PACT is a leading mediation institute committed to transforming conflicts into opportunities for dialogue.",
    href: "/ecosystem/about-us",
    icon: Users,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    id: "02",
    title: "The Team",
    subtitle: "Our People",
    description: "A cohesive, fearless cohort of mediators and mentors dedicated to serving the profession.",
    href: "/ecosystem/team",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: "03",
    title: "Collaborations",
    subtitle: "Network",
    description: "Building bridges with global institutions and local leaders to foster a culture of mediation.",
    href: "/ecosystem/collaborators",
    icon: Handshake,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: "04",
    title: "The Pledge",
    subtitle: "Commitment",
    description: "Join the movement towards ethical, efficient, and collaborative dispute resolution.",
    href: "/ecosystem/pledge",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80",
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

export default function EcosystemPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-navy-950 text-white">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
        <EcosystemHero />
        
        {/* Compact 'Mission' Bar */}
        <section className="relative -mt-10 mb-12 z-20 px-6">
            <div className="max-w-7xl mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Sparkles className="w-64 h-64 text-gold-500" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-light mb-4">
                            The <span className="text-gold-500 font-serif italic">NICER</span> Framework
                        </h2>
                        <p className="text-white/60 font-light leading-relaxed">
                             Our ecosystem is built on five pillars: 
                             <span className="text-white font-medium ml-1">Network, Inspire, Create, Empower, and Resolve.</span>
                             <br className="hidden md:block" />
                             We align institutions and individuals towards sustainable peace.
                        </p>
                    </div>
                    <div className="shrink-0 flex gap-4">
                        {['Network', 'Inspire', 'Create'].map((word, i) => (
                             <div key={i} className="hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest font-bold text-white/40">
                                 {word}
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Dense Interactive Grid */}
        <section className="pb-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <Link 
                  key={feature.id}
                  href={feature.href}
                  className={cn(
                    "group relative h-[320px] md:h-[380px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-1",
                    i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"
                  )}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                    {/* Background Image with Reveal Effect */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className={cn(
                                "object-cover transition-all duration-700 opacity-30 group-hover:opacity-50 group-hover:scale-105",
                                hoveredIndex === i ? "grayscale-0" : "grayscale"
                            )}
                        />
                        <div className={cn("absolute inset-0 bg-linear-to-br transition-opacity duration-500 opacity-0 group-hover:opacity-40", feature.color)} />
                        <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/60 to-transparent" />
                        <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-gold-500 border border-white/10 group-hover:bg-gold-500 group-hover:text-navy-950 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <span className="font-mono text-xs text-white/60 uppercase tracking-widest group-hover:text-gold-500 transition-colors hidden sm:block">{feature.subtitle}</span>
                            </div>
                            <span className="font-serif text-5xl text-white/5 font-bold group-hover:text-white/10 transition-colors select-none">{feature.id}</span>
                        </div>

                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                            <h3 className="text-3xl md:text-4xl font-light text-white mb-4 group-hover:text-gold-500 transition-colors">{feature.title}</h3>
                            <p className="text-white/60 font-light leading-relaxed max-w-lg line-clamp-3 group-hover:text-white/90 transition-colors">
                                {feature.description}
                            </p>
                            
                            <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-500 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                Explore Section <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 text-center">
                 <p className="text-white/30 text-sm font-light uppercase tracking-widest">
                    The PACT Ecosystem • Established 2015
                 </p>
            </div>
          </div>
        </section>
        
        <Footer />
      </FadeIn>
    </main>
  );
}
