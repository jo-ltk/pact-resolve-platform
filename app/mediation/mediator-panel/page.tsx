"use client";

import React from "react";
import Image from "next/image";
import { 
  ArrowUpRight,
  Globe,
  Award,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeInUp } from "@/components/motion-wrapper";
import { GrainOverlay } from "@/components/grain-overlay";
import { Footer } from "@/components/footer";

// --- Components ---

const SectionHeader = ({ subtitle, title, description, light = false, center = false }: { subtitle: string, title: string, description?: string, light?: boolean, center?: boolean }) => (
  <FadeInUp className={cn("mb-8 md:mb-16", center ? "flex flex-col items-center text-center" : "")}>
    <div className="inline-flex items-center gap-4 mb-4 opacity-70">
      <span className={cn("text-xs md:text-xs  tracking-[0.4em] uppercase", light ? "text-white" : "text-navy-950")}>{subtitle}</span>
      <div className={cn("h-px w-8 bg-gold-500/50", light ? "bg-gold-500" : "bg-gold-500")} />
    </div>
    <h2 className={cn("text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-4 sm:mb-6 leading-[1.1]", light ? "text-white" : "text-navy-950")}>
      {title}
    </h2>
    {description && (
      <p className={cn("max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed", light ? "text-white/60" : "text-navy-950/60")}>
        {description}
      </p>
    )}
  </FadeInUp>
);

const PanelHero = () => (
  <section className="relative min-h-[50vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 bg-navy-950 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <Image
        src="/hero/hero_mediation.png"
        alt="Mediator Panel"
        fill
        className="object-cover opacity-20 scale-105"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy-950/40 via-navy-950/90 to-navy-950" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <FadeInUp>
        <div className="flex items-center gap-3 mb-4 sm:mb-6 md:mb-8">
          <div className="h-px w-8 md:w-12 bg-gold-500" />
          <span className="text-gold-500  text-xs md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">
            Mediation / Mediator Panel
          </span>
        </div>
        <h1 className="page-title text-4xl xs:text-5xl sm:text-7xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 select-none italic">
          MEDIATOR PANEL
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
           <p className="text-lg sm:text-2xl md:text-3xl text-white/90 font-light leading-snug tracking-tight">
              A trendsetter in Mediation Process Design, PACT relies on bespoke case management, quality mediators and best practices for client satisfaction.
           </p>
           <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">
             Our Mediator Panel comprises experienced and accredited professionals with diverse expertise across commercial, corporate, civil, and institutional disputes. Drawn from varied professional backgrounds, including law, commerce, and industry, our mediators are trained to manage complex negotiations, foster constructive dialogue, and guide parties toward durable, mutually acceptable outcomes.
           </p>
        </div>

        <div className="mt-12 md:mt-16 pt-12 border-t border-white/5">
           <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gold-500/90 font-light leading-[1.4] max-w-5xl">
             "Each mediator possesses proven expertise in mediation practice and adheres to the highest standards of ethics, confidentiality, and procedural fairness, ensuring confidence and integrity throughout the mediation process."
           </p>
        </div>
      </FadeInUp>
    </div>
  </section>
);

const GallerySection = () => {
  const members = [
    {
      name: "Jonathan Rodrigues",
      role: "Commercial & Civil Mediation",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    },
    {
      name: "Kurian Joseph",
      role: "Retd. Judge, Supreme Court of India",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    },
    {
      name: "Gita Mittal",
      role: "Retd. Judge, Chief Justice (JKHC)",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    {
      name: "Ekta Bahl",
      role: "Corporate & Commercial Law",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 text-center mb-20">
         <SectionHeader 
            subtitle="Mediator Gallery" 
            title="Our Neutrals"
            description="If parties prefer to meet the mediators before finalising their choice, this option is available in the Pre-Mediation Phase."
            center
         />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-[2.5rem] bg-navy-50/50 border border-navy-100/50 h-full"
            >
              <div className="relative h-[450px] w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110 filter md:grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-navy-950 via-navy-950/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                  <button className="w-full py-4 bg-white text-navy-950 text-xs font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-2 hover:bg-gold-500 transition-colors shadow-2xl">
                    View Profile <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-8 text-center bg-white border-t border-navy-50 flex-1 flex flex-col justify-center">
                <h3 className="text-2xl font-light text-navy-950 mb-1">{member.name}</h3>
                <p className="text-xs text-navy-950/40  tracking-widest uppercase">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default function MediatorPanelPage() {
  return (
    <main className="relative min-h-screen w-full bg-white overflow-x-hidden">
      <GrainOverlay />
      <PanelHero />
      <GallerySection />
      <Footer />
    </main>
  );
}
