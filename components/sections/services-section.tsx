export function ServicesSection() {
  return (
    <section id="services" className="flex min-h-screen w-full items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 md:mb-16">
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            PACT Impact Model
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Mediation types for every conflict</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {[
            {
              title: "Strategic Commercial Mediation",
              description:
                "Facilitating resolution in B2B disputes, international joint ventures, supply chain disruptions, and complex contractual disagreements with a focus on commercial viability and risk mitigation.",
            },
            {
              title: "Private Family Mediation",
              description:
                "Providing a neutral, dignified environment for sensitive family matters, including cross-border estate distribution, matrimonial settlements, and multi-generational succession planning.",
            },
            {
              title: "Corporate Governance & Workplace",
              description:
                "Resolving internal conflicts, executive disagreements, and employment disputes to foster a productive corporate culture and mitigate long-term reputational risks for organizations.",
            },
            {
              title: "Public Institutional Mediation",
              description:
                "Addressing conflicts involving governmental bodies, educational institutions, and community organizations to ensure public accountability and restore social cohesion through dialogue.",
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: { title: string; description: string }
  index: number
}) {
  return (
    <div className="group transition-all duration-700">
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/40 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/60" />
        <span className="font-mono text-xs text-foreground/70">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{service.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/90 md:text-base">{service.description}</p>
    </div>
  )
}
