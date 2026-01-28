"use client";

import React from "react";
import Image from "next/image";
import { 
  ArrowUpRight, 
  ExternalLink, 
  Mail, 
  BookOpen, 
  Users, 
  Building2, 
  Globe, 
  Zap, 
  Calendar,
  Search,
  History,
  MapPin,
  PlayCircle,
  Scale,
  Maximize2,
  X,
  ChevronRight,
  Target,
  FlaskConical,
  Award
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { Footer } from "@/components/footer";
import { MagneticButton } from "@/components/magnetic-button";
import { Collaborators } from "@/components/sections/home/collaborators";
import { cn } from "@/lib/utils";

const SectionHeader = ({ subtitle, title, description, light = false, center = false }: { subtitle: string, title: string, description?: string, light?: boolean, center?: boolean }) => (
  <FadeInUp className={cn("mb-12 md:mb-20", center ? "flex flex-col items-center text-center" : "")}>
    <div className="inline-flex items-center gap-4 mb-6 opacity-80">
      <div className={cn("h-px w-12 bg-gold-500", light ? "bg-gold-500" : "bg-gold-500/50")} />
      <span className={cn("text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase font-bold", light ? "text-gold-500" : "text-navy-950/60")}>{subtitle}</span>
    </div>
    <h2 className={cn("text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-light tracking-tight mb-8 leading-[0.95]", light ? "text-white" : "text-navy-950")}>
      {title.split(' ').map((word, i) => (
        <span key={i} className={cn(
          word.toLowerCase() === 'projects' || 
          word.toLowerCase() === 'events' || 
          word.toLowerCase() === 'engagement' || 
          word.toLowerCase() === 'mission' ? "text-gold-500 italic font-medium" : ""
        )}>
          {word}{' '}
        </span>
      ))}
    </h2>
    {description && (
      <p className={cn("max-w-4xl text-lg sm:text-xl md:text-2xl font-light leading-relaxed", light ? "text-white/70" : "text-navy-950/50")}>
        {description}
      </p>
    )}
  </FadeInUp>
);

const archives = [
  {
    title: "BITS Law School | Panel on Mediation & Arbitration in International Commercial Conflicts",
    location: "Mumbai, 2025",
    description: "Exploring how mixed-mode dispute resolution is shaping cross-border business disputes and India’s evolving position in that space.",
    link: "https://www.youtube.com/watch?v=nQLB_E2Z3hg",
    category: "Webinar"
  },
  {
    title: "Saveetha School of Law - Three-Day Workshop on Mediation",
    location: "Chennai, 2024",
    description: "Intensive skills workshop introducing core mediation principles, empathic listening, and the IMPACT model.",
    link: "https://saveethalaw.com/news/three-day-workshop-on-mediation",
    category: "Workshop"
  },
  {
    title: "SRM University Delhi-NCR (Haryana) - Mediation & Negotiation Workshop",
    location: "Sonepat, 2023",
    description: "Two-day workshop for final-year students on mediator qualities and practical negotiation strategy.",
    link: "https://srmuniversity.ac.in/event/workshop-on-mediation-and-negotiation",
    category: "Workshop"
  },
  {
    title: "Manav Rachna University – Mediation Bootcamp",
    location: "Faridabad, 2023",
    description: "A intensive Bootcamp organised by MRU’s Centre of Excellence on ADR with Jonathan Rodrigues as trainer.",
    link: "https://manavrachna.edu.in/assets/campus/mru/pdf/sol-newsletter-4.pdf",
    category: "Bootcamp"
  },
  {
    title: "LedX × The PACT – Mediation & Conflict Bootcamp",
    location: "Indore, 2022",
    description: "Indore based bootcamp teaching foundational mediation concepts and client-counselling techniques.",
    link: "https://classroom.ledx.law/bootcamp-on-mediation-client-counselling/",
    category: "Bootcamp"
  },
  {
    title: "Lawctopus × The PACT – Online ADR Bootcamp",
    location: "Online, 2020",
    description: "Online intensive training students and young professionals on negotiation strategy and mediation process.",
    link: "https://www.lawctopus.com/adrbootcamp/",
    category: "Online Bootcamp"
  }
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white text-navy-950">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-40 md:pb-32 bg-navy-950 overflow-hidden dark">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80"
            alt="Events & Projects Hero"
            fill
            className="object-cover opacity-20 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-navy-950/40 via-navy-950/90 to-navy-950" />
          <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-transparent to-transparent opacity-80" />
          
          {/* Subtle Accent Glows */}
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          <FadeInUp>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">
                #MissionMediation
              </span>
            </div>
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[8.5rem] font-extrabold text-white tracking-tighter leading-[0.8] mb-16 select-none italic uppercase">
              EVENTS & <br />
              <span className="text-gold-500">PROJECTS</span> 
            </h1>
            
            <div className="max-w-5xl space-y-12">
              <div className="space-y-8">
                <p className="text-2xl sm:text-3xl md:text-5xl text-white/95 font-light leading-[1.1] tracking-tight">
                  All initiatives curated, co-hosted, or supported by PACT sitting under our broader mission.
                </p>
                <p className="text-xl md:text-2xl text-white/70 font-light max-w-3xl leading-relaxed">
                  We seek to mainstream mediation, build professional capacity, and empower individuals with collaborative dispute resolution skills.
                </p>

                <div className="flex flex-wrap gap-6 pt-12">
                  <MagneticButton variant="primary" size="lg" className="group px-10 py-5">
                    <a href="mailto:official@thepact.in" className="flex items-center gap-3 text-lg">
                       Inquire for Collaboration <Mail className="w-5 h-5" />
                    </a>
                  </MagneticButton>
                  <MagneticButton variant="secondary" size="lg" className="group px-10 py-5">
                    <a href="#archives" className="flex items-center gap-3 text-lg text-white">
                       View Archive <History className="w-5 h-5" />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Engagement Grid Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <SectionHeader 
            subtitle="Get Involved" 
            title="Partner with our Mission" 
            center
            description="Diverse engagement platforms designed to foster mediation across legal and business ecosystems."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, text: "Lectures & Seminars at Universities", sub: "Academic Outreach", color: "text-blue-600 bg-blue-50" },
              { icon: Globe, text: "Workshop & Webinars on Campus", sub: "Digital Learning", color: "text-emerald-600 bg-emerald-50" },
              { icon: Building2, text: "Office Offsites & Retreats", sub: "Corporate Culture", color: "text-amber-600 bg-amber-50" },
              { icon: Users, text: "Reflective Practice with Leadership", sub: "Governance", color: "text-purple-600 bg-purple-50" },
              { icon: Zap, text: "Design, Host and Sponsor Conferences", sub: "Strategic Events", color: "text-rose-600 bg-rose-50" },
              { icon: Scale, text: "Support and Co-Host a Competition", sub: "Next-Gen Talent", color: "text-indigo-600 bg-indigo-50" }
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="group relative h-full p-10 rounded-[2.5rem] bg-navy-50/50 border border-transparent hover:border-gold-500/30 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden text-center flex flex-col items-center">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-navy-100/10", item.color)}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-navy-950 tracking-tight leading-tight group-hover:text-gold-500 transition-colors uppercase italic">{item.text}</h4>
                    <p className="text-[10px] font-mono text-navy-950/30 uppercase tracking-[0.3em] font-bold">{item.sub}</p>
                  </div>
                  <div className="mt-8">
                     <a href="mailto:official@thepact.in" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-navy-300 group-hover:text-gold-600 transition-colors">
                        Invite PACT <ArrowUpRight className="w-3 h-3" />
                     </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Watch Out For Section */}
      <section className="py-16 md:py-24 bg-navy-950 relative overflow-hidden dark">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
            alt="Upcoming"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <SectionHeader subtitle="Upcoming" title="Watch Out For" light center />
           
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Workshop on Mediation", 
                  date: "March 2026", 
                  location: "SRM Law School, Haryana",
                  icon: FlaskConical 
                },
                { 
                  title: "ODRC Negotiation Contest", 
                  date: "June 2026", 
                  location: "Online Event",
                  icon: Target 
                },
                { 
                  title: "Lecture on Mediation", 
                  date: "April 2026", 
                  location: "IIULER Law School, Goa",
                  icon: Award 
                }
              ].map((item, i) => (
                <FadeInUp key={i} className="p-10 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 relative group overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Calendar className="w-24 h-24 text-white" />
                   </div>
                   <div className="relative z-10 flex flex-col h-full">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-gold-500 border border-white/10 mb-8">
                         <item.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-gold-500 font-bold block mb-4">{item.date}</span>
                      <h3 className="text-3xl font-bold text-white mb-8 leading-tight italic tracking-tighter uppercase group-hover:text-gold-500 transition-colors">{item.title}</h3>
                      <div className="mt-auto flex items-center gap-3 text-white/40 group-hover:text-white transition-colors">
                         <MapPin className="w-4 h-4 text-gold-500" />
                         <span className="text-xs font-bold tracking-widest uppercase">{item.location}</span>
                      </div>
                   </div>
                </FadeInUp>
              ))}
          </div>
        </div>
      </section>

      {/* Archives Section */}
      <section id="archives" className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <SectionHeader subtitle="Legacy" title="Our Footprint" center />
           
           <div className="space-y-4 max-w-5xl mx-auto">
              {archives.map((item, i) => (
                 <FadeInUp key={i} className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center p-6 md:p-10 rounded-4xl bg-navy-50/50 border border-transparent hover:border-gold-500/30 hover:bg-white hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 overflow-hidden">
                    <div className="md:col-span-1 flex flex-col items-center">
                       <History className="w-8 h-8 text-navy-950/10 group-hover:text-gold-500/30 transition-colors" />
                    </div>
                    <div className="md:col-span-7">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-mono text-gold-600 uppercase tracking-widest font-bold mb-1 opacity-100 transition-opacity">{item.category} • {item.location}</span>
                          <h3 className="text-xl md:text-2xl font-light text-navy-950 group-hover:text-gold-500 transition-colors uppercase tracking-tight italic leading-tight">{item.title}</h3>
                       </div>
                    </div>
                    <div className="md:col-span-3">
                       <p className="text-xs text-navy-950/50 font-light leading-relaxed group-hover:text-navy-950 transition-colors line-clamp-2">{item.description}</p>
                    </div>
                    <div className="md:col-span-1 text-right">
                       <a href={item.link} target="_blank" className="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center text-navy-950 hover:bg-gold-500 hover:text-navy-950 transition-all duration-300 ml-auto group-hover:scale-110">
                          <ExternalLink className="w-5 h-5" />
                       </a>
                    </div>
                 </FadeInUp>
              ))}
           </div>
        </div>
      </section>

      {/* Ceremonial Gallery - verified images */}
      <section className="py-16 md:py-24 bg-white border-t border-navy-100/50">
        <div className="max-w-7xl mx-auto mb-16 px-6 md:px-12 lg:px-24">
          <SectionHeader subtitle="Moments" title="Ceremonial Gallery" center />
        </div>
        
        <div className="w-full">
          <Carousel
            opts={{ align: "center", loop: true }}
            plugins={[Autoplay({ delay: 4000 })]}
            className="w-full relative group/carousel"
          >
            <CarouselContent className="-ml-4 md:ml-0">
                {[
                  "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1475721027187-4024733923f9?auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
                ].map((url, i) => (
                  <CarouselItem key={i} className="pl-4 md:pl-0 basis-[90%] md:basis-[70%] lg:basis-[60%] px-2 md:px-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full text-left group/image relative outline-hidden cursor-pointer">
                          <div className="aspect-16/10 md:aspect-21/9 w-full relative rounded-5xl md:rounded-[4rem] overflow-hidden bg-navy-900/10 shadow-2xl group-hover/image:shadow-gold-500/20 transition-all duration-1000">
                            <Image 
                              src={url}
                              alt={`Pact Moment ${i + 1}`}
                              fill
                              className="object-cover transition-transform duration-2000 group-hover/image:scale-105 transition-all grayscale group-hover/image:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-navy-950/20 group-hover/image:bg-navy-950/10 transition-colors duration-700" />
                            <div className="absolute inset-x-0 bottom-0 p-8 md:p-14 bg-linear-to-t from-black/80 to-transparent translate-y-6 group-hover/image:translate-y-0 opacity-0 group-hover/image:opacity-100 transition-all duration-700">
                              <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold mb-3 block">Mission Highlights</span>
                              <h4 className="text-2xl md:text-5xl font-bold text-white tracking-tighter italic uppercase">Event Moment {i + 1}</h4>
                            </div>
                          </div>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-none! w-screen h-screen p-0 m-0 border-none bg-black/90 backdrop-blur-3xl focus:outline-hidden flex items-center justify-center z-100">
                        <DialogTitle className="sr-only">Event Moment {i + 1}</DialogTitle>
                        <div className="relative w-[96vw] h-[85vh] rounded-4xl md:rounded-[6rem] overflow-hidden bg-navy-950 border border-white/10 group/modal">
                          <DialogClose className="absolute top-8 right-8 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:text-navy-950 transition-all duration-500">
                            <X className="w-8 h-8" />
                          </DialogClose>
                          <Image src={url} alt={`Moment ${i+1}`} fill className="object-cover" />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-6 mt-12 md:mt-16">
              <CarouselPrevious className="static translate-y-0 w-16 h-16 rounded-full border-navy-100 bg-navy-50 text-navy-950 hover:bg-gold-500 transition-all shadow-2xl" />
              <div className="h-px w-24 bg-navy-100" />
              <CarouselNext className="static translate-y-0 w-16 h-16 rounded-full border-navy-100 bg-navy-50 text-navy-950 hover:bg-gold-500 transition-all shadow-2xl" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Collaborators Section */}
      <div className="bg-white -mt-12 md:-mt-20">
        <Collaborators />
      </div>

      <Footer />
    </main>
  );
}
