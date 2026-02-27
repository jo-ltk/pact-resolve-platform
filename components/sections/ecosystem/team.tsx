import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail, Plus, X } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { EcosystemSubPageHero } from "./ecosystem-subpage-hero";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { type EcosystemTeamMember } from "@/lib/db/schemas";
import { ExternshipFormModal } from "./externship-form-modal";

function getLinkedInUrl(link: string | undefined | null) {
  if (!link) return "";
  const trimmed = link.trim().replace(/^@/, '');
  if (trimmed.startsWith('http')) return trimmed;
  // Handle case where they might enter "linkedin.com/in/handle"
  if (trimmed.includes('linkedin.com')) return `https://${trimmed.replace(/^https?:\/\//, '')}`;
  return `https://linkedin.com/in/${trimmed}`;
}

const teamData = {
  managingPartners: [
    {
      name: "Jonathan Rodrigues",
      role: "Managing Partner",
      bio: "Jonathan Rodrigues is an Accredited International Mediator with an academic background in Psychology and Law and prior professional experience in journalism and education. He pursued an LL.M. in Mediation and Conflict Resolution in the UK and has served as a mediator in various capacities in Glasgow and London. Jonathan is certified as a civil, commercial, and workplace mediator by bodies including IIAM, IICA, TCM, PSMA, NALSA and IAM, and has delivered a TEDx talk on the Multi-Door Dispute Resolution System. He acts as a consultant at The TCM Group (London) Mediator Academy (London) and ICFML (Portugal/Brazil). He advises MediateIndia! and is the Regional Assistant Editor – South Asia for Kluwer Mediation Blog. Jonathan is the host of the Mission Mediation Podcast and Editor at Mediation Simplified.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      profileUrl: "https://www.linkedin.com/in/jonathan-rodrigues-07a9ab82/",
      email: "jonathan@thepact.in"
    },
    {
      name: "Nisshant Laroia",
      role: "Managing Partner",
      bio: "Nisshant Laroia is an Accredited Mediator, trained and certified by IIAM, IICA, PSMA, and a certified Mediation Counsel by SIMI and SCMA. A graduate of Gujarat National Law University (GNLU), he has worked as in-house counsel at Yogic Naturals, a pioneering health and wellness brand. Nisshant is the author of Mediation Simplified and co-founder of the Global Academy for Advocacy in Dispute Resolution (GAADR). He has worked with 15,000+ law students, introducing them to mediation, and is also an associate-grade arbitrator with the Chartered Institute of Arbitrators (CIArb). He has served as a mediator at the Delhi Dispute Resolution Society mediation centre.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
      profileUrl: "https://www.linkedin.com/in/nisshant-laroia-7b952a106/",
      email: "nisshant@thepact.in"
    }
  ],
  mentors: [
    { name: "Justice Tejas Karia", role: "Partner, Shardul Amarchand Mangaldas", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" },
    { name: "Justice Gita Mittal", role: "Retd. Judge, Chief Justice (JKHC)", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" },
    { name: "Justice Kurian Joseph", role: "Retd. Judge, Supreme Court of India", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" },
    { name: "Chitra Narayan", role: "Advocate & Mediator", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80" }
  ],
  mediators: [
    { name: "Jonathan Rodrigues", niche: "International & Commercial", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
    { name: "Soni Singh", niche: "Civil & Commercial", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80" },
    { name: "Ekta Bahl", niche: "Corporate & Law", image: "https://images.unsplash.com/photo-1567532939103-c053bb14b2b9?auto=format&fit=crop&q=80" },
    { name: "Raj Panchmatia", niche: "Dispute Resolution", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" }
  ],
  members: [
    { name: "Jatan Rodrigues", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80" },
    { name: "Sandeep Bhalothia", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" },
    { name: "Juhi Gupta", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80" },
    { name: "Gokul Narayan", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80" }
  ],
  externs: [
    { name: "Sainishtha Gupta", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" },
    { name: "Naman Grover", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80" }
  ]
};

function ProfileModal({ member, onClose }: { member: EcosystemTeamMember | null, onClose: () => void }) {
  if (!member) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-10 bg-navy-950/40 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] relative max-h-[90vh] flex flex-col"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center text-navy-950 hover:bg-gold-500 hover:text-white transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row min-h-0 overflow-y-auto">
          <div className="w-full md:w-2/5 relative min-h-[300px] md:min-h-[500px]">
            <Image 
              src={member.image} 
              alt={member.name} 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/40 to-transparent" />
          </div>

          <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-gold-500 text-sm uppercase tracking-[0.4em] font-bold">
                  {member.category.split('-').join(' ')}
                </span>
                <h3 className="text-4xl md:text-5xl font-light text-navy-950 tracking-tight leading-none uppercase">
                  {member.name.split(' ')[0]} <br />
                  <span className="text-gold-500 font-medium">{member.name.split(' ').slice(1).join(' ')}</span>
                </h3>
                <p className="text- navy-950/40 text-sm font-medium uppercase tracking-widest">{member.role || member.niche}</p>
              </div>

              <div className="h-px w-12 bg-gold-500/20" />

              <p className="text-lg text-navy-950/60 font-light leading-relaxed">
                {member.bio || "Profile details coming soon."}
              </p>

              <div className="flex items-center gap-4 pt-4">
                {(member.linkedin || member.profileUrl) && (
                  <a 
                    href={getLinkedInUrl(member.linkedin || member.profileUrl)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 h-12 rounded-full border border-navy-100 text-navy-950 hover:bg-navy-950 hover:text-white transition-all shadow-sm group"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-xs uppercase font-bold tracking-widest">LinkedIn Profile</span>
                  </a>
                )}
                {member.email && (
                  <a 
                    href={`mailto:${member.email}`}
                    className="w-12 h-12 rounded-full border border-navy-100 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white transition-all shadow-sm"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TeamSection() {
  const [team, setTeam] = useState<EcosystemTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<EcosystemTeamMember | null>(null);
  const [showExternshipForm, setShowExternshipForm] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("/api/content/ecosystem/team?all=true");
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          setTeam(result.data);
        }
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (selectedProfile || showExternshipForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProfile, showExternshipForm]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const managingPartners = team.length > 0 ? team.filter(m => m.category === "managing-partner") : (teamData.managingPartners as any[]);
  const mentors = team.length > 0 ? team.filter(m => m.category === "mentor") : (teamData.mentors as any[]);
  const mediators = team.length > 0 ? team.filter(m => m.category === "expert") : (teamData.mediators as any[]);
  const members = team.length > 0 ? team.filter(m => m.category === "staff") : (teamData.members as any[]);
  const externs = team.length > 0 ? team.filter(m => m.category === "extern") : (teamData.externs as any[]);

  return (
    <section id="team" className="bg-white overflow-hidden">

      <EcosystemSubPageHero 
        tag="The Team"
        title={<>Nurturing <span className="text-gold-500 italic font-medium">Innovation</span></>}
        description="PACT prides itself on nurturing a cohesive, fearless and innovative working atmosphere that allows a dedicated cohort of individuals to learn, grow and serve the profession of Mediation."
      />
      
      <div className="pt-16 pb-24 md:pt-24 md:pb-32 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        {/* Managing Partners - Mixed Layout */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-20 justify-center md:justify-start">
            <div className="h-px w-12 bg-gold-500" />
            <h3 className="text-base uppercase tracking-[0.4em] text-navy-950/40">Managing Partners</h3>
          </div>
          
          {/* Featured Managing Partner */}
          {managingPartners.length > 0 && (
            <div className="mb-32">
              {(() => {
                const partner = managingPartners[0];
                return (
                  <FadeInUp>
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                      {/* Featured Image */}
                      <div className="w-full lg:w-[450px] shrink-0">
                        <div className="relative aspect-3/4 rounded-[3rem] overflow-hidden border border-navy-100 shadow-2xl group cursor-pointer" onClick={() => setSelectedProfile(partner)}>
                          <Image 
                            src={partner.image} 
                            alt={partner.name} 
                            fill 
                            className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                            sizes="(max-width: 1024px) 100vw, 450px"
                          />
                          <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-700" />
                          
                          <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                             <p className="text-white text-sm uppercase font-bold tracking-widest text-center">Click to view full bio</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Featured Content */}
                      <div className="flex-1 space-y-8 text-center md:text-left">
                        <div className="space-y-2">
                          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <span className="text-gold-500 text-xs uppercase tracking-[0.3em] font-bold">{partner.role}</span>
                            <div className="h-px w-8 bg-gold-500/20" />
                          </div>
                          <h4 className="text-[10vw] md:text-6xl font-light text-navy-950 tracking-tighter leading-none uppercase">
                            {partner.name.split(' ')[0]} <br className="hidden md:block" />
                            <span className="text-gold-500 font-medium">{partner.name.split(' ').slice(1).join(' ')}</span>
                          </h4>
                        </div>
                        
                        <p className="text-lg md:text-xl text-navy-950/60 font-light leading-relaxed tracking-tight max-w-3xl line-clamp-4">
                          {partner.bio}
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 pt-6">
                          <div className="flex gap-4">
                            {partner.linkedin || partner.profileUrl ? (
                              <a 
                                href={getLinkedInUrl(partner.linkedin || partner.profileUrl)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full border border-navy-100 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white transition-all shadow-sm"
                              >
                                <Linkedin className="w-5 h-5" />
                              </a>
                            ) : null}
                            <a 
                              href={partner.email ? `mailto:${partner.email}` : "mailto:official@thepact.in"} 
                              className="w-12 h-12 rounded-full border border-navy-100 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white transition-all shadow-sm"
                            >
                              <Mail className="w-5 h-5" />
                            </a>
                          </div>
                          
                          <div className="h-px w-12 bg-navy-100 hidden md:block" />
                          
                          <button 
                            onClick={() => setSelectedProfile(partner)}
                            className="group/btn inline-flex items-center gap-3 text-xs uppercase font-bold tracking-[0.3em] text-gold-500 hover:text-navy-950 transition-colors"
                          >
                            Access Full Profile <ArrowUpRight className="w-4 h-4 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </FadeInUp>
                );
              })()}
            </div>
          )}

          {/* Secondary Managing Partners Grid */}
          {managingPartners.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-16 border-t border-navy-50">
              {managingPartners.slice(1).map((partner, i) => (
                <FadeInUp key={i} delay={i * 0.1}>
                  <div className="group relative p-8 md:p-10 rounded-4xl bg-white border border-navy-100 hover:border-gold-500/30 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 h-full flex flex-col sm:flex-row gap-10 items-center">
                    {/* Compact Image - Circular/Soft Square */}
                    <div className="shrink-0">
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border border-navy-50 shadow-sm group-hover:shadow-gold-500/10 transition-all duration-700 cursor-pointer" onClick={() => setSelectedProfile(partner)}>
                        <Image 
                          src={partner.image} 
                          alt={partner.name} 
                          fill 
                          className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-navy-950/5 group-hover:bg-transparent transition-colors duration-700" />
                      </div>
                    </div>
                    
                    {/* Content - Vertically Aligned */}
                    <div className="flex-1 space-y-4 text-center sm:text-left">
                      <div className="space-y-1">
                        <span className="text-gold-500 text-[9px] uppercase tracking-[0.3em] font-bold block">{partner.role}</span>
                        <h4 className="text-2xl md:text-3xl font-light text-navy-950 tracking-tight leading-tight uppercase">
                           {partner.name.split(' ')[0]} <span className="text-gold-500 font-medium">{partner.name.split(' ').slice(1).join(' ')}</span>
                        </h4>
                      </div>
                      
                      <p className="text-[13px] md:text-sm text-navy-950/40 font-light leading-relaxed line-clamp-3">
                        {partner.bio}
                      </p>
                      
                      {/* Integrated Action Area */}
                      <div className="flex items-center justify-center sm:justify-start gap-6 pt-4 border-t border-navy-50/50 mt-2">
                        <div className="flex gap-2">
                           {partner.linkedin || partner.profileUrl ? (
                             <a 
                               href={getLinkedInUrl(partner.linkedin || partner.profileUrl)} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="w-8 h-8 rounded-full border border-navy-100 flex items-center justify-center text-navy-950/40 hover:bg-navy-950 hover:text-white hover:border-transparent transition-all"
                             >
                               <Linkedin className="w-3.5 h-3.5" />
                             </a>
                           ) : null}
                           <a 
                             href={partner.email ? `mailto:${partner.email}` : "mailto:official@thepact.in"} 
                             className="w-8 h-8 rounded-full border border-navy-100 flex items-center justify-center text-navy-950/40 hover:bg-navy-950 hover:text-white hover:border-transparent transition-all"
                           >
                             <Mail className="w-3.5 h-3.5" />
                           </a>
                        </div>
                        
                        <div className="h-4 w-px bg-navy-100" />
                        
                        <button 
                          onClick={() => setSelectedProfile(partner)}
                          className="group/btn inline-flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.2em] text-gold-500 hover:text-navy-950 transition-colors"
                        >
                          View Bio <ArrowUpRight className="w-3 h-3 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          )}
        </div>

        {/* Mentors & Neutrals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 pb-24 border-b border-navy-50">
          <div>
             <h3 className="text-xl uppercase tracking-[0.3em] text-navy-950/30 mb-2 text-center md:text-left">Strategic Mentors</h3>
             <p className="text-sm text-navy-950/20 uppercase tracking-widest font-black mb-10 text-center md:text-left">Click name to view profile</p>
            <div className="space-y-2">
              {mentors.map((m: any, i: number) => (
                <div 
                  key={i} 
                  className="group flex items-center gap-6 py-5 border-b border-navy-50/50 hover:border-gold-500/30 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedProfile(m)}
                >
                  {/* Subtle Avatar */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-navy-50 shadow-sm group-hover:scale-105 transition-transform duration-500">
                    <Image 
                      src={m.image} 
                      alt={m.name} 
                      fill 
                      className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000" 
                    />
                    <div className="absolute inset-0 bg-navy-950/5 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                  
                  <div className="grow">
                    <h4 className="text-xl font-light text-navy-950 group-hover:text-gold-500 transition-colors">{m.name}</h4>
                    <p className="text-xs uppercase tracking-[0.2em] text-navy-950/40">{m.role}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {m.linkedin || m.profileUrl ? (
                      <a href={getLinkedInUrl(m.linkedin || m.profileUrl)} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-gold-500" onClick={e => e.stopPropagation()}>
                        <Linkedin className="w-4 h-4" />
                      </a>
                    ) : null}
                    <ArrowUpRight className="w-5 h-5 text-navy-950/10 group-hover:text-gold-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
             <h3 className="text-xl uppercase tracking-[0.3em] text-navy-950/30 mb-2 text-center md:text-left">Featured Experts</h3>
             <p className="text-sm text-navy-950/20 uppercase tracking-widest font-black mb-10 text-center md:text-left">Click name to view profile</p>
             <div className="space-y-2">
               {mediators.map((m: any, i: number) => (
                 <div 
                   key={i} 
                   className="group flex items-center gap-6 py-5 border-b border-navy-50/50 hover:border-gold-500/30 transition-all duration-500 cursor-pointer"
                   onClick={() => setSelectedProfile(m)}
                 >
                   {/* Subtle Avatar */}
                   <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-navy-50 shadow-sm group-hover:scale-105 transition-transform duration-500">
                     <Image 
                       src={m.image} 
                       alt={m.name} 
                       fill 
                       className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000" 
                     />
                     <div className="absolute inset-0 bg-navy-950/5 group-hover:bg-transparent transition-colors duration-700" />
                   </div>

                   <div className="grow">
                     <h4 className="text-xl font-light text-navy-950 group-hover:text-gold-500 transition-colors">{m.name}</h4>
                     <p className="text-xs uppercase tracking-widest text-gold-500 font-bold">{m.niche}</p>
                   </div>
                   <div className="flex items-center gap-4">
                    {m.linkedin || m.profileUrl ? (
                      <a href={getLinkedInUrl(m.linkedin || m.profileUrl)} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-gold-500" onClick={e => e.stopPropagation()}>
                        <Linkedin className="w-4 h-4" />
                      </a>
                    ) : null}
                    <ArrowUpRight className="w-5 h-5 text-navy-950/10 group-hover:text-gold-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Members & Externs */}
        <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
          <div>
             <h3 className="text-xl uppercase tracking-[0.3em] text-navy-950/30 mb-10 text-center md:text-left">Team Members</h3>
             <div className="space-y-2">
               {members.map((m: any, i: number) => (
                 <div 
                   key={i} 
                   className="group flex items-center gap-5 py-4 border-b border-navy-50 hover:border-gold-500/20 transition-all duration-300 cursor-pointer"
                   onClick={() => setSelectedProfile(m)}
                 >
                   {/* Smaller Avatar for Members */}
                   <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-navy-50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                     <Image 
                       src={m.image} 
                       alt={m.name} 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                     />
                   </div>
                   
                   <span className="text-lg font-light text-navy-950/80 group-hover:text-gold-600 transition-colors grow">{m.name}</span>
                   <div className="flex items-center gap-4">
                    {m.linkedin || m.profileUrl ? (
                      <a href={getLinkedInUrl(m.linkedin || m.profileUrl)} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-gold-500" onClick={e => e.stopPropagation()}>
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    ) : null}
                    <div className="w-1.5 h-1.5 rounded-full bg-navy-100 group-hover:bg-gold-500 transition-colors" />
                   </div>
                 </div>
               ))}
             </div>
          </div>
          <div>
             <h3 className="text-xl uppercase tracking-[0.3em] text-navy-950/30 mb-10 text-center md:text-left">Mediation Externs</h3>
             <div className="space-y-2">
                {externs.map((m: any, i: number) => (
                  <div 
                    key={i} 
                    className="group flex items-center gap-5 py-4 border-b border-navy-50 hover:border-gold-500/20 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedProfile(m)}
                  >
                    {/* Smaller Avatar for Externs */}
                   <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-navy-50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                     <Image 
                       src={m.image} 
                       alt={m.name} 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                     />
                   </div>

                    <div className="grow flex items-center justify-between">
                      <span className="text-lg font-light text-navy-950/80 group-hover:text-gold-600 transition-colors">{m.name}</span>
                      <div className="flex items-center gap-3">
                        {m.linkedin || m.profileUrl ? (
                          <a href={getLinkedInUrl(m.linkedin || m.profileUrl)} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-gold-500" onClick={e => e.stopPropagation()}>
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        ) : null}
                        <span className="text-[9px] uppercase tracking-widest text-gold-500/60 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">Externship</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-navy-100 group-hover:bg-gold-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Join the Mission CTA */}
                <div className="pt-8">
                  <button 
                    onClick={() => setShowExternshipForm(true)}
                    className="group/join w-full flex items-center justify-between p-6 rounded-3xl bg-navy-50/50 border border-navy-100/50 hover:bg-white hover:border-gold-500/30 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-navy-950 group-hover/join:bg-gold-500 group-hover/join:text-white transition-all duration-500 group-hover/join:rotate-12 shadow-sm border border-navy-100/50">
                        <Plus className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-navy-950 uppercase tracking-widest mb-1">Join the Mission</p>
                        <p className="text-xs text-navy-950/40 uppercase tracking-widest">Apply for Externship</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-navy-950/20 group-hover/join:text-gold-500 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence mode="wait">
          {selectedProfile && (
            <ProfileModal 
              member={selectedProfile} 
              onClose={() => setSelectedProfile(null)} 
            />
          )}
          {showExternshipForm && (
            <ExternshipFormModal 
              onClose={() => setShowExternshipForm(false)} 
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
