"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Users, BookOpen, Scaling, Send, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { EcosystemSubPageHero } from "./ecosystem-subpage-hero";
import { cn } from "@/lib/utils";
import { type EcosystemPartner } from "@/lib/db/schemas";

// Fallback constant data based on old website/user request
const strategicPartnersFallback = [
  {
    name: "IMI – International Mediation Institute",
    region: "Europe / International",
    description: "PACT is recognised for its Quality Assessment Programme (QAP) for Mediation Advocacy Accreditation by the IMI. By partnering with IMI, PACT is committed to capacity-building and upskilling of meditation lawyers in India.",
    logo: "/partners/imi.jpg"
  },
  {
    name: "Mediate.com",
    region: "United States / International",
    description: "PACT is partnering with arguably the world’s oldest mediation education institute, recently acquired by AAA. We will be running quality mediation courses with Mediate.com University.",
    logo: "/partners/mediate-com-new.png"
  },
  {
    name: "Maxwell Mediators",
    region: "Singapore / Asia Pacific",
    description: "PACT is partnering with Singapore’s premier boutique mediation firm to share insights and best practices on the International Mediation Advocacy Training.",
    logo: "/partners/maxwell.jpg"
  },
  {
    name: "Wolters Kluwer",
    region: "Global / Knowledge Partner",
    description: "PACT collaborates with Wolters Kluwer to provide cutting-edge mediation research, literature and resources, including the Kluwer Mediation Blog for South Asia.",
    logo: "/partners/wolters-kluwer.jpg"
  }
];

const practiceCollaboratorsFallback = [
  {
    name: "Cyril Amarchand Mangaldas",
    description: "(India) PACT is working with India’s leading firm – Cyril Amarchand Mangaldas – to develop the next generation of mediation professionals in India, through a flagship event Mediation Champions League (India).",
    logo: "/partners/cyril-amarchand-new.png"
  },
  {
    name: "Khaitan & Co.",
    description: "(India) PACT is working with India’s leading firm – Khaitan & Co. – in upskilling corporate and dispute lawyers in collaborative communication tools and techniques.",
    logo: "/partners/khaitan.png"
  },
  {
    name: "Adani Group",
    description: "(India) PACT is working with India’s leading corporate – Adani Group – in upskilling in-house counsel and leadership in Mediation Advocacy Skills.",
    logo: "/partners/adani-group.png"
  }
];

const currentAcademicAssociations = [
  "Manipal Academy of Higher Education (MAHE) – School of Law, Bengaluru",
  "BITS School of Law, Mumbai",
  "SRM University School of Law, Sonepat",
  "Dhirubhai Ambani University School of Law, Gandhinagar"
];

const olderAssociations = [
  "Gujarat National Law University (GNLU)",
  "NLU Delhi",
  "NALSAR University of Law",
  "NLSIU Bengaluru",
  "MNLU Mumbai",
  "Jindal Global Law School",
  "Symbiosis Law School (SLS)",
  "Lloyd Law College",
  "NLU Odisha",
  "RGNUL Punjab",
  "CNLU Patna",
  "National University of Study and Research in Law (NUSRL)",
  "Damodaram Sanjivayya National Law University (DSNLU)",
  "Tamil Nadu National Law University (TNNLU)",
  "HPNLU Shimla",
  "DNLU Jabalpur",
  "BR Ambedkar National Law University",
  "Nirma University School of Law"
];

const mentoringPartnersFallback = [
  { name: "Trilegal", logo: "/partners/trilegal.png" },
  { name: "IndusLaw", logo: "/partners/induslaw.jpg" },
  { name: "Samvād: Partners", logo: "/partners/samvad.png" },
  { name: "Shardul Amarchand Mangaldas", logo: "/partners/shardul-amarchand.jpg" },
  { name: "Svar-Niti Law Offices", logo: "/partners/svarniti.jpg" },
  { name: "Bharucha & Partners", logo: "/partners/bharucha.jpg" },
  { name: "Obelisk Legal", logo: "/partners/obelisk.png" },
  { name: "Khaitan & Co", logo: "/partners/khaitan.png" },
  { name: "Dua Associates", logo: "/partners/dua-associates.png" },
  { name: "Fox & Mandal", logo: "/partners/fox-mandal.png" },
  { name: "Nishith Desai Associates", logo: "/partners/nishith-desai.jpg" },
  { name: "JSA Advocates & Solicitors", logo: "/partners/jsa.png" },
  { name: "Poovayya & Co", logo: "/partners/poovayya.jpg" },
  { name: "Phoenix Legal", logo: "/partners/phoenix-legal.png" },
  { name: "DSK Legal", logo: "/partners/dsk-legal.png" },
  { name: "Dentons Link Legal", logo: "/partners/dentons-link-legal.png" },
  { name: "Aarna Law", logo: "/partners/aarna-law.png" },
  { name: "AKS Partners", logo: "/partners/aks-partners.png" },
  { name: "Cyril Amarchand Mangaldas", logo: "/partners/cyril-amarchand-new.png" },
  { name: "ALMT Legal", logo: "/partners/almt-legal.png" },
];

const supportersFallback = [
  { name: "Singapore International Mediation Institute (SIMI)" },
  { name: "SIAC (Singapore International Arbitration Centre)" },
  { name: "ICC" },
  { name: "MCIA (Mumbai Centre for International Arbitration)" },
  { name: "Asian School of Cyber Laws (ASCL)", logo: "/partners/ascl.jpg" },
  { name: "Society of Construction Law (SCL)" },
  { name: "Mediate Works" },
  { name: "Mediator Academy" },
  { name: "SCMA", logo: "/partners/scma.png" },
  { name: "Prem Tara Foundation", logo: "/partners/prem-tara-foundation.png" },
  { name: "GIMAC", logo: "/partners/gimac.png" },
];

export function Collaborations() {
  const [partners, setPartners] = useState<EcosystemPartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("/api/content/ecosystem/partners");
        const result = await response.json();
        if (result.success) {
          setPartners(result.data);
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  // Helper to get items for a category - per category fallback logic
  const getCategoryItems = (category: string, fallback: any[]) => {
    // Filter DB partners
    const fromDb = partners.filter(p => {
        const cat = p.category as string;
        if (category === "mentoring") return cat === "legal" || cat === "mission" || cat === "mentoring";
        return cat === category;
    });
    
    // If DB is empty, use fallback
    if (fromDb.length === 0) return fallback;

    // If DB contains placeholders (like "STRATEGIC PARTNER 1"), ignore DB and use fallback for now
    const hasPlaceholders = fromDb.some(p => 
      p.name.toUpperCase().includes("PARTNER") || 
      p.description?.includes("Description") || 
      p.name.includes("Placeholder")
    );

    if (hasPlaceholders) return fallback;

    return fromDb;
  };

  const displayStrategic = getCategoryItems("strategic", strategicPartnersFallback);
  const displayPractice = getCategoryItems("practice", practiceCollaboratorsFallback);
  const displayMentoring = getCategoryItems("mentoring", mentoringPartnersFallback);
  const displaySupporters = getCategoryItems("supporter", supportersFallback);


  return (
    <section id="collaborations" className="bg-white">
      {/* Intro Header */}
      <EcosystemSubPageHero 
        tag="Collaborations"
        title={<>Principled <br /><span className="text-gold-500 italic font-medium">Partnerships</span></>}
        description="From day one, every initiative at The PACT has grown out of a principled negotiation and a shared commitment to collaboration. Our alliances reflect years of open-minded conversations, intense brainstorming, and carefully chosen partnerships with people and institutions who believe as we do that mediation deserves a central place in how India resolves conflict."
      />

      {/* Strategic Partnerships Section */}
      <div className="pt-20 pb-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <FadeInUp className="mb-24">
            <h3 className="text-4xl md:text-6xl font-light text-navy-950 tracking-tight mb-8">Strategic Partnerships</h3>
            <div className="h-1.5 w-16 bg-gold-500" />
          </FadeInUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8">
            {displayStrategic.map((partner, i) => (
              <FadeInUp key={i} delay={i * 0.1}>
                <div className="group h-full bg-white px-8 py-10 rounded-4xl border border-gray-50 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] flex flex-col items-start text-left hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.06)] transition-all duration-700">
                  <div className="h-16 w-full relative mb-10">
                     <Image 
                        src={(partner as any).logo || "/partners/placeholder.png"} 
                        alt={partner.name} 
                        fill 
                        className="object-contain object-left"
                        sizes="(max-width: 768px) 100vw, 25vw"
                     />
                  </div>
                  <div className="space-y-4 grow">
                    <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold block mb-3 leading-tight">{(partner as any).region}</span>
                    <h4 className="text-lg font-bold text-navy-900 leading-tight uppercase tracking-tight mb-6">{(partner as any).name}</h4>
                    <p className="text-[13px] text-navy-950/30 font-light leading-relaxed">{(partner as any).description}</p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>





      {/* Why Alliances Matter */}
      <div className="py-24 md:py-32 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[100px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-32 items-center">
             <FadeInUp>
               <h3 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Why Alliances <br /><span className="text-gold-500 italic uppercase font-bold">Matter to Us</span></h3>
               <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-12">
                 For PACT, these alliances are not just a list of logos, they are ongoing relationships that make it possible to:
               </p>
               <div className="space-y-6">
                 {[
                   "Bring mediation into classrooms, courtrooms, and boardrooms",
                   "Connect C-Suite, students, professionals with practitioners",
                   "Align Indian mediation with international developments",
                   "Build a community to Network, Inspire, Create, Empower, Resolve"
                 ].map((text, i) => (
                   <div key={i} className="flex items-start gap-4">
                     <div className="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 mt-1">
                       <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                     </div>
                     <span className="text-lg font-light text-white/80">{text}</span>
                   </div>
                 ))}
               </div>
             </FadeInUp>
             
             <FadeInUp delay={0.2} className="relative">
                <div className="p-10 rounded-4xl bg-white/2 border border-white/10 backdrop-blur-sm">
                  <Scaling className="w-12 h-12 text-gold-500 mb-8" />
                  <h4 className="text-3xl font-light mb-6 uppercase tracking-tight">Collaborate With Us</h4>
                  <p className="text-white/40 font-light leading-relaxed mb-10">
                    If your institution or organisation is interested in collaborating with PACT, we would be happy to explore appropriate capacities to further our ‘Mission Mediation’.
                  </p>
                  <a 
                    href="mailto:official@thepact.in"
                    className="group inline-flex items-center gap-4 bg-gold-500 text-navy-950 px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:translate-y-[-2px] shadow-xl shadow-gold-500/10"
                  >
                    Explore Collaboration <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
             </FadeInUp>
          </div>
        </div>
      </div>

      {/* Collaborators-in-Practice */}
      <div className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <FadeInUp className="mb-24">
            <h3 className="text-4xl md:text-6xl font-light text-navy-950 tracking-tight mb-6">Collaborators-in-Practice</h3>
            <div className="h-1.5 w-16 bg-gold-500 rounded-full" />
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
            {displayPractice.map((pc, i) => (
              <FadeInUp key={i} delay={i * 0.1} className="flex flex-col items-center text-center group">
                <div className="w-40 h-24 relative mb-10 flex items-center justify-center">
                   <Image 
                        src={(pc as any).logo || "/partners/placeholder.png"} 
                        alt={pc.name} 
                        fill 
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 33vw"
                   />
                </div>
                <h4 className="text-xl font-bold text-navy-950 mb-6 uppercase tracking-tight leading-tight">{pc.name}</h4>
                <p className="text-[15px] text-navy-950/40 font-light leading-relaxed max-w-sm">{(pc as any).description}</p>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>


      {/* Academic Associations */}
      <div className="py-24 md:py-32 bg-navy-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-16 lg:gap-32 items-start">
            <FadeInUp className="sticky top-32">
              <h3 className="text-4xl md:text-5xl font-light text-navy-950 mb-8 uppercase tracking-tight">Academic <br /><span className="text-gold-500 italic font-medium">Associations</span></h3>
              <p className="text-lg text-navy-950/60 font-light leading-relaxed mb-12">
                A core pillar of The PACT’s ecosystem is its long-standing collaboration with law schools, universities, and academic institutions that open their classrooms and campuses to mediation. Together, we run boot camps, guest lectures, competitions, and certificate programs that introduce thousands of students to the skills and values of collaborative dispute resolution. Our collaborators include:
              </p>
              
              <div className="flex flex-col gap-4">
                 <div className="p-6 rounded-3xl bg-white border border-navy-100 shadow-sm">
                   <div className="flex items-center gap-3 mb-2">
                     <BookOpen className="w-5 h-5 text-gold-500" />
                     <span className="text-xs font-mono uppercase tracking-widest text-navy-950/40 font-bold">Expansion</span>
                   </div>
                   <p className="text-2xl font-bold text-navy-950 tracking-tight">Expanding horizons in legal education since 2015</p>
                 </div>
              </div>
            </FadeInUp>

            <div className="space-y-12">
              {/* Large Carousel for Current Associations */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 font-bold">Current Partners</span>
                  <div className="h-px grow bg-gold-500/10" />
                </div>
                <div className="relative w-full overflow-hidden bg-white/50 backdrop-blur-sm rounded-4xl border border-navy-100 p-8 shadow-sm group">
                  <div className="flex flex-col gap-6">
                    {currentAcademicAssociations.map((school, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0 group-hover/item:scale-150 transition-transform" />
                        <span className="text-lg font-light text-navy-950 group-hover/item:text-gold-500 transition-colors">{school}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Marquee for Older Associations */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-navy-950/40 font-bold">Older Associations</span>
                  <div className="h-px grow bg-navy-950/5" />
                </div>
                <div className="relative w-full overflow-hidden py-4 border-y border-navy-100/50">
                  <div className="flex whitespace-nowrap overflow-hidden">
                    <motion.div 
                      animate={{ x: [0, -1000] }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className="flex gap-12 shrink-0 pr-12"
                    >
                      {olderAssociations.map((item, i) => (
                        <span key={i} className="text-sm font-mono uppercase tracking-widest text-navy-950/20 hover:text-gold-500 transition-colors whitespace-nowrap cursor-default italic">
                          {item}
                        </span>
                      ))}
                    </motion.div>
                    <motion.div 
                      animate={{ x: [0, -1000] }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className="flex gap-12 shrink-0 pr-12"
                    >
                      {olderAssociations.map((item, i) => (
                        <span key={i} className="text-sm font-mono uppercase tracking-widest text-navy-950/20 hover:text-gold-500 transition-colors whitespace-nowrap cursor-default italic">
                          {item}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Mediation Alliances */}
      <div className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-light text-navy-950 mb-6 uppercase tracking-tight">Mission Mediation Alliances</h3>
            <p className="max-w-4xl mx-auto text-navy-950/60 text-lg font-light leading-relaxed mb-16 italic">
              We are privileged to collaborate with some of India’s leading law firms, whose support has helped us design and deliver real-world, practice-oriented mediation experiences for students and professionals alike. These firms contribute as mentors, assessors, speakers and trainers across our initiatives. Our collaborators include:
            </p>
            
            <div className="relative w-full border-y border-navy-50 bg-navy-50/20 py-16 px-6 md:px-12 rounded-[3rem]">
               <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-16">
                 {displayMentoring.map((partner, i) => (
                   <div key={i} className="h-10 w-40 relative group grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                     <Image 
                       src={(partner as any).logo || "/partners/placeholder.png"} 
                       alt={partner.name} 
                       fill 
                       className="object-contain" 
                       sizes="(max-width: 768px) 100vw, 20vw"
                     />
                     <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] font-mono uppercase tracking-widest text-navy-950 font-bold">
                       {partner.name}
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Organisations */}
      <div className="py-24 border-t border-navy-100 bg-navy-50/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-light text-navy-950 mb-12 uppercase tracking-tight italic">Supporting Organisations</h3>
            <p className="max-w-3xl text-navy-950/50 text-base font-light mb-16 leading-relaxed">
              Our work is also strengthened by alliances with specialised mediation and ADR institutions in India and abroad, who share their expertise, platforms, and networks to deepen the impact of #MissionMediation. Our collaborators (current / past) include:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 w-full">
              {displaySupporters.map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-navy-100/50 shadow-sm hover:shadow-xl hover:border-gold-500/20 transition-all duration-500 group">
                  {(s as any).logo ? (
                    <div className="h-12 w-full relative group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100">
                      <Image src={(s as any).logo} alt={s.name} fill className="object-contain" sizes="(max-width: 768px) 100vw, 15vw" />
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-xs font-mono uppercase tracking-widest text-navy-950/30 group-hover:text-gold-500 transition-colors duration-300 font-bold leading-tight block">
                        {s.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {/* The "And Others" indicator */}
              <div className="flex items-center justify-center p-6 bg-navy-950 rounded-3xl border border-navy-950 shadow-md group">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 font-black">And Others</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
