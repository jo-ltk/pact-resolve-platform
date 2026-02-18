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
  Handshake,
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
      <span className={cn("text-xs md:text-xs font-mono tracking-[0.4em] uppercase font-bold", dark ? "text-gold-500" : "text-navy-950/60")}>{subtitle}</span>
    </div>
    <h2 className={cn("text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-light tracking-tight mb-8 leading-[0.95]", dark ? "text-white" : "text-navy-950")}>
      {title.split(' ').map((word, i) => (
        <span key={i} className={cn(word.toLowerCase() === 'mediation' || word.toLowerCase() === 'team' || word.toLowerCase() === 'advocacy' ? "text-gold-500 italic font-medium" : "")}>
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

const CurriculumRoadmap = ({ modules, type, dark = false }: { modules: any[], type: string, dark?: boolean }) => {
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
 
                  {/* Desktop Roadmap Line & Label */}
                  <div className="hidden md:flex items-center gap-6 px-8 grow opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className={cn("h-px grow transition-all duration-500", activeStep === i ? "bg-gold-500/50" : (dark ? "bg-white/10" : "bg-navy-100"))} />
                    <span className={cn(
                      "font-mono text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300",
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
                 <div className="px-4 md:px-6 pb-6 md:pb-10 pl-4 sm:pl-14 md:pl-24">
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
const MediationHero = () => (
  <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 bg-navy-950 overflow-hidden dark">
    <div className="absolute inset-0 z-0">
      <Image
        src="https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?auto=format&fit=crop&q=80" 
        alt="Mediation Academy"
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
          <span className="text-gold-500 font-mono text-xs md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">
            Academy / Mediation
          </span>
        </div>
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 select-none italic">
          MEDIATION
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="space-y-6 md:space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed">
              The Global Academy for Advocacy in Dispute Resolution ("GAADR") is PACT's academic wing, dedicated to high quality training and certification programmes. PACT collaborates with the best in the business to curate customised training modules and deliver practical and thought-provoking programmes.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
                <MagneticButton variant="primary" size="lg" className="group">
                    <Link href="#courses" className="flex items-center gap-2">
                        View Courses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              <p className="text-xl text-white/70 font-light leading-relaxed">
                Got a query? Email – academy@thepact.in
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <Handshake className="w-5 h-5 text-gold-500" />
                </div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Collaborative Resolution</span>
              </div>
            </div>
          </div>
        </div>
      </FadeInUp>
    </div>
  </section>
);

export default function MediationPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, modulesRes, facultyRes, partnersRes] = await Promise.all([
          fetch(`/api/content/academy/courses?program=mediation&t=${Date.now()}`),
          fetch(`/api/content/academy/modules?program=mediation&t=${Date.now()}`),
          fetch(`/api/content/academy/faculty?program=mediation&t=${Date.now()}`),
          fetch(`/api/content/academy/partners?program=mediation&t=${Date.now()}`)
        ]);

        if (!coursesRes.ok || !modulesRes.ok || !facultyRes.ok || !partnersRes.ok) {
          throw new Error("Failed to fetch mediation data");
        }

        const [coursesData, modulesData, facultyData, partnersData] = await Promise.all([
          coursesRes.json(),
          modulesRes.json(),
          facultyRes.json(),
          partnersRes.json()
        ]);

        if (coursesData.success) setCourses(coursesData.data);
        if (modulesData.success) setModules(modulesData.data);
        if (facultyData.success) setFaculty(facultyData.data);
        if (partnersData.success) setPartners(partnersData.data);
      } catch (error) {
        console.error("Error fetching mediation data:", error);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
          <p className="text-navy-950/40 font-mono text-xs uppercase tracking-widest">Loading Academy...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <GrainOverlay />
      <MediationHero />

      {/* Section: Train Your Team */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <FadeInUp>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-navy-50 text-xs font-mono text-navy-950/40 uppercase tracking-widest mb-4">Corporate Training</div>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight text-navy-950 mb-6">
                Train Your <span className="text-gold-500 italic font-medium">Team</span>
              </h2>
              <p className="text-lg text-navy-950/60 leading-relaxed max-w-2xl">
                PACT offers customised in-person trainings in Mediation and Mediation Advocacy (1-Day / 2-Day) as per preferences of the client. We collaborate with industry experts and leading international organisations to bring you the best practical knowledge and exercises.
              </p>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { title: "Customised Modules", icon: FileText },
                { title: "Relatable Roleplays", icon: Users },
                { title: "Skilled Trainers", icon: Award },
                { title: "Relevant Case Studies", icon: CheckCircle2 }
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-navy-50/50 border border-navy-100/50 group hover:bg-white hover:shadow-lg transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gold-500 shadow-sm group-hover:bg-gold-500 group-hover:text-white transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-navy-950">{item.title}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInUp delay={0.4} className="pt-12">
              <div className="group relative inline-block">
                <div className="absolute -inset-4 bg-gold-500/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-center gap-3 text-navy-950/30">
                    <span className="text-xs font-mono uppercase tracking-[0.4em]">Inquiry</span>
                    <div className="h-px w-8 bg-navy-100" />
                  </div>
                  <a href="mailto:academy@thepact.in" className="flex items-center gap-6 group/link">
                    <div className="w-14 h-14 rounded-2xl bg-navy-950 flex items-center justify-center text-white group-hover/link:bg-gold-500 group-hover/link:text-navy-950 transition-all duration-500 shadow-xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-light text-navy-950 group-hover/link:text-gold-500 transition-colors">
                        academy<span className="text-gold-500 font-medium group-hover/link:text-navy-950">@</span>thepact.in
                      </h4>
                      <p className="text-xs font-mono uppercase tracking-widest text-navy-950/40 mt-1">Connect for Custom Modules</p>
                    </div>
                  </a>
                </div>
              </div>
            </FadeInUp>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
             <div className="relative aspect-square rounded-4xl overflow-hidden border border-navy-100 shadow-2xl">
               <Image 
                 src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" 
                 alt="Mediation Training" 
                 fill 
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-navy-950/20" />
             </div>
          </div>
        </div>
      </section>

      {/* Section: Foundational Course in Mediation Advocacy */}
      {foundationalCourse && (
        <section id="courses" className="py-24 md:py-40 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <SectionHeader 
              subtitle="Online Course" 
              title={foundationalCourse.title}
              description={foundationalCourse.subtitle}
              center
            />

            <div className="flex flex-col gap-12 mb-24">
              <div className="space-y-10">
                <div className="flex items-baseline gap-6 border-b border-navy-100 pb-8">
                  <p className="text-2xl md:text-4xl text-navy-950 font-light tracking-tight">{foundationalCourse.title}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

              {/* Wide Horizontal Enrollment Banner */}
              <div className="relative group w-full">
                <div className="absolute -inset-0.5 bg-linear-to-r from-gold-500/20 via-transparent to-gold-500/10 rounded-4xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative overflow-hidden rounded-4xl border border-navy-100 bg-white shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center w-full">
                  {/* Left: Pricing */}
                  <div className="p-8 lg:p-12 lg:border-r border-navy-50 shrink-0 bg-slate-50/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-[0.4em] text-navy-950/40 font-bold">{foundationalCourse.enrollmentStatus || "Enrollment Open"}</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <p className="text-5xl md:text-6xl font-light text-navy-950 tracking-tighter">{foundationalCourse.feeAmount}</p>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-gold-600 font-mono tracking-widest leading-none">{foundationalCourse.feeCurrency}</p>
                        <p className="text-xs font-mono text-navy-950/20 uppercase tracking-widest mt-1">{foundationalCourse.feeNote}</p>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Key Benefits (Visible on Desktop) */}
                  <div className="hidden xl:flex flex-1 px-8 2xl:px-12 gap-6 2xl:gap-12 items-center overflow-hidden">
                    {(foundationalCourse.benefits || []).slice(0, 3).map((benefit: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 group/item shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-gold-500 group-hover/item:bg-gold-500 group-hover/item:text-white transition-colors">
                          <Video className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-navy-950/60 font-medium whitespace-nowrap">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right: CTA */}
                  <div className="p-8 lg:p-10 2xl:p-12 lg:ml-auto lg:shrink-0">
                    <MagneticButton variant="primary" size="lg" className="w-full lg:w-auto px-10 md:px-12 2xl:px-16 py-6 md:py-8 text-sm md:text-base font-bold uppercase tracking-[0.2em] shadow-xl shadow-gold-500/10 transition-all">
                      <Link href={foundationalCourse.ctaLink || "#"} className="flex items-center justify-center gap-4 whitespace-nowrap">
                        {foundationalCourse.ctaText || "Enroll Today"} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </MagneticButton>
                  </div>

                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-64 h-full bg-gold-500/5 -skew-x-12 translate-x-32 pointer-events-none hidden lg:block" />
                </div>
              </div>
            </div>

            {/* Course Module Header */}
            {foundationModulesArr.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-6 mb-12">
                   <div className="h-px bg-navy-100 grow" />
                   <span className="text-xs font-mono uppercase tracking-[0.4em] text-navy-950/20 font-bold">Course Modules</span>
                   <div className="h-px bg-navy-100 grow" />
                </div>
                <CurriculumRoadmap modules={foundationModulesArr} type="Foundational" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Faculty Section */}
      {faculty.length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-t border-navy-100/50">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              subtitle="Expert Network" 
              title="Faculty"
              description=""
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {faculty.filter(f => f.courseTypes?.includes('foundational')).map((member, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-3/4 rounded-4xl overflow-hidden border border-navy-100 mb-6 transition-all duration-500 group-hover:shadow-2xl">
                    <Image src={member.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"} alt={member.name} fill className="object-cover md:grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                  <h4 className="text-xl font-medium text-navy-950 mb-1">{member.name}</h4>
                  <p className="text-sm font-mono uppercase tracking-widest text-gold-500 font-bold">{member.role}</p>
                </div>
              ))}
              {faculty.filter(f => f.courseTypes?.includes('foundational')).length < 4 && (
                <div className="flex flex-col items-center justify-center p-8 rounded-4xl border-2 border-dashed border-navy-100 bg-slate-50/50">
                  <p className="text-navy-950/30 font-medium text-center">More Faculty Profiles<br/>Coming Soon</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="w-full h-px bg-navy-100/50" />

      {/* Section: Advanced Curriculum */}
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

            <div className="flex flex-col gap-12 mb-20">
              <div className="space-y-10">
                <div className="flex items-baseline gap-6 border-b border-white/5 pb-8">
                  <p className="text-2xl md:text-4xl text-white font-light tracking-tight">{advancedCourse.title}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block font-bold">Mode</span>
                    <p className="text-lg text-white/70 font-light">{advancedCourse.mode}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block font-bold">Live Session</span>
                    <p className="text-lg text-white/70 font-light">{advancedCourse.liveSession}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block font-bold">Assessment</span>
                    <p className="text-lg text-white/70 font-light">{advancedCourse.assessment}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block font-bold">Certification</span>
                    <p className="text-lg text-white/70 font-light">{advancedCourse.certification}</p>
                  </div>
                </div>
              </div>

              {/* Wide Horizontal Enrollment Banner (Dark) */}
              <div className="relative group w-full">
                <div className="absolute -inset-0.5 bg-linear-to-r from-gold-500/30 via-transparent to-gold-500/10 rounded-4xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center w-full">
                  {/* Left: Pricing */}
                  <div className="p-8 lg:p-12 lg:border-r border-white/5 shrink-0 bg-white/2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shadow-[0_0_10px_rgba(191,154,102,0.8)]" />
                      <span className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 font-bold">{advancedCourse.enrollmentStatus || "Enrollment Open"}</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <p className="text-5xl md:text-6xl font-light text-white tracking-tighter">{advancedCourse.feeAmount}</p>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-gold-400 font-mono tracking-widest leading-none">{advancedCourse.feeCurrency}</p>
                        <p className="text-xs font-mono text-white/20 uppercase tracking-widest mt-1">{advancedCourse.feeNote}</p>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Benefits */}
                  <div className="hidden xl:flex flex-1 px-8 2xl:px-12 gap-6 2xl:gap-12 items-center overflow-hidden">
                    {(advancedCourse.benefits || []).slice(0, 3).map((benefit: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 group/item shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold-400 group-hover/item:bg-gold-500 group-hover/item:text-navy-950 transition-colors">
                          <Video className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 font-medium whitespace-nowrap">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right: CTA */}
                  <div className="p-8 lg:p-10 2xl:p-12 lg:ml-auto lg:shrink-0">
                    <MagneticButton variant="primary" size="lg" className="w-full lg:w-auto px-10 md:px-12 2xl:px-16 py-6 md:py-8 text-sm md:text-base font-bold uppercase tracking-[0.2em] shadow-xl shadow-white/5 transition-all">
                      <Link href={advancedCourse.ctaLink || "#"} className="flex items-center justify-center gap-4 whitespace-nowrap">
                        {advancedCourse.ctaText || "Secure Spot"} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>

            {advancedModulesArr.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-6 mb-12">
                   <div className="h-px bg-white/5 grow" />
                   <span className="text-xs font-mono uppercase tracking-[0.4em] text-white/20 font-bold">Advanced Modules</span>
                   <div className="h-px bg-white/5 grow" />
                </div>
                <CurriculumRoadmap modules={advancedModulesArr} type="Advanced" dark />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Faculty Section (After Advanced Course) */}
      {faculty.filter(f => f.courseTypes?.includes('advanced')).length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              subtitle="Expert Network" 
              title="Faculty"
              description=""
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {faculty.filter(f => f.courseTypes?.includes('advanced')).map((member, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-3/4 rounded-4xl overflow-hidden border border-navy-100 mb-6 transition-all duration-500 group-hover:shadow-2xl">
                    <Image src={member.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"} alt={member.name} fill className="object-cover md:grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                  <h4 className="text-xl font-medium text-navy-950 mb-1">{member.name}</h4>
                  <p className="text-sm font-mono uppercase tracking-widest text-gold-500 font-bold">{member.role}</p>
                </div>
              ))}
              <div className="flex flex-col items-center justify-center p-8 rounded-4xl border-2 border-dashed border-navy-100 bg-slate-50/50">
                 <p className="text-navy-950/30 font-medium text-center">Advanced Faculty Profiles<br/>Coming Soon</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section: Final CTA / Inquiry */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <div className="relative overflow-hidden rounded-[3rem] p-8 md:p-16 lg:p-20 bg-navy-950 text-white group shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-gold-500/20 transition-all duration-1000" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-4">
                    <div className="h-px w-12 bg-gold-500" />
                    <span className="text-xs font-mono tracking-[0.4em] uppercase font-bold text-gold-500">Global Academy</span>
                  </div>
                  
                  <h2 className="text-5xl md:text-7xl font-light leading-[0.95] tracking-tighter">
                    Crafting the <span className="text-gold-500 italic font-medium">Future</span> of Resolution.
                  </h2>
                  
                  <p className="text-xl text-white/50 font-light leading-relaxed max-w-lg">
                    Have specific requirements or seeking a long-term partnership? Our team is ready to help you navigate the world of Mediation and ADR.
                  </p>
                </div>
                
                <div className="flex flex-col gap-6">
                  <a 
                    href="mailto:academy@thepact.in" 
                    className="flex items-center justify-between p-8 rounded-4xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-gold-500 hover:border-gold-500 transition-all duration-500 group/btn"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 group-hover/btn:text-navy-950/50 font-bold">Direct Email</span>
                      <p className="text-2xl md:text-3xl font-light text-white group-hover/btn:text-navy-950 transition-colors font-mono tracking-tight">academy@thepact.in</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center group-hover/btn:bg-navy-950 group-hover/btn:text-white transition-all">
                      <Mail className="w-6 h-6 text-gold-500" />
                    </div>
                  </a>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/2 border border-white/5">
                      <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-2">Response Time</p>
                      <p className="text-lg font-light text-white/80">Within 24 Hours</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/2 border border-white/5 flex flex-col justify-between">
                      <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-2">Status</p>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-lg font-light text-white/80">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Section: Strategic Partners / Expert Network */}
      {partners.length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-navy-50/30 border-t border-navy-100/50">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              subtitle="Expert Network" 
              title="Strategic Partners"
              description="Collaborating with leading institutions to deliver world-class mediation advocacy training."
              center
            />
            
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 mt-16">
              {partners.map((partner, i) => (
                <div key={i} className="group relative">
                  <div className="relative h-20 w-48 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name} 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-600 font-bold">{partner.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
