"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, BookOpen, Pen, Users, GraduationCap, Scale, ArrowRight, Quote, Star, CheckCircle } from "lucide-react";
import { ResourceSubPageHero } from "@/components/sections/resources/resource-subpage-hero";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const FALLBACK_FEATURES = [
  { text: "Understand mediation in a simple and structured way." },
  { text: "Learn negotiation and conflict-handling through real-life situations." },
  { text: "Helpful for law students, educators, practitioners, and first-time learners." },
  { text: "Workbook style: you don't just read, you practise." },
];

const FALLBACK_CHAPTERS = [
  { title: "Negotiation: The Antecedent to Mediation" },
  { title: "Mediation: A Facilitated Negotiation" },
  { title: "Communication Tools and Problem-Solving Techniques" },
  { title: "Lawyers – Gatekeepers to successful Negotiation" },
  { title: "Mediator's Code of Ethics" },
  { title: "Mediation Movements: Historical Milestones and Current Trends" },
];

const STATIC_REVIEWS = [
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
  const [reviews, setReviews] = useState<any[]>(STATIC_REVIEWS);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>(FALLBACK_FEATURES);
  const [chapters, setChapters] = useState<any[]>(FALLBACK_CHAPTERS);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Reviews
        const resReviews = await fetch("/api/content/testimonials?page=simplified");
        const resultReviews = await resReviews.json();
        if (resultReviews.success && resultReviews.data && resultReviews.data.length > 0) {
          const mappedReviews = resultReviews.data.map((item: any) => ({
            name: item.name,
            role: item.title,
            quote: item.quote,
            rating: item.rating,
            image: item.profileImage?.url || "/assets/img/testimonials/default-avatar.png",
          }));
          setReviews(mappedReviews);
        }

        // Fetch Gallery
        const resGallery = await fetch("/api/content/workbook-gallery");
        const resultGallery = await resGallery.json();
        if (resultGallery.success && resultGallery.data && resultGallery.data.length > 0) {
          setGalleryImages(resultGallery.data);
        }

        // Fetch Features
        const resFeatures = await fetch("/api/content/workbook-features");
        const resultFeatures = await resFeatures.json();
        if (resultFeatures.success && resultFeatures.data && resultFeatures.data.length > 0) {
          setFeatures(resultFeatures.data);
        }

        // Fetch Chapters
        const resChapters = await fetch("/api/content/workbook-chapters");
        const resultChapters = await resChapters.json();
        if (resultChapters.success && resultChapters.data && resultChapters.data.length > 0) {
          setChapters(resultChapters.data);
        }
      } catch (error) {
        console.error("Error fetching workbook data:", error);
      }
    }
    fetchData();
  }, []);

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
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[25vw] font-black tracking-tighter text-white uppercase">SIMPLIFIED</span>
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-navy-950/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 lg:pb-32">
          <FadeInUp>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 backdrop-blur-md mb-8 text-gold-500 text-xs tracking-[0.4em] uppercase font-bold">
                Now Available
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
      </section>

        {/* Feature Points Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeInUp>
                <div className="inline-flex items-center gap-3 mb-6 text-gold-500 text-xs tracking-[0.3em] uppercase font-bold">
                  <BookOpen className="w-5 h-5" />
                  India's Only Workbook on Mediation
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
                        <CheckCircle className="w-4 h-4 text-gold-500 group-hover:text-white" />
                      </div>
                      <p className="text-lg text-navy-950/70 font-light leading-relaxed">{feature.text}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <div className="relative">
                  <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-navy-50 border border-navy-100 shadow-2xl">
                    <Image
                      src="https://m.media-amazon.com/images/I/71ZUxy9v9pL._SY466_.jpg"
                      alt="Mediation Simplified Book"
                      fill
                      className="object-contain"
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
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center shadow-xl">
                    <div className="text-center text-navy-950 font-bold">
                      <span className="text-2xl block">1st</span>
                      <span className="text-[10px] uppercase tracking-wider opacity-60">In India</span>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Contents Grid Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center text-gold-500 text-xs tracking-[0.3em] uppercase font-bold">
                <div className="h-px w-8 bg-gold-500" />
                Contents
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
                  className="group p-8 rounded-2xl bg-navy-50 border border-navy-100 hover:bg-white hover:border-gold-500/30 hover:shadow-xl transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl text-gold-500/30 font-bold group-hover:text-gold-500 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg md:text-xl font-light text-navy-950 group-hover:text-gold-500 transition-colors leading-snug">
                      {chapter.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 md:py-32 bg-navy-50/30 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center text-gold-500 text-xs tracking-[0.3em] uppercase font-bold">
                <div className="h-px w-8 bg-gold-500" />
                Gallery
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                Workbook <span className="text-gold-500 italic font-medium">in Action</span>
              </h2>
            </FadeInUp>
            <div className="relative">
              <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 4000 })]} className="w-full">
                <CarouselContent className="-ml-4 md:-ml-6">
                  {(galleryImages.length > 0 ? galleryImages : [1, 2, 3, 4, 5, 6]).map((item, index) => (
                    <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                      <div className="flex flex-col h-full group">
                        <div className="relative aspect-3/2 rounded-3xl overflow-hidden shadow-xl border border-navy-100 bg-navy-100">
                          <Image
                            src={item.image?.url || (index % 2 === 0 ? "/assets/img/testimonials/corporate-boardroom.png" : "/assets/img/testimonials/arbitration-chamber.png")}
                            alt={item.title || "Action"}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/0 transition-colors duration-500" />
                        </div>
                        {item.title || item.caption ? (
                          <div className="mt-6 px-1">
                             <p className="text-navy-950 font-bold text-sm tracking-tight mb-1">{item.title}</p>
                             <p className="text-navy-950/60 text-[13px] italic">{item.caption}</p>
                          </div>
                        ) : null}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-12 md:mt-16">
                  <CarouselPrevious className="static translate-y-0 w-12 h-12 bg-white border-navy-100 hover:bg-gold-500" />
                  <CarouselNext className="static translate-y-0 w-12 h-12 bg-white border-navy-100 hover:bg-gold-500" />
                </div>
              </Carousel>
            </div>
          </div>
        </section>

        {/* Supporters Section */}
        <section className="py-20 md:py-32 bg-navy-950 text-white dark">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16 text-gold-500  text-xs tracking-[0.3em] uppercase font-bold">
               What People <span className="text-white italic font-light lowercase">Say</span>
            </FadeInUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex flex-col min-h-[500px] rounded-4xl bg-navy-900 border border-white/10 p-8 hover:border-gold-500/30 transition-all duration-500"
                >
                  <div className="relative h-48 w-full rounded-3xl overflow-hidden mb-8">
                    <Image src={review.image} alt={review.name} fill className="object-cover" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center"><Quote className="w-5 h-5 text-navy-950" /></div>
                  </div>
                  <div className="flex-1">
                     <div className="flex gap-1 mb-4">{[...Array(review.rating)].map((_, j) => (<Star key={j} className="w-3 h-3 text-gold-500 fill-gold-500" />))}</div>
                     <p className="text-white/90 font-light leading-relaxed text-lg italic">"{review.quote}"</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-white font-bold">{review.name}</p>
                    <p className="text-gold-500/50 text-[10px] uppercase tracking-widest mt-1">{review.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white text-center px-6">
          <FadeInUp>
            <h2 className="text-3xl md:text-5xl font-light text-navy-950 mb-10 max-w-3xl mx-auto leading-tight">Ready to <span className="text-gold-500 italic">transform</span> how you understand conflict?</h2>
            <Link href="https://www.amazon.in/Mediation-Simplified-Interactive-Rodrigues-OakBridge-ebook/dp/B0C61L5KK5" target="_blank" className="inline-flex items-center gap-3 bg-navy-950 text-white px-10 py-5 rounded-full font-bold hover:bg-gold-500 hover:text-navy-950 transition-all shadow-xl group">
               Order on Amazon <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInUp>
        </section>
        
        <Footer />
      </FadeIn>
    </main>
  );
}
