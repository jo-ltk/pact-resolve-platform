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
  Calendar
} from "lucide-react";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { Footer } from "@/components/footer";
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
    color: "from-gold-500/20 to-yellow-500/20"
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
    color: "from-blue-500/20 to-indigo-500/20"
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
    color: "from-amber-500/20 to-orange-500/20"
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
    color: "from-rose-500/20 to-pink-500/20"
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
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

export default function EventsPage() {
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
                  Connect & Engage
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              
              <h1 className="text-[12vw] md:text-8xl font-light tracking-tight mb-8 leading-none italic uppercase">
                <span className="text-gold-500">Events</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto">
                Join our flagship summits, competitions, and unique gatherings designed to foster a vibrant community of mediation stakeholders and professionals across India.
              </p>
            </FadeInUp>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="pb-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <FadeInUp className="mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4 italic uppercase">
                Browse our <span className="text-gold-500">Initiatives</span>
              </h2>
              <div className="h-px w-24 bg-gold-500/30 mb-8" />
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventCategories.map((event, i) => (
                <Link 
                  key={event.id}
                  href={event.href}
                  className={cn(
                    "group relative h-[400px] md:h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-1",
                    i === 0 && "md:col-span-2 lg:col-span-2",
                    i === 1 && "md:col-span-1 lg:col-span-1"
                  )}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className={cn(
                        "object-cover transition-all duration-700 opacity-20 group-hover:opacity-40 group-hover:scale-105",
                        hoveredIndex === i ? "grayscale-0" : "grayscale"
                      )}
                    />
                    <div className={cn("absolute inset-0 bg-linear-to-br transition-opacity duration-500 opacity-0 group-hover:opacity-40", event.color)} />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-navy-950 via-navy-950/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-gold-500 border border-white/10 group-hover:bg-gold-500 group-hover:text-navy-950 group-hover:scale-110 transition-all duration-300">
                          <event.icon className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] group-hover:text-gold-500 transition-colors">{event.subtitle}</span>
                      </div>
                      <span className="text-4xl font-bold text-white/5 italic group-hover:text-white/10 transition-colors select-none">{event.shortTitle}</span>
                    </div>

                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-3xl md:text-5xl font-light text-white mb-4 group-hover:text-gold-500 transition-colors leading-tight uppercase italic">{event.title}</h3>
                      <p className="text-white/60 font-light leading-relaxed max-w-lg line-clamp-3 group-hover:text-white/90 transition-colors">
                        {event.description}
                      </p>
                      
                      <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-500 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Explore Event <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Contact Block */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto rounded-[3rem] bg-white/5 border border-white/10 p-12 md:p-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-20 opacity-5">
                <Calendar className="w-64 h-64 text-white" />
             </div>
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tighter italic">Want to <span className="text-gold-500">Collaborate</span> with us?</h2>
                   <p className="text-xl text-white/50 font-light leading-relaxed">Inquire about speaking opportunities, sponsorships, or hosting a local event with the PACT team.</p>
                </div>
                <div className="flex flex-col items-center lg:items-end gap-6">
                   <a href="mailto:official@thepact.in" className="px-12 py-5 bg-gold-500 text-navy-950 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl shadow-gold-500/20">
                      Email official@thepact.in
                   </a>
                   <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                         <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Events Team</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                         <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Networking</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        <Footer />
      </FadeIn>
    </main>
  );
}
