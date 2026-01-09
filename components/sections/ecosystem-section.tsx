"use client"

export function EcosystemSection() {
  const items = [
    { title: "Our Core Purpose", description: "To institutionalize neutral mediation as the primary, most effective pathway to global justice and social harmony." },
    { title: "Strategic Alliances", description: "Formal partnerships with supreme courts, international chambers, and global NGOs to create a standardized ADR infrastructure." },
    { title: "Institutional Clients", description: "Serving Fortune 500 companies, sovereign states, and private individuals with a commitment to integrity and neutral excellence." },
    { title: "Directing Team", description: "A diverse collective of internationally certified mediators, former jurists, and strategic analysts dedicated to global resolution." },
  ]

  return (
    <section id="ecosystem" className="flex min-h-screen w-full items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 md:mb-16">
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Ecosystem
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Our impact and networks</p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {items.map((item, i) => (
            <div key={i} className="group relative flex flex-col gap-4 p-8 rounded-3xl border border-foreground/5 bg-foreground/1 hover:bg-foreground/3 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/5 font-mono text-xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {i + 1}
                </div>
                <h3 className="font-sans text-3xl font-light text-foreground">{item.title}</h3>
              </div>
              <p className="text-lg leading-relaxed text-foreground/70 max-w-md">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
