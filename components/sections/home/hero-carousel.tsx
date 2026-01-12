"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    title: "PACT Mediation",
    description: "A trendsetter in Mediation Process Design, PACT relies on bespoke case management, quality mediators and best practices for client satisfaction",
    buttonLabel: "Mediation Page",
    link: "/mediation",
    rightSlogan: "RESOLVE WITH PRECISION",
    accent: "text-emerald-400",
    image: "/hero/hero_mediation.png",
  },
  {
    title: "PACT Academy",
    description: "A pioneer in Mediation Advocacy Training, PACT is upskilling lawyers and training professionals who have a significant seat at the mediation table",
    buttonLabel: "Academy Page",
    link: "/academy",
    rightSlogan: "MASTERY IN ADVOCACY",
    accent: "text-blue-400",
    image: "/hero/hero_academy.png",
  },
  {
    title: "Mission Mediation",
    description: "Through podcasts, panels and the annual conclave, PACT is developing a market and generating case studies and educational content",
    buttonLabel: "Podcast Page",
    link: "/podcast",
    rightSlogan: "LEADING THE DIALOGUE",
    accent: "text-cyan-400",
    image: "/hero/hero_mission.png",
  },
  {
    title: "Mediation Champions League",
    description: "Formerly known as Mediation Championship India, this event convenes a stellar group of next-gen professionals and current experts",
    buttonLabel: "Competition Page",
    link: "/competition",
    rightSlogan: "THE FUTURE OF ADR",
    accent: "text-amber-400",
    image: "/hero/hero_league.png",
  },
  {
    title: "PACT Mediation Pledge",
    description: "The Pledge encourages early, confidential and constructive resolution, signalling your commitment to relationship-preservation and ease-of-doing business",
    buttonLabel: "PACT Pledge and Clauses",
    link: "/pledge",
    rightSlogan: "COMMIT TO EXCELLENCE",
    accent: "text-indigo-400",
    image: "/hero/hero_pledge.png",
  },
];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  // Autoplay plugin configuration
  const autoplay = React.useMemo(
    () => Autoplay({ delay: 6000, stopOnInteraction: false }),
    []
  );

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setProgress(0); // Reset progress on slide change
    });

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        setProgress((prev) => Math.min(prev + 1.2, 100)); // Approx sync with 6s autoplay
      }
    }, 60);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative h-[70vh] min-h-[500px] md:h-[80vh] md:min-h-[600px] w-full overflow-hidden bg-navy-950">
      <Carousel 
        setApi={setApi} 
        plugins={[autoplay]}
        className="h-full w-full" 
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative h-[70vh] min-h-[500px] md:h-[80vh] md:min-h-[600px] w-full pl-0">
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover object-right lg:object-center opacity-60"
                  priority={index === 0}
                />
                {/* JAMS-style Gradient Overlays for readability */}
                <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-transparent to-transparent z-10" />
              </div>

              <div className="relative z-20 flex flex-col justify-center lg:grid lg:grid-cols-[3fr_2fr] h-full w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-28 md:pb-32 lg:items-start lg:pt-12 lg:pb-0 gap-8">
                
                {/* Left Content Block */}
                <div className="space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000 lg:pr-6">
                  <div className="space-y-3 lg:space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
                      {slide.title.split(' ').map((word, i) => (
                        <span key={i} className="block">
                          {word}
                        </span>
                      ))}
                    </h1>
                    <div className="w-20 h-1 bg-gold-500 mb-4" />
                    <p className="text-base md:text-lg lg:text-lg text-white/90 leading-relaxed max-w-full lg:max-w-[75%] font-light">
                      {slide.description}
                    </p>
                  </div>
                  
                  <div>
                    <Link href={slide.link}>
                      <button className="rounded-full bg-gold-500 px-10 py-4 font-sans text-base font-medium tracking-wide text-navy-950 shadow-sm transition-all duration-200 ease-in-out hover:scale-[1.02] hover:brightness-110 active:scale-95">
                        {slide.buttonLabel}
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right Visual Emphasis (Slogan) */}
                <div className="hidden lg:flex items-center justify-end lg:pl-8">
                  <div className="relative">
                    <h2 className={cn(
                      "text-5xl lg:text-6xl xl:text-7xl font-black leading-none text-right opacity-30 transition-all duration-1000",
                      current === index ? "translate-x-0 opacity-30 scale-100" : "translate-x-20 opacity-0 scale-95"
                    )}>
                      {slide.rightSlogan.split(' ').map((word, i) => (
                        <div key={i} className={i === 1 ? slide.accent : "text-white"}>
                          {word}
                        </div>
                      ))}
                    </h2>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Progress Navigation (JAMS Style) */}
        <div className="absolute bottom-6 left-0 right-0 z-30">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className="group relative flex flex-col text-left transition-all"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {/* Progress Line */}
                  <div className="relative h-[2px] w-full bg-white/20 overflow-hidden mb-2 md:mb-4">
                    {current === index && (
                      <div 
                        className="absolute inset-0 bg-gold-500 transition-transform duration-100 ease-linear origin-left"
                        style={{ transform: `scaleX(${progress / 100})` }}
                      />
                    )}
                    {current > index && (
                      <div className="absolute inset-0 bg-white/40" />
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={cn(
                    "text-[10px] md:text-xs font-medium tracking-wide transition-colors duration-300",
                    current === index ? "text-white" : "text-white/40 group-hover:text-white/60"
                  )}>
                    {slide.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
}
