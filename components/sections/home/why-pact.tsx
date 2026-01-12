"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Shield, Users, BookOpen, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "protocols",
    label: "Mediation Practice Protocols",
    title: "Mediation Practice Protocols",
    icon: Shield,
    description: "PACT operates in alignment with internationally recognised mediation practice protocols and upholds the principles of voluntariness, neutrality, confidentiality, and party autonomy. All PACT mediations are conducted in strict adherence to The Mediation Act, 2023, ensuring legal validity, ethical integrity, and global best-practice standards.",
    cta: "Standards of Practice"
  },
  {
    id: "advocacy",
    label: "IMI QAP Mediation Advocacy",
    title: "IMI QAP Mediation Advocacy",
    icon: ScrollText,
    description: "PACT has been recognised by the International Mediation Institute (IMI) for its QAP-certified Mediation Advocacy, reflecting excellence in neutrality, ethical representation, and professional competence. This recognition affirms PACT’s commitment to international quality standards and mediation advocacy within the mediation ecosystem.",
    cta: "Our Certifications"
  },
  {
    id: "collaborations",
    label: "International Collaborations",
    title: "International Collaborations",
    icon: Globe,
    description: "PACT has actively collaborated with leading institutions – International Mediation Institute (Europe/Global), Maxwell Mediators (Asia Pacific), Mediate.com (USA) to advance mediation practice, capacity building, and cross-border dispute resolution. These collaborations reflect PACT’s global outlook, commitment to knowledge exchange and visibility within the mediation community.",
    cta: "Global Network"
  },
  {
    id: "simplified",
    label: "Mediation Simplified",
    title: "Mediation Simplified",
    icon: BookOpen,
    description: "Mediation Simplified has made mediation accessible and practical for professionals, students, and disputants alike. By demystifying concepts and offering clear frameworks, the book, authored and curated by Jonathan Rodrigues and Nisshant Laroia, has contributed to greater awareness, informed practice, and wider adoption of mediation as an effective dispute resolution mechanism.",
    cta: "Get the Book"
  },
  {
    id: "clauses",
    label: "Mediation Clauses",
    title: "Mediation Clauses",
    icon: ScrollText,
    description: "The mediation clauses endorsed by PACT, as an institutionalised mediation service provider, promote early, structured, and confidential dispute resolution. Designed to align with international best practices and the Mediation Act, 2023, these clauses provide parties with clarity, procedural certainty, and enforceable pathways to effective mediation.",
    cta: "View Clauses"
  }
];

export function WhyPact() {
  const [activeTab, setActiveTab] = useState(sections[0].id);
  const activeContent = sections.find((s) => s.id === activeTab) || sections[0];

  return (
    <section className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-4 mb-6 opacity-60">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white">Why PACT</span>
            <div className="h-px w-12 bg-gold-500/50" />
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-8">
            Committed to the highest <br className="hidden md:block" />
            <span className="text-gold-500 font-medium italic">standards</span> of training and services
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_2fr] gap-x-12 items-center">
          {/* Navigation Sidebar */}
          <div className="flex flex-col gap-2 relative z-10 py-8">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeTab === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={cn(
                    "group relative flex items-center justify-between text-left px-8 py-6 rounded-xl transition-all duration-300",
                    isActive 
                      ? "text-gold-500" 
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <Icon className={cn(
                      "w-5 h-5 transition-colors duration-300",
                      isActive ? "text-gold-500" : "text-white/20 group-hover:text-white/40"
                    )} />
                    <span className="text-lg font-light tracking-wide">{section.label}</span>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="arrow"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="absolute -right-3 top-1/2 -translate-y-1/2 z-10"
                    >
                      <div className="w-6 h-6 bg-navy-950 border-t border-r border-gold-500/50 rotate-45 transform" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Vertical Divider Line */}
          <div className="hidden lg:block relative h-[400px]">
            <div className="w-px h-full bg-white/10" />
          </div>

          {/* Content Area */}
          <div className="relative min-h-[300px] lg:pl-12 py-8 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                    {activeContent.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light">
                    {activeContent.description}
                  </p>
                  
                  <button className="group mt-8 flex items-center gap-4 text-gold-500 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors duration-300">
                    <span className="border-b border-gold-500/30 pb-1 group-hover:border-white transition-colors">{activeContent.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
