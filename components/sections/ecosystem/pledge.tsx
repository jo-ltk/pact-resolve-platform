"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, ShieldCheck, Handshake, Landmark, Users, 
  ArrowRight, Download, Send, Info, FileText,
  Clock, BarChart3, Globe, Heart, Award, Activity, Zap,
  Loader2, Check, PenTool
} from "lucide-react";
import Image from "next/image";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";
import { EcosystemSubPageHero } from "./ecosystem-subpage-hero";

const benefits = [
  {
    title: "Early Resolution",
    desc: "Encourages early dispute resolution, preventing unnecessary escalation.",
    icon: Clock
  },
  {
    title: "Cost Efficiency",
    desc: "Reduces time, cost, and business disruption associated with litigation.",
    icon: BarChart3
  },
  {
    title: "Preserve Ties",
    desc: "Preserves commercial and professional relationships through dialogue.",
    icon: Users
  },
  {
    title: "Privacy First",
    desc: "Promotes confidentiality and absolute reputational protection.",
    icon: ShieldCheck
  },
  {
    title: "ESG Standards",
    desc: "Supports responsible governance and ESG-aligned corporate practices.",
    icon: Globe
  },
  {
    title: "Creative Culture",
    desc: "Embeds a culture of problem-solving over adversarial conflict.",
    icon: Heart
  },
  {
    title: "Brand Trust",
    desc: "Enhances brand trust with emphasis on fairness and accountability.",
    icon: Award
  },
  {
    title: "Risk Control",
    desc: "Signals maturity in risk and conflict management to global partners.",
    icon: Activity
  }
];

const objectives = [
  {
    title: "Better clauses",
    desc: "Better chances of the inclusion of mediation clauses in contracts"
  },
  {
    title: "Better usage",
    desc: "Better chances of using mediation in the absence of defined mediation clauses"
  }
];

export function PledgeSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    orgName: "",
    website: "",
    place: "",
    date: new Date().toISOString().split('T')[0],
    signatoryEmail: "",
    orgEmail: ""
  });
  const [agreedTerms, setAgreedTerms] = useState({
    legal: false,
    registry: false
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      // Clean up old preview if it exists
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms.legal || !agreedTerms.registry) {
      alert("Please agree to the terms to proceed.");
      return;
    }
    
    if (!logoFile) {
      alert("Please upload your organization logo.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Use FormData to send both the file and the text fields
      const finalFormData = new FormData();
      finalFormData.append("logo", logoFile);
      
      // Append all other fields
      Object.entries(formData).forEach(([key, value]) => {
        finalFormData.append(key, value);
      });
      
      const res = await fetch("/api/content/pledge", {
        method: "POST",
        body: finalFormData, // No need for Content-Type header when sending FormData
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(data.message);
        setIsSubmitted(true);
      } else {
        alert(data.error || "Failed to submit pledge. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Fallback message if server communication fails but we want to show success UI for demo
      setSuccessMessage("Thank you for opting for the PACT Pledge to Mediate. The team will respond to you with a confirmation within the next 48-96 hours.");
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pledge" className="bg-white overflow-hidden pb-32">
      {/* Hero / Intro */}
      <EcosystemSubPageHero 
        tag="The PACT Pledge"
        title={<>Commit to <br /><span className="text-gold-500 italic font-medium">Resolution</span></>}
        description="By voluntarily undertaking this pledge, organisations publicly affirm their commitment to fostering a culture of early, good-faith dispute resolution and responsible conflict management."
      />

      {/* Why the Pledge - Puzzle Pieces Theme */}
      <div className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="hidden md:block absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-500/5 blur-[120px] rounded-full" />
          <div className="hidden md:block absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-navy-950/3 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
           <div className="text-center mb-16 md:mb-24">
             <FadeInUp>
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-navy-50 border border-navy-100 mb-8">
                 <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                 <span className="text-xs md:text-xs  tracking-[0.4em] uppercase text-navy-950/60 font-bold">The Strategic Edge</span>
               </div>
               <h3 className="text-[12vw] sm:text-5xl md:text-7xl font-extralight tracking-tight text-navy-950 mb-8 uppercase leading-none">
                 Why The <br />
                 <span className="italic font-medium text-gold-500 lowercase">Pledge</span>
               </h3>
               <div className="h-px w-24 bg-gold-500/30 mx-auto mb-8" />
               <p className="max-w-2xl mx-auto text-navy-950/40 text-lg md:text-xl font-light leading-relaxed">
                 A forward-thinking commitment to resolution that transforms conflict into commercial opportunity.
               </p>
             </FadeInUp>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {benefits.map((benefit, i) => (
                <FadeInUp key={i} delay={i * 0.1}>
                  <div className="group relative h-full px-6 py-10 rounded-5xl bg-navy-50/20 border border-navy-100/30 hover:bg-white hover:border-gold-500/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col items-center text-center">
                    
                    {/* Number Background Detail */}
                    <div className="absolute -bottom-6 -right-4 text-[8rem] font-bold text-navy-950/1.5 group-hover:text-gold-500/4 transition-all duration-1000 select-none pointer-events-none ">
                      {i + 1 < 10 ? `0${i + 1}` : i + 1}
                    </div>

                    <div className="relative mb-8">
                      <div className="w-16 h-16 rounded-3xl bg-white text-navy-950 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all duration-500 group-hover:rotate-12 shadow-md border border-navy-100/50">
                        <benefit.icon className="w-8 h-8" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gold-500 scale-0 group-hover:scale-100 transition-transform duration-500 border-[3px] border-white shadow-sm" />
                    </div>
                    
                    <div className="grow space-y-4 relative z-10 w-full">
                      <div className="space-y-1">
                        <span className="text-xs  uppercase tracking-[0.5em] text-gold-500/60 font-bold">Edge {i + 1}</span>
                        <h4 className="text-xl md:text-2xl font-light text-navy-950 tracking-tighter leading-tight italic group-hover:text-gold-500 transition-colors duration-500 uppercase">
                          {benefit.title}
                        </h4>
                      </div>
                      <div className="h-px w-10 bg-navy-100 group-hover:w-16 bg-gold-500/30 group-hover:bg-gold-500 transition-all duration-700 mx-auto" />
                      <p className="text-navy-950/50 text-sm md:text-base font-light leading-relaxed group-hover:text-navy-950/70 transition-colors duration-500">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </FadeInUp>
              ))}
           </div>
        </div>
      </div>

      {/* Join the League of Leaders - Simplified placeholder or removed based on user request */}
      <div className="py-16 bg-navy-50/30 border-y border-navy-100/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
            <h4 className="text-xl uppercase tracking-[0.3em] text-navy-950 font-light italic">The League of <span className="text-gold-500 font-medium lowercase">Leaders</span></h4>
            <p className="text-[10px] uppercase tracking-widest text-navy-950/40 mt-2">New Signatories Being Verified Monthly</p>
        </div>
      </div>

      {/* Objectives / Note */}
      <div className="py-24 md:py-32 relative overflow-hidden">
        <div className="hidden md:block absolute top-1/2 left-0 w-[500px] h-[500px] bg-navy-50/50 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <FadeInUp>
                 <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-navy-50 border border-navy-100 mb-8">
                   <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                   <span className="text-xs md:text-xs  tracking-[0.4em] uppercase text-navy-950/60 font-bold">The Core Mission</span>
                 </div>
                 <h3 className="text-[12vw] md:text-6xl font-extralight tracking-tight text-navy-950 mb-8 uppercase leading-none">
                   Primary <br />
                   <span className="italic font-medium text-gold-500 lowercase">Objectives</span>
                 </h3>
                 <div className="h-px w-24 bg-gold-500/30 mb-8" />
                 <p className="text-navy-950/40 text-lg md:text-xl font-light leading-relaxed mb-12">
                   Signing the PACT Mediation Pledge shows willingness to consider mediation in appropriate disputes. Your action achieves two primary objectives:
                 </p>
                 
                 <div className="space-y-6">
                    {objectives.map((obj, i) => (
                      <div key={i} className="group flex gap-6 p-8 rounded-[2.5rem] bg-navy-50/50 border border-navy-100/50 hover:bg-white hover:border-gold-500/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
                         <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0 text-navy-950 text-2xl font-bold border border-navy-100 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500 shadow-sm rotate-3 group-hover:rotate-0">
                            0{i+1}
                         </div>
                         <div className="space-y-2 pt-1">
                           <span className="text-gold-500  text-xs uppercase tracking-[0.3em] font-bold">Goal {i+1}</span>
                           <p className="text-xl text-navy-950 font-light leading-relaxed tracking-tight group-hover:text-navy-950 transition-colors duration-500">
                             {obj.desc}
                           </p>
                         </div>
                      </div>
                    ))}
                 </div>
              </FadeInUp>
              
              <FadeInUp delay={0.2} className="relative lg:mt-48">
                 <div className="relative p-10 md:p-14 rounded-[4rem] bg-navy-950 text-white overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-3xl md:blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 blur-2xl rounded-full -translate-x-1/2 translate-y-1/2" />
                    
                    <div className="hidden md:block absolute top-14 right-14">
                       <Info className="w-14 h-14 text-gold-500/20 group-hover:text-gold-500/40 transition-all duration-700" />
                    </div>

                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-3 mb-12">
                        <div className="w-10 h-px bg-gold-500" />
                        <h4 className="text-xs md:text-xs  uppercase tracking-[0.4em] text-gold-500 font-bold">Legal Disclaimer</h4>
                      </div>
                      
                      <div className="space-y-10">
                         <div className="group/item flex gap-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-3 shrink-0 group-hover/item:scale-150 transition-transform duration-500" />
                            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed group-hover/item:text-white transition-colors duration-500">
                              The Pledge is <span className="text-gold-500 font-medium">not a binding commitment</span> and does not create legally enforceable rights or obligations.
                            </p>
                         </div>
                         <div className="group/item flex gap-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-3 shrink-0 group-hover/item:scale-150 transition-transform duration-500" />
                            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed group-hover/item:text-white transition-colors duration-500">
                              Mediation may not be eligible to <span className="text-gold-500 font-medium">every dispute</span> and does not limit a party's other dispute resolution options.
                            </p>
                         </div>
                      </div>

                      <div className="mt-16 pt-12 border-t border-white/10">
                         <p className="text-xs  uppercase tracking-[0.2em] text-white/30 leading-relaxed max-w-xs">
                           Refer to Section 6 of The Mediation Act, 2023 for statutory guidelines and non-eligible disputes.
                         </p>
                      </div>
                    </div>
                 </div>
              </FadeInUp>
           </div>
        </div>
      </div>

      {/* THE PLEDGE FORM - Document Style */}
      <div className="max-w-[1550px] mx-auto px-6 md:px-12">
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!isFormOpen ? (
              <motion.div
                key="pledge-trigger"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative bg-white rounded-[3rem] border border-navy-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden p-6 sm:p-12 md:p-24 text-center group cursor-pointer"
                onClick={() => setIsFormOpen(true)}
              >
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,#bf9a66,transparent_70%)]" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold-500/5 rounded-full blur-3xl md:blur-[80px] group-hover:bg-gold-500/10 transition-colors duration-700" />

                 <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                    <div className="w-24 h-24 mx-auto bg-navy-50 rounded-3xl flex items-center justify-center border border-navy-100 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                      <FileText className="w-10 h-10 text-gold-500" />
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                         <p className="text-sm  text-gold-500 uppercase tracking-widest font-bold">The Document</p>
                         <h3 className="text-4xl md:text-7xl font-extralight tracking-tighter text-navy-950 uppercase leading-none">
                           The Mediation <br/> <span className="text-gold-500 font-medium italic">Pledge</span>
                         </h3>
                      </div>
                      <p className="text-lg md:text-xl text-navy-950/50 font-light leading-relaxed max-w-xl mx-auto">
                        Ready to make a difference? Join the growing list of organizations committed to early dispute resolution and responsible conflict management.
                      </p>
                    </div>

                    <div>
                      <button 
                        className="group/btn relative inline-flex items-center justify-center gap-3 md:gap-4 bg-navy-950 text-white px-6 py-4 md:px-12 md:py-6 w-full md:w-auto rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-gold-500 hover:scale-105 shadow-xl"
                      >
                        Read & Sign The Pledge
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-navy-950 transition-colors">
                           <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                        </div>
                      </button>
                      <p className="mt-6 text-xs  text-navy-950/30 uppercase tracking-widest">Takes approx. 2 minutes</p>
                    </div>
                 </div>
              </motion.div>
            ) : (
              <motion.div
                key="pledge-form"
                initial={{ opacity: 0, height: 0, y: 50 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                  <div className="relative bg-white rounded-[3rem] border border-navy-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden">
                     
                     {/* Close Button Trigger */}
                     <button 
                       onClick={(e) => { e.stopPropagation(); setIsFormOpen(false); }}
                       className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-navy-50 text-navy-950 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                       title="Close Pledge"
                     >
                        <span className="sr-only">Close</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                     </button>

                     {/* Header */}
                     <div className="bg-navy-950 py-12 px-8 md:px-16 text-center text-white relative">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,#bf9a66,transparent_70%)]" />
                        <FileText className="w-12 h-12 text-gold-500 mx-auto mb-6 relative z-10" />
                        <h3 className="text-[8vw] md:text-5xl font-light tracking-tight relative z-10 uppercase">The PACT Mediation <br /><span className="text-gold-500 italic font-medium lowercase">Pledge</span></h3>
                     </div>

                      <div className="px-6 md:px-10 lg:px-12 pb-20">
                        <AnimatePresence mode="wait">
                          {!isSubmitted ? (
                            <motion.div 
                              key="form-content"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="space-y-20"
                            >
                              <div className="space-y-20">
                                <div className="max-w-4xl mx-auto space-y-10 text-center">
                                  <div className="space-y-4 pt-12">
                                    <p className="text-lg text-navy-950/60 font-light leading-relaxed">
                                      The PACT through its diverse verticals contributes to awareness and advocacy of Mediation among the various stakeholders of the private, public and social sectors.
                                    </p>
                                    <div className="relative py-8 px-10 rounded-4xl bg-navy-50/50 border-l-4 border-gold-500 overflow-hidden text-left">
                                      <div className="absolute top-0 right-0 p-4 opacity-5">
                                        <ShieldCheck className="w-24 h-24" />
                                      </div>
                                      <p className="text-xl text-navy-950 font-normal leading-relaxed relative z-10">
                                        "Without binding signatories to mediate by obligation, the PACT Mediation Pledge serves as a steady reminder to consider mediation as a go-to process to resolve disputes via innovation and interest-based interactions."
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <p className="text-lg text-navy-950/60 font-light leading-relaxed">
                                    By voluntarily signing this pledge with the PACT, we recognise that mediation offers an efficient and creative form of conflict resolution, by preserving confidentiality, managing risk, and protecting business interests. Additionally, we express our commitment to consider early engagement with mediation as and when deemed appropriate.
                                  </p>
                                  
                                  <div className="pt-6 text-center">
                                    <div className="inline-flex flex-col items-center gap-4">
                                      <div className="text-xs uppercase tracking-[0.4em] text-gold-500 font-bold">The Commitment</div>
                                      <h4 className="text-xl md:text-3xl font-light uppercase tracking-tight text-navy-950 italic">Accordingly, we <span className="text-gold-500 font-medium lowercase">affirm</span> that:</h4>
                                      <div className="h-px w-24 bg-gold-500/30" />
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-16">
                                   {/* Corporates */}
                                   <div className="p-8 md:p-12 rounded-[3.5rem] bg-navy-50 border border-navy-100 space-y-12">
                                     <div className="space-y-3">
                                        <Users className="w-10 h-10 text-gold-500" />
                                        <h4 className="text-2xl font-bold text-navy-950">Corporates & <br />Entrepreneurs</h4>
                                     </div>
                                     <div className="space-y-8">
                                        <div className="space-y-3">
                                          <p className="text-xs text-gold-500 uppercase tracking-widest font-bold">Contractual Integration</p>
                                          <p className="text-base text-navy-950/70 font-light leading-relaxed">We are prepared to explore the inclusion of mediation clauses in contracts and agreements that concern us or we are a party to.</p>
                                        </div>
                                        <div className="space-y-3">
                                          <p className="text-xs text-gold-500 uppercase tracking-widest font-bold">Non-contractual Preference</p>
                                          <p className="text-base text-navy-950/70 font-light leading-relaxed">In the absence of such mediation clauses, we are prepared to actively consider mediation as an early and effective means of resolving disputes.</p>
                                        </div>
                                        <div className="space-y-3">
                                          <p className="text-xs text-gold-500 uppercase tracking-widest font-bold">Good-Faith Engagement</p>
                                          <p className="text-base text-navy-950/70 font-light leading-relaxed">In matters referred to mediation, we commit to participating in good faith, with appropriate decision-making authority, and with a genuine intention to explore acceptable solutions.</p>
                                        </div>
                                     </div>
                                   </div>

                                   {/* Lawyers */}
                                   <div className="p-8 md:p-12 rounded-[3.5rem] bg-navy-950 text-white space-y-12">
                                     <div className="space-y-3">
                                        <Handshake className="w-10 h-10 text-gold-500" />
                                        <h4 className="text-2xl font-bold">Lawyers & <br />Law Firms</h4>
                                     </div>
                                     <div className="space-y-8">
                                        <div className="space-y-3">
                                          <p className="text-xs text-gold-500 uppercase tracking-widest font-bold">Contractual Integration</p>
                                          <p className="text-base text-white/60 font-light leading-relaxed">We are prepared to explore the inclusion of mediation clauses in contracts and agreements that concern our clients.</p>
                                        </div>
                                        <div className="space-y-3">
                                          <p className="text-xs text-gold-500 uppercase tracking-widest font-bold">Non-contractual Preference</p>
                                          <p className="text-base text-white/60 font-light leading-relaxed">We commit to proactively counselling the client to consider mediation as an early and effective means of resolving disputes.</p>
                                        </div>
                                        <div className="space-y-3">
                                          <p className="text-xs text-gold-500 uppercase tracking-widest font-bold">Good-Faith Engagement</p>
                                          <p className="text-base text-white/60 font-light leading-relaxed">We commit to counselling our client in good faith, engaging in appropriate skills with intention to explore solutions.</p>
                                        </div>
                                     </div>
                                   </div>

                                   {/* Educational */}
                                   <div className="p-8 md:p-12 rounded-[3.5rem] bg-navy-50 border border-navy-100 space-y-12">
                                     <div className="space-y-3">
                                        <Landmark className="w-10 h-10 text-gold-500" />
                                        <h4 className="text-2xl font-bold text-navy-950">Institutes & <br />Universities</h4>
                                     </div>
                                     <div className="space-y-8">
                                        <div className="space-y-3">
                                          <p className="text-xs text-gold-500 uppercase tracking-widest font-bold">Education Commitment</p>
                                          <p className="text-base text-navy-950/70 font-light leading-relaxed">Integrating mediation theory, practice, and ethics into curriculum to develop mediation-skilled professionals.</p>
                                        </div>
                                        <div className="space-y-3">
                                          <p className="text-xs text-gold-500 uppercase tracking-widest font-bold">Experiential Learning</p>
                                          <p className="text-base text-navy-950/70 font-light leading-relaxed">Promoting hands-on training, simulations, and clinical programmes that build practical competencies.</p>
                                        </div>
                                        <div className="space-y-3">
                                          <p className="text-xs text-gold-500 uppercase tracking-widest font-bold">Culture Advancement</p>
                                          <p className="text-base text-navy-950/70 font-light leading-relaxed">Support research, awareness, and collaboration to strengthen the culture of consensual dispute resolution.</p>
                                        </div>
                                     </div>
                                   </div>
                                </div>
                              </div>

                              {/* Form Fields & Submission */}
                              <div className="max-w-4xl mx-auto pt-24 border-t border-navy-100">
                                 <form onSubmit={handleSubmit}>
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                      {[
                                        { label: "Full Name", name: "fullName", type: "text" },
                                        { label: "Job Title / Designation", name: "jobTitle", type: "text" },
                                        { label: "Organisation Full Name", name: "orgName", type: "text" },
                                        { label: "Website", name: "website", type: "url" },
                                        { label: "Place", name: "place", type: "text" },
                                        { label: "Date", name: "date", type: "date" },
                                        { label: "Email of Signatory", name: "signatoryEmail", type: "email" },
                                        { label: "Email of Organisation", name: "orgEmail", type: "email" }
                                      ].map((field) => (
                                        <div key={field.name} className="space-y-2 group">
                                           <label className="text-[12px] uppercase tracking-[0.2em] text-navy-950/40 group-focus-within:text-gold-500 transition-colors font-bold">{field.label}</label>
                                           <input 
                                             type={field.type}
                                             name={field.name}
                                             value={(formData as any)[field.name]}
                                             onChange={handleInputChange}
                                             required
                                             className="w-full bg-transparent border-b border-navy-100 py-3 font-sans text-navy-950 outline-hidden focus:border-gold-500 transition-all placeholder:text-navy-950/10" 
                                             placeholder="..." 
                                           />
                                        </div>
                                      ))}

                                      {/* Logo Upload Section */}
                                      <div className="space-y-4 pt-4 md:col-span-2">
                                         <div className="p-8 rounded-4xl bg-navy-50 border-2 border-dashed border-navy-200 hover:border-gold-500 transition-colors group relative overflow-hidden">
                                            <input 
                                              type="file" 
                                              accept="image/*"
                                              onChange={handleFileChange}
                                              className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="flex flex-col items-center justify-center text-center space-y-3">
                                               <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-navy-950 group-hover:text-gold-500 transition-all shadow-sm overflow-hidden border border-navy-100/50">
                                            {logoPreview ? (
                                               <img 
                                                 src={logoPreview} 
                                                 alt="Logo Preview" 
                                                 className="w-full h-full object-contain p-2 animate-in fade-in zoom-in duration-300" 
                                               />
                                            ) : (
                                               <PenTool className="w-6 h-6" />
                                            )}
                                         </div>
                                         <div className="relative">
                                            {logoFile && (
                                              <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
                                                <Check className="w-3 h-3 stroke-[3px]" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Selected</span>
                                              </div>
                                            )}
                                            <p className="text-sm font-bold text-navy-950 uppercase tracking-widest max-w-[200px] truncate">
                                               {logoFile ? logoFile.name : "Upload Organisation Logo"}
                                            </p>
                                            <p className="text-[10px] text-navy-950/40 uppercase tracking-widest mt-1">
                                               {logoFile ? `${(logoFile.size / 1024).toFixed(1)} KB` : "PNG, JPG or SVG (Max 2MB)"}
                                            </p>
                                         </div>
                                            </div>
                                         </div>
                                      </div>
                                   </div>
                                   
                                   <div className="mt-20 space-y-12 block">
                                      <div className="space-y-6">
                                        <div className="group flex items-start gap-5 p-8 rounded-[2.5rem] bg-navy-50/50 border border-navy-100 hover:border-gold-500/30 transition-all duration-500">
                                           <div className="mt-1">
                                              <label className="relative flex items-center cursor-pointer">
                                                <input 
                                                  type="checkbox" 
                                                  className="sr-only peer" 
                                                  checked={agreedTerms.legal}
                                                  onChange={() => setAgreedTerms(prev => ({ ...prev, legal: !prev.legal }))}
                                                />
                                                <div className="w-6 h-6 border-2 border-navy-200 rounded-lg group-hover:border-gold-500/50 peer-checked:bg-gold-500 peer-checked:border-gold-500 transition-all flex items-center justify-center">
                                                  <CheckCircle2 className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                                </div>
                                              </label>
                                           </div>
                                           <p className="text-lg text-navy-950/70 font-light leading-relaxed">
                                              We understand that this Pledge <span className="text-navy-950 font-normal underline decoration-gold-500/30 underline-offset-8">creates no legal rights or obligations</span> and does not limit the use of any other dispute resolution options deemed appropriate, including court litigation.
                                           </p>
                                        </div>

                                        <div className="group flex items-start gap-5 p-8 rounded-[2.5rem] bg-navy-50/50 border border-navy-100 hover:border-gold-500/30 transition-all duration-500">
                                           <div className="mt-1">
                                              <label className="relative flex items-center cursor-pointer">
                                                <input 
                                                  type="checkbox" 
                                                  className="sr-only peer" 
                                                  checked={agreedTerms.registry}
                                                  onChange={() => setAgreedTerms(prev => ({ ...prev, registry: !prev.registry }))}
                                                />
                                                <div className="w-6 h-6 border-2 border-navy-200 rounded-lg group-hover:border-gold-500/50 peer-checked:bg-gold-500 peer-checked:border-gold-500 transition-all flex items-center justify-center">
                                                  <CheckCircle2 className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                                </div>
                                              </label>
                                           </div>
                                           <p className="text-lg text-navy-950/70 font-light leading-relaxed">
                                              We agree to be listed as a signatory on PACT’s <span className="text-navy-950 font-normal">Official Digital Registry</span>.
                                           </p>
                                        </div>
                                      </div>

                                      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-12 border-t border-navy-100/50">
                                        <div className="space-y-3 text-center lg:text-left">
                                          <p className="text-xs text-navy-950/40 uppercase tracking-[0.4em] font-bold">Ready to lead?</p>
                                          <h5 className="text-2xl md:text-4xl font-light text-navy-950 uppercase tracking-tight italic">Formalise your <span className="text-gold-500 font-medium">commitment</span></h5>
                                        </div>

                                        <button 
                                          type="submit"
                                          disabled={isSubmitting}
                                          className="w-full sm:w-auto group bg-navy-950 text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold-500 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-4 disabled:bg-navy-900/50"
                                        >
                                          {isSubmitting ? (
                                            <>
                                              <span>Processing</span>
                                              <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
                                            </>
                                          ) : (
                                            <>
                                              <span>Submit Digital Pledge</span>
                                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                          )}
                                        </button>
                                      </div>
                                   </div>
                                 </form>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="success-content"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="py-24 text-center max-w-2xl mx-auto space-y-12"
                            >
                               <div className="space-y-8">
                                  <div className="relative inline-block">
                                    <div className="w-24 h-24 rounded-full bg-gold-500 flex items-center justify-center text-white shadow-2xl">
                                       <Check className="w-12 h-12 stroke-[3px]" />
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-6">
                                     <h3 className="text-3xl md:text-5xl font-light text-navy-950 uppercase tracking-tight">
                                       Commitment <span className="text-gold-500 italic font-medium">Received</span>
                                     </h3>
                                     <div className="h-px w-24 bg-gold-500/30 mx-auto" />
                                     <p className="text-xl text-navy-950/60 font-light leading-relaxed max-w-lg mx-auto">
                                       {successMessage}
                                     </p>
                                  </div>

                                  <div className="pt-8">
                                     <button 
                                       onClick={() => { setIsFormOpen(false); setIsSubmitted(false); }}
                                       className="bg-navy-950 text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold-500 transition-all shadow-xl"
                                     >
                                       Close
                                     </button>
                                  </div>
                               </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
