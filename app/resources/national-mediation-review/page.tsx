"use client";

import { motion } from "framer-motion";
import { BookOpen, Search, Lightbulb, GraduationCap, Scale, Building2, Users, Mail, ArrowRight, Clock, Sparkles } from "lucide-react";
import { ResourceSubPageHero } from "@/components/sections/resources/resource-subpage-hero";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: BookOpen,
    title: "Contemporary Themes",
    description: "Explains what's changing in mediation today — statutory reforms, practitioner insights and client expectations",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: Search,
    title: "In-depth Research",
    description: "Encourages empirical research surveys, qualitative study interviews and sharp academic writing on mediation",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Lightbulb,
    title: "Thought-Leadership",
    description: "Explores trending best practices, innovative techniques and professional ethics that require delicate deliberation",
    color: "from-amber-500/20 to-orange-500/20",
  },
];

const audiences = [
  {
    icon: GraduationCap,
    title: "Researchers & Students",
    description: "Law students and researchers exploring mediation in India",
  },
  {
    icon: Scale,
    title: "Practitioners",
    description: "Mediators, lawyers, and conflict professionals",
  },
  {
    icon: Users,
    title: "Educators",
    description: "Academicians and trainers teaching mediation",
  },
  {
    icon: Building2,
    title: "Policy Makers",
    description: "Policy and institution stakeholders shaping dispute resolution systems",
  },
];

const upcomingDetails = [
  { label: "Inaugural Edition Theme", value: "Coming Soon" },
  { label: "Editors", value: "Coming Soon" },
  { label: "Institutional Partners", value: "Coming Soon" },
];

export default function NationalMediationReviewPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
        <ResourceSubPageHero
          tag="Resources"
          title={<><span className="text-gold-500">National Mediation</span> Review</>}
          description="Contemporary Trends and Themes on Mediation Practice & Profession in India"
        />

        {/* Introduction Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto text-center">
              <FadeInUp>
                <p className="text-xl md:text-2xl lg:text-3xl font-light text-navy-950/80 leading-relaxed tracking-tight">
                  The National Mediation Review celebrates <span className="text-gold-500 font-medium">innovation</span>, <span className="text-gold-500 font-medium">research</span> and <span className="text-gold-500 font-medium">fresh thinking</span> in the mediation ecosystem. It is curated to fuel conversations and debates on complex topics that matter to the growth of mediation.
                </p>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Putting Practice into Theory Section */}
        <section className="py-20 md:py-32 bg-navy-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Our Focus
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                Putting Practice into <span className="text-gold-500 italic font-medium">Theory</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative h-full"
                >
                  <div className="h-full p-8 md:p-10 rounded-3xl bg-white border border-navy-100 hover:border-gold-500/30 hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                    {/* Gradient overlay on hover */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", pillar.color)} />
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-navy-950 flex items-center justify-center mb-8 group-hover:bg-gold-500 transition-colors shadow-lg">
                        <pillar.icon className="w-8 h-8 text-gold-500 group-hover:text-navy-950" />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-light text-navy-950 mb-4 group-hover:text-gold-500 transition-colors">
                        {pillar.title}
                      </h3>
                      
                      <p className="text-navy-950/60 font-light leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Is This For Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Audience
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                Who Is This <span className="text-gold-500 italic font-medium">For?</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {audiences.map((audience, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-start gap-6 p-6 md:p-8 rounded-2xl bg-navy-50 border border-navy-100 hover:bg-white hover:border-gold-500/30 hover:shadow-xl transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-navy-100 flex items-center justify-center shrink-0 group-hover:bg-gold-500 group-hover:border-gold-500 transition-colors">
                    <audience.icon className="w-6 h-6 text-navy-950 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-navy-950 mb-2 group-hover:text-gold-500 transition-colors">
                      {audience.title}
                    </h3>
                    <p className="text-navy-950/60 font-light">
                      {audience.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section className="py-20 md:py-32 bg-navy-950 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
              <FadeInUp className="text-center mb-16">
                <div className="inline-flex items-center gap-3 mb-6 justify-center">
                  <div className="h-px w-8 bg-gold-500" />
                  <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                    Contribute
                  </span>
                  <div className="h-px w-8 bg-gold-500" />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-8">
                  Get <span className="text-gold-500 italic font-medium">Involved</span>
                </h2>
                <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto">
                  The National Mediation Review aims to generate awareness, challenge traditional stereotypes and outdated theories, and promote empirical research in mediation and conflict resolution in India.
                </p>
              </FadeInUp>
              
              <FadeInUp delay={0.2} className="text-center">
                <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10">
                  <Mail className="w-8 h-8 text-gold-500" />
                  <div className="text-center sm:text-left">
                    <p className="text-white/60 text-sm mb-1">Write to us for details on how to get involved</p>
                    <a 
                      href="mailto:thepactnmr@gmail.com" 
                      className="text-gold-500 text-xl font-medium hover:text-white transition-colors"
                    >
                      thepactnmr@gmail.com
                    </a>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Stay Tuned Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-widest uppercase font-bold">
                  Coming Soon
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                Stay <span className="text-gold-500 italic font-medium">Tuned</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {upcomingDetails.map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 md:p-8 rounded-2xl bg-navy-50 border border-navy-100"
                >
                  <p className="text-navy-950/40 font-mono text-xs uppercase tracking-widest mb-2">
                    {detail.label}
                  </p>
                  <p className="text-navy-950 text-xl font-light">
                    {detail.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <Footer />
      </FadeIn>
    </main>
  );
}
