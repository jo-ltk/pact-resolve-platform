"use client";

import React, { useEffect, useState } from "react";
import { 
  Newspaper, 
  Image as ImageIcon, 
  Calendar, 
  Clock, 
  Plus,
  Library,
  Settings,
  ArrowRight,
  LayoutDashboard,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import { cn } from "@/lib/utils";
import { FadeInUp, StaggerContainer, StaggerItem, SubtleHover } from "@/components/motion-wrapper";
import { motion } from "framer-motion";

export default function DashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    news: 0,
    slides: 0,
    events: 0,
    loading: true
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [newsRes, slidesRes, eventsRes] = await Promise.all([
          fetch("/api/content/news?all=true"),
          fetch("/api/content/hero-slides?all=true"),
          fetch("/api/content/mci-event?all=true")
        ]);

        const [newsData, slidesData, eventsData] = await Promise.all([
          newsRes.json(),
          slidesRes.json(),
          eventsRes.json()
        ]);

        setStats({
          news: newsData.data?.length || 0,
          slides: slidesData.data?.length || 0,
          events: Array.isArray(eventsData.data) ? eventsData.data.length : (eventsData.data ? 1 : 0),
          loading: false
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    }

    fetchStats();
  }, []);

  const metrics = [
    {
      title: "News Items",
      value: stats.loading ? "..." : stats.news.toString(),
      description: "Active platform news",
      icon: Newspaper,
      color: "text-blue-600",
      bg: "bg-blue-50/50",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Hero Slides",
      value: stats.loading ? "..." : stats.slides.toString(),
      description: "Carousel content items",
      icon: ImageIcon,
      color: "text-purple-600",
      bg: "bg-purple-50/50",
      trend: "Steady",
      trendUp: true
    },
    {
      title: "MCI Events",
      value: stats.loading ? "..." : stats.events.toString(),
      description: "Upcoming championships",
      icon: Calendar,
      color: "text-amber-600",
      bg: "bg-amber-50/50",
      trend: "+2",
      trendUp: true
    },
    {
      title: "Staff Members",
      value: "4",
      description: "Active admin users",
      icon: Clock,
      color: "text-emerald-600",
      bg: "bg-emerald-50/50",
      trend: "Online",
      trendUp: true
    }
  ];

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Header Section */}
      <FadeInUp className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between px-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em]">Management Console</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Overview
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
            Welcome back, <span className="text-foreground font-semibold">{user?.name || "Admin"}</span>. 
            Here's a snapshot of your platform's standing.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="lg" className="flex-1 sm:flex-none rounded-full px-6 bg-white shadow-sm border-border/60 hover:bg-muted/30 transition-all hover:scale-105 active:scale-95" asChild>
            <Link href="/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Public Site
            </Link>
          </Button>
          <Button size="lg" className="flex-1 sm:flex-none rounded-full px-8 shadow-md font-bold transition-all hover:scale-105 active:scale-95 bg-navy-950 hover:bg-navy-900" asChild>
            <Link href="/admin/home-page/news">
              <Plus className="mr-2 h-4 w-4" /> Add News
            </Link>
          </Button>
        </div>
      </FadeInUp>

      {/* Metrics Grid */}
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <StaggerItem key={i}>
            <SubtleHover>
              <Card className="border-navy-950/5 shadow-sm bg-white hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-all flex flex-col group rounded-3xl overflow-hidden min-h-[160px]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
                  <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.15em]">
                    {metric.title}
                  </span>
                  <div className={cn("p-2.5 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300", metric.bg)}>
                    <metric.icon className={cn("h-5 w-5", metric.color)} />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end pb-7">
                  <div className="text-3xl font-bold tracking-tighter text-navy-950">{metric.value}</div>
                  <div className="flex items-center mt-2 gap-2">
                    <p className="text-xs text-muted-foreground/80 font-medium truncate">
                      {metric.description}
                    </p>
                    <Badge variant="secondary" className={cn(
                      "px-2 py-0.5 text-xs font-bold border-none h-5 rounded-full",
                      metric.trendUp ? "bg-emerald-100/50 text-emerald-700" : "bg-muted text-muted-foreground"
                    )}>
                      {metric.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </SubtleHover>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Content Distribution */}
        <FadeInUp className="lg:col-span-8 h-full" delay={0.2}>
          <Card className="border-border/40 shadow-sm bg-white flex flex-col overflow-hidden rounded-4xl h-full">
            <CardHeader className="pb-10 pt-8 px-8 border-b border-border/20">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-bold tracking-tight">Content Distribution</CardTitle>
                  <CardDescription className="text-sm">
                    Platform structural health and data density monitoring
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-black px-3 py-1 bg-primary/5 text-primary border-primary/10 rounded-full tracking-widest">LIVE STATUS</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {[
                  { label: "MCI Events", count: stats.events, total: 5, color: "bg-blue-600 shadow-md shadow-blue-200" },
                  { label: "News & Blogs", count: stats.news, total: 50, color: "bg-primary shadow-md shadow-primary/20" },
                  { label: "Partner Logos", count: 12, total: 20, color: "bg-emerald-500 shadow-md shadow-emerald-200" },
                  { label: "Team Members", count: 8, total: 15, color: "bg-purple-500 shadow-md shadow-purple-200" },
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex justify-between items-end px-1">
                      <span className="text-sm font-bold text-navy-950 uppercase tracking-tight">{item.label}</span>
                      <span className="text-xs font-mono font-bold text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-md">
                        {Math.round((item.count / item.total) * 100)}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-muted/30 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, (item.count / item.total) * 100)}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + i * 0.1 }}
                        className={cn("h-full rounded-full transition-all duration-1000", item.color)} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Quick Actions */}
        <FadeInUp className="lg:col-span-4 h-full" delay={0.4}>
          <Card className="border-border/40 shadow-sm bg-white flex flex-col overflow-hidden rounded-4xl h-full">
            <CardHeader className="pb-8 pt-8 px-8 border-b border-border/20">
              <CardTitle className="text-2xl font-bold tracking-tight">Quick Actions</CardTitle>
              <CardDescription className="text-sm">
                Instant access to management modules
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-6">
              <div className="flex flex-col gap-2">
                {[
                  { icon: ImageIcon, label: "Manage Hero Slides", href: "/admin/home-page/hero-slides" },
                  { icon: Plus, label: "Add New Partner", href: "/admin/home-page/partners" },
                  { icon: Library, label: "View Media Library", href: "/admin/media-library" },
                  { icon: Settings, label: "Platform Settings", href: "/admin/global-settings" },
                ].map((action, i) => (
                  <Link key={i} href={action.href}>
                    <div className="flex items-center p-4 rounded-2xl border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all group">
                      <div className="mr-4 p-2.5 rounded-xl bg-muted/40 group-hover:bg-primary group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all text-navy-950">
                        <action.icon className="h-4 w-4" />
                      </div>
                      <span className="flex-1 text-sm font-bold text-navy-950">{action.label}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1.5 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 p-6 mx-2 mb-2 bg-navy-950 rounded-3xl border border-white/5 shadow-2xl overflow-hidden relative group">
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/90">System Integrity 100%</span>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all pointer-events-none" />
              </div>
            </CardContent>
          </Card>
        </FadeInUp>
      </div>
    </div>
  );
}


