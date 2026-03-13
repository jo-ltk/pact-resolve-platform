"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Save, Loader2, Layout, FileText, Type } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/admin/FileUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { NmrSettings } from "@/lib/db/schemas";
import Link from "next/link";

export default function NmrSettingsPage() {
  const { token } = useAuth();
  const [settings, setSettings] = useState<Partial<NmrSettings>>({
    pdfUrl: "",
    heroTitle: "",
    heroDescription: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/nmr-settings");
      const result = await res.json();
      if (result.success && result.data) {
        setSettings(result.data);
      }
    } catch {
      toast.error("Failed to load NMR settings");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/content/nmr-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Settings updated successfully");
        fetchSettings();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-navy-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link
            href="/admin/resources/nmr"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to NMR Items
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-navy-950">
            <Layout className="w-8 h-8 text-gold-500" />
            NMR Page Settings
          </h1>
          <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest">
            Manage Hero Section & Main PDF Document
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-4xl space-y-8">
        <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
          <CardContent className="p-8 md:p-12 space-y-10">
            {/* PDF Upload Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-navy-50">
                <FileText className="w-5 h-5 text-gold-500" />
                <h3 className="text-lg font-bold text-navy-950">Main PDF Resource</h3>
              </div>
              <FileUpload
                value={settings.pdfUrl}
                onChange={(url) => setSettings((prev) => ({ ...prev, pdfUrl: url }))}
                label="Full Review PDF"
                description="Upload the complete National Mediation Review document (PDF only)"
              />
            </div>

            {/* Content Customization */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-2 border-b border-navy-50">
                <Type className="w-5 h-5 text-gold-500" />
                <h3 className="text-lg font-bold text-navy-950">Hero Section Content</h3>
              </div>
              
              <div className="grid gap-8">
                <div className="space-y-3">
                  <Label className="text-xs uppercase tracking-[0.2em] font-black text-navy-950/40 ml-1">Hero Title (Optional)</Label>
                  <Input
                    value={settings.heroTitle || ""}
                    onChange={(e) => setSettings((prev) => ({ ...prev, heroTitle: e.target.value }))}
                    placeholder="Defaults to: National Mediation Review"
                    className="h-14 rounded-2xl bg-navy-50/50 border-none focus-visible:ring-gold-500/20 text-lg font-light"
                  />
                  <p className="text-xs text-muted-foreground ml-1 italic">Leave empty to use default: National Mediation Review</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs uppercase tracking-[0.2em] font-black text-navy-950/40 ml-1">Hero Description</Label>
                  <Textarea
                    value={settings.heroDescription || ""}
                    onChange={(e) => setSettings((prev) => ({ ...prev, heroDescription: e.target.value }))}
                    placeholder="Describe this edition of the review..."
                    className="min-h-[120px] rounded-2xl bg-navy-50/50 border-none focus-visible:ring-gold-500/20 text-md font-light leading-relaxed"
                  />
                  <p className="text-xs text-muted-foreground ml-1 italic">This appears below the title in the dark hero section.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button 
                type="submit" 
                disabled={isSaving}
                className="h-14 px-12 rounded-2xl bg-navy-950 hover:bg-navy-900 text-white font-bold tracking-wide transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-navy-950/10"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-3" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-3" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
