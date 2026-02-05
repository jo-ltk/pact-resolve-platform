"use client";

import React from "react";
import Link from "next/link";
import { LucideIcon, ArrowRight, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StaggerItem, SubtleHover } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

interface DashboardSectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
  bg: string;
}

export function DashboardSectionCard({
  title,
  description,
  icon,
  link,
  color,
  bg
}: DashboardSectionCardProps) {
  return (
    <StaggerItem className="h-full">
      <SubtleHover className="h-full">
        <Link href={link} className="block h-full">
          <Card className="border-navy-950/5 shadow-sm bg-white hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-all flex flex-col group rounded-3xl md:rounded-4xl overflow-hidden h-full min-h-[240px] md:min-h-[280px]">
            <CardContent className="p-6 md:p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm", bg)}>
                  {icon}
                </div>
                <div className="p-2 rounded-full bg-muted/30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-navy-950 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[90%]">
                  {description}
                </p>
              </div>

              <div className="mt-auto pt-6 flex items-center gap-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors">
                    Manage Section
                 </span>
                 <div className="h-px flex-1 bg-border/40 group-hover:bg-primary/20 transition-colors" />
                 <Edit className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </SubtleHover>
    </StaggerItem>
  );
}
