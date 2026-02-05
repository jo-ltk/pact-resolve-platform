"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Handshake, 
  Scale, 
  MessageSquare,
  ArrowRight,
  GraduationCap,
  Database,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { DashboardSectionCard } from "@/components/admin/DashboardSectionCard";
import { FadeInUp, StaggerContainer } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext";
import { toast } from "sonner";

export default function AcademyDashboard() {
  const { token } = useAuth();
  const [isSeeding, setIsSeeding] = useState(false);
  const [hasSeeded, setHasSeeded] = useState(false);

  const sections = [
    {
      title: "Mediation",
      description: "Manage Mediation Advocacy courses, modules, faculty profiles, and certification programs.",
      icon: Handshake,
      link: "/admin/academy/mediation",
      color: "text-blue-600",
      bg: "bg-blue-50/50"
    },
    {
      title: "Arbitration",
      description: "Edit Arbitration training content, curriculum modules, faculty, and strategic partners.",
      icon: Scale,
      link: "/admin/academy/arbitration",
      color: "text-amber-600",
      bg: "bg-amber-50/50"
    },
    {
      title: "Negotiation",
      description: "Update Skilled Negotiator courses, advanced curriculum, faculty, and partner listings.",
      icon: MessageSquare,
      link: "/admin/academy/negotiation",
      color: "text-rose-600",
      bg: "bg-rose-50/50"
    }
  ];

  const handleSeedData = async () => {
    if (!confirm("This will replace all Academy data with default content. Are you sure?")) {
      return;
    }
    
    setIsSeeding(true);
    try {
      const response = await fetch("/api/content/academy/seed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success(`Data seeded successfully! ${result.data.courses} courses, ${result.data.modules} modules, ${result.data.faculty} faculty, ${result.data.partners} partners created.`);
        setHasSeeded(true);
      } else {
        toast.error(result.error || "Failed to seed data");
      }
    } catch (error) {
      toast.error("An error occurred while seeding data");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Header Section */}
      <FadeInUp className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em]">GAADR Management</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Academy Management
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Manage all aspects of the Global Academy for Advocacy in Dispute Resolution including courses, modules, faculty, and partners.
          </p>
        </div>
        <Button 
          onClick={handleSeedData}
          disabled={isSeeding || hasSeeded}
          variant={hasSeeded ? "outline" : "default"}
          className="rounded-xl px-6 shadow-lg"
        >
          {isSeeding ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Seeding...
            </>
          ) : hasSeeded ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
              Data Seeded
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              Seed Initial Data
            </>
          )}
        </Button>
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
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Academy Programs Active</span>
             </div>
             <h3 className="text-2xl font-bold text-white tracking-tight">Global Academy for Advocacy in Dispute Resolution</h3>
             <p className="text-white/60 text-sm max-w-xl leading-relaxed">
                PACT's academic wing dedicated to high quality training and certification programmes in Mediation, Arbitration, and Negotiation.
             </p>
          </div>
          <Link href="/academy" target="_blank">
            <Button size="lg" className="rounded-full px-8 bg-white text-navy-950 hover:bg-white/90 font-bold transition-all hover:scale-105 active:scale-95 group/btn">
              Preview Academy
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-primary/20 transition-all pointer-events-none" />
      </FadeInUp>
    </div>
  );
}

