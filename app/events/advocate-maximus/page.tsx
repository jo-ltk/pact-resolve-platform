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
  Star
} from "lucide-react";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const SectionHeader = ({ subtitle, title, description, light = false, center = false }: { subtitle: string, title: string, description?: string, light?: boolean, center?: boolean }) => (
  <FadeInUp className={cn("mb-12 md:mb-20", center ? "flex flex-col items-center text-center" : "")}>
    <div className="inline-flex items-center gap-4 mb-4 opacity-70">
      <span className={cn("text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase", light ? "text-white" : "text-navy-950")}>{subtitle}</span>
      <div className={cn("h-px w-8 bg-gold-500/50", light ? "bg-gold-500" : "bg-gold-500")} />
    </div>
    <h2 className={cn("text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6 leading-[1.1]", light ? "text-white" : "text-navy-950")}>
      {title}
    </h2>
    {description && (
      <p className={cn("max-w-2xl text-base md:text-xl font-light leading-relaxed", light ? "text-white/60" : "text-navy-950/60")}>
        {description}
      </p>
    )}
  </FadeInUp>
);

export default function AdvocateMaximusPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-navy-950 text-white">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-32 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
            alt="Advocate Maximus Hero"
            fill
            className="object-cover transition-transform duration-[10s] hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(191,154,102,0.1),transparent_70%)]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          <div className="flex flex-col items-center text-center">
             <FadeInUp>
                <div className="inline-flex items-center gap-4 mb-8">
                  <div className="h-px w-12 bg-gold-500" />
                  <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase">The Premier Moot</span>
                  <div className="h-px w-12 bg-gold-500" />
                </div>
                <h1 className="text-6xl md:text-[9rem] font-bold text-white tracking-tighter leading-[0.85] mb-12 select-none uppercase">
                  ADVOCATE <br />
                  <span className="text-gold-500 italic">MAXIMUS</span>
                </h1>
                
                <div className="max-w-3xl mx-auto space-y-8">
                  <p className="text-xl md:text-3xl text-white/90 font-light leading-tight tracking-tight">
                    India's first Arbitration-Mediation (Arb-Med) competition and conference, redefining advocacy for the modern dispute resolution era.
                  </p>
                  <p className="text-lg text-white/50 font-light leading-relaxed">
                    Launched in 2017 in collaboration with Senior Advocate Ratan K Singh, Advocate Maximus has set the standard for professional competitions in India.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-6 pt-12">
                     <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-gold-500 uppercase">
                        <Zap className="w-4 h-4" />
                        Pioneering Formats
                     </div>
                     <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-gold-500 uppercase">
                        <Globe className="w-4 h-4" />
                        Global Standards
                     </div>
                  </div>
                </div>
             </FadeInUp>
          </div>
        </div>
      </section>

      {/* Legacy and Origin Section */}
      <section className="py-24 md:py-40 bg-white text-navy-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <FadeInUp>
                 <SectionHeader subtitle="The Legacy" title="Globally Renowned, Locally Rooted" />
                 <div className="space-y-8 text-xl md:text-2xl font-light text-navy-500 leading-relaxed">
                    <p>
                       Advocate Maximus was born out of a vision to bridge the gap between academic learning and professional practice in the field of International Commercial Arbitration and Mediation.
                    </p>
                    <p className="text-navy-950">
                       Since its inception in New Delhi (2017), the competition has attracted the brightest minds from top law schools and professional circles, offering a rigorous platform for testing skills in both adversarial and collaborative settings.
                    </p>
                    
                    <div className="pt-8">
                       <a href="https://superlawyer.in/advocate-maximus-sign-up-for-the-global-arb-med-competition/" className="inline-flex items-center gap-4 text-gold-500 hover:text-navy-950 transition-colors">
                          <span className="text-sm font-bold uppercase tracking-widest underline decoration-gold-500/30">Read Original Announcement</span>
                          <ExternalLink className="w-4 h-4" />
                       </a>
                    </div>
                 </div>
              </FadeInUp>
              
              <FadeInUp className="relative aspect-square rounded-[3rem] overflow-hidden bg-navy-50 shadow-2xl">
                 <Image 
                   src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
                   alt="Competition in progress"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-navy-950/20" />
                 <div className="absolute bottom-12 right-12 text-white">
                    <span className="text-6xl font-black italic opacity-10 uppercase block">Since 2017</span>
                 </div>
              </FadeInUp>
           </div>
        </div>
      </section>

      {/* Unique Pillars Section */}
      <section className="py-24 md:py-40 bg-navy-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <SectionHeader subtitle="Features" title="The Arb-Med Advantage" center />
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <FadeInUp key={i} className="p-10 rounded-[3rem] bg-white border border-navy-100 group hover:bg-navy-950 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                   <div className="w-16 h-16 rounded-2xl bg-navy-50 flex items-center justify-center text-gold-500 mb-8 group-hover:bg-white group-hover:scale-110 transition-all">
                      <item.icon className="w-8 h-8" />
                   </div>
                   <h3 className="text-2xl font-light text-navy-950 group-hover:text-white transition-colors mb-4">{item.title}</h3>
                   <p className="text-navy-500 group-hover:text-white/50 transition-colors font-light leading-relaxed">{item.desc}</p>
                </FadeInUp>
              ))}
           </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 md:py-40 bg-navy-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(191,154,102,0.05),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center">
           <FadeInUp>
              <SectionHeader subtitle="Join the Ranks" title="Experience the Ultimate Competition" light center />
              <div className="flex flex-col items-center gap-12">
                 <p className="text-xl md:text-2xl text-white/50 font-light italic max-w-2xl">
                    Whether as a participant, assessor, or sponsor, Advocate Maximus offers a unique vantage point into the future of legal advocacy.
                 </p>
                 <div className="flex flex-wrap justify-center gap-6">
                    <button className="px-12 py-5 bg-gold-500 text-navy-950 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white transition-all shadow-xl shadow-gold-500/10">
                       Contact for Partnerships
                    </button>
                    <button className="px-12 py-5 border border-white/20 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-navy-950 transition-all">
                       Alumni Network
                    </button>
                 </div>
              </div>
           </FadeInUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
