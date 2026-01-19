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
  Calendar,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { ResourceSubPageHero } from "@/components/sections/resources/resource-subpage-hero";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

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

const season1Episodes = [
  {
    number: 1,
    title: "Are Mediators Actually Mediating?",
    guests: "Bill Marsh & Chitra Narayan",
    theme: "Mediation Practice",
  },
  {
    number: 2,
    title: "Are Mediators Actually Mediating?",
    guests: "Nadja Alexander & JP Sengh",
    theme: "Mediation Practice",
  },
  {
    number: 3,
    title: "Are Lawyers Relevant in Mediation?",
    guests: "Ekta Bahl & Geoff Sharp",
    theme: "Lawyer's Role",
  },
  {
    number: 4,
    title: "Are Lawyers Relevant in Mediation?",
    guests: "Tat Lim & Raj R. Panchmatia",
    theme: "Lawyer's Role",
  },
  {
    number: 5,
    title: "Building Trust in Private Mediation",
    guests: "Jawad A J & Jonathan Lloyd-Jones",
    theme: "Trust Building",
  },
  {
    number: 6,
    title: "Commercial Mediation Works (Case Study)",
    guests: "Jeff Kichaven & Nisshant Laroia",
    theme: "Case Study",
  },
  {
    number: 7,
    title: "Can you Mediate without Lawyers?",
    guests: "Jonathan Rodrigues & Laila Ollapally",
    theme: "Party Representation",
  },
  {
    number: 8,
    title: "Private Mediation Essentials: Self-determination",
    guests: "Joel Lee & Jonathan Rodrigues",
    theme: "Core Principles",
  },
  {
    number: 9,
    title: "Mediation in India",
    guests: "Attorney General R. Venkataramani & Soni Singh",
    theme: "Indian Context",
  },
  {
    number: 10,
    title: "Mediation Essentials: Confidentiality",
    guests: "Sudhanshu Batra & Jonathan Rodrigues",
    theme: "Core Principles",
  },
];

export default function PodcastPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
        <ResourceSubPageHero
          tag="Resources"
          title={<><span className="text-gold-500">Mission</span> Mediation</>}
          description="A live show where mediators, mediation counsel and various other professionals unpack what actually happens in mediation via real case studies."
        >
          <Link
            href="https://www.linkedin.com/company/the-mission-mediation-podcast-and-conclave/posts/?feedView=all"
            target="_blank"
            className="inline-flex items-center gap-3 bg-[#0077B5] text-white px-6 py-4 rounded-full font-medium hover:bg-[#006399] transition-all duration-300 shadow-lg group"
          >
            <Linkedin className="w-5 h-5" />
            Watch Live on LinkedIn
          </Link>
          <Link
            href="https://www.youtube.com/@MissionMediationbyPACT"
            target="_blank"
            className="inline-flex items-center gap-3 bg-[#FF0000] text-white px-6 py-4 rounded-full font-medium hover:bg-[#CC0000] transition-all duration-300 shadow-lg group"
          >
            <Youtube className="w-5 h-5" />
            Subscribe to YouTube
          </Link>
          <button
            onClick={() => window.location.href = "mailto:official@thepact.in?subject=Join the Production Team"}
            className="inline-flex items-center gap-3 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-full font-medium hover:bg-white/20 transition-all duration-300 group"
          >
            <Mail className="w-5 h-5" />
            Join the Production
          </button>
        </ResourceSubPageHero>

        {/* Host Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeInUp>
                <div className="inline-flex items-center gap-3 mb-6">
                  <Mic className="w-5 h-5 text-gold-500" />
                  <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                    Hosted & Produced
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight mb-6 leading-[1.1]">
                  Jonathan <span className="text-gold-500 italic font-medium">Rodrigues</span>
                </h2>
                
                <p className="text-lg text-navy-950/60 font-light leading-relaxed mb-8">
                  As an IMI Certified Mediator and founder of PACT, Jonathan brings together global mediation experts for candid conversations about what makes mediation actually work in practice.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 rounded-full bg-navy-50 text-navy-950/60 text-xs font-mono uppercase tracking-widest">
                    IMI Certified Mediator
                  </div>
                  <div className="px-4 py-2 rounded-full bg-navy-50 text-navy-950/60 text-xs font-mono uppercase tracking-widest">
                    Author
                  </div>
                  <div className="px-4 py-2 rounded-full bg-navy-50 text-navy-950/60 text-xs font-mono uppercase tracking-widest">
                    Advocate
                  </div>
                </div>
              </FadeInUp>
              
              <FadeInUp delay={0.2}>
                <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                  <div className="absolute inset-4 bg-gold-500/20 rounded-3xl blur-3xl" />
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-navy-50 border border-navy-100 shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80"
                      alt="Jonathan Rodrigues"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
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
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
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
        <section className="py-20 md:py-32 bg-navy-950 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/30 mb-6">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-widest uppercase font-bold">
                  Season 2
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
                Upcoming <span className="text-gold-500 italic font-medium">Episodes</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Episode 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-gold-500/20"
              >
                <div className="relative aspect-square">
                  <Image
                    src="/podcast/season2-ep1.png"
                    alt="The Mediator's Mind: Finding the Joy of Mediation - Jonathan & Sriram"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Episode 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-gold-500/20"
              >
                <div className="relative aspect-square">
                  <Image
                    src="/podcast/season2-ep2.png"
                    alt="The Mediator's Mind: Becoming Relatable to Parties - Jonathan & Gita"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Episode 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-gold-500/20"
              >
                <div className="relative aspect-square">
                  <Image
                    src="/podcast/season2-ep3.png"
                    alt="Negotiation Knights: Disarming Power Dynamics - Jonathan & Charlie"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Past Episodes Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Season 1
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                Past <span className="text-gold-500 italic font-medium">Episodes</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {season1Episodes.map((episode, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.05 }}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-navy-50 border border-navy-100 hover:bg-white hover:border-gold-500/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-950 flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors">
                    <span className="text-gold-500 font-mono font-bold group-hover:text-navy-950">
                      {String(episode.number).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-navy-950/40 bg-navy-100/50 px-2 py-0.5 rounded-full">
                        {episode.theme}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-navy-950 mb-1 group-hover:text-gold-500 transition-colors truncate">
                      {episode.title}
                    </h3>
                    <p className="text-navy-950/60 text-sm font-light truncate">
                      {episode.guests}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors opacity-0 group-hover:opacity-100">
                    <Play className="w-4 h-4 text-navy-950" />
                  </div>
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
                    <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
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
      </FadeIn>
    </main>
  );
}
