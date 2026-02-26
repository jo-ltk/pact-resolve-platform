"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Partner } from "@/lib/db/schemas";

export function Collaborators() {
  const fallbackPartners: Partner[] = [
    { _id: "fallback-part-1" as any, name: "Partner 1", logo: { url: "/logo_dark.png", alt: "Partner 1" }, category: "strategic", order: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { _id: "fallback-part-2" as any, name: "Partner 2", logo: { url: "/logo_dark.png", alt: "Partner 2" }, category: "strategic", order: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { _id: "fallback-part-3" as any, name: "Partner 3", logo: { url: "/logo_dark.png", alt: "Partner 3" }, category: "strategic", order: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() }
  ];

  const [partners, setPartners] = useState<Partner[]>([]);
  const marqueeDurationSeconds = 50;

  useEffect(() => {
    async function fetchPartners() {
      try {
        const res = await fetch("/api/content/partners");
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setPartners(data.data);
        } else {
          setPartners(fallbackPartners);
        }
      } catch (error) {
        console.error("Failed to fetch partners", error);
        setPartners(fallbackPartners);
      }
    }
    fetchPartners();
  }, []);

  useEffect(() => {
    if (partners.length === 0) return;
    console.log("[Collaborators] marqueeDurationSeconds:", marqueeDurationSeconds);
    console.log("[Collaborators] partners:", partners.length);
  }, [partners.length]);

  if (partners.length === 0) return null;

  return (
    <section className="pt-6 md:pt-12 pb-4 md:pb-6 bg-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px]" />
      
      {/* Soft gradient overlays for seamless infinity effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-r from-white to-transparent z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-l from-white to-transparent z-20" />

      <div className="max-w-7xl mx-auto text-center relative z-10 mb-8 md:mb-10">
        <div className="inline-block mb-3 md:mb-4">
          <h2 className="text-xs  uppercase tracking-[0.5em] text-gold-600 mb-2">
            Strategic Partners
          </h2>
          <div className="h-px w-full bg-linear-to-r from-transparent via-gold-400 to-transparent mx-auto" />
        </div>
        
        <h3 className="text-2xl md:text-4xl font-extralight text-navy-950 tracking-tighter">
          Collaborating with <span className="font-serif italic">Excellence</span>
        </h3>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex">
          <motion.div
            key={`marquee-${marqueeDurationSeconds}-${partners.length}`}
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              // Framer Motion duration is in SECONDS. Lower = faster.
              duration: marqueeDurationSeconds,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex shrink-0 items-center space-x-12 md:space-x-24 px-6 md:px-12"
          >
            {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
              <div 
                key={partner._id ? `${partner._id}-${i}` : i} 
                className="relative h-16 md:h-24 w-40 md:w-56 md:grayscale hover:grayscale-0 transition-all duration-500 md:opacity-60 hover:opacity-100 hover:scale-110 flex items-center justify-center group"
              >
                <Image
                  src={partner.logo.url}
                  alt={partner.logo.alt || partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 160px, 224px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center mt-12 pt-6 border-t border-black/5 relative z-10">
        <p className="text-black/20  text-xs uppercase tracking-[0.3em]">
          Trusted by Industry Leaders Worldwide
        </p>
      </div>
    </section>
  );
}
