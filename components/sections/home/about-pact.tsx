"use client";

import Image from "next/image";
import { History, ArrowRight, Shield, Target, Award } from "lucide-react";


export function AboutPact() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <div className="flex flex-col h-full justify-between py-4">
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-2 opacity-20">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Chapter One</span>
                <div className="h-px w-12 bg-black" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Legacy</span>
              </div>
              
              <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 bg-black/5">
                <span className="text-xs font-mono uppercase tracking-widest text-black/60">Our Legacy</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-light tracking-tight text-black leading-tight">
                About PACT
              </h2>
              <p className="text-xl text-black/70 leading-relaxed font-light">
                Since its inception, PACT has been at the forefront of mediation excellence, bridging gaps and fostering understanding across diverse sectors. Our journey is marked by innovation in dispute resolution and a commitment to professional excellence.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <span className="block text-4xl font-light text-black">2500+</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-black/40">Cases Resolved</span>
                </div>
                <div>
                  <span className="block text-4xl font-light text-black">98%</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-black/40">Success Rate</span>
                </div>
              </div>

              <button className="group flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black transition-colors pt-4">
                Explore our full story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-12 border-t border-black/5 mt-12">
              <div className="space-y-2">
                <Shield className="w-5 h-5 text-black/20" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">Integrity</span>
              </div>
              <div className="space-y-2">
                <Target className="w-5 h-5 text-black/20" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">Excellence</span>
              </div>
              <div className="space-y-2">
                <Award className="w-5 h-5 text-black/20" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">Impact</span>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-16 relative">
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <h3 className="font-medium text-black whitespace-nowrap uppercase tracking-widest text-sm">PACT Milestones</h3>
                <div className="h-px w-full bg-black/5" />
                <History className="w-4 h-4 text-black/20 shrink-0" />
              </div>
              
              <div className="relative space-y-12">
                {/* Timeline Line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/10" />
                
                {[
                  { year: "2018", event: "Foundation of PACT with a vision for ADR transformation" },
                  { year: "2019", event: "Launch of the first Mediation Championship India" },
                  { year: "2020", event: "Global Academy accreditation and digital transition" },
                  { year: "2021", event: "Introduction of the PACT Mediation Pledge" },
                  { year: "2022", event: "Expansion to international collaborations in Singapore & UK" },
                  { year: "2024", event: "Rebranding to Mediation Champions League" },
                ].map((item, i) => (
                  <div key={i} className="relative pl-10 group/item">
                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border border-black/10 bg-transparent group-hover/item:border-gold-500 group-hover/item:bg-gold-500 transition-all duration-300 z-10" />
                    
                    <div className="space-y-1">
                      <span className="block text-xs font-mono font-bold tracking-widest uppercase text-black/30 group-hover/item:text-gold-500 transition-colors duration-300">
                        {item.year}
                      </span>
                      <p className="text-xl text-black/60 leading-relaxed font-light group-hover/item:text-black transition-colors duration-300">
                        {item.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
