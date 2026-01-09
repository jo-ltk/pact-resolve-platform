"use client"

import { MagneticButton } from "@/components/magnetic-button"

export function AboutSection({ scrollToSection }: { scrollToSection?: (id: string) => void }) {
  return (
    <section id="about" className="flex min-h-screen w-full items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left side - Story */}
          <div>
            <div className="mb-6 md:mb-12">
              <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                PACT
                <br />
                Academy &
                <br />
                <span className="text-foreground/40">Resources</span>
              </h2>
            </div>

            <div className="space-y-3 md:space-y-4">
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Learn mediation skills, understand conflict resolution frameworks, and access comprehensive resources to
                navigate disputes effectively.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                PACT Academy offers training programs and educational materials for individuals, organizations, and
                professionals.
              </p>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-12">
            {[
              { value: "2500+", label: "Cases Resolved", sublabel: "Successfully mediated" },
              { value: "15+", label: "Years", sublabel: "In dispute resolution" },
              { value: "98%", label: "Success Rate", sublabel: "Client satisfaction" },
            ].map((stat, i) => {
              return (
                <div
                  key={i}
                  className="flex items-baseline gap-4 border-l border-foreground/30 pl-4 md:gap-8 md:pl-8"
                  style={{
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "85%",
                  }}
                >
                  <div className="text-3xl font-light text-foreground md:text-6xl lg:text-7xl">{stat.value}</div>
                  <div>
                    <div className="font-sans text-base font-light text-foreground md:text-xl">{stat.label}</div>
                    <div className="font-mono text-xs text-foreground/80">{stat.sublabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 md:mt-16 md:gap-4">
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.("contact")}>
            Try Mediation Now
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.("work")}>
            Learn More
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
