"use client"

export function ResourcesSection() {
  const resources = [
    { title: "Standard Mediation Framework", category: "Institutional Guide" },
    { title: "Global ADR Review 2026", category: "Annual Publication" },
    { title: "Mission Mediation: Global Voices", category: "Podcast Series" },
    { title: "Strategic Analysis & Insights", category: "Thought Leadership" },
    { title: "International Press Bureau", category: "Official Updates" },
    { title: "Practitioner Excellence Toolkits", category: "Professional Resources" },
  ]

  return (
    <section id="resources" className="flex min-h-screen w-full items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 md:mb-16">
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Resources
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Knowledge hub for dispute resolution</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, i) => (
            <div
              key={i}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-foreground/5 bg-foreground/2 p-6 transition-all duration-300 hover:bg-foreground/5 hover:shadow-2xl"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                  {resource.category}
                </span>
                <h3 className="font-sans text-xl font-light text-foreground group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
              </div>
              <div className="mt-8 flex justify-end">
                <div className="h-8 w-8 rounded-full border border-foreground/20 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-foreground group-hover:text-white">
                  <span className="text-xs">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
