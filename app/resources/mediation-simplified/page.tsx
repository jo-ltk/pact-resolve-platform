"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, BookOpen, Pen, Users, GraduationCap, Scale, ArrowRight, Quote, Star, CheckCircle } from "lucide-react";
import { ResourceSubPageHero } from "@/components/sections/resources/resource-subpage-hero";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

const features = [
  { icon: CheckCircle, text: "Understand mediation in a simple and structured way." },
  { icon: CheckCircle, text: "Learn negotiation and conflict-handling through real-life situations." },
  { icon: CheckCircle, text: "Helpful for law students, educators, practitioners, and first-time learners." },
  { icon: CheckCircle, text: "Workbook style: you don't just read, you practise." },
];

const chapters = [
  "Negotiation: The Antecedent to Mediation",
  "Mediation: A Facilitated Negotiation",
  "Communication Tools and Problem-Solving Techniques",
  "Lawyers – Gatekeepers to successful Negotiation",
  "Mediator's Code of Ethics",
  "Mediation Movements: Historical Milestones and Current Trends",
  "Mediation and Technology",
];

const reviews = [
  {
    name: "Justice Kurian Joseph",
    role: "Former Judge, Supreme Court of India",
    quote: "An exceptional resource that bridges theory and practice in mediation. Highly recommended for anyone seeking to understand the nuances of conflict resolution.",
    rating: 5,
    image: "/assets/img/testimonials/justice-kurian.png",
  },
  {
    name: "Dr. Sriram Panchu",
    role: "Senior Advocate & Mediator",
    quote: "Jonathan Rodrigues has created a masterpiece that demystifies mediation for the Indian context. The workbook format is innovative and engaging.",
    rating: 5,
    image: "/assets/img/testimonials/sriram-panchu.png",
  },
  {
    name: "Prof. Nadja Alexander",
    role: "Singapore Management University",
    quote: "A groundbreaking contribution to mediation literature in Asia. The interactive elements make learning accessible and practical.",
    rating: 5,
    image: "/assets/img/testimonials/nadja-alexander.png",
  },
];

export default function MediationSimplifiedPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
      <section className="relative w-full h-[90vh] flex items-end overflow-hidden bg-navy-950 dark">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/img/mediation-simplified-hero.png"
            alt="Mediation Simplified - Interactive Workbook"
            fill
            className="object-cover object-center opacity-60 transition-transform duration-[10s] hover:scale-105"
            priority
          />
          
          {/* Typographic Accent */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[25vw] font-black tracking-tighter text-white uppercase">SIMPLIFIED</span>
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
                <span className="text-gold-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
                  Now Available
                </span>
              </div>
              
              <h1 className="sr-only">Mediation Simplified: An Interactive Workbook</h1>
              <p className="text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1] mb-12 drop-shadow-2xl">
                India's first <span className="text-gold-500 italic font-medium">interactive</span> workbook on Negotiation and Mediation.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="https://www.amazon.in/Mediation-Simplified-Interactive-Rodrigues-OakBridge-ebook/dp/B0C61L5KK5"
                  target="_blank"
                  className="group relative flex items-center gap-4 bg-gold-500 text-navy-950 px-10 py-5 rounded-full font-bold transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(191,154,102,0.4)]"
                >
                  <ShoppingCart className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                  <span className="text-lg">Order A Copy</span>
                </Link>
                
                <button
                  onClick={() => window.location.href = "mailto:official@thepact.in?subject=Book Donation"}
                  className="group flex items-center gap-4 bg-white/10 text-white border border-white/10 backdrop-blur-md px-10 py-5 rounded-full font-medium transition-all duration-300 hover:bg-white/20 hover:-translate-y-2"
                >
                  <Heart className="w-6 h-6 text-gold-500 transition-colors group-hover:text-gold-400 group-hover:scale-110" />
                  <span className="text-lg">Make a Donation</span>
                </button>
              </div>
            </div>
          </FadeInUp>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-4">
          <div className="w-12 h-px bg-white/20" />
          <span className="text-white/20 font-mono text-[9px] tracking-widest uppercase">The PACT Resources</span>
        </div>
      </section>

        {/* India's Only Workbook Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeInUp>
                <div className="inline-flex items-center gap-3 mb-6">
                  <BookOpen className="w-5 h-5 text-gold-500" />
                  <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                    India's Only Workbook on Mediation
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight mb-8 leading-[1.1]">
                  Learn by <span className="text-gold-500 italic font-medium">Doing</span>
                </h2>
                
                <div className="space-y-6">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors">
                        <feature.icon className="w-4 h-4 text-gold-500 group-hover:text-white" />
                      </div>
                      <p className="text-lg text-navy-950/70 font-light leading-relaxed">{feature.text}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeInUp>
              
              {/* Book Images */}
              <FadeInUp delay={0.2}>
                <div className="relative">
                  <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-navy-50 border border-navy-100 shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80"
                      alt="Mediation Simplified Book"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gold-500 flex items-center justify-center">
                          <Pen className="w-6 h-6 text-navy-950" />
                        </div>
                        <div>
                          <p className="text-navy-950 font-medium">Interactive Workbook</p>
                          <p className="text-navy-950/60 text-sm">Practice real scenarios</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center shadow-xl">
                    <div className="text-center">
                      <span className="text-navy-950 font-bold text-2xl block">1st</span>
                      <span className="text-navy-950/70 text-[10px] uppercase tracking-wider">In India</span>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Donation Note */}
        <section className="py-8 bg-navy-50 border-y border-navy-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <Heart className="w-6 h-6 text-gold-500" />
              <p className="text-navy-950/70 font-light">
                <span className="text-navy-950 font-medium">Donate a copy to a library:</span> You can sponsor copies for law schools and public libraries. 
                Write to us at <a href="mailto:official@thepact.in" className="text-gold-500 underline hover:text-navy-950 transition-colors">official@thepact.in</a>
              </p>
            </div>
          </div>
        </section>

        {/* What Will You Find Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Contents
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                What Will You <span className="text-gold-500 italic font-medium">Find?</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapters.map((chapter, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className={cn(
                    "group p-6 md:p-8 rounded-2xl bg-navy-50 border border-navy-100 hover:bg-white hover:border-gold-500/30 hover:shadow-xl transition-all duration-500",
                    i === chapters.length - 1 && "md:max-lg:col-span-2 lg:col-start-2"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-3xl text-gold-500/30 font-bold group-hover:text-gold-500 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg md:text-xl font-light text-navy-950 group-hover:text-gold-500 transition-colors leading-snug">
                      {chapter}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 md:py-32 bg-navy-950 text-white dark">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Testimonials
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
                What People <span className="text-gold-500 italic font-medium">Say</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group relative flex flex-col min-h-[520px] rounded-4xl bg-navy-900 border border-white/10 overflow-hidden hover:border-gold-500/30 transition-all duration-500"
                >
                  {/* High Visibility Place Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-transparent to-transparent" />
                    
                    {/* Floating Quote Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center shadow-2xl">
                        <Quote className="w-5 h-5 text-navy-950" />
                      </div>
                    </div>
                  </div>

                  {/* Content Area - Fixed structure to prevent jitter */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(review.rating)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                        ))}
                      </div>

                      <p className="text-white/90 font-light leading-relaxed italic text-lg lg:text-xl">
                        "{review.quote}"
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                      <p className="text-white font-semibold tracking-tight text-lg">{review.name}</p>
                      <p className="text-gold-500/70 text-xs font-mono uppercase tracking-[0.2em] mt-1.5">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
            <FadeInUp>
              <h2 className="text-3xl md:text-4xl font-light text-navy-950 mb-6">
                Ready to <span className="text-gold-500 italic font-medium">transform</span> how you understand conflict?
              </h2>
              <p className="text-navy-950/60 text-lg mb-10 max-w-2xl mx-auto">
                Get your copy of Mediation Simplified today and start your journey towards becoming a more effective negotiator and mediator.
              </p>
              <Link
                href="https://www.amazon.in/Mediation-Simplified-Interactive-Rodrigues-OakBridge-ebook/dp/B0C61L5KK5"
                target="_blank"
                className="inline-flex items-center gap-3 bg-navy-950 text-white px-10 py-5 rounded-full font-medium hover:bg-gold-500 hover:text-navy-950 transition-all duration-300 shadow-xl group"
              >
                Order on Amazon
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeInUp>
          </div>
        </section>
        
        <Footer />
      </FadeIn>
    </main>
  );
}
