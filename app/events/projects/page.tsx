"use client";

import React, { useEffect, useState } from "react";
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
  Award,
  Loader2
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
import { ProjectUpdate } from "@/lib/db/schemas";

const SectionHeader = ({ subtitle, title, description, light = false, center = false }: { subtitle: string, title: string, description?: string, light?: boolean, center?: boolean }) => (
  <FadeInUp className={cn("mb-12 md:mb-20", center ? "flex flex-col items-center text-center" : "")}>
    <div className="inline-flex items-center gap-4 mb-6 opacity-80">
      <div className={cn("h-px w-12 bg-gold-500", light ? "bg-gold-500" : "bg-gold-500/50")} />
      <span className={cn("text-xs md:text-xs tracking-[0.3em] uppercase font-semibold", light ? "text-gold-500" : "text-navy-950/40")}>{subtitle}</span>
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

// Icon mapping for project updates
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical,
  Target,
  Award,
  BookOpen,
  Users,
  Zap,
};

const archives = [
  {
    title: "BITS Law School | Panel on Mediation & Arbitration in International Commercial Conflicts",
    location: "Mumbai, 2025",
    description: "Exploring how mixed-mode dispute resolution is shaping cross-border business disputes and India's evolving position in that space.",
    link: "https://www.youtube.com/watch?v=nQLB_E2Z3hg",
    category: "Webinar",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
  },
  {
    title: "Saveetha School of Law - Three-Day Workshop on Mediation",
    location: "Chennai, 2024",
    description: "Intensive skills workshop introducing core mediation principles, empathic listening, and the IMPACT model.",
    link: "https://saveethalaw.com/news/three-day-workshop-on-mediation",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
  },
  {
    title: "SRM University Delhi-NCR (Haryana) - Mediation & Negotiation Workshop",
    location: "Sonepat, 2023",
    description: "Two-day workshop for final-year students on mediator qualities and practical negotiation strategy.",
    link: "https://srmuniversity.ac.in/event/workshop-on-mediation-and-negotiation",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1523240693567-d7962177c250?auto=format&fit=crop&q=80"
  },
  {
    title: "Manav Rachna University – Mediation Bootcamp",
    location: "Faridabad, 2023",
    description: "A intensive Bootcamp organised by MRU's Centre of Excellence on ADR with Jonathan Rodrigues as trainer.",
    link: "https://manavrachna.edu.in/assets/campus/mru/pdf/sol-newsletter-4.pdf",
    category: "Bootcamp",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80"
  },
  {
    title: "LedX × The PACT – Mediation & Conflict Bootcamp",
    location: "Indore, 2022",
    description: "Indore based bootcamp teaching foundational mediation concepts and client-counselling techniques.",
    link: "https://classroom.ledx.law/bootcamp-on-mediation-client-counselling/",
    category: "Bootcamp",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80"
  },
  {
    title: "Lawctopus × The PACT – Online ADR Bootcamp",
    location: "Online, 2020",
    description: "Online intensive training students and young professionals on negotiation strategy and mediation process.",
    link: "https://www.lawctopus.com/adrbootcamp/",
    category: "Online Bootcamp",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
  }
];

// Default fallback data for Watch Out For section
const defaultUpdates = [
  { 
    title: "Workshop on Mediation", 
    date: "March 2026", 
    location: "SRM Law School, Haryana",
    iconName: "FlaskConical",
    category: "Workshop"
  },
  { 
    title: "ODRC Negotiation Contest", 
    date: "June 2026", 
    location: "Online Event",
    iconName: "Target",
    category: "Competition"
  },
  { 
    title: "Lecture on Mediation", 
    date: "April 2026", 
    location: "IIULER Law School, Goa",
    iconName: "Award",
    category: "Lecture"
  }
];

export default function ProjectsPage() {
  const [projectUpdates, setProjectUpdates] = useState<ProjectUpdate[]>([]);
  const [isLoadingUpdates, setIsLoadingUpdates] = useState(true);

  useEffect(() => {
    async function fetchProjectUpdates() {
      try {
        // Fetch only active updates for public page (no ?all=true)
        const res = await fetch("/api/content/project-updates", { cache: 'no-store' });
        const result = await res.json();
        
        if (result.success && result.data && result.data.length > 0) {
          setProjectUpdates(result.data);
        } else {
          setProjectUpdates(defaultUpdates as ProjectUpdate[]);
        }
      } catch (error) {
        console.error("Failed to fetch project updates:", error);
        setProjectUpdates(defaultUpdates as ProjectUpdate[]);
      } finally {
        setIsLoadingUpdates(false);
      }
    }

    fetchProjectUpdates();
  }, []);

  const displayUpdates = projectUpdates.length > 0 ? projectUpdates : defaultUpdates;

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
              <span className="text-gold-500  text-xs tracking-[0.4em] uppercase font-bold">
                #MissionMediation
              </span>
            </div>
            <h1 className="page-title text-[12vw] sm:text-[10vw] md:text-[8.5rem] font-extrabold text-white tracking-tighter leading-[0.8] mb-16 select-none italic uppercase">
              EVENTS & <br />
              <span className="text-gold-500">PROJECTS</span> 
            </h1>
            
            <div className="max-w-5xl space-y-12">
              <div className="space-y-8">
                <p className="text-2xl sm:text-3xl md:text-5xl text-white/95 font-light leading-[1.1] tracking-tight">
                  Participate in Boot Camps, Workshops, Conferences, Quizzes and Research Studies curated and supported by PACT
                </p>
                <p className="text-xl md:text-2xl text-white/70 font-light max-w-3xl leading-relaxed">
                  We seek to mainstream mediation, build professional capacity, and empower individuals with collaborative dispute resolution skills.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-8 sm:pt-12 w-full sm:w-auto">
                  <MagneticButton variant="primary" size="lg" className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5">
                    <a href="mailto:official@thepact.in" className="flex items-center justify-center gap-3 text-base sm:text-lg">
                       Inquire for Collaboration <Mail className="w-5 h-5" />
                    </a>
                  </MagneticButton>
                  <MagneticButton variant="secondary" size="lg" className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5">
                    <a href="#archives" className="flex items-center justify-center gap-3 text-base sm:text-lg text-white">
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
              { icon: BookOpen, text: "Lectures & Seminars at Universities", color: "text-blue-600 bg-blue-50" },
              { icon: Globe, text: "Workshop & Webinars on Campus", color: "text-emerald-600 bg-emerald-50" },
              { icon: Building2, text: "Office Offsites & Retreats", color: "text-amber-600 bg-amber-50" },
              { icon: Users, text: "Reflective Practice with Leadership", color: "text-purple-600 bg-purple-50" },
              { icon: Zap, text: "Design, Host and Sponsor Conferences", color: "text-rose-600 bg-rose-50" },
              { icon: Scale, text: "Support and Co-Host a Competition", color: "text-indigo-600 bg-indigo-50" }
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="group relative h-full p-10 rounded-[2.5rem] bg-navy-50/50 border border-transparent hover:border-gold-500/30 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden text-center flex flex-col items-center">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-navy-100/10", item.color)}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-navy-950 tracking-tight leading-tight group-hover:text-gold-500 transition-colors uppercase">{item.text}</h4>
                  </div>
                  <div className="mt-8">
                     <a href="mailto:official@thepact.in" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy-300 group-hover:text-gold-600 transition-colors">
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
           
          {isLoadingUpdates ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-gold-500" />
            </div>
          ) : displayUpdates.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">No upcoming events. Check back soon!</p>
            </div>
          ) : (
            <div className={`grid gap-8 md:gap-12 mt-20 ${displayUpdates.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : displayUpdates.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {displayUpdates.map((item: any, i: number) => {
                const IconComponent = iconMap[item.iconName] || Calendar;
                return (
                <FadeInUp key={item._id || i} delay={i * 0.1}>
                  <div className="group relative h-full p-12 rounded-[3.5rem] bg-white/5 backdrop-blur-xl border border-white/10 hover:border-gold-500/40 hover:bg-white/10 transition-all duration-700 shadow-2xl flex flex-col">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-gold-500 mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all border border-white/5">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <div className="flex flex-col gap-2 mb-8">
                       <span className="text-xs tracking-[0.3em] text-gold-500 font-semibold uppercase">
                         {item.category} • {item.date}
                       </span>
                       <h3 className="text-3xl font-bold text-white leading-tight tracking-tighter uppercase group-hover:text-gold-500 transition-colors">
                         {item.title}
                       </h3>
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/5 flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-500">
                          <MapPin className="w-4 h-4" />
                       </div>
                        <div className="flex flex-col">
                           <span className="text-[9px] tracking-widest text-white/30 font-semibold">Location</span>
                           <span className="text-xs font-bold tracking-widest text-white/70">{item.location}</span>
                        </div>
                    </div>
                  </div>
                </FadeInUp>
              )})}
            </div>
          )}
        </div>
      </section>

      {/* Our Footprint & Legacy Section */}
      <section id="archives" className="py-24 md:py-40 bg-navy-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(191,154,102,0.05),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <SectionHeader 
            subtitle="The Impact" 
            title="Our Footprint" 
            center 
            description="Across a decade of advocacy, PACT has built a diverse ecosystem of practitioners and institutions."
          />
          
          {/* Global Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-32">
            {[
              { label: "Workshop Hours", value: "2500+", icon: PlayCircle, desc: "Dedicated training sessions across 20+ cities and online platforms." },
              { label: "Global Partners", value: "80+", icon: Globe, desc: "Universities, law firms, and international ADR bodies in collaboration." },
              { label: "Professionals Trained", value: "5000+", icon: Users, desc: "Empowering the next generation of dispute resolution leaders." }
            ].map((stat, i) => (
              <FadeInUp key={i} delay={i * 0.1}>
                <div className="group relative p-10 rounded-[3rem] bg-white border border-navy-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                  <div className="w-14 h-14 rounded-2xl bg-navy-50 flex items-center justify-center text-gold-500 mb-8 group-hover:bg-navy-950 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="mb-4">
                    <span className="text-5xl font-black italic text-navy-950 tracking-tighter block group-hover:text-gold-500 transition-colors">{stat.value}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-gold-500 font-semibold">{stat.label}</span>
                  </div>
                  <p className="text-navy-950/40 text-xs font-light leading-relaxed">{stat.desc}</p>
                </div>
              </FadeInUp>
            ))}
          </div>

          <div className="pt-24 border-t border-navy-100/50">
            <SectionHeader subtitle="Legacy" title="Archived Projects" center />
            
            <div className="space-y-6 max-w-6xl mx-auto">
                {archives.map((item, i) => (
                  <FadeInUp key={i} delay={i * 0.05}>
                    <div className="group relative flex flex-col md:flex-row gap-8 items-center p-6 md:p-8 rounded-4xl bg-white border border-navy-100/80 shadow-xs hover:border-gold-500/30 hover:shadow-xl transition-all duration-500 overflow-hidden">
                        {/* Compact Image */}
                        <div className="w-full md:w-56 h-40 relative rounded-xl overflow-hidden shrink-0">
                          <Image 
                            src={item.image} 
                            fill 
                            className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                            alt={item.title} 
                          />
                          <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors duration-700" />
                        </div>
                        
                        <div className="grow space-y-4">
                          <div className="flex flex-wrap items-center gap-4">
                            <span className="px-3 py-1 rounded-full bg-navy-50 text-xs text-navy-950/40 uppercase tracking-widest font-bold">
                              {item.category}
                            </span>
                            <span className="text-xs text-gold-600 uppercase tracking-widest font-semibold flex items-center gap-2">
                              <MapPin className="w-3 h-3" /> {item.location}
                            </span>
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-light text-navy-950 group-hover:text-gold-500 transition-colors uppercase italic tracking-tight leading-tight">
                            {item.title}
                          </h3>
                          
                          <p className="text-sm text-navy-950/50 font-light leading-relaxed max-w-3xl">
                            {item.description}
                          </p>
                        </div>

                        <div className="shrink-0 w-full md:w-auto">
                          <a 
                            href={item.link} 
                            target="_blank" 
                            className="group/link inline-flex items-center gap-4 px-8 py-4 rounded-full bg-navy-50 group-hover:bg-navy-950 text-navy-950 group-hover:text-white transition-all duration-500 w-full md:w-auto justify-center"
                          >
                            <span className="text-xs font-bold uppercase tracking-widest">View Project</span>
                            <div className="w-8 h-8 rounded-full bg-white text-navy-950 flex items-center justify-center shadow-sm group-hover/link:scale-110 group-hover/link:rotate-45 transition-all">
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          </a>
                        </div>

                        {/* Subtle Interaction Line */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gold-500 group-hover:h-1/2 transition-all duration-700" />
                    </div>
                  </FadeInUp>
                ))}
            </div>
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
                              className="object-cover transition-all duration-2000 group-hover/image:scale-105 grayscale group-hover/image:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-navy-950/20 group-hover/image:bg-navy-950/10 transition-colors duration-700" />
                            <div className="absolute inset-x-0 bottom-0 p-8 md:p-14 bg-linear-to-t from-black/80 to-transparent translate-y-6 group-hover/image:translate-y-0 opacity-0 group-hover/image:opacity-100 transition-all duration-700">
                              <span className="text-gold-500  text-xs tracking-[0.4em] uppercase font-bold mb-3 block">Mission Highlights</span>
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
