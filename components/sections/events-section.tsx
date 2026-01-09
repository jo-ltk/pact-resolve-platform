"use client"

export function EventsSection() {
  const events = [
    { title: "Mediation Conference International (MCI)", date: "August 2026", type: "Global Flagship" },
    { title: "National Advanced ADR Summit (NIAAM)", date: "October 2026", type: "Methods Summit" },
    { title: "PACT Institutional Conclave", date: "December 2026", type: "Leadership Gathering" },
    { title: "Advocate Maximus: The Premier Moot", date: "Biannual", type: "Competitions" },
    { title: "Distinguished Guest Lecture Series", date: "Quarterly", type: "Academic Series" },
    { title: "Global ADR Strategic Partnerships", date: "Continuous", type: "External Outreach" },
  ]

  return (
    <section id="events" className="flex min-h-screen w-full items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 md:mb-16">
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Events
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Connecting the mediation community</p>
        </div>

        <div className="space-y-4">
          {events.map((event, i) => (
            <div
              key={i}
              className="group flex flex-col md:flex-row md:items-center justify-between border-b border-foreground/10 py-6 transition-all hover:px-4"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                <span className="font-mono text-xs text-foreground/40 md:w-24">{event.type}</span>
                <h3 className="font-sans text-2xl font-light text-foreground md:text-4xl group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="font-mono text-sm text-foreground/60">{event.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
