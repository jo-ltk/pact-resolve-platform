"use client";

import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  Trophy, 
  Image as ImageIcon, 
  ArrowRight
} from "lucide-react";
import { DashboardSectionCard } from "@/components/admin/DashboardSectionCard";
import { FadeInUp, StaggerContainer } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";

const eventCategories = [
  {
    title: "Mediation Champions League",
    description: "Manage seasons, visual galleries, and championship details for the league.",
    icon: Trophy,
    link: "/admin/events/mci",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    title: "Mission Mediation Conclave",
    description: "Manage conclave editions, highlights, and guest speakers for the flagship event.",
    icon: ImageIcon,
    link: "/admin/events/conclave",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "National Impact Awards",
    description: "Manage award ceremonies, honorary recipients, and winner spotlights.",
    icon: Trophy,
    link: "/admin/events/awards",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    title: "Advocate Maximus",
    description: "Manage details, memories, and strategic partners for Advocate Maximus events.",
    icon: Calendar,
    link: "/admin/events/advocate-maximus",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Events & Projects",
    description: "Manage miscellaneous general events and special institutional projects.",
    icon: Calendar,
    link: "/admin/events/general",
    color: "text-rose-500",
    bg: "bg-rose-500/10"
  }
];

export default function EventsDashboard() {

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Header Section */}
      <FadeInUp className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-1">
        <div className="space-y-2">
          
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em]">Institutional Events</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Events Management
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Select a specialized event category to manage its specific timeline, content, and visual assets.
          </p>
        </div>
      </FadeInUp>

      {/* Sections Grid */}
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {eventCategories.map((cat, i) => (
          <DashboardSectionCard 
            key={i}
            title={cat.title}
            description={cat.description}
            icon={cat.icon}
            link={cat.link}
            color={cat.color}
            bg={cat.bg}
          />
        ))}
      </StaggerContainer>

      {/* Bottom Footer Section */}
      <FadeInUp delay={0.4} className="mt-6 p-10 bg-navy-950 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative group">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Event Engine V2.1</span>
             </div>
             <h3 className="text-2xl font-bold text-white tracking-tight">Planning a New Event Series?</h3>
             <p className="text-white/60 text-sm max-w-xl leading-relaxed">
                New event types require database schema initialization and dedicated UI modules. Contact the system administrator to register a new flagship event category.
             </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-8 bg-white text-navy-950 hover:bg-white/90 font-bold transition-all hover:scale-105 active:scale-95 group/btn">
              Technical Support
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-primary/20 transition-all pointer-events-none" />
      </FadeInUp>
    </div>
  );
}
