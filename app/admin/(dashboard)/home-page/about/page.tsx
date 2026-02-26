"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Save, Loader2, ArrowLeft, Info, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { AboutPactSettings } from "@/lib/db/schemas";

const defaultSettings: Partial<AboutPactSettings> = {
  title: "About PACT",
  subtitle1: "Chapter One",
  subtitle2: "The Legacy",
  description: "Founded on the principles of excellence and innovation, PACT has transformed the landscape of mediation. Our journey is a testament to the power of collaborative conflict resolution.",
  stats: [
    { label: "Cases Resolved", value: "2500+", order: 1 },
    { label: "Success Rate", value: "98%", order: 2 },
    { label: "Global Chapters", value: "15+", order: 3 },
    { label: "Trained Neutrals", value: "5000+", order: 4 },
  ],
  journeyImage: { url: "/images/pact-journey.png", alt: "Journey with The PACT" },
  journeyLabel: "Interactive Timeline 2015 - 2026",
  isActive: true,
};

export default function AboutPactAdmin() {
  const { token } = useAuth();
  const [settings, setSettings] = useState<Partial<AboutPactSettings>>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/content/about-pact");
      const result = await res.json();
      if (result.success && result.data) {
        setSettings(result.data);
      }
    } catch {
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/content/about-pact", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(settings),
      });
      if ((await res.json()).success) {
        toast.success("Settings saved");
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const addStat = () => {
    setSettings({
      ...settings,
      stats: [...(settings.stats || []), { label: "", value: "", order: (settings.stats?.length || 0) + 1 }],
    });
  };

  const removeStat = (index: number) => {
    setSettings({
      ...settings,
      stats: settings.stats?.filter((_, i) => i !== index),
    });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...(settings.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    setSettings({ ...settings, stats: newStats });
  };

  if (isLoading) return <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col gap-4">
        <Link href="/admin/home-page" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold flex items-center gap-3"><Info className="w-8 h-8 text-cyan-600" /> About PACT</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>Main Content</CardTitle>
            <CardDescription>Headings and descriptions for the About section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Subtitle 1</Label><Input value={settings.subtitle1} onChange={e => setSettings({...settings, subtitle1: e.target.value})} /></div>
              <div className="space-y-2"><Label>Subtitle 2</Label><Input value={settings.subtitle2} onChange={e => setSettings({...settings, subtitle2: e.target.value})} /></div>
            </div>
            <div className="space-y-2"><Label>Title</Label><Input value={settings.title} onChange={e => setSettings({...settings, title: e.target.value})} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={settings.description} onChange={e => setSettings({...settings, description: e.target.value})} className="min-h-[100px]" /></div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Impact Statistics</CardTitle>
              <CardDescription>Number counts displayed above the journey image</CardDescription>
            </div>
            <Button type="button" onClick={addStat} variant="outline" size="sm" className="rounded-full"><Plus className="w-4 h-4 mr-2" /> Add Stat</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.stats?.map((stat, i) => (
              <div key={i} className="flex gap-4 items-end p-4 bg-muted/20 rounded-2xl group">
                <div className="space-y-2 grow"><Label>Label</Label><Input value={stat.label} onChange={e => updateStat(i, "label", e.target.value)} placeholder="e.g. Trained Users" /></div>
                <div className="space-y-2 grow"><Label>Value</Label><Input value={stat.value} onChange={e => updateStat(i, "value", e.target.value)} placeholder="e.g. 17,000+" /></div>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeStat(i)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>Journey Timeline</CardTitle>
            <CardDescription>The large timeline image and its label</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Timeline Image Label</Label><Input value={settings.journeyLabel} onChange={e => setSettings({...settings, journeyLabel: e.target.value})} /></div>
            <ImageUpload label="Timeline Image" value={settings.journeyImage?.url} onChange={url => setSettings({...settings, journeyImage: {url, alt: settings.journeyLabel || "Journey"}})} />
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" disabled={isSaving} className="rounded-full px-10 bg-navy-950">
            {isSaving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
