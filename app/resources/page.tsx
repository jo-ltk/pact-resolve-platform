"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Newspaper, Mic, PenLine, FileText, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { MagneticButton } from "@/components/magnetic-button";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

const resources = [
  {
    id: "01",
    title: "Mediation Simplified",
    subtitle: "Interactive Workbook",
    description: "India's first interactive workbook on Negotiation and Mediation. A practical guide for students, teachers, lawyers, and mediators.",
    href: "/resources/mediation-simplified",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: "02",
    title: "National Mediation Review",
    subtitle: "Journal & Research",
    description: "Contemporary trends and themes on mediation practice and profession in India. Celebrating innovation and research.",
    href: "/resources/national-mediation-review",
    icon: Newspaper,
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    id: "03",
    title: "Mission Mediation Podcast",
    subtitle: "Live Show",
    description: "Real case studies, honest conversations, and expert insights on what actually makes mediation work in India.",
    href: "/resources/podcast",
    icon: Mic,
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80",
    color: "from-rose-500/20 to-pink-500/20"
  },
  {
    id: "04",
    title: "Blog & Library",
    subtitle: "Articles & Resources",
    description: "Thoughtful insights, tutorials, recommended literature, and videos on mediation and collaborative conflict resolution.",
    href: "/resources/blog",
    icon: PenLine,
    image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: "05",
    title: "Clauses & Toolkits",
    subtitle: "Practical Templates",
    description: "Ready-to-use mediation clause templates, billing guides, and preparation toolkits for practitioners.",
    href: "/resources/clauses-toolkits",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80",
    color: "from-purple-500/20 to-violet-500/20"
  }
];

export default function ResourcesPage() {
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
                  Knowledge Hub
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              
              <h1 className="text-[12vw] md:text-7xl font-light tracking-tight mb-8 leading-none">
                <span className="text-gold-500">Resources</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                Access our comprehensive library of mediation guides, research papers, podcasts, and institutional frameworks.
              </p>
            </FadeInUp>
          </div>
        </section>

        {/* Compact Mission Bar */}
        <section className="relative -mt-10 mb-12 z-20 px-6">
          <div className="max-w-7xl mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <Sparkles className="w-64 h-64 text-gold-500" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-light mb-4">
                  Learn, <span className="text-gold-500 font-serif italic">Practice</span>, Resolve
                </h2>
                <p className="text-white/60 font-light leading-relaxed">
                  From interactive workbooks to live podcasts, our resources are designed to help you understand and master mediation at every stage of your journey.
                </p>
              </div>
              <div className="shrink-0 flex gap-4">
                {['Learn', 'Practice', 'Resolve'].map((word, i) => (
                  <div key={i} className="hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest font-bold text-white/40">
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resource Cards Grid */}
        <section className="pb-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((resource, i) => (
                <Link 
                  key={resource.id}
                  href={resource.href}
                  className={cn(
                    "group relative h-[320px] md:h-[380px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-1",
                    // Layout: Row 1 (2+1), Row 2 (1+2), Row 3 (full width)
                    i === 0 ? "md:col-span-2" : "",           // Mediation Simplified - 2 cols
                    i === 1 ? "md:col-span-1" : "",           // National Mediation Review - 1 col
                    i === 2 ? "md:col-span-1" : "",           // Podcast - 1 col
                    i === 3 ? "md:col-span-2" : "",           // Blog & Library - 2 cols
                    i === 4 ? "md:col-span-3" : ""            // Clauses & Toolkits - full width
                  )}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background Image with Reveal Effect */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className={cn(
                        "object-cover transition-all duration-700 opacity-30 group-hover:opacity-50 group-hover:scale-105",
                        hoveredIndex === i ? "grayscale-0" : "grayscale"
                      )}
                    />
                    <div className={cn("absolute inset-0 bg-linear-to-br transition-opacity duration-500 opacity-0 group-hover:opacity-40", resource.color)} />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/60 to-transparent" />
                    <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-gold-500 border border-white/10 group-hover:bg-gold-500 group-hover:text-navy-950 group-hover:scale-110 transition-all duration-300 shadow-lg">
                          <resource.icon className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-xs text-white/60 uppercase tracking-widest group-hover:text-gold-500 transition-colors hidden sm:block">{resource.subtitle}</span>
                      </div>
                      <span className="font-serif text-5xl text-white/5 font-bold group-hover:text-white/10 transition-colors select-none">{resource.id}</span>
                    </div>

                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-3xl md:text-4xl font-light text-white mb-4 group-hover:text-gold-500 transition-colors">{resource.title}</h3>
                      <p className="text-white/60 font-light leading-relaxed max-w-lg line-clamp-3 group-hover:text-white/90 transition-colors">
                        {resource.description}
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
                PACT Resources • Building the Mediation Ecosystem
              </p>
            </div>
          </div>
        </section>
        
        <Footer />
      </FadeIn>
    </main>
  );
}
