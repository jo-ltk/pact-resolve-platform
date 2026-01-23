"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  PlayCircle,
  FileText,
  Award,
  CheckCircle2,
  Users,
  Mail,
  Scale,
  Globe,
  Sparkles,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { GrainOverlay } from "@/components/grain-overlay";
import { Footer } from "@/components/footer";
import { MagneticButton } from "@/components/magnetic-button";
import { Collaborators } from "@/components/sections/home/collaborators";

// --- Reusable Components ---

const SectionHeader = ({ subtitle, title, description, dark = false, center = false }: { subtitle: string, title: string, description?: string, dark?: boolean, center?: boolean }) => (
  <FadeInUp className={cn("mb-12 md:mb-20", center ? "flex flex-col items-center text-center" : "")}>
    <div className="inline-flex items-center gap-4 mb-6 opacity-80">
      <div className={cn("h-px w-12 bg-gold-500", dark ? "bg-gold-500" : "bg-gold-500/50")} />
      <span className={cn("text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase font-bold", dark ? "text-gold-500" : "text-navy-950/60")}>{subtitle}</span>
    </div>
    <h2 className={cn("text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-light tracking-tight mb-8 leading-[0.95]", dark ? "text-white" : "text-navy-950")}>
      {title.split(' ').map((word, i) => (
        <span key={i} className={cn(word.toLowerCase() === 'arbitration' || word.toLowerCase() === 'team' || word.toLowerCase() === 'advocacy' ? "text-gold-500 italic font-medium" : "")}>
          {word}{' '}
        </span>
      ))}
    </h2>
    {description && (
      <p className={cn("max-w-3xl text-lg sm:text-xl md:text-2xl font-light leading-relaxed", dark ? "text-white/50" : "text-navy-950/50")}>
        {description}
      </p>
    )}
  </FadeInUp>
);

const CurriculumRoadmap = ({ modules, type, dark = false }: { modules: { title: string; content: string }[], type: string, dark?: boolean }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-4 w-full">
      {modules.map((module, i) => (
        <motion.div
           key={i}
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: i * 0.05 }}
           className={cn(
             "group relative overflow-hidden rounded-3xl md:rounded-[2rem] border transition-all duration-500",
             activeStep === i 
               ? (dark ? "bg-white/10 border-gold-500 shadow-[0_0_30px_-10px_rgba(191,154,102,0.1)]" : "bg-navy-950 border-gold-500 shadow-2xl") 
               : (dark ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10" : "bg-white border-navy-100 hover:border-gold-500/30 hover:bg-navy-50/50 shadow-xs")
           )}
        >
           <button
             onClick={() => setActiveStep(i)}
             className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 md:pr-8 text-left relative z-10"
           >
             <div className="flex items-center gap-4 md:gap-8 grow min-w-0">
                <span className={cn(
                  "font-mono text-lg md:text-2xl transition-colors duration-500 shrink-0",
                  activeStep === i ? "text-gold-500 font-medium" : (dark ? "text-white/20" : "text-navy-900/10")
                )}>
                  0{i + 1}
                </span>
                
                <div className="min-w-0 flex items-center gap-6 grow">
                  <h3 className={cn(
                    "text-lg sm:text-xl md:text-3xl font-light transition-colors duration-500 tracking-tight",
                    activeStep === i ? "text-white" : (dark ? "text-white/60" : "text-navy-900/40 group-hover:text-navy-900")
                  )}>
                    {module.title.includes(': ') ? module.title.split(': ')[1] : module.title}
                  </h3>
 
                  <div className="hidden md:flex items-center gap-6 px-8 grow opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className={cn("h-px grow transition-all duration-500", activeStep === i ? "bg-gold-500/50" : (dark ? "bg-white/10" : "bg-navy-100"))} />
                    <span className={cn(
                      "font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300",
                      activeStep === i ? "text-gold-500" : (dark ? "text-white/30" : "text-navy-900/20")
                    )}>
                      {type} Phase
                    </span>
                  </div>
                </div>
             </div>
 
             <div className={cn(
               "w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ml-4 relative z-20 shadow-lg",
               activeStep === i 
                 ? "bg-gold-500 border-gold-500 text-navy-950 rotate-90 scale-110" 
                 : (dark ? "bg-navy-950 border-white/10 text-white/30 group-hover:border-white/30 group-hover:text-white" : "bg-white border-navy-100 text-navy-200 group-hover:border-gold-500 group-hover:text-gold-500")
             )}>
               <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
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
                 <div className="px-4 md:px-6 pb-6 md:pb-10 pl-4 sm:pl-[3.5rem] md:pl-[6rem]">
                   <div className={cn("h-px w-full mb-6 md:mb-8", dark ? "bg-white/5" : "bg-navy-950/5")} />
                   <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-start">
                     <p className={cn(
                       "text-base md:text-xl font-light leading-relaxed max-w-4xl py-1",
                       dark ? "text-white/60" : "text-white/70"
                     )}>
                       {module.content}
                     </p>
                     
                     <div className={cn(
                       "hidden lg:flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border transition-all duration-500 min-w-[120px]",
                       dark ? "bg-white/5 border-white/10 group-hover:bg-white/10" : "bg-white/5 border-white/10 group-hover:bg-white/10 shadow-lg"
                     )}>
                        <Video className="w-6 h-6 text-gold-500" />
                        <span className={cn("text-[9px] font-mono uppercase tracking-widest font-bold", dark ? "text-white/40" : "text-white/40")}>Streamable</span>
                     </div>
                   </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

// --- Hero Section ---
const ArbitrationHero = () => (
  <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 bg-navy-950 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <Image
        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" 
        alt="Arbitration Academy"
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
            Academy / Arbitration
          </span>
        </div>
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 select-none italic">
          ARBITRATION
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="space-y-6 md:space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed">
              The Global Academy for Advocacy in Dispute Resolution (GAADR) is PACT&apos;s academic wing, dedicated to high quality training and certification programmes. PACT collaborates with the best in the business to curate customised training modules and deliver practical and thought-provoking programmes.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
                <MagneticButton variant="primary" size="lg" className="group">
                    <Link href="#courses" className="flex items-center gap-2">
                        Explore Courses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </MagneticButton>
                <a href="mailto:academy@thepact.in" className="flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <Mail className="w-5 h-5 text-gold-500" />
                    <span className="text-sm font-medium text-white/90">academy@thepact.in</span>
                </a>
            </div>
          </div>
          <div className="relative group hidden lg:block">
            <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <p className="text-xl text-white/70 font-light italic leading-relaxed">
                Got a query? Email – academy@thepact.in
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-gold-500" />
                </div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Global Learning Network</span>
              </div>
            </div>
          </div>
        </div>
      </FadeInUp>
    </div>
  </section>
);

export default function ArbitrationPage() {
  // Foundation Course Modules - EXACT CONTENT
  const foundationModules = [
    {
      title: "Module 1: Arbitration Advocacy Essentials",
      content: "A comprehensive overview of Arbitration Lifecycle in 8 Steps; Who Does What: Tribunal, Counsel, Parties, Institution; Key Documents; Core Skills: Clarity, Strategy, Credibility"
    },
    {
      title: "Module 2: Understanding the Forum and Rules",
      content: "Ad Hoc v. Institutional Arbitration (Why It Matters); Seat, Venue, Governing Law: The Practical Meaning; Rules 101: Timelines, Powers, Discretion; Procedural Orders: What They Are and How They Are Used; Soft Law Basics: IBA Guidelines (Evidence, Conflicts)"
    },
    {
      title: "Module 3: Case Theory and Strategy – From Facts to Theory",
      content: "Building Your 'Case Story'; Claims, Defences, Counterclaims: Simple Structure; Burden and Standard of Proof (Advocacy Implications); Issue Spotting: What Really Needs Proving; Strategy Map: Win Themes & Risk Themes"
    },
    {
      title: "Module 4: Written Advocacy Fundamentals",
      content: "Pleadings v. Submissions: What's the Difference? Writing for Arbitrators: Style That Works; Organizing Submissions: Issues → Law → Facts → Proof; Using Authorities & Exhibits Without Overloading; Drafting Relief: Precision in What You Ask For"
    },
    {
      title: "Module 5: Evidence Basics in Arbitration",
      content: "Document-Heavy Reality: How Arbitrations Are Proven; Document Requests; Witness Statements: Purpose, Structure, Pitfalls; Experts: When You Need Them and How They Persuade; Admissibility v. Weight: How Tribunals Think"
    },
    {
      title: "Module 6: Hearing Advocacy (Your First Hearing Toolkit)",
      content: "Hearing Formats: In-Person, Virtual, Hybrid; Opening Statement: Structure That Lands; Direct/Chief Examination in Arbitration; Cross-Examination: Control Without Drama; Closing Submissions: The 5-Part Persuasion Model"
    },
    {
      title: "Module 7: Procedure, Professionalism, and Ethics",
      content: "Civility and Credibility: 'Arbitration Courtroom' Norms; Conflicts and Disclosure: Basic Red Flags; Ex-Parte, Communications, and Boundaries; Dealing With Delays and Non-Cooperation; Confidentiality: What It Covers (and What It Doesn't)"
    },
    {
      title: "Module 8: Capstone (Basic)",
      content: "Mini-Case Walkthrough: Facts → Issues → Proof Plan; Draft a One-Page Case Theory & Relief; Mini-Opening: 2 Minutes That Persuade; Mini-Cross: 10 Questions with a Goal; Mini-Closing: Bringing It Home"
    }
  ];

  // Certificate Course Modules - EXACT CONTENT
  const advancedModules = [
    {
      title: "Module 1: Advanced Case Strategy and Persuasion",
      content: "Tribunal Psychology: How Arbitrators Process Cases; Theme Engineering: Building 'Sticky' Case Narratives; Concession Strategy: What to Give Up to Win More; Risk Register: Quantifying Weak Spots Early; Sequencing: When to Push, When to Hold"
    },
    {
      title: "Module 2: Arbitration-Specific Motion Practice",
      content: "Jurisdictional Objections: Timing and Framing; Interim Measures: Tests, Evidence, and Urgency; Security for Costs: Practical Playbook; Bifurcation: Winning the Structure Fight; E-Discovery & Adverse Inference: Tactical Use"
    },
    {
      title: "Module 3: High-Impact Written Advocacy",
      content: "The 'Issue-First' Method for Complex Arbitrations; Using Demonstratives in Written Submissions; Authority Strategy: Fewer, Better, Deadlier Citations; Damages Submissions: Logic Trees & Proof; Reply/Rejoinder: Controlled Aggression Without Noise"
    },
    {
      title: "Module 4: Witness Advocacy Mastery",
      content: "Witness Preparation: Ethical Boundaries & Best Practice; Statement Architecture: Fact, Context, Corroboration; Cross-Examination Systems: Control, Contradiction, Concession; Impeachment with Documents: Timing and Technique; Re-Direct: Repair Without Repeating"
    },
    {
      title: "Module 5: Expert Evidence and Quantification",
      content: "Choosing Experts: Independence, Communication, Persuasion; Hot-Tubbing / Concurrent Evidence: How to Win It; Attacking Methodology: Reliability Without Jargon; Valuation & Damages: Presenting Numbers Clearly; Expert Cross: Simple Questions That Collapse Complexity"
    },
    {
      title: "Module 6: Hearing Advocacy at Full Speed",
      content: "Elite Openings: The 'Roadmap & Proof Promise' Model; Real-Time Adaptation: Reading the Tribunal Live: Objections in Arbitration: Rare but High-Leverage; Demonstratives: Slides, Chronologies, and Hearing Bundles; Elite Closings: Findings, Law, and Relief That Fits"
    },
    {
      title: "Module 7: Multiparty, Multi-Contract, and Complex Procedure",
      content: "Joinder and Consolidation: Strategy and Risk; Parallel Proceedings: Courts, Regulators, Other Arbitrations; Third-Party Funding: Disclosure and Tactics; Privilege Across Borders: Handling Conflicts; Language, Translation, and Cultural Advocacy"
    },
    {
      title: "Module 8: Award Strategy, Challenges, and Enforcement",
      content: "Drafting the Record: Helping the Tribunal Write a Strong Award; Post-Hearing Briefs: When They Help (and When They Hurt); Correction, Interpretation, Additional Awards; Set-Aside/Annulment: How Challenges Are Actually Won/Lost Enforcement Strategy: Assets, Timing, Resistance"
    },
    {
      title: "Module 9: Specialised Advocacy Tracks",
      content: "Commercial Contracts Advocacy; Construction Arbitration Advocacy; Shareholder & JV Disputes; Investor-State Style Advocacy Skills; Emergency Arbitration Advocacy"
    },
    {
      title: "Module 10: Capstone (Advanced)",
      content: "Full Case Blueprint; Procedural Fight Simulation; Witness & Expert Sequence Plan; Hearing Script; Post-Hearing Strategy"
    }
  ];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <GrainOverlay />
      <ArbitrationHero />

      {/* Section: Train Your Team */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <FadeInUp>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-navy-50 text-[10px] font-mono text-navy-950/40 uppercase tracking-widest mb-4">Corporate Training</div>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight text-navy-950 mb-6">
                Train Your <span className="text-gold-500 italic font-medium">Team</span>
              </h2>
              <p className="text-lg text-navy-950/60 leading-relaxed max-w-2xl">
                PACT offers customised in-person trainings in Arbitration and Arbitration Advocacy (1-Day / 2-Day) as per preferences of the client. We collaborate with industry experts and leading international organisations to bring you the best practical knowledge and exercises.
              </p>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { title: "Customised Modules", icon: FileText },
                { title: "Relatable Roleplays", icon: Users },
                { title: "Skilled Trainers", icon: Award },
                { title: "Relevant Case Studies", icon: CheckCircle2 }
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-navy-50/50 border border-navy-100/50 group hover:bg-white hover:shadow-lg transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gold-500 shadow-sm group-hover:bg-gold-500 group-hover:text-white transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-navy-950">{item.title}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInUp delay={0.4} className="pt-8">
              <p className="text-sm font-mono uppercase tracking-widest text-navy-950/40 mb-4">Contact Us</p>
              <a href="mailto:academy@thepact.in" className="text-2xl md:text-3xl font-light text-navy-950 hover:text-gold-500 transition-colors">
                Write to us at – <span className="underline decoration-gold-500/30">academy@thepact.in</span>
              </a>
            </FadeInUp>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
             <div className="relative aspect-square rounded-4xl overflow-hidden border border-navy-100 shadow-2xl">
               <Image 
                 src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" 
                 alt="Arbitration Training" 
                 fill 
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-navy-950/20" />
             </div>
          </div>
        </div>
      </section>

      {/* Section: Foundation Course in Arbitration */}
      <section id="courses" className="py-24 md:py-40 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <SectionHeader 
            subtitle="Online Courses" 
            title="Foundation Course in Arbitration"
            description=""
            center
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20 items-start mb-32">
            <div className="space-y-10">
               <div className="flex items-baseline gap-6 border-b border-navy-100 pb-8">
                 <span className="text-[10px] font-mono text-gold-600 uppercase tracking-[0.5em] font-bold">I.</span>
                 <p className="text-2xl md:text-4xl text-navy-950 font-light tracking-tight">Foundation Course in <span className="text-gold-500 italic font-medium">Arbitration</span></p>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 <div className="space-y-2">
                   <span className="text-[9px] font-mono text-navy-950/30 uppercase tracking-widest block font-bold">Mode</span>
                   <p className="text-lg text-navy-950/70 font-light">Online (20 Videos)</p>
                 </div>
                 <div className="space-y-2">
                   <span className="text-[9px] font-mono text-navy-950/30 uppercase tracking-widest block font-bold">Live Session</span>
                   <p className="text-lg text-navy-950/70 font-light">Orientation + Q&amp;A</p>
                 </div>
                 <div className="space-y-2">
                   <span className="text-[9px] font-mono text-navy-950/30 uppercase tracking-widest block font-bold">Assessment</span>
                   <p className="text-lg text-navy-950/70 font-light">Quiz</p>
                 </div>
                 <div className="space-y-2">
                   <span className="text-[9px] font-mono text-navy-950/30 uppercase tracking-widest block font-bold">Certification</span>
                   <p className="text-lg text-navy-950/70 font-light">Yes</p>
                 </div>
               </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-navy-50/50 border border-navy-100 backdrop-blur-xl relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-gold-500/10 to-transparent rounded-[2.6rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <h5 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-navy-950/40">Fee</h5>
                    <Sparkles className="w-5 h-5 text-gold-500" />
                  </div>
                  <div className="mb-8">
                    <p className="text-5xl font-light text-navy-950 mb-2 tracking-tighter">INR 5,000 <span className="text-sm font-mono text-navy-950/20">+ GST</span></p>
                  </div>
                  <MagneticButton variant="primary" size="lg" className="w-full">
                    <Link href="#" className="w-full flex justify-center py-2 text-base font-bold uppercase tracking-widest">Sign Up</Link>
                  </MagneticButton>
                </div>
            </div>
          </div>

          {/* Training Modules Header */}
          <div className="space-y-4">
             <div className="flex items-center gap-6 mb-12">
                <div className="h-px bg-navy-100 grow" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-navy-950/20 font-bold italic">Training Modules</span>
                <div className="h-px bg-navy-100 grow" />
             </div>
             <CurriculumRoadmap modules={foundationModules} type="Foundation" />
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-navy-100/50" />

      {/* Section: Certificate Course in Arbitration Advocacy */}
      <section className="py-24 md:py-40 bg-navy-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <SectionHeader 
            subtitle="Advanced Certification" 
            title="Certificate Course in Arbitration Advocacy"
            description=""
            dark
            center
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20 items-start mb-20">
            <div className="space-y-10">
               <div className="flex items-baseline gap-6 border-b border-white/5 pb-8">
                 <span className="text-[10px] font-mono text-gold-500/60 uppercase tracking-[0.5em] font-bold">II.</span>
                 <p className="text-2xl md:text-4xl text-white font-light tracking-tight">Certificate Course in <span className="text-gold-500 italic font-medium">Arbitration Advocacy</span></p>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 <div className="space-y-2">
                   <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block">Mode</span>
                   <p className="text-lg text-white/80 font-light">Online (40 Videos)</p>
                 </div>
                 <div className="space-y-2">
                   <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block">Live Session</span>
                   <p className="text-lg text-white/80 font-light">Orientation + Q&amp;A</p>
                 </div>
                 <div className="space-y-2">
                   <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block">Assessment</span>
                   <p className="text-lg text-white/80 font-light">Quiz + Exercises</p>
                 </div>
                 <div className="space-y-2">
                   <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block">Certification</span>
                   <p className="text-lg text-white/80 font-light">Certified Arbitration Counsel</p>
                 </div>
               </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-gold-500/20 to-transparent rounded-[2.6rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <h5 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-gold-500/60">Fee</h5>
                    <Award className="w-5 h-5 text-gold-500" />
                  </div>
                  <div className="mb-8">
                    <p className="text-5xl font-light text-white mb-2 tracking-tighter">INR 10,000 <span className="text-sm font-mono text-white/20">+ GST</span></p>
                  </div>
                  <MagneticButton variant="primary" size="lg" className="w-full">
                    <Link href="#" className="w-full flex justify-center py-2 text-base font-bold uppercase tracking-widest">Sign Up</Link>
                  </MagneticButton>
                </div>
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-6 mb-12">
                <div className="h-px bg-white/10 grow" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 font-bold italic">Training Modules</span>
                <div className="h-px bg-white/10 grow" />
             </div>
             <CurriculumRoadmap modules={advancedModules} type="Advanced" dark />
          </div>
        </div>
      </section>

      {/* Section: Faculty */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            subtitle="Expert Network" 
            title="Faculty"
            description=""
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Faculty Member 1", role: "Expert Arbitrator", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
              { name: "Faculty Member 2", role: "Senior Counsel", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" }
            ].map((faculty, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-3/4 rounded-4xl overflow-hidden border border-navy-100 mb-6 transition-all duration-500 group-hover:shadow-2xl">
                  <Image src={faculty.image} alt={faculty.name} fill className="object-cover md:grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>
                <h4 className="text-xl font-medium text-navy-950 mb-1">{faculty.name}</h4>
                <p className="text-sm font-mono uppercase tracking-widest text-gold-500 font-bold">{faculty.role}</p>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center p-8 rounded-4xl border-2 border-dashed border-navy-100 bg-slate-50/50">
               <p className="text-navy-950/30 font-medium text-center italic">Faculty Profiles<br/>Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Collaborators */}
      <div className="border-t border-navy-100/50">
        <Collaborators />
      </div>

      <Footer />
    </main>
  );
}
