export function WorkSection() {
  return (
    <section id="work" className="flex min-h-screen w-full items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 md:mb-16">
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Why Mediate
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">
            / The PACT advantage in conflict resolution
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {[
            {
              number: "01",
              title: "Speed & Efficiency",
              category: "Expedited Timelines",
              description: "Accelerate dispute resolution by bypassing lengthy judicial queues, typically reaching sustainable settlements in less than 30% of the time required for traditional litigation.",
            },
            {
              number: "02",
              title: "Economic Strategy",
              category: "Cost Optimization",
              description: "Minimize legal expenditure and administrative overheads by utilizing a streamlined process that reduces professional fees and prevents costly operational downtime.",
            },
            {
              number: "03",
              title: "Strict Confidentiality",
              category: "Privacy Protection",
              description: "Ensure complete privacy for sensitive commercial interests and personal matters, protected by robust legal frameworks and professional ethical standards.",
            },
            {
              number: "04",
              title: "Strategic Preservation",
              category: "Sustainable Relations",
              description: "Employ interest-based negotiation techniques that prioritize long-term collaboration, preserving valuable business networks and essential societal connections.",
            },
          ].map((benefit, i) => (
            <BenefitCard key={i} benefit={benefit} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitCard({
  benefit,
  index,
}: {
  benefit: { number: string; title: string; category: string; description: string }
  index: number
}) {
  return (
    <div
      className="group flex flex-col gap-4 border-b border-foreground/10 py-6 md:py-8"
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/65 transition-colors group-hover:text-foreground/90 md:text-base">
          {benefit.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 md:text-3xl lg:text-4xl">
            {benefit.title}
          </h3>
          <p className="font-mono text-xs text-foreground/70 md:text-sm">{benefit.category}</p>
        </div>
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">{benefit.description}</p>
    </div>
  )
}
