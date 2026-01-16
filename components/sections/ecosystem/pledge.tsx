"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Handshake, Landmark, Users, ArrowRight, Download, Send, Info, FileText } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

const benefits = [
  "Encourages early dispute resolution, preventing unnecessary escalation",
  "Reduces time, cost, and business disruption associated with litigation",
  "Preserves commercial and professional relationships through dialogue",
  "Promotes confidentiality and reputational protection",
  "Supports responsible governance and ESG-aligned practices",
  "Embeds a culture of problem-solving over adversarial conflict",
  "Enhances brand trust with emphasis on dialogue, fairness and accountability",
  "Signals maturity in risk and conflict management to investors and partners"
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
  return (
    <section id="pledge" className="bg-white overflow-hidden pb-32">
      {/* Hero / Intro */}
      <div className="py-24 md:py-32 bg-navy-950 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(191,154,102,0.1),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            <FadeInUp>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">The PACT Pledge</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-light tracking-tight mb-8">Commit to <br /><span className="text-gold-500 italic font-medium">Resolution</span></h2>
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-10">
                By voluntarily undertaking this pledge, organisations publicly affirm their commitment to fostering a culture of early, good-faith dispute resolution and responsible conflict management. Without binding signatories to mediate by obligation, the PACT Mediation Pledge serves as a steady reminder to consider mediation as a go-to process to resolve disputes via innovation and interest-based interactions.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/mediation"
                  className="rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 font-sans text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-white/10 flex items-center gap-2"
                >
                  Why Mediation?
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.2} className="relative hidden lg:block">
               <div className="aspect-square rounded-[3rem] bg-linear-to-br from-gold-500/20 to-transparent border border-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-32 h-32 text-gold-500/20" />
               </div>
            </FadeInUp>
          </div>
        </div>
      </div>

      {/* Why the Pledge */}
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <div className="mb-16">
             <h3 className="text-3xl md:text-5xl font-light text-navy-950 tracking-tight mb-4 uppercase">Why The Pledge</h3>
             <div className="h-1 w-12 bg-gold-500 rounded-full" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <FadeInUp key={i} delay={i * 0.05}>
                   <div className="h-full p-8 rounded-[2rem] bg-navy-50/50 border border-navy-100/50 hover:bg-white hover:border-gold-500/20 hover:shadow-xl transition-all duration-500 group">
                      <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors duration-500">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <p className="text-base text-navy-950/60 font-light leading-relaxed">{benefit}</p>
                   </div>
                </FadeInUp>
              ))}
           </div>
        </div>
      </div>

      {/* Join the League of Leaders */}
      <div className="py-16 bg-navy-50/30 border-y border-navy-100/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
              <h4 className="text-xl font-mono uppercase tracking-[0.3em] text-navy-950 shrink-0">Join the League of Leaders</h4>
              <div className="flex flex-wrap justify-center gap-12 grayscale">
                 {/* Logic Space Placeholder */}
                 <div className="text-[10px] font-mono tracking-widest font-bold items-center flex gap-2">LOGOS <div className="w-1 h-1 rounded-full bg-navy-950" /> UPDATES COMING SOON</div>
              </div>
           </div>
        </div>
      </div>

      {/* Objectives / Note */}
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              <FadeInUp>
                 <h3 className="text-3xl font-light text-navy-950 mb-10 uppercase tracking-tight">Primary Objectives</h3>
                 <p className="text-navy-950/60 font-light mb-10 text-lg">Signing the PACT Mediation Pledge shows willingness to consider mediation in appropriate disputes. Your action achieves two primary objectives:</p>
                 <div className="space-y-6">
                    {objectives.map((obj, i) => (
                      <div key={i} className="flex gap-6 p-6 rounded-3xl bg-navy-50 border border-navy-100 shadow-sm">
                         <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center shrink-0 text-white font-bold">
                            0{i+1}
                         </div>
                         <p className="text-lg text-navy-950 font-light leading-relaxed">{obj.desc}</p>
                      </div>
                    ))}
                 </div>
              </FadeInUp>
              
              <FadeInUp delay={0.2} className="relative lg:mt-24">
                 <div className="p-10 rounded-[2.5rem] bg-navy-950 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                       <Info className="w-12 h-12 text-white/5" />
                    </div>
                    <h4 className="text-sm font-mono uppercase tracking-[0.3em] text-gold-500 mb-8 font-bold">Please note</h4>
                    <div className="space-y-6 text-white/60 font-light text-base leading-relaxed">
                       <p className="flex gap-4"><span className="text-gold-500 shrink-0">•</span> The Pledge is not a binding commitment and does not create legally enforceable rights or obligations.</p>
                       <p className="flex gap-4"><span className="text-gold-500 shrink-0">•</span> Mediation may not be eligible to every dispute (even if not restricted by Section 6 of The Mediation Act, 2023) and in any event does not limit a party’s other dispute resolution options, including court litigation.</p>
                    </div>
                 </div>
              </FadeInUp>
           </div>
        </div>
      </div>

      {/* THE PLEDGE FORM - Document Style */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <FadeInUp>
          <div className="relative bg-white rounded-[3rem] border border-navy-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden">
             {/* Header */}
             <div className="bg-navy-950 py-12 px-8 md:px-16 text-center text-white relative">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,#bf9a66,transparent_70%)]" />
                <FileText className="w-12 h-12 text-gold-500 mx-auto mb-6 relative z-10" />
                <h3 className="text-3xl md:text-5xl font-light tracking-tight relative z-10 uppercase">The PACT Mediation <br /><span className="text-gold-500 italic font-medium lowercase">Pledge</span></h3>
             </div>

             <div className="p-8 md:p-16 lg:p-20 space-y-12">
                <div className="max-w-3xl mx-auto space-y-8 text-center md:text-left">
                  <p className="text-lg text-navy-950/60 font-light leading-relaxed">
                    The PACT through its diverse verticals contributes to awareness and advocacy of Mediation among the various stakeholders of the private, public and social sectors.
                  </p>
                  <p className="text-lg text-navy-950 font-normal leading-relaxed italic border-l-4 border-gold-500 pl-6 bg-navy-50/50 py-4">
                    Without binding signatories to mediate by obligation, the PACT Mediation Pledge serves as a steady reminder to consider mediation as a go-to process to resolve disputes via innovation and interest-based interactions.
                  </p>
                  <p className="text-lg text-navy-950/60 font-light leading-relaxed">
                    By voluntarily signing this pledge with the PACT, we recognise that mediation offers an efficient and creative form of conflict resolution, by preserving confidentiality, managing risk, and protecting business interests. Additionally, we express our commitment to consider early engagement with mediation as and when deemed appropriate.
                  </p>
                  <div className="text-xl font-bold uppercase tracking-widest text-navy-950 pt-4">Accordingly, we affirm that:</div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {/* Corporates */}
                   <div className="p-10 rounded-[2.5rem] bg-navy-50 border border-navy-100 space-y-8">
                     <div className="space-y-2">
                        <Users className="w-8 h-8 text-gold-500" />
                        <h4 className="text-xl font-bold text-navy-950">Corporates & <br />Entrepreneurs</h4>
                     </div>
                     <div className="space-y-6">
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">Contractual Integration</p>
                          <p className="text-sm text-navy-950/70 font-light leading-relaxed">We are prepared to explore the inclusion of mediation clauses in contracts and agreements that concern us or we are a party to.</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">Non-contractual Preference</p>
                          <p className="text-sm text-navy-950/70 font-light leading-relaxed">In the absence of such mediation clauses, we are prepared to actively consider mediation as an early and effective means of resolving disputes.</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">Good-Faith Engagement</p>
                          <p className="text-sm text-navy-950/70 font-light leading-relaxed">In matters referred to mediation, we commit to participating in good faith, with appropriate decision-making authority, and with a genuine intention to explore acceptable solutions.</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">Preservation of Rights</p>
                          <p className="text-sm text-navy-950/70 font-light leading-relaxed text-xs italic">This pledge does not create binding legal obligations or restrict access to other resolution mechanisms.</p>
                        </div>
                     </div>
                   </div>

                   {/* Lawyers */}
                   <div className="p-10 rounded-[2.5rem] bg-navy-950 text-white space-y-8">
                     <div className="space-y-2">
                        <Handshake className="w-8 h-8 text-gold-500" />
                        <h4 className="text-xl font-bold">Lawyers & <br />Law Firms</h4>
                     </div>
                     <div className="space-y-6">
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">Contractual Integration</p>
                          <p className="text-sm text-white/60 font-light leading-relaxed">We are prepared to explore the inclusion of mediation clauses in contracts and agreements that concern our clients.</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">Non-contractual Preference</p>
                          <p className="text-sm text-white/60 font-light leading-relaxed">We commit to proactively counselling the client to consider mediation as an early and effective means of resolving disputes.</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">Good-Faith Engagement</p>
                          <p className="text-sm text-white/60 font-light leading-relaxed">We commit to counselling our client in good faith, engaging in appropriate skills with intention to explore solutions.</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">Preservation of Rights</p>
                          <p className="text-sm text-white/40 font-light leading-relaxed text-xs italic">This pledge reflects an intention to promote mediation and does not create binding legal obligations.</p>
                        </div>
                     </div>
                   </div>

                   {/* Educational */}
                   <div className="p-10 rounded-[2.5rem] bg-navy-50 border border-navy-100 space-y-8">
                     <div className="space-y-2">
                        <Landmark className="w-8 h-8 text-gold-500" />
                        <h4 className="text-xl font-bold text-navy-950">Institutes & <br />Universities</h4>
                     </div>
                     <div className="space-y-8">
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">Education Commitment</p>
                          <p className="text-sm text-navy-950/70 font-light leading-relaxed">Integrating mediation theory, practice, and ethics into curriculum to develop mediation-skilled professionals.</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">Experiential Learning</p>
                          <p className="text-sm text-navy-950/70 font-light leading-relaxed">Promoting hands-on training, simulations, and clinical programmes that build practical competencies.</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">Culture Advancement</p>
                          <p className="text-sm text-navy-950/70 font-light leading-relaxed">Support research, awareness, and collaboration to strengthen the culture of consensual dispute resolution.</p>
                        </div>
                     </div>
                   </div>
                </div>

                {/* Form Fields */}
                <div className="max-w-4xl mx-auto pt-12 border-t border-navy-100">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      {[
                        "Full Name", "Job Title / Designation", 
                        "Organisation Full Name", "Website", 
                        "Place", "Date", 
                        "Email of Signatory", "Email of Organisation"
                      ].map((label) => (
                        <div key={label} className="space-y-2 group">
                           <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy-950/40 group-focus-within:text-gold-500 transition-colors font-bold">{label}</label>
                           <input 
                             type="text" 
                             className="w-full bg-transparent border-b border-navy-100 py-3 font-sans text-navy-950 outline-hidden focus:border-gold-500 transition-all placeholder:text-navy-950/10" 
                             placeholder="..." 
                           />
                        </div>
                      ))}
                   </div>
                   
                   <div className="mt-16 space-y-8 p-8 md:p-12 rounded-[2rem] bg-navy-50/50 border border-navy-100/50">
                      <div className="flex gap-4">
                         <div className="w-5 h-5 rounded-sm border border-gold-500 mt-1 shrink-0 bg-white" />
                         <p className="text-sm text-navy-950/60 font-light leading-relaxed">
                            We understand that this Pledge creates no legal rights or obligations and does not limit the use of any other dispute resolution options deemed appropriate, including court litigation.
                         </p>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-5 h-5 rounded-sm border border-gold-500 mt-1 shrink-0 bg-white" />
                         <p className="text-sm text-navy-950/60 font-light leading-relaxed">
                            We agree to be listed as a signatory on PACT’s website.
                         </p>
                      </div>

                      <div className="pt-8 text-center md:text-left">
                        <button className="inline-flex items-center gap-6 bg-navy-950 text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold-500 transition-all hover:scale-105 active:scale-95 shadow-xl">
                          Sign the Pledge <Send className="w-4 h-4" />
                        </button>
                        <p className="text-[10px] font-mono text-navy-950/40 uppercase tracking-widest mt-8">
                          Please return form along with the logo of the organisation to <br />
                          <span className="text-navy-950 font-bold">official@thepact.in</span>
                        </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
