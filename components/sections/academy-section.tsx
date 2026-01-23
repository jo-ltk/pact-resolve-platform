"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function AcademySection() {
  const courses = [
    {
      title: "Mediation",
      subtitle: "Advocacy & Certification",
      description: "Comprehensive training in mediation advocacy and neutral facilitation, bridging the gap between theory and practice.",
      href: "/academy/mediation"
    },
    {
      title: "Arbitration",
      subtitle: "Procedural Mastery",
      description: "In-depth courses on arbitration lifecycle, rules, and advocacy for both domestic and international forums.",
      href: "/academy/arbitration"
    },
    {
      title: "Negotiation",
      subtitle: "Strategic Diplomacy",
      description: "Master the psychology and strategy of successful deal-making and conflict resolution in high-stakes environments.",
      href: "/academy/negotiation"
    },
  ]

  return (
    <section id="academy" className="flex w-full items-center px-6 py-24 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 md:mb-20">
          <h2 className="mb-4 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Academy <span className="text-gold-500 italic font-medium">Pillars</span>
          </h2>
          <p className="font-mono text-sm text-foreground/40 md:text-base tracking-[0.2em] uppercase">/ Specialized Professional Training</p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {courses.map((course, i) => (
            <Link key={i} href={course.href} className="group flex flex-col gap-6">
              <div className="h-px w-full bg-foreground/10 transition-all duration-700 group-hover:bg-gold-500 group-hover:w-full" />
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-foreground/40">0{i + 1}</span>
                  <ArrowRight className="w-5 h-5 text-foreground/20 group-hover:text-gold-500 transition-all duration-500 group-hover:translate-x-2" />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-500 mb-1">{course.subtitle}</h4>
                  <h3 className="font-sans text-3xl font-light text-foreground md:text-4xl group-hover:text-gold-500 transition-colors duration-500">{course.title}</h3>
                </div>
                <p className="text-base leading-relaxed text-foreground/60 max-w-sm">{course.description}</p>
                
                <div className="pt-4 overflow-hidden">
                  <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-foreground/40 group-hover:text-navy-950 transition-colors duration-500 relative">
                    Explore Program
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-navy-950 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
