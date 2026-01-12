"use client";

const collaborators = [
  "Khaitan & Co.",
  "Adani Group",
  "Cyril Amarchand Mangaldas",
  "Prem Tara Foundation"
];

export function Collaborators() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#f8f9fa] border-y border-black/5">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-black/40 mb-16">
          PACT Collaborators
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-center opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
          {collaborators.map((name, i) => (
            <div key={i} className="flex items-center justify-center h-24 px-8 border border-black/5 rounded-2xl bg-white hover:border-primary/20 transition-all group">
              <span className="text-lg font-serif italic text-black/80 group-hover:text-black transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
