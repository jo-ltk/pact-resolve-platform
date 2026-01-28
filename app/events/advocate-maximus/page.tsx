"use client";

import React from "react";
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
  Rocket
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
      <p className={cn("max-w-4xl text-lg sm:text-xl md:text-2xl font-light leading-relaxed", light ? "text-white/70" : "text-navy-950/50")}>
        {description}
      </p>
    )}
  </FadeInUp>
);

export default function AdvocateMaximusPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white text-navy-950">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-40 md:pb-32 bg-navy-950 overflow-hidden dark">
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
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[8.5rem] font-extrabold text-white tracking-tighter leading-[0.8] mb-16 select-none italic uppercase">
              ADVOCATE <br />
              <span className="text-gold-500">MAXIMUS</span> 
            </h1>
            
            <div className="max-w-5xl space-y-12">
              <div className="space-y-8">
                <p className="text-2xl sm:text-3xl md:text-5xl text-white/95 font-light leading-[1.1] tracking-tight">
                  India's first Arb-Med competition, <br className="hidden md:block" /> redefining advocacy for the modern dispute era.
                </p>
                <div className="flex flex-wrap gap-6 pt-8">
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-gold-500 uppercase font-bold">
                    <Zap className="w-4 h-4" />
                    Pioneering Formats
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-gold-500 uppercase font-bold">
                    <Globe className="w-4 h-4" />
                    Global Standards
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 pt-12">
                  <MagneticButton variant="primary" size="lg" className="group px-10 py-5">
                    <a href="#about" className="flex items-center gap-3 text-lg">
                       Learn More <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </MagneticButton>
                  <MagneticButton variant="secondary" size="lg" className="group px-10 py-5">
                    <a href="https://superlawyer.in/advocate-maximus-sign-up-for-the-global-arb-med-competition/" target="_blank" className="flex items-center gap-3 text-lg">
                       Partnership <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Legacy and Origin Section */}
      <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none text-navy-950/5">
           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col gap-12 md:gap-20">
            {/* Cinematic Imagery */}
            <FadeInUp className="relative group w-full">
              <div className="relative aspect-video md:aspect-21/9 rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-navy-50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] ring-1 ring-navy-950/5 transition-transform duration-700 group-hover:scale-[1.01]">
                <Image 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
                  alt="Advocate Maximus Legacy"
                  fill
                  className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20">
                  <div className="flex flex-col gap-2">
                     <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-gold-500 font-bold">The Archive</span>
                     <h3 className="text-3xl md:text-6xl font-black text-white italic tracking-tighter uppercase">Established 2017</h3>
                  </div>
                </div>

                {/* Floating Badge */}
                <motion.div 
                   initial={{ y: 20, opacity: 0 }}
                   whileInView={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.8 }}
                   className="absolute top-10 right-10 md:top-20 md:right-20 p-6 md:p-10 rounded-full bg-white shadow-2xl border border-navy-100 flex flex-col items-center justify-center text-center w-32 h-32 md:w-48 md:h-48"
                >
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl bg-gold-500 flex items-center justify-center text-navy-950 mb-2 md:mb-3 shadow-lg">
                    <Target className="w-6 h-6 md:w-10 md:h-10" />
                  </div>
                  <span className="text-xl md:text-3xl font-black text-navy-950 tracking-tighter italic whitespace-nowrap">Arb-Med</span>
                  <span className="text-[7px] md:text-[9px] font-mono uppercase tracking-[0.3em] text-gold-500 font-bold mt-1">India's First</span>
                </motion.div>
              </div>
            </FadeInUp>

            {/* Vision Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
              <div className="lg:sticky lg:top-32">
                <SectionHeader 
                  subtitle="The Legacy" 
                  title="Globally Renowned, Locally Rooted" 
                />
                
                {/* Decorative Stats to fill whitespace */}
                <FadeInUp delay={0.2} className="hidden lg:flex items-center gap-12 pt-12 border-t border-navy-100/50">
                  <div className="flex flex-col">
                    <span className="text-5xl font-black italic text-gold-500 tracking-tighter">2017</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-navy-950/40 font-bold mt-1">Founding Year</span>
                  </div>
                  <div className="w-px h-12 bg-navy-100" />
                  <div className="flex flex-col">
                    <span className="text-5xl font-black italic text-gold-500 tracking-tighter">1st</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-navy-950/40 font-bold mt-1">In the Region</span>
                  </div>
                </FadeInUp>
              </div>

              <div className="space-y-8 text-xl md:text-2xl font-light text-navy-500 leading-relaxed pt-4 md:pt-0">
                <p>
                  Advocate Maximus was born out of a vision to bridge the gap between academic learning and professional practice in the field of <span className="text-navy-950 font-medium">International Commercial Arbitration and Mediation.</span>
                </p>
                <p className="text-navy-950">
                  Since its inception in New Delhi (2017), the competition has attracted the brightest minds from top law schools, offering a rigorous platform for testing skills in both adversarial and collaborative settings.
                </p>
                
                <div className="pt-8">
                  <a href="https://superlawyer.in/advocate-maximus-sign-up-for-the-global-arb-med-competition/" target="_blank" className="group inline-flex items-center gap-6 text-gold-600 hover:text-navy-950 transition-all font-bold uppercase tracking-[0.3em] text-sm md:text-base">
                    Read the Original Announcement 
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold-50 group-hover:bg-navy-950 group-hover:text-white flex items-center justify-center transition-all shadow-lg">
                      <ExternalLink className="w-5 h-5 md:w-7 h-7" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Pillars Section */}
      <section className="py-16 md:py-24 bg-navy-50 relative overflow-hidden">
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
                  <div className="group relative h-full p-10 rounded-[3rem] bg-white border border-transparent shadow-sm hover:border-gold-500/30 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col items-start overflow-hidden">
                    <div className="w-16 h-16 rounded-2xl bg-navy-50 flex items-center justify-center text-gold-500 mb-8 group-hover:bg-navy-950 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy-950 group-hover:text-gold-500 transition-colors mb-4 uppercase italic tracking-tight leading-tight">{item.title}</h3>
                    <p className="text-navy-500 font-light leading-relaxed mb-auto group-hover:text-navy-950/70 transition-colors">{item.desc}</p>
                    
                    <div className="mt-10 h-1 w-12 bg-navy-100 group-hover:w-full group-hover:bg-gold-500/30 transition-all duration-700 rounded-full" />
                  </div>
                </StaggerItem>
              ))}
           </StaggerContainer>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 md:py-40 bg-navy-950 text-white overflow-hidden relative dark">
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
                 <div className="flex flex-wrap justify-center gap-8">
                    <MagneticButton variant="primary" size="lg" className="px-12 py-5 shadow-2xl shadow-gold-500/20">
                      <a href="mailto:info@thepact.in" className="flex items-center gap-3 text-lg">
                        Contact for Partnerships <MailIcon className="w-5 h-5" />
                      </a>
                    </MagneticButton>
                    <MagneticButton variant="secondary" size="lg" className="px-12 py-5 border border-white/20">
                      <a href="#" className="flex items-center gap-3 text-lg">
                        Alumni Network <Rocket className="w-5 h-5" />
                      </a>
                    </MagneticButton>
                 </div>
                 
                 <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40">
                    <div className="flex flex-col items-center">
                       <span className="text-4xl font-black italic">7+</span>
                       <span className="text-[8px] font-mono tracking-widest uppercase font-bold">Years of Legacy</span>
                    </div>
                    <div className="w-px h-12 bg-white/20" />
                    <div className="flex flex-col items-center">
                       <span className="text-4xl font-black italic">50+</span>
                       <span className="text-[8px] font-mono tracking-widest uppercase font-bold">Institutions</span>
                    </div>
                    <div className="w-px h-12 bg-white/20" />
                    <div className="flex flex-col items-center">
                       <span className="text-4xl font-black italic">500+</span>
                       <span className="text-[8px] font-mono tracking-widest uppercase font-bold">Alumni</span>
                    </div>
                 </div>
              </div>
           </FadeInUp>
        </div>
      </section>

      {/* Collaborators Section */}
      <div className="bg-white py-12 md:py-20">
        <Collaborators />
      </div>

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
