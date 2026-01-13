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
import { motion, AnimatePresence } from "framer-motion";

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

const luxuryEasing = [0.22, 1, 0.36, 1] as any;

export function HeroCarousel() {
  /* State for Carousel */
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  /* State for mobile check */
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const autoplayDelay = isMobile ? 3000 : 7000;

  const autoplay = React.useMemo(
    () => Autoplay({ delay: autoplayDelay, stopOnInteraction: false }),
    [autoplayDelay]
  );

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setProgress(0);
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    const increment = (100 / (autoplayDelay / 60)) * 1.1;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        setProgress((prev) => Math.min(prev + increment, 100)); 
      }
    }, 60);

    return () => clearInterval(interval);
  }, [api, autoplayDelay]);

  return (
    <section className="relative h-[75vh] min-h-[550px] md:h-[85vh] md:min-h-[650px] w-full overflow-hidden bg-navy-950">
      <Carousel 
        setApi={setApi} 
        plugins={[autoplay]}
        className="h-full w-full" 
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative h-full w-full pl-0">
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover object-right lg:object-center opacity-60"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-transparent to-transparent z-10" />
              </div>

              <div className="relative z-20 flex flex-col justify-center lg:grid lg:grid-cols-[3fr_2fr] h-full w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-28 md:pb-32 lg:items-start lg:pt-16 lg:pb-0 gap-8">
                
                {/* Left Content Block */}
                <div className="space-y-6 lg:space-y-8 lg:pr-6">
                  <div className="space-y-4 lg:space-y-6">
                    <AnimatePresence mode="wait">
                      {current === index && (
                        <motion.div
                          key={`content-${index}`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 1.2, ease: luxuryEasing }}
                          className="space-y-4 lg:space-y-6"
                        >
                          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
                            {slide.title.split(' ').map((word, i) => (
                              <span key={i} className="block">
                                {word}
                              </span>
                            ))}
                          </h1>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: luxuryEasing }}
                            className="h-1 bg-gold-500 mb-6" 
                          />
                          <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-full lg:max-w-[85%] font-light">
                            {slide.description}
                          </p>
                          
                          <div className="pt-4">
                            <Link href={slide.link}>
                              <button className="rounded-full bg-gold-500 px-10 py-4 font-sans text-base font-medium tracking-wide text-navy-950 shadow-lg transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] hover:brightness-110 active:scale-95">
                                {slide.buttonLabel}
                              </button>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Visual Emphasis (Slogan) */}
                <div className="hidden lg:flex items-center justify-end lg:pl-8">
                  <AnimatePresence mode="wait">
                    {current === index && (
                      <motion.div
                        key={`slogan-${index}`}
                        initial={{ opacity: 0, x: 40, scale: 0.95 }}
                        animate={{ opacity: 0.3, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.98 }}
                        transition={{ duration: 1.5, ease: luxuryEasing }}
                      >
                        <h2 className="text-5xl lg:text-6xl xl:text-8xl font-black leading-none text-right">
                          {slide.rightSlogan.split(' ').map((word, i) => (
                            <div key={i} className={i === 1 ? slide.accent : "text-white"}>
                              {word}
                            </div>
                          ))}
                        </h2>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Progress Navigation */}
        <div className="absolute bottom-8 left-0 right-0 z-30">
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
                  <div className="relative h-[2px] w-full bg-white/20 overflow-hidden mb-3 md:mb-4">
                    {current === index && (
                      <motion.div 
                        className="absolute inset-0 bg-gold-500 origin-left"
                        style={{ scaleX: progress / 100 }}
                      />
                    )}
                    {current > index && (
                      <div className="absolute inset-0 bg-white/40" />
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={cn(
                    "text-[10px] md:text-xs font-medium tracking-widest uppercase transition-colors duration-500",
                    current === index ? "text-white opacity-100" : "text-white opacity-30 group-hover:opacity-60"
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
