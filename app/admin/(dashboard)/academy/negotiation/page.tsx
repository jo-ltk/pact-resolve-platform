"use client";

import React from "react";
import Link from "next/link";
import { 
  MessageSquare,
  BookOpen,
  Users,
  Handshake,
  Settings,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { DashboardSectionCard } from "@/components/admin/DashboardSectionCard";
import { FadeInUp, StaggerContainer } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";

export default function NegotiationProgramDashboard() {
  const sections = [
    {
      title: "Course Settings",
      description: "Edit Skilled Negotiator and Advanced course metadata, pricing, and enrollment settings.",
      icon: Settings,
      link: "/admin/academy/negotiation/courses",
      color: "text-rose-600",
      bg: "bg-rose-50/50"
    },
    {
      title: "Training Modules",
      description: "Manage the curriculum roadmap for foundation and advanced negotiation courses.",
      icon: BookOpen,
      link: "/admin/academy/negotiation/modules",
      color: "text-emerald-600",
      bg: "bg-emerald-50/50"
    },
    {
      title: "Faculty Profiles",
      description: "Update faculty member profiles, images, roles, and expertise for negotiation courses.",
      icon: Users,
      link: "/admin/academy/negotiation/faculty",
      color: "text-blue-600",
      bg: "bg-blue-50/50"
    },
    {
      title: "Strategic Partners",
      description: "Manage partner logos, descriptions, and collaborator listings for negotiation programs.",
      icon: Handshake,
      link: "/admin/academy/negotiation/partners",
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
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em]">Negotiation Program</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Negotiation Management
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Manage Skilled Negotiator courses, curriculum modules, faculty profiles, and strategic partner listings.
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
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Negotiation Skills Program</span>
             </div>
             <h3 className="text-2xl font-bold text-white tracking-tight">Skilled Negotiator & Advanced Courses</h3>
             <p className="text-white/60 text-sm max-w-xl leading-relaxed">
                Master the psychology and strategy of successful deal-making and conflict resolution in high-stakes environments.
             </p>
          </div>
          <Link href="/academy/negotiation" target="_blank">
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
