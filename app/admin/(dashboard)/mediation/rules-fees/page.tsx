"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RulesTable } from "./RulesTable";
import { FeesTable } from "./FeesTable";
import { GeneralSettings } from "./GeneralSettings";
import { Settings2 } from "lucide-react";

export default function RulesFeesManagement() {
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
          <FileText className="w-10 h-10 text-accent" />
          Rules & Fees
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Manage the procedural rules, fee structures, and downloadable documents for mediation services.
        </p>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="bg-navy-50 p-1 rounded-2xl mb-8">
          <TabsTrigger value="settings" className="rounded-xl px-8 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Settings2 className="w-4 h-4 mr-2" />
            General Settings
          </TabsTrigger>
          <TabsTrigger value="rules" className="rounded-xl px-8 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Mediation Rules
          </TabsTrigger>
          <TabsTrigger value="fees" className="rounded-xl px-8 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Scale className="w-4 h-4 mr-2" />
            Mediation Fees
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="mt-0">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="rules" className="mt-0">
          <RulesTable />
        </TabsContent>
        <TabsContent value="fees" className="mt-0">
          <FeesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
