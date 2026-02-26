"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/lib/db/schemas";

const CARDS_PER_PAGE = 3;

export function Supporters() {
  const fallbackTestimonials: Testimonial[] = [
    {
      _id: "fallback-1" as any,
      name: "Managing Partner",
      title: "Managing Partner",
      company: "Global Law Firm",
      quote: "PACT's approach to mediation process design is revolutionary. They handled our multi-jurisdictional dispute with exceptional professionalism.",
      rating: 5,
      image: { url: "/assets/img/testimonials/arbitration-chamber.png", alt: "Arbitration Chamber" },
      profileImage: { url: "", alt: "" },
      order: 1,
      page: "homepage",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "fallback-2" as any,
      name: "General Counsel",
      title: "General Counsel",
      company: "Fortune 500 Enterprise",
      quote: "The Academy training provided by PACT is hands-down the most comprehensive for mediation advocacy I've experienced in the industry.",
      rating: 5,
      image: { url: "/assets/img/testimonials/corporate-boardroom.png", alt: "Corporate Boardroom" },
      profileImage: { url: "", alt: "" },
      order: 2,
      page: "homepage",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "fallback-3" as any,
      name: "Senior Advocate",
      title: "Senior Advocate",
      company: "Supreme Court of India",
      quote: "PACT has redefined how dispute resolution works in India. Their bespoke case management sets them apart from every other mediation platform.",
      rating: 5,
      image: { url: "/assets/img/testimonials/arbitration-chamber.png", alt: "Arbitration Chamber" },
      profileImage: { url: "", alt: "" },
      order: 3,
      page: "homepage",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/content/testimonials?page=homepage");
        const result = await res.json();
        if (result.success && result.data && result.data.length > 0) {
          setTestimonials(result.data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
        setTestimonials(fallbackTestimonials);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const totalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE);
  const hasMultiplePages = totalPages > 1;

  const visible = testimonials.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const prev = useCallback(() => {
    setDirection(-1);
    setPage((p) => Math.max(0, p - 1));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setPage((p) => Math.min(totalPages - 1, p + 1));
  }, [totalPages]);

  /* ── Loading skeleton ── */
  if (isLoading) {
    return (
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500" />
              <div className="h-3 w-32 bg-gold-500/20 rounded animate-pulse" />
              <div className="h-px w-8 bg-gold-500" />
            </div>
            <div className="h-12 w-80 bg-navy-950/10 rounded-xl mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="min-h-[440px] rounded-4xl bg-navy-950/10 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!isLoading && testimonials.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div className="text-center flex-1">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500" />
              <p className="text-gold-500 text-xs uppercase tracking-[0.3em] font-bold">
                Trusted to Deliver
              </p>
              <div className="h-px w-8 bg-gold-500" />
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-navy-950">
              PACT <span className="text-gold-500 italic font-medium">Testimonials</span>
            </h2>
          </div>

          {/* Arrow controls — only shown when there are multiple pages */}
          {hasMultiplePages && (
            <div className="flex items-center gap-3 shrink-0 mb-2">
              <button
                onClick={prev}
                disabled={page === 0}
                aria-label="Previous testimonials"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-navy-950/20 bg-white text-navy-950 shadow-sm transition-all duration-300 hover:border-gold-500 hover:bg-gold-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={next}
                disabled={page === totalPages - 1}
                aria-label="Next testimonials"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-navy-950/20 bg-white text-navy-950 shadow-sm transition-all duration-300 hover:border-gold-500 hover:bg-gold-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>

        {/* Cards grid with slide animation */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            initial={{ opacity: 0, x: direction * 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -48 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {visible.map((t, i) => (
              <motion.div
                key={t._id?.toString() || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group relative flex flex-col min-h-[440px] rounded-4xl bg-navy-950 border border-white/10 overflow-hidden hover:border-gold-500/30 transition-all duration-500 shadow-2xl"
              >
                {/* Card image */}
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                  <Image
                    src={t.image?.url || "/assets/img/testimonials/corporate-boardroom.png"}
                    alt={t.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/20 to-transparent" />

                  {/* Quote icon badge */}
                  <div className="absolute top-4 left-4">
                    <div className="w-9 h-9 rounded-xl bg-gold-500 flex items-center justify-center shadow-2xl">
                      <Quote className="w-4 h-4 text-navy-950" />
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-7 flex-1 flex flex-col justify-between text-white">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-5">
                      {[...Array(t.rating || 5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 text-gold-500 fill-gold-500" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-white/80 font-light leading-relaxed text-base line-clamp-5">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author row */}
                  <div className="mt-6 pt-5 border-t border-white/5 flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-white font-semibold tracking-tight truncate">{t.name}</p>
                      <p className="text-gold-500/70 text-xs uppercase tracking-[0.2em] mt-1 truncate">
                        {t.title}{t.company ? `, ${t.company}` : ""}
                      </p>
                    </div>

                    {/* Profile photo */}
                    <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden border-2 border-gold-500/60 bg-white/5 shadow-2xl">
                      {t.profileImage?.url ? (
                        <Image
                          src={t.profileImage.url}
                          alt={`${t.name} profile photo`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-white/60">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Page dots */}
        {hasMultiplePages && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
                aria-label={`Page ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-8 bg-gold-500"
                    : "w-1.5 bg-navy-950/20 hover:bg-navy-950/40"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
