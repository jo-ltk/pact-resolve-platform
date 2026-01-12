"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "PACT's approach to mediation process design is revolutionary. They handled our multi-jurisdictional dispute with exceptional professionalism.",
    author: "Managing Partner",
    company: "Global Law Firm"
  },
  {
    quote: "The Academy training provided by PACT is hands-down the most comprehensive for mediation advocacy I've experienced in the industry.",
    author: "General Counsel",
    company: "Fortune 500 Enterprise"
  }
];

export function Supporters() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-black mb-6">
            PACT Supporters
          </h2>
          <p className="text-black/40 font-mono text-sm uppercase tracking-widest">
            Testimonials from our global network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="relative p-12 rounded-4xl bg-slate-50 border border-slate-100 group hover:bg-navy-900 hover:text-white transition-all duration-500">
              <Quote className="absolute top-10 right-10 h-12 w-12 text-black/5 group-hover:text-white/10 transition-colors" />
              <p className="text-2xl font-light leading-relaxed mb-10 relative z-10">
                "{t.quote}"
              </p>
              <div className="flex flex-col">
                <span className="font-bold text-sm uppercase tracking-widest">{t.author}</span>
                <span className="text-xs font-mono opacity-60">{t.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
