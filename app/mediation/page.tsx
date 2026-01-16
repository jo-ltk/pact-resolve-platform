"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Users, 
  FileText, 
  ShieldCheck, 
  Clock, 
  MessageSquare,
  Scale,
  Briefcase,
  Home,
  Building2,
  Lock,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Globe,
  Handshake,
  Timer,
  Sparkles,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { GrainOverlay } from "@/components/grain-overlay";
import { Footer } from "@/components/footer";

// --- Components ---

const SectionHeader = ({ subtitle, title, description, light = false, center = false }: { subtitle: string, title: string, description?: string, light?: boolean, center?: boolean }) => (
  <FadeInUp className={cn("mb-8 md:mb-16", center ? "flex flex-col items-center text-center" : "")}>
    <div className="inline-flex items-center gap-4 mb-4 opacity-70">
      <span className={cn("text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase", light ? "text-white" : "text-navy-950")}>{subtitle}</span>
      <div className={cn("h-px w-8 bg-gold-500/50", light ? "bg-gold-500" : "bg-gold-500")} />
    </div>
    <h2 className={cn("text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-4 sm:mb-6 leading-[1.1]", light ? "text-white" : "text-navy-950")}>
      {title}
    </h2>
    {description && (
      <p className={cn("max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed", light ? "text-white/60" : "text-navy-950/60")}>
        {description}
      </p>
    )}
  </FadeInUp>
);

const MediationHero = () => (
  <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 bg-navy-950 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <Image
        src="/hero/hero_mediation.png" // Reusing homepage mediation image
        alt="Mediation"
        fill
        className="object-cover opacity-30 scale-105"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy-950/40 via-navy-950/90 to-navy-950" />
      <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-transparent to-transparent opacity-80" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <FadeInUp>
        <div className="flex items-center gap-3 mb-4 sm:mb-6 md:mb-8">
          <div className="h-px w-8 md:w-12 bg-gold-500" />
          <span className="text-gold-500 font-mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">
            Conflict Resolution Redefined
          </span>
        </div>
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 select-none italic">
          MEDIATION
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="space-y-6 md:space-y-8">
            <p className="text-lg sm:text-2xl md:text-3xl text-white/90 font-light leading-tight tracking-tight">
              A trendsetter in Mediation Process Design, PACT relies on bespoke case management, quality mediators and best practices for client satisfaction.
            </p>
            <div className="h-px w-full bg-white/10" />
            <p className="text-base md:text-lg text-white/50 font-light max-w-xl leading-relaxed">
              Mediation is an effective conflict resolution mechanism that prioritises efficiency, autonomy and confidentiality. It reduces procedural delays and facilitates consensus-driven outcomes.
            </p>
          </div>
          <div className="relative group hidden lg:block">
            <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <p className="text-xl text-white/70 font-light italic leading-relaxed">
                "With the support of an impartial mediator, parties can explore practical solutions, protect ongoing relationships, and achieve outcomes that work for everyone involved."
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-gold-500" />
                </div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Global Standards of Practice</span>
              </div>
            </div>
          </div>
        </div>
      </FadeInUp>
    </div>
  </section>
);

const PuzzlePieces = () => {
  const points = [
    { 
      title: "Engage Your Own Neutral Mediator", 
      desc: "Curate and appoint qualified professionals who embody absolute neutrality.", 
      icon: Users 
    },
    { 
      title: "Participate Freely and Voluntarily", 
      desc: "Retain complete autonomy with a process driven by sincere engagement.", 
      icon: Handshake 
    },
    { 
      title: "Keep Conversations Confidential", 
      desc: "A secure environment protected under strict institutional and legal safeguards.", 
      icon: Lock 
    },
    { 
      title: "Choose Your Own Private Venue", 
      desc: "Select a location that suits your needs, from our chambers to your preferred site.", 
      icon: Home 
    },
    { 
      title: "Select Your Mode of Communication", 
      desc: "Adapt the dialogue process to fit the unique communication styles of all parties.", 
      icon: MessageSquare 
    },
    { 
      title: "Decide on a Convenient Time & Date", 
      desc: "Coordinate sessions around your timeline to ensure focused and productive progress.", 
      icon: Calendar 
    },
    { 
      title: "Design Your Own Comfortable Process", 
      desc: "Experience a bespoke resolution framework tailored to your specific case dynamics.", 
      icon: Sparkles 
    },
    { 
      title: "Fix Your Own Timelines and Deadlines", 
      desc: "Stay in control of the clock with schedules that respect your commercial urgencies.", 
      icon: Timer 
    },
    { 
      title: "Create Your Own Legal Solutions", 
      desc: "Maintain sovereignty over the outcome by crafting your own binding agreements.", 
      icon: Scale 
    },
    { 
      title: "Confirm An Affordable Fee Structure", 
      desc: "Benefit from complete financial clarity with a transparent, pre-defined fee model.", 
      icon: FileText 
    }
  ];

  return (
    <section className="pt-12 pb-16 sm:pt-16 sm:pb-24 md:pb-40 bg-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-navy-950/3 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12 sm:mb-20 md:mb-32">
          <FadeInUp>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-navy-50 border border-navy-100 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase text-navy-950/60 font-bold">The PACT Advantage</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-[5.5rem] font-extralight tracking-tight text-navy-950 mb-8 leading-[0.95]">
              Why Mediate at <br />
              <span className="italic font-medium text-gold-500">PACT</span>
            </h2>
            <div className="h-px w-24 bg-gold-500/30 mx-auto mb-8" />
            <p className="text-lg sm:text-xl md:text-2xl text-navy-950/40 font-light max-w-3xl mx-auto leading-relaxed tracking-tight">
              Merging institutional rigour with party-centric flexibility. 
              We provide the framework; you retain the control.
            </p>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="relative h-full px-6 py-8 sm:px-8 sm:py-10 md:py-12 rounded-5xl bg-navy-50/20 border border-navy-100/30 hover:bg-white hover:border-gold-500/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col items-center text-center">
                
                {/* Number Background Detail */}
                <div className="absolute -bottom-6 -right-4 text-[8rem] font-bold text-navy-950/1.5 group-hover:text-gold-500/4 transition-all duration-1000 italic select-none pointer-events-none">
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </div>

                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-3xl bg-white text-navy-950 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all duration-500 group-hover:rotate-12 shadow-md border border-navy-100/50">
                    <point.icon className="w-8 h-8" />
                  </div>
                  {/* Floating detail */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gold-500 scale-0 group-hover:scale-100 transition-transform duration-500 border-[3px] border-white shadow-sm" />
                </div>
                
                <div className="grow space-y-4 relative z-10 w-full">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-gold-500/60 font-bold">Foundation {i + 1}</span>
                    <h3 className="text-2xl md:text-3xl font-light text-navy-950 tracking-tighter leading-tight italic group-hover:text-gold-500 transition-colors duration-500 uppercase">
                      {point.title}
                    </h3>
                  </div>
                  <div className="h-px w-10 bg-navy-100 group-hover:w-16 bg-gold-500/30 group-hover:bg-gold-500 transition-all duration-700 mx-auto" />
                  <p className="text-navy-950/40 text-base md:text-lg font-light leading-relaxed group-hover:text-navy-950/60 transition-colors duration-500">
                    {point.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* New Brand Statement to fill empty grid space */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="lg:col-span-2 flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 md:py-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-gold-500/10 transition-colors duration-1000" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-4 mb-4">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-gold-500 font-bold">The PACT Promise</span>
              </div>
              
              <p className="text-3xl md:text-5xl font-extralight text-navy-950 tracking-tighter leading-tight mb-8 italic">
                Conflict is inevitable, but <span className="text-gold-500 font-medium">resolution</span> is a choice. We provide the framework for that choice.
              </p>

              <a 
                href="mailto:mediation@thepact.in" 
                className="inline-flex items-center gap-6 group/link"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-navy-950/30 group-hover/link:text-gold-500 transition-colors">Direct Inquiry</span>
                  <span className="text-xl font-light text-navy-950 group-hover/link:text-gold-500 transition-colors">Connect with a Convenor</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-navy-100 flex items-center justify-center group-hover/link:bg-gold-500 group-hover/link:border-gold-500 transition-all duration-500">
                  <ArrowUpRight className="w-5 h-5 text-navy-950 group-hover/link:text-white transition-colors" />
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PactProvides = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: "CONVENING",
      label: "Rebuilding Relationships",
      icon: Users,
      description: "PACT accelerates structured and confidential meetings, preserving privacy and confidentiality from the get-go. Clear procedural guidelines are established at the outset. The Mediation Convenor works with both sides to build trust with the process, the neutrals and the institution."
    },
    {
      title: "COACHING",
      label: "Collaborative Standards",
      icon: MessageSquare,
      description: "The Mediation Convenor assists parties and counsel in developing a collaborative approach in their communications, especially through the signing of the Mediation Agreement and drafting of the Mediation Brief / Strategy. Measures are employed to maintain fair and safe participation."
    },
    {
      title: "FACILITATING",
      label: "Identifying Interests",
      icon: Scale,
      description: "The Mediator facilitates discussions to identify underlying interests of the parties. Legal, commercial and relational concerns are explored. Each party is offered a chance to be heard. Key issues are clarified and organised. Respectful expression of emotions is encouraged, and hostile language is reframed."
    },
    {
      title: "EVALUATING",
      label: "Options and Alternatives",
      icon: Briefcase,
      description: "The mediator supports parties in evaluating options against objective standards and practical alternatives. Legal frameworks, risks, and implications are considered. The mediator does not impose outcomes. Parties are assisted in making informed choices. Decision-making is voluntary and reasoned."
    },
    {
      title: "CONSTRUCTING",
      label: "Commitment-Based Solutions",
      icon: Building2,
      description: "The mediator assists parties in developing clear and workable solutions. Agreements are based on voluntary and informed commitments. Outcomes are structured for clarity and implementation. Party autonomy is preserved. This strengthens compliance and durability."
    },
    {
      title: "CLOSING",
      label: "Securing the Process",
      icon: Lock,
      description: "The mediation concludes with a structured review of outcomes. Agreements are confirmed for shared understanding. Future engagement is addressed where appropriate. The process closes with clarity and neutrality. Institutional confidence in mediation is upheld."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-navy-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <SectionHeader 
          subtitle="PACT Provides" 
          title="The Resolution Roadmap"
          description="Total Commitment to Efficient Resolution. A structured, six-phase approach to navigate complex disputes with precision."
          light
        />

        <div className="mt-8 sm:mt-12 md:mt-16 space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl md:rounded-[2rem] border transition-all duration-500",
                activeStep === i 
                  ? "bg-white/10 border-gold-500 shadow-[0_0_30px_-10px_rgba(191,154,102,0.1)]" 
                  : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
              )}
            >
              <button
                onClick={() => setActiveStep(i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 md:pr-8 text-left relative z-10"
              >
                <div className="flex items-center gap-4 md:gap-8 shrink-0">
                  <span className={cn(
                    "font-mono text-lg md:text-2xl transition-colors duration-500",
                    activeStep === i ? "text-gold-500 font-medium" : "text-white/20"
                  )}>
                    0{i + 1}
                  </span>
                  
                  <div>
                    {/* Mobile Only Label */}
                    <div className="md:hidden text-[9px] font-mono uppercase tracking-[0.3em] opacity-50 mb-1">{step.label}</div>
                    <h3 className={cn(
                      "text-lg sm:text-xl md:text-3xl font-light transition-colors duration-500 tracking-tight",
                      activeStep === i ? "text-white" : "text-white/60 group-hover:text-white/80"
                    )}>
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Desktop Roadmap Line & Label */}
                <div className="hidden md:flex items-center gap-6 px-8 grow opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                   <div className={cn("h-px grow transition-all duration-500", activeStep === i ? "bg-gold-500/50" : "bg-white/10")} />
                   <span className={cn(
                     "font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300",
                     activeStep === i ? "text-gold-500" : "text-white/30"
                   )}>
                     {step.label}
                   </span>
                </div>

                <div className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 shrink-0 ml-4 relative z-20 bg-navy-950 shadow-lg",
                  activeStep === i 
                    ? "bg-gold-500 border-gold-500 text-navy-950 rotate-90 scale-110" 
                    : "text-white/30 group-hover:border-white/30 group-hover:text-white group-hover:scale-105"
                )}>
                  {activeStep === i ? <ArrowRight className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                </div>
              </button>

              <AnimatePresence>
                {activeStep === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-4 md:px-6 pb-6 md:pb-8 pl-4 sm:pl-[3.5rem] md:pl-[6rem]">
                      <div className="h-px w-full bg-white/5 mb-4 md:mb-6" />
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-stretch">
                        <p className="text-base md:text-lg text-white/60 font-light leading-relaxed max-w-3xl py-1">
                          {step.description}
                        </p>
                        <div className="hidden md:flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 min-w-[100px] h-full group-hover:bg-white/10 transition-colors">
                          <step.icon className="w-6 h-6 text-gold-500" />
                          <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">Focus</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Checklist = () => (
  <section className="pt-16 pb-8 sm:pt-24 sm:pb-12 md:pt-32 md:pb-20 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16 md:mb-20">
        <span className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em] font-bold mb-4 block">
          Pre-Mediation Assessment
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-navy-950 tracking-tight leading-none mb-6">
          Is Your Case <span className="italic font-medium text-gold-500 underline decoration-gold-500/30 underline-offset-8">Fit</span> for <br className="hidden md:block"/> Mediation?
        </h2>
        <p className="text-lg sm:text-xl text-navy-950/40 font-light max-w-2xl mx-auto leading-relaxed">
          Before proceeding, evaluate these three critical dimensions to determine if formal mediation is the right strategic move for your dispute.
        </p>
      </div>

      {/* 3 Steps List */}
      <div className="max-w-5xl mx-auto mb-12 sm:mb-20 md:mb-28">
        {[
          {
            title: "Legal Suitability",
            question: "Is the dispute civil or commercial in nature and legally capable of settlement?",
            icon: Scale
          },
          {
            title: "Commercial Viability",
            question: "Does a negotiated settlement offer better business value than prolonged litigation?",
            icon: Briefcase
          },
          {
            title: "Party Willingness",
            question: "Are you prepared to invite the counter-party to a neutral orientation session?",
            icon: Users
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group py-6 sm:py-10 md:py-12 border-b border-navy-100 flex flex-col md:flex-row gap-4 sm:gap-8 md:items-start"
          >
             <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-navy-50 text-navy-950 flex items-center justify-center shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
               <span className="font-mono text-lg md:text-xl font-medium">0{i+1}</span>
             </div>
             
             <div className="grow grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 sm:gap-6 md:gap-12 items-baseline">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-navy-950 tracking-tight leading-tight group-hover:text-gold-500 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-navy-950/50 font-light leading-relaxed">
                  {item.question}
                </p>
             </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-navy-950 p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gold-500 text-[10px] font-mono tracking-widest uppercase mb-6 mx-auto md:mx-0">
             <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"/>
             Expert Review
          </div>
          <h3 className="text-3xl md:text-4xl font-light text-white mb-6">
            Unsure about your case?
          </h3>
          <p className="text-white/50 text-lg font-light leading-relaxed">
            Our Mediation Convenor can help you assess these criteria and design a process strategy tailored to your specific dispute.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
           <a 
             href="mailto:mediation@thepact.in"
             className="inline-flex items-center gap-4 bg-gold-500 text-navy-950 px-6 py-4 sm:px-8 sm:py-5 rounded-full font-medium hover:bg-white transition-all duration-300 shadow-[0_0_30px_-5px_rgba(191,154,102,0.3)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)] group"
           >
             <span>Speak to Convenor</span>
             <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
           </a>
        </div>
      </div>

    </div>
  </section>
);

const RulesAndFees = () => {
  const rules = [
    "Appointment and Replacement of Mediators",
    "Pre-Mediation Process Design",
    "Confidentiality & Privacy",
    "Role and Responsibilities of Lawyers or Experts",
    "Drafting of Mediation Settlement Agreement",
    "Timelines and Termination"
  ];
  
  const fees = [
    "When do Convening Phase Fees kick-in?",
    "What can you expect for Pre-Mediation Fees?",
    "Who pays the Fees?",
    "Why follow Transparent Fee Structure?",
    "How does Fees Refund Work?",
    "Why the Pre-Paid Fee Model?"
  ];

  return (
    <section className="pt-8 pb-16 sm:pt-12 sm:pb-32 bg-white border-b border-navy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <SectionHeader 
          subtitle="Governance" 
          title="Rules & Transparency"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-10 sm:mb-16 md:mb-24">
          <p className="text-xl md:text-2xl font-light text-navy-950/70 leading-relaxed tracking-tight">
            The process is conducted in accordance with established mediation principles, as prescribed by The Mediation Act, 2023 and The International Mediation Institute (IMI).
          </p>
          <div className="space-y-6 md:space-y-8">
            <p className="text-base md:text-lg font-light text-navy-950/40 italic leading-relaxed border-l-4 border-gold-500/50 pl-6 md:pl-10">
              Our rules ensure and protect the core tenets of mediation: confidentiality, voluntary participation, and impartial facilitation. We provide a neutral sanctuary for difficult conversations.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
               <div className="px-4 md:px-6 py-2 rounded-full bg-navy-50 text-[10px] font-mono text-navy-950/40 uppercase tracking-widest">Judicial Standards</div>
               <div className="px-4 md:px-6 py-2 rounded-full bg-navy-50 text-[10px] font-mono text-navy-950/40 uppercase tracking-widest">Global Best Practices</div>
            </div>
          </div>
        </div>

        {/* Cards Grid - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {/* Rules Card */}
            <div className="bg-navy-50 p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border border-navy-100 flex flex-col group hover:shadow-2xl transition-all duration-500 hover:bg-white hover:border-gold-500/20">
              <div className="flex items-center justify-between mb-8 md:mb-12">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-navy-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                  <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-gold-500" />
                </div>
                <div className="px-4 py-2 rounded-full bg-white border border-navy-50 text-[10px] font-bold uppercase tracking-[0.2em] text-navy-950/60">
                  Judicial Standard
                </div>
              </div>
              
              <h3 className="text-3xl font-light text-navy-950 mb-8">Procedural Rules</h3>
              
              <ul className="space-y-4 md:space-y-6 mb-10 md:mb-14 flex-grow">
                {rules.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-navy-950/70 font-light text-base md:text-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2.5 shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-5 bg-navy-950 text-white rounded-full flex items-center justify-center gap-3 hover:bg-gold-500 hover:text-navy-950 transition-all font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-xl group-hover:shadow-2xl">
                Download PACT Rules <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Fees Card */}
            <div className="bg-navy-50 p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border border-navy-100 flex flex-col group hover:shadow-2xl transition-all duration-500 hover:bg-white hover:border-gold-500/20">
              <div className="flex items-center justify-between mb-8 md:mb-12">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-navy-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                  <Scale className="w-7 h-7 md:w-8 md:h-8 text-gold-500" />
                </div>
                <div className="px-4 py-2 rounded-full bg-white border border-navy-50 text-[10px] font-bold uppercase tracking-[0.2em] text-navy-950/60">
                  Transparent Model
                </div>
              </div>
              
              <h3 className="text-3xl font-light text-navy-950 mb-8">Fee Structure</h3>

              <p className="text-navy-950/60 font-light mb-8 md:mb-10 text-lg md:text-xl italic tracking-tight leading-relaxed">
                Fees are structured to reflect nature and complexity, ensuring complete transparency.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6 mb-10 md:mb-14 flex-grow">
                {fees.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-navy-950/70 font-light text-sm md:text-base">
                    <div className="w-1.5 h-1.5 rounded-full bg-navy-300 mt-2 shrink-0 group-hover:bg-gold-500 transition-colors" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-5 border-2 border-navy-950/10 text-navy-950 rounded-full flex items-center justify-center gap-3 hover:bg-navy-950 hover:text-white transition-all font-bold uppercase tracking-widest text-[10px] md:text-xs">
                View Fee Details <Download className="w-4 h-4" />
              </button>
            </div>
        </div>
      </div>
    </section>
  );
};

const MediatorPanel = () => {
  const members = [
    {
      name: "Jonathan Rodrigues",
      expertise: "Commercial & Civil Mediation",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    },
    {
      name: "Kurian Joseph",
      expertise: "Retd. Judge, Supreme Court of India",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    },
    {
      name: "Gita Mittal",
      expertise: "Retd. Judge, Chief Justice (JKHC)",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    {
      name: "Ekta Bahl",
      expertise: "Corporate & Commercial Law",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <SectionHeader 
          subtitle="Expertise" 
          title="Mediator Panel"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-10 sm:mb-16 md:mb-24">
          <p className="text-xl md:text-2xl font-light text-navy-950/70 leading-relaxed tracking-tight">
            Our Mediator Panel comprises experienced and accredited professionals with diverse expertise across commercial, corporate, civil, and institutional disputes.
          </p>
          <div className="space-y-6 md:space-y-8">
            <p className="text-base md:text-lg font-light text-navy-950/40 italic leading-relaxed border-l-4 border-gold-500/50 pl-6 md:pl-10">
              Each mediator adheres to the highest standards of ethics, confidentiality, and procedural fairness. If parties prefer to meet the mediators before finalising their choice, this option is available in the Pre-Mediation Phase.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <div className="px-4 md:px-6 py-2 rounded-full bg-navy-50 text-[10px] font-mono text-navy-950/40 uppercase tracking-widest">Acredited Neutrals</div>
              <div className="px-4 md:px-6 py-2 rounded-full bg-navy-50 text-[10px] font-mono text-navy-950/40 uppercase tracking-widest">Global Expertise</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {members.map((member, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="group flex flex-col overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-navy-50/50 border border-navy-100/50"
            >
              <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110 filter md:grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-linear-to-t from-navy-950 via-navy-950/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                  <button className="w-full py-4 bg-white text-navy-950 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-2 hover:bg-gold-500 transition-colors shadow-2xl">
                    View Profile <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-6 md:p-8 text-center bg-white">
                <h3 className="text-xl md:text-2xl font-light text-navy-950 mb-1">{member.name}</h3>
                <p className="text-[10px] md:text-xs text-navy-950/40 font-mono tracking-widest uppercase">{member.expertise}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CASES_DATA = [
  {
    title: "Contractual Dispute",
    summary: "A commercial dispute – valued at INR 85Cr – arose between a supplier and a distributor concerning delayed payments and differing interpretations of exclusivity provisions.",
    challenge: [
      "Delayed payments strained cash flow and created pressure.",
      "Disagreement over the scope and meaning of exclusivity provisions.",
      "Tension and mistrust putting long-standing relationship at risk.",
      "Risk of escalation into litigation with high reputational costs."
    ],
    solution: "The parties entered confidential mediation to address financial constraints and operational realities. Through guided negotiation, they agreed on a structured payment plan and targeted amendments to clarify exclusivity terms.",
    costs: { hours: 35, weeks: 11, fees: "7 Lakh" },
    icon: Briefcase
  },
  {
    title: "Workplace Dispute",
    summary: "A mid-sized organisation faced internal disruption after a senior manager raised concerns about performance evaluations, followed by harassment claims.",
    challenge: [
      "Senior manager dissatisfied with performance vs junior employee attitude.",
      "Tension affecting team dynamics and productivity.",
      "Risk of formal grievances leading to bad press and investor concern."
    ],
    solution: "Mediation provided a safe forum to express concerns and expectations. The process identified communication gaps, leading to revised reporting structures and clear performance criteria.",
    costs: { hours: 12, weeks: 2, fees: "3 Lakh" },
    icon: MessageSquare
  },
  {
    title: "Construction Dispute",
    summary: "A major construction project encountered significant delays and cost overruns, leading to a dispute between developer and contractor over design responsibility.",
    challenge: [
      "Conflicting views on responsibility for design changes and site conditions.",
      "Deadlock increasing financial exposure and jeopardising completion targets.",
      "Likely escalation to formal proceedings causing further delay."
    ],
    solution: "Mediation examined project documents and site constraints. Parties clarified misunderstandings, aligned contractual interpretations, and agreed on a revised schedule and cost framework.",
    costs: { hours: 45, weeks: 15, fees: "12 Lakh (Claims value: 400 Cr)" },
    icon: Building2
  },
  {
    title: "Intellectual Property Dispute",
    summary: "Two tech companies disputed ownership and usage rights of software components developed during a limited collaboration. Both sought to avoid injunctive proceedings.",
    challenge: [
      "Conflicting positions on ownership and post-collaboration use.",
      "Need to protect proprietary technology while avoiding disruption.",
      "Uncertainty around product development and licensing plans."
    ],
    solution: "Parties shifted from legal ownership arguments to commercial objectives. They explored practical options for market participation, resulting in a negotiated licensing arrangement.",
    costs: { hours: 26, weeks: 4, fees: "4.5 Lakh" },
    icon: ShieldCheck
  },
  {
    title: "Insolvency Dispute",
    summary: "During insolvency, disagreements arose between applicant and stakeholders regarding payment timelines and claim treatment, threatening plan approval.",
    challenge: [
      "Differing expectations on payment timelines and claim treatment.",
      "Friction risking delay in plan approval and asset value erosion.",
      "High likelihood of objections and prolonged litigation."
    ],
    solution: "Focused dialogue alongside statutory processes resolved issues through modifies and clarifications to the resolution plan, ensuring IBC compliance.",
    costs: { hours: 35, weeks: 18, fees: "9 Lakh" },
    icon: Scale
  },
  {
    title: "Family Dispute",
    summary: "Five siblings disputed separation arrangements, financial responsibilities, and future care planning involving asset division and ongoing support.",
    challenge: [
      "Complex, emotionally charged issues around asset division and care.",
      "Strained communication and differing expectations between siblings.",
      "Risk of entrenched positions damaging long-term family stability."
    ],
    solution: "Virtual mediation (Zoom) allowed sibling group from diverse locations to focus on practical arrangements and financial clarity, prioritising family wellbeing over blame.",
    costs: { hours: 40, weeks: 13, fees: "5 Lakh" },
    icon: Home
  }
];

const CaseStudies = ({ onSelectCase }: { onSelectCase: (index: number) => void }) => {



  return (
    <section className="py-16 sm:py-20 md:py-32 bg-navy-950 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(191,154,102,0.08),transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <SectionHeader 
          subtitle="Success Stories" 
          title="Case Studies"
          description="Confidential summaries of resolved disputes, demonstrating outcomes, strategies, and best practices."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CASES_DATA.map((cs, i) => (
            <motion.div
              key={i}
              layoutId={`case-${i}`}
              onClick={() => onSelectCase(i)}
              className="group cursor-pointer bg-white/5 border border-white/10 p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold-500/5 blur-3xl rounded-full group-hover:bg-gold-500/10 transition-colors" />
              
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-500 shadow-xl">
                <cs.icon className="w-6 h-6 md:w-7 md:h-7 text-gold-500 group-hover:text-inherit" />
              </div>
              <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 group-hover:text-gold-500 transition-colors tracking-tight">{cs.title}</h3>
              <p className="text-white/40 text-base md:text-lg leading-relaxed line-clamp-3 font-light mb-8 md:mb-10 group-hover:text-white/60 transition-colors">
                {cs.summary}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-mono text-gold-500 uppercase tracking-[.3em] pt-6 md:pt-8 border-t border-white/10">
                View Case Analytics <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>


    </section>
  );
};

// --- Main Page ---

export default function MediationPage() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
        <div id="hero">
          <MediationHero />
        </div>
        
        <div id="puzzle">
          <PuzzlePieces />
        </div>
        
        <div id="provides">
          <PactProvides />
        </div>

        <div id="checklist">
          <Checklist />
        </div>

        <div id="rules">
          <RulesAndFees />
        </div>

        <div id="panel">
          <MediatorPanel />
        </div>

        <div id="case-studies">
          <CaseStudies onSelectCase={setSelectedCase} />
        </div>
        
        <Footer />
      </FadeIn>

      <AnimatePresence>
        {selectedCase !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={`case-${selectedCase}`}
              className="relative w-full max-w-6xl bg-white text-navy-950 border border-navy-100 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[85vh] md:max-h-[90vh] overflow-hidden"
            >
              <button 
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-navy-50 flex items-center justify-center hover:bg-navy-950 hover:text-white transition-all duration-300 z-50 shadow-md"
              >
                <Plus className="w-4 h-4 md:w-5 md:h-5 rotate-45" />
              </button>

              <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 custom-scrollbar">
                {/* Header */}
                <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-10 border-b border-navy-50 pb-6 md:pb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-navy-50 text-navy-950 flex items-center justify-center shrink-0">
                      {React.createElement(CASES_DATA[selectedCase].icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                    </div>
                    <div className="pr-8"> {/* Padding right to avoid overlap with close button on mobile */}
                      <span className="text-gold-600 font-mono text-[9px] md:text-[10px] tracking-widest uppercase block mb-1 font-bold">Confidential Case Profile</span>
                      <h3 className="text-lg sm:text-xl md:text-3xl font-light text-navy-950 leading-tight">{CASES_DATA[selectedCase].title}</h3>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-navy-950/80 font-light leading-relaxed">
                     {CASES_DATA[selectedCase].summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                  <div className="space-y-6 md:space-y-8">
                    {/* Challenge */}
                    <section>
                      <h4 className="text-[10px] font-bold text-navy-950/50 uppercase tracking-widest mb-4">The Challenge</h4>
                      <ul className="space-y-3">
                        {CASES_DATA[selectedCase].challenge.map((text, i) => (
                          <li key={i} className="flex gap-3 text-navy-950/80 font-light text-sm md:text-base leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0 mt-2" />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </section>
                    
                    {/* Stats */}
                    <section className="bg-white border border-navy-100 rounded-2xl p-5 md:p-6 shadow-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <p className="text-[10px] text-navy-950/50 font-bold uppercase mb-1">Time</p>
                          <p className="text-xl font-medium text-navy-950">{CASES_DATA[selectedCase].costs.weeks} <span className="text-[10px] font-normal text-navy-950/50">Wks</span></p>
                        </div>
                        <div>
                          <p className="text-[10px] text-navy-950/50 font-bold uppercase mb-1">Hours</p>
                          <p className="text-xl font-medium text-navy-950">{CASES_DATA[selectedCase].costs.hours} <span className="text-[10px] font-normal text-navy-950/50">Hrs</span></p>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                          <p className="text-[10px] text-navy-950/50 font-bold uppercase mb-1">Fee</p>
                          <p className="text-xl font-medium text-gold-600 break-words leading-tight">₹{CASES_DATA[selectedCase].costs.fees}</p>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="space-y-8">
                    {/* Solution */}
                    <section className="bg-navy-950 rounded-2xl p-6 md:p-8 relative overflow-hidden text-white h-full flex flex-col justify-between">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                       
                       <div className="relative z-10">
                         <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6">Resolution Strategy</h4>
                         <p className="text-base md:text-lg font-light text-white/90 leading-relaxed italic">
                           "{CASES_DATA[selectedCase].solution}"
                         </p>
                       </div>
                       
                       <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                         <p className="text-[10px] text-white/40 leading-relaxed">
                           *Anonymized summary for confidentiality.
                         </p>
                       </div>
                    </section>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
