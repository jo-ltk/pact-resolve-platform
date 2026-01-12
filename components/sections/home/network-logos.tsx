"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const networks = [
  "GAADR",
  "MCI",
  "Podcast",
  "Advocate Maximus",
  "ODRC"
];

export function NetworkLogos() {
  return (
    <section className="py-20 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-center text-xs font-mono uppercase tracking-[0.5em] opacity-40 mb-12">
          PACT Network
        </h3>
        
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-8 md:-ml-12 lg:-ml-24">
            {networks.map((name, i) => (
              <CarouselItem key={i} className="pl-8 md:pl-12 lg:pl-24 basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 h-24">
                  <span className="text-2xl md:text-3xl font-light tracking-tighter whitespace-nowrap">
                    {name}
                  </span>
                </div>
              </CarouselItem>
            ))}
            {/* Duplicate for infinite feel if loop isn't enough */}
            {networks.map((name, i) => (
              <CarouselItem key={`dup-${i}`} className="pl-8 md:pl-12 lg:pl-24 basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 h-24">
                  <span className="text-2xl md:text-3xl font-light tracking-tighter whitespace-nowrap">
                    {name}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
