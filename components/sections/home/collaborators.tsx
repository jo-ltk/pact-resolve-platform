"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  { name: "Maxwell Mediators", logo: "/partners/maxwell-mediators.png" },
  { name: "Mediate.com", logo: "/partners/mediate-com.png" },
  { name: "Shardul Amarchand Mangaldas", logo: "/partners/shardul-amarchand-mangaldas.png" },
  { name: "International Mediation Institute", logo: "/partners/international-mediation-institute.png" },
  { name: "Khaitan & Co.", logo: "/partners/khaitan-and-co.png" },
  { name: "Adani Group", logo: "/partners/adani-group.png" },
  { name: "Cyril Amarchand Mangaldas", logo: "/partners/cyril-amarchand-mangaldas.png" },
  { name: "Prem Tara Foundation", logo: "/partners/prem-tara-foundation.png" },
];

export function Collaborators() {
  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Soft gradient overlays for seamless infinity effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-r from-white to-transparent z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-l from-white to-transparent z-20" />

      <div className="max-w-7xl mx-auto text-center relative z-10 mb-12">
        <div className="inline-block mb-3 md:mb-4">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-gold-600 mb-2">
            Strategic Partners
          </h2>
          <div className="h-[1px] w-full bg-linear-to-r from-transparent via-gold-400 to-transparent mx-auto" />
        </div>
        
        <h3 className="text-2xl md:text-4xl font-extralight text-navy-950 tracking-tighter">
          Collaborating with <span className="font-serif italic">Excellence</span>
        </h3>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex shrink-0 items-center space-x-12 md:space-x-24 px-6 md:px-12"
          >
            {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
              <div 
                key={i} 
                className="relative h-16 md:h-24 w-40 md:w-56 md:grayscale hover:grayscale-0 transition-all duration-500 md:opacity-60 hover:opacity-100 hover:scale-110 flex items-center justify-center group"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
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
        <p className="text-black/20 font-mono text-[10px] uppercase tracking-[0.3em]">
          Trusted by Industry Leaders Worldwide
        </p>
      </div>
    </section>
  );
}
