"use client";

import React, { useEffect, useState } from "react";
import { 
  Save, 
  Loader2, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Send,
  ExternalLink,
  MessageCircle,
  Hash,
  ArrowUpDown
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/context/AuthContext";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

interface FooterQuickLink {
  label: string;
  href: string;
  order: number;
}

interface SocialLink {
  platform: "facebook" | "linkedin" | "instagram" | "youtube" | "twitter" | "whatsapp";
  url: string;
  enabled: boolean;
}

interface FooterSettingsData {
  tagline: string;
  socialLinks: SocialLink[];
  quickLinks: FooterQuickLink[];
  newsletter: {
    enabled: boolean;
    heading: string;
    description: string;
    buttonText: string;
  };
  copyrightText: string;
}

const defaultSettings: FooterSettingsData = {
  tagline: "Mediation Academy & Institutional Mediation Services",
  socialLinks: [
    { platform: "facebook", url: "", enabled: true },
    { platform: "linkedin", url: "", enabled: true },
    { platform: "instagram", url: "", enabled: true },
    { platform: "youtube", url: "", enabled: true },
    { platform: "whatsapp", url: "", enabled: true },
  ],
  quickLinks: [
    { label: "Privacy Policy", href: "/privacy", order: 1 },
    { label: "Terms of Service", href: "/terms", order: 2 },
  ],
  newsletter: {
    enabled: true,
    heading: "Subscribe to our Newsletter",
    description: "Stay updated with the latest in mediation",
    buttonText: "Subscribe",
  },
  copyrightText: `© ${new Date().getFullYear()} PACT. All Rights Reserved.`,
};

export default function FooterSettingsPage() {
  const { token, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<FooterSettingsData>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/content/footer");
      const result = await response.json();
      
      if (!result.success) {
        if (response.status === 404) {
          setIsEmpty(true);
          setSettings(defaultSettings);
          return;
        }
        setError(result.error || "Failed to load settings");
        toast.error(result.error || "Failed to load settings");
        return;
      }
      
      if (!result.data) {
        setIsEmpty(true);
        setSettings(defaultSettings);
      } else {
        setIsEmpty(false);
        setSettings({
          tagline: result.data.tagline || defaultSettings.tagline,
          socialLinks: result.data.socialLinks || defaultSettings.socialLinks,
          quickLinks: result.data.quickLinks || defaultSettings.quickLinks,
          newsletter: result.data.newsletter || defaultSettings.newsletter,
          copyrightText: result.data.copyrightText || defaultSettings.copyrightText,
        });
      }
    } catch (err) {
      console.error("[FooterSettings Page] Fetch error:", err);
      setError("Failed to connect to server");
      toast.error("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error("You don't have permission to change these settings.");
      return;
    }
    
    setIsSaving(true);
    try {
      const response = await fetch("/api/content/footer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success("Footer settings updated successfully");
        setIsEmpty(false);
        setHasChanges(false);
      } else {
        toast.error(result.error || "Failed to update settings");
      }
    } catch (err) {
      console.error("[FooterSettings Page] Save error:", err);
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof FooterSettingsData, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const updateNewsletter = (field: keyof FooterSettingsData["newsletter"], value: any) => {
    setSettings(prev => ({
      ...prev,
      newsletter: { ...prev.newsletter, [field]: value }
    }));
    setHasChanges(true);
  };

  const addQuickLink = () => {
    const nextOrder = settings.quickLinks.length > 0 
      ? Math.max(...settings.quickLinks.map(l => l.order)) + 1 
      : 1;
    setSettings(prev => ({
      ...prev,
      quickLinks: [...prev.quickLinks, { label: "", href: "", order: nextOrder }]
    }));
    setHasChanges(true);
  };

  const removeQuickLink = (index: number) => {
    setSettings(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  };

  const updateQuickLink = (index: number, field: keyof FooterQuickLink, value: any) => {
    setSettings(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
    setHasChanges(true);
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: any) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
    setHasChanges(true);
  };

  const platformIcons: Record<string, any> = {
    facebook: Facebook,
    linkedin: Linkedin,
    instagram: Instagram,
    youtube: Youtube,
    whatsapp: MessageCircle,
    twitter: Hash
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10 pb-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Header Section */}
      <FadeInUp className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em]">Website Configuration</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Footer Settings
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Manage links, social media, and copyright information shown at the bottom of every page.
          </p>
        </div>
      </FadeInUp>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Quick Links Card */}
        <FadeInUp delay={0.1}>
          <Card className="border-border/40 shadow-sm bg-white rounded-4xl overflow-hidden">
            <CardHeader className="pb-6 pt-8 px-8 border-b border-border/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                    <LinkIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight">Quick Links</CardTitle>
                    <CardDescription className="text-sm mt-0.5">
                      Navigation links shown in the footer
                    </CardDescription>
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={addQuickLink}
                  className="rounded-full px-5 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {settings.quickLinks.length === 0 ? (
                <div className="text-center py-12 px-6">
                  <p className="text-muted-foreground">No quick links added yet.</p>
                </div>
              ) : (
                <StaggerContainer className="space-y-4">
                  {settings.quickLinks.sort((a, b) => a.order - b.order).map((link, index) => (
                    <StaggerItem key={index}>
                      <div className="p-5 border border-border/40 rounded-2xl bg-muted/10 hover:border-primary/20 hover:bg-muted/20 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                              {index + 1}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              Link Item
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuickLink(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Label</Label>
                            <Input
                              value={link.label}
                              onChange={(e) => updateQuickLink(index, "label", e.target.value)}
                              placeholder="e.g. Privacy Policy"
                              className="rounded-xl h-10 border-border/60"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">URL (Internal or External)</Label>
                            <Input
                              value={link.href}
                              onChange={(e) => updateQuickLink(index, "href", e.target.value)}
                              placeholder="e.g. /privacy or https://..."
                              className="rounded-xl h-10 border-border/60"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Display Order</Label>
                            <div className="relative">
                              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                              <Input
                                type="number"
                                value={link.order}
                                onChange={(e) => updateQuickLink(index, "order", parseInt(e.target.value) || 0)}
                                className="pl-9 rounded-xl h-10 border-border/60"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Branding & Tagline Card */}
        <FadeInUp delay={0.2}>
          <Card className="border-border/40 shadow-sm bg-white rounded-4xl overflow-hidden">
            <CardHeader className="pb-6 pt-8 px-8 border-b border-border/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-amber-100 text-amber-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold tracking-tight">Footer Content</CardTitle>
                  <CardDescription className="text-sm mt-0.5">
                    General text shown in the footer areas
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tagline" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Footer Description / Tagline
                </Label>
                <Textarea 
                  id="tagline"
                  value={settings.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  placeholder="The text shown under the logo..."
                  className="rounded-xl min-h-[80px] border-border/60 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="copyrightText" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Copyright Text
                </Label>
                <Input 
                  id="copyrightText"
                  value={settings.copyrightText}
                  onChange={(e) => updateField("copyrightText", e.target.value)}
                  placeholder="© 2026 PACT. All Rights Reserved."
                  className="rounded-xl h-12 border-border/60 focus:border-primary"
                />
              </div>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Social Links Card */}
        <FadeInUp delay={0.3}>
          <Card className="border-border/40 shadow-sm bg-white rounded-4xl overflow-hidden">
            <CardHeader className="pb-6 pt-8 px-8 border-b border-border/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-600">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold tracking-tight">Social Presence</CardTitle>
                  <CardDescription className="text-sm mt-0.5">
                    Connect your social media platforms
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid gap-6">
                {settings.socialLinks.map((social, index) => {
                  const Icon = platformIcons[social.platform.toLowerCase()] || ExternalLink;
                  return (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl border border-border/40 bg-muted/5 group transition-colors hover:bg-muted/10">
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <div className="p-2 rounded-lg bg-white border border-border/60">
                          <Icon className="w-4 h-4 text-navy-950" />
                        </div>
                        <span className="font-bold text-sm capitalize">{social.platform}</span>
                      </div>
                      <Input 
                        value={social.url}
                        onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                        placeholder={`https://${social.platform}.com/...`}
                        className="grow rounded-xl h-10 border-border/60"
                      />
                      <div className="flex items-center gap-2 px-2">
                        <Label htmlFor={`enabled-${index}`} className="text-xs text-muted-foreground whitespace-nowrap">
                          {social.enabled ? "Enabled" : "Disabled"}
                        </Label>
                        <Switch 
                          id={`enabled-${index}`}
                          checked={social.enabled}
                          onCheckedChange={(checked) => updateSocialLink(index, "enabled", checked)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Newsletter Settings Card */}
        <FadeInUp delay={0.4}>
          <Card className="border-border/40 shadow-sm bg-white rounded-4xl overflow-hidden">
            <CardHeader className="pb-6 pt-8 px-8 border-b border-border/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight">Newsletter Section</CardTitle>
                    <CardDescription className="text-sm mt-0.5">
                      Configure the email subscription area
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Label htmlFor="newsletter-enabled" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Section Enabled
                  </Label>
                  <Switch 
                    id="newsletter-enabled"
                    checked={settings.newsletter.enabled}
                    onCheckedChange={(checked) => updateNewsletter("enabled", checked)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className={cn("p-8 space-y-6 transition-opacity", !settings.newsletter.enabled && "opacity-50 pointer-events-none")}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Heading</Label>
                  <Input 
                    value={settings.newsletter.heading}
                    onChange={(e) => updateNewsletter("heading", e.target.value)}
                    className="rounded-xl h-12 border-border/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Button Text</Label>
                  <Input 
                    value={settings.newsletter.buttonText}
                    onChange={(e) => updateNewsletter("buttonText", e.target.value)}
                    className="rounded-xl h-12 border-border/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</Label>
                <Input 
                  value={settings.newsletter.description}
                  onChange={(e) => updateNewsletter("description", e.target.value)}
                  className="rounded-xl h-12 border-border/60"
                />
              </div>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Save Footer */}
        <FadeInUp delay={0.5}>
          <div className="p-8 bg-navy-950 rounded-4xl border border-white/5 shadow-2xl overflow-hidden relative">
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  hasChanges 
                    ? "bg-amber-400 animate-pulse"
                    : "bg-emerald-400"
                )} />
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/90">
                    {hasChanges ? "Unsaved Changes" : "All Changes Saved"}
                  </span>
                  <p className="text-white/50 text-xs mt-0.5">
                    Settings are currently {isEmpty ? "uninitialized" : "in sync"}
                  </p>
                </div>
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="rounded-full px-8 bg-white text-navy-950 hover:bg-white/90 font-bold transition-all shadow-lg"
                disabled={isSaving || !isAdmin}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Footer Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </FadeInUp>
      </form>
    </div>
  );
}
