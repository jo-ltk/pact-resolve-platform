"use client";

import React from "react";
import Link from "next/link";
import { 
  Home, 
  Newspaper, 
  Users, 
  Handshake, 
  ImageIcon, 
  ArrowLeft,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { DashboardSectionCard } from "@/components/admin/DashboardSectionCard";
import { FadeInUp, StaggerContainer } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";

export default function HomepageDashboard() {
  const sections = [
    {
      title: "Hero Slides",
      description: "Manage cinematic carousel slides, high-impact titles, and homepage call-to-actions.",
      icon: ImageIcon,
      link: "/admin/home-page/hero-slides",
      color: "text-blue-600",
      bg: "bg-blue-50/50"
    },
    {
      title: "News & Media",
      description: "Curate latest articles, global news releases, and podcasts for the landing page.",
      icon: Newspaper,
      link: "/admin/home-page/news",
      color: "text-emerald-600",
      bg: "bg-emerald-50/50"
    },
    {
      title: "Panel Members",
      description: "Update neutral panel experts and lead mediators featured on the platform.",
      icon: Users,
      link: "/admin/home-page/panel-members",
      color: "text-purple-600",
      bg: "bg-purple-50/50"
    },
    {
      title: "Strategic Partners",
      description: "Manage institutional partnerships and collaborator logos displayed globally.",
      icon: Handshake,
      link: "/admin/home-page/partners",
      color: "text-amber-600",
      bg: "bg-amber-50/50"
    }
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-10 pb-16">
      {/* Header Section */}
      <FadeInUp className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-1">
        <div className="space-y-2">
         
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em]">Landing Page Assets</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Homepage Management
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
            Configure the visual and content identity of your platform's main landing page.
          </p>
        </div>
      </FadeInUp>

      {/* Sections Grid */}
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {sections.map((section, i) => (
          <DashboardSectionCard 
            key={i}
            title={section.title}
            description={section.description}
            icon={section.icon}
            link={section.link}
            color={section.color}
            bg={section.bg}
          />
        ))}
      </StaggerContainer>

      {/* Bottom Footer Section */}
      <FadeInUp delay={0.4} className="mt-6 p-10 bg-white rounded-[2.5rem] border border-navy-950/5 shadow-xl shadow-navy-950/5 overflow-hidden relative group">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse shadow-[0_0_15px_rgba(191,154,102,0.4)]" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-navy-950/60">Platform Structural Support</span>
             </div>
             <h3 className="text-2xl font-bold text-navy-950 tracking-tight">Need to Update Section Layout?</h3>
             <p className="text-navy-950/60 text-sm max-w-xl leading-relaxed">
                If you need to change the technical structure of these homepage sections, please contact the development team for layout synchronization.
             </p>
          </div>
          <Link href="/admin/global-settings">
            <Button size="lg" className="rounded-full px-8 bg-navy-950 text-white hover:bg-navy-900 font-bold transition-all hover:scale-105 active:scale-95 group/btn">
              Global Settings
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-accent/10 transition-all pointer-events-none" />
      </FadeInUp>
    </div>
  );
}
