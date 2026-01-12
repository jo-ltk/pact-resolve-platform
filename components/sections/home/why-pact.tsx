"use client";

import { CheckCircle2 } from "lucide-react";

const points = [
  {
    title: "Mediation Practice Protocols",
    description: "Standardized excellence in every mediation session through rigorous procedural frameworks."
  },
  {
    title: "IMI QAP Mediation Advocacy",
    description: "Accredited International Mediation Institute Qualifying Assessment Program for worldwide recognition."
  },
  {
    title: "International Collaborations",
    description: "Strong partnerships with global ADR institutions ensuring borderless resolution expertise."
  },
  {
    title: "Mediation Simplified",
    description: "Breaking down complex legal disputes into manageable, human-centric solutions."
  }
];

export function WhyPact() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-white/60">Our Promise</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
              Why PACT
            </h2>
            <p className="text-xl text-white/70 leading-relaxed font-light max-w-xl">
              PACT is committed to the highest standards of training and services. We combine institutional integrity with innovative process design to deliver unmatched results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {points.map((point, i) => (
              <div key={i} className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                <CheckCircle2 className="h-8 w-8 text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-medium mb-3">{point.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
