"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "PACT's approach to mediation process design is revolutionary. They handled our multi-jurisdictional dispute with exceptional professionalism.",
    author: "Managing Partner",
    company: "Global Law Firm",
    image: "/assets/img/testimonials/arbitration-chamber.png",
    rating: 5
  },
  {
    quote: "The Academy training provided by PACT is hands-down the most comprehensive for mediation advocacy I've experienced in the industry.",
    author: "General Counsel",
    company: "Fortune 500 Enterprise",
    image: "/assets/img/testimonials/corporate-boardroom.png",
    rating: 5
  }
];

export function Supporters() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <p className="text-gold-500 font-mono text-xs uppercase tracking-[0.3em] font-bold">
              Testimonials
            </p>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-navy-950 mb-6">
            PACT <span className="text-gold-500 italic font-medium">Supporters</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative flex flex-col min-h-[480px] rounded-4xl bg-navy-950 border border-white/10 overflow-hidden hover:border-gold-500/30 transition-all duration-500 shadow-2xl"
            >
              {/* High Visibility Place Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.author}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-transparent to-transparent" />
                
                {/* Floating Quote Badge */}
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center shadow-2xl">
                    <Quote className="w-5 h-5 text-navy-950" />
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex-1 flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                    ))}
                  </div>

                  <p className="text-white/80 font-light leading-relaxed text-lg lg:text-xl">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-white font-semibold tracking-tight text-lg">{t.author}</p>
                  <p className="text-gold-500/70 text-xs font-mono uppercase tracking-[0.2em] mt-1.5">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
