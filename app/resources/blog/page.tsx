"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  PenLine, 
  ExternalLink, 
  FileText, 
  Youtube, 
  BookOpen, 
  ArrowUpRight,
  Mail,
  FileCheck,
  Quote
} from "lucide-react";
import { ResourceSubPageHero } from "@/components/sections/resources/resource-subpage-hero";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

const pactBlogs = [
  {
    title: "Cold-Feet in Mediation",
    author: "Jonathan Rodrigues",
    publication: "IMI Mediation Blog",
    url: "https://imimediation.org/2020/01/29/the-cold-feet-challenge/",
  },
  {
    title: "Safeguarding Mediation Principles",
    author: "Jonathan Rodrigues",
    publication: "Mediatedotcom",
    url: "https://mediate.com/safeguarding-the-pillars-of-mediation-in-india/",
  },
  {
    title: "Negotiating in Blind Faith",
    author: "Jonathan Rodrigues",
    publication: "Kluwer Mediation Blog",
    url: "https://legalblogs.wolterskluwer.com/mediation-blog/negotiating-in-blind-faith/",
  },
];

const recommendedReads = [
  {
    title: "State-Sponsored Mediation",
    author: "Jonathan Rodrigues",
    publication: "New York Dispute Resolution Lawyer",
    type: "PDF",
    url: "#",
  },
  {
    title: "Transformative Mediation",
    author: "Jonathan Rodrigues",
    publication: "Asian Journal on Mediation",
    type: "PDF",
    url: "#",
  },
  {
    title: "Mediation Moves in Scotland",
    author: "Jonathan Rodrigues",
    publication: "Wolfgang Metzner Verlag",
    type: "PDF",
    url: "#",
  },
  {
    title: "Our Purpose as Mediators",
    author: "Jonathan Rodrigues",
    publication: "IMI Blog",
    type: "Link",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:6789161705499856896/",
  },
  {
    title: "Mediation, Mental Health and Mindfulness",
    author: "Jonathan Rodrigues",
    publication: "Kluwer Mediation Blog",
    type: "Link",
    url: "https://legalblogs.wolterskluwer.com/mediation-blog/mediation-mental-health-and-the-age-old-jesuit-practice-of-mindfulness/",
  },
  {
    title: "Pressure-Cooker Mediation",
    author: "Jonathan Rodrigues",
    publication: "Mediatedotcom",
    type: "Link",
    url: "https://mediate.com/pressure-cooker-mediation-stick-to-basics-to-make-a-difference/",
  },
];

const recommendedWatching = [
  {
    title: "Role of a Lawyer",
    type: "TEDx Talk",
    speaker: "Jonathan Rodrigues",
    url: "https://www.youtube.com/watch?v=Cuc1OLtxb3E",
  },
  {
    title: "Mediation Advocacy",
    type: "Vidhi Utsav",
    speaker: "Jonathan Rodrigues",
    url: "https://www.youtube.com/watch?v=E8bgQpQ6dOE",
  },
  {
    title: "Role of Mediation in International Disputes",
    type: "BTIS Law School",
    speaker: "Jonathan Rodrigues",
    url: "https://www.youtube.com/watch?v=nQLB_E2Z3hg",
  },
];

const recommendedBooks = [
  {
    title: "Commercial Mediation",
    author: "Sriram Panchu",
    url: "https://www.amazon.in/Commercial-Mediation-Monograph-Sriram-Panchu/dp/8193966937",
  },
  {
    title: "Conciliation & Mediation in Global Dispute Resolution",
    author: "Gracious Timothy et al.",
    url: "https://www.amazon.in/Conciliation-Mediation-Global-Dispute-Resolution/dp/9403520159",
  },
  {
    title: "Mediation Policy and Practice",
    author: "Chitra Narayan",
    url: "https://www.amazon.in/Mediation-Policy-Practice-Chitra-Narayan-ebook/dp/B092W17JHH",
  },
  {
    title: "The Mediation Process",
    author: "Christopher Moore",
    url: "https://www.amazon.in/Mediation-Process-Practical-Strategies-Resolving-ebook/dp/B00H7JE6U2",
  },
  {
    title: "The Promise of Mediation",
    author: "Robert Bush & Joseph Folger",
    url: "https://www.amazon.in/Promise-Mediation-Transformative-Approach-Conflict-ebook/dp/B000PY4A16",
  },
  {
    title: "Mediating Dangerously",
    author: "Ken Cloke",
    url: "https://www.amazon.in/Mediating-Dangerously-Frontiers-Conflict-Resolution-ebook/dp/B000QF5EWS",
  },
  {
    title: "The Mediator's Handbook",
    author: "Jennifer Beer",
    url: "https://www.amazon.in/Mediators-Handbook-Revised-Expanded-fourth/dp/0865717222",
  },
  {
    title: "The Mediator's Toolkit",
    author: "Gerry O'Sullivan",
    url: "https://www.amazon.in/Mediators-Toolkit-Formulating-Questions-Successful/dp/1774060248",
  },
];

const newsFeatures = [
  {
    title: "Challenges to the Mediation Profession (2020)",
    publication: "SCC Online Times",
    url: "https://www.scconline.com/blog/post/2020/10/31/in-conversation-with-jonathan-rodrigues-on-online-mediation-challenges-and-future-of-profession/",
  },
  {
    title: "PACT as a start-up (2018)",
    publication: "Superlawyer",
    url: "https://superlawyer.in/jonathan-rodrigues-co-founder-pact-challenges-start-up-online-mediation-career-adr/",
  },
];

export default function BlogPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
        <ResourceSubPageHero
          tag="Resources"
          title={<><span className="text-gold-500">Blog</span> & Library</>}
          description="Thoughtful insights, short tutorials, upcoming conferences and recommended literature on mediation and collaborative conflict resolution. If you're looking for practical clarity (not heavy jargon), you're in the right place."
        />

        {/* Submit Guidelines */}
        <section className="py-8 bg-navy-50 border-b border-navy-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <PenLine className="w-6 h-6 text-gold-500" />
                <div>
                  <p className="text-navy-950 font-medium">Submit a Blog</p>
                  <p className="text-navy-950/60 text-sm">
                    Guidelines: 700-800 Words, Reference Picture, Word Format, Endnote: APA Style
                  </p>
                </div>
              </div>
              <a 
                href="mailto:official@thepact.in?subject=Blog Submission"
                className="inline-flex items-center gap-2 bg-navy-950 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-gold-500 hover:text-navy-950 transition-all"
              >
                <Mail className="w-4 h-4" />
                Write to us
              </a>
            </div>
          </div>
        </section>

        {/* PACT Blogs Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Articles
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                PACT <span className="text-gold-500 italic font-medium">Blogs</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pactBlogs.map((blog, i) => (
                <motion.a
                  key={i}
                  href={blog.url}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group p-8 rounded-3xl bg-navy-50 border border-navy-100 hover:bg-white hover:border-gold-500/30 hover:shadow-xl transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-navy-950 flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                      <PenLine className="w-6 h-6 text-gold-500 group-hover:text-navy-950" />
                    </div>
                    <ExternalLink className="w-5 h-5 text-navy-950/30 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <h3 className="text-xl font-medium text-navy-950 mb-2 group-hover:text-gold-500 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-navy-950/60 text-sm font-light mb-1">{blog.author}</p>
                  <p className="text-gold-500/70 text-xs font-mono uppercase tracking-widest">{blog.publication}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Reads Section */}
        <section className="py-20 md:py-32 bg-navy-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Publications
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                Recommended <span className="text-gold-500 italic font-medium">Reads</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedReads.map((read, i) => (
                <motion.a
                  key={i}
                  href={read.url}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.05 }}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-navy-100 hover:border-gold-500/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-navy-950 flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors">
                    {read.type === "PDF" ? (
                      <FileText className="w-5 h-5 text-gold-500 group-hover:text-navy-950" />
                    ) : (
                      <ExternalLink className="w-5 h-5 text-gold-500 group-hover:text-navy-950" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-medium text-navy-950 mb-1 group-hover:text-gold-500 transition-colors truncate">
                      {read.title}
                    </h3>
                    <p className="text-navy-950/60 text-sm font-light truncate">{read.publication}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Watching Section */}
        <section className="py-20 md:py-32 bg-navy-950 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 justify-center">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Videos
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
                Recommended <span className="text-gold-500 italic font-medium">Watching</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedWatching.map((video, i) => (
                <motion.a
                  key={i}
                  href={video.url}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF0000]/20 flex items-center justify-center group-hover:bg-[#FF0000] transition-colors">
                      <Youtube className="w-6 h-6 text-[#FF0000] group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1 rounded-full">
                      {video.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-2 group-hover:text-gold-500 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-white/60 text-sm font-light">{video.speaker}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Books Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Library
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                Recommended <span className="text-gold-500 italic font-medium">Books</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedBooks.map((book, i) => (
                <motion.a
                  key={i}
                  href={book.url}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group p-6 rounded-2xl bg-navy-50 border border-navy-100 hover:bg-white hover:border-gold-500/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500 transition-colors">
                    <BookOpen className="w-5 h-5 text-gold-500 group-hover:text-navy-950" />
                  </div>
                  <h3 className="text-base font-medium text-navy-950 mb-1 group-hover:text-gold-500 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-navy-950/60 text-sm font-light">{book.author}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* News Features Section */}
        <section className="py-20 md:py-32 bg-navy-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <FadeInUp className="mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                  Press
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                News <span className="text-gold-500 italic font-medium">Features</span>
              </h2>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsFeatures.map((news, i) => (
                <motion.a
                  key={i}
                  href={news.url}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group flex items-center gap-6 p-6 md:p-8 rounded-2xl bg-white border border-navy-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-navy-950 flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors">
                    <Quote className="w-6 h-6 text-gold-500 group-hover:text-navy-950" />
                  </div>
                  <div className="grow min-w-0">
                    <h3 className="text-lg md:text-xl font-medium text-navy-950 mb-1 group-hover:text-gold-500 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gold-500/70 text-sm font-mono uppercase tracking-widest">{news.publication}</p>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-navy-950/30 group-hover:text-gold-500 transition-colors shrink-0" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>
        
        <Footer />
      </FadeIn>
    </main>
  );
}
