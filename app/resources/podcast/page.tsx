"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Mic, 
  Youtube, 
  Linkedin, 
  Mail, 
  Play, 
  MessageCircle, 
  Users, 
  Lightbulb, 
  BookOpen,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { ResourceSubPageHero } from "@/components/sections/resources/resource-subpage-hero";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { type ResourceItem } from "@/lib/db/schemas";

const whySubscribe = [
  {
    icon: MessageCircle,
    title: "Honest Conversations",
    description: "Candid discussions about what really happens behind closed mediation doors",
  },
  {
    icon: Users,
    title: "Expert Speakers",
    description: "Global and Indian mediation luminaries share their wisdom and experience",
  },
  {
    icon: Lightbulb,
    title: "Actionable Takeaways",
    description: "Practical insights you can apply to your next mediation session",
  },
  {
    icon: BookOpen,
    title: "Real Case Studies",
    description: "Learn from actual mediations, challenges faced, and solutions found",
  },
];



export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const res = await fetch("/api/content/resources?all=false&type=podcast");
        const data = await res.json();
        if (data.success) {
          setEpisodes(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch podcast episodes", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEpisodes();
  }, []);

  const upcomingEpisodes = useMemo(
    () => episodes
      .filter((e) => e.isFeatured && e.category !== "hero-banner")
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .slice(0, 3),
    [episodes]
  );

  const heroBanner = useMemo(
    () => episodes.find((e) => e.category === "hero-banner" && !!e.image),
    [episodes]
  );

  const pastEpisodes = useMemo(() => {
    return episodes
      .filter((e) => e.category !== "hero-banner" && !upcomingEpisodes.some(u => (u._id as any).toString() === (e._id as any).toString()))
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [episodes, upcomingEpisodes]);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      
      <section className="relative w-full h-[90vh] flex items-end overflow-hidden bg-navy-950 dark">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBanner?.image || "/assets/img/podcast-hero.png"}
            alt="Mission Mediation Podcast"
            fill
            className="object-cover object-top opacity-70 transition-transform duration-[10s] hover:scale-110 origin-top"
            priority
          />
          
          {/* Typographic Accent */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[30vw] font-black tracking-tighter text-white">MISSION</span>
          </div>

          {/* Gradients */}
          <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-navy-950/60 to-transparent" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 lg:pb-32">
          <FadeInUp>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 backdrop-blur-md mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                </span>
                <span className="text-gold-500  text-xs tracking-[0.4em] uppercase font-bold">
                  Streaming Now
                </span>
              </div>
              
              <h1 className="sr-only">Mission Mediation Podcast</h1>
              <p className="text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1] mb-12 drop-shadow-2xl">
                Unpacking what <span className="text-gold-500 italic font-medium">actually</span> happens in mediation
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="https://www.linkedin.com/company/the-mission-mediation-podcast-and-conclave/posts/?feedView=all"
                  target="_blank"
                  className="group relative flex items-center gap-4 bg-gold-500 text-navy-950 px-10 py-5 rounded-full font-bold transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(191,154,102,0.4)]"
                >
                  <Linkedin className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                  <span className="text-lg">Watch Live</span>
                </Link>
                
                <Link
                  href="https://www.youtube.com/@MissionMediationbyPACT"
                  target="_blank"
                  className="group relative flex items-center gap-4 bg-white/10 text-white border border-white/10 backdrop-blur-md px-10 py-5 rounded-full font-medium transition-all duration-300 hover:bg-white/20 hover:-translate-y-2"
                >
                  <Youtube className="w-6 h-6 transition-transform group-hover:scale-110" />
                  <span className="text-lg">YouTube</span>
                </Link>

                <button
                  onClick={() => window.location.href = "mailto:official@thepact.in?subject=Join the Production Team"}
                  className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md px-10 py-5 rounded-full font-medium transition-all duration-300 hover:-translate-y-2"
                >
                  <Mail className="w-6 h-6 text-gold-500 transition-colors group-hover:text-gold-400 group-hover:scale-110" />
                  <span className="text-lg">Join Team</span>
                </button>
              </div>

            </div>
          </FadeInUp>
        </div>

        {/* Cinematic Elements */}
        <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-4">
          <div className="w-12 h-px bg-white/20" />
          <span className="text-white/20  text-[9px] tracking-widest uppercase">New Episode Every Week</span>
        </div>
      </section>





        {/* Host Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeInUp>
                <div className="inline-flex items-center gap-3 mb-6">
                  <Mic className="w-5 h-5 text-gold-500" />
                  <span className="text-gold-500  text-xs tracking-[0.3em] uppercase font-bold">
                    Hosted & Produced
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight mb-6 leading-[1.1]">
                  Jonathan <span className="text-gold-500 italic font-medium">Rodrigues</span>
                </h2>
                
                <p className="text-lg text-navy-950/60 font-light leading-relaxed mb-8">
                  As an IMI Qualified Mediator and founder of PACT, Jonathan brings together global mediation practitioners for candid conversations about what makes mediation work
                </p>
              </FadeInUp>
              
              <FadeInUp delay={0.2}>
                <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                  <div className="absolute inset-4 bg-gold-500/20 rounded-3xl blur-3xl" />
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-navy-50 border border-navy-100 shadow-2xl">
                  <Image
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
                      alt="Jonathan Rodrigues"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center animate-pulse">
                          <Mic className="w-6 h-6 text-navy-950" />
                        </div>
                        <span className="text-white font-medium">Live on air</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Why Subscribe Section */}
        <section className="py-20 md:py-32 bg-navy-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500  text-xs tracking-[0.3em] uppercase font-bold">
                  Benefits
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                Why <span className="text-gold-500 italic font-medium">Subscribe?</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whySubscribe.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group p-8 rounded-3xl bg-white border border-navy-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-500 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-navy-950 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-500 transition-colors">
                    <item.icon className="w-8 h-8 text-gold-500 group-hover:text-navy-950" />
                  </div>
                  <h3 className="text-xl font-medium text-navy-950 mb-3 group-hover:text-gold-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-navy-950/60 font-light text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Episodes Section */}
        <section className="py-20 md:py-32 bg-navy-950 text-white dark">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/30 mb-6">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span className="text-gold-500  text-xs tracking-widest uppercase font-bold">
                  Season 2
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
                Upcoming <span className="text-gold-500 italic font-medium">Episodes</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="md:col-span-3 flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold-500 border-t-transparent" />
                </div>
              ) : upcomingEpisodes.length === 0 ? (
                <p className="md:col-span-3 text-center text-white/60">No upcoming episodes added yet.</p>
              ) : (
                upcomingEpisodes.map((episode, i) => (
                  <motion.div
                    key={(episode._id as any)?.toString?.() || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-gold-500/20"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={episode.image || `/podcast/season2-ep${(i % 3) + 1}.png`}
                        alt={episode.title}
                        fill
                        unoptimized={true}
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Past Episodes Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500  text-xs tracking-[0.3em] uppercase font-bold">
                  All Seasons
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                Past <span className="text-gold-500 italic font-medium">Episodes</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {pastEpisodes.map((episode, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.05, duration: 0.6 }}
                  className={cn(
                    i === pastEpisodes.length - 1 && "lg:col-start-2"
                  )}
                >
                  <Link
                    href={episode.url || "#"}
                    target="_blank"
                    className="group flex flex-col h-full rounded-4xl bg-navy-50 border border-navy-100 overflow-hidden hover:border-gold-500/30 hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Image Area - 100% Visible */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={episode.image || "/assets/img/podcast-thumb-dummy.png"}
                        alt={episode.title}
                        fill
                        unoptimized={true}
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors duration-500" />
                      
                      {/* Floating Identity */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <div className="px-3 py-1 rounded-full bg-navy-950/90 text-xs  font-bold text-gold-500 border border-gold-500/20 backdrop-blur-md">
                          EP{String((episode.order || i + 1)).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <Play className="w-6 h-6 fill-navy-950 ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Content Area - Clean and Stable */}
                    <div className="p-6 md:p-8 flex flex-col flex-1 bg-white">
                      <div className="mb-4">
                        <span className="text-xs  uppercase tracking-[0.2em] text-gold-600 font-bold">
                          {episode.category || "Podcast"}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-medium text-navy-950 mb-3 group-hover:text-gold-500 transition-colors leading-snug">
                        {episode.title}
                      </h3>
                      
                      <div className="mt-auto pt-4 border-t border-navy-100 flex items-center justify-between">
                        <p className="text-navy-950/50 text-xs font-light truncate max-w-[80%]">
                          {episode.subtitle || episode.author || "Mission Mediation"}
                        </p>
                        <ArrowUpRight className="w-4 h-4 text-navy-950/20 group-hover:text-gold-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Host a Panel Section */}
        <section className="py-20 md:py-32 bg-navy-50">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp>
              <div className="relative p-8 md:p-12 rounded-3xl bg-navy-950 text-white text-center overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 mb-6 justify-center">
                    <div className="h-px w-8 bg-gold-500" />
                    <span className="text-gold-500  text-xs tracking-[0.3em] uppercase font-bold">
                      Collaborate
                    </span>
                    <div className="h-px w-8 bg-gold-500" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-light mb-6">
                    Host a Mission Mediation <span className="text-gold-500 italic font-medium">Panel</span>
                  </h2>
                  
                  <p className="text-white/60 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
                    Collaborate with PACT to co-host a Mission Mediation Panel at your organisation, campus or community. These topical / regional episodes will be recorded and broadcast on YouTube.
                  </p>
                  
                  <a 
                    href="mailto:official@thepact.in?subject=Host a Mission Mediation Panel"
                    className="inline-flex items-center gap-3 bg-gold-500 text-navy-950 px-8 py-4 rounded-full font-medium hover:bg-white transition-all duration-300 group"
                  >
                    Get in Touch
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>
        
        <Footer />
    </main>

  );
}
