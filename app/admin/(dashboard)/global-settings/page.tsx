"use client";

import React, { useEffect, useState } from "react";
import { 
  Save, 
  Loader2, 
  Settings, 
  Mail, 
  Phone,
  MapPin,
  Building2,
  Plus,
  Trash2,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/context/AuthContext";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

interface ContactPerson {
  name: string;
  phone: string;
  role?: string;
}

interface GlobalSettingsData {
  email: string;
  whatsapp: string;
  contactPersons: ContactPerson[];
  address: string;
  companyName: string;
}

const defaultSettings: GlobalSettingsData = {
  email: "",
  whatsapp: "",
  contactPersons: [],
  address: "",
  companyName: ""
};

export default function GlobalSettingsPage() {
  const { token, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<GlobalSettingsData>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/content/global-settings");
      const result = await response.json();
      
      console.log("[GlobalSettings Page] API Response:", result);
      
      if (!result.success) {
        setError(result.error || "Failed to load settings");
        toast.error(result.error || "Failed to load settings");
        return;
      }
      
      if (result.isEmpty || !result.data) {
        setIsEmpty(true);
        setSettings(defaultSettings);
        toast.info("No settings found. Create your first configuration.");
      } else {
        setIsEmpty(false);
        setSettings({
          email: result.data.email || "",
          whatsapp: result.data.whatsapp || "",
          contactPersons: result.data.contactPersons || [],
          address: result.data.address || "",
          companyName: result.data.companyName || ""
        });
      }
    } catch (err) {
      console.error("[GlobalSettings Page] Fetch error:", err);
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
      const response = await fetch("/api/content/global-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success("Global settings updated successfully");
        setIsEmpty(false);
        setHasChanges(false);
      } else {
        toast.error(result.error || "Failed to update settings");
      }
    } catch (err) {
      console.error("[GlobalSettings Page] Save error:", err);
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof GlobalSettingsData, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const addContactPerson = () => {
    setSettings(prev => ({
      ...prev,
      contactPersons: [...prev.contactPersons, { name: "", phone: "", role: "" }]
    }));
    setHasChanges(true);
  };

  const removeContactPerson = (index: number) => {
    setSettings(prev => ({
      ...prev,
      contactPersons: prev.contactPersons.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  };

  const updateContactPerson = (index: number, field: keyof ContactPerson, value: string) => {
    setSettings(prev => ({
      ...prev,
      contactPersons: prev.contactPersons.map((person, i) => 
        i === index ? { ...person, [field]: value } : person
      )
    }));
    setHasChanges(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10 pb-16">
        <FadeInUp className="flex flex-col gap-6 px-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold mb-1">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Settings className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em]">Platform Configuration</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Global Settings
            </h1>
          </div>
        </FadeInUp>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-full inline-block">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
            <p className="text-muted-foreground font-medium">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-10 pb-16">
        <FadeInUp className="flex flex-col gap-6 px-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold mb-1">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Settings className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em]">Platform Configuration</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Global Settings
            </h1>
          </div>
        </FadeInUp>
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="max-w-md w-full border-destructive/30 rounded-3xl shadow-xl">
            <CardContent className="p-10 text-center space-y-6">
              <div className="p-4 bg-destructive/10 rounded-full inline-block">
                <AlertCircle className="w-10 h-10 text-destructive" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-destructive mb-2">Connection Error</h2>
                <p className="text-muted-foreground">{error}</p>
              </div>
              <Button onClick={fetchSettings} variant="outline" className="rounded-full px-6">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
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
            <span className="text-xs uppercase tracking-[0.2em]">Platform Configuration</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Global Settings
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Manage core website configuration, contact details, and company information.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {isEmpty ? (
            <Badge variant="outline" className="text-xs font-black px-4 py-2 bg-amber-50 text-amber-700 border-amber-200 rounded-full tracking-widest">
              NOT CONFIGURED
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs font-black px-4 py-2 bg-emerald-50 text-emerald-700 border-emerald-200 rounded-full tracking-widest">
              <CheckCircle2 className="w-3 h-3 mr-1.5" />
              CONFIGURED
            </Badge>
          )}
        </div>
      </FadeInUp>

      {/* Empty State Alert */}
      {isEmpty && (
        <FadeInUp delay={0.1}>
          <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-3xl flex items-start gap-4">
            <div className="p-2 bg-amber-100 rounded-xl shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 mb-1">First-Time Setup Required</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                No settings have been configured yet. Fill in your company details below and save to create your initial configuration.
              </p>
            </div>
          </div>
        </FadeInUp>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Company Information Card */}
        <FadeInUp delay={0.2}>
          <Card className="border-border/40 shadow-sm bg-white rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-6 pt-8 px-8 border-b border-border/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold tracking-tight">Company Information</CardTitle>
                  <CardDescription className="text-sm mt-0.5">
                    Primary identification and branding details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Company Name
                  </Label>
                  <Input 
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    placeholder="e.g. PACT"
                    className="rounded-xl h-12 border-border/60 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Official Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="info@thepact.in"
                      className="pl-11 rounded-xl h-12 border-border/60 focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  WhatsApp Number
                </Label>
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="whatsapp"
                    value={settings.whatsapp}
                    onChange={(e) => updateField("whatsapp", e.target.value)}
                    placeholder="+919123456789"
                    className="pl-11 rounded-xl h-12 border-border/60 focus:border-primary max-w-md"
                  />
                </div>
                <p className="text-xs text-muted-foreground pl-1">Include country code (e.g., +91 for India)</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Postal Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                  <Textarea 
                    id="address"
                    value={settings.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Full postal address with city and country..."
                    className="pl-11 rounded-xl min-h-[100px] resize-none border-border/60 focus:border-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Contact Persons Card */}
        <FadeInUp delay={0.3}>
          <Card className="border-border/40 shadow-sm bg-white rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-6 pt-8 px-8 border-b border-border/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight">Contact Persons</CardTitle>
                    <CardDescription className="text-sm mt-0.5">
                      Key people and their direct contact numbers
                    </CardDescription>
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={addContactPerson}
                  className="rounded-full px-5 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Person
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {settings.contactPersons.length === 0 ? (
                <div className="text-center py-12 px-6">
                  <div className="p-4 bg-muted/30 rounded-full inline-block mb-4">
                    <Phone className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-bold text-navy-950 mb-1">No Contact Persons</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    Add your key team members so visitors can reach the right person.
                  </p>
                </div>
              ) : (
                <StaggerContainer className="space-y-4">
                  {settings.contactPersons.map((person, index) => (
                    <StaggerItem key={index}>
                      <div className="p-5 border border-border/40 rounded-2xl bg-muted/10 hover:border-primary/20 hover:bg-muted/20 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                              {index + 1}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              Contact Person
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeContactPerson(index)}
                            className="opacity-50 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full h-8 w-8 p-0 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Name</Label>
                            <Input
                              value={person.name}
                              onChange={(e) => updateContactPerson(index, "name", e.target.value)}
                              placeholder="Full name"
                              className="rounded-xl h-10 border-border/60"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Phone</Label>
                            <Input
                              value={person.phone}
                              onChange={(e) => updateContactPerson(index, "phone", e.target.value)}
                              placeholder="+91 91234 56789"
                              className="rounded-xl h-10 border-border/60"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Role (Optional)</Label>
                            <Input
                              value={person.role || ""}
                              onChange={(e) => updateContactPerson(index, "role", e.target.value)}
                              placeholder="e.g. Founder"
                              className="rounded-xl h-10 border-border/60"
                            />
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

        {/* Save Footer */}
        <FadeInUp delay={0.4}>
          <div className="p-8 bg-navy-950 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden relative">
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  hasChanges 
                    ? "bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                    : "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                )} />
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/90">
                    {hasChanges ? "Unsaved Changes" : "All Changes Saved"}
                  </span>
                  <p className="text-white/50 text-xs mt-0.5">
                    {isEmpty ? "Create your first configuration" : "Your settings are synced"}
                  </p>
                </div>
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="rounded-full px-8 bg-white text-navy-950 hover:bg-white/90 font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
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
                    {isEmpty ? "Create Settings" : "Save Settings"}
                  </>
                )}
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
          </div>
        </FadeInUp>
      </form>
    </div>
  );
}
