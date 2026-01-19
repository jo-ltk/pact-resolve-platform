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
  },
  {
    name: "Dr. Sriram Panchu",
    role: "Senior Advocate & Mediator",
    quote: "Jonathan Rodrigues has created a masterpiece that demystifies mediation for the Indian context. The workbook format is innovative and engaging.",
    rating: 5,
  },
  {
    name: "Prof. Nadja Alexander",
    role: "Singapore Management University",
    quote: "A groundbreaking contribution to mediation literature in Asia. The interactive elements make learning accessible and practical.",
    rating: 5,
  },
];

export default function MediationSimplifiedPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
        <ResourceSubPageHero
          tag="Resources"
          title={<><span className="text-gold-500">Mediation</span> Simplified</>}
          description="India's first interactive workbook on Negotiation and Mediation. A practical, relatable guide for students, teachers, lawyers, mediators and anyone who wants to understand conflict better."
        >
          <Link
            href="https://www.amazon.in/Mediation-Simplified-Interactive-Rodrigues-OakBridge-ebook/dp/B0C61L5KK5"
            target="_blank"
            className="inline-flex items-center gap-3 bg-gold-500 text-navy-950 px-8 py-4 rounded-full font-medium hover:bg-white transition-all duration-300 shadow-lg group"
          >
            <ShoppingCart className="w-5 h-5" />
            Order A Copy
          </Link>
          <button
            onClick={() => window.location.href = "mailto:official@thepact.in?subject=Book Donation"}
            className="inline-flex items-center gap-3 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all duration-300 group"
          >
            <Heart className="w-5 h-5" />
            Make a Donation
          </button>
        </ResourceSubPageHero>

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
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-navy-50 border border-navy-100 shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80"
                      alt="Mediation Simplified Book"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
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
                  className="group p-6 md:p-8 rounded-2xl bg-navy-50 border border-navy-100 hover:bg-white hover:border-gold-500/30 hover:shadow-xl transition-all duration-500"
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
        <section className="py-20 md:py-32 bg-navy-950 text-white">
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
                  transition={{ delay: i * 0.1 }}
                  className="group p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                >
                  <Quote className="w-10 h-10 text-gold-500/30 mb-6" />
                  <p className="text-white/70 font-light leading-relaxed mb-8 italic">
                    "{review.quote}"
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-gold-500 fill-gold-500" />
                    ))}
                  </div>
                  <div>
                    <p className="text-white font-medium">{review.name}</p>
                    <p className="text-white/50 text-sm">{review.role}</p>
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
