"use client";

import React from "react";
import Image from "next/image";
import { 
  ArrowUpRight,
  Globe,
  Award,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeInUp } from "@/components/motion-wrapper";
import { GrainOverlay } from "@/components/grain-overlay";
import { Footer } from "@/components/footer";
import { Linkedin, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PanelMember } from "@/lib/db/schemas";

// --- Components ---

const SectionHeader = ({ subtitle, title, description, light = false, center = false }: { subtitle: string, title: string, description?: string, light?: boolean, center?: boolean }) => (
  <FadeInUp className={cn("mb-8 md:mb-16", center ? "flex flex-col items-center text-center" : "")}>
    <div className="inline-flex items-center gap-4 mb-4 opacity-70">
      <span className={cn("text-xs md:text-xs  tracking-[0.4em] uppercase", light ? "text-white" : "text-navy-950")}>{subtitle}</span>
      <div className={cn("h-px w-8 bg-gold-500/50", light ? "bg-gold-500" : "bg-gold-500")} />
    </div>
    <h2 className={cn("text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-4 sm:mb-6 leading-[1.1]", light ? "text-white" : "text-navy-950")}>
      {title}
    </h2>
    {description && (
      <p className={cn("max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed", light ? "text-white/60" : "text-navy-950/60")}>
        {description}
      </p>
    )}
  </FadeInUp>
);

const PanelHero = () => (
  <section className="relative min-h-[50vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 bg-navy-950 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <Image
        src="/hero/hero_mediation.png"
        alt="Experienced Neutrals"
        fill
        className="object-cover opacity-20 scale-105"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy-950/40 via-navy-950/90 to-navy-950" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <FadeInUp>
        <div className="flex items-center gap-3 mb-4 sm:mb-6 md:mb-8">
          <div className="h-px w-8 md:w-12 bg-gold-500" />
          <span className="text-gold-500  text-xs md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">
            Experienced Neutrals
          </span>
        </div>
        <h1 className="page-title text-4xl xs:text-5xl sm:text-7xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 select-none italic">
          EXPERIENCED NEUTRALS
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
           <p className="text-lg sm:text-2xl md:text-3xl text-white/90 font-light leading-snug tracking-tight">
              PACT Mediators are certified facilitators, experienced subject-matter experts and ethically sound professionals who are audited and accountable to the Mediators Code of Conduct.
           </p>
           <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">
             Our Panel of Experienced Neutrals comprises accredited professionals with diverse expertise across commercial, corporate, civil, and institutional disputes. Drawn from varied professional backgrounds, including law, commerce, and industry, our mediators are trained to manage complex negotiations, foster constructive dialogue, and guide parties toward durable, mutually acceptable outcomes.
           </p>
        </div>

        <div className="mt-12 md:mt-16 pt-12 border-t border-white/5">
           <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gold-500/90 font-light leading-[1.4] max-w-5xl">
             "PACT Mediators have hundreds of hours of mediation experience in court-referred and pre-litigation private mediation with a combined settlement average of 87%"
           </p>
        </div>
      </FadeInUp>
    </div>
  </section>
);

const GallerySection = () => {
  const [members, setMembers] = React.useState<PanelMember[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedMember, setSelectedMember] = React.useState<PanelMember | null>(null);

  React.useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/content/panel-members");
        const result = await res.json();
        if (result.success) {
          setMembers(result.data || []);
        }
      } catch (e) {
        console.error("Failed to fetch panel members:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMembers();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 text-center mb-20">
         <SectionHeader 
            subtitle="Mediator Gallery" 
            title="Our Neutrals"
            description="If parties prefer to meet the mediators before finalising their choice, this option is available in the Pre-Mediation Phase."
            center
         />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-gold-500 animate-spin" />
            <p className="text-navy-950/40 uppercase tracking-widest text-xs">Loading Neutrals...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-20 text-navy-950/40">
            No panel members listed at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member, i) => (
              <motion.div 
                key={member._id?.toString() || i} 
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-[2.5rem] bg-navy-50/50 border border-navy-100/50 h-full"
              >
                <div className="relative h-[450px] w-full overflow-hidden">
                  <Image
                    src={member.image.url}
                    alt={member.image.alt || member.name}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-110 filter md:grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-700" />
                  
                  {/* Floating LinkedIn Icon */}
                  {member.profileUrl && (
                    <a 
                      href={member.profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-navy-950 hover:bg-gold-500 transition-colors shadow-lg z-20 group/link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-navy-950 via-navy-950/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                    <button 
                      onClick={() => setSelectedMember(member)}
                      className="w-full py-4 bg-white text-navy-950 text-xs font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-2 hover:bg-gold-500 transition-colors shadow-2xl"
                    >
                      View Profile <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-8 text-center bg-white border-t border-navy-50 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-light text-navy-950 mb-1">{member.name}</h3>
                  <p className="text-xs text-navy-950/40  tracking-widest uppercase">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Detail Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="sm:max-w-7xl w-[95vw] md:w-[90vw] p-0 overflow-hidden bg-white border-none rounded-4xl md:rounded-[4rem] shadow-2xl">
          <div className="flex flex-col md:flex-row h-full md:h-[850px] max-h-[85vh] md:max-h-[90vh]">
            {/* Image Section - Fixed on Desktop */}
            <div className="w-full md:w-[40%] relative h-[350px] md:h-full bg-navy-950">
              {selectedMember && (
                <Image 
                  src={selectedMember.image.url} 
                  alt={selectedMember.name} 
                  fill 
                  className="object-cover object-top opacity-90"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 p-10 bg-linear-to-t from-navy-950 to-transparent">
                {selectedMember?.profileUrl && (
                  <a 
                    href={selectedMember.profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-navy-950 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold-500 transition-all hover:scale-105 shadow-2xl"
                  >
                    <Linkedin className="w-5 h-5" /> Connect on LinkedIn
                  </a>
                )}
              </div>
            </div>

            {/* Content Section - Scrollable */}
            <div className="w-full md:w-[60%] p-8 md:p-20 bg-white overflow-y-auto custom-scrollbar">
              <div className="mb-12 md:mb-16">
                <div className="flex items-center gap-6 mb-8">
                  <span className="text-gold-500 text-xs font-bold tracking-[0.5em] uppercase block">Panel Expert</span>
                  <div className="h-px w-12 bg-gold-500/30" />
                </div>
                <DialogTitle className="text-5xl md:text-7xl font-light text-navy-950 mb-6 leading-none tracking-tight">
                  {selectedMember?.name}
                </DialogTitle>
                <DialogDescription className="text-xl md:text-2xl text-navy-950/40 uppercase tracking-[0.3em] font-light">
                  {selectedMember?.role}
                </DialogDescription>
              </div>
              
              <div className="space-y-10">
                <div className="text-navy-950/70 text-lg md:text-2xl leading-relaxed font-light whitespace-pre-wrap">
                  {selectedMember?.bio || "No professional bio available at this time."}
                </div>

                <div className="pt-12 border-t border-navy-50 flex flex-wrap gap-12">
                  <div>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-navy-950/30 mb-2 font-bold">Status</p>
                    <p className="text-navy-950 text-lg md:text-xl font-medium italic">Certified Mediator & Facilitator</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-navy-950/30 mb-2 font-bold">Affiliation</p>
                    <p className="text-navy-950 text-lg md:text-xl font-medium">PACT Private Panel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};


export default function MediatorPanelPage() {
  return (
    <main className="relative min-h-screen w-full bg-white overflow-x-hidden">
      <GrainOverlay />
      <PanelHero />
      <GallerySection />
      <Footer />
    </main>
  );
}
