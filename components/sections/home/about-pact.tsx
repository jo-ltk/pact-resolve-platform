"use client";

import Image from "next/image";

export function AboutPact() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
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
          </div>
          
          <div className="relative aspect-square w-full">
            <div className="absolute inset-0 bg-white shadow-2xl shadow-black/5 rounded-3xl overflow-hidden border border-black/5 group">
              {/* This represents the PACT Milestones Timeline image */}
              <div className="relative w-full h-full p-8 flex flex-col items-center justify-center text-center">
                <div className="relative w-full h-full">
                   <Image 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" 
                    alt="PACT Milestones Timeline" 
                    fill
                    className="object-cover opacity-20"
                  />
                  <div className="absolute inset-0 flex flex-col p-8 overflow-y-auto custom-scrollbar">
                    <h3 className="text-2xl font-medium mb-12 border-b border-black/10 pb-4">PACT Milestones</h3>
                    <div className="space-y-12 text-left relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-black/5">
                      {[
                        { year: "2018", event: "Foundation of PACT with a vision for ADR transformation" },
                        { year: "2019", event: "Launch of the first Mediation Championship India" },
                        { year: "2020", event: "Global Academy accreditation and digital transition" },
                        { year: "2021", event: "Introduction of the PACT Mediation Pledge" },
                        { year: "2022", event: "Expansion to international collaborations in Singapore & UK" },
                        { year: "2024", event: "Rebranding to Mediation Champions League" },
                      ].map((item, i) => (
                        <div key={i} className="pl-10 relative">
                          <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-white border-2 border-primary z-10" />
                          <span className="block text-sm font-bold text-primary mb-1">{item.year}</span>
                          <p className="text-black/60 text-sm leading-relaxed">{item.event}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 h-32 w-32 bg-slate-200/50 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
