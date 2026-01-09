"use client"

export function AcademySection() {
  const courses = [
    {
      title: "Global Accredited Mediator Training",
      description: "A comprehensive curriculum covering international standards of neutral facilitation, ethics, and process management for aspiring professional mediators.",
    },
    {
      title: "Advanced Advocacy in Mediation",
      description: "Specialized coaching for legal practitioners to master the shift from adversarial litigation to collaborative problem-solving and effective client representation.",
    },
    {
      title: "International Arbitration Standards",
      description: "Deep-dive training on the UNCITRAL Model Law, procedural efficiency, and the enforcement of international arbitral awards for legal specialists.",
    },
    {
      title: "Strategic Negotiation & Diplomacy",
      description: "Mastering psychological frameworks, cultural intelligence, and tactical communication to secure superior outcomes in high-stakes professional negotiations.",
    },
  ]

  return (
    <section id="academy" className="flex min-h-screen w-full items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 md:mb-16">
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Academy
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Professional training & certification</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, i) => (
            <div key={i} className="group flex flex-col gap-4">
              <div className="h-px w-full bg-foreground/10 transition-all duration-300 group-hover:bg-foreground/30" />
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-foreground/40">0{i + 1}</span>
                <h3 className="font-sans text-xl font-medium text-foreground md:text-2xl">{course.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/70">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
