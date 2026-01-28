"use client";

import React from "react";
import Image from "next/image";
import { 
  Users, 
  Mail, 
  Calendar, 
  MapPin, 
  MessageSquare,
  BarChart3,
  Presentation,
  Handshake,
  Lightbulb,
  Building2,
  Briefcase,
  Scale,
  GraduationCap,
  Globe,
  Gavel
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

export default function MMCPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-navy-950 text-white">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-32 bg-navy-950 overflow-hidden dark">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
            alt="MMC Header"
            fill
            className="object-cover opacity-20 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-navy-950/40 via-navy-950/90 to-navy-950" />
          <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-navy-950 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          <FadeInUp>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase">
                The Stakeholder Gathering
              </span>
            </div>
            <h1 className="text-5xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.85] mb-12 select-none uppercase italic">
              MISSION <br />
              <span className="text-gold-500">MEDIATION</span> <br />
              CONCLAVE
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              <div className="space-y-8">
                <p className="text-xl md:text-3xl text-white/90 font-light leading-tight tracking-tight">
                  The second edition of this unique gathering of mediation stakeholders will once again feature real case studies, practical insights and evidence-driven conversations on mediation as a practice and profession in India.
                </p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                  {[
                    { label: "2026 Dates", value: "More Details Soon" },
                    { label: "2026 Venue", value: "More Details Soon" },
                    { label: "2026 Hosts", value: "More Details Soon" },
                    { label: "2026 Sponsors", value: "More Details Soon" }
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-2">
                       <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{item.label}</span>
                       <span className="text-sm font-medium text-gold-500">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-8">
                  <a href="mailto:official@thepact.in" className="px-8 py-4 bg-gold-500 text-navy-950 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white transition-all">
                    Sign Up as Speaker 
                  </a>
                  <a href="mailto:official@thepact.in" className="px-8 py-4 border border-white/20 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-navy-950 transition-all">
                    Sign Up as Sponsor
                  </a>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Mediation in Practice Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
             <FadeInUp>
                <SectionHeader subtitle="The Format" title="Mediation in Practice" />
                <p className="text-xl md:text-2xl text-navy-900 font-light leading-relaxed mb-12">
                  The Mission Mediation Conclave is a gathering that is open to every stakeholder involved in the practice and profession of Mediation. The uniquely immersive format allows everyone in the audience to join those on the dais and contribute to the discussions.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { icon: Presentation, text: "Relevant Case Studies" },
                    { icon: Lightbulb, text: "Practice Techniques" },
                    { icon: BarChart3, text: "Data-driven Insights" },
                    { icon: MessageSquare, text: "Interactive Conversations" },
                    { icon: Users, text: "Immersive Workshopping" },
                    { icon:Globe, text: "Live Polls & Reports" }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-navy-50 flex items-center justify-center text-navy-950 group-hover:bg-gold-500 group-hover:text-white transition-all">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <span className="text-lg font-light text-navy-600 group-hover:text-navy-950 transition-colors">{feature.text}</span>
                    </div>
                  ))}
                </div>
             </FadeInUp>
             
             <FadeInUp className="relative aspect-4/5 rounded-4xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80"
                  alt="Conversations at MMC"
                  fill
                  className="object-cover"
                />
             </FadeInUp>
          </div>
        </div>
      </section>

      {/* Guests of Honour Section */}
      <section className="py-24 md:py-32 bg-navy-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <SectionHeader subtitle="Distinction" title="Guests of Honour" center />
          <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar">
             {[
               "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
               "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
               "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
               "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
               "https://images.unsplash.com/photo-1552058544-f2b08422138a"
             ].map((url, i) => (
                <div key={i} className="min-w-[280px] group">
                   <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden mb-6 border border-white/10 shadow-2xl">
                      <Image 
                        src={`${url}?auto=format&fit=crop&q=80`}
                        alt={`Guest of Honour ${i + 1}`}
                        fill
                        className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Join the Mission Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
              <FadeInUp className="relative aspect-4/3 rounded-4xl overflow-hidden border border-navy-100 shadow-2xl shadow-navy-950/10">
                 <Image 
                   src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80"
                   alt="MMC Sponsors 2025"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-navy-900/10" />
                 <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-navy-100">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-navy-400">Archive</span>
                    <p className="text-navy-950 font-bold tracking-tight">Sponsors • 2025 Edition</p>
                 </div>
              </FadeInUp>
              
              <FadeInUp>
                 <SectionHeader subtitle="Participation" title="Who Should Participate?" />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {[
                      { icon: Building2, text: "C-Suite Leaders" },
                      { icon: Briefcase, text: "Business Professionals" },
                      { icon: Scale, text: "Law Firm Lawyers" },
                      { icon: Gavel, text: "In-House Counsel" },
                      { icon: Users, text: "Judges & Arbitrators" },
                      { icon: Handshake, text: "Mediators & Case Managers" },
                      { icon: Globe, text: "Policymakers & Researchers" },
                      { icon: GraduationCap, text: "Students & Professors" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group cursor-default">
                         <item.icon className="w-5 h-5 text-gold-500/50 group-hover:text-gold-500 transition-colors" />
                         <span className="text-xl font-light text-navy-950/60 group-hover:text-navy-950 transition-colors uppercase tracking-tight">{item.text}</span>
                      </div>
                    ))}
                 </div>
              </FadeInUp>
           </div>
        </div>
      </section>

      {/* Highlights - 2025 Section */}
      <section className="py-24 md:py-40 bg-navy-950 text-white overflow-hidden dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <SectionHeader 
            subtitle="The 2025 Edition" 
            title="Highlights" 
            light
            description="Mission Mediation Conclave 2025 was held on 9 November at India International Centre, New Delhi, with Samvād: Partners and Dua Associates as Headline Sponsors."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
             <FadeInUp className="aspect-3/4 lg:aspect-video relative rounded-3xl overflow-hidden border border-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80"
                  alt="Poster of Speakers and Sponsors"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-navy-950/20" />
                <div className="absolute bottom-10 left-10">
                   <h3 className="text-3xl font-bold italic tracking-tighter">Event Poster 2025</h3>
                </div>
             </FadeInUp>
             
             <div className="grid grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                   <FadeInUp key={i} className="aspect-square relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                      <Image 
                        src={`https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80`}
                        alt={`MMC Gallery ${i}`}
                        fill
                        className="object-cover"
                      />
                   </FadeInUp>
                ))}
             </div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
             {[3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="min-w-[280px] aspect-square relative rounded-4xl overflow-hidden opacity-50 hover:opacity-100 transition-opacity">
                   <Image 
                     src={`https://images.unsplash.com/photo-157400000000${i}?auto=format&fit=crop&q=80`}
                     alt={`MMC Grid ${i}`}
                     fill
                     className="object-cover"
                   />
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Media & Press Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <SectionHeader subtitle="Coverage" title="Media & Press" center />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               {
                 source: "ET Legal World",
                 headline: "India urged to lead global mediation with international headquarters",
                 link: "https://legal.economictimes.indiatimes.com/news/web-stories/india-urged-to-lead-global-mediation-with-international-headquarters/125224193"
               },
               {
                 source: "BW World",
                 headline: "Attorney General R Venkataramani to grace the Mediation Championship India 2025",
                 link: "https://www.bwlegalworld.com/article/attorney-general-r-venkataramani-to-grace-the-mediation-championship-india-2025-hosted-by-the-pact-577838"
               },
               {
                 source: "Bar and Bench",
                 headline: "I am more gladiator than mediator - AG Venkataramani calls for mediation push",
                 link: "https://www.barandbench.com/news/i-am-more-gladiator-than-mediator-ag-venkataramani-calls-for-mediation-push"
               }
             ].map((item, i) => (
               <FadeInUp key={i} className="flex flex-col items-center group">
                  <div className="h-12 w-32 bg-navy-50 rounded-lg flex items-center justify-center mb-8 grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100 group-hover:bg-white border border-transparent group-hover:border-navy-100 px-4">
                     <span className="font-serif font-bold text-navy-950 text-xs">{item.source}</span>
                  </div>
                  <h3 className="text-2xl font-light text-navy-950 mb-6 leading-tight group-hover:text-gold-500 transition-colors underline decoration-transparent group-hover:decoration-gold-500/30 underline-offset-8">
                     {item.headline}
                  </h3>
                  <a href={item.link} className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy-300 hover:text-gold-500 transition-colors">Read Article</a>
               </FadeInUp>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
