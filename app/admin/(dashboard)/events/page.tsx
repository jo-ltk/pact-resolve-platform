"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Trophy, Image as ImageIcon, Edit } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { MCIEvent } from "@/lib/db/schemas";

export default function EventsDashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const eventCategories = [
    {
      title: "Mediation Champions League",
      description: "Manage seasons, gallery, and details for the league.",
      icon: Trophy,
      link: "/admin/events/mci",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "Mission Mediation Conclave",
      description: "Manage conclave editions and details.",
      icon: ImageIcon,
      link: "/admin/events/conclave",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "National Impact Awards",
      description: "Manage award ceremonies and winners.",
      icon: Trophy,
      link: "/admin/events/awards",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Advocate Maximus",
      description: "Manage Advocate Maximus events.",
      icon: Calendar,
      link: "/admin/events/advocate-maximus",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Events & Projects",
      description: "General events and special projects.",
      icon: Calendar,
      link: "/admin/events/general",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3"><Calendar className="w-8 h-8 text-accent" /> Events Management</h1>
        <p className="text-muted-foreground">Select an event category to manage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventCategories.map((cat, i) => (
          <Link key={i} href={cat.link} className="group">
             <Card className="h-full border-none shadow-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
               <CardContent className="p-8 flex flex-col items-center text-center gap-4 h-full">
                 <div className={`w-20 h-20 rounded-full ${cat.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500`}>
                   <cat.icon className={`w-10 h-10 ${cat.color}`} />
                 </div>
                 <h3 className="text-xl font-bold text-navy-950">{cat.title}</h3>
                 <p className="text-muted-foreground text-sm">{cat.description}</p>
                 <div className="mt-auto pt-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                       Manage Event <Edit className="w-3 h-3" />
                    </span>
                 </div>
               </CardContent>
             </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
