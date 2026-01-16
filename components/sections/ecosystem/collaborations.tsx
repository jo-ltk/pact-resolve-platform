"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Users, BookOpen, Scaling, Send, ArrowUpRight } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

const strategicPartners = [
  {
    name: "IMI – International Mediation Institute",
    region: "Europe / International",
    description: "PACT is recognised for its Quality Assessment Programme (QAP) for Mediation Advocacy Accreditation by the IMI. By partnering with IMI, PACT is committed to capacity-building and upskilling of mediation lawyers in India.",
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

const practiceCollaborators = [
  {
    name: "Cyril Amarchand Mangaldas",
    description: "PACT is working with India’s leading firm to develop the next generation of mediation professionals through the flagship Mediation Champions League (India).",
    logo: "/partners/cyril-amarchand-new.png"
  },
  {
    name: "Khaitan & Co.",
    description: "PACT is working with India’s leading firm in upskilling corporate and dispute lawyers in collaborative communication tools and techniques.",
    logo: "/partners/khaitan.png"
  },
  {
    name: "Adani Group",
    description: "PACT is working with India’s leading corporate in upskilling in-house counsel and leadership in Mediation Advocacy Skills.",
    logo: "/partners/adani-group.png"
  }
];

const academicPartners = [
  "Manipal Academy of Higher Education (MAHE) – School of Law, Bengaluru",
  "BITS School of Law, Mumbai",
  "SRM University School of Law, Sonepat",
  "Dhirubhai Ambani University School of Law, Gandhinagar"
];

const supporters = [
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

const mentoringPartners = [
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

export function Collaborations() {
  return (
    <section id="collaborations" className="bg-white">
      {/* Intro */}
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <FadeInUp>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">Collaborations</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-light text-navy-950 tracking-tight leading-tight">
                Principled <br />
                <span className="text-gold-500 italic font-medium">Partnerships</span>
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-lg md:text-xl text-navy-950/60 font-light leading-relaxed">
                From day one, every initiative at The PACT has grown out of a principled negotiation and a shared commitment to collaboration. Our alliances reflect years of open-minded conversations, intense brainstorming, and carefully chosen partnerships with people and institutions who believe as we do that mediation deserves a central place in how India resolves conflict.
              </p>
            </FadeInUp>
          </div>
        </div>
      </div>

      {/* Strategic Partners */}
      <div className="py-24 bg-navy-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <FadeInUp className="mb-16">
            <h3 className="text-3xl md:text-5xl font-light text-navy-950 tracking-tight mb-4">Strategic Partnerships</h3>
            <div className="h-1 w-12 bg-gold-500 rounded-full" />
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            { strategicPartners.map((partner, i) => (
              <FadeInUp key={i} delay={i * 0.1}>
                <div className="group h-full bg-white p-8 md:p-10 rounded-[2.5rem] border border-navy-100 hover:border-gold-500/20 transition-all duration-500 hover:shadow-2xl flex flex-col">
                  <div className="h-16 w-full relative mb-10 md:grayscale group-hover:grayscale-0 transition-all duration-500">
                     <Image src={partner.logo} alt={partner.name} fill className="object-contain object-left" />
                  </div>
                  <div className="space-y-4 flex-grow">
                    <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">{partner.region}</span>
                    <h4 className="text-2xl font-light text-navy-950 leading-tight group-hover:text-gold-500 transition-colors uppercase tracking-tight">{partner.name}</h4>
                    <p className="text-base text-navy-950/60 font-light leading-relaxed">{partner.description}</p>
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
               <h3 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Why Alliances <br /><span className="text-gold-500 italic font-medium">Matter to Us</span></h3>
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
                       <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                     </div>
                     <span className="text-lg font-light text-white/80">{text}</span>
                   </div>
                 ))}
               </div>
             </FadeInUp>
             
             <FadeInUp delay={0.2} className="relative">
                <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                  <Scaling className="w-12 h-12 text-gold-500 mb-8" />
                  <h4 className="text-3xl font-light mb-6 uppercase tracking-tight">Collaborate With Us</h4>
                  <p className="text-white/40 font-light leading-relaxed mb-10">
                    If your institution or organisation is interested in collaborating with PACT, we would be happy to explore appropriate capacities to further our ‘Mission Mediation’.
                  </p>
                  <a 
                    href="mailto:official@thepact.in"
                    className="group inline-flex items-center gap-4 bg-gold-500 text-navy-950 px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95"
                  >
                    Explore Collaboration <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
             </FadeInUp>
          </div>
        </div>
      </div>

      {/* Collaborators-in-Practice */}
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <FadeInUp className="mb-16">
            <h3 className="text-3xl md:text-5xl font-light text-navy-950 tracking-tight mb-4">Collaborators-in-Practice</h3>
            <div className="h-1 w-12 bg-gold-500 rounded-full" />
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            { practiceCollaborators.map((pc, i) => (
              <FadeInUp key={i} delay={i * 0.1} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 relative mb-6 md:grayscale group-hover:grayscale-0 transition-all duration-500 flex items-center justify-center">
                   <Image src={pc.logo} alt={pc.name} fill className="object-contain" />
                </div>
                <h4 className="text-xl font-bold text-navy-950 mb-3 uppercase tracking-tight">{pc.name}</h4>
                <p className="text-base text-navy-950/40 font-light leading-relaxed px-4">{pc.description}</p>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Associations */}
      <div className="py-24 bg-navy-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
           <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-32 items-center">
             <FadeInUp>
               <h3 className="text-4xl font-light text-navy-950 mb-8 uppercase tracking-tight">Academic Associations</h3>
               <p className="text-lg text-navy-950/60 font-light leading-relaxed mb-12">
                 Together, we run boot camps, guest lectures, competitions, and certificate programs that introduce thousands of students to the skills and values of collaborative dispute resolution.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {academicPartners.map((school, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-navy-100/50">
                     <BookOpen className="w-5 h-5 text-gold-500 shrink-0" />
                     <span className="text-sm font-light text-navy-950 leading-snug">{school}</span>
                   </div>
                 ))}
               </div>
             </FadeInUp>
             
             <div className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden bg-navy-50 border-4 border-white shadow-2xl group">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-navy-950/10 font-black text-4xl uppercase p-12 text-center italic group-hover:text-navy-950/20 transition-colors duration-700">
                   Current Associations
                </div>
                {/* Small Carousel Placeholder Area for older associations */}
                <div className="absolute top-6 left-6 right-6 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                   <p className="text-[10px] font-mono text-navy-950/40 uppercase tracking-widest mb-1 italic">Older Associations</p>
                   <div className="flex gap-4 opacity-30">
                      <div className="h-4 w-12 bg-navy-950" />
                      <div className="h-4 w-16 bg-navy-950" />
                      <div className="h-4 w-10 bg-navy-950" />
                   </div>
                </div>
                <div className="absolute bottom-8 left-12 right-12 text-navy-950">
                   <p className="text-xs font-mono uppercase tracking-widest font-bold mb-2">Since 2015</p>
                   <p className="text-lg font-light">Expanding horizons in legal education</p>
                </div>
             </div>
           </div>
        </div>
      </div>

      {/* Mission Mediation Alliances */}
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-light text-navy-950 mb-4 uppercase tracking-tight">Mission Mediation Alliances</h3>
            <p className="max-w-3xl mx-auto text-navy-950/60 text-lg font-light leading-relaxed mb-12">
              We are privileged to collaborate with some of India’s leading law firms, whose support has helped us design and deliver real-world, practice-oriented mediation experiences for students and professionals alike. These firms contribute as mentors, assessors, speakers and trainers across our initiatives.
            </p>
            
            <div className="relative w-full border-y border-navy-50 bg-navy-50/20 py-12 px-12">
               <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
                 {mentoringPartners.map((partner, i) => (
                   <div key={i} className="h-12 w-40 relative group grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                     <Image 
                       src={partner.logo} 
                       alt={partner.name} 
                       fill 
                       className="object-contain" 
                     />
                     <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-mono uppercase tracking-widest text-navy-950 font-bold">
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
            <h3 className="text-2xl font-light text-navy-950 mb-12 uppercase tracking-tight">Supporting Organisations</h3>
            <p className="max-w-2xl text-navy-950/50 text-base font-light mb-12 italic leading-relaxed">
              Our work is also strengthened by alliances with specialised mediation and ADR institutions in India and abroad, who share their expertise, platforms, and networks to deepen the impact of #MissionMediation.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12">
              {supporters.map((s, i) => (
                s.logo ? (
                  <div key={i} className="h-16 w-40 relative px-4 md:grayscale md:opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <Image src={s.logo} alt={s.name} fill className="object-contain" />
                  </div>
                ) : (
                  <span key={i} className="text-sm md:text-base font-mono uppercase tracking-widest text-navy-950/30 hover:text-gold-500 transition-colors duration-300">
                    {s.name}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
