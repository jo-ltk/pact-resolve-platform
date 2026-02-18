"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Shield, 
  Gavel, 
  Scale, 
  Globe, 
  Users, 
  Award, 
  ArrowUpRight,
  ExternalLink,
  Zap,
  Star,
  ChevronRight,
  Sparkles,
  Medal,
  Calendar,
  MapPin,
  Trophy,
  Maximize2,
  X,
  Target,
  Rocket,
  RefreshCw
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
import { MCIEvent } from "@/lib/db/schemas";
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
          word.toLowerCase() === 'maximus' || 
          word.toLowerCase() === 'advocate' || 
          word.toLowerCase() === 'advantage' || 
          word.toLowerCase() === 'competition' ? "text-gold-500 italic font-medium" : ""
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

export default function AdvocateMaximusPage() {
  const [eventData, setEventData] = useState<MCIEvent | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch("/api/content/advocate-maximus-event");
        const result = await res.json();
        if (result.success && result.data && !Array.isArray(result.data)) {
          setEventData(result.data);
        }
      } catch (e) {
        console.error("Failed to fetch Advocate Maximus data", e);
      }
    }
    fetchEvent();
  }, []);

  const partners = eventData?.strategicPartners || [];
  const gallery = eventData?.gallery || [];
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white text-navy-950">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-40 md:pb-32 bg-navy-950 overflow-hidden dark">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
            alt="Advocate Maximus Hero"
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
                The Premier Moot
              </span>
            </div>
            <div className="relative mb-16 lg:mb-24">
              <div className="max-w-4xl relative z-10">
                <h1 className="page-title text-[10vw] sm:text-[9vw] md:text-[8rem] lg:text-[8.5rem] font-extrabold text-white tracking-tighter leading-[0.8] select-none italic uppercase">
                  ADVOCATE <br />
                  <span className="text-gold-500">MAXIMUS</span> 
                </h1>
              </div>
              
              {/* Creative Logo Seal - Positioned as a floating interactive emblem */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 -right-4 sm:-right-8 lg:-right-24 -translate-y-[40%] lg:-translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-[400px] lg:h-[400px] z-20"
              >
                {/* The "Emblem" Body */}
                <div className="relative w-full h-full rounded-full bg-white p-4 sm:p-6 lg:p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6),0_0_50px_rgba(191,154,102,0.25)] border-4 sm:border-8 lg:border-12 border-navy-950/5 overflow-hidden group">
                  {/* Internal Depth Layer */}
                  <div className="absolute inset-0 bg-radial-to-br from-white via-white to-gold-50/40" />
                  
                  {/* Subtle Inner Detail Ring */}
                  <div className="absolute inset-2 sm:inset-4 lg:inset-6 rounded-full border border-gold-500/10 pointer-events-none" />
                  
                  <Image 
                    src="/images/advocate-maximus/AM19-construction-logo.png"
                    alt="Advocate Maximus Official Emblem"
                    fill
                    className="object-contain p-4 sm:p-6 lg:p-10 relative z-10 drop-shadow-2xl"
                  />
                  
                  {/* Creative Shine Animation - Sweeps across the white surface */}
                  <motion.div 
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "linear" }}
                    className="absolute top-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/70 to-transparent -skew-x-25 z-20 pointer-events-none"
                  />
                </div>
                
                {/* Orbital Decoration Rings */}
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-10%] sm:inset-[-12%] rounded-full border-2 border-white/5 border-dashed pointer-events-none" 
                />
                <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-5%] sm:inset-[-6%] rounded-full border border-gold-500/10 pointer-events-none" 
                />
              </motion.div>
            </div>
            
            <div className="max-w-5xl space-y-8 sm:space-y-12">
              <div className="space-y-6 sm:space-y-10">
                <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white/95 font-light leading-[1.05] tracking-tight max-w-4xl">
                  India's first Arb-Med competition, <br className="hidden lg:block" /> 
                  <span className="text-white/40 italic">redefining advocacy</span> for the modern dispute era.
                </p>
                
                {/* Redesigned Glass Badges */}
                <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                  {[
                    { icon: Zap, label: "Pioneering Formats", color: "from-gold-400 to-gold-600" },
                    { icon: Globe, label: "Global Standards", color: "from-white/10 to-white/5" }
                  ].map((badge, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden group"
                    >
                      <div className={cn("absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500", badge.color)} />
                      <badge.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500" />
                      <span className="text-[9px] sm:text-[11px] font-mono tracking-[0.2em] text-white/70 group-hover:text-white transition-colors uppercase font-bold">
                        {badge.label}
                      </span>
                    </motion.div>
                  ))}
                  
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gold-500/10 border border-gold-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                    <span className="text-xs font-mono tracking-widest text-gold-500 uppercase font-bold">
                      Open for Participation
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 sm:pt-10">
                  <MagneticButton variant="primary" size="lg" className="group w-full sm:w-auto px-10 py-5 sm:py-6">
                    <a href="#about" className="flex items-center justify-center gap-3 text-lg font-medium">
                       Explore the Elite <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </MagneticButton>
                  
                  <MagneticButton variant="secondary" size="lg" className="group w-full sm:w-auto px-10 py-5 sm:py-6 border border-white/20">
                    <a 
                      href="https://superlawyer.in/advocate-maximus-sign-up-for-the-global-arb-med-competition/" 
                      target="_blank" 
                      className="flex items-center justify-center gap-3 text-lg font-medium"
                    >
                       Partnership Inquiry <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Legacy and Origin Section */}
      <section id="about" className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none text-navy-950/5">
           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full opacity-50" />
        </div>

       <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20">
            {/* Cinematic Imagery */}
            <FadeInUp className="relative group w-full">
              <div className="absolute -inset-6 sm:-inset-10 bg-gold-500/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative aspect-video md:aspect-21/9 rounded-2xl sm:rounded-3xl md:rounded-[3rem] lg:rounded-[5rem] overflow-hidden bg-navy-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] sm:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] ring-1 ring-navy-950/5">
                <Image 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
                  alt="Advocate Maximus Legacy"
                  fill
                  className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-transparent to-transparent opacity-80" />
                
                {/* Bottom Left Text */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-10 md:left-10 lg:bottom-20 lg:left-20">
                  <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                     <span className="text-[8px] sm:text-[9px] md:text-xs lg:text-xs font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gold-500 font-bold">The Archive</span>
                     <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">Established 2017</h3>
                  </div>
                </div>

                {/* Arb-Med Badge - Top Right, smaller on mobile */}
                <motion.div 
                   initial={{ y: 20, opacity: 0 }}
                   whileInView={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.5 }}
                   className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-10 md:right-10 lg:top-20 lg:right-20 p-3 sm:p-4 md:p-6 lg:p-10 rounded-full bg-white shadow-xl sm:shadow-2xl border border-navy-100 flex flex-col items-center justify-center text-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-gold-500 flex items-center justify-center text-navy-950 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 shadow-lg">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-10 lg:h-10" />
                  </div>
                  <span className="text-xs sm:text-sm md:text-xl lg:text-3xl font-black text-navy-950 tracking-tighter italic whitespace-nowrap leading-none">Arb-Med</span>
                  <span className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[9px] font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold-500 font-bold mt-0.5 sm:mt-1">India's First</span>
                </motion.div>
              </div>
            </FadeInUp>

            {/* Vision Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-24 items-start">
              <div className="lg:sticky lg:top-32 space-y-12">
                <SectionHeader 
                  subtitle="The Legacy" 
                  title="Globally Renowned, Locally Rooted" 
                />
                
                {/* Decorative Pill Section to fill space */}
                <FadeInUp delay={0.2} className="hidden lg:block">
                  <div className="grid grid-cols-2 gap-4 max-w-sm">
                    {[
                      { label: "Founded In", value: "2017", icon: Calendar },
                      { label: "Venue", value: "New Delhi", icon: MapPin },
                    ].map((item, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-navy-50 border border-navy-100/50 group hover:bg-white hover:shadow-xl transition-all duration-500">
                        <item.icon className="w-5 h-5 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
                        <p className="text-xs font-mono uppercase tracking-widest text-navy-950/40 mb-1">{item.label}</p>
                        <p className="text-xl font-bold text-navy-950 tracking-tight">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </FadeInUp>
              </div>

              <div className="space-y-8 sm:space-y-10 md:space-y-12 pt-2 sm:pt-4 lg:pt-0">
                <div className="space-y-6 sm:space-y-7 md:space-y-8 text-base sm:text-lg md:text-xl lg:text-2xl font-light text-navy-500 leading-relaxed">
                  <p>
                    Advocate Maximus was born out of a vision to bridge the gap between academic learning and professional practice in the field of <span className="text-navy-950 font-medium">International Commercial Arbitration and Mediation.</span>
                  </p>
                  <p className="text-navy-950">
                    Since its inception in New Delhi (2017), the competition has attracted the brightest minds from top law schools, offering a rigorous platform for testing skills in both adversarial and collaborative settings.
                  </p>
                </div>
                
                <div className="pt-6 sm:pt-8">
                  <a 
                    href="https://superlawyer.in/advocate-maximus-sign-up-for-the-global-arb-med-competition/" 
                    target="_blank" 
                    className="group flex items-center gap-4 sm:gap-5"
                  >
                    <div className="h-0.5 w-12 sm:w-16 bg-gold-500 group-hover:w-20 sm:group-hover:w-24 transition-all duration-300" />
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-navy-800 group-hover:text-navy-950 font-extrabold transition-colors">
                      Read Announcement
                    </span>
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </section>
      
      {/* The Difference Section */}
      <section className="py-12 sm:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-navy-950/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Wide Image */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative group">
              <FadeInUp className="relative">
                <div className="absolute -inset-4 bg-gold-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-navy-950/5">
                  <Image 
                    src="/images/advocate-maximus/48944736_305133906789479_600439576191827968_o.jpg"
                    alt="Mediation Setting"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-transparent to-transparent opacity-40" />
                </div>
              </FadeInUp>
            </div>
            
            {/* Content Sidebar */}
            <div className="lg:col-span-12 xl:col-span-5 order-2 lg:order-1 space-y-10">
              <SectionHeader 
                subtitle="The Edge" 
                title="The Difference" 
              />
              
              <StaggerContainer className="space-y-8 -mt-8 sm:-mt-12 md:-mt-16">
                  {[
                    {
                      icon: Globe,
                      title: "Teams Beyond Borders",
                      desc: "Collaborate across institutions to build global perspectives."
                    },
                    {
                      icon: RefreshCw,
                      title: "Hybrid Format",
                      desc: "Master Arbitration and Mediation in a single competition."
                    },
                    {
                      icon: Award,
                      title: "Creative Recognition",
                      desc: "Awards that celebrate strategic brilliance and ethical advocacy."
                    }
                  ].map((item, i) => (
                    <StaggerItem key={i} className="flex gap-5 items-start group">
                      <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy-950 shrink-0 group-hover:bg-gold-500 transition-all duration-300">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-navy-950 tracking-tight group-hover:text-gold-600 transition-colors">{item.title}</h3>
                        <p className="text-sm text-navy-950/50 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="py-12 sm:py-20 bg-navy-950 relative overflow-hidden dark">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(191,154,102,0.08),transparent_70%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <SectionHeader 
            subtitle="The Experience" 
            title="Relive the Elite Competition" 
            light 
            center 
          />
          
          <div className="-mt-8 sm:-mt-12 md:-mt-16">
          
          <FadeInUp className="relative group max-w-5xl mx-auto">
             <div className="absolute -inset-1 bg-linear-to-r from-gold-500/20 to-navy-950 rounded-2xl sm:rounded-[2.5rem] blur-sm opacity-50 group-hover:opacity-100 transition duration-1000" />
             <div className="relative aspect-video rounded-xl sm:rounded-4xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
                <iframe 
                  src="https://www.youtube.com/embed/z7sqCsE_nDI" 
                  title="Advocate Maximus 2017 Experience"
                  className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
                
                {/* Decorative Overlay for a more cinematic feel */}
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
             </div>
             
             {/* Floating Badge - More subtle and integrated */}
             <motion.div 
               animate={{ y: [0, -8, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-12 px-6 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hidden md:block"
             >
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                   <div>
                      <p className="text-xs font-mono font-bold uppercase tracking-widest text-white/40">Edition</p>
                      <p className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">2017 Recap</p>
                   </div>
                </div>
             </motion.div>
          </FadeInUp>
          </div>
        </div>
      </section>

      {/* Our Footprint Section */}
      <section className="py-16 sm:py-24 md:py-40 bg-navy-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <SectionHeader 
            subtitle="The Scale" 
            title="Our Footprint" 
            center 
            description="A growing ecosystem of practitioners, academics, and future leaders across the globe."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-20">
            {[
              { 
                label: "Years of Legacy", 
                value: "7+", 
                icon: Star, 
                desc: "Defined by innovation and relentless pursuit of excellence since 2017."
              },
              { 
                label: "Institutions", 
                value: "50+", 
                icon: Globe, 
                desc: "Global participation from top-tier law schools and universities."
              },
              { 
                label: "Alumni", 
                value: "500+", 
                icon: Users, 
                desc: "A powerful network of professionals excelling in dispute resolution."
              }
            ].map((stat, i) => (
              <FadeInUp key={i} delay={i * 0.1}>
                <div className="group relative p-8 sm:p-12 rounded-3xl sm:rounded-[3.5rem] bg-white border border-navy-100 shadow-sm hover:shadow-2xl hover:border-gold-500/20 transition-all duration-700">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-navy-50 flex items-center justify-center text-gold-500 mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <span className="text-5xl sm:text-6xl md:text-7xl font-black italic text-navy-950 tracking-tighter block group-hover:text-gold-500 transition-colors">
                      {stat.value}
                    </span>
                    <span className="text-xs sm:text-xs font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gold-500 font-bold">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-navy-950/40 font-light leading-relaxed mt-4 sm:mt-6">
                    {stat.desc}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Pillars Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-navy-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
           <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80" fill alt="Texture" className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
           <SectionHeader subtitle="Features" title="The Arb-Med Advantage" center />
           
           <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Scale,
                  title: "Integrated Hybrid Process",
                  desc: "Master the seamless transition from Arbitration proceedings to Mediation sessions, a critical skill in modern commercial dispute resolution."
                },
                {
                  icon: Gavel,
                  title: "Expert Adjudication",
                  desc: "Your skills are evaluated by a panel of sitting and retired judges, senior advocates, and international neutral practitioners."
                },
                {
                  icon: Users,
                  title: "Strategic Networking",
                  desc: "Connect with leadership teams, law firm partners, and industry experts during the accompanying conferences and gala socials."
                }
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="group relative h-full p-8 sm:p-10 rounded-3xl sm:rounded-[3rem] bg-white border border-transparent shadow-sm hover:border-gold-500/30 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col items-start overflow-hidden">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-navy-50 flex items-center justify-center text-gold-500 mb-6 sm:mb-8 group-hover:bg-navy-950 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <item.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-navy-950 group-hover:text-gold-500 transition-colors mb-4 uppercase italic tracking-tight leading-tight">{item.title}</h3>
                    <p className="text-sm sm:text-base text-navy-500 font-light leading-relaxed mb-auto group-hover:text-navy-950/70 transition-colors">{item.desc}</p>
                    
                    <div className="mt-6 sm:mt-10 h-1 w-12 bg-navy-100 group-hover:w-full group-hover:bg-gold-500/30 transition-all duration-700 rounded-full" />
                  </div>
                </StaggerItem>
              ))}
           </StaggerContainer>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-24 md:py-40 bg-navy-950 text-white overflow-hidden relative dark">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(191,154,102,0.1),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
           <FadeInUp className="text-center">
              <SectionHeader 
                 subtitle="Join the Ranks" 
                 title="Experience the Ultimate Competition" 
                 light 
                 center 
                 description="Whether as a participant, assessor, or sponsor, Advocate Maximus offers a unique vantage point into the future of legal advocacy."
              />
              
              <div className="flex flex-col items-center gap-20 md:gap-32 pt-12">
                 <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 w-full sm:w-auto">
                    <MagneticButton variant="primary" size="lg" className="w-full sm:w-auto px-6 sm:px-12 py-4 sm:py-5 shadow-2xl shadow-gold-500/20">
                      <a href="mailto:info@thepact.in" className="flex items-center justify-center gap-3 text-base sm:text-lg">
                        Contact for Partnerships <MailIcon className="w-5 h-5" />
                      </a>
                    </MagneticButton>
                    <MagneticButton variant="secondary" size="lg" className="w-full sm:w-auto px-6 sm:px-12 py-4 sm:py-5 border border-white/20">
                      <a href="#" className="flex items-center justify-center gap-3 text-base sm:text-lg">
                        Alumni Network <Rocket className="w-5 h-5" />
                      </a>
                    </MagneticButton>
                 </div>
              </div>
           </FadeInUp>
        </div>
      </section>

      {/* Strategic Partners Section */}
      {partners.length > 0 && (
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <SectionHeader 
              subtitle="Strategic Partners" 
              title="Collaborating with Excellence" 
              center
              description={`The ${eventData?.year || ''} edition is supported by leading global institutions and firms committed to mediation excellence.`}
            />
            
            <div className="relative w-full overflow-hidden mt-12">
              <div className="flex">
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: "-50%" }}
                  transition={{
                    duration: 3000, // Drastically increased to ensure a slow, premium drift
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex shrink-0 items-center space-x-12 md:space-x-24 px-6 md:px-12"
                >
                  {[...partners, ...partners].map((partner, i) => (
                    <div 
                      key={i} 
                      className="relative h-16 md:h-24 w-40 md:w-56 md:grayscale hover:grayscale-0 transition-all duration-500 md:opacity-60 hover:opacity-100 hover:scale-110 flex flex-col items-center justify-center group"
                    >
                      <div className="relative h-16 md:h-20 w-full">
                        <Image
                          src={partner.url}
                          alt={partner.title || "Partner Logo"}
                          fill
                          className="object-contain"
                        />
                      </div>
                      {partner.title && (
                        <p className="mt-4 text-[9px] font-mono uppercase tracking-widest text-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {partner.title}
                        </p>
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Memories Section */}
      {gallery.length > 0 && (
        <section className="py-24 bg-navy-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <SectionHeader 
              subtitle="The Archive" 
              title="Event Memories" 
              description={`Glimpses from the previous editions of Advocate Maximus.`}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((item, i) => (
                <FadeInUp key={i} delay={i * 0.1}>
                  <div className="group relative aspect-square rounded-4xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-700">
                    <Image 
                      src={item.url}
                      alt={item.title || "Gallery Item"}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                       <h4 className="text-xl font-bold text-white italic tracking-tight">{item.title}</h4>
                       <p className="text-xs text-gold-500/80 font-mono uppercase tracking-widest mt-1">{item.description}</p>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Generic Collaborators as fallback if no specific partners set */}
      {partners.length === 0 && (
        <div className="bg-white py-12 md:py-20">
          <Collaborators />
        </div>
      )}

      <Footer />
    </main>
  );
}

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)
