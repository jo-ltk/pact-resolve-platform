"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  ArrowRight, 
  Briefcase, 
  MessageSquare, 
  Building2, 
  ShieldCheck, 
  Scale, 
  Home,
  Clock,
  Timer,
  Globe,
  Handshake,
  Sparkles,
  Users,
  Calendar,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeInUp, FadeIn } from "@/components/motion-wrapper";
import { GrainOverlay } from "@/components/grain-overlay";
import { Footer } from "@/components/footer";

// --- Icon Resolver ---
const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Briefcase, MessageSquare, Building2, ShieldCheck, Scale, Home, Clock, Timer, Globe, Handshake, Sparkles, Users, Calendar, FileText
  };
  return icons[iconName] || Briefcase;
};

// --- Fallback Data ---
const CASES_DATA_FALLBACK = [
  {
    title: "Contractual Dispute",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
    summary: "[Circa: 2022, New Delhi] A commercial dispute – valued at INR 85Cr – arose between a supplier and a distributor concerning delayed payments and differing interpretations of exclusivity provisions in a long-standing agreement.",
    challenge: [
      "Delayed payments strained cash flow and created pressure on both parties.",
      "There was disagreement over the scope and meaning of the contract’s exclusivity provisions."
    ],
    solution: "The parties entered a confidential mediation to address financial constraints, operational realities, and the original intent of the exclusivity provisions.",
    costs: { hours: 35, weeks: 11, fees: "7 Lakh", value: "INR 85 Cr" },
    iconName: "Briefcase"
  },
  {
    title: "Workplace Dispute",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    summary: "[Circa: 2021, Bengaluru] A mid-sized organisation faced internal disruption after a senior manager raised concerns about performance evaluations.",
    challenge: [
      "Tension had begun to affect team dynamics, office atmosphere and productivity.",
      "Risk of escalation into formal grievances or legal proceedings."
    ],
    solution: "The organisation initiated a confidential mediation between the senior manager and the employee, providing a safe and structured forum.",
    costs: { hours: 12, weeks: 2, fees: "3 Lakh", value: "Employment Preservation" },
    iconName: "MessageSquare"
  },
  {
    title: "Construction Dispute",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80",
    summary: "[Circa: 2024, Mumbai / New Delhi] A major construction project encountered significant delays and cost overruns, which led to a dispute between the developer and the contractor.",
    challenge: [
      "Developer and contractor had conflicting views on responsibility for design changes.",
      "Deadlock leading to work slowing or stopping, increasing financial exposure."
    ],
    solution: "Mediation brought the parties together in a neutral setting to review project documents, timelines, and on-site constraints.",
    costs: { hours: 45, weeks: 15, fees: "12 Lakh", value: "400 Crore Claims" },
    iconName: "Building2"
  },
  {
    title: "Intellectual Property Dispute",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80",
    summary: "[Circa: 2025, Bangalore / Mumbai] A dispute arose between two technology companies over the ownership and usage rights of software components developed during a limited collaboration.",
    challenge: [
      "Conflicting positions on ownership and post-collaboration use of software.",
      "Need to avoid injunctive proceedings and commercial uncertainty."
    ],
    solution: "Through mediation, the parties shifted from narrow legal ownership arguments to a focus on commercial objectives and risk.",
    costs: { hours: 26, weeks: 4, fees: "4.5 Lakh", value: "Licensing Agreement" },
    iconName: "ShieldCheck"
  },
  {
    title: "Insolvency Mediation",
    image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80",
    summary: "[Circa: 2018, New Delhi / Hyderabad] During an ongoing insolvency resolution process, disagreements arose between the resolution applicant and certain stakeholders.",
    challenge: [
      "Differing expectations on payment timelines and treatment of specific claims.",
      "Risk of delay in plan approval and erosion of stakeholder value."
    ],
    solution: "Mediation brought the resolution applicant and key stakeholders into a focused, confidential dialogue alongside the statutory process.",
    costs: { hours: 35, weeks: 18, fees: "9 Lakh", value: "Stakeholder Consensus" },
    iconName: "Scale"
  },
  {
    title: "Family Mediation",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80",
    summary: "[Circa: 2023, New Delhi / Goa / Dubai / San Francisco] A family dispute arose concerning separation arrangements, financial responsibilities, and future care planning.",
    challenge: [
      "Complex, emotionally charged issues around asset division and care responsibilities.",
      "Strained communication and differing expectations between family members."
    ],
    solution: "Mediation offered a structured, private forum to address both financial and relational issues.",
    costs: { hours: 40, weeks: 13, fees: "5 Lakh", value: "Preservation of Relationships" },
    iconName: "Home"
  },
  {
    title: "Shareholder Exit Dispute",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
    summary: "[Circa: 2023, Mumbai] A high-stakes dispute between majority and minority shareholders concerning valuation and exit terms in a growing tech firm.",
    challenge: [
      "Conflicting valuations of the minority stake and deadlock in decision-making.",
      "Strained personal relationships between founders threatening operational stability."
    ],
    solution: "Mediation allowed for a structured exit plan and share transfer that preserved the company's value and ensured a professional break for the outgoing party.",
    costs: { hours: 25, weeks: 8, fees: "6 Lakh", value: "120 Cr Share Transfer" },
    iconName: "Handshake"
  }
];

// --- Components ---

const CaseHero = () => (
  <section className="relative min-h-[50vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 bg-navy-950 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <Image
        src="/hero/hero_mediation.png"
        alt="Case Studies"
        fill
        className="object-cover opacity-20 scale-105"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy-950/40 via-navy-950/90 to-navy-950" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full text-center">
      <FadeInUp>
        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6 md:mb-8">
          <div className="h-px w-8 md:w-12 bg-gold-500" />
          <span className="text-gold-500 font-mono text-xs md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">
            Mediation / Case Studies
          </span>
          <div className="h-px w-8 md:w-12 bg-gold-500" />
        </div>
        <h1 className="page-title text-4xl xs:text-5xl sm:text-7xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 select-none italic">
          CASE STUDIES
        </h1>
        <div className="max-w-4xl mx-auto">
           <p className="text-lg sm:text-2xl md:text-3xl text-white/90 font-light leading-snug tracking-tight mb-8">
              A trendsetter in Mediation Process Design, PACT relies on bespoke case management, quality mediators and best practices for client satisfaction.
           </p>
           <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">
              We hope these case studies help make the mediation process more relatable and practical. Our aim is to build confidence by demonstrating outcomes, strategies, and best practices, enabling you to make informed decisions and engage more effectively in mediation. Strict confidentiality has been maintained while narrating the highlights through anonymisation and consent.
           </p>
        </div>
      </FadeInUp>
    </div>
  </section>
);

export default function CaseStudiesPage() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [cases, setCases] = useState<any[]>(CASES_DATA_FALLBACK);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/content/mediation/case-studies");
        const json = await res.json();
        if (json.success && json.data?.length > 0) setCases(json.data);
      } catch (e) {
        console.error("Error fetching case-studies:", e);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-white overflow-x-hidden">
      <GrainOverlay />
      <CaseHero />
      
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cases.map((cs, i) => (
                <motion.div
                  key={i}
                  layoutId={`case-${i}`}
                  onClick={() => setSelectedCase(i)}
                  className="group cursor-pointer relative aspect-square rounded-[2.5rem] overflow-hidden border border-navy-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                   <Image 
                     src={cs.image} 
                     alt={cs.title} 
                     fill 
                     className="object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-navy-950/40 group-hover:bg-navy-950/60 transition-colors" />
                   <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                      <div className="mb-4 w-12 h-12 rounded-2xl bg-gold-500 text-navy-950 flex items-center justify-center shadow-lg transform group-hover:-translate-y-2 transition-transform">
                         {React.createElement(getIcon(cs.iconName), { className: "w-6 h-6" })}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight leading-none group-hover:text-gold-500 transition-colors">
                        {cs.title}
                      </h3>
                      <div className="mt-4 flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details <Plus className="w-3 h-3" />
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedCase !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={`case-${selectedCase}`}
              className="relative w-full max-w-6xl bg-white text-navy-950 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden border border-navy-100"
            >
              {/* Sidebar Image */}
              <div className="relative w-full md:w-[35%] h-[200px] md:h-auto overflow-hidden shrink-0">
                 <Image 
                   src={cases[selectedCase].image} 
                   alt={cases[selectedCase].title} 
                   fill 
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-navy-950/20" />
                 <div className="absolute top-8 left-8">
                    <div className="w-14 h-14 rounded-2xl bg-gold-500 text-navy-950 flex items-center justify-center shadow-2xl">
                       {React.createElement(getIcon(cases[selectedCase].iconName), { className: "w-7 h-7" })}
                    </div>
                 </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-16 custom-scrollbar relative">
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center hover:bg-navy-950 hover:text-white transition-all duration-300 z-50"
                >
                  <Plus className="w-5 h-5 rotate-45" />
                </button>

                <div className="max-w-3xl">
                   <div className="mb-10 border-b border-navy-50 pb-8">
                      <span className="text-gold-600 font-mono text-xs tracking-widest uppercase block mb-3 font-bold">Confidential Case Study</span>
                      <h2 className="text-3xl md:text-5xl font-light text-navy-950 tracking-tight mb-8">{cases[selectedCase].title} Mediation</h2>
                      <p className="text-lg md:text-xl text-navy-950/80 font-light leading-relaxed">
                        {cases[selectedCase].summary}
                      </p>
                   </div>

                   <div className="grid grid-cols-1 gap-12">
                      <section>
                         <h4 className="text-xs font-bold text-navy-950/40 uppercase tracking-[.2em] mb-6">The Challenge</h4>
                         <ul className="space-y-4">
                            {cases[selectedCase].challenge.map((text: string, idx: number) => (
                              <li key={idx} className="flex gap-4 text-navy-950/70 font-light text-base md:text-lg leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0 mt-2.5" />
                                {text}
                              </li>
                            ))}
                         </ul>
                      </section>
 
                      <section className="bg-navy-950 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                         <h4 className="text-xs font-bold text-white/30 uppercase tracking-[.2em] mb-8">The Solution</h4>
                         <p className="text-lg md:text-2xl font-light text-white/90 leading-relaxed italic">
                            "{cases[selectedCase].solution}"
                         </p>
                      </section>
 
                      <section>
                         <h4 className="text-xs font-bold text-navy-950/40 uppercase tracking-[.2em] mb-8">Resolution Metrics</h4>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="space-y-1">
                               <p className="text-xs text-navy-950/40 font-bold uppercase">Time Scale</p>
                               <p className="text-2xl font-light text-navy-950">{cases[selectedCase].costs.weeks} <span className="text-sm">Weeks</span></p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-xs text-navy-950/40 font-bold uppercase">Mediation Hours</p>
                               <p className="text-2xl font-light text-navy-950">{cases[selectedCase].costs.hours} <span className="text-sm">Hrs</span></p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-xs text-navy-950/40 font-bold uppercase">Total Fees</p>
                               <p className="text-2xl font-light text-gold-600">₹{cases[selectedCase].costs.fees}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-xs text-navy-950/40 font-bold uppercase">Dispute Value</p>
                               <p className="text-2xl font-light text-navy-950">{cases[selectedCase].costs.value}</p>
                            </div>
                         </div>
                      </section>
                   </div>

                   <div className="mt-16 pt-8 border-t border-navy-50">
                      <p className="text-[11px] text-navy-950/30 italic">
                         *Identities and specific details have been anonymized to protect party confidentiality while preserving the core strategic elements of the resolution.
                      </p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
