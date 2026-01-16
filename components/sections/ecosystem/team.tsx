"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
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
    <section id="team" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <FadeInUp className="text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-3 mb-4">
             <div className="h-px w-8 bg-gold-500" />
             <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">The Team</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-light text-navy-950 tracking-tight mb-8">Nurturing <span className="text-gold-500 italic font-medium">Innovation</span></h2>
          <p className="max-w-2xl mx-auto text-lg text-navy-950/60 font-light">
            PACT prides itself on nurturing a cohesive, fearless and innovative working atmosphere that allows a dedicated cohort of individuals to learn, grow and serve the profession of Mediation.
          </p>
        </FadeInUp>

        {/* Managing Partners */}
        <div className="mb-32">
          <h3 className="text-2xl font-mono uppercase tracking-[0.3em] text-navy-950/30 mb-12 text-center md:text-left">Managing Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {teamData.managingPartners.map((partner, i) => (
              <FadeInUp key={i} delay={i * 0.2}>
                <div className="group grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 items-start">
                  <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-navy-50 border border-navy-100 shadow-xl group-hover:shadow-2xl transition-all duration-700">
                    <Image src={partner.image} alt={partner.name} fill className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-3xl font-light text-navy-950 leading-tight mb-1">{partner.name}</h4>
                      <p className="text-gold-500 font-mono text-[10px] uppercase tracking-widest font-bold">{partner.role}</p>
                    </div>
                    <p className="text-sm md:text-base text-navy-950/60 font-light leading-relaxed">
                      {partner.bio}
                    </p>
                    <div className="flex gap-4">
                       <button className="w-10 h-10 rounded-full border border-navy-100 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white transition-all"><Linkedin className="w-4 h-4" /></button>
                       <button className="w-10 h-10 rounded-full border border-navy-100 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white transition-all"><Mail className="w-4 h-4" /></button>
                       <button className="px-6 py-2 rounded-full bg-navy-50 text-[10px] uppercase font-bold tracking-widest text-navy-950/50 hover:bg-gold-500 hover:text-white transition-all">Profile</button>
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
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {teamData.mediators.map((m, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-navy-50/50 border border-navy-100/50 hover:bg-white hover:border-gold-500/20 hover:shadow-lg transition-all">
                    <h4 className="text-lg font-bold text-navy-950 mb-1">{m.name}</h4>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-gold-500 font-bold">{m.niche}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Members & Externs */}
        <div className="pt-24 flex flex-col md:flex-row gap-20 md:gap-32">
          <div className="flex-1">
             <h3 className="text-xl font-mono uppercase tracking-[0.3em] text-navy-950/30 mb-8">Team Members</h3>
             <div className="flex flex-wrap gap-4">
               {teamData.members.map((m, i) => (
                 <span key={i} className="px-6 py-3 rounded-full bg-white border border-navy-100 text-sm font-light text-navy-950 hover:bg-gold-500 hover:text-white transition-all cursor-default">
                   {m.name}
                 </span>
               ))}
             </div>
          </div>
          <div className="md:w-1/3">
             <h3 className="text-xl font-mono uppercase tracking-[0.3em] text-navy-950/30 mb-8">Mediation Externs</h3>
             <div className="flex flex-col gap-3">
                {teamData.externs.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    <span className="text-lg font-light text-navy-950/60 group-hover:text-navy-950 transition-colors">{m.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
