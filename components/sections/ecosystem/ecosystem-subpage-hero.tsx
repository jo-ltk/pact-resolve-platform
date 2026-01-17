"use client";

import { FadeInUp } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

interface EcosystemSubPageHeroProps {
  tag: string;
  title: React.ReactNode;
  description: string;
  className?: string;
}

export function EcosystemSubPageHero({ tag, title, description, className }: EcosystemSubPageHeroProps) {
  return (
    <div className={cn("py-24 md:py-32 bg-navy-950 text-white relative overflow-hidden", className)}>
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(191,154,102,0.1),transparent_60%)]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <FadeInUp className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-8 justify-center">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">
              {tag}
            </span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          
          <h1 className="text-[12vw] md:text-7xl font-light tracking-tight mb-8 leading-none">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </FadeInUp>
      </div>
    </div>
  );
}
