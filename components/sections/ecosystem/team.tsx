"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail, Plus } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { EcosystemSubPageHero } from "./ecosystem-subpage-hero";
import { cn } from "@/lib/utils";

const teamData = {
  managingPartners: [
    {
      name: "Jonathan Rodrigues",
      role: "Managing Partner",
      bio: "Jonathan Rodrigues is an Accredited International Mediator with an academic background in Psychology and Law and prior professional experience in journalism and education. He pursued an LL.M. in Mediation and Conflict Resolution in the UK and has served as a mediator in various capacities in Glasgow and London. Jonathan is certified as a civil, commercial, and workplace mediator by bodies including IIAM, IICA, TCM, PSMA, NALSA and IAM, and has delivered a TEDx talk on the Multi-Door Dispute Resolution System. He acts as a consultant at The TCM Group (London) Mediator Academy (London) and ICFML (Portugal/Brazil). He advises MediateIndia! and is the Regional Assistant Editor – South Asia for Kluwer Mediation Blog. Jonathan is the host of the Mission Mediation Podcast and Editor at Mediation Simplified.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    },
    {
      name: "Nisshant Laroia",
      role: "Managing Partner",
      bio: "Nisshant Laroia is an Accredited Mediator, trained and certified by IIAM, IICA, PSMA, and a certified Mediation Counsel by SIMI and SCMA. A graduate of Gujarat National Law University (GNLU), he has worked as in-house counsel at Yogic Naturals, a pioneering health and wellness brand. Nisshant is the author of Mediation Simplified and co-founder of the Global Academy for Advocacy in Dispute Resolution (GAADR). He has worked with 15,000+ law students, introducing them to mediation, and is also an associate-grade arbitrator with the Chartered Institute of Arbitrators (CIArb). He has served as a mediator at the Delhi Dispute Resolution Society mediation centre.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
    }
  ],
  mentors: [
    { name: "Justice Tejas Karia", role: "Partner, Shardul Amarchand Mangaldas" },
    { name: "Justice Gita Mittal", role: "Retd. Judge, Chief Justice (JKHC)" },
    { name: "Justice Kurian Joseph", role: "Retd. Judge, Supreme Court of India" },
    { name: "Chitra Narayan", role: "Advocate & Mediator" }
  ],
  mediators: [
    { name: "Jonathan Rodrigues", niche: "International & Commercial" },
    { name: "Soni Singh", niche: "Civil & Commercial" },
    { name: "Ekta Bahl", niche: "Corporate & Law" },
    { name: "Raj Panchmatia", niche: "Dispute Resolution" }
  ],
  members: [
    { name: "Jatan Rodrigues" },
    { name: "Sandeep Bhalothia" },
    { name: "Juhi Gupta" },
    { name: "Gokul Narayan" }
  ],
  externs: [
    { name: "Sainishtha Gupta" },
    { name: "Naman Grover" }
  ]
};

export function TeamSection() {
  return (
    <section id="team" className="bg-white overflow-hidden">
      <EcosystemSubPageHero 
        tag="The Team"
        title={<>Nurturing <span className="text-gold-500 italic font-medium">Innovation</span></>}
        description="PACT prides itself on nurturing a cohesive, fearless and innovative working atmosphere that allows a dedicated cohort of individuals to learn, grow and serve the profession of Mediation."
      />
      
      <div className="pt-16 pb-24 md:pt-24 md:pb-32 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        {/* Managing Partners - Wide Layout */}
        <div className="mb-32 space-y-24">
          <div className="flex items-center gap-4 mb-16 justify-center md:justify-start">
            <div className="h-px w-12 bg-gold-500" />
            <h3 className="text-base font-mono uppercase tracking-[0.4em] text-navy-950/40">Managing Partners</h3>
          </div>
          
          <div className="space-y-32">
            {teamData.managingPartners.map((partner, i) => (
              <FadeInUp key={i} delay={i * 0.2}>
                <div className={cn(
                  "flex flex-col gap-12 lg:gap-24 items-center",
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                )}>
                  {/* Image Side */}
                  <div className="w-full lg:w-[450px] shrink-0">
                    <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border border-navy-100 shadow-2xl group">
                      <Image 
                        src={partner.image} 
                        alt={partner.name} 
                        fill 
                        className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                        sizes="(max-width: 1024px) 100vw, 450px"
                      />
                      <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="flex-1 space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gold-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">{partner.role}</span>
                        <div className="h-px w-8 bg-gold-500/20" />
                      </div>
                      <h4 className="text-[10vw] md:text-6xl font-light text-navy-950 tracking-tighter leading-none uppercase">
                        {partner.name.split(' ')[0]} <br className="hidden md:block" />
                        <span className="text-gold-500 italic font-medium">{partner.name.split(' ').slice(1).join(' ')}</span>
                      </h4>
                    </div>
                    
                    <p className="text-lg md:text-xl text-navy-950/60 font-light leading-relaxed tracking-tight max-w-3xl">
                      {partner.bio}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-8 pt-6">
                      <div className="flex gap-4">
                        <a href="#" className="w-12 h-12 rounded-full border border-navy-100 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white transition-all shadow-sm">
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-full border border-navy-100 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white transition-all shadow-sm">
                          <Mail className="w-5 h-5" />
                        </a>
                      </div>
                      
                      <div className="h-px w-12 bg-navy-100 hidden md:block" />
                      
                      <button className="group/btn inline-flex items-center gap-3 text-xs uppercase font-bold tracking-[0.3em] text-gold-500 hover:text-navy-950 transition-colors">
                        Access Full Profile <ArrowUpRight className="w-4 h-4 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>

        {/* Mentors & Neutrals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 pb-24 border-b border-navy-50">
          <div>
            <h3 className="text-xl font-mono uppercase tracking-[0.3em] text-navy-950/30 mb-10">Strategic Mentors</h3>
            <div className="space-y-6">
              {teamData.mentors.map((m, i) => (
                <div key={i} className="group flex justify-between items-center py-4 border-b border-navy-50 hover:border-gold-500/30 transition-colors">
                  <div>
                    <h4 className="text-xl font-light text-navy-950 group-hover:text-gold-500 transition-colors">{m.name}</h4>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy-950/40">{m.role}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-navy-950/10 group-hover:text-gold-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
             <h3 className="text-xl font-mono uppercase tracking-[0.3em] text-navy-950/30 mb-10">Featured Mediators</h3>
             <div className="space-y-6">
               {teamData.mediators.map((m, i) => (
                 <div key={i} className="group flex justify-between items-center py-4 border-b border-navy-50 hover:border-gold-500/30 transition-colors">
                   <div>
                     <h4 className="text-xl font-light text-navy-950 group-hover:text-gold-500 transition-colors">{m.name}</h4>
                     <p className="text-[10px] font-mono uppercase tracking-widest text-gold-500 font-bold">{m.niche}</p>
                   </div>
                   <ArrowUpRight className="w-4 h-4 text-navy-950/10 group-hover:text-gold-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Members & Externs */}
        <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
          <div>
             <h3 className="text-xl font-mono uppercase tracking-[0.3em] text-navy-950/30 mb-10">Team Members</h3>
             <div className="space-y-4">
               {teamData.members.map((m, i) => (
                 <div key={i} className="group flex items-center justify-between py-3 border-b border-navy-50 hover:border-gold-500/20 transition-colors">
                   <span className="text-lg font-light text-navy-950/60 group-hover:text-navy-950 transition-colors">{m.name}</span>
                   <div className="w-1 h-1 rounded-full bg-navy-100 group-hover:bg-gold-500 transition-colors" />
                 </div>
               ))}
             </div>
          </div>
          <div>
             <h3 className="text-xl font-mono uppercase tracking-[0.3em] text-navy-950/30 mb-10">Mediation Externs</h3>
             <div className="space-y-4">
                {teamData.externs.map((m, i) => (
                  <div key={i} className="group flex items-center justify-between py-3 border-b border-navy-50 hover:border-gold-500/20 transition-colors">
                    <span className="text-lg font-light text-navy-950/60 group-hover:text-navy-950 transition-colors">{m.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500/40 opacity-0 group-hover:opacity-100 transition-opacity">Externship</span>
                      <div className="w-1 h-1 rounded-full bg-navy-100 group-hover:bg-gold-500 transition-colors" />
                    </div>
                  </div>
                ))}
                
                {/* Join the Mission CTA */}
                <div className="pt-6">
                  <button className="group/join w-full flex items-center justify-between p-6 rounded-3xl bg-navy-50/50 border border-navy-100/50 hover:bg-white hover:border-gold-500/30 hover:shadow-xl transition-all duration-500">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-navy-950 group-hover/join:bg-gold-500 group-hover/join:text-white transition-all duration-500 group-hover/join:rotate-12 shadow-sm border border-navy-100/50">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-navy-950 uppercase tracking-widest mb-0.5">Join the Mission</p>
                        <p className="text-[10px] text-navy-950/40 font-mono uppercase tracking-widest">Apply for Externship</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-navy-950/20 group-hover/join:text-gold-500 transition-colors" />
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
