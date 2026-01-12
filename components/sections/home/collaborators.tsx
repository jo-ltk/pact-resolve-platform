"use client";

const collaborators = [
  { 
    name: "Khaitan & Co.", 
    short: "K&C",
    style: "font-serif italic tracking-tight",
    color: "group-hover:text-navy-900"
  },
  { 
    name: "Adani Group", 
    short: "ADANI",
    style: "font-sans font-black tracking-tighter uppercase",
    color: "group-hover:text-blue-900"
  },
  { 
    name: "Cyril Amarchand Mangaldas", 
    short: "CAM",
    style: "font-serif font-medium tracking-wide",
    color: "group-hover:text-stone-950"
  },
  { 
    name: "Prem Tara Foundation", 
    short: "PTF",
    style: "font-serif italic font-light",
    color: "group-hover:text-[#8b2d2d]"
  }
];

export function Collaborators() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-block mb-4">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-gold-600 mb-2">
            Strategic Partners
          </h2>
          <div className="h-[1px] w-full bg-linear-to-r from-transparent via-gold-400 to-transparent mx-auto" />
        </div>
        
        <h3 className="text-3xl md:text-4xl font-extralight text-navy-950 mb-10 tracking-tighter">
          Collaborating with <span className="font-serif italic">Excellence</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {collaborators.map((item, i) => (
            <div 
              key={i} 
              className="group relative flex flex-col items-center justify-center p-6 min-h-[120px] bg-white transition-all duration-700 hover:bg-slate-50/50"
            >
              {/* Ghost background text */}
              <span className="absolute inset-0 flex items-center justify-center text-[80px] font-black text-black/2 pointer-events-none transition-all duration-700 group-hover:text-gold-500/5 group-hover:scale-110 select-none">
                {item.short}
              </span>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className={`text-lg md:text-xl ${item.style} ${item.color} text-black/50 transition-all duration-500 group-hover:scale-105 group-hover:tracking-normal`}>
                  {item.name}
                </span>
              </div>

              {/* Minimal corner accents */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t border-l border-gold-500/0 transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:border-gold-500/40" />
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b border-r border-gold-500/0 transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:border-gold-500/40" />
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-black/3">
          <p className="text-black/20 font-mono text-[10px] uppercase tracking-[0.3em]">
            Trusted by Industry Leaders Worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
