"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Scale, 
  Handshake, 
  MessageSquare, 
  Users, 
  Mail, 
  Sparkles,
  GraduationCap
} from "lucide-react";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const academyPrograms = [
  {
    id: "01",
    title: "Arbitration",
    subtitle: "Dispute Resolution",
    description: "In-depth courses on the arbitration lifecycle, rules, and advocacy for both domestic and international dispute forums.",
    href: "/academy/arbitration",
    icon: Scale,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: "02",
    title: "Mediation",
    subtitle: "Advocacy & Certification",
    description: "Comprehensive training in mediation advocacy and neutral facilitation, bridging theoretical frameworks with real-world application.",
    href: "/academy/mediation",
    icon: Handshake,
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?auto=format&fit=crop&q=80",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    id: "03",
    title: "Negotiation",
    subtitle: "Strategic Skills",
    description: "Master the psychology and strategy of successful deal-making and conflict resolution in high-stakes environments.",
    href: "/academy/negotiation",
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80",
    color: "from-rose-500/20 to-pink-500/20"
  }
];

export default function AcademyPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-navy-950 text-white">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-navy-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(191,154,102,0.1),transparent_60%)]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            <FadeInUp className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-8 justify-center">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">
                  GAADR
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              
              <h1 className="page-title text-[12vw] md:text-8xl font-light tracking-tight mb-8 leading-none italic">
                <span className="text-gold-500">Academy</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto">
                The Global Academy for Advocacy in Dispute Resolution (GAADR) is PACT's academic wing, dedicated to high quality training and certification programmes. PACT collaborates with the best in the business to curate customised training modules and deliver practical and thought-provoking programmes.
              </p>
            </FadeInUp>
          </div>
        </section>

        {/* Email CTA Block */}
        <section className="relative -mt-10 mb-12 z-20 px-6">
          <div className="max-w-7xl mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <Sparkles className="w-64 h-64 text-gold-500" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-light mb-4 text-white">
                  Got a <span className="text-gold-500 font-serif italic">query?</span>
                </h2>
                <a href="mailto:academy@thepact.in" className="flex items-center gap-3 text-gold-500 hover:text-gold-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-lg md:text-xl font-medium underline decoration-gold-500/30">academy@thepact.in</span>
                </a>
              </div>
              <div className="shrink-0 flex gap-4">
                <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex flex-col items-center justify-center text-xs uppercase tracking-widest font-bold text-white/40">
                  <GraduationCap className="w-8 h-8 mb-2 text-gold-500/50" />
                  GAADR
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="pb-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <FadeInUp className="mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Explore Our <span className="text-gold-500 italic">Programs</span>
              </h2>
              <p className="text-white/50 max-w-2xl">
                Choose from our specialized training tracks designed to develop expertise in key areas of dispute resolution.
              </p>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {academyPrograms.map((program, i) => (
                <Link 
                  key={program.id}
                  href={program.href}
                  className={cn(
                    "group relative h-[380px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-1"
                  )}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background Image with Reveal Effect */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className={cn(
                        "object-cover transition-all duration-700 opacity-30 group-hover:opacity-50 group-hover:scale-105",
                        hoveredIndex === i ? "grayscale-0" : "grayscale"
                      )}
                    />
                    <div className={cn("absolute inset-0 bg-linear-to-br transition-opacity duration-500 opacity-0 group-hover:opacity-40", program.color)} />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/60 to-transparent" />
                    <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-gold-500 border border-white/10 group-hover:bg-gold-500 group-hover:text-navy-950 group-hover:scale-110 transition-all duration-300 shadow-lg">
                          <program.icon className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-xs text-white/60 uppercase tracking-widest group-hover:text-gold-500 transition-colors hidden sm:block">{program.subtitle}</span>
                      </div>
                      <span className="font-serif text-5xl text-white/5 font-bold group-hover:text-white/10 transition-colors select-none">{program.id}</span>
                    </div>

                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-3xl md:text-5xl font-light text-white mb-4 group-hover:text-gold-500 transition-colors uppercase italic">{program.title}</h3>
                      <p className="text-white/60 font-light leading-relaxed max-w-lg line-clamp-3 group-hover:text-white/90 transition-colors">
                        {program.description}
                      </p>
                      
                      <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-500 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        View Program <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-white/30 text-sm font-light uppercase tracking-widest">
                GAADR • Global Academy for Advocacy in Dispute Resolution
              </p>
            </div>
          </div>
        </section>
        
        <Footer />
      </FadeIn>
    </main>
  );
}
