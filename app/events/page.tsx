"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Trophy, 
  Users, 
  Award, 
  Shield, 
  Globe,
  Star,
  Zap,
  Calendar,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { Footer } from "@/components/footer";
import { MagneticButton } from "@/components/magnetic-button";
import { cn } from "@/lib/utils";

const eventCategories = [
  {
    id: "01",
    title: "Mediation Champions League",
    shortTitle: "MCI",
    subtitle: "Competition & Mentoring",
    description: "India's premier mediation event convening top next-gen talent to compete and collaborate on the biggest stage.",
    href: "/events/mci",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80",
    color: "from-gold-500/30 to-yellow-500/10"
  },
  {
    id: "02",
    title: "Mission Mediation Conclave",
    shortTitle: "MMC",
    subtitle: "Stakeholder Gathering",
    description: "Unique gathering featuring real case studies, practical insights and evidence-driven conversations on mediation practice.",
    href: "/events/mmc",
    icon: Users,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
    color: "from-blue-500/30 to-indigo-500/10"
  },
  {
    id: "03",
    title: "National ImPACT Awards",
    shortTitle: "NIAAM",
    subtitle: "Honouring Excellence",
    description: "Recognizing individuals who have meaningfully strengthened the growth of mediation in India through leadership.",
    href: "/events/niaam",
    icon: Award,
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?auto=format&fit=crop&q=80",
    color: "from-amber-500/30 to-orange-500/10"
  },
  {
    id: "04",
    title: "Advocate Maximus",
    shortTitle: "AM",
    subtitle: "The Premier Moot",
    description: "India's first Arb-Med competition and conference, setting the standard for hybrid dispute resolution advocacy.",
    href: "/events/advocate-maximus",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
    color: "from-rose-500/30 to-pink-500/10"
  },
  {
    id: "05",
    title: "Events & Projects",
    shortTitle: "Projects",
    subtitle: "Global Outreach",
    description: "Workshops, seminars, and collaborative initiatives designed to mainstream mediation across legal and business ecosystems.",
    href: "/events/projects",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80",
    color: "from-emerald-500/30 to-teal-500/10"
  }
];

export default function EventsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-navy-950 text-white">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-16 md:pt-40 md:pb-24 bg-navy-950 overflow-hidden dark">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(191,154,102,0.15),transparent_70%)]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          <FadeInUp className="text-center max-w-5xl mx-auto space-y-12">
            <div className="inline-flex items-center gap-4 justify-center">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-500 font-mono text-xs tracking-[0.5em] uppercase font-bold">
                Connect & Engage
              </span>
              <div className="h-px w-12 bg-gold-500" />
            </div>
            
            <h1 className="text-[14vw] md:text-[8rem] font-bold text-white tracking-tighter leading-[0.8] select-none uppercase italic">
              PACT <br />
              <span className="text-gold-500 font-extrabold lg:text-[10rem]">EVENTS</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/95 font-light leading-snug max-w-4xl mx-auto tracking-tight">
              Join our flagship summits, competitions, and unique gatherings designed to foster <span className="text-gold-500 italic font-medium">excellence in mediation.</span>
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-16 md:py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <FadeInUp className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 opacity-80">
                <div className="h-px w-10 bg-gold-500" />
                <span className="text-xs font-mono text-gold-500 uppercase tracking-widest font-bold">Initiatives</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-none italic uppercase">
                Browse our <br />
                <span className="text-gold-500 font-medium">Ecosystem</span>
              </h2>
            </div>
            <p className="max-w-md text-lg text-white/50 font-light leading-relaxed">
              From competitive leagues to boardroom conclaves, explore the diverse spectrum of PACT's engagement platforms.
            </p>
          </FadeInUp>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {eventCategories.map((event, i) => (
              <StaggerItem 
                key={event.id}
                className={cn(
                  "relative h-[450px] md:h-[550px]",
                  i === 0 ? "md:col-span-12 lg:col-span-8" : 
                  i === 1 ? "md:col-span-12 lg:col-span-4" :
                  i === 2 ? "md:col-span-6 lg:col-span-4" :
                  i === 3 ? "md:col-span-6 lg:col-span-4" :
                  "md:col-span-12 lg:col-span-4"
                )}
              >
                <Link 
                  href={event.href}
                  className="group relative block w-full h-full rounded-[3.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 hover:border-gold-500/40 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background Layer */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className={cn(
                        "object-cover transition-all duration-1000 opacity-20 filter grayscale group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-110",
                        hoveredIndex === i && "grayscale-0 opacity-40"
                      )}
                    />
                    <div className={cn("absolute inset-0 bg-linear-to-br transition-opacity duration-700 opacity-0 group-hover:opacity-60", event.color)} />
                    <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-navy-950 via-navy-950/60 to-transparent" />
                  </div>

                  {/* UI Elements */}
                  <div className="relative z-10 h-full p-10 md:p-14 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl flex items-center justify-center text-gold-500 border border-white/10 group-hover:bg-gold-500 group-hover:text-navy-950 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                          <event.icon className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-xs text-white/40 uppercase tracking-[0.4em] font-bold group-hover:text-gold-500 transition-colors">{event.subtitle}</span>
                          <div className="h-px w-8 bg-gold-500/30 group-hover:w-full transition-all duration-500" />
                        </div>
                      </div>
                      <span className="text-6xl font-black text-white/5 italic group-hover:text-white/10 transition-colors select-none tracking-tighter">{event.shortTitle}</span>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter group-hover:text-gold-500 transition-colors uppercase italic transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-700">
                        {event.title}
                      </h3>
                      <p className="text-lg text-white/50 font-light leading-relaxed max-w-xl group-hover:text-white/80 transition-colors duration-500">
                        {event.description}
                      </p>
                      
                      <div className="pt-6">
                        <div className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.4em] text-gold-500 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                          Explore Platform <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto rounded-[4rem] bg-white/5 border border-white/10 p-12 md:p-24 relative overflow-hidden group/cta">
           {/* Background Graphic */}
           <div className="absolute top-0 right-0 p-24 opacity-5 group-hover/cta:opacity-10 transition-opacity duration-1000 rotate-12">
              <Calendar className="w-80 h-80 text-white" />
           </div>
           <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gold-500/5 blur-[100px] rounded-full pointer-events-none" />
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="space-y-8 text-center lg:text-left">
                 <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-none italic uppercase">
                    Want to <br className="hidden md:block" />
                    <span className="text-gold-500 font-medium">Collaborate?</span>
                 </h2>
                 <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-2xl">
                    Inquire about speaking opportunities, strategic sponsorships, or hosting a custom local event with the PACT team.
                 </p>
              </div>
              
              <div className="flex flex-col items-center lg:items-end gap-10">
                 <MagneticButton variant="primary" size="lg" className="px-14 py-6 shadow-2xl shadow-gold-500/20 group">
                    <a href="mailto:official@thepact.in" className="flex items-center gap-4 text-xl">
                       Connect with Us <ExternalLink className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </a>
                 </MagneticButton>
                 
                 <div className="flex flex-wrap justify-center lg:justify-end gap-8">
                    {[
                      { label: "Speaking", value: "Flagship Summits" },
                      { label: "Sponsorship", value: "Custom Packages" },
                      { label: "Hosting", value: "Local Chapters" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center lg:items-end">
                         <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/30 font-bold mb-1">{item.label}</span>
                         <span className="text-sm font-bold text-gold-500/60 uppercase tracking-widest">{item.value}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
