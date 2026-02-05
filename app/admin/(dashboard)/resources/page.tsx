"use client";

import React from "react";
import { 
  BookOpen, 
  Library, 
  Mic, 
  PenTool, 
  ArrowRight
} from "lucide-react";
import { DashboardSectionCard } from "@/components/admin/DashboardSectionCard";
import { FadeInUp, StaggerContainer } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    title: "Blog & Library",
    description: "Manage Articles, Recommended Reads, Books, Videos, and News Features.",
    icon: Library,
    link: "/admin/resources/library",
    color: "text-emerald-600",
    bg: "bg-emerald-50/50"
  },
  {
    title: "Podcast",
    description: "Manage Mission Mediation Podcast episodes.",
    icon: Mic,
    link: "/admin/resources/podcast",
    color: "text-rose-600",
    bg: "bg-rose-50/50"
  },
  {
    title: "Journal",
    description: "Manage National Mediation Review papers and publications.",
    icon:  PenTool,
    link: "/admin/resources/journal",
    color: "text-blue-600",
    bg: "bg-blue-50/50"
  }
];

export default function ResourcesDashboard() {
  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Header Section */}
      <FadeInUp className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em]">Resources Management</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Resources Dashboard
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Manage the PACT Resources content, including the library, blog, podcast, and journal.
          </p>
        </div>
      </FadeInUp>

      {/* Sections Grid */}
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((section, i) => (
          <DashboardSectionCard 
            key={i}
            title={section.title}
            description={section.description}
            icon={<section.icon className={cn("h-8 w-8", section.color)} />}
            link={section.link}
            color={section.color}
            bg={section.bg}
          />
        ))}
      </StaggerContainer>

      {/* Bottom Footer Section */}
      <FadeInUp delay={0.4} className="mt-6 p-10 bg-navy-950 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative group">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.8)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Resources Status</span>
             </div>
             <h3 className="text-2xl font-bold text-white tracking-tight">Viewing Resource Pages?</h3>
             <p className="text-white/60 text-sm max-w-xl leading-relaxed">
                Changes made here will reflect on the Resources public pages immediately.
             </p>
          </div>
          <div className="flex gap-4">
            <Link href="/resources/blog" target="_blank">
              <Button size="lg" className="rounded-full px-6 bg-white/10 text-white hover:bg-white hover:text-navy-950 border border-white/20 font-bold transition-all group/btn">
                Preview Blog
              </Button>
            </Link>
            <Link href="/resources" target="_blank">
              <Button size="lg" className="rounded-full px-6 bg-white text-navy-950 hover:bg-white/90 font-bold transition-all hover:scale-105 active:scale-95 group/btn">
                All Resources
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-primary/20 transition-all pointer-events-none" />
      </FadeInUp>
    </div>
  );
}
