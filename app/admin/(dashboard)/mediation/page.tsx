"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Briefcase, 
  Scale, 
  Clock,
  ArrowRight,
  Handshake
} from "lucide-react";
import { DashboardSectionCard } from "@/components/admin/DashboardSectionCard";
import { FadeInUp, StaggerContainer } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";

export default function MediationDashboard() {
  const sections = [
    {
      title: "Why Mediate Points",
      description: "Manage the PACT Advantage multi-point content shown on the Why Mediate page.",
      icon: Sparkles,
      link: "/admin/mediation/why-points",
      color: "text-amber-600",
      bg: "bg-amber-50/50"
    },
    {
      title: "Resolution Steps",
      description: "Edit the 'Total Commitment to Efficient Resolution' roadmap and procedural steps.",
      icon: Clock,
      link: "/admin/mediation/resolution-steps",
      color: "text-blue-600",
      bg: "bg-blue-50/50"
    },
    {
      title: "Mediation Rules",
      description: "Update the procedural integrity rules and governance framework.",
      icon: ShieldCheck,
      link: "/admin/mediation/rules",
      color: "text-emerald-600",
      bg: "bg-emerald-50/50"
    },
    {
      title: "Mediation Fees",
      description: "Manage transparent fee structures, convening fees, and financial policies.",
      icon: Scale,
      link: "/admin/mediation/fees",
      color: "text-purple-600",
      bg: "bg-purple-50/50"
    },
    {
      title: "Case Studies",
      description: "Create and manage confidential success stories, metrics, and resolution highlights.",
      icon: Briefcase,
      link: "/admin/mediation/case-studies",
      color: "text-rose-600",
      bg: "bg-rose-50/50"
    },
    {
      title: "Mediator Panel",
      description: "Update neutral panel experts. (Linked to Global Panel Members)",
      icon: Users,
      link: "/admin/home-page/panel-members",
      color: "text-navy-600",
      bg: "bg-navy-50/50"
    }
  ];

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Header Section */}
      <FadeInUp className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Handshake className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em]">Conflict Resolution Management</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Mediation Management
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Manage all aspects of the Mediation section including rules, fees, case studies, and the resolution process.
          </p>
        </div>
      </FadeInUp>

      {/* Sections Grid */}
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Institutional Support</span>
             </div>
             <h3 className="text-2xl font-bold text-white tracking-tight">Got a Mediation process update?</h3>
             <p className="text-white/60 text-sm max-w-xl leading-relaxed">
                Ensure all governance text and rules are synced with the latest legal standards under The Mediation Act, 2023.
             </p>
          </div>
          <Link href="/mediation" target="_blank">
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
