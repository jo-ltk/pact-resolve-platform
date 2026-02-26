"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Globe, 
  BookOpen, 
  Users, 
  Scale, 
  ChevronRight,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WhyPactPoint } from "@/lib/db/schemas";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Globe,
  BookOpen,
  Users,
  Scale
};

export function WhyPact() {
  const fallbackSections = [
    {
      _id: "fallback-1" as any,
      label: "Global Standards",
      iconName: "Globe",
      title: "Elevating Mediation to Global Standards",
      description: "Our frameworks are built upon internationally recognized principles, ensuring that every mediated outcome is robust, equitable, and enforceable across multiple jurisdictions.",
      cta: "Explore Our Standards",
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "fallback-2" as any,
      label: "Expert Neutrals",
      iconName: "Users",
      title: "A Roster of Distinguished Neutrals",
      description: "Access an elite panel of mediators, arbitrators, and technical experts. Our neutrals are rigorously vetted to guarantee the highest caliber of professional conflict resolution.",
      cta: "Meet The Panel",
      order: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "fallback-3" as any,
      label: "Institutional Trust",
      iconName: "Shield",
      title: "Anchored in Institutional Trust",
      description: "As a trusted partner to law firms, enterprises, and governments, PACT provides the secure harbor needed to resolve sensitive, high-value disputes confidentially.",
      cta: "Learn About PACT",
      order: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const [sections, setSections] = useState<WhyPactPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    async function fetchSections() {
      try {
        const res = await fetch("/api/content/why-pact");
        const result = await res.json();
        if (result.success && result.data && result.data.length > 0) {
          setSections(result.data);
          setActiveTab(result.data[0]._id?.toString() || "");
        } else {
          setSections(fallbackSections);
          setActiveTab(fallbackSections[0]._id.toString());
        }
      } catch (error) {
        console.error("Failed to fetch why-pact sections", error);
        setSections(fallbackSections);
        setActiveTab(fallbackSections[0]._id.toString());
      } finally {
        setIsLoading(false);
      }
    }
    fetchSections();
  }, []);

  const activeContent = sections.find(s => s._id?.toString() === activeTab);

  if (isLoading) return <div className="py-24 bg-navy-950 px-6"><Skeleton className="h-[500px] w-full max-w-7xl mx-auto rounded-4xl bg-white/5" /></div>;
  if (sections.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-navy-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
             <div className="h-px w-8 bg-gold-500" />
             <p className="text-gold-500  text-xs uppercase tracking-[0.3em] font-medium">Why PACT</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-6">
            Building Trusted <span className="text-gold-500 italic">Foundations</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 lg:gap-20 items-start">
          
          {/* Tabs Navigation */}
          <div className="space-y-3">
            {sections.map((section) => {
              const Icon = iconMap[section.iconName] || Shield;
              const isActive = activeTab === section._id?.toString();
              
              return (
                <button
                  key={section._id?.toString()}
                  onClick={() => setActiveTab(section._id?.toString() || "")}
                  className={cn(
                    "w-full text-left p-6 rounded-2xl transition-all duration-500 group relative overflow-hidden",
                    isActive 
                      ? "bg-white/5 border border-white/10 shadow-2xl" 
                      : "hover:bg-white/[0.02] border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
                      isActive ? "bg-gold-500 text-navy-950" : "bg-white/5 text-white/40 group-hover:text-white"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={cn(
                      "font-medium tracking-tight text-sm md:text-base transition-colors duration-500",
                      isActive ? "text-white" : "text-white/40 group-hover:text-white/60"
                    )}>
                      {section.label}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gold-500"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeContent && (
                <motion.div
                  key={activeContent._id?.toString()}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <h3 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
                      {activeContent.title}
                    </h3>
                    <p className="text-white/60 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
                      {activeContent.description}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <button className="group flex items-center gap-3 text-gold-500 font-medium tracking-wide hover:text-gold-400 transition-colors">
                      {activeContent.cta || "Learn More"}
                      <div className="w-8 h-8 rounded-full border border-gold-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
