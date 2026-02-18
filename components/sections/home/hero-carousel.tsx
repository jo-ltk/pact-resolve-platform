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

import { HeroSlide } from "@/lib/db/schemas";

const fallbackSlides = [
  {
    title: ["PACT", "Mediation"],
    description: "A trendsetter in Mediation Process Design, PACT relies on bespoke case management, quality mediators and best practices for client satisfaction",
    buttonLabel: "Mediation Page",
    link: "/mediation",
    rightSlogan: "RESOLVE WITH PRECISION",
    image: { url: "/hero/hero_mediation.png", alt: "PACT Mediation" },
  },
  {
    title: ["PACT", "Academy"],
    description: "A pioneer in Mediation Advocacy Training, PACT is upskilling lawyers and training professionals who have a significant seat at the mediation table",
    buttonLabel: "Academy Page",
    link: "/academy",
    rightSlogan: "MASTERY IN ADVOCACY",
    image: { url: "/hero/hero_academy.png", alt: "PACT Academy" },
  },
  {
    title: ["Mission", "Mediation"],
    description: "Through podcasts, panels and the annual conclave, PACT is developing a market and generating case studies and educational content",
    buttonLabel: "Podcast Page",
    link: "/podcast",
    rightSlogan: "LEADING THE DIALOGUE",
    image: { url: "/hero/hero_mission.png", alt: "Mission Mediation" },
  },
  {
    title: ["Mediation Champions", "League"],
    description: "Formerly known as Mediation Championship India, this event convenes a stellar group of next-gen professionals and current experts",
    buttonLabel: "Competition Page",
    link: "/competition",
    rightSlogan: "THE FUTURE OF ADR",
    image: { url: "/hero/hero_league.png", alt: "Mediation Champions League" },
  },
  {
    title: ["PACT Mediation", "Pledge"],
    description: "The Pledge promotes early, constructive resolution, signalling your commitment to relationship-preservation and business ease.",
    buttonLabel: "PACT Pledge and Clauses",
    link: "/pledge",
    rightSlogan: "COMMIT TO EXCELLENCE",
    image: { url: "/hero/hero_pledge.png", alt: "PACT Mediation Pledge" },
  },
];

const luxuryEasing = [0.22, 1, 0.36, 1] as any;

export function HeroCarousel() {
  const [slides, setSlides] = React.useState<any[]>(fallbackSlides);
  const [isLoading, setIsLoading] = React.useState(true);

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

  React.useEffect(() => {
    async function fetchHeroSlides() {
      try {
        const response = await fetch("/api/content/hero-slides");
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          // Normalize titles if they come as strings
          const normalized = result.data.map((slide: any) => ({
            ...slide,
            title: Array.isArray(slide.title) ? slide.title : [slide.title]
          }));
          setSlides(normalized);
        }
      } catch (error) {
        console.error("Failed to fetch hero slides:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHeroSlides();
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

  // Progress is now handled natively by Framer Motion transitions 
  // to avoid high-frequency React re-renders on mobile.
  React.useEffect(() => {
    if (!api) return;
    setProgress(0);
  }, [api, current]);

  return (
    <section className="relative h-[75vh] min-h-[500px] md:h-[calc(100vh-80px)] lg:h-[calc(100vh-88px)] w-full overflow-hidden bg-navy-950">
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
                  src={slide.image.url}
                  alt={slide.image.alt || (slide.title.join(' '))}
                  fill
                  className="object-cover object-right lg:object-center opacity-60"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-transparent to-transparent z-10" />
              </div>

              {/* Main content container - vertically centered with room for bottom navigation */}
              <div className="relative z-20 flex flex-col justify-center lg:grid lg:grid-cols-[3fr_2fr] lg:items-center h-full w-full max-w-8xl mx-auto px-6 md:px-12 lg:px-24 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-24 sm:pb-28 md:pb-32 lg:pb-36 gap-6 md:gap-8">

                {/* Left Content Block */}
                <div className="space-y-4 lg:space-y-6 lg:pr-6 pb-12 sm:pb-0">
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
                          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white uppercase leading-[1.2]">
                            {slide.title.map((line: string, i: number) => (
                              <span key={i} className="block whitespace-nowrap">
                                {line}
                              </span>
                            ))}
                          </h1>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: luxuryEasing }}
                            className="h-1 bg-gold-500"
                          />
                          <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-full lg:max-w-[90%] font-light line-clamp-3 min-h-[3em]">
                            {slide.description}
                          </p>

                          <div className="pt-4 lg:pt-6">
                            <Link href={slide.link}>
                              <button className="rounded-full bg-gold-500 px-8 py-3.5 sm:px-10 sm:py-4 font-sans text-sm sm:text-base font-medium tracking-wide text-navy-950 shadow-lg transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] hover:brightness-110 active:scale-95">
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
                <div className="hidden lg:flex items-start justify-end lg:pl-8">
                  <AnimatePresence mode="wait">
                    {current === index && (
                      <motion.div
                        key={`slogan-${index}`}
                        initial={{ opacity: 0, x: 40, scale: 0.95 }}
                        animate={{ opacity: 0.3, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.98 }}
                        transition={{ duration: 1.5, ease: luxuryEasing }}
                      >
                        <h2 className="text-4xl lg:text-5xl xl:text-7xl font-black leading-none text-right">
                          {slide.rightSlogan.split(' ').map((word: string, i: number) => (
                            <div key={i} className={i === 1 ? "text-gold-500" : "text-white"}>
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
      </Carousel>

      {/* Custom Progress Navigation - Restored to original absolute bottom position */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pointer-events-auto">
          <div className="flex flex-col gap-6 md:gap-10">
            {/* 1. Puzzle Shapes Grid (Always visible, clean row) */}
            <div className="grid grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {slides.map((slide, index) => {
                  const isActive = current === index;
                  const isPast = current > index;
                  const isEven = index % 2 === 0;
                  // Puzzle Tab Shape (Necked)
                  // Mobile: Pronounced/Deep (Your "super" look)
                  const mobilePathUp = "M 0 8 H 32 C 32 8 26 -4 50 -4 C 74 -4 68 8 68 8 H 100";
                  const mobilePathDown = "M 0 8 H 32 C 32 8 26 20 50 20 C 74 20 68 8 68 8 H 100";

                  // Web/Desktop: "Cute and little" (Smaller amplitude, gentler curves)
                  const desktopPathUp = "M 0 8 H 40 C 40 8 38 4 50 4 C 62 4 60 8 60 8 H 100";
                  const desktopPathDown = "M 0 8 H 40 C 40 8 38 12 50 12 C 62 12 60 8 60 8 H 100";

                  const pathUp = isMobile ? mobilePathUp : desktopPathUp;
                  const pathDown = isMobile ? mobilePathDown : desktopPathDown;

                  // Strategy:
                  // Background is always the "recess" or "track"
                  // If we want them to look like they fit, maybe distinct shapes?
                  // Let's make them ALL uniform puzzle tabs that "fill up".
                  // To look cool, let's alternate the orientation of the piece.
                  
                  const activePath = isEven ? pathUp : pathDown;
                  const inactivePath = isEven ? pathDown : pathUp; // Or just same path dimmed?

                  // Actually, to look like a continuous puzzle line:
                  // 1 -> Up, 2 -> Down, 3 -> Up...
                  // And we illuminate the path.
                  // So background and active path should MATCH for a given item to look like a wireframe being filled.
                  const shapePath = isEven ? pathUp : pathDown;

                  return (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className="group relative flex flex-col items-center transition-all"
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      <div className="relative h-4 w-full overflow-visible">
                        <svg
                          viewBox="0 0 100 16"
                          preserveAspectRatio="none"
                          className="w-full h-full overflow-visible"
                        >
                          {/* Background Track */}
                          <path
                            d={shapePath}
                            stroke="white"
                            strokeOpacity="0.1"
                            strokeWidth="2"
                            fill="none"
                          />
                          {/* Active Animation */}
                          {isActive && (
                            <motion.path
                              key={`fill-${current}`}
                              d={shapePath}
                              stroke="#bf9a66"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ 
                                duration: autoplayDelay / 1000, 
                                ease: "linear" 
                              }}
                              className="will-change-transform"
                            />
                          )}
                          {/* Completed State */}
                          {isPast && (
                            <path
                              d={shapePath}
                              stroke="#bf9a66"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              opacity="0.5"
                            />
                          )}
                        </svg>
                      </div>
                    </button>
                  );
              })}
            </div>

            {/* 2. Desktop Labels (EXPLICITLY REMOVED FROM MOBILE VIEW) */}
            <div className="hidden md:grid grid-cols-5 gap-6 lg:gap-8">
              {slides.map((slide, index) => (
                <span 
                  key={index}
                  className={cn(
                    "text-xs lg:text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-500 line-clamp-2 leading-tight text-left",
                    current === index ? "text-white opacity-100" : "text-white/20"
                  )}
                >
                  {slide.title.join(' ')}
                </span>
              ))}
            </div>

            {/* 3. Mobile Focal Label (DYNAMICALLY POSITIONED TO PREVENT OVERLAP) */}
            <div className="md:hidden flex flex-col items-center pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-xs font-black tracking-[0.4em] uppercase text-white/40">
                    Section {current + 1} of {slides.length}
                  </span>
                  
                  <div className="flex items-center gap-4 px-4 w-screen max-w-full">
                    <div className="h-px flex-1 bg-linear-to-r from-transparent to-gold-500/40" />
                    <h3 className="text-white text-[11px] font-black uppercase text-center tracking-widest whitespace-normal line-clamp-2 max-w-[70%]">
                       {slides[current].title.join(' ')}
                    </h3>
                    <div className="h-px flex-1 bg-linear-to-l from-transparent to-gold-500/50" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}