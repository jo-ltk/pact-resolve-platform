"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Users, 
  Briefcase, 
  ShieldCheck, 
  GraduationCap, 
  BookOpen, 
  Share2, 
  Megaphone, 
  Trophy,
  Globe,
  Star,
  Zap,
  Heart,
  Target,
  ArrowRight
} from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { EcosystemSubPageHero } from "./ecosystem-subpage-hero";
import { useState, useEffect } from "react";
import { type EcosystemAward } from "@/lib/db/schemas";

const whatWeDoItems = [
  { title: "Private Mediation Services", icon: ShieldCheck },
  { title: "Mediation Counsel Consultancy", icon: Briefcase },
  { title: "Business Negotiations Consultancy", icon: Users },
  { title: "Training C-Suite Leaders", icon: GraduationCap },
  { title: "Accrediting Mediation Lawyers", icon: Star },
  { title: "Upskilling Next-Gen Professionals", icon: Zap },
  { title: "Quality Literature & Content", icon: BookOpen },
  { title: "Purposeful Networking Events", icon: Share2 },
  { title: "Focussed Awareness Campaigns", icon: Megaphone },
];

const values = [
  {
    letter: "N",
    label: "Network",
    description: "We build strong networks across law firms, corporates, institutions, and professionals to foster collaboration in mediation and dispute resolution. These networks enable knowledge-sharing, referrals, and collective growth of a mediation culture."
  },
  {
    letter: "I",
    label: "Inspire",
    description: "We inspire individuals and organisations to view conflict as an opportunity for dialogue and transformation rather than confrontation. Through leadership, education, and example, we encourage confidence in consensual resolution."
  },
  {
    letter: "C",
    label: "Create",
    description: "We create platforms, programmes, and frameworks that make mediation accessible, practical, and effective. Our initiatives are designed to innovate dispute resolution and respond to evolving professional needs."
  },
  {
    letter: "E",
    label: "Empower",
    description: "We empower lawyers, professionals, and institutions with the skills, tools, and mindset required to engage in mediation effectively. Empowerment ensures informed participation, ethical practice, and sustainable outcomes."
  },
  {
    letter: "R",
    label: "Resolve",
    description: "We support the resolution of disputes through structured, confidential, and good-faith mediation processes. Resolution focuses not only on settlement, but on preserving relationships and enabling long-term solutions."
  }
];

export function AboutUs() {
  const [awards, setAwards] = useState<EcosystemAward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch("/api/content/ecosystem/awards");
        const result = await response.json();
        if (result.success) {
          setAwards(result.data);
        }
      } catch (error) {
        console.error("Error fetching awards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  return (
    <div className="bg-white">
      {/* Who We Are */}
      <EcosystemSubPageHero 
        tag="About Us"
        title={<>Transforming the <br /> <span className="text-gold-500 italic font-medium">culture of dialogue</span></>}
        description="The PACT is a leading mediation institute and service provider committed to transforming how conflicts are addressed in India and beyond."
      />
      
      <section className="pt-16 pb-16 md:pt-24 md:pb-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <FadeInUp delay={0.2}>
              <p className="text-xl md:text-2xl font-light text-navy-950/70 leading-relaxed tracking-tight">
                The PACT is a leading mediation institute and service provider committed to transforming how conflicts are addressed in India and beyond. We work with law firms, corporates, institutions, and professionals to promote mediation as a practical, ethical and effective pathway to resolution.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.3} className="space-y-6 md:space-y-8">
              <p className="text-base md:text-lg font-light text-navy-950/40 italic leading-relaxed border-l-4 border-gold-500/50 pl-6 md:pl-10">
                Through mediation services, advocacy training, consulting and capacity-building initiatives, The PACT advances a culture of dialogue, confidentiality, and collaboration—helping individuals and organisations resolve disputes efficiently while preserving relationships and reputations.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="px-4 md:px-6 py-2 rounded-full bg-navy-50 text-[10px] font-mono text-navy-950/40 uppercase tracking-widest">Est. 2015</div>
                <div className="px-4 md:px-6 py-2 rounded-full bg-navy-50 text-[10px] font-mono text-navy-950/40 uppercase tracking-widest">17,000+ Users</div>
                <div className="px-4 md:px-6 py-2 rounded-full bg-navy-50 text-[10px] font-mono text-navy-950/40 uppercase tracking-widest">Global Standards</div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="pt-8 pb-16 sm:pb-24 md:pb-32 bg-white relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="hidden md:block absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-500/5 blur-[120px] rounded-full" />
          <div className="hidden md:block absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-navy-950/3 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <FadeInUp>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-navy-50 border border-navy-100 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase text-navy-950/60 font-bold">Our Reach</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-[5.5rem] font-extralight tracking-tight text-navy-950 mb-8 leading-[0.95]">
                What We <span className="italic font-medium text-gold-500">Do</span>
              </h2>
              <div className="h-px w-24 bg-gold-500/30 mx-auto mb-8" />
              <p className="text-lg sm:text-xl md:text-2xl text-navy-950/40 font-light max-w-3xl mx-auto leading-relaxed tracking-tight">
                Empowering the legal and corporate landscape through specialized mediation initiatives and capacity-building frameworks.
              </p>
            </FadeInUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {whatWeDoItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <div className="relative h-full px-6 py-8 sm:px-8 sm:py-10 md:py-12 rounded-5xl bg-navy-50/20 border border-navy-100/30 hover:bg-white hover:border-gold-500/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col items-center text-center">
                  
                  {/* Number Background Detail */}
                  <div className="absolute -bottom-6 -right-4 text-[8rem] font-bold text-navy-950/1.5 group-hover:text-gold-500/4 transition-all duration-1000 italic select-none pointer-events-none">
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </div>

                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-3xl bg-white text-navy-950 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all duration-500 group-hover:rotate-12 shadow-md border border-navy-100/50">
                      <item.icon className="w-8 h-8" />
                    </div>
                    {/* Floating detail */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gold-500 scale-0 group-hover:scale-100 transition-transform duration-500 border-[3px] border-white shadow-sm" />
                  </div>
                  
                  <div className="grow space-y-4 relative z-10 w-full">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-gold-500/60 font-bold">Module {i + 1}</span>
                      <h3 className="text-xl md:text-2xl font-light text-navy-950 tracking-tighter leading-tight italic group-hover:text-gold-500 transition-colors duration-500 uppercase">
                        {item.title}
                      </h3>
                    </div>
                    <div className="h-px w-10 bg-navy-100 group-hover:w-16 bg-gold-500/30 group-hover:bg-gold-500 transition-all duration-700 mx-auto" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values - NICER */}
      <section className="py-24 md:py-32 bg-navy-950 relative overflow-hidden">
        <div className="hidden md:block absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="hidden md:block absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInUp className="mb-20 md:mb-32">
            <div className="flex flex-col items-center text-center">
              <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Our Values</span>
              <h2 className="text-[12vw] md:text-8xl font-light text-white tracking-tighter mb-8 leading-none italic uppercase">
                Just Be <span className="font-bold text-gold-500">NICER!</span>
              </h2>
              <p className="max-w-2xl text-white/50 text-lg md:text-xl font-light">
                At the heart of PACT’s work is a values framework built on a simple philosophy that governs every interaction.
              </p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 gap-12 md:gap-24">
            {values.map((v, i) => (
              <motion.div 
                key={v.letter}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={i % 2 === 0 ? "flex flex-col md:flex-row gap-8 md:gap-20 items-center md:items-start text-center md:text-left" : "flex flex-col md:flex-row-reverse gap-8 md:gap-20 items-center md:items-start text-center md:text-right"}
              >
                <div className="shrink-0">
                  <span className="text-8xl md:text-[12rem] font-black text-transparent bg-clip-text bg-linear-to-b from-gold-500 to-navy-900 leading-none select-none">
                    {v.letter}
                  </span>
                </div>
                <div className="space-y-6 pt-4 md:pt-16 max-w-2xl">
                  <h3 className="text-3xl md:text-5xl font-light text-white tracking-tight uppercase">
                    {v.label}
                  </h3>
                  <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
                    {v.description}
                  </p>
                  <div className={i % 2 === 0 ? "h-px w-20 bg-gold-500" : "h-px w-20 bg-gold-500 ml-auto"} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Accolades and Awards */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <FadeInUp className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Trophy className="w-5 h-5 text-gold-500" />
              <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">Recognition</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-navy-950 tracking-tight">Accolades and Awards</h2>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {awards.length > 0 ? (
              awards.map((award, i) => (
                <FadeInUp key={i} delay={i * 0.1} className="group">
                  <div className="relative aspect-4/3 rounded-4xl overflow-hidden mb-8 bg-navy-50 border border-navy-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                    {award.image ? (
                      <Image 
                        src={award.image} 
                        alt={award.recipientName} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-navy-950/10 font-black text-4xl italic uppercase p-8 text-center">
                        {award.recipientName} Award
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <p className="text-lg md:text-xl font-light text-navy-950 leading-snug">
                    <span className="font-semibold text-gold-500">{award.recipientName}</span> {award.description}
                  </p>
                </FadeInUp>
              ))
            ) : !loading ? (
              // Original hardcoded content as fallback if DB is empty
              <>
                <FadeInUp className="group">
                  <div className="relative aspect-4/3 rounded-4xl overflow-hidden mb-8 bg-navy-50 border border-navy-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center text-navy-950/10 font-black text-4xl italic uppercase">
                      Jonathan Rodrigues Award
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <p className="text-lg md:text-xl font-light text-navy-950 leading-snug">
                    <span className="font-semibold text-gold-500">Jonathan Rodrigues</span> was felicitated by Justice Vijay Bishnoi, Judge, Supreme Court of India, and Justice Rajendra Menon with the <span className="italic">Mediation Path-breaker Award</span> by AIIMAS in 2025
                  </p>
                </FadeInUp>

                <FadeInUp delay={0.2} className="group">
                  <div className="relative aspect-4/3 rounded-4xl overflow-hidden mb-8 bg-navy-50 border border-navy-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center text-navy-950/10 font-black text-4xl italic uppercase">
                      Nisshant Laroia Award
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <p className="text-lg md:text-xl font-light text-navy-950 leading-snug">
                    <span className="font-semibold text-gold-500">Nisshant Laroia</span> was felicitated by Law Minister Kiren Rijiju, with the <span className="italic">Certificate of Appreciation</span> for his Work in Mediation, hosted by GNLU in 2021
                  </p>
                </FadeInUp>
              </>
            ) : (
              // Loading skeletons
              <>
                <div className="aspect-4/3 rounded-4xl bg-navy-50 animate-pulse" />
                <div className="aspect-4/3 rounded-4xl bg-navy-50 animate-pulse" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Rocket Ship Timeline */}
      <section className="py-24 md:py-32 bg-navy-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <FadeInUp className="text-center mb-16 space-y-4">
             <h3 className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">Our Journey</h3>
             <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">A Decade of <span className="text-gold-500 italic">Impact</span></h2>
          </FadeInUp>
          
          <div className="relative rounded-4xl overflow-hidden border border-white/10 shadow-3xl">
            <Image
              src="/images/Web Pic 5.png"
              alt="Rocket ship timeline 2015-2026"
              width={1920}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
}
