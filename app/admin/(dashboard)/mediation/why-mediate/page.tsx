"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Clock, Handshake } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Using the exported functions directly since I named them as follows:
import { WhyPointsTable } from "./WhyPointsTable";
import { ResolutionStepsTable } from "./ResolutionStepsTable";

export default function WhyMediateManagement() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link 
          href="/admin/mediation" 
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Mediation Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-navy-950 flex items-center gap-3">
          <Handshake className="w-10 h-10 text-accent" />
          Why Mediate
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Manage the content for the "Why Mediate" section, including advantage points and the resolution roadmap steps.
        </p>
      </div>

      <Tabs defaultValue="points" className="w-full">
        <TabsList className="bg-navy-50 p-1 rounded-2xl mb-8">
          <TabsTrigger value="points" className="rounded-xl px-8 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Mediation Points
          </TabsTrigger>
          <TabsTrigger value="steps" className="rounded-xl px-8 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Clock className="w-4 h-4 mr-2" />
            Resolution Steps
          </TabsTrigger>
        </TabsList>

        <TabsContent value="points" className="mt-0">
          <WhyPointsTable />
        </TabsContent>
        <TabsContent value="steps" className="mt-0">
          <ResolutionStepsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
