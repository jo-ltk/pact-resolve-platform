"use client";

import React from "react";
import Image from "next/image";
import { 
  ArrowUpRight, 
  ExternalLink, 
  Mail, 
  BookOpen, 
  Users, 
  Building2, 
  Globe, 
  Zap, 
  Calendar,
  Search,
  History,
  MapPin,
  PlayCircle,
  Scale
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

const archives = [
  {
    title: "BITS Law School | Panel on Mediation & Arbitration in International Commercial Conflicts",
    location: "Mumbai, 2025",
    description: "BITS Law School hosted a webinar on the “Role of Mediation and Arbitration in Resolving International Commercial Conflicts”, exploring how mixed-mode dispute resolution is shaping cross-border business disputes and India’s evolving position in that space.",
    link: "https://www.youtube.com/watch?v=nQLB_E2Z3hg",
    category: "Webinar"
  },
  {
    title: "Saveetha School of Law - Three-Day Workshop on Mediation",
    location: "Chennai, 2024",
    description: "Intensive three-day skills workshop at Saveetha School of Law, Chennai, where Jonathan Rodrigues introduced core mediation principles, empathic listening, the IMPACT model, and full role-play simulations from convening to agreement.",
    link: "https://saveethalaw.com/news/three-day-workshop-on-mediation",
    category: "Workshop"
  },
  {
    title: "SRM University Delhi-NCR (Haryana) - Mediation & Negotiation Workshop",
    location: "Sonepat, 2023",
    description: "Two-day workshop for final-year students on mediation and negotiation. Jonathan Rodrigues led sessions on mediator qualities and practical skills, alongside ASCL’s Gokul Narayan, with 97 students participating.",
    link: "https://srmuniversity.ac.in/event/workshop-on-mediation-and-negotiation",
    category: "Workshop"
  },
  {
    title: "Manav Rachna University – Mediation Bootcamp",
    location: "Faridabad, 2023",
    description: "A two-day Mediation Bootcamp organised by MRU’s Centre of Excellence on ADR with Jonathan Rodrigues as collaborator and trainer.",
    link: "https://manavrachna.edu.in/assets/campus/mru/pdf/sol-newsletter-4.pdf",
    category: "Bootcamp"
  },
  {
    title: "LedX × The PACT – Bootcamp on Mediation, Conflict & Client Counselling",
    location: "Indore, 2022",
    description: "Mediation bootcamp hosted on LedX, teaching foundational mediation concepts, conflict styles, communication skills, and client-counselling techniques.",
    link: "https://classroom.ledx.law/bootcamp-on-mediation-client-counselling/",
    category: "Bootcamp"
  },
  {
    title: "Lawctopus × The PACT – Online Bootcamp on Negotiation, Mediation & Conciliation",
    location: "Online, 2020",
    description: "Two-day intensive online bootcamp where The PACT team trained students and young professionals on negotiation strategy, the mediation process, legal provisions for mediation.",
    link: "https://www.lawctopus.com/adrbootcamp/",
    category: "Online Bootcamp"
  },
  {
    title: "RGNUL x PACT – Sports & Entertainment Law National Mediation Competition",
    location: "Patiala, 2018",
    description: "The first three editions of the RGNUL Sports & Entertainment Law National Mediation Competition was run in association with The PACT as co-founders of the event.",
    link: "https://www.lawctopus.com/rgnul-sports-and-entertainment-law-mediation-competition/",
    category: "Competition"
  },
  {
    title: "ASCL x PACT – Certificate Course in Mediation Advocacy",
    location: "New Delhi, 2023",
    description: "Asian School of Cyber Laws (ASCL) and The PACT launch an online certificate course in Mediation Advocacy.",
    link: "https://www.tribuneindia.com/news/business/ascl-pact-launch-certificate-course-in-mediation-advocacy/",
    category: "Course"
  },
  {
    title: "Advocate Maximus – India’s First Arb-Med Competition",
    location: "New Delhi, 2017",
    description: "In collaboration with Senior Advocate Ratan K Singh, PACT launches India’s first Arbitration-Mediation competition and conference.",
    link: "https://superlawyer.in/advocate-maximus-sign-up-for-the-global-arb-med-competition/",
    category: "Competition"
  }
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-navy-950 text-white">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-32 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80"
            alt="Events & Projects Hero"
            fill
            className="object-cover opacity-20 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-navy-950/40 via-navy-950/90 to-navy-950" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
           <FadeInUp>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase">#MissionMediation</span>
              </div>
              <h1 className="text-5xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.85] mb-12 select-none uppercase">
                Events & <br />
                <span className="text-gold-500 italic">Projects</span>
              </h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                <div className="space-y-8">
                  <p className="text-xl md:text-3xl text-white/90 font-light leading-tight tracking-tight">
                    All events and projects curated, co-hosted, supported or sponsored by PACT sit under our broader mission.
                  </p>
                  <p className="text-lg text-white/50 font-light max-w-xl leading-relaxed">
                    We seek to mainstream mediation, build professional capacity in conflict resolution across legal and business ecosystems, and empower individuals with collaborative dispute resolution skills.
                  </p>
                  
                  <div className="pt-8">
                     <a href="mailto:official@thepact.in" className="inline-flex items-center gap-4 bg-white text-navy-950 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gold-500 transition-all">
                        <Mail className="w-5 h-5" />
                        Inquire for Collaboration
                     </a>
                  </div>
                </div>
              </div>
           </FadeInUp>
        </div>
      </section>

      {/* Engagement Grid Section */}
      <section className="py-24 md:py-40 bg-white text-navy-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <SectionHeader subtitle="Get Involved" title="Partner with PACT" />
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BookOpen, text: "Lectures & Seminars at Universities" },
                { icon: Globe, text: "Workshop & Webinars on Campus" },
                { icon: Building2, text: "Office Offsites & Retreats" },
                { icon: Users, text: "Reflective Practice with Leadership Teams" },
                { icon: Zap, text: "Design, Host and Sponsor Conferences" },
                { icon: Scale, text: "Support and Co-Host a Competition" }
              ].map((item, i) => (
                <FadeInUp key={i} className="group p-8 rounded-3xl bg-navy-50 border border-navy-100 hover:bg-navy-950 transition-all duration-500">
                   <div className="flex flex-col gap-8 h-full">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gold-500 border border-navy-100 group-hover:border-navy-900 shadow-sm transition-all">
                         <item.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-light text-navy-950 group-hover:text-white transition-colors">{item.text}</h3>
                      <div className="mt-auto">
                         <a href="mailto:official@thepact.in" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-navy-300 group-hover:text-gold-500 transition-colors">
                            Invite PACT <ArrowUpRight className="w-3 h-3" />
                         </a>
                      </div>
                   </div>
                </FadeInUp>
              ))}
           </div>
        </div>
      </section>

      {/* Watch Out For Section */}
      <section className="py-24 md:py-40 bg-navy-50 text-navy-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <SectionHeader subtitle="Upcoming" title="Watch Out For" center />
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Workshop on Mediation", 
                  date: "March 2026", 
                  location: "SRM School of Law, Sonepat, Haryana" 
                },
                { 
                  title: "ODRC Negotiation Contest", 
                  date: "June 2026", 
                  location: "Online Event" 
                },
                { 
                  title: "Lecture on Mediation", 
                  date: "April 2026", 
                  location: "IIULER School of Law, Goa" 
                }
              ].map((item, i) => (
                <FadeInUp key={i} className="p-10 rounded-[3rem] bg-white border border-navy-100 shadow-xl shadow-navy-950/5 relative group overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Calendar className="w-24 h-24 text-navy-950" />
                   </div>
                   <div className="relative z-10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 font-bold block mb-4">{item.date}</span>
                      <h3 className="text-3xl font-light text-navy-950 mb-8 leading-tight italic tracking-tighter uppercase">{item.title}</h3>
                      <div className="flex items-center gap-2 text-navy-400">
                         <MapPin className="w-4 h-4" />
                         <span className="text-sm font-medium tracking-tight uppercase">{item.location}</span>
                      </div>
                   </div>
                </FadeInUp>
              ))}
           </div>
        </div>
      </section>

      {/* Archives Section */}
      <section className="py-24 md:py-40 bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <SectionHeader subtitle="Legacy" title="Archives" light center />
           
           <div className="space-y-6 max-w-5xl mx-auto">
              {archives.map((item, i) => (
                 <FadeInUp key={i} className="group p-8 md:p-12 rounded-4xl bg-white/2 border border-white/5 hover:bg-white/5 hover:border-white/20 transition-all duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                       <div className="md:col-span-3">
                          <span className="text-sm font-mono uppercase tracking-[0.2em] text-gold-500/50 block mb-2">{item.category}</span>
                          <p className="text-xl font-light text-white italic">{item.location}</p>
                       </div>
                       <div className="md:col-span-1">
                          <div className="h-px w-full bg-white/10 mt-6 hidden md:block" />
                       </div>
                       <div className="md:col-span-8">
                          <h3 className="text-2xl md:text-3xl font-light text-white group-hover:text-gold-500 transition-colors uppercase tracking-tighter mb-6">{item.title}</h3>
                          <p className="text-white/50 font-light leading-relaxed mb-8">{item.description}</p>
                          <a href={item.link} className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-gold-500 transition-colors">
                             View Case Detail <ExternalLink className="w-4 h-4" />
                          </a>
                       </div>
                    </div>
                 </FadeInUp>
              ))}
           </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <SectionHeader subtitle="Moments" title="Gallery" />
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                 <FadeInUp key={i} className={cn(
                    "relative aspect-square rounded-3xl overflow-hidden group",
                    i === 2 && "md:col-span-2 md:aspect-auto",
                    i === 5 && "md:row-span-2 md:aspect-auto"
                 )}>
                    <Image 
                      src={`https://images.unsplash.com/photo-15${100000000 + i * 20000}?auto=format&fit=crop&q=80`}
                      alt={`Gallery ${i}`}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors" />
                 </FadeInUp>
              ))}
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
