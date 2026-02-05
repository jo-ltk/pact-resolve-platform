"use client";

import React from "react";
import Link from "next/link";
import { 
  Scale,
  BookOpen,
  Users,
  Award,
  Settings,
  Handshake,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { DashboardSectionCard } from "@/components/admin/DashboardSectionCard";
import { FadeInUp, StaggerContainer } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";

export default function ArbitrationProgramDashboard() {
  const sections = [
    {
      title: "Course Settings",
      description: "Edit foundational and certificate course metadata, pricing, mode, and certification details.",
      icon: Settings,
      link: "/admin/academy/arbitration/courses",
      color: "text-amber-600",
      bg: "bg-amber-50/50"
    },
    {
      title: "Training Modules",
      description: "Manage the curriculum roadmap for foundation and advanced arbitration advocacy courses.",
      icon: BookOpen,
      link: "/admin/academy/arbitration/modules",
      color: "text-emerald-600",
      bg: "bg-emerald-50/50"
    },
    {
      title: "Faculty Profiles",
      description: "Update faculty member profiles, images, roles, and expertise for arbitration courses.",
      icon: Users,
      link: "/admin/academy/arbitration/faculty",
      color: "text-blue-600",
      bg: "bg-blue-50/50"
    },
    {
      title: "Strategic Partners",
      description: "Manage partner logos, descriptions, and collaborator listings for arbitration programs.",
      icon: Handshake,
      link: "/admin/academy/arbitration/partners",
      color: "text-purple-600",
      bg: "bg-purple-50/50"
    }
  ];

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Header Section */}
      <FadeInUp className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-1">
        <div className="space-y-4">
          <Link href="/admin/academy" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Academy
          </Link>
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Scale className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em]">Arbitration Program</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Arbitration Management
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Manage Arbitration courses, curriculum modules, faculty profiles, and strategic partner listings.
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
      <FadeInUp delay={0.4} className="mt-6 p-10 bg-navy-950 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative group">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Arbitration Advocacy Program</span>
             </div>
             <h3 className="text-2xl font-bold text-white tracking-tight">Foundation & Certificate Courses</h3>
             <p className="text-white/60 text-sm max-w-xl leading-relaxed">
                In-depth courses on the arbitration lifecycle, rules, and advocacy for both domestic and international dispute forums.
             </p>
          </div>
          <Link href="/academy/arbitration" target="_blank">
            <Button size="lg" className="rounded-full px-8 bg-white text-navy-950 hover:bg-white/90 font-bold transition-all hover:scale-105 active:scale-95 group/btn">
              Preview Frontend
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-primary/20 transition-all pointer-events-none" />
      </FadeInUp>
    </div>
  );
}
