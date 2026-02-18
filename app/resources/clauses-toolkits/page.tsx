"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Download, 
  Clock, 
  Shield, 
  Users, 
  Megaphone,
  AlertTriangle,
  Leaf,
  Scale,
  Mail,
  ChevronDown,
  ExternalLink,
  ArrowUpRight,
  Copy,
  CheckCircle2
} from "lucide-react";
import { ResourceSubPageHero } from "@/components/sections/resources/resource-subpage-hero";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

const whyMediationClauses = [
  {
    icon: Clock,
    title: "Quick & Economical Resolution",
    description: "Mediation clauses encourage early resolution of disputes, saving time, legal costs and managing resources",
  },
  {
    icon: Users,
    title: "Good HR, Better PR",
    description: "Mediation promotes collaborative problem-solving while maintaining confidentiality, helping parties protect commercial relationships and public goodwill.",
  },
  {
    icon: Shield,
    title: "Certainty & Procedural Clarity",
    description: "A mediation clause sets out a clear, agreed pathway for resolving disputes, reducing uncertainty and aligning with dispute-resolution best practices.",
  },
  {
    icon: FileText,
    title: "Confidential by Design",
    description: "Mediation clauses ensure disputes are handled privately, safeguarding sensitive commercial information and brand integrity.",
  },
  {
    icon: AlertTriangle,
    title: "De-escalation Tool",
    description: "Mandatory mediation acts as a circuit-breaker, preventing disputes from hardening into prolonged litigation.",
  },
  {
    icon: Leaf,
    title: "Progressive Governance",
    description: "Including a mediation clause reflects a commitment to responsible, modern, and ESG-aligned dispute management.",
  },
];

const essentials = [
  "Name of Institution or Service Provider",
  "Timeline for Mediation",
  "Agreement on Splitting Expenses",
  "Mode of Mediation – Online / In-person / Hybrid",
];

const sampleClauses = [
  {
    id: "A",
    title: "Standard Mediation Agreement",
    content: `Any dispute, conflict, or claim arising out of or in relation to this contract, including its existence, amendment, validity, interpretation, performance, breach, or termination, shall, as a condition precedent, be referred to mediation administered by PACT in accordance with its mediation rules and procedures in force at the time of commencement of the mediation.

The mediation shall be conducted on a confidential and without-prejudice basis, as per The Mediation Act, 2023. Nothing in this clause shall prevent any party from seeking interim relief from a court or tribunal of competent jurisdiction, where such relief is necessary.

The mediation shall be conducted and completed within a period of _________ (weeks/months). All parties involved agree to split the fees equally and participate in the mediation in _________ (online / in-person) mode`,
  },
  {
    id: "B",
    title: "Multi-Tier Dispute Resolution",
    content: `Any dispute or claim arising out of or in connection with this contract shall first be referred to mediation administered by PACT, in accordance with its mediation rules for the time being in force.

If the dispute is not resolved by mediation within [60] days from the date of commencement of the mediation, or within such further period as the parties may mutually agree in writing, the dispute shall thereafter be referred to and finally resolved by [arbitration / litigation] in accordance with the dispute resolution provisions of this contract.

The commencement or continuation of mediation shall not prevent any party from seeking urgent interim relief.

The mediation shall be conducted and completed within a period of two months. All parties involved agree to split the fees equally and participate in the mediation in _________ (online / in-person) mode`,
  },
  {
    id: "C",
    title: "Optional Mediation Clause",
    content: `The parties agree that, in the event of any dispute arising out of or relating to this contract, they shall, in good faith, consider referring the dispute to mediation administered by PACT, prior to initiating arbitration or litigation.

This clause reflects the parties' intention to explore consensual dispute resolution and does not constitute a mandatory bar to the initiation of formal proceedings.

The mediation shall be conducted and completed within a period of _________ (weeks/months). All parties involved agree to split the fees equally and participate in the mediation in _________ (online / in-person) mode`,
  },
  {
    id: "D",
    title: "IP & Technology Disputes",
    content: `Any dispute, controversy, or claim arising out of or relating to this agreement, including disputes concerning intellectual property rights, licensing, confidentiality, or commercial performance, shall be referred to mediation administered by PACT, in accordance with its mediation rules.

The mediation shall be confidential, without prejudice, and conducted by a mediator with relevant subject-matter expertise, where appropriate.

The mediation shall be conducted and completed within a period of _________ (weeks/months). All parties involved agree to split the fees equally and participate in the mediation in _________ (online / in-person) mode`,
  },
  {
    id: "E",
    title: "Comprehensive Mediation Clause",
    content: `Any dispute, controversy or claim arising out of or relating to this contract, including its existence, validity, interpretation, performance, breach or termination, shall first be referred to mediation administered by PACT under the PACT Mediation Rules in force on the date of commencement of mediation. The parties shall participate in good faith. Nothing prevents a party from seeking interim relief from a competent court / tribunal where necessary.

The mediation shall be conducted and completed within a period of _________ (weeks/months). All parties involved agree to split the fees equally and participate in the mediation in _________ (online / in-person) mode`,
  },
];

const toolkits = [
  {
    title: "Billing in Mediation",
    description: "How do you bill for commercial mediation services?",
    url: "https://www.barandbench.com/columns/commercial-mediation-how-do-you-bill",
    source: "Bar & Bench",
  },
  {
    title: "Enforcement of Mediation",
    description: "Legitimacy of private mediation in the pre-legislation era",
    url: "https://www.scconline.com/blog/post/2021/11/29/legitimacy-of-private-mediation-in-the-pre-legislation-era-busting-myths-with-facts/",
    source: "SCC Online",
  },
  {
    title: "Mediation Preparation",
    description: "Complete guide to preparing for a mediation session",
    url: "https://www.livelaw.in/law-firms/law-firm-articles-/mediation-amicus-advocates-and-solicitors-camp-arbitration-and-mediation-practice-idex-legal-181711",
    source: "LiveLaw",
  },
];

export default function ClausesToolkitsPage() {
  const [expandedClause, setExpandedClause] = useState<string | null>("A");
  const [copiedClause, setCopiedClause] = useState<string | null>(null);

  const handleCopyClause = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedClause(id);
    setTimeout(() => setCopiedClause(null), 2000);
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
        <ResourceSubPageHero
          tag="Resources"
          title={<><span className="text-gold-500">Mediation Clauses</span> & Toolkits</>}
          description="Whether you're drafting a contract clause, preparing for a mediation, or advising a client, here's your digital library for practical resources"
        />

        {/* Why Mediation Clauses Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Benefits
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                Why Mediation <span className="text-gold-500 italic font-medium">Clauses?</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyMediationClauses.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group p-6 md:p-8 rounded-2xl bg-navy-50 border border-navy-100 hover:bg-white hover:border-gold-500/30 hover:shadow-xl transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-950 flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors">
                    <item.icon className="w-6 h-6 text-gold-500 group-hover:text-navy-950" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-950 mb-3 group-hover:text-gold-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-navy-950/60 font-light text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DIY Section - Legal Note */}
        <section className="py-12 bg-navy-950 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10">
              <Scale className="w-10 h-10 text-gold-500 shrink-0" />
              <div>
                <p className="text-white font-medium mb-2">Legal Equivalence</p>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  A Mediation Clause is now legally equivalent to a Mediation Agreement (or Agreement to Mediate) as per <span className="text-gold-500">Section 5 of The Mediation Act, 2023</span>, which brings credibility and purpose, and makes it legally binding in nature.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Essentials Checklist */}
        <section className="py-16 bg-navy-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp>
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl md:text-3xl font-light text-navy-950 mb-8">
                  Ensure Clarity on <span className="text-gold-500 italic font-medium">Essentials</span>
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {essentials.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="px-5 py-3 rounded-full bg-white border border-navy-100 text-navy-950 text-sm font-medium shadow-sm"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Sample Clauses Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="mb-16">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="h-px w-8 bg-gold-500" />
                    <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                      Templates
                    </span>
                    <div className="h-px w-8 bg-gold-500" />
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                    Sample PACT <span className="text-gold-500 italic font-medium">Clauses</span>
                  </h2>
                </div>
                <a 
                  href="mailto:official@thepact.in?subject=Custom Mediation Clause Request"
                  className="inline-flex items-center gap-2 bg-navy-950 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-gold-500 hover:text-navy-950 transition-all shrink-0"
                >
                  <Mail className="w-4 h-4" />
                  Request a Custom Clause
                </a>
              </div>
            </FadeInUp>
            
            <div className="space-y-4">
              {sampleClauses.map((clause, i) => (
                <motion.div
                  key={clause.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-navy-100 overflow-hidden bg-white hover:border-gold-500/30 transition-colors"
                >
                  <button
                    onClick={() => setExpandedClause(expandedClause === clause.id ? null : clause.id)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-xl bg-navy-950 flex items-center justify-center text-gold-500 font-mono font-bold group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                        {clause.id}
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-medium text-navy-950 group-hover:text-gold-500 transition-colors">
                          Sample Clause {clause.id}
                        </h3>
                        <p className="text-navy-950/60 text-sm">{clause.title}</p>
                      </div>
                    </div>
                    <ChevronDown className={cn(
                      "w-5 h-5 text-navy-950/40 transition-transform",
                      expandedClause === clause.id && "rotate-180"
                    )} />
                  </button>
                  
                  <AnimatePresence>
                    {expandedClause === clause.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <div className="relative p-6 rounded-xl bg-navy-50 border border-navy-100">
                            <div className="absolute top-4 right-4">
                              <button
                                onClick={() => handleCopyClause(clause.id, clause.content)}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-navy-100 text-xs font-medium text-navy-950 hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition-all"
                              >
                                {copiedClause === clause.id ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4" />
                                    Copy
                                  </>
                                )}
                              </button>
                            </div>
                            <h4 className="text-sm font-mono uppercase tracking-widest text-gold-500 mb-4">
                              Mediation Agreement
                            </h4>
                            <p className="text-navy-950/80 font-light leading-relaxed whitespace-pre-line pr-20">
                              {clause.content}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Toolkits Section */}
        <section className="py-20 md:py-32 bg-navy-950 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Practical Guides
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
                <span className="text-gold-500 italic font-medium">Toolkits</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {toolkits.map((toolkit, i) => (
                <motion.a
                  key={i}
                  href={toolkit.url}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gold-500/20 flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                      <FileText className="w-6 h-6 text-gold-500 group-hover:text-navy-950" />
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 group-hover:text-gold-500 transition-colors">
                    {toolkit.title}
                  </h3>
                  <p className="text-white/60 font-light text-sm mb-4 leading-relaxed">
                    {toolkit.description}
                  </p>
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-500/70">
                    {toolkit.source}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
            <FadeInUp>
              <h2 className="text-3xl md:text-4xl font-light text-navy-950 mb-6">
                Need a <span className="text-gold-500 italic font-medium">customized</span> mediation clause?
              </h2>
              <p className="text-navy-950/60 text-lg mb-10 max-w-2xl mx-auto">
                Our team can draft bespoke mediation clauses tailored to your specific industry, jurisdiction, and contractual requirements.
              </p>
              <a 
                href="mailto:official@thepact.in?subject=Custom Mediation Clause Request"
                className="inline-flex items-center gap-3 bg-navy-950 text-white px-10 py-5 rounded-full font-medium hover:bg-gold-500 hover:text-navy-950 transition-all duration-300 shadow-xl group"
              >
                Contact Us
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </FadeInUp>
          </div>
        </section>
        
        <Footer />
      </FadeIn>
    </main>
  );
}
