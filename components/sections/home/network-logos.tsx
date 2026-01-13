"use client";

const networks = [
  "GAADR",
  "MCI",
  "Podcast",
  "Advocate Maximus",
  "ODRC"
];

export function NetworkLogos() {
  return (
    <section className="py-12 md:py-20 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-center text-[10px] md:text-xs font-mono uppercase tracking-[0.5em] opacity-40 mb-10 md:mb-12">
          PACT Network
        </h3>
        
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee">
            {/* First set of items */}
            {networks.map((name, i) => (
              <div 
                key={`set1-${i}`} 
                className="shrink-0 px-6 md:px-12 lg:px-16"
              >
                <div className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 h-16 md:h-24">
                  <span className="text-xl md:text-3xl font-light tracking-tighter whitespace-nowrap">
                    {name}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {networks.map((name, i) => (
              <div 
                key={`set2-${i}`} 
                className="shrink-0 px-6 md:px-12 lg:px-16"
              >
                <div className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 h-16 md:h-24">
                  <span className="text-xl md:text-3xl font-light tracking-tighter whitespace-nowrap">
                    {name}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Third set for extra smoothness */}
            {networks.map((name, i) => (
              <div 
                key={`set3-${i}`} 
                className="shrink-0 px-6 md:px-12 lg:px-16"
              >
                <div className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 h-16 md:h-24">
                  <span className="text-xl md:text-3xl font-light tracking-tighter whitespace-nowrap">
                    {name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
