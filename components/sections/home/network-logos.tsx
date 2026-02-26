"use client";

import { useEffect, useState } from "react";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { NetworkLogo } from "@/lib/db/schemas";

export function NetworkLogos() {
  const fallbackNetworks = [
    { _id: "fallback-1" as any, name: "GAADR", order: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { _id: "fallback-2" as any, name: "MCI", order: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { _id: "fallback-3" as any, name: "Podcast", order: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { _id: "fallback-4" as any, name: "Advocate Maximus", order: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { _id: "fallback-5" as any, name: "ODRC", order: 5, isActive: true, createdAt: new Date(), updatedAt: new Date() }
  ];

  const [networks, setNetworks] = useState<NetworkLogo[]>([]);

  useEffect(() => {
    async function fetchNetworks() {
      try {
        const res = await fetch("/api/content/network-logos");
        const result = await res.json();
        if (result.success && result.data && result.data.length > 0) {
          setNetworks(result.data);
        } else {
          setNetworks(fallbackNetworks);
        }
      } catch (error) {
        console.error("Failed to fetch networks", error);
        setNetworks(fallbackNetworks);
      }
    }
    fetchNetworks();
  }, []);

  if (networks.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInUp>
          <h3 className="text-center text-xs md:text-xs  uppercase tracking-[0.5em] opacity-40 mb-10 md:mb-12">
            PACT Network
          </h3>
        </FadeInUp>
        
        <FadeIn className="relative w-full overflow-hidden" delay={0.2}>
          <div className="flex animate-marquee">
            {/* Multiply items to fill the track and loop smoothly */}
            {[...networks, ...networks, ...networks, ...networks].map((item, i) => (
              <div 
                key={`${item._id}-${i}`} 
                className="shrink-0 px-6 md:px-12 lg:px-16"
              >
                <div className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 h-16 md:h-24">
                  <span className="text-xl md:text-3xl font-light tracking-tighter whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
