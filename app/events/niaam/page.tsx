"use client";

import React from "react";
import Image from "next/image";
import { 
  Award, 
  MapPin, 
  Search, 
  ChevronRight, 
  Scale, 
  GraduationCap, 
  Building2, 
  Users,
  Star,
  Download,
  Calendar
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

const awardees = [
  { name: "Adv. Tanu Mehta", city: "Mumbai", category: "Mediation Education", year: "2025" },
  { name: "Justice Mohan Lal Mehta", city: "New Delhi", category: "Mediation Institution Building", year: "2025" },
  { name: "Raj Panchmatia", city: "Mumbai", category: "Mediation Advocacy", year: "2025" },
  { name: "Adv. Veena Ralli", city: "New Delhi", category: "Mediation Practice", year: "2025" },
  { name: "Adv. J P Sengh", city: "New Delhi", category: "Mediation Practice", year: "2024" },
  { name: "Justice A K Sikri", city: "New Delhi", category: "Mediation Advocacy", year: "2024" },
  { name: "Adv. Pusshp Gupta", city: "New Delhi", category: "Mediation Education", year: "2024" },
  { name: "Adv. Sudhanshu Batra", city: "New Delhi", category: "Mediation Practice", year: "2024" },
  { name: "Justice Kurian Joseph", city: "New Delhi", category: "Mediation Advocacy", year: "2024" },
  { name: "A J Jawad", city: "Hyderabad", category: "Mediation Education", year: "2023" },
  { name: "Justice Tejas Karia", city: "New Delhi", category: "Mediation Advocacy", year: "2023" },
  { name: "Laila Ollapally", city: "Bengaluru", category: "Mediation Practice", year: "2023" },
  { name: "Justice Gita Mittal", city: "New Delhi", category: "Mediation Advocacy", year: "2023" },
  { name: "Chitra Narayan", city: "Chennai", category: "Mediation Education", year: "2023" },
  { name: "Adv. Sadhana Ramachandran", city: "New Delhi", category: "Mediation Practice", year: "2023" },
  { name: "Adv. Sriram Panchu", city: "Chennai", category: "Mediation Practice", year: "2023" },
  { name: "Adv. Niranjan Bhat (Post-humously)", city: "Ahmedabad", category: "Mediation Practice", year: "2023" }
];

export default function NIAAMPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white text-navy-950">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-32 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(191,154,102,0.2),transparent_70%)]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          <FadeInUp className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase">Honouring Excellence</span>
              <div className="h-px w-8 bg-gold-500" />
            </div>
            
            <h1 className="text-5xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.85] mb-12 select-none uppercase italic">
              National ImPACT <br />
              <span className="text-gold-500">Awards</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed">
              The National ImPACT Awards is a prestigious platform built to honour individuals who have meaningfully strengthened the growth of mediation in India through advocacy, institution-building, education and practice leadership.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* About the Award Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <FadeInUp>
                 <SectionHeader subtitle="The Benchmark" title="About the Award" />
                 <p className="text-xl md:text-2xl text-navy-500 font-light leading-relaxed mb-12">
                   The National ImPACT Awards for Advancement of Mediation in India recognizes extraordinary contributions across four core pillars of the mediation ecosystem.
                 </p>
                 
                 <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-6 py-3 bg-navy-50 rounded-full text-[10px] font-bold uppercase tracking-widest text-navy-400 border border-navy-100 italic">
                       Established 2023
                    </button>
                    <button className="flex items-center gap-3 px-6 py-3 bg-navy-50 rounded-full text-[10px] font-bold uppercase tracking-widest text-navy-400 border border-navy-100">
                       <Scale className="w-3 h-3" />
                       Annual Conferment
                    </button>
                 </div>
              </FadeInUp>
              
              <div className="grid grid-cols-1 gap-6">
                {[
                  { 
                    icon: Users, 
                    title: "Advocacy", 
                    desc: "Long-term activism for mediation to be explored in courts, communities, non-profits, corporates and small businesses." 
                  },
                  { 
                    icon: Building2, 
                    title: "Institution-building", 
                    desc: "Leading the development of mediation centres, community programmes, digital innovation or court-annexed mediation." 
                  },
                  { 
                    icon: GraduationCap, 
                    title: "Education", 
                    desc: "Dedication to quality training, coaching, and design and delivery of teaching modules in organizations, universities and communities." 
                  },
                  { 
                    icon: Scale, 
                    title: "Practice", 
                    desc: "Demonstrating excellence and innovation as a mediator, mediation counsel or mediation professional across various sectors and industries." 
                  }
                ].map((item, i) => (
                  <FadeInUp key={i} className="p-8 rounded-3xl bg-navy-50 border border-navy-100 group hover:bg-navy-950 transition-colors duration-500">
                     <div className="flex gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gold-500 shadow-sm shrink-0 border border-navy-100 group-hover:border-navy-800 transition-colors">
                           <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-light text-navy-950 group-hover:text-white transition-colors mb-2">{item.title}</h3>
                           <p className="text-navy-500 group-hover:text-white/50 transition-colors font-light leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                  </FadeInUp>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* NIAAM 2026 Section */}
      <section className="py-24 md:py-40 bg-navy-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <div className="max-w-4xl mx-auto rounded-[3rem] bg-navy-950 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-3xl rounded-full" />
              <FadeInUp>
                 <SectionHeader subtitle="Upcoming" title="NIAAM 2026" light center />
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
                    {[
                      { label: "Dates", value: "To Be Announced", icon: Calendar },
                      { label: "Venue", value: "To Be Announced", icon: MapPin },
                      { label: "Awardees", value: "To Be Announced", icon: Trophy }
                    ].map((info) => (
                      <div key={info.label} className="flex flex-col items-center gap-4">
                         <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gold-500 border border-white/10">
                            <info.icon className="w-6 h-6" />
                         </div>
                         <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">{info.label}</span>
                            <p className="text-xl font-light text-white italic">{info.value}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </FadeInUp>
           </div>
        </div>
      </section>

      {/* Hall of Honorary Recipients Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <SectionHeader subtitle="Distinction" title="Hall of Honorary Recipients" center />
           
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                 <FadeInUp key={i} className="aspect-3/4 rounded-2xl bg-navy-50 border border-navy-100 flex flex-col items-center justify-center p-8 text-center group hover:bg-navy-950 transition-colors duration-700">
                    <Award className="w-16 h-16 text-gold-500 opacity-20 group-hover:opacity-100 transition-opacity mb-8" />
                    <div className="space-y-4">
                       <div className="h-px w-8 bg-navy-200 group-hover:bg-gold-500/30 mx-auto" />
                       <span className="text-[10px] font-mono text-navy-300 group-hover:text-white/30 uppercase tracking-[0.2em]">{i < 4 ? "NIAAM 2025" : i < 7 ? "NIAAM 2024" : "NIAAM 2023"}</span>
                    </div>
                 </FadeInUp>
              ))}
           </div>
        </div>
      </section>

      {/* NIAAM Awardees Section */}
      <section className="py-24 md:py-40 bg-navy-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <SectionHeader subtitle="Recognition" title="NIAAM Awardees" light center />
           
           <div className="space-y-6 max-w-5xl mx-auto">
              {awardees.map((awardee, i) => (
                 <FadeInUp key={i} className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center p-6 md:p-10 rounded-4xl bg-white/2 border border-white/5 hover:bg-white/5 hover:border-white/20 transition-all duration-500">
                    <div className="md:col-span-1">
                       <span className="text-3xl font-bold text-gold-500/20 group-hover:text-gold-500 transition-colors italic whitespace-nowrap">{awardee.year}</span>
                    </div>
                    <div className="md:col-span-5">
                       <h3 className="text-2xl md:text-3xl font-light text-white group-hover:text-gold-500 transition-colors uppercase tracking-tight">{awardee.name}</h3>
                    </div>
                    <div className="md:col-span-4">
                       <div className="space-y-1">
                          <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block">Category</span>
                          <p className="text-base text-white/60 font-light">{awardee.category}</p>
                       </div>
                    </div>
                    <div className="md:col-span-2 text-right">
                       <div className="flex items-center justify-end gap-2 text-white/30 group-hover:text-white/60 transition-colors">
                          <MapPin className="w-3 h-3" />
                          <span className="text-sm font-light uppercase tracking-widest">{awardee.city}</span>
                       </div>
                    </div>
                 </FadeInUp>
              ))}
           </div>
        </div>
      </section>

      {/* Ceremonial Clicks Section */}
      <section className="py-24 md:py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <SectionHeader subtitle="Gallery" title="Ceremonial Clicks" />
           <div className="flex gap-6 overflow-x-auto pb-12 snap-x no-scrollbar">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                 <div key={i} className="min-w-[320px] md:min-w-[600px] aspect-4/3 relative rounded-4xl overflow-hidden snap-center bg-navy-50">
                    <Image 
                      src={`https://images.unsplash.com/photo-15${200000000 + i * 10000}?auto=format&fit=crop&q=80`}
                      alt={`Ceremony ${i}`}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-12 bg-linear-to-t from-navy-950/80 to-transparent">
                       <p className="text-lg text-white font-light italic">National ImPACT Awards • Moment {i}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const Trophy = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.45.98.92 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)
