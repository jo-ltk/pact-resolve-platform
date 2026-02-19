"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star, User } from "lucide-react";
import { Testimonial } from "@/lib/db/schemas";

export function Supporters() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/content/testimonials?page=homepage");
        const result = await res.json();
        if (result.success) setTestimonials(result.data || []);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    }
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <p className="text-gold-500  text-xs uppercase tracking-[0.3em] font-bold">
              Trusted to Deliver
            </p>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-navy-950 mb-6">
            PACT <span className="text-gold-500 italic font-medium">Testimonials</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id?.toString() || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative flex flex-col min-h-[480px] rounded-4xl bg-navy-950 border border-white/10 overflow-hidden hover:border-gold-500/30 transition-all duration-500 shadow-2xl"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={t.image.url}
                  alt={t.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center shadow-2xl">
                    <Quote className="w-5 h-5 text-navy-950" />
                  </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(t.rating || 5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                    ))}
                  </div>

                  <p className="text-white/80 font-light leading-relaxed text-lg lg:text-xl">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 relative pr-20">
                  <p className="text-white font-semibold tracking-tight text-lg">{t.name}</p>
                  <p className="text-gold-500/70 text-xs  uppercase tracking-[0.2em] mt-1.5">{t.title}, {t.company}</p>

                  <div className="absolute bottom-0 right-0">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-gold-500/60 bg-white/5 shadow-2xl">
                      {t.profileImage?.url ? (
                        <Image
                          src={t.profileImage.url}
                          alt={`${t.name} profile photo`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-white/60">
                          <User className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
