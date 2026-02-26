"use client";

import Image from "next/image";
import { History } from "lucide-react";
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { useEffect, useState } from "react";
import { AboutPactSettings } from "@/lib/db/schemas";
import { Skeleton } from "@/components/ui/skeleton";

export function AboutPact() {
  const [settings, setSettings] = useState<AboutPactSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/content/about-pact");
        const result = await res.json();
        if (result.success && result.data) {
          setSettings(result.data);
        } else {
            setSettings({
              title: "About PACT",
              subtitle1: "Chapter One",
              subtitle2: "The Legacy",
              description: "Founded on the principles of excellence and innovation, PACT has transformed the landscape of mediation. Our journey is a testament to the power of collaborative conflict resolution.",
              stats: [
                { label: "Cases Resolved", value: "2500+", order: 1 },
                { label: "Success Rate", value: "98%", order: 2 },
                { label: "Global Chapters", value: "15+", order: 3 },
                { label: "Trained Neutrals", value: "5000+", order: 4 },
              ],
              journeyImage: { url: "/images/pact-journey.png", alt: "Journey with The PACT" },
              journeyLabel: "Interactive Timeline 2015 - 2026",
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            } as any);
        }
      } catch (error) {
        console.error("Failed to fetch about settings", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  if (isLoading) return <div className="py-24 bg-navy-950 px-6"><Skeleton className="h-[400px] w-full max-w-7xl mx-auto rounded-4xl bg-white/5" /></div>;
  if (!settings) return null;

  return (
    <section className="relative py-16 md:py-24 bg-navy-950 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <FadeInUp className="text-center mb-16 md:mb-20 space-y-6">
          <div className="inline-flex items-center gap-4 opacity-40">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white">{settings.subtitle1}</span>
            <div className="h-px w-8 md:w-12 bg-white/30" />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white">{settings.subtitle2}</span>
          </div>
          
          <h2 className="text-4xl md:text-7xl font-light tracking-tight text-white leading-[1.1]">
            {settings.title.split(' ').map((word, i) => (
              <span key={i} className={word.toUpperCase() === "PACT" ? "text-gold-500 font-medium" : ""}>
                {word}{' '}
              </span>
            ))}
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed font-light">
            {settings.description}
          </p>
        </FadeInUp>

        {/* Stats Section */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-24 pb-12 border-b border-white/5">
          {settings.stats?.sort((a,b) => (a.order || 0) - (b.order || 0)).map((stat, i) => (
            <StaggerItem key={i} className="text-center space-y-2 group">
              <span className="block text-3xl md:text-5xl font-light text-white group-hover:text-gold-500 transition-colors duration-300">{stat.value}</span>
              <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-white/40">{stat.label}</span>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* The Massive Journey Display */}
        <FadeIn className="relative group -mx-6 md:mx-0" delay={0.2}>
          <div className="absolute -inset-1 bg-linear-to-r from-gold-500/20 via-blue-500/20 to-gold-500/20 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500 hidden md:block"></div>
          <div className="relative bg-black rounded-none md:rounded-2xl overflow-hidden shadow-2xl border-y md:border border-white/10">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
            <Image
              src={settings.journeyImage?.url || "/images/pact-journey.png"}
              alt={settings.journeyImage?.alt || settings.journeyLabel || "Journey with The PACT"}
              width={1920}
              height={1080}
              className="w-full h-auto object-cover transform transition duration-700 md:group-hover:scale-[1.01]"
              priority
            />
          </div>
          
          {/* Subtle Float Label */}
          <div className="absolute -top-4 -right-4 bg-navy-950 border border-white/10 px-6 py-3 rounded-full shadow-xl hidden md:block">
            <div className="flex items-center gap-3">
              <History className="w-4 h-4 text-gold-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">{settings.journeyLabel}</span>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
