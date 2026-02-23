"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Loader2, 
  Trash2, 
  ArrowLeft, 
  Image as ImageIcon, 
  Save, 
  Edit,
  ChevronUp, 
  ChevronDown,
  LayoutGrid,
  Sparkles,
  Trophy,
  Medal,
  MapPin,
  Calendar,
  Info,
  Layers,
  Presentation
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { NationalImpactAward, AwardRecipient, ConclaveHighlight } from "@/lib/db/schemas";
import { motion, AnimatePresence } from "framer-motion";

export default function AwardsManagementPage() {
  const { token } = useAuth();
  const [eventData, setEventData] = useState<NationalImpactAward | null>(null);
  
  // State for different sections
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroTitleLines, setHeroTitleLines] = useState<string[]>(["NATIONAL", "IMPACT", "AWARDS"]);
  const [heroDescription, setHeroDescription] = useState("");
  const [heroDescriptionExtra, setHeroDescriptionExtra] = useState("");
  
  const [aboutSubtitle, setAboutSubtitle] = useState("");
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");
  
  const [upcomingTitle, setUpcomingTitle] = useState("");
  const [upcomingSubtitle, setUpcomingSubtitle] = useState("");
  const [upcomingDates, setUpcomingDates] = useState("");
  const [upcomingVenue, setUpcomingVenue] = useState("");
  const [upcomingAwardees, setUpcomingAwardees] = useState("");

  const [recipients, setRecipients] = useState<AwardRecipient[]>([]);
  const [gallery, setGallery] = useState<ConclaveHighlight[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Dialog States
  const [isRecipientDialogOpen, setIsRecipientDialogOpen] = useState(false);
  const [editingRecipientIndex, setEditingRecipientIndex] = useState<number | null>(null);
  const [tempRecipient, setTempRecipient] = useState<AwardRecipient>({ name: "", city: "", category: "", year: "2025", image: "" });

  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const [editingGalleryIndex, setEditingGalleryIndex] = useState<number | null>(null);
  const [tempGalleryItem, setTempGalleryItem] = useState<ConclaveHighlight>({ url: "", title: "", description: "" });

  useEffect(() => { fetchEvent(); }, []);

  async function fetchEvent() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/awards-event?admin=true", { cache: 'no-store' });
      const result = await res.json();
      
      if (result.success && result.data) {
        const activeEvent = Array.isArray(result.data) 
          ? (result.data.find((e: NationalImpactAward) => e.isActive) || result.data[0])
          : (result.data._id ? result.data : null);
        
        if (activeEvent) {
          setEventData(activeEvent);
          setHeroSubtitle(activeEvent.heroSubtitle || "Honouring Excellence");
          setHeroTitleLines(activeEvent.heroTitleLines || ["NATIONAL", "IMPACT", "AWARDS"]);
          setHeroDescription(activeEvent.heroDescription || "");
          setHeroDescriptionExtra(activeEvent.heroDescriptionExtra || "");
          
          setAboutSubtitle(activeEvent.aboutSubtitle || "The Benchmark");
          setAboutTitle(activeEvent.aboutTitle || "About the ImPACT Awards");
          setAboutDescription(activeEvent.aboutDescription || "");
          
          setUpcomingTitle(activeEvent.upcomingTitle || "NIAAM 2026");
          setUpcomingSubtitle(activeEvent.upcomingSubtitle || "Upcoming Edition");
          setUpcomingDates(activeEvent.upcomingDates || "To Be Announced");
          setUpcomingVenue(activeEvent.upcomingVenue || "To Be Announced");
          setUpcomingAwardees(activeEvent.upcomingAwardees || "To Be Announced");
          
          setRecipients(activeEvent.recipients || []);
          setGallery(activeEvent.gallery || []);
        }
      }
    } catch { 
      toast.error("Failed to sync with database."); 
    } finally { 
      setIsLoading(false); 
    }
  }

  const handleSave = async (overrides?: any) => {
    setIsSaving(true);
    try {
      const isNew = !eventData?._id;
      const method = isNew ? "POST" : "PUT";
      
      const payload = {
        ...eventData,
        year: eventData?.year || new Date().getFullYear(),
        isActive: true,
        heroSubtitle,
        heroTitleLines,
        heroDescription,
        heroDescriptionExtra,
        aboutSubtitle,
        aboutTitle,
        aboutDescription,
        upcomingTitle,
        upcomingSubtitle,
        upcomingDates,
        upcomingVenue,
        upcomingAwardees,
        recipients: overrides?.newRecipients || recipients,
        gallery: overrides?.newGallery || gallery,
      };

      const res = await fetch("/api/content/awards-event", {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      
      const result = await res.json();
      
      if (result.success) {
        toast.success("Changes saved successfully!");
        if (isNew) fetchEvent();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch { 
      toast.error("Save failed"); 
    } finally { 
      setIsSaving(false); 
    }
  };

  const handleAddField = () => {
    setHeroTitleLines([...heroTitleLines, ""]);
  };

  const handleRemoveField = (index: number) => {
    setHeroTitleLines(heroTitleLines.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index: number, value: string) => {
    const newLines = [...heroTitleLines];
    newLines[index] = value;
    setHeroTitleLines(newLines);
  };

  // --- RECIPIENTS LOGIC ---
  const addRecipientItem = () => {
    setEditingRecipientIndex(null);
    setTempRecipient({ name: "", city: "", category: "", year: eventData?.year.toString() || "2025", image: "" });
    setIsRecipientDialogOpen(true);
  };

  const openRecipientEditDialog = (index: number) => {
    setEditingRecipientIndex(index);
    setTempRecipient({ ...recipients[index] });
    setIsRecipientDialogOpen(true);
  };

  const saveRecipient = () => {
    const newRecipients = [...recipients];
    if (editingRecipientIndex !== null) {
      newRecipients[editingRecipientIndex] = { ...tempRecipient };
    } else {
      newRecipients.push({ ...tempRecipient });
    }
    setRecipients(newRecipients);
    setIsRecipientDialogOpen(false);
    handleSave({ newRecipients });
  };

  const removeRecipient = (index: number) => {
    const newRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(newRecipients);
    handleSave({ newRecipients });
  };

  // --- GALLERY LOGIC ---
  const addGalleryItem = () => {
    setEditingGalleryIndex(null);
    setTempGalleryItem({ url: "", title: "", description: "" });
    setIsGalleryDialogOpen(true);
  };

  const openGalleryEditDialog = (index: number) => {
    setEditingGalleryIndex(index);
    setTempGalleryItem({ ...gallery[index] });
    setIsGalleryDialogOpen(true);
  };

  const saveGalleryItem = () => {
    const newGallery = [...gallery];
    if (editingGalleryIndex !== null) {
      newGallery[editingGalleryIndex] = { ...tempGalleryItem };
    } else {
      newGallery.push({ ...tempGalleryItem });
    }
    setGallery(newGallery);
    setIsGalleryDialogOpen(false);
    handleSave({ newGallery });
  };

  const removeGalleryItem = (index: number) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery);
    handleSave({ newGallery });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
        <p className="text-muted-foreground animate-pulse font-medium">Loading awards data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Premium Header Design */}
      <div className="relative overflow-hidden rounded-4xl bg-navy-950 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-purple-500/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <Link href="/admin/events" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-purple-500/80 hover:text-purple-500 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
            <div className="space-y-1">
              <h1 className="page-title text-4xl md:text-5xl font-black tracking-tighter italic flex items-center gap-4 uppercase text-white">
                <Trophy className="w-10 h-10 text-purple-500" /> 
                Impact Awards
              </h1>
              <p className="text-white/60 text-lg font-light max-w-xl">
                Complete backend control for NIAAM. Manage hero text, about section, recipients and more.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button 
              onClick={() => handleSave()} 
              disabled={isSaving}
              className="w-full md:w-auto rounded-2xl px-10 h-14 bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg shadow-xl shadow-purple-900/40 border-none transition-all hover:scale-105 active:scale-95"
            >
              {isSaving ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <Save className="w-5 h-5 mr-3" />}
              Save All Changes
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="hero" className="space-y-8">
        <TabsList className="bg-white p-1 rounded-2xl border shadow-sm">
          <TabsTrigger value="hero" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white"><Presentation className="w-4 h-4 mr-2" /> Hero Section</TabsTrigger>
          <TabsTrigger value="about" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white"><Info className="w-4 h-4 mr-2" /> About</TabsTrigger>
          <TabsTrigger value="upcoming" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white"><Calendar className="w-4 h-4 mr-2" /> NIAAM 2026</TabsTrigger>
          <TabsTrigger value="recipients" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white"><Medal className="w-4 h-4 mr-2" /> Hall of Fame</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white"><ImageIcon className="w-4 h-4 mr-2" /> Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-6">
          <Card className="rounded-4xl border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-purple-50/50 border-b p-8">
              <CardTitle className="text-2xl font-black italic uppercase text-purple-950">Hero Management</CardTitle>
              <CardDescription>Customize the first section users see on the NIAAM page.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60">Hero Subtitle</Label>
                  <Input value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} placeholder="e.g. Honouring Excellence" className="h-14 rounded-2xl bg-gray-50 border-gray-100" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60">Title Lines (Capitalized)</Label>
                    <Button variant="ghost" size="sm" onClick={handleAddField} className="text-xs text-purple-600 font-bold hover:bg-purple-50"><Plus className="w-3.5 h-3.5 mr-1" /> Add Line</Button>
                  </div>
                  <div className="space-y-3">
                    {heroTitleLines.map((line, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input value={line} onChange={e => handleFieldChange(idx, e.target.value)} className="h-12 rounded-xl bg-gray-50 flex-1" />
                        {heroTitleLines.length > 1 && (
                          <Button variant="outline" size="icon" onClick={() => handleRemoveField(idx)} className="h-12 w-12 rounded-xl text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60">Value Proposition (Hero Paragraph 1)</Label>
                <Textarea value={heroDescription} onChange={e => setHeroDescription(e.target.value)} className="min-h-[120px] rounded-2xl bg-gray-50 p-6 text-lg font-light leading-relaxed border-gray-100" />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60">Context Text (Hero Paragraph 2)</Label>
                <Textarea value={heroDescriptionExtra} onChange={e => setHeroDescriptionExtra(e.target.value)} className="min-h-[100px] rounded-2xl bg-gray-50 border-gray-100" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card className="rounded-4xl border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-purple-50/50 border-b p-8">
              <CardTitle className="text-2xl font-black italic uppercase text-purple-950">About Section</CardTitle>
              <CardDescription>Manage the benchmarking content and pillars definitions.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60">Section Subtitle</Label>
                  <Input value={aboutSubtitle} onChange={e => setAboutSubtitle(e.target.value)} className="h-14 rounded-2xl bg-gray-50 border-gray-100" />
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60">Section Title</Label>
                  <Input value={aboutTitle} onChange={e => setAboutTitle(e.target.value)} className="h-14 rounded-2xl bg-gray-50 border-gray-100" />
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60">Core Description</Label>
                <Textarea value={aboutDescription} onChange={e => setAboutDescription(e.target.value)} className="min-h-[120px] rounded-2xl bg-gray-50 border-gray-100" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <Card className="rounded-4xl border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-purple-50/50 border-b p-8">
              <CardTitle className="text-2xl font-black italic uppercase text-purple-950">Upcoming Edition (NIAAM 2026)</CardTitle>
              <CardDescription>Configure details for the next award ceremony edition.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60">Event Title</Label>
                  <Input value={upcomingTitle} onChange={e => setUpcomingTitle(e.target.value)} className="h-14 rounded-2xl bg-gray-50 border-gray-100" />
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60">Edition Subtitle</Label>
                  <Input value={upcomingSubtitle} onChange={e => setUpcomingSubtitle(e.target.value)} className="h-14 rounded-2xl bg-gray-50 border-gray-100" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60 text-purple-600 flex items-center gap-2"><Calendar className="w-4 h-4"/> Dates</Label>
                  <Input value={upcomingDates} onChange={e => setUpcomingDates(e.target.value)} className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60 text-purple-600 flex items-center gap-2"><MapPin className="w-4 h-4"/> Venue</Label>
                  <Input value={upcomingVenue} onChange={e => setUpcomingVenue(e.target.value)} className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-navy-950/60 text-purple-600 flex items-center gap-2"><Trophy className="w-4 h-4"/> Awardees Status</Label>
                  <Input value={upcomingAwardees} onChange={e => setUpcomingAwardees(e.target.value)} className="h-12 rounded-xl bg-gray-50 border-gray-100" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipients" className="space-y-6">
          <div className="flex justify-between items-center bg-white border rounded-4xl p-6 shadow-sm">
            <div className="flex flex-col">
              <h3 className="text-xl font-black text-navy-950 italic uppercase leading-none">Hall of Fame</h3>
              <p className="text-xs text-purple-600 font-bold uppercase tracking-widest mt-1">{recipients.length} Honorary Recipients Listed</p>
            </div>
            <Button onClick={addRecipientItem} className="rounded-2xl h-12 px-6 bg-purple-600 hover:bg-purple-500 font-bold">
                <Plus className="w-5 h-5 mr-2" /> Add Recipient
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {recipients.map((item, index) => (
                <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={`recipient-${index}`}>
                  <Card className="group relative h-full bg-white border shadow-sm hover:shadow-xl transition-all rounded-3xl overflow-hidden p-8">
                      <div className="absolute -top-4 -right-4 text-7xl font-black text-navy-950/[0.03] leading-none italic select-none">{item.year}</div>
                      <div className="relative z-10 flex flex-col h-full justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-navy-950 leading-tight mb-2 italic uppercase">{item.name}</h3>
                            <p className="text-sm text-purple-600 font-medium">{item.category}</p>
                            <p className="text-xs text-navy-900/40 mt-1 uppercase tracking-widest flex items-center gap-1.5"><MapPin className="w-3 h-3"/> {item.city}</p>
                          </div>
                          <div className="flex gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="outline" className="h-10 w-10 rounded-xl" onClick={() => openRecipientEditDialog(index)}><Edit className="w-4 h-4" /></Button>
                            <Button size="icon" variant="destructive" className="h-10 w-10 rounded-xl" onClick={() => removeRecipient(index)}><Trash2 className="w-4 h-4" /></Button>
                          </div>
                      </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <div className="flex justify-between items-center bg-white border rounded-4xl p-6 shadow-sm">
            <div className="flex flex-col">
              <h3 className="text-xl font-black text-navy-950 italic uppercase leading-none">Ceremonial Clicks</h3>
              <p className="text-xs text-amber-600 font-bold uppercase tracking-widest mt-1">{gallery.length} Moments Captured</p>
            </div>
            <Button onClick={addGalleryItem} className="rounded-2xl h-12 px-6 bg-amber-600 hover:bg-amber-500 font-bold">
                <Plus className="w-5 h-5 mr-2" /> Add Moment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {gallery.map((item, index) => (
                <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={`gallery-${index}`}>
                  <Card className="group relative overflow-hidden rounded-3xl border-none shadow-sm aspect-video">
                    {item.url ? <Image src={item.url} alt="" fill className="object-cover" /> : <div className="w-full h-full bg-gray-100 flex items-center justify-center"><ImageIcon className="w-12 h-12 text-gray-300" /></div>}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="font-bold text-sm">{item.title}</p>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg" onClick={() => openGalleryEditDialog(index)}><Edit className="w-4 h-4" /></Button>
                      <Button size="icon" variant="destructive" className="h-8 w-8 rounded-lg" onClick={() => removeGalleryItem(index)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>

      {/* RECIPIENT DIALOG */}
      <Dialog open={isRecipientDialogOpen} onOpenChange={setIsRecipientDialogOpen}>
        <DialogContent className="max-w-xl rounded-4xl border-none p-0 overflow-hidden bg-white">
          <div className="bg-purple-600 p-8 text-white"><DialogTitle className="text-2xl font-black italic uppercase">Award Recipient</DialogTitle></div>
          <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-sm font-bold text-navy-950 ml-1 italic">Certificate Image</Label>
                  <ImageUpload value={tempRecipient.image || ""} onChange={image => setTempRecipient({...tempRecipient, image })} />
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-navy-950 ml-1">Full Name</Label>
                    <Input value={tempRecipient.name} onChange={e => setTempRecipient({...tempRecipient, name: e.target.value })} className="rounded-xl h-12 bg-gray-50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-navy-950 ml-1">Year</Label>
                        <Input value={tempRecipient.year} onChange={e => setTempRecipient({...tempRecipient, year: e.target.value })} className="rounded-xl h-12 bg-gray-50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-navy-950 ml-1">City</Label>
                        <Input value={tempRecipient.city} onChange={e => setTempRecipient({...tempRecipient, city: e.target.value })} className="rounded-xl h-12 bg-gray-50" />
                      </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-navy-950 ml-1">Category</Label>
                    <Input value={tempRecipient.category} onChange={e => setTempRecipient({...tempRecipient, category: e.target.value })} className="rounded-xl h-12 bg-gray-50" />
                  </div>
                </div>
              </div>
          </div>
          <DialogFooter className="p-8 bg-gray-50"><Button variant="ghost" onClick={() => setIsRecipientDialogOpen(false)}>Cancel</Button><Button onClick={saveRecipient} className="bg-purple-600 text-white font-bold px-8 rounded-xl">Save Recipient</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* GALLERY DIALOG */}
      <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
        <DialogContent className="max-w-2xl rounded-4xl border-none p-0 overflow-hidden bg-white">
          <div className="bg-amber-600 p-8 text-white"><DialogTitle className="text-2xl font-black italic uppercase">Gallery Moment</DialogTitle></div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2"><Label>Photo</Label><ImageUpload value={tempGalleryItem.url} onChange={url => setTempGalleryItem({...tempGalleryItem, url})} /></div>
             <div className="space-y-4">
               <div className="space-y-2"><Label>Title</Label><Input value={tempGalleryItem.title} onChange={e => setTempGalleryItem({...tempGalleryItem, title: e.target.value })} className="rounded-xl h-12 bg-gray-50" /></div>
               <div className="space-y-2"><Label>Description</Label><Textarea value={tempGalleryItem.description} onChange={e => setTempGalleryItem({...tempGalleryItem, description: e.target.value })} className="rounded-xl h-32 bg-gray-50" /></div>
             </div>
          </div>
          <DialogFooter className="p-8 bg-gray-50"><Button variant="ghost" onClick={() => setIsGalleryDialogOpen(false)}>Cancel</Button><Button onClick={saveGalleryItem} className="bg-amber-600 text-white font-bold px-8 rounded-xl">Save Moment</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
