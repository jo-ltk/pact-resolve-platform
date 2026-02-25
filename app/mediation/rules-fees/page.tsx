"use client";

import React from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  Scale, 
  Download, 
  Globe,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeInUp } from "@/components/motion-wrapper";
import { GrainOverlay } from "@/components/grain-overlay";
import { Footer } from "@/components/footer";

// --- Components ---

const SectionHeader = ({ subtitle, title, description, light = false, center = false }: { subtitle: string, title: string, description?: string, light?: boolean, center?: boolean }) => (
  <FadeInUp className={cn("mb-8 md:mb-16", center ? "flex flex-col items-center text-center" : "")}>
    <div className="inline-flex items-center gap-4 mb-4 opacity-70">
      <span className={cn("text-xs md:text-xs  tracking-[0.4em] uppercase", light ? "text-white" : "text-navy-950")}>{subtitle}</span>
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

const RulesHero = () => (
  <section className="relative min-h-[50vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 bg-navy-950 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <Image
        src="/hero/hero_mediation.png"
        alt="Rules & Fees"
        fill
        className="object-cover opacity-20 scale-105"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy-950/40 via-navy-950/90 to-navy-950" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <FadeInUp>
        <div className="flex items-center gap-3 mb-4 sm:mb-6 md:mb-8">
          <div className="h-px w-8 md:w-12 bg-gold-500" />
          <span className="text-gold-500  text-xs md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">
            – Standards and Transparency Guaranteed
          </span>
        </div>
        <h1 className="page-title text-4xl xs:text-5xl sm:text-7xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 select-none italic">
          RULES & FEE
        </h1>
        <div className="max-w-4xl">
           <p className="text-lg sm:text-2xl md:text-3xl text-white/90 font-light leading-snug tracking-tight mb-8">
              A trendsetter in Mediation Process Design, PACT relies on bespoke case management, quality mediators and best practices for client satisfaction.
           </p>
           <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">
              Our mediation services are governed by clear, transparent procedures designed to ensure fairness, neutrality, and efficiency. The process is conducted in accordance with established mediation principles, including confidentiality, voluntary participation, and impartial facilitation, as prescribed by The Mediation Act, 2023 and The International Mediation Institute (IMI).
           </p>
        </div>
      </FadeInUp>
    </div>
  </section>
);

const RulesSection = () => {
  const rules = [
    { title: "Mediator Selection", desc: "Transparent appointment and replacement protocols ensuring neutral expertise." },
    { title: "Process Design", desc: "Customized pre-mediation frameworks tailored to the specific nature of the dispute." },
    { title: "Confidentiality", desc: "Absolute privacy protections for all communications, documents, and proceedings." },
    { title: "Legal Counsel", desc: "Clearly defined roles for lawyers and experts to foster a collaborative environment." },
    { title: "Settlement Drafting", desc: "Precision in documenting agreements for enforceability under the Mediation Act." },
    { title: "Termination", desc: "Structured timelines and voluntary exit protocols for efficiency and control." }
  ];

  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Cinematic Image First */}
        <FadeInUp className="mb-20 md:mb-32">
          <div className="relative aspect-video md:aspect-21/9 rounded-4xl md:rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-navy-50 ring-1 ring-navy-950/5 group">
            <Image 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" 
              alt="Mediation Rules"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-transparent to-transparent opacity-60" />
            

            
            <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 max-w-md">
               <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
                 Our rules ensure a safe harbor for dialogue, governed by global neutrality standards.
               </p>
            </div>
          </div>
        </FadeInUp>

        {/* Text and Rules Below */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <SectionHeader 
              subtitle="Procedural Integrity" 
              title="PACT Mediation Rules"
              description="A framework built on neutrality, privacy, and international best practices."
            />
            <div className="mt-8">
               <button className="group flex items-center gap-4 px-10 py-5 bg-navy-950 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-navy-950 transition-all shadow-2xl">
                  Download Rules <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
               </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {rules.map((rule, i) => (
              <FadeInUp key={i} delay={i * 0.1}>
                <div className="p-10 rounded-[2.5rem] bg-navy-50/50 border border-transparent hover:border-gold-500/20 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-white text-gold-500 flex items-center justify-center mb-6 group-hover:bg-navy-950 group-hover:scale-110 transition-all shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-navy-950 mb-4 uppercase italic tracking-tight">{rule.title}</h4>
                  <p className="text-navy-950/50 text-sm font-light leading-relaxed">{rule.desc}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeesSection = () => {
  const fees = [
    { title: "All-Inclusive", desc: "Clarity on administrative, convening fees and stage-wise fee structure for the entire mediation experience" },
    { title: "Pre-Mediation", desc: "Transparent breakdown of sessions and process design costs before joint meetings." },
    { title: "Fee Split", desc: "Fees are usually split equally between all sides unless otherwise (explicitly) agreed upon by parties involved" },
    { title: "No Hidden Costs", desc: "Clearly defined protocols for fee adjustments in cases whether mediation is terminated pre-maturely" },
    { title: "Refund Policy", desc: "Clearly defined protocols for fee adjustments in cases of early resolution." },
    { title: "Pre-Paid", desc: "Fees are pre-paid, fixed and predictable ensuring financial transparency at every step of the process" }
  ];

  return (
    <section className="py-24 md:py-40 bg-navy-950 text-white relative overflow-hidden dark">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Cinematic Image First */}
        <FadeInUp className="mb-20 md:mb-32">
          <div className="relative aspect-video md:aspect-21/9 rounded-4xl md:rounded-[5rem] overflow-hidden shadow-2xl bg-white/5 ring-1 ring-white/10 group">
            <Image 
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80" 
              alt="Mediation Fees"
              fill
              className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent opacity-80" />
            
             <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 max-w-xl">
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
                  Our fee structure is designed to reflect value and ensure that costs are never a barrier to resolution.
                </p>
             </div>
          </div>
        </FadeInUp>

        {/* Text and Fees Below */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <SectionHeader 
              subtitle="Financial Transparency" 
              title="The Mediation Fee"
              description="A clear and bespoke fee framework so you know exactly what you are investing in"
              light
            />
            <div className="mt-8">
               <button className="group flex items-center gap-4 px-10 py-5 bg-white text-navy-950 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold-500 transition-all shadow-2xl">
                  Fee Schedule <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
               </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {fees.map((fee, i) => (
              <FadeInUp key={i} delay={i * 0.1}>
                <div className="p-10 rounded-[2.5rem] bg-white/3 border border-white/10 hover:border-gold-500/40 hover:bg-white/[0.07] transition-all duration-700 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 text-gold-500 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-navy-950 group-hover:scale-110 transition-all border border-white/5 shadow-sm">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4 uppercase italic tracking-tight group-hover:text-gold-500 transition-colors">{fee.title}</h4>
                  <p className="text-white/40 text-sm font-light leading-relaxed group-hover:text-white/60 transition-colors">{fee.desc}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function RulesFeesPage() {
  return (
    <main className="relative min-h-screen w-full bg-white overflow-x-hidden">
      <GrainOverlay />
      <RulesHero />
      <RulesSection />
      <FeesSection />
      <Footer />
    </main>
  );
}
