"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Newspaper } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsItem } from "@/lib/db/schemas";

// Helper to determine link properties
const getLinkProps = (url: string) => {
  const cleanUrl = url.trim();
  // If it doesn't start with http/https, strip leading slashes and prepend https://
  if (!/^https?:\/\//i.test(cleanUrl)) {
    return { href: `https://${cleanUrl.replace(/^\/+/, "")}`, target: "_blank" };
  }
  return { href: cleanUrl, target: "_blank" };
};

// Reusable Card Component
function NewsCard({ item }: { item: NewsItem }) {
  const imageUrl = item.image?.url || "";
  const { href, target } = getLinkProps(item.link || "#");
  
  const CardContent = (
    <div className="flex flex-col h-full bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1">
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100/50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.image?.alt || item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200">
            <Newspaper className="w-12 h-12 text-slate-400" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-black border-none px-3 py-1 shadow-sm">
            {item.type}
          </Badge>
        </div>
      </div>
      <div className="p-6 flex flex-col grow">
        <span className="text-xs  text-black/40 mb-3">{item.date}</span>
        <h3 className="text-xl font-medium text-black leading-snug group-hover:text-primary transition-colors line-clamp-2" title={item.title}>
          {item.title}
        </h3>
        <div className="mt-auto pt-6 flex items-center text-xs font-medium tracking-wide text-black/40 group-hover:text-black transition-colors">
          Read More <ChevronRight className="ml-2 h-3 w-3" />
        </div>
      </div>
    </div>
  );

  return (
    <a href={href} target={target} rel="noopener noreferrer" className="group block h-full">
      {CardContent}
    </a>
  );
}

function NewsSkeleton() {
  return (
    <div className="flex flex-col h-full bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
      <div className="relative aspect-16/10 bg-slate-100">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-6 flex flex-col grow space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-4 w-32 mt-auto" />
      </div>
    </div>
  );
}

export function NewsSection() {
  const fallbackNews: NewsItem[] = [
    {
      _id: "fallback-news-1" as any,
      title: "The Future of Commercial Mediation in 2026",
      type: "Article",
      date: "MARCH 15, 2026",
      link: "#",
      image: { url: "", alt: "" },
      order: 1,
      isActive: true,
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "fallback-news-2" as any,
      title: "PACT Announces New Strategic Partnership",
      type: "Press Release",
      date: "FEBRUARY 28, 2026",
      link: "#",
      image: { url: "", alt: "" },
      order: 2,
      isActive: true,
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "fallback-news-3" as any,
      title: "Mastering Negotiation Dynamics",
      type: "Blog",
      date: "JANUARY 10, 2026",
      link: "#",
      image: { url: "", alt: "" },
      order: 3,
      isActive: true,
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/content/news");
        const result = await response.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setNews(result.data);
        } else {
          setNews(fallbackNews);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNews(fallbackNews);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (isLoading) {
    return null;
  }
  
  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeInUp className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-black/5 pb-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-black leading-tight uppercase">
              PACT NEWS – GET WITH IT
            </h2>
            <p className="mt-4 text-black/60  text-xs md:text-sm uppercase tracking-widest leading-relaxed">
              Focussed Articles • Events • Press Releases • Podcasts • Blogs
            </p>
          </div>
        </FadeInUp>

        <div className="w-full">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {news.map((item, index) => (
                <CarouselItem key={(item._id as any) || index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <NewsCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-start gap-4 mt-8 md:mt-12">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 md:h-12 md:w-12 border-black/10 hover:bg-black hover:text-white transition-all" />
              <CarouselNext className="static translate-y-0 h-10 w-10 md:h-12 md:w-12 border-black/10 hover:bg-black hover:text-white transition-all" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
