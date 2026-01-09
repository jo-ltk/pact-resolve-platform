"use client";

import { Shader, ChromaFlow, Swirl } from "shaders/react";
import { GrainOverlay } from "@/components/grain-overlay";
import { useRef, useEffect, useState } from "react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHero({ title, subtitle, description, children }: PageHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const shaderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas");
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true);
          return true;
        }
      }
      return false;
    };

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId);
      }
    }, 100);

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section className="relative flex min-h-[80vh] w-full flex-col justify-end overflow-hidden px-6 pb-20 pt-40 md:px-12 md:pb-32 md:pt-48 bg-background border-b border-foreground/5">
      {/* Premium Shader Background */}
      <div
        ref={shaderContainerRef}
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1e3a5f"
            colorB="#d4a574"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40} coarseY={40}
            mediumX={40} mediumY={40}
            fineX={40} fineY={40}
          />
          <ChromaFlow
            baseColor="#1e3a5f"
            upColor="#1e3a5f"
            downColor="#e8e8e8"
            leftColor="#d4a574"
            rightColor="#d4a574"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
        <GrainOverlay />
      </div>

      <div className={`relative z-10 max-w-5xl transition-all duration-1000 delay-300 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}>
        <div className="mb-6 inline-block rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5 backdrop-blur-md">
          <p className="font-mono text-xs text-foreground/80 uppercase tracking-widest">
            {subtitle}
          </p>
        </div>
        
        <h1 className="mb-6 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="inline-block transition-all duration-1000">
            {title}
          </span>
        </h1>
        
        <div className="flex flex-col items-start gap-8">
          {description && (
            <p className="max-w-2xl text-lg leading-relaxed text-foreground/70 md:text-xl font-light">
              <span className="text-pretty">
                {description}
              </span>
            </p>
          )}
          {children && (
            <div className="shrink-0">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Subtle Gradient Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent z-10" />
    </section>
  );
}
