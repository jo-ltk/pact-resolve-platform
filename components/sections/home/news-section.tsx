"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const newsItems = [
  {
    type: "Article",
    title: "The Future of Online Mediation in Post-Pandemic Era",
    date: "Dec 12, 2025",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80",
    link: "/news/future-online-mediation"
  },
  {
    type: "Event",
    title: "PACT Annual Conclave 2026: Resolving Global Conflicts",
    date: "Jan 20, 2026",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
    link: "/events/annual-conclave-2026"
  },
  {
    type: "Press Release",
    title: "PACT Partners with International Arbitration Center",
    date: "Nov 28, 2025",
    image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80",
    link: "/news/partnership-iac"
  },
  {
    type: "Podcast",
    title: "Episode 42: Cultural Sensitivity in Mediation",
    date: "Dec 05, 2025",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80",
    link: "/podcast/episode-42"
  },
  {
    type: "Blog",
    title: "5 Tips for Effective Negotiation in Workplace Disputes",
    date: "Nov 15, 2025",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    link: "/blog/negotiation-tips"
  },
  {
    type: "Article",
    title: "Understanding the PACT Mediation Pledge",
    date: "Oct 22, 2025",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80",
    link: "/news/pact-pledge"
  }
];

export function NewsSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-12 border-b border-black/5 pb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black">
              PACT News – Get With It
            </h2>
            <p className="mt-4 text-black/60 font-mono text-sm uppercase tracking-widest">
              Articles • Events • Press Releases • Podcasts • Blogs
            </p>
          </div>
          <Link href="/news" className="hidden md:flex items-center gap-2 group text-sm font-medium">
            View All News <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {newsItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link href={item.link} className="group">
                  <div className="flex flex-col h-full bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-black border-none px-3 py-1">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <span className="text-xs font-mono text-black/40 mb-3">{item.date}</span>
                      <h3 className="text-xl font-medium text-black leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="mt-auto pt-6 flex items-center text-xs font-medium tracking-wide text-black/40 group-hover:text-black transition-colors">
                        Read More <ChevronRight className="ml-2 h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-start gap-4 mt-12">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border-black/10 hover:bg-black hover:text-white transition-all" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border-black/10 hover:bg-black hover:text-white transition-all" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
