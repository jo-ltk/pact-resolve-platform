"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Download,
  FileText,
  Award,
  Star,
  Zap,
  BookOpen,
  GraduationCap,
  Users2,
  Ticket,
  Briefcase,
  ArrowRight,
  Mail,
  ChevronRight,
  Maximize2,
  X
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MCIEvent } from "@/lib/db/schemas";
import { useEffect, useState } from "react";
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
import { MCISignupModal } from "@/components/sections/mci/signup-modal";

// --- Reusable Section Header ---
const SectionHeader = ({ subtitle, title, description, light = false, center = false, titleClassName }: { subtitle: string, title: string, description?: string, light?: boolean, center?: boolean, titleClassName?: string }) => (
  <FadeInUp className={cn("mb-8 sm:mb-12 md:mb-20", center ? "flex flex-col items-center text-center" : "")}>
    <div className="inline-flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6 opacity-80">
      <div className={cn("h-px w-6 sm:w-8 md:w-12 bg-gold-500", light ? "bg-gold-500" : "bg-gold-500/50")} />
      <span className={cn("text-xs sm:text-[11px] md:text-xs  tracking-[0.2em] sm:tracking-[0.4em] uppercase font-bold", light ? "text-gold-500" : "text-navy-950/60")}>{subtitle}</span>
    </div>
    <h2 className={cn("text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[5rem] font-light tracking-tight mb-4 sm:mb-6 md:mb-8 leading-[1.1] sm:leading-[0.95]", light ? "text-white" : "text-navy-950", titleClassName)}>
      {title.split(' ').map((word, i) => (
        <span key={i} className={cn(
          word.toLowerCase() === 'champions' || 
          word.toLowerCase() === 'league' || 
          word.toLowerCase() === 'indian' || 
          word.toLowerCase() === 'roadmap' ? "text-gold-500 italic font-medium" : ""
        )}>
          {word}{' '}
        </span>
      ))}
    </h2>
    {description && (
      <p className={cn("max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed px-2 sm:px-0", light ? "text-white/70" : "text-navy-950/50")}>
        {description}
      </p>
    )}
  </FadeInUp>
);

export default function MCIPage() {
  const [eventData, setEventData] = useState<MCIEvent | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        console.log("Fetching MCI event data...");
        const res = await fetch("/api/content/mci-event");
        const result = await res.json();
        console.log("MCI API Result:", result);
        
        if (result.success && result.data) {
          // Handle both single object or array return
          const activeEvent = Array.isArray(result.data) 
            ? result.data.find((e: any) => e.isActive) || result.data[0] 
            : result.data;
          
          console.log("Selected Active Event:", activeEvent);
          console.log("Gallery Data:", activeEvent?.gallery);
          
          setEventData(activeEvent);
        } else {
          console.warn("MCI API returned success:false or no data");
        }
      } catch (error) {
        console.error("Failed to fetch MCI event", error);
      }
    }
    fetchEvent();
  }, []);

  // Use dynamic gallery if available, otherwise fallback to static images
  const galleryImages = (eventData && eventData.gallery && eventData.gallery.length > 0) 
    ? eventData.gallery 
    : [
    {
      url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80",
      title: "Inaugural Ceremony",
      description: "Setting the stage for a weekend of elite mediation."
    },
    {
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      title: "Mentorship Sessions",
      description: "Connecting next-gen talent with industry veterans."
    },
    {
      url: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80",
      title: "Final Rounds",
      description: "High-stakes mediation challenges in front of the grand jury."
    },
    {
      url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80",
      title: "Gala Dinner",
      description: "An evening of celebration and strategic networking."
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      title: "Winners Circle",
      description: "Celebrating excellence in dispute resolution."
    },
    {
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
      title: "Collaborations",
      description: "Building lasting partnerships within the legal community."
    }
  ];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-navy-950 text-white">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-40 md:pb-32 bg-navy-950 overflow-hidden dark">
        <div className="absolute inset-0 z-0">
          <Image
            src={eventData?.heroImage?.url || "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80"}
            alt="MCI Header"
            fill
            className="object-cover opacity-30 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-navy-950/40 via-navy-950/90 to-navy-950" />
          <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-transparent to-transparent opacity-80" />
          
          {/* Subtle Accent Glows */}
          <div className="absolute top-1/4 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-1/4 left-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-white/5 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
          <FadeInUp>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <div className="h-px w-8 sm:w-12 bg-gold-500" />
              <span className="text-gold-500  text-xs sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold">
                {eventData?.subtitle || "India's Premier Mediation Event"}
              </span>
            </div>
            <h1 className="page-title text-[14vw] sm:text-[12vw] md:text-[8.5rem] font-extrabold text-white tracking-tighter leading-[0.8] mb-8 sm:mb-12 md:mb-16 select-none italic uppercase">
              MEDIATION <br />
              <span className="text-gold-500">CHAMPIONSHIP</span> <br />
              INDIA
            </h1>
            
            <div className="max-w-5xl space-y-6 sm:space-y-8 md:space-y-12">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <p className="text-lg sm:text-2xl md:text-3xl lg:text-5xl text-white/95 font-light leading-[1.15] sm:leading-[1.1] tracking-tight">
                  The fourth edition of India's Mediation Champions League will convene the country's top next-generation dispute resolution talent to compete and collaborate on the biggest stage.
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-light max-w-3xl leading-relaxed">
                  The flagship event also serves as a great space for mentoring, networking and branding for mediation.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 pt-6 sm:pt-8 md:pt-12 border-t border-white/10">
                   {[
                     { label: "Dates", icon: Calendar, value: eventData?.eventDetails?.dates || "September 2026", color: "text-gold-500" },
                     { label: "Venue", icon: MapPin, value: eventData?.eventDetails?.venue || "New Delhi", color: "text-gold-500" },
                     { label: "Hosts", icon: Users2, value: "Coming Soon", color: "text-white/40" },
                     { label: "Sponsors", icon: Briefcase, value: "Coming Soon", color: "text-white/40" }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-2 sm:gap-3 group/item">
                        <span className="text-[9px] sm:text-xs  text-white/50 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">{item.label}</span>
                        <div className={cn("flex items-center gap-2 sm:gap-3 transition-colors", item.color)}>
                          <item.icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                          <span className="text-sm sm:text-base md:text-lg font-medium tracking-tight">{item.value}</span>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-8 sm:pt-12">
                  <MagneticButton 
                    variant="primary" 
                    size="lg" 
                    className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5"
                    onClick={() => setShowSignupModal(true)}
                  >
                    <div className="flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg cursor-pointer">
                       Sign Up as Challenger <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </MagneticButton>
                  <MagneticButton variant="secondary" size="lg" className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5">
                    <a href="mailto:official@thepact.in" className="flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg">
                       Sponsor / Mentor <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Retrospective Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <SectionHeader subtitle="Retrospective" title="MCI Final Frames" center />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { year: 2025, image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" },
              { year: 2024, image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80" },
              { year: 2023, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80" }
            ].map((item) => (
              <FadeInUp key={item.year} className="group relative aspect-video rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-navy-50 shadow-sm hover:shadow-2xl transition-all duration-700">
                <Image
                  src={item.image}
                  alt={`MCI Final Frame ${item.year}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-navy-950/20 to-transparent group-hover:from-navy-950/90 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter italic drop-shadow-lg">MCI {item.year}</span>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* National Mediation Champions Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-navy-950 relative overflow-hidden dark">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <SectionHeader subtitle="Know Your Champions" title="National Mediation Champions" center light />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                year: "2023",
                counsel: "Anshul Kumar Sarma, Ananya Dewan, Kessav Navaladi Shankar",
                mediator: "Akshita Kothari"
              },
              {
                year: "2024",
                counsel: "Arundhati Venkarachalam, Sankalp Varma",
                mediator: "Kashish Goel"
              },
              {
                year: "2025",
                counsel: "Ayush Khanna, Kartikey Tripathi",
                mediator: "Navya Pandey"
              }
            ].map((item, i) => (
              <FadeInUp key={item.year} className="group h-full">
                <div className="relative h-full p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-4xl md:rounded-5xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-500/30 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(191,154,102,0.15)] overflow-hidden flex flex-col items-center text-center">
                  
                  {/* Number Background Detail */}
                  <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold text-white/5 group-hover:text-gold-500/10 transition-all duration-1000 italic select-none pointer-events-none">
                    {item.year.slice(-2)}
                  </div>

                  <div className="relative mb-6 sm:mb-8 md:mb-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-500 group-hover:rotate-12 border border-gold-500/20 shadow-lg">
                      <Trophy className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </div>
                    {/* Floating detail */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gold-500 scale-0 group-hover:scale-100 transition-transform duration-500 border-2 sm:border-[3px] border-navy-950 shadow-sm" />
                  </div>
                  
                  <div className="relative z-10 w-full flex flex-col grow">
                    <div className="mb-4 sm:mb-6 md:mb-8">
                      <span className="text-[9px] sm:text-xs  uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/60 group-hover:text-gold-500/80 font-bold transition-colors">Season Edition</span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter italic group-hover:text-gold-500 transition-colors duration-500">
                        MCI {item.year}
                      </h3>
                    </div>

                    <div className="h-px w-10 sm:w-12 bg-white/10 group-hover:w-16 sm:group-hover:w-20 group-hover:bg-gold-500 transition-all duration-700 mx-auto mb-4 sm:mb-6 md:mb-8" />

                    <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center grow">
                      <div className="space-y-1 sm:space-y-2">
                        <span className="text-[9px] sm:text-xs  text-gold-500/80 uppercase tracking-wider sm:tracking-widest block font-bold">Mediation Counsel</span>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/95 leading-tight tracking-tight">{item.counsel}</p>
                      </div>
                      
                      <div className="space-y-1 sm:space-y-2">
                        <span className="text-[9px] sm:text-xs  text-gold-500/80 uppercase tracking-wider sm:tracking-widest block font-bold">Mediator</span>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/95 leading-tight tracking-tight">{item.mediator}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-gold-500/5 blur-[120px] rounded-full opacity-50" />
          <div className="absolute top-1/4 right-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-navy-900/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <SectionHeader 
              subtitle="The Vision" 
              title="Globally Unique, Exceptionally Indian" 
              center
              titleClassName="lg:whitespace-nowrap"
            />
          </div>

         <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Cinematic Feature Image */}
            <FadeInUp className="relative group">
              <div className="absolute -inset-6 sm:-inset-10 bg-gold-500/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative aspect-video md:aspect-21/9 rounded-2xl sm:rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] overflow-hidden bg-navy-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] sm:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] ring-1 ring-navy-950/5">
                <Image 
                  src={eventData?.visionImage?.url || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"}
                  alt="MCI Mentoring"
                  fill
                  className="object-cover transition-transform duration-2000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-navy-950/10 to-transparent" />
                
                {/* MCL Badge - Top Right */}

              </div>
            </FadeInUp>

            {/* Floating Experience Card - OUTSIDE image on mobile, overlapping on desktop */}
            <FadeInUp className="-mt-12 sm:-mt-16 md:-mt-20 px-4 sm:px-6 md:px-0">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative md:ml-12 lg:ml-16 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-2xl md:rounded-3xl bg-white backdrop-blur-xl border border-navy-950/10 shadow-2xl max-w-full sm:max-w-[320px] md:max-w-[360px]"
              >
                <div className="flex items-center gap-3 sm:gap-4 text-left">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 shadow-lg shrink-0">
                    <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[9px] md:text-xs  uppercase tracking-[0.2em] sm:tracking-[0.3em] text-navy-950/40 font-bold mb-1">Experience</p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-navy-950 tracking-tight leading-tight">7 Immersive Challenges</p>
                  </div>
                </div>
              </motion.div>
            </FadeInUp>

            {/* Description Text Layout */}
            <FadeInUp>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-20 items-start">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-navy-950 font-light leading-snug tracking-tight">
                    Mediation Championship India – <span className="text-gold-500 font-medium italic">"MCI"</span> – is a Mediation Champions League featuring skilled and smart young lawyers from across the country.
                  </p>
                  <div className="h-px w-16 sm:w-20 bg-gold-500" />
                </div>
                
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  <p className="text-base sm:text-lg md:text-xl text-navy-950/60 font-light leading-relaxed">
                    Challengers showcase their wits and wisdom in tackling <span className="text-navy-950 font-medium italic underline decoration-gold-500/30 underline-offset-4 sm:underline-offset-8">7 immersive challenges</span> from convening to concluding a typical Mediation, mentored by Law Firm partners, C-Suite Leaders, and members of the Judiciary.
                  </p>
                  
                  <div className="pt-2 sm:pt-4 flex flex-wrap gap-4">
                    <MagneticButton variant="primary" size="lg" className="group w-full sm:w-auto">
                      <Link href="#" className="flex items-center justify-center gap-2">
                         <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                         View PDF Brochure
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Mentoring Partners Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-40 bg-navy-950 text-white overflow-hidden relative dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(191,154,102,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10">
          <SectionHeader 
            subtitle="Support Network" 
            title="Mentoring Partners" 
            light
            description="Over the years, we have been supported by a celebrated pool of law firms and organizations that have rewarded the top performers with internships, besides on-site mentoring during MCI."
          />
          
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <StaggerItem key={i}>
                <div className="h-16 sm:h-20 md:h-24 lg:h-32 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8 group hover:border-gold-500/30 hover:bg-white/5 transition-all duration-500">
                  <div className="w-full h-full bg-white/5 rounded-lg sm:rounded-xl animate-pulse group-hover:animate-none group-hover:bg-gold-500/10 transition-colors" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 7 Rounds Section - Cinematic Stacked Layout */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-40 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="flex flex-col gap-10 sm:gap-14 md:gap-20">
             {/* Header & Description */}
             <FadeInUp>
                <div className="flex flex-col items-center text-center">
                  <SectionHeader 
                    subtitle="The Competition" 
                    title="A Mediation Champions League" 
                    center
                  />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-navy-950/80 italic -mt-4 sm:-mt-6 md:-mt-8 mb-6 sm:mb-8 md:mb-12">
                     Challengers are rewarded with:
                  </p>
                </div>
             </FadeInUp>

             {/* Top Feature Image - Expansive & Cinematic */}
             <FadeInUp className="relative group">
                <div className="absolute -inset-6 sm:-inset-10 bg-gold-500/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative aspect-video md:aspect-21/9 rounded-2xl sm:rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] overflow-hidden bg-navy-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] ring-1 ring-navy-950/5">
                  <Image 
                    src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80"
                    alt="7 Rounds of MCI"
                    fill
                    className="object-cover transition-transform duration-2000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-navy-950/10 to-transparent" />
                  
                  {/* Floating Number Overlay */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-16 md:left-16 flex items-end gap-3 sm:gap-4 md:gap-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <span className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[10rem] font-bold leading-none tracking-tighter italic opacity-80 decoration-gold-500 underline decoration-2 sm:decoration-4 underline-offset-4 sm:underline-offset-8">07</span>
                    <div className="pb-2 sm:pb-3 md:pb-4">
                      <p className="text-[8px] sm:text-[9px] md:text-xs lg:text-xs  uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold text-gold-500 mb-1 sm:mb-2">Competition Structure</p>
                      <h3 className="text-base sm:text-xl md:text-2xl lg:text-4xl font-light tracking-tighter uppercase italic leading-none">Immersive <br />Challenges</h3>
                    </div>
                  </div>

                  {/* Glass Play Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                     <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gold-500 flex items-center justify-center text-navy-950 shadow-xl">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 fill-current" />
                     </div>
                  </div>
                </div>
             </FadeInUp>
             
             {/* Premium Rewards Grid */}
             <div className="relative">
                <div className="absolute top-[10%] -left-12 w-24 h-px bg-gold-500/20 hidden md:block" />
                <div className="absolute bottom-[10%] -right-12 w-24 h-px bg-gold-500/20 hidden md:block" />

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    { icon: Star, text: "INR 1,50,000", sub: "Cash Prizes", color: "bg-amber-50 text-amber-600" },
                    { icon: GraduationCap, text: "Course", sub: "Online Mediation", color: "bg-blue-50 text-blue-600" },
                    { icon: BookOpen, text: "Literature", sub: "Books & Resources", color: "bg-emerald-50 text-emerald-600" },
                    { icon: Award, text: "Scholarship", sub: "Training Programs", color: "bg-purple-50 text-purple-600" },
                    { icon: Ticket, text: "Gala Dinner", sub: "Black & Gold Night", color: "bg-rose-50 text-rose-600" },
                    { icon: Users2, text: "Networking", sub: "Strategic Growth", color: "bg-indigo-50 text-indigo-600" },
                    { icon: Zap, text: "Conclave", sub: "Mission Mediation", color: "bg-orange-50 text-orange-600" },
                    { icon: Briefcase, text: "Internships", sub: "Tier-1 Law Firms", color: "bg-cyan-50 text-cyan-600" }
                  ].map((benefit, i) => (
                    <StaggerItem key={i}>
                      <div className="group relative h-full p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-white border border-navy-100 hover:border-gold-500/50 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden">
                        {/* Hover Background Accent */}
                        <div className="absolute top-0 right-0 w-[100px] md:w-[120px] h-[100px] md:h-[120px] bg-gold-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:bg-gold-500/10 transition-colors" />
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className={cn(
                            "w-12 h-12 sm:w-16 sm:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500",
                            benefit.color
                          )}>
                            <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                          </div>
                          
                          <div className="space-y-1">
                            <h4 className="text-base sm:text-xl font-bold text-navy-950 tracking-tight leading-none group-hover:text-gold-500 transition-colors">{benefit.text}</h4>
                            <p className="text-xs sm:text-xs uppercase tracking-[0.2em]  font-bold text-navy-950/40">{benefit.sub}</p>
                          </div>
                          
                          {/* Progress/Detail Decorative Bar */}
                          <div className="h-px w-8 sm:w-12 md:w-16 bg-navy-100 mt-4 sm:mt-6 group-hover:w-20 group-hover:bg-gold-500/30 transition-all duration-700" />
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
             </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-40 bg-navy-950 text-white relative overflow-hidden dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(191,154,102,0.1),transparent_70%)]" />
        <div className="absolute -top-24 -right-24 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gold-500/10 blur-[120px] rounded-full" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <FadeInUp>
            <SectionHeader subtitle="Get Involved" title="Apply for MCI 2026" light center />
            <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16">
               <MagneticButton variant="primary" size="lg" className="w-full sm:w-auto px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 group">
                  <a href="#" className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg">
                    <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                    Download Rulebook
                  </a>
               </MagneticButton>
               
               <div className="space-y-3 sm:space-y-4 md:space-y-6">
                 <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light italic text-white/70">Stay Updated — Apply for Early-Bird Rates</p>
                 <a 
                   href="mailto:official@mediationchampionship.com" 
                   className="text-sm sm:text-lg md:text-2xl lg:text-5xl font-light text-white hover:text-gold-500 transition-colors underline decoration-gold-500/20 underline-offset-4 sm:underline-offset-8 md:underline-offset-12 decoration-1 break-all sm:break-normal block"
                 >
                    official@mediationchampionship.com
                 </a>
               </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Past Editions Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <SectionHeader subtitle="History" title="Past Editions" center />
          
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 relative">
            {/* Central Timeline Line (Desktop Only) */}
            <div className="absolute left-14 top-0 bottom-0 w-px bg-navy-950/5 hidden lg:block" />

            {[
              {
                year: "2025",
                date: "November 7-9",
                location: "New Delhi",
                venue: "Venue TBD",
                actions: [
                  { label: "View Report", icon: FileText },
                  { label: "MRU Movie", icon: Zap },
                  { label: "Watch MCI Movie", icon: Trophy }
                ]
              },
              {
                year: "2024",
                date: "September 13-15",
                location: "Ahmedabad",
                venue: "Gujarat National Law University",
                actions: [
                  { label: "MCI Movie 2024", icon: Zap },
                  { label: "Mentors Frame", icon: Users2 },
                  { label: "Students Frame", icon: Star }
                ]
              },
              {
                year: "2023",
                date: "September 8-10",
                location: "Ahmedabad",
                venue: "Adani Institute of Infrastructure",
                actions: [
                  { label: "Mentors Frame", icon: Users2 },
                  { label: "Partners Picture", icon: Briefcase },
                  { label: "Participants", icon: Users2 }
                ]
              }
            ].map((edition, i) => (
              <FadeInUp key={edition.year} className="group relative">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-center">
                  
                  {/* Year Indicator - Now more prominent on mobile */}
                  <div className="relative z-10 lg:w-32 shrink-0">
                    <div className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-navy-950 text-white flex flex-col items-center justify-center shadow-2xl group-hover:bg-gold-500 transition-all duration-500 group-hover:rotate-6 ring-4 ring-white">
                        <span className="text-2xl sm:text-3xl font-bold italic leading-none">{edition.year}</span>
                        <div className="h-px w-6 bg-gold-500/50 mt-2 group-hover:bg-navy-950/20" />
                      </div>
                      {/* Decorative Dot for Mobile Timeline Feel */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold-500 lg:hidden" />
                    </div>
                  </div>

                  {/* Content Card - Swapped/Aligned */}
                  <div className="grow w-full p-6 sm:p-10 lg:p-12 rounded-4xl sm:rounded-5xl bg-navy-50/30 border border-navy-100 hover:border-gold-500/30 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 relative overflow-hidden">
                    {/* Background Subtle Year for design depth */}
                    <div className="absolute -right-4 -bottom-4 text-8xl font-black text-navy-950/3 italic pointer-events-none select-none">
                      {edition.year}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center text-center lg:text-left relative z-10">
                      <div className="md:col-span-5 space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                            <div className="h-px w-4 bg-gold-500" />
                            <span className="text-xs sm:text-[11px]  uppercase tracking-[0.3em] text-gold-500 font-bold">Season {3-i}</span>
                          </div>
                          <h4 className="text-2xl sm:text-3xl font-bold text-navy-950 tracking-tight">{edition.date}</h4>
                        </div>
                        <div className="flex flex-col items-center lg:items-start gap-2">
                          <div className="flex items-center gap-2 text-navy-950/70 bg-white/50 px-3 py-1 rounded-full border border-navy-100/50">
                            <MapPin className="w-4 h-4 text-gold-500" />
                            <span className="text-sm sm:text-base font-semibold tracking-tight">{edition.location}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-navy-950/50 font-medium italic pl-1">{edition.venue}</p>
                        </div>
                      </div>

                      <div className="md:col-span-1 hidden md:flex justify-center">
                        <div className="h-16 w-px bg-navy-200/50" />
                      </div>

                      <div className="md:col-span-6 flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-end">
                        {edition.actions.map((action, j) => (
                          <button 
                            key={j} 
                            className="group/btn flex items-center gap-2 px-5 py-3 sm:py-3.5 rounded-2xl border border-navy-100 bg-white text-xs sm:text-[11px] font-bold uppercase tracking-wider text-navy-950/60 hover:bg-navy-950 hover:text-white hover:border-navy-950 shadow-sm transition-all duration-300"
                          >
                            <action.icon className="w-3.5 h-3.5 text-gold-500 group-hover/btn:scale-110 transition-transform" />
                            <span>{action.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white border-y border-navy-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <SectionHeader subtitle="Press" title="Media Coverage" center />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 sm:gap-x-8 md:gap-x-12 gap-y-8 sm:gap-y-12 md:gap-y-16 items-center">
            {[
              { name: "Bar and Bench", font: "font-serif" },
              { name: "Live Law", font: "font-sans font-bold" },
              { name: "SCC Online", font: "font-serif italic" },
              { name: "Lawctopus", font: "font-sans font-black tracking-tighter" },
              { name: "Law Beat", font: "font-serif font-bold uppercase" },
              { name: "Bar Bulletin", font: "font-sans tracking-tight" },
              { name: "Law Bhoomi", font: "font-serif italic font-bold" },
              { name: "Law Chakra", font: "font-sans font-medium" }
            ].map((press) => (
               <div key={press.name} className="flex items-center justify-center group cursor-default">
                  <div className="text-center relative">
                    <span className={cn(
                      "text-sm sm:text-base md:text-xl lg:text-3xl text-navy-950/20 group-hover:text-navy-950 transition-all duration-700 ease-in-out select-none block",
                      press.font
                    )}>
                      {press.name}
                    </span>
                    <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-500 opacity-50" />
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pt-8 sm:pt-10 md:pt-12 lg:pt-20 pb-10 sm:pb-12 md:pb-16 lg:pb-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader subtitle="Gallery" title="MCI Memories" center />
        </div>
        
        <div className="w-full px-4 md:px-0">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full relative group/carousel"
          >
            <CarouselContent className="-ml-4 md:ml-0">
              {galleryImages.map((image, i) => ( // Updated to use dynamic variable
                <CarouselItem key={i} className="pl-2 sm:pl-4 md:pl-0 basis-[92%] sm:basis-[85%] md:basis-[70%] lg:basis-[60%] px-1 sm:px-2 md:px-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full text-left group/image relative outline-hidden cursor-pointer">
                        <div className="aspect-16/10 md:aspect-21/9 w-full relative rounded-2xl sm:rounded-3xl md:rounded-5xl lg:rounded-[4rem] overflow-hidden bg-navy-900/10 shadow-lg sm:shadow-xl md:shadow-2xl group-hover/image:shadow-gold-500/20 transition-all duration-1000">
                          <Image 
                            src={image.url}
                            alt={image.title}
                            fill
                            className="object-cover transition-transform duration-2000 group-hover/image:scale-105"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-navy-950/20 group-hover/image:bg-navy-950/10 transition-colors duration-700" />
                          
                          {/* Hover Overlay with Icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-700 bg-navy-950/30 backdrop-blur-[2px]">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center scale-75 group-hover/image:scale-100 transition-transform duration-700">
                              <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                            </div>
                          </div>

                          {/* Content Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-14 bg-linear-to-t from-navy-950/80 via-navy-950/40 to-transparent translate-y-6 group-hover/image:translate-y-0 opacity-0 group-hover/image:opacity-100 transition-all duration-700">
                            <span className="text-gold-500  text-[8px] sm:text-[9px] md:text-xs lg:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold mb-1 sm:mb-2 md:mb-3 block">MCI Collection</span>
                            <h4 className="text-lg sm:text-xl md:text-2xl lg:text-5xl font-bold text-white tracking-tighter leading-none mb-2 sm:mb-3 md:mb-4">{image.title}</h4>
                            <p className="text-xs sm:text-sm md:text-base lg:text-xl text-white/70 font-light max-w-2xl line-clamp-1">{image.description}</p>
                          </div>
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-none! w-screen h-screen p-0 m-0 border-none bg-black/90 backdrop-blur-3xl shadow-none focus:outline-hidden flex items-center justify-center z-100">
                      <DialogTitle className="sr-only">{image.title}</DialogTitle>
                      <div className="relative w-[96vw] h-[85vh] sm:h-[90vh] rounded-2xl sm:rounded-3xl md:rounded-4xl lg:rounded-[6rem] overflow-hidden bg-navy-950 shadow-[0_0_150px_rgba(0,0,0,0.6)] border border-white/10 group/modal transition-all duration-700">
                        {/* Close Button - Highly Visible */}
                        <DialogClose className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:text-navy-950 hover:scale-110 transition-all duration-500 shadow-xl sm:shadow-2xl group/close">
                          <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 group-hover/close:rotate-90 transition-transform duration-500" />
                        </DialogClose>

                        <Image 
                          src={image.url}
                          alt={image.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover/modal:scale-105"
                          quality={100}
                          unoptimized
                        />
                        
                        {/* Text Overlay - Cinematic and only on hover */}
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 md:p-10 lg:p-24 bg-linear-to-t from-black/90 via-black/20 to-transparent transition-all duration-700 opacity-0 group-hover/modal:opacity-100 translate-y-8 group-hover/modal:translate-y-0">
                           <div className="max-w-7xl mx-auto">
                            <span className="text-gold-500  text-[9px] sm:text-xs md:text-xs lg:text-sm tracking-[0.4em] sm:tracking-[0.6em] uppercase font-bold mb-2 sm:mb-4 md:mb-6 block">Event Archive</span>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[8rem] font-bold text-white tracking-tighter leading-[0.8] mb-3 sm:mb-5 md:mb-8 italic">{image.title}</h3>
                            <p className="text-sm sm:text-base md:text-xl lg:text-3xl text-white/70 font-light leading-relaxed max-w-4xl">{image.description}</p>
                           </div>
                        </div>

                        {/* Subtle close hint info when not hovering */}
                        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 lg:bottom-16 lg:right-16 group-hover/modal:opacity-0 transition-opacity">
                          <div className="flex flex-col items-end gap-1 sm:gap-2">
                             <span className="text-gold-500  text-[8px] sm:text-[9px] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold">MCI Memories</span>
                             <span className="text-white/40  text-[8px] sm:text-[9px] md:text-xs uppercase tracking-wider sm:tracking-widest">{image.title}</span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12 lg:mt-16">
              <CarouselPrevious className="static translate-y-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl md:rounded-4xl border-navy-100/50 bg-white text-navy-950 hover:bg-navy-950 hover:text-white hover:border-navy-950 transition-all shadow-md sm:shadow-lg hover:-translate-x-1" />
              <div className="h-px w-12 sm:w-16 md:w-24 bg-navy-100/30" />
              <CarouselNext className="static translate-y-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl md:rounded-4xl border-navy-100/50 bg-white text-navy-950 hover:bg-navy-950 hover:text-white hover:border-navy-950 transition-all shadow-md sm:shadow-lg hover:translate-x-1" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Collaborators Section */}
      <div className="bg-white -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12 mb-8 sm:mb-12 md:mb-16 lg:mb-24">
        <Collaborators />
      </div>

      <AnimatePresence>
        {showSignupModal && (
          <MCISignupModal onClose={() => setShowSignupModal(false)} />
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
