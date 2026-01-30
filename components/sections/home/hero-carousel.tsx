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
              <div className="relative z-20 flex flex-col justify-center lg:grid lg:grid-cols-[3fr_2fr] lg:items-center h-full w-full max-w-8xl mx-auto px-6 md:px-12 lg:px-24 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-32 sm:pb-36 md:pb-40 lg:pb-48 gap-6 md:gap-8">

                {/* Left Content Block */}
                <div className="space-y-4 lg:space-y-6 lg:pr-6 pb-20 sm:pb-0">
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
                          <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-full lg:max-w-[90%] font-light line-clamp-3 h-[4.875em]">
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className="group relative flex flex-col text-left transition-all"
                aria-label={`Go to slide ${index + 1}`}
              >
                {/* Progress Line */}
                <div className="relative h-[2px] w-full bg-white/20 overflow-hidden mb-2 md:mb-3">
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
                  "text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-semibold tracking-wider uppercase transition-all duration-500 leading-tight line-clamp-2",
                  current === index ? "text-white opacity-100" : "text-white opacity-30 group-hover:opacity-60"
                )}>
                  {slide.title.join(' ')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}