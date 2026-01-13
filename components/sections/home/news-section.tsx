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
    type: "Podcast",
    title: "Mediation in India | Attorney General R. Venkataramani, with Jonathan Rodrigues & Soni Singh",
    date: "Aug 24, 2025",
    image: "/news/mission-mediation-podcast.png",
    link: "https://www.youtube.com/watch?v=eJZeUtoIBpQ"
  },
  {
    type: "Article",
    title: "What is Our Purpose as Mediators? by Jonathan Rodrigues",
    date: "Apr 12, 2021",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80",
    link: "https://imimediation.org/2021/04/12/what-is-our-purpose-as-mediators/"
  },
  {
    type: "Podcast",
    title: "Did your lawyer mention multi-door dispute resolution system? | Jonathan Rodrigues | TEDxPanaji",
    date: "Dec 10, 2025",
    image: "/news/tedx-panaji.png",
    link: "https://www.youtube.com/watch?v=Cuc1OLtxb3E"
  },
  {
    type: "Blog",
    title: "Commercial Mediation – How Do You Bill?",
    date: "Dec 16, 2024",
    image: "/news/commercial-mediation-billing.jpg",
    link: "https://www.barandbench.com/columns/commercial-mediation-how-do-you-bill"
  },
  {
    type: "Article",
    title: "State-Sponsored Mediation Around the World: Does It Support the Parties' Interests?",
    date: "Jan 2024",
    image: "/news/state-sponsored-mediation.png",
    link: "https://nysba.org/new-york-dispute-resolution-lawyer-vol-17-no-1/"
  },
  {
    type: "Book",
    title: "Mediation Simplified – An Interactive Workbook by Nisshant Laroia & Jonathan Rodrigues",
    date: "2024",
    image: "/news/mediation-simplified-book.jpg",
    link: "https://www.amazon.in/Mediation-Simplified-Interactive-Workbook-Nisshant/dp/9395764325"
  }
];

// Reusable Card Component
function NewsCard({ item }: { item: typeof newsItems[0] }) {
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="group block h-full">
      <div className="flex flex-col h-full bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1">
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain md:object-cover transition-transform duration-500 group-hover:scale-110"
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
    </a>
  );
}

export function NewsSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-black/5 pb-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-black leading-tight">
              PACT NEWS – GET WITH IT
            </h2>
            <p className="mt-4 text-black/60 font-mono text-[10px] md:text-sm uppercase tracking-widest leading-relaxed">
              Focussed Articles • Events • Press Releases • Podcasts • Blogs
            </p>
          </div>
        </div>

        {/* Mobile View: Vertical Stack */}
        <div className="flex flex-col gap-8 md:hidden">
          {newsItems.map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}
        </div>

        {/* Desktop View: Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="hidden md:block w-full"
        >
          <CarouselContent className="-ml-4">
            {newsItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <NewsCard item={item} />
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
