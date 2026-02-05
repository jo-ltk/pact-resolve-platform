"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  PlayCircle,
  FileText,
  Award,
  CheckCircle2,
  Users,
  Mail,
  Scale,
  Globe,
  Sparkles,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { GrainOverlay } from "@/components/grain-overlay";
import { Footer } from "@/components/footer";
import { MagneticButton } from "@/components/magnetic-button";
import { Collaborators } from "@/components/sections/home/collaborators";

// --- Reusable Components ---

const SectionHeader = ({ subtitle, title, description, dark = false, center = false }: { subtitle: string, title: string, description?: string, dark?: boolean, center?: boolean }) => (
  <FadeInUp className={cn("mb-12 md:mb-20", center ? "flex flex-col items-center text-center" : "")}>
    <div className="inline-flex items-center gap-4 mb-6 opacity-80">
      <div className={cn("h-px w-12 bg-gold-500", dark ? "bg-gold-500" : "bg-gold-500/50")} />
      <span className={cn("text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase font-bold", dark ? "text-gold-500" : "text-navy-950/60")}>{subtitle}</span>
    </div>
    <h2 className={cn("text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-light tracking-tight mb-8 leading-[0.95]", dark ? "text-white" : "text-navy-950")}>
      {title.split(' ').map((word, i) => (
        <span key={i} className={cn(word.toLowerCase() === 'arbitration' || word.toLowerCase() === 'team' || word.toLowerCase() === 'advocacy' ? "text-gold-500 italic font-medium" : "")}>
          {word}{' '}
        </span>
      ))}
    </h2>
    {description && (
      <p className={cn("max-w-3xl text-lg sm:text-xl md:text-2xl font-light leading-relaxed", dark ? "text-white/50" : "text-navy-950/50")}>
        {description}
      </p>
    )}
  </FadeInUp>
);

const CurriculumRoadmap = ({ modules, type, dark = false }: { modules: { title: string; content: string }[], type: string, dark?: boolean }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-4 w-full">
      {modules.map((module, i) => (
        <motion.div
           key={i}
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: i * 0.05 }}
           className={cn(
             "group relative overflow-hidden rounded-3xl md:rounded-4xl border transition-all duration-500",
             activeStep === i 
               ? (dark ? "bg-white/10 border-gold-500 shadow-[0_0_30px_-10px_rgba(191,154,102,0.1)]" : "bg-navy-950 border-gold-500 shadow-2xl") 
               : (dark ? "bg-white/2 border-white/5 hover:bg-white/4 hover:border-white/10" : "bg-white border-navy-100 hover:border-gold-500/30 hover:bg-navy-50/50 shadow-xs")
           )}
        >
           <button
             onClick={() => setActiveStep(i)}
             className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 md:pr-8 text-left relative z-10"
           >
             <div className="flex items-center gap-4 md:gap-8 grow min-w-0">
                <span className={cn(
                  "font-mono text-lg md:text-2xl transition-colors duration-500 shrink-0",
                  activeStep === i ? "text-gold-500 font-medium" : (dark ? "text-white/20" : "text-navy-900/10")
                )}>
                  0{i + 1}
                </span>
                
                <div className="min-w-0 flex items-center gap-6 grow">
                  <h3 className={cn(
                    "text-lg sm:text-xl md:text-3xl font-light transition-colors duration-500 tracking-tight",
                    activeStep === i ? "text-white" : (dark ? "text-white/60" : "text-navy-900/40 group-hover:text-navy-900")
                  )}>
                    {module.title.includes(': ') ? module.title.split(': ')[1] : module.title}
                  </h3>
 
                  <div className="hidden md:flex items-center gap-6 px-8 grow opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className={cn("h-px grow transition-all duration-500", activeStep === i ? "bg-gold-500/50" : (dark ? "bg-white/10" : "bg-navy-100"))} />
                    <span className={cn(
                      "font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300",
                      activeStep === i ? "text-gold-500" : (dark ? "text-white/30" : "text-navy-900/20")
                    )}>
                      {type} Phase
                    </span>
                  </div>
                </div>
             </div>
 
             <div className={cn(
               "w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ml-4 relative z-20 shadow-lg",
               activeStep === i 
                 ? "bg-gold-500 border-gold-500 text-navy-950 rotate-90 scale-110" 
                 : (dark ? "bg-navy-950 border-white/10 text-white/30 group-hover:border-white/30 group-hover:text-white" : "bg-white border-navy-100 text-navy-200 group-hover:border-gold-500 group-hover:text-gold-500")
             )}>
               <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
             </div>
           </button>
 
           <AnimatePresence>
             {activeStep === i && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: "auto", opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
               >
                 <div className="px-4 md:px-6 pb-6 md:pb-10 pl-4 sm:pl-[3.5rem] md:pl-[6rem]">
                   <div className={cn("h-px w-full mb-6 md:mb-8", dark ? "bg-white/5" : "bg-navy-950/5")} />
                   <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-start">
                     <p className={cn(
                       "text-base md:text-xl font-light leading-relaxed max-w-4xl py-1",
                       dark ? "text-white/60" : "text-white/70"
                     )}>
                       {module.content}
                     </p>
                     
                     <div className={cn(
                       "hidden lg:flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border transition-all duration-500 min-w-[120px]",
                       dark ? "bg-white/5 border-white/10 group-hover:bg-white/10" : "bg-white/5 border-white/10 group-hover:bg-white/10 shadow-lg"
                     )}>
                        <Video className="w-6 h-6 text-gold-500" />
                        <span className={cn("text-[9px] font-mono uppercase tracking-widest font-bold", dark ? "text-white/40" : "text-white/40")}>Streamable</span>
                     </div>
                   </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

// --- Hero Section ---
const ArbitrationHero = () => (
  <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 bg-navy-950 overflow-hidden dark">
    <div className="absolute inset-0 z-0">
      <Image
        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" 
        alt="Arbitration Academy"
        fill
        className="object-cover opacity-30 scale-105"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy-950/40 via-navy-950/90 to-navy-950" />
      <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-transparent to-transparent opacity-80" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <FadeInUp>
        <div className="flex items-center gap-3 mb-4 sm:mb-6 md:mb-8">
          <div className="h-px w-8 md:w-12 bg-gold-500" />
          <span className="text-gold-500 font-mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">
            Academy / Arbitration
          </span>
        </div>
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 select-none italic">
          ARBITRATION
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="space-y-6 md:space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed">
              The Global Academy for Advocacy in Dispute Resolution (GAADR) is PACT&apos;s academic wing, dedicated to high quality training and certification programmes. PACT collaborates with the best in the business to curate customised training modules and deliver practical and thought-provoking programmes.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
                <MagneticButton variant="primary" size="lg" className="group">
                    <Link href="#courses" className="flex items-center gap-2">
                        Explore Courses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </MagneticButton>
                <a href="mailto:academy@thepact.in" className="flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <Mail className="w-5 h-5 text-gold-500" />
                    <span className="text-sm font-medium text-white/90">academy@thepact.in</span>
                </a>
            </div>
          </div>
          <div className="relative group hidden lg:block">
            <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative p-10 rounded-3xl border border-white/10 bg-white/2 backdrop-blur-sm">
              <p className="text-xl text-white/70 font-light italic leading-relaxed">
                Got a query? Email – academy@thepact.in
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-gold-500" />
                </div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Global Learning Network</span>
              </div>
            </div>
          </div>
        </div>
      </FadeInUp>
    </div>
  </section>
);

export default function ArbitrationPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, modulesRes, facultyRes] = await Promise.all([
          fetch('/api/content/academy/courses?program=arbitration'),
          fetch('/api/content/academy/modules?program=arbitration'),
          fetch('/api/content/academy/faculty?program=arbitration')
        ]);

        if (!coursesRes.ok || !modulesRes.ok || !facultyRes.ok) {
          throw new Error("Failed to fetch arbitration data");
        }

        const [coursesData, modulesData, facultyData] = await Promise.all([
          coursesRes.json(),
          modulesRes.json(),
          facultyRes.json()
        ]);

        if (coursesData.success) setCourses(coursesData.data);
        if (modulesData.success) setModules(modulesData.data);
        if (facultyData.success) setFaculty(facultyData.data);
      } catch (error) {
        console.error("Error fetching arbitration data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const foundationalCourse = courses.find(c => c.courseType === 'foundational');
  const advancedCourse = courses.find(c => c.courseType === 'advanced');
  
  const foundationModulesArr = modules.filter(m => m.courseType === 'foundational');
  const advancedModulesArr = modules.filter(m => m.courseType === 'advanced');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Loading Academy...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <GrainOverlay />
      <ArbitrationHero />

      {/* Section: Train Your Team */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <FadeInUp>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-navy-50 text-[10px] font-mono text-navy-950/40 uppercase tracking-widest mb-4">Corporate Training</div>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight text-navy-950 mb-6">
                Train Your <span className="text-gold-500 italic font-medium">Team</span>
              </h2>
              <p className="text-lg text-navy-950/60 leading-relaxed max-w-2xl">
                PACT offers customised in-person trainings in Arbitration and Arbitration Advocacy (1-Day / 2-Day) as per preferences of the client. We collaborate with industry experts and leading international organisations to bring you the best practical knowledge and exercises.
              </p>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { title: "Customised Modules", icon: FileText, desc: "Bespoke content" },
                { title: "Relatable Roleplays", icon: Users, desc: "Practical scenarios" },
                { title: "Skilled Trainers", icon: Award, desc: "Global experts" },
                { title: "Relevant Case Studies", icon: CheckCircle2, desc: "Real-world context" }
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="relative h-full px-6 py-8 rounded-5xl bg-navy-50/20 border border-navy-100/30 hover:bg-white hover:border-gold-500/20 transition-all duration-700 hover:shadow-xl flex flex-col items-center text-center group">
                    <div className="w-14 h-14 rounded-2xl bg-white text-navy-950 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all duration-500 group-hover:rotate-12 shadow-sm border border-navy-100/50 mb-6">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-light text-navy-950 mb-2 group-hover:text-gold-500 transition-colors uppercase italic">{item.title}</h4>
                    <p className="text-xs text-navy-950/40 font-light">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInUp delay={0.4} className="pt-8">
              <p className="text-sm font-mono uppercase tracking-widest text-navy-950/40 mb-4">Contact Us</p>
              <a href="mailto:academy@thepact.in" className="text-2xl md:text-3xl font-light text-navy-950 hover:text-gold-500 transition-colors">
                Write to us at – <span className="underline decoration-gold-500/30">academy@thepact.in</span>
              </a>
            </FadeInUp>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
             <div className="relative aspect-square rounded-4xl overflow-hidden border border-navy-100 shadow-2xl">
               <Image 
                 src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" 
                 alt="Arbitration Training" 
                 fill 
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-navy-950/20" />
             </div>
          </div>
        </div>
      </section>

      {/* Section: Foundation Course in Arbitration */}
      {foundationalCourse && (
        <section id="courses" className="py-24 md:py-40 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <SectionHeader 
              subtitle="Online Courses" 
              title={foundationalCourse.title}
              description={foundationalCourse.subtitle}
              center
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20 items-start mb-32">
              <div className="space-y-10">
                <div className="flex items-baseline gap-6 border-b border-navy-100 pb-8">
                  <span className="text-[10px] font-mono text-gold-600 uppercase tracking-[0.5em] font-bold">I.</span>
                  <p className="text-2xl md:text-4xl text-navy-950 font-light tracking-tight">{foundationalCourse.title}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-navy-950/30 uppercase tracking-widest block font-bold">Mode</span>
                    <p className="text-lg text-navy-950/70 font-light">{foundationalCourse.mode}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-navy-950/30 uppercase tracking-widest block font-bold">Live Session</span>
                    <p className="text-lg text-navy-950/70 font-light">{foundationalCourse.liveSession}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-navy-950/30 uppercase tracking-widest block font-bold">Assessment</span>
                    <p className="text-lg text-navy-950/70 font-light">{foundationalCourse.assessment}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-navy-950/30 uppercase tracking-widest block font-bold">Certification</span>
                    <p className="text-lg text-navy-950/70 font-light">{foundationalCourse.certification}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                  <div className="relative aspect-[1.4/1] w-full rounded-[2.5rem] overflow-hidden border border-navy-100 bg-white shadow-sm flex items-center justify-center group/cert">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,#f8f9fa_25%,transparent_25%,transparent_75%,#f8f9fa_75%,#f8f9fa),linear-gradient(45deg,#f8f9fa_25%,transparent_25%,transparent_75%,#f8f9fa_75%,#f8f9fa)] bg-size-[20px_20px] bg-position-[0_0,10px_10px] opacity-50" />
                      <div className="text-center z-10 p-8">
                           <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-4 group-hover/cert:scale-110 transition-transform duration-500">
                               <Award className="w-8 h-8 text-gold-500" />
                           </div>
                           <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-navy-950/40 font-bold">Certificate</p>
                      </div>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-navy-50/50 border border-navy-100 backdrop-blur-xl relative group">
                      <div className="absolute -inset-1 bg-linear-to-r from-gold-500/10 to-transparent rounded-[2.6rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-8">
                          <h5 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-navy-950/40">Fee</h5>
                          <Sparkles className="w-5 h-5 text-gold-500" />
                        </div>
                        <div className="mb-8">
                          <p className="text-5xl font-light text-navy-950 mb-2 tracking-tighter">{foundationalCourse.feeAmount} <span className="text-sm font-mono text-navy-950/20">{foundationalCourse.feeCurrency} {foundationalCourse.feeNote}</span></p>
                        </div>
                        <MagneticButton variant="primary" size="lg" className="w-full">
                          <Link href={foundationalCourse.ctaLink || "#"} className="w-full flex justify-center py-2 text-base font-bold uppercase tracking-widest">{foundationalCourse.ctaText || "Sign Up"}</Link>
                        </MagneticButton>
                      </div>
                  </div>
              </div>
            </div>

            {/* Training Modules Header */}
            {foundationModulesArr.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-6 mb-12">
                   <div className="h-px bg-navy-100 grow" />
                   <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-navy-950/20 font-bold italic">Training Modules</span>
                   <div className="h-px bg-navy-100 grow" />
                </div>
                <CurriculumRoadmap modules={foundationModulesArr} type="Foundation" />
              </div>
            )}
          </div>
        </section>
      )}

      <div className="w-full h-px bg-navy-100/50" />

      {/* Section: Certificate Course in Arbitration Advocacy */}
      {advancedCourse && (
        <section className="py-24 md:py-40 bg-navy-950 relative overflow-hidden dark">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <SectionHeader 
              subtitle="Advanced Certification" 
              title={advancedCourse.title}
              description={advancedCourse.subtitle}
              dark
              center
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20 items-start mb-20">
              <div className="space-y-10">
                <div className="flex items-baseline gap-6 border-b border-white/5 pb-8">
                  <span className="text-[10px] font-mono text-gold-500/60 uppercase tracking-[0.5em] font-bold">II.</span>
                  <p className="text-2xl md:text-4xl text-white font-light tracking-tight">{advancedCourse.title}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block">Mode</span>
                    <p className="text-lg text-white/80 font-light">{advancedCourse.mode}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block">Live Session</span>
                    <p className="text-lg text-white/80 font-light">{advancedCourse.liveSession}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block">Assessment</span>
                    <p className="text-lg text-white/80 font-light">{advancedCourse.assessment}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block">Certification</span>
                    <p className="text-lg text-white/80 font-light">{advancedCourse.certification}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                  <div className="relative aspect-[1.4/1] w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center group/cert">
                      <div className="text-center z-10 p-8">
                           <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover/cert:scale-110 transition-transform duration-500">
                               <Award className="w-8 h-8 text-gold-500" />
                           </div>
                           <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 font-bold">Advanced Certificate</p>
                      </div>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-white/3 border border-white/10 backdrop-blur-xl relative group">
                      <div className="absolute -inset-1 bg-linear-to-r from-gold-500/20 to-transparent rounded-[2.6rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-8">
                          <h5 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-gold-500/60">Fee</h5>
                          <Award className="w-5 h-5 text-gold-500" />
                        </div>
                        <div className="mb-8">
                          <p className="text-5xl font-light text-white mb-2 tracking-tighter">{advancedCourse.feeAmount} <span className="text-sm font-mono text-white/20">{advancedCourse.feeCurrency} {advancedCourse.feeNote}</span></p>
                        </div>
                        <MagneticButton variant="primary" size="lg" className="w-full">
                          <Link href={advancedCourse.ctaLink || "#"} className="w-full flex justify-center py-2 text-base font-bold uppercase tracking-widest">{advancedCourse.ctaText || "Sign Up"}</Link>
                        </MagneticButton>
                      </div>
                  </div>
              </div>
            </div>

            {advancedModulesArr.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-6 mb-12">
                   <div className="h-px bg-white/10 grow" />
                   <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 font-bold italic">Training Modules</span>
                   <div className="h-px bg-white/10 grow" />
                </div>
                <CurriculumRoadmap modules={advancedModulesArr} type="Advanced" dark />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section: Faculty */}
      {faculty.length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              subtitle="Expert Network" 
              title="Faculty"
              description=""
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {faculty.map((member, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-3/4 rounded-4xl overflow-hidden border border-navy-100 mb-6 transition-all duration-500 group-hover:shadow-2xl">
                    <Image src={member.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"} alt={member.name} fill className="object-cover md:grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                  <h4 className="text-xl font-medium text-navy-950 mb-1">{member.name}</h4>
                  <p className="text-sm font-mono uppercase tracking-widest text-gold-500 font-bold">{member.role}</p>
                </div>
              ))}
              {faculty.length < 4 && (
                <div className="flex flex-col items-center justify-center p-8 rounded-4xl border-2 border-dashed border-navy-100 bg-slate-50/50">
                  <p className="text-navy-950/30 font-medium text-center italic">More Faculty Profiles<br/>Coming Soon</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Section: Collaborators */}
      <div className="border-t border-navy-100/50">
        <Collaborators />
      </div>

      <Footer />
    </main>
  );
}
