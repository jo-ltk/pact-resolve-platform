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
  return (
    <div className="bg-white">
      {/* Who We Are */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-center">
            <FadeInUp>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">Who We Are</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-light text-navy-950 tracking-tight leading-tight mb-8">
                Transforming the <br />
                <span className="text-gold-500 italic font-medium">culture of dialogue</span>
              </h2>
            </FadeInUp>
            
            <FadeInUp delay={0.2} className="space-y-6">
              <p className="text-xl md:text-2xl text-navy-950 font-light leading-relaxed">
                The PACT is a leading mediation institute and service provider committed to transforming how conflicts are addressed in India and beyond. We work with law firms, corporates, institutions, and professionals to promote mediation as a practical, ethical and effective pathway to resolution.
              </p>
              <div className="h-px w-24 bg-gold-500/30" />
              <p className="text-lg text-navy-950/60 font-light leading-relaxed">
                Through mediation services, advocacy training, consulting and capacity-building initiatives, The PACT advances a culture of dialogue, confidentiality, and collaboration—helping individuals and organisations resolve disputes efficiently while preserving relationships and reputations. 
                <br /><br />
                Headquartered in New Delhi, with members operational in various parts of India, we have worked with 17,000+ mediation users since the summer of 2015.
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 md:py-32 bg-navy-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <FadeInUp className="text-center mb-16 md:mb-24">
            <h3 className="text-3xl md:text-5xl font-light text-navy-950 tracking-tight mb-4">What We Do</h3>
            <div className="h-1 w-12 bg-gold-500 mx-auto rounded-full" />
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {whatWeDoItems.map((item, i) => (
              <StaggerItem key={i}>
                <div className="group bg-white p-8 rounded-[2rem] border border-navy-100 hover:border-gold-500/20 transition-all duration-500 hover:shadow-xl flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center group-hover:bg-gold-500 transition-colors duration-500 shadow-sm shrink-0">
                    <item.icon className="w-6 h-6 text-navy-950 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <span className="text-lg font-light text-navy-950 tracking-tight group-hover:text-gold-500 transition-colors">
                    {item.title}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Values - NICER */}
      <section className="py-24 md:py-40 bg-navy-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInUp className="mb-20 md:mb-32">
            <div className="flex flex-col items-center text-center">
              <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Our Values</span>
              <h2 className="text-5xl md:text-8xl font-light text-white tracking-tighter mb-8 leading-none italic uppercase">
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
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <FadeInUp className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Trophy className="w-5 h-5 text-gold-500" />
              <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">Recognition</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-navy-950 tracking-tight">Accolades and Awards</h2>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <FadeInUp className="group">
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 bg-navy-50 border border-navy-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                {/* Placeholder for real picture */}
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
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 bg-navy-50 border border-navy-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                {/* Placeholder for real picture */}
                <div className="absolute inset-0 flex items-center justify-center text-navy-950/10 font-black text-4xl italic uppercase">
                  Nisshant Laroia Award
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <p className="text-lg md:text-xl font-light text-navy-950 leading-snug">
                <span className="font-semibold text-gold-500">Nisshant Laroia</span> was felicitated by Law Minister Kiren Rijiju, with the <span className="italic">Certificate of Appreciation</span> for his Work in Mediation, hosted by GNLU in 2021
              </p>
            </FadeInUp>
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
          
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-3xl">
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
