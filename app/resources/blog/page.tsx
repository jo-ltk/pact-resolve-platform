"use client";

import Image from "next/image";
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
  Quote,
  Loader2
} from "lucide-react";
import { ResourceSubPageHero } from "@/components/sections/resources/resource-subpage-hero";
import { Footer } from "@/components/footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { FadeIn, FadeInUp } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { type ResourceItem } from "@/lib/db/schemas";

export default function BlogPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/content/resources?all=false');
        const data = await res.json();
        if (data.success) {
          setResources(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch resources", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const blogs = resources.filter(r => r.type === "blog");
  const recommendedReads = resources.filter(r => r.type === "publication");
  const recommendedWatching = resources.filter(r => r.type === "video");
  const recommendedBooks = resources.filter(r => r.type === "book");
  const newsFeatures = resources.filter(r => r.type === "news");

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />
      
      <FadeIn className="relative z-10 w-full">
        <ResourceSubPageHero
          tag="Resources"
          title={<><span className="text-gold-500">Blog</span> & Library</>}
          description="Thoughtful insights, short tutorials, upcoming conferences and recommended literature on mediation and collaborative conflict resolution. If you're looking for practical clarity (not heavy jargon), you're in the right&nbsp;place."
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

        {isLoading ? (
          <div className="py-32 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
          </div>
        ) : (
          <>
            {/* PACT Blogs Section */}
            {blogs.length > 0 && (
              <section className="py-20 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                  <FadeInUp className="mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                      <div className="h-px w-8 bg-gold-500" />
                      <span className="text-gold-500  text-xs tracking-[0.3em] uppercase font-bold">
                        Articles
                      </span>
                      <div className="h-px w-8 bg-gold-500" />
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                      PACT <span className="text-gold-500 italic font-medium">Blogs</span>
                    </h2>
                  </FadeInUp>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogs.map((blog, i) => (
                      <motion.a
                        key={(blog._id as any) || i}
                        href={blog.url || "#"}
                        target="_blank"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="group relative flex flex-col rounded-3xl bg-white border border-navy-100 hover:border-gold-500/30 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                      >
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-navy-50 overflow-hidden">
                          {blog.image ? (
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-16 h-16 rounded-3xl bg-navy-100 flex items-center justify-center text-navy-300 group-hover:scale-110 transition-transform duration-500">
                                <PenLine className="w-8 h-8" />
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/10 transition-colors duration-500" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-1 relative">
                          <div className="flex items-center justify-between mb-6">
                            <div className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
                              <span className="text-[10px] font-black uppercase tracking-widest text-gold-600">
                                {blog.category || "Article"}
                              </span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-navy-950/20 group-hover:text-gold-500 transition-colors" />
                          </div>

                          <h3 className="text-xl font-bold text-navy-950 mb-3 group-hover:text-gold-500 transition-colors line-clamp-2 leading-tight">
                            {blog.title}
                          </h3>
                          
                          <div className="mt-auto pt-6 border-t border-navy-50 flex items-end justify-between">
                            <div className="min-w-0">
                               <p className="text-navy-950/40 text-[10px] font-black uppercase tracking-widest mb-1">Author</p>
                               <p className="text-navy-950 font-bold text-sm truncate">{blog.author || "Jonathan Rodrigues"}</p>
                               <p className="text-gold-500/70 text-[10px] font-medium uppercase tracking-[0.15em] mt-0.5">{blog.publication || blog.subtitle}</p>
                            </div>
                            
                            {blog.logo ? (
                              <div className="w-12 h-12 rounded-xl bg-white border border-navy-100 p-2 shadow-sm shrink-0 flex items-center justify-center group-hover:border-gold-500/30 transition-colors">
                                <Image 
                                  src={blog.logo} 
                                  alt={`${blog.publication || "Publication"} logo`} 
                                  width={40} 
                                  height={40} 
                                  className="object-contain" 
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center text-navy-200 shrink-0">
                                <PenLine className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Recommended Reads Section */}
            {recommendedReads.length > 0 && (
              <section className="py-20 md:py-32 bg-navy-50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                  <FadeInUp className="mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                      <div className="h-px w-8 bg-gold-500" />
                      <span className="text-gold-500  text-xs tracking-[0.3em] uppercase font-bold">
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
                        key={(read._id as any) || i}
                        href={read.url || "#"}
                        target="_blank"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i % 3) * 0.05 }}
                        className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-navy-100 hover:border-gold-500/30 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-navy-950 flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors">
                            <ExternalLink className="w-5 h-5 text-gold-500 group-hover:text-navy-950" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-medium text-navy-950 mb-1 group-hover:text-gold-500 transition-colors truncate">
                            {read.title}
                          </h3>
                          <p className="text-navy-950/60 text-sm font-light truncate">{read.publication || read.subtitle}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Recommended Watching Section */}
            {recommendedWatching.length > 0 && (
              <section className="py-20 md:py-32 bg-navy-950 text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                  <FadeInUp className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6 justify-center">
                      <div className="h-px w-8 bg-gold-500" />
                      <span className="text-gold-500  text-xs tracking-[0.3em] uppercase font-bold">
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
                        key={(video._id as any) || i}
                        href={video.url || "#"}
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
                          {video.subtitle && (
                            <span className="text-xs  uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1 rounded-full">
                              {video.subtitle}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-medium mb-2 group-hover:text-gold-500 transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-white/60 text-sm font-light">{video.author}</p>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Recommended Books Section */}
            {recommendedBooks.length > 0 && (
              <section className="py-20 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                  <FadeInUp className="mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                      <div className="h-px w-8 bg-gold-500" />
                      <span className="text-gold-500  text-xs tracking-[0.3em] uppercase font-bold">
                        Library
                      </span>
                      <div className="h-px w-8 bg-gold-500" />
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight leading-[1.1]">
                      Recommended <span className="text-gold-500 italic font-medium">Books</span>
                    </h2>
                  </FadeInUp>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recommendedBooks.map((book, i) => (
                      <motion.a
                        key={(book._id as any) || i}
                        href={book.url || "#"}
                        target="_blank"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i % 4) * 0.05 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-navy-100 hover:border-gold-500/50 hover:shadow-xl transition-all duration-500"
                      >
                        {/* Book Cover */}
                        <div className="relative aspect-3/4 bg-navy-50 overflow-hidden">
                          {book.image ? (
                            <Image
                              src={book.image}
                              alt={book.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-navy-100 text-navy-300">
                               <BookOpen className="w-12 h-12" />
                            </div>
                          )}
                        </div>
                        {/* Book Info */}
                        <div className="p-4 bg-white">
                          <h3 className="text-sm font-medium text-navy-950 mb-1 group-hover:text-gold-500 transition-colors line-clamp-2">
                            {book.title}
                          </h3>
                          <p className="text-navy-950/50 text-xs font-light line-clamp-1">{book.author}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* News Features Section */}
            {newsFeatures.length > 0 && (
              <section className="py-20 md:py-32 bg-navy-50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                  <FadeInUp className="mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                      <div className="h-px w-8 bg-gold-500" />
                      <span className="text-gold-500  text-xs tracking-[0.3em] uppercase font-bold">
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
                        key={(news._id as any) || i}
                        href={news.url || "#"}
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
                          <p className="text-gold-500/70 text-sm  uppercase tracking-widest">{news.publication || news.subtitle}</p>
                        </div>
                        <ArrowUpRight className="w-6 h-6 text-navy-950/30 group-hover:text-gold-500 transition-colors shrink-0" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
        
        <Footer />
      </FadeIn>
    </main>
  );
}
