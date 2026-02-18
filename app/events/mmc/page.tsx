"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ConclaveEvent } from "@/lib/db/schemas";
import { 
  Users, 
  Mail, 
  Calendar, 
  MapPin, 
  MessageSquare,
  BarChart3,
  Presentation,
  Handshake,
  Lightbulb,
  Building2,
  Briefcase,
  Scale,
  GraduationCap,
  Globe,
  Gavel,
  ArrowRight,
  Zap,
  FileText,
  Trophy,
  Maximize2,
  X,
  Star,
  Award,
  Ticket,
  ChevronRight,
  ExternalLink,
  MoreHorizontal
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

// --- Reusable Section Header ---
const SectionHeader = ({ subtitle, title, description, light = false, center = false }: { subtitle: string, title: string, description?: string, light?: boolean, center?: boolean }) => (
  <FadeInUp className={cn("mb-8 sm:mb-12 md:mb-20", center ? "flex flex-col items-center text-center" : "")}>
    <div className="inline-flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6 opacity-80">
      <div className={cn("h-px w-8 sm:w-12 bg-gold-500", light ? "bg-gold-500" : "bg-gold-500/50")} />
      <span className={cn("text-xs sm:text-[11px] md:text-xs font-mono tracking-[0.2em] sm:tracking-[0.4em] uppercase font-bold", light ? "text-gold-500" : "text-navy-950/60")}>{subtitle}</span>
    </div>
    <h2 className={cn("text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[5rem] font-light tracking-tight mb-4 sm:mb-6 md:mb-8 leading-[1.1] sm:leading-[0.95]", light ? "text-white" : "text-navy-950")}>
      {title.split(' ').map((word, i) => (
        <span key={i} className={cn(
          word.toLowerCase() === 'mediation' || 
          word.toLowerCase() === 'conclave' || 
          word.toLowerCase() === 'practice' || 
          word.toLowerCase() === 'mission' ||
          word.toLowerCase() === 'participate?' ? "text-gold-500 italic font-medium" : ""
        )}>
          {word}{' '}
        </span>
      ))}
    </h2>
    {description && (
      <p className={cn("max-w-4xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed px-2 sm:px-0", light ? "text-white/70" : "text-navy-950/50")}>
        {description}
      </p>
    )}
  </FadeInUp>
);

export default function MMCPage() {
  const [eventData, setEventData] = useState<ConclaveEvent | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch("/api/content/conclave-event");
        const result = await res.json();
        if (result.success && result.data && !Array.isArray(result.data)) {
          setEventData(result.data);
        }
      } catch (e) {
        console.error("Failed to fetch conclave data", e);
      }
    }
    fetchEvent();
  }, []);

  // --- Fallback Data ---
  const guests = eventData?.guestsOfHonour?.length ? eventData.guestsOfHonour : [
    { name: "R. Venkataramani", title: "Attorney General for India", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
    { name: "Hon. Justice A.K. Sikri", title: "Former Judge, Supreme Court of India", image: "https://images.unsplash.com/photo-1560250097-9b93dbd19728?auto=format&fit=crop&q=80" },
    { name: "Sriram Panchu", title: "Senior Advocate & Mediator", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" },
    { name: "Hon'ble Guests", title: "Distinguished Panelists", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" }
  ];

  const highlights = eventData?.highlights?.length ? eventData.highlights : [
    { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80", title: "Event Poster 2025", description: "Original Campaign Poster for the 2025 Mission Mediation Conclave." },
    { url: "https://images.unsplash.com/photo-1515168816513-4896b9f0d1a9?auto=format&fit=crop&q=80", title: "Audience Engagement", description: "Mission Mediation Conclave 2025 was held on 9 November at India International Centre." }, 
    { url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80", title: "Keynote Address", description: "Headline sponsors Samvād: Partners and Dua Associates." },
    { url: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80", title: "Interactive Session", description: "Engaging discussions between stakeholders and the audience." },
    { url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80", title: "Panel Discussion", description: "Expert insights on the future of mediation in India." },
    { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80", title: "Networking Break", description: "Stakeholders connecting during the afternoon session." }
  ];

  const coverage = eventData?.coverage?.length ? eventData.coverage : [
    {
      source: "ET LEGAL WORLD",
      headline: "India urged to lead global mediation with international headquarters",
      link: "https://legal.economictimes.indiatimes.com/news/web-stories/india-urged-to-lead-global-mediation-with-international-headquarters/125224193"
    },
    {
      source: "BW WORLD",
      headline: "Attorney General R Venkataramani to grace the Mediation Championship India 2025",
      link: "https://www.bwlegalworld.com/article/attorney-general-r-venkataramani-to-grace-the-mediation-championship-india-2025-hosted-by-the-pact-577838"
    },
    {
      source: "BAR AND BENCH",
      headline: "I am more gladiator than mediator - AG Venkataramani calls for mediation push",
      link: "https://www.barandbench.com/news/i-am-more-gladiator-than-mediator-ag-venkataramani-calls-for-mediation-push"
    }
  ];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-navy-950 text-white">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 md:pt-28 md:pb-16 bg-navy-950 overflow-hidden dark">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
            alt="MMC Header"
            fill
            className="object-cover opacity-30 scale-105"
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
                The Stakeholder Gathering
              </span>
            </div>
            <h1 className="page-title text-[12vw] sm:text-[10vw] md:text-[8.5rem] font-extrabold text-white tracking-tighter leading-[0.8] mb-16 select-none italic uppercase">
              MISSION <br />
              <span className="text-gold-500">MEDIATION</span> <br />
              CONCLAVE
            </h1>
            
            <div className="max-w-5xl space-y-12">
              <div className="space-y-8">
                <p className="text-2xl sm:text-3xl md:text-5xl text-white/95 font-light leading-[1.1] tracking-tight">
                  The second edition of this unique gathering of mediation stakeholders will once again feature real case studies, practical insights and evidence-driven conversations on mediation as a practice and profession in India.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 pt-8 sm:pt-12 border-t border-white/10">
                   {[
                     { label: "2026 Dates", icon: Calendar, value: "More Details Soon", color: "text-gold-500" },
                     { label: "2026 Venue", icon: MapPin, value: "More Details Soon", color: "text-gold-500" },
                     { label: "2026 Hosts", icon: Users, value: "More Details Soon", color: "text-white/40" },
                     { label: "2026 Sponsors", icon: MoreHorizontal, value: "More Details Soon", color: "text-white/40" }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-2 sm:gap-3 group/item">
                        <span className="text-[9px] sm:text-xs font-mono text-white/50 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">{item.label}</span>
                        <div className={cn("flex items-center gap-3 transition-colors", item.color)}>
                          <item.icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                          <span className="text-sm sm:text-base md:text-lg font-medium tracking-tight">{item.value}</span>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-12">
                  <MagneticButton variant="primary" size="lg" className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5">
                    <a href="mailto:official@thepact.in" className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg">
                       Sign Up as a Speaker for MCI 2026 <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </MagneticButton>
                  <MagneticButton variant="secondary" size="lg" className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5">
                    <a href="mailto:official@thepact.in" className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg">
                       Sign Up as a Sponsor for MCI 2026 <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Mediation in Practice Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full opacity-50" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-navy-900/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <SectionHeader 
              subtitle="The Concept" 
              title="Mediation in Practice" 
              center
            />
          </div>

         <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Cinematic Feature Image */}
            <FadeInUp className="relative group">
              <div className="absolute -inset-6 sm:-inset-10 bg-gold-500/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative aspect-video md:aspect-21/9 rounded-2xl sm:rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] overflow-hidden bg-navy-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] sm:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] ring-1 ring-navy-950/5">
                <Image 
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80"
                  alt="Conversations at MMC"
                  fill
                  className="object-cover transition-transform duration-2000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-navy-950/10 to-transparent" />
                
                {/* MMC Badge - Top Right */}
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-8 md:right-8 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full bg-navy-950 flex flex-col items-center justify-center text-center shadow-xl sm:shadow-2xl border-2 sm:border-3 md:border-4 border-gold-500/30">
                   <span className="text-gold-500 font-bold text-xs sm:text-sm md:text-xl leading-none">MMC</span>
                   <span className="text-[4.5px] sm:text-[5px] md:text-[7px] text-white/40 uppercase tracking-[0.25em] sm:tracking-[0.4em] font-bold mt-0.5 sm:mt-1">Conclave</span>
                </div>
              </div>
            </FadeInUp>

            {/* Floating Feature Card - OUTSIDE image on mobile, overlapping on desktop */}
            <FadeInUp className="-mt-12 sm:-mt-16 md:-mt-20 px-4 sm:px-6 md:px-0">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative md:ml-12 lg:ml-16 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-2xl md:rounded-3xl bg-white backdrop-blur-xl border border-navy-950/10 shadow-2xl max-w-full sm:max-w-[320px] md:max-w-[360px]"
              >
                <div className="flex items-center gap-3 sm:gap-4 text-left">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 shadow-lg shrink-0">
                    <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[9px] md:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-navy-950/40 font-bold mb-1">Format</p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-navy-950 tracking-tight leading-tight">Uniquely Immersive</p>
                  </div>
                </div>
              </motion.div>
            </FadeInUp>

            {/* Description Text Layout */}
            <FadeInUp>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-20 items-start">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-navy-950 font-light leading-snug tracking-tight">
                    The Mission Mediation Conclave is a gathering that is open to every stakeholder involved in the practice and profession of Mediation.
                  </p>
                  <div className="h-px w-16 sm:w-20 bg-gold-500" />
                </div>
                
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  <p className="text-base sm:text-lg md:text-xl text-navy-950/60 font-light leading-relaxed">
                    The uniquely immersive format allows everyone in the audience to join those on the dais and contribute to the discussions.
                  </p>
                  
                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 pt-4 sm:pt-6 border-t border-navy-100/50">
                    {[
                      { icon: Presentation, text: "Relevant Case Studies" },
                      { icon: Lightbulb, text: "Practice Techniques" },
                      { icon: BarChart3, text: "Data-driven Insights" },
                      { icon: MessageSquare, text: "Interactive Talks" },
                      { icon: Users, text: "Immersive Workshopping" },
                      { icon: Globe, text: "Live Polls & Reports" }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5 sm:gap-3 group">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-navy-50 flex items-center justify-center text-navy-950 group-hover:bg-gold-500 transition-colors shrink-0">
                          <feature.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-light text-navy-950/70 group-hover:text-navy-950 transition-colors">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>



        </div>
      </section>

      {/* Guests of Honour Section */}
      <section className="py-16 md:py-24 bg-navy-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <SectionHeader subtitle="Distinction" title="Guests of Honour" center light />
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full relative group/carousel"
          >
            <CarouselContent className="-ml-4">
              {guests.map((item, i) => (
                <CarouselItem key={i} className="pl-4 basis-full md:basis-1/3">
                  <FadeInUp className="group relative aspect-video rounded-[2.5rem] overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-700">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 md:grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 via-navy-950/20 to-transparent group-hover:from-navy-950/95 transition-all duration-500" />
                    <div className="absolute bottom-8 left-8 right-8 text-left">
                      <h3 className="text-2xl font-bold text-white tracking-tight italic mb-1">{item.name}</h3>
                      <p className="text-xs text-gold-500/80 font-mono uppercase tracking-widest font-bold">{item.title}</p>
                    </div>
                  </FadeInUp>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Premium Navigation */}
            <div className="flex items-center justify-center gap-6 mt-12 md:mt-16">
              <CarouselPrevious className="static translate-y-0 w-16 h-16 rounded-full border-white/10 bg-white/5 text-white hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition-all shadow-2xl hover:-translate-x-1" />
              <div className="h-px w-24 bg-white/10" />
              <CarouselNext className="static translate-y-0 w-16 h-16 rounded-full border-white/10 bg-white/5 text-white hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition-all shadow-2xl hover:translate-x-1" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Who Should Participate Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <SectionHeader subtitle="Participation" title="Who Should Participate?" center />
          
          <div className="space-y-24">
            {/* Stakeholder Grid */}
            <div className="space-y-16">
              <FadeInUp className="flex flex-col items-center text-center">
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-navy-950/50 font-light max-w-3xl leading-relaxed">
                    A multi-disciplinary gathering bringing together the most influential voices <br className="hidden md:block" /> in the mediation ecosystem.
                  </p>
                </div>
              </FadeInUp>
              
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { icon: Building2, text: "C-Suite Leaders", sub: "Corporate Governance", color: "bg-amber-50 text-amber-600" },
                  { icon: Briefcase, text: "Business Professionals", sub: "Strategic Growth", color: "bg-blue-50 text-blue-600" },
                  { icon: Scale, text: "Law Firm Lawyers", sub: "Legal Counsel", color: "bg-emerald-50 text-emerald-600" },
                  { icon: Gavel, text: "In-House Counsel", sub: "Corporate Legal", color: "bg-purple-50 text-purple-600" },
                  { icon: Users, text: "Judges & Arbitrators", sub: "Judiciary", color: "bg-rose-50 text-rose-600" },
                  { icon: Handshake, text: "Mediators & Managers", sub: "Conflict Resolution", color: "bg-indigo-50 text-indigo-600" },
                  { icon: Globe, text: "Policymakers", sub: "Public Policy", color: "bg-orange-50 text-orange-600" },
                  { icon: GraduationCap, text: "Students & Professors", sub: "Academia", color: "bg-cyan-50 text-cyan-600" }
                ].map((group, i) => (
                  <StaggerItem key={i}>
                    <div className="group relative p-8 rounded-[2.5rem] bg-navy-50/50 border border-transparent hover:border-gold-500/30 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden text-center flex flex-col items-center">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                        group.color
                      )}>
                        <group.icon className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-navy-950 tracking-tight leading-none group-hover:text-gold-500 transition-colors uppercase">{group.text}</h4>
                        <p className="text-xs uppercase tracking-[0.2em] font-mono text-navy-950/40">{group.sub}</p>
                      </div>
                      <div className="h-px w-8 bg-navy-100 mt-6 group-hover:w-12 group-hover:bg-gold-500 transition-all duration-500" />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Bottom Full-Width Cinematic Feature */}
            <FadeInUp className="relative group">
              <div className="relative aspect-video md:aspect-21/9 rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-navy-50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] ring-1 ring-navy-950/5">
                <Image 
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80"
                  alt="MMC Sponsors 2025"
                  fill
                  className="object-cover transition-transform duration-2000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                
                <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="h-px w-12 bg-gold-500" />
                      <span className="text-xs font-mono uppercase tracking-[0.4em] text-gold-500 font-bold">The Mission Continues</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-4xl md:text-7xl font-bold text-white italic tracking-tighter leading-none">
                        MMC Sponsors <br />
                        <span className="text-white/40">2025 Edition</span>
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Floating Archive Badge */}
                <div className="absolute top-8 right-8 md:top-12 md:right-12 p-6 rounded-full bg-navy-950/80 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center text-center shadow-2xl min-w-[120px]">
                   <span className="text-gold-500 font-bold text-3xl leading-none italic">2025</span>
                   <span className="text-[8px] text-white/40 uppercase tracking-[0.4em] font-bold mt-1">Archive</span>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Highlights - 2025 Section */}
      <section className="py-16 md:py-24 bg-navy-950 text-white overflow-hidden dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <SectionHeader 
            subtitle="The 2025 Collection" 
            title="Highlights – 2025" 
            light
            description="Mission Mediation Conclave 2025 was held on 9 November at India International Centre, New Delhi, with Samvād: Partners and Dua Associates as Headline Sponsors."
          />
          
          <div className="flex flex-col gap-12">
            {/* Poster Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <FadeInUp className="lg:col-span-3 aspect-video relative rounded-4xl overflow-hidden border border-white/10 shadow-2xl group">
                <Image 
                  src={highlights[0]?.url || "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80"}
                  alt={highlights[0]?.title || "Poster of Speakers and Sponsors"}
                  fill
                  className="object-cover transition-transform duration-2000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10">
                   <p className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold mb-2">Original Campaign</p>
                   <h3 className="text-4xl font-bold italic tracking-tighter">{highlights[0]?.title || "Event Poster 2025"}</h3>
                </div>
              </FadeInUp>
              
              <div className="lg:col-span-2 grid grid-cols-1 gap-8">
                {[
                  highlights[1] || { url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80", title: "Frame 2025 - 01" },
                  highlights[2] || { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80", title: "Frame 2025 - 02" }
                ].map((item, i) => (
                   <FadeInUp key={i} className="aspect-square lg:aspect-auto relative rounded-4xl overflow-hidden border border-white/5 shadow-2xl group">
                      <Image 
                        src={item.url}
                        alt={item.title || `MMC Gallery Image ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-navy-950/80 to-transparent">
                        <span className="text-xs font-mono text-gold-500 uppercase tracking-widest font-bold">{item.title || `Frame 2025 - 0${i + 1}`}</span>
                      </div>
                   </FadeInUp>
                ))}
              </div>
            </div>
            
            {/* Carousel of Images from MMC 2025 */}
            <div className="w-full">
              <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[Autoplay({ delay: 3500 })]}
                className="w-full relative"
              >
                <CarouselContent className="-ml-4">
                  {highlights.map((item, i) => (
                    <CarouselItem key={i} className="pl-4 basis-3/4 md:basis-1/4">
                       <div className="aspect-square relative rounded-3xl overflow-hidden opacity-50 hover:opacity-100 transition-opacity cursor-pointer group">
                         <Image 
                           src={item.url}
                           alt={`MMC ${eventData?.year || 2025} Archive ${i + 1}`}
                           fill
                           className="object-cover transition-transform group-hover:scale-110"
                         />
                         <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors" />
                       </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Media & Press Section */}
      <section className="pt-16 md:pt-24 pb-4 md:pb-6 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <SectionHeader subtitle="Coverage" title="Media & Press" center />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coverage.map((item, i) => (
                <FadeInUp key={i} className="group">
                  <a 
                    href={(() => {
                      const link = item.link?.trim() || '#';
                      if (link === '#' || link.startsWith('http')) return link;
                      return `https://${link}`;
                    })()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block h-full"
                  >
                    <div className="relative h-full p-10 rounded-[2.5rem] bg-navy-50 border border-navy-100 hover:border-gold-500/50 transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] flex flex-col items-start overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                      
                      <div className="h-10 w-auto mb-10 flex items-center">
                         {/* This would be the logo placeholder */}
                         <span className="text-xs font-serif font-black tracking-tighter text-navy-950/30 group-hover:text-gold-500 transition-colors uppercase">{item.source}</span>
                      </div>
                      
                      <h3 className="text-2xl font-light text-navy-950 leading-tight mb-auto group-hover:text-gold-500 transition-colors">
                        {item.headline}
                      </h3>
                      
                      <div className="mt-12 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-navy-950/40 group-hover:text-gold-500 transition-all duration-300">
                        View Article <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </a>
                </FadeInUp>
             ))}
          </div>
        </div>
      </section>

      {/* Collaborators Section */}
      <div className="bg-white">
        <Collaborators />
      </div>

      <Footer />
    </main>
  );
}

