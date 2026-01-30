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
  Users,
  Trophy,
  ExternalLink,
  Calendar,
  Sparkles,
  Info,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  CheckCircle2,
  RefreshCcw,
  ArrowRight
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
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { ConclaveEvent, ConclaveGuest, ConclaveHighlight, ConclaveCoverage } from "@/lib/db/schemas";
import { motion, AnimatePresence } from "framer-motion";

export default function ConclaveAdminPage() {
  const { token } = useAuth();
  const [events, setEvents] = useState<ConclaveEvent[]>([]);
  const [activeEvent, setActiveEvent] = useState<ConclaveEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Dialog States
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<ConclaveEvent> | null>(null);
  
  // Section Edit States
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false);
  const [editingGuestIndex, setEditingGuestIndex] = useState<number | null>(null);
  const [tempGuest, setTempGuest] = useState<ConclaveGuest>({ name: "", title: "", image: "" });

  const [isHighlightDialogOpen, setIsHighlightDialogOpen] = useState(false);
  const [editingHighlightIndex, setEditingHighlightIndex] = useState<number | null>(null);
  const [tempHighlight, setTempHighlight] = useState<ConclaveHighlight>({ url: "", title: "", description: "" });

  const [isCoverageDialogOpen, setIsCoverageDialogOpen] = useState(false);
  const [editingCoverageIndex, setEditingCoverageIndex] = useState<number | null>(null);
  const [tempCoverage, setTempCoverage] = useState<ConclaveCoverage>({ source: "", headline: "", link: "" });

  useEffect(() => { fetchEvents(); }, []);

  async function fetchEvents() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/conclave-event?admin=true");
      const result = await res.json();
      if (result.success) {
        setEvents(result.data || []);
        // Try to keep currently selected by ID if possible, else pick active
        const currentId = activeEvent?._id;
        let nextActive = null;
        if (currentId) {
          nextActive = result.data?.find((e: ConclaveEvent) => e._id === currentId);
        }
        if (!nextActive) {
          nextActive = result.data?.find((e: ConclaveEvent) => e.isActive) || result.data?.[0] || null;
        }
        setActiveEvent(nextActive);
      } else {
        toast.error(result.error || "Failed to load events");
      }
    } catch (e) {
      toast.error("Network error: Failed to fetch conclave data");
    } finally {
      setIsLoading(false);
    }
  }

  const handlePublish = async () => {
    if (!activeEvent) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/content/conclave-event", {
        method: activeEvent._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(activeEvent)
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Conclave data published successfully!");
        fetchEvents();
      } else {
        toast.error(result.error || "Publish failed");
      }
    } catch (e) {
      toast.error("Save failed: Check your database connection");
    } finally {
      setIsSaving(false);
    }
  };

  const createNewEdition = () => {
    const newEvent: Partial<ConclaveEvent> = {
      year: new Date().getFullYear(),
      isActive: events.length === 0,
      guestsOfHonour: [],
      highlights: [],
      coverage: []
    };
    setEditingEvent(newEvent);
    setIsEventDialogOpen(true);
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    
    try {
      const res = await fetch("/api/content/conclave-event", {
        method: editingEvent._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(editingEvent)
      });
      const result = await res.json();
      if (result.success) {
        toast.success(editingEvent._id ? "Edition updated" : "New edition created");
        setIsEventDialogOpen(false);
        fetchEvents();
      } else {
        toast.error(result.error);
      }
    } catch (e) {
      toast.error("Action failed: Database error");
    }
  };

  // --- Guest Logic ---
  const openGuestDialog = (index: number | null = null) => {
    if (index !== null && activeEvent) {
      setEditingGuestIndex(index);
      setTempGuest({ ...activeEvent.guestsOfHonour[index] });
    } else {
      setEditingGuestIndex(null);
      setTempGuest({ name: "", title: "", image: "" });
    }
    setIsGuestDialogOpen(true);
  };

  const saveGuest = () => {
    if (!activeEvent) return;
    const newGuests = [...activeEvent.guestsOfHonour];
    if (editingGuestIndex !== null) {
      newGuests[editingGuestIndex] = tempGuest;
    } else {
      newGuests.push(tempGuest);
    }
    setActiveEvent({ ...activeEvent, guestsOfHonour: newGuests });
    setIsGuestDialogOpen(false);
    toast.info("Guest info updated locally. Don't forget to push 'Publish Changes'.");
  };

  const removeGuest = (index: number) => {
    if (!activeEvent) return;
    const newGuests = [...activeEvent.guestsOfHonour];
    newGuests.splice(index, 1);
    setActiveEvent({ ...activeEvent, guestsOfHonour: newGuests });
  };

  // --- Highlight Logic ---
  const openHighlightDialog = (index: number | null = null) => {
    if (index !== null && activeEvent) {
      setEditingHighlightIndex(index);
      setTempHighlight({ ...activeEvent.highlights[index] });
    } else {
      setEditingHighlightIndex(null);
      setTempHighlight({ url: "", title: "", description: "" });
    }
    setIsHighlightDialogOpen(true);
  };

  const saveHighlight = () => {
    if (!activeEvent) return;
    const newHighlights = [...activeEvent.highlights];
    if (editingHighlightIndex !== null) {
      newHighlights[editingHighlightIndex] = tempHighlight;
    } else {
      newHighlights.push(tempHighlight);
    }
    setActiveEvent({ ...activeEvent, highlights: newHighlights });
    setIsHighlightDialogOpen(false);
  };

  const removeHighlight = (index: number) => {
    if (!activeEvent) return;
    const newHighlights = [...activeEvent.highlights];
    newHighlights.splice(index, 1);
    setActiveEvent({ ...activeEvent, highlights: newHighlights });
  };

  // --- Coverage Logic ---
  const openCoverageDialog = (index: number | null = null) => {
    if (index !== null && activeEvent) {
      setEditingCoverageIndex(index);
      setTempCoverage({ ...activeEvent.coverage[index] });
    } else {
      setEditingCoverageIndex(null);
      setTempCoverage({ source: "", headline: "", link: "" });
    }
    setIsCoverageDialogOpen(true);
  };

  const saveCoverage = () => {
    if (!activeEvent) return;
    const newCoverage = [...activeEvent.coverage];
    if (editingCoverageIndex !== null) {
      newCoverage[editingCoverageIndex] = tempCoverage;
    } else {
      newCoverage.push(tempCoverage);
    }
    setActiveEvent({ ...activeEvent, coverage: newCoverage });
    setIsCoverageDialogOpen(false);
  };

  const removeCoverage = (index: number) => {
    if (!activeEvent) return;
    const newCoverage = [...activeEvent.coverage];
    newCoverage.splice(index, 1);
    setActiveEvent({ ...activeEvent, coverage: newCoverage });
  };

  const moveItem = (field: "guestsOfHonour" | "highlights" | "coverage", index: number, direction: "up" | "down") => {
    if (!activeEvent) return;
    const list = [...(activeEvent[field] as any[])];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    
    // Swap
    [list[index], list[targetIndex]] = [list[targetIndex], list[index]];
    setActiveEvent({ ...activeEvent, [field]: list });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          <div className="absolute inset-0 bg-blue-600/10 blur-xl animate-pulse" />
        </div>
        <p className="text-muted-foreground animate-pulse font-medium tracking-wide">Syncing with MMC Data Vault...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-24 px-4">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-huge bg-navy-950 p-10 md:p-14 text-white shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-blue-500/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-6 flex-1">
            <Link href="/admin/events" className="group inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-blue-400 hover:text-blue-300 transition-all">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-400 font-bold text-sm tracking-widest uppercase mb-1">
                <Sparkles className="w-4 h-4" />
                Mission Mediation Conclave
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic flex items-center gap-5 uppercase leading-none">
                <Users className="w-12 h-12 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" /> 
                MMC PANEL
              </h1>
              <p className="text-white/60 text-lg font-light max-w-xl leading-relaxed">
                Management portal for the Conclave editions. Curate prestigious speakers, visual highlights, and media presence.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto shrink-0">
             <div className="bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-4xl flex items-center gap-1 w-full md:w-64">
                <div className="flex-1 flex flex-col px-4">
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Active Edition</span>
                  <select 
                    className="bg-transparent text-sm font-bold text-white focus:outline-none appearance-none cursor-pointer"
                    value={activeEvent?._id?.toString() || ""}
                    onChange={(e) => {
                      const selected = events.find(ev => ev._id?.toString() === e.target.value);
                      if (selected) setActiveEvent(selected);
                    }}
                  >
                    {events.map(ev => <option key={ev._id?.toString()} value={ev._id?.toString()} className="text-navy-950 font-sans">{ev.year} Edition</option>)}
                    {!events.length && <option value="" className="text-navy-950">None Found</option>}
                  </select>
                </div>
                <div className="w-px h-8 bg-white/10 mx-1" />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="w-10 h-10 rounded-xl hover:bg-white/10 text-blue-400" 
                  onClick={createNewEdition}
                  title="Create New Edition"
                >
                   <Plus className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="w-10 h-10 rounded-xl hover:bg-white/10 text-white/40" 
                  onClick={fetchEvents}
                  title="Refresh Data"
                >
                   <RefreshCcw className="w-4 h-4" />
                </Button>
             </div>

             <Button 
              onClick={handlePublish} 
              disabled={isSaving || !activeEvent}
              className="rounded-2xl h-16 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-xl shadow-blue-900/40 border-none transition-all hover:scale-[1.02] active:scale-95 group"
            >
              {isSaving ? <Loader2 className="w-6 h-6 mr-3 animate-spin" /> : <Save className="w-6 h-6 mr-3 group-hover:rotate-6 transition-transform" />}
              Publish Changes
            </Button>
             
             {activeEvent?.isActive ? (
               <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20 py-1.5 justify-center gap-2 rounded-xl">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 Currently Live Edition
               </Badge>
             ) : activeEvent ? (
               <Badge variant="outline" className="text-white/40 border-white/10 py-1.5 justify-center rounded-xl">
                 Draft / Archive Edition
               </Badge>
             ) : null}
          </div>
        </div>
      </div>

      {!activeEvent ? (
        <Card className="border-none shadow-sm rounded-4xl bg-white/50 backdrop-blur-sm p-20 text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-4xl bg-blue-50 flex items-center justify-center mb-8">
              <Trophy className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-3xl font-black italic tracking-tight text-navy-950 mb-2">Initialize MMC Vault</h3>
            <p className="text-muted-foreground text-lg mb-10 max-w-sm">No Conclave Edition found in the database. Begin by creating the 2025 Edition.</p>
            <Button onClick={createNewEdition} className="bg-navy-950 hover:bg-navy-900 h-14 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-navy-100 transition-all active:scale-95">
              <Plus className="w-5 h-5 mr-3" /> Create First Edition
            </Button>
        </Card>
      ) : (
        <Tabs defaultValue="guests" className="space-y-10">
          <TabsList className="bg-white/70 backdrop-blur-xl border border-white rounded-4xl h-14 p-1 shadow-lg w-full max-w-2xl mx-auto flex items-center sticky top-6 z-40">
            <TabsTrigger value="guests" className="rounded-2xl flex-1 font-bold h-12 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
              <Users className="w-4 h-4 mr-2" /> Guests
            </TabsTrigger>
            <TabsTrigger value="highlights" className="rounded-2xl flex-1 font-bold h-12 data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
              <LayoutGrid className="w-4 h-4 mr-2" /> Highlights
            </TabsTrigger>
            <TabsTrigger value="coverage" className="rounded-2xl flex-1 font-bold h-12 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
              <ExternalLink className="w-4 h-4 mr-2" /> Media
            </TabsTrigger>
          </TabsList>

          {/* GUESTS SECTION */}
          <TabsContent value="guests" className="space-y-8 outline-none">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/40 backdrop-blur-md p-8 rounded-huge border border-white/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="flex items-center gap-5 relative z-10">
                   <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-200 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <Users className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-navy-950 italic uppercase leading-none">Honorable Panelists</h3>
                      <p className="text-muted-foreground font-medium flex items-center gap-2 mt-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {activeEvent.guestsOfHonour.length} Distinguished Guests Loaded
                      </p>
                   </div>
                </div>
                <Button onClick={() => openGuestDialog()} className="bg-white hover:bg-blue-50 text-blue-600 border-2 border-dashed border-blue-500/30 rounded-2xl h-14 px-8 font-bold shadow-sm transition-all hover:border-blue-500 active:scale-95">
                   <Plus className="w-5 h-5 mr-2" /> Append New Guest
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
               <AnimatePresence mode="popLayout">
                 {activeEvent.guestsOfHonour.map((guest, idx) => (
                   <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={`guest-${idx}`}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="h-full"
                   >
                     <Card className="group relative overflow-hidden rounded-huge border shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-white">
                        <div className="relative aspect-4/5 overflow-hidden bg-muted m-2 rounded-4xl">
                           {guest.image ? (
                             <Image 
                               src={guest.image} 
                               alt={guest.name} 
                               fill
                               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                             />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center text-navy-950/20 bg-navy-50/50">
                               <ImageIcon className="w-16 h-16 opacity-10" />
                             </div>
                           )}
                           <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                           
                           <div className="absolute top-4 right-4 flex gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                              <div className="flex flex-col gap-1">
                                <Button size="icon" variant="secondary" className="w-8 h-8 rounded-lg bg-white shadow-md disabled:opacity-30" disabled={idx === 0} onClick={(e) => { e.stopPropagation(); moveItem("guestsOfHonour", idx, "up"); }}><ChevronUp className="w-4 h-4" /></Button>
                                <Button size="icon" variant="secondary" className="w-8 h-8 rounded-lg bg-white shadow-md disabled:opacity-30" disabled={idx === activeEvent.guestsOfHonour.length - 1} onClick={(e) => { e.stopPropagation(); moveItem("guestsOfHonour", idx, "down"); }}><ChevronDown className="w-4 h-4" /></Button>
                              </div>
                              <Button size="icon" className="w-10 h-10 rounded-xl bg-white shadow-xl hover:bg-blue-50 text-navy-950" onClick={() => openGuestDialog(idx)}><Edit className="w-4 h-4" /></Button>
                              <Button size="icon" variant="destructive" className="w-10 h-10 rounded-xl shadow-xl hover:bg-red-600" onClick={() => removeGuest(idx)}><Trash2 className="w-4 h-4" /></Button>
                           </div>

                           <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                              <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em] mb-1">Configuration</p>
                              <Button variant="ghost" className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-white/20 rounded-xl h-10 text-xs font-bold uppercase tracking-widest" onClick={() => openGuestDialog(idx)}>
                                 Edit Details
                              </Button>
                           </div>
                        </div>
                        <CardContent className="px-6 pb-6 pt-2 flex-1 flex flex-col justify-center">
                           <h4 className="font-black text-xl italic tracking-tight text-navy-950 mb-1 group-hover:text-blue-600 transition-colors uppercase leading-[1.1]">{guest.name || "UNNAMED GUEST"}</h4>
                           <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-500/60 leading-tight">{guest.title || "TITLE PENDING"}</p>
                        </CardContent>
                     </Card>
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>
          </TabsContent>

          {/* HIGHLIGHTS SECTION */}
          <TabsContent value="highlights" className="space-y-8 outline-none">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/40 backdrop-blur-md p-8 rounded-huge border border-white/60 shadow-sm overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="flex items-center gap-5 relative z-10">
                   <div className="w-16 h-16 rounded-3xl bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-200 -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <LayoutGrid className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-navy-950 italic uppercase leading-none">Collection {activeEvent.year}</h3>
                      <p className="text-muted-foreground font-medium flex items-center gap-2 mt-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        {activeEvent.highlights.length} Cinematic Frames Curated
                      </p>
                   </div>
                </div>
                <Button onClick={() => openHighlightDialog()} className="bg-white hover:bg-amber-50 text-amber-600 border-2 border-dashed border-amber-500/30 rounded-2xl h-14 px-8 font-bold shadow-sm transition-all hover:border-amber-500 active:scale-95">
                   <Plus className="w-5 h-5 mr-2" /> Capture Highlight
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <AnimatePresence mode="popLayout">
                 {activeEvent.highlights.map((item, idx) => (
                   <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={`highlight-${idx}`}
                    className="h-full"
                   >
                     <Card className="group relative overflow-hidden rounded-huge border shadow-sm hover:shadow-2xl transition-all duration-500 bg-white min-h-[300px] flex flex-col">
                        <div className="relative aspect-video overflow-hidden bg-navy-50 m-2 rounded-4xl">
                           {item.url ? (
                             <Image 
                               src={item.url} 
                               alt={item.title || "Highlight image"} 
                               fill
                               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                             />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center text-navy-100"><ImageIcon className="w-16 h-16 opacity-20" /></div>
                           )}
                           <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
                           
                           <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                              <div className="flex flex-col gap-1">
                                <Button size="icon" variant="secondary" className="w-8 h-8 rounded-lg bg-white shadow-md disabled:opacity-30" disabled={idx === 0} onClick={(e) => { e.stopPropagation(); moveItem("highlights", idx, "up"); }}><ChevronUp className="w-4 h-4" /></Button>
                                <Button size="icon" variant="secondary" className="w-8 h-8 rounded-lg bg-white shadow-md disabled:opacity-30" disabled={idx === activeEvent.highlights.length - 1} onClick={(e) => { e.stopPropagation(); moveItem("highlights", idx, "down"); }}><ChevronDown className="w-4 h-4" /></Button>
                              </div>
                              <Button size="icon" className="w-10 h-10 rounded-xl bg-white shadow-xl hover:bg-amber-50 text-navy-950" onClick={() => openHighlightDialog(idx)}><Edit className="w-4 h-4" /></Button>
                              <Button size="icon" variant="destructive" className="w-10 h-10 rounded-xl shadow-xl" onClick={() => removeHighlight(idx)}><Trash2 className="w-4 h-4" /></Button>
                           </div>

                           <div className="absolute bottom-6 left-6">
                              <Badge className="bg-amber-500/90 text-white border-none px-3 py-1 rounded-lg text-xs font-black shadow-lg uppercase tracking-widest">FRAME {idx + 1}</Badge>
                           </div>
                        </div>
                        <CardContent className="p-6 pt-2">
                           <h4 className="font-bold text-xl text-navy-950 line-clamp-1 mb-2 group-hover:text-amber-600 transition-colors uppercase italic tracking-tight leading-none">{item.title || "Untitled Cinematic Moment"}</h4>
                           <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                              {item.description || "The significance of this moment captures the vision and excellence of the conclave."}
                           </p>
                        </CardContent>
                     </Card>
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>
          </TabsContent>

          {/* COVERAGE SECTION */}
          <TabsContent value="coverage" className="space-y-8 outline-none">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/40 backdrop-blur-md p-8 rounded-huge border border-white/60 shadow-sm group">
                <div className="flex items-center gap-5 relative z-10">
                   <div className="w-16 h-16 rounded-3xl bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-200 group-hover:scale-110 transition-transform duration-500">
                      <ExternalLink className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-navy-950 italic uppercase tracking-tighter leading-none">Media Resonance</h3>
                      <p className="text-muted-foreground font-medium flex items-center gap-2 mt-2">
                        <Info className="w-4 h-4 text-emerald-500" />
                        {activeEvent.coverage.length} External Press Channels Active
                      </p>
                   </div>
                </div>
                <Button onClick={() => openCoverageDialog()} className="bg-white hover:bg-emerald-50 text-emerald-600 border-2 border-dashed border-emerald-500/30 rounded-2xl h-14 px-8 font-bold shadow-sm transition-all hover:border-emerald-500">
                   <Plus className="w-5 h-5 mr-2" /> Add Media Release
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <AnimatePresence mode="popLayout">
                 {activeEvent.coverage.map((item, idx) => (
                   <motion.div 
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={`coverage-${idx}`}
                   >
                     <Card className="group p-8 rounded-4xl border shadow-sm hover:shadow-xl transition-all flex items-center gap-8 bg-white relative overflow-hidden border-none text-navy-950">
                        <div className="absolute top-0 right-0 w-px h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-3 mb-3">
                              <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50/50 uppercase text-[10px] font-black tracking-widest px-3">
                                {item.source || "OFFICIAL PRESS"}
                              </Badge>
                              <div className="w-1 h-1 rounded-full bg-navy-100" />
                              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Release {idx + 1}</span>
                           </div>
                           <h4 className="font-extrabold text-2xl leading-[1.2] line-clamp-2 group-hover:text-emerald-600 transition-colors tracking-tight italic uppercase">{item.headline || "TRANSFORMATIVE HEADLINE PENDING"}</h4>
                           <Link 
                              href={item.link} 
                              target="_blank" 
                              className="inline-flex items-center text-xs font-bold text-muted-foreground hover:text-emerald-500 mt-4 group/link"
                            >
                              Browse Release <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
                           </Link>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                           <Button size="icon" variant="ghost" className="w-12 h-12 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all" onClick={() => openCoverageDialog(idx)}><Edit className="w-5 h-5" /></Button>
                           <Button size="icon" variant="ghost" className="w-12 h-12 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all text-muted-foreground/30" onClick={() => removeCoverage(idx)}><Trash2 className="w-5 h-5" /></Button>
                        </div>
                     </Card>
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Guide Card */}
      <div className="bg-navy-950 rounded-huge p-12 border border-white/5 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden shadow-2xl mt-10">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-blue-600/5 to-transparent pointer-events-none" />
        <div className="w-24 h-24 shrink-0 bg-blue-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.3)] rotate-6">
            <Sparkles className="w-12 h-12 text-white" />
        </div>
        <div className="flex-1 space-y-4 relative z-10">
            <h3 className="text-3xl font-black italic text-white tracking-tight uppercase leading-none">Conclave Design Strategy</h3>
            <p className="text-white/60 leading-relaxed max-w-2xl text-lg font-light">
                The Conclave portal integrates with the main website's cinematic experience. Ensure guest portraits are monochrome or high-contrast for the premium feel. Media headlines should be kept concise for optimal display in the grid columns.
            </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
             <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Real-time Ready</span>
             </div>
             <p className="text-white/20 text-[10px] font-mono tracking-tighter uppercase">Cluster Synchronized</p>
        </div>
      </div>

      {/* DIALOGS */}
      
      {/* Event Edition Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="rounded-huge p-0 overflow-hidden border-none shadow-2xl max-w-lg bg-white">
          <form onSubmit={handleEventSubmit}>
            <div className="bg-navy-950 p-10 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full" />
              <DialogHeader>
                <DialogTitle className="text-3xl font-black italic tracking-tight flex items-center gap-4 uppercase leading-none"><Calendar className="w-8 h-8 text-blue-500" /> MMC Edition</DialogTitle>
                <DialogDescription className="text-white/40 font-medium mt-2">Configure global settings for this Conclave edition.</DialogDescription>
              </DialogHeader>
            </div>
            <div className="p-10 space-y-8">
               <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="font-black text-navy-950 ml-1 uppercase text-xs tracking-widest leading-none">Edition Year</Label>
                    <Input 
                      type="number"
                      value={editingEvent?.year}
                      onChange={e => {
                        const val = parseInt(e.target.value);
                        setEditingEvent({ ...editingEvent!, year: isNaN(val) ? new Date().getFullYear() : val });
                      }}
                      className="rounded-2xl h-14 border-navy-100 bg-navy-50/30 text-lg font-bold"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between p-6 bg-blue-50/50 rounded-4xl border border-dashed border-blue-200 group">
                    <div className="space-y-1">
                       <p className="text-sm font-black text-navy-950 uppercase tracking-tight italic leading-none">Visibility Status</p>
                       <p className="text-[10px] text-blue-600/80 font-bold uppercase tracking-wider mt-1">Set as Public Production Data</p>
                    </div>
                    <Switch 
                      checked={editingEvent?.isActive}
                      onCheckedChange={val => setEditingEvent({ ...editingEvent!, isActive: val })}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
               </div>
            </div>
            <DialogFooter className="p-10 bg-gray-50 border-t flex justify-end gap-4 shrink-0">
               <Button type="button" variant="ghost" className="rounded-2xl h-14 px-10 font-bold" onClick={() => setIsEventDialogOpen(false)}>Discard</Button>
               <Button type="submit" className="rounded-2xl h-14 px-12 bg-navy-950 hover:bg-navy-900 text-white font-black uppercase italic tracking-tight shadow-xl shadow-navy-200">
                  {editingEvent?._id ? "Commit Updates" : "Initialize Edition"}
               </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Guest Edit Dialog */}
      <Dialog open={isGuestDialogOpen} onOpenChange={setIsGuestDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden rounded-huge border-none shadow-2xl flex flex-col bg-white">
          <div className="bg-navy-950 p-10 text-white shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
            <DialogHeader>
              <DialogTitle className="text-3xl font-black italic flex items-center gap-4 uppercase tracking-tighter leading-none">
                <Users className="w-8 h-8 text-blue-500" />
                {editingGuestIndex !== null ? "Edit Profile" : "Enlist Guest"}
              </DialogTitle>
              <DialogDescription className="text-white/30 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Dignitaries & Distinguished Panelists</DialogDescription>
            </DialogHeader>
          </div>
          <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-none">
             <div className="space-y-4">
                <Label className="font-black text-navy-950 ml-1 uppercase text-xs tracking-widest leading-none">Portrait Asset</Label>
                <ImageUpload value={tempGuest.image} onChange={url => setTempGuest({ ...tempGuest, image: url })} />
                <p className="text-[10px] text-muted-foreground text-center font-bold tracking-widest">Recommended: Monochrome Landscape / Frontal</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div className="space-y-3">
                   <Label className="font-black text-navy-950 ml-1 uppercase text-xs tracking-widest leading-none">Legal Name</Label>
                   <Input value={tempGuest.name} onChange={e => setTempGuest({ ...tempGuest, name: e.target.value })} className="rounded-2xl h-14 border-navy-100 bg-navy-50/30 font-bold" placeholder="e.g. Justice S.K. Kaul" />
                </div>
                <div className="space-y-3">
                   <Label className="font-black text-navy-950 ml-1 uppercase text-xs tracking-widest leading-none">Official Designation</Label>
                   <Input value={tempGuest.title} onChange={e => setTempGuest({ ...tempGuest, title: e.target.value })} className="rounded-2xl h-14 border-navy-100 bg-navy-50/30 font-bold" placeholder="e.g. Attorney General" />
                </div>
             </div>
          </div>
          <DialogFooter className="p-10 bg-gray-50 border-t flex justify-end gap-4 shrink-0">
             <Button variant="ghost" className="rounded-2xl h-14 px-10 font-bold" onClick={() => setIsGuestDialogOpen(false)}>Discard</Button>
             <Button onClick={saveGuest} className="rounded-2xl h-14 px-12 bg-blue-600 hover:bg-blue-500 font-extrabold italic text-white shadow-xl shadow-blue-200 tracking-tight uppercase">Update Guest Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Highlight Edit Dialog */}
      <Dialog open={isHighlightDialogOpen} onOpenChange={setIsHighlightDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden rounded-huge border-none shadow-2xl flex flex-col bg-white">
          <div className="bg-amber-500 p-10 text-white shrink-0 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
            <DialogHeader>
              <DialogTitle className="text-3xl font-black italic flex items-center gap-4 uppercase tracking-tighter leading-none">
                <ImageIcon className="w-8 h-8 text-white" />
                {editingHighlightIndex !== null ? "Edit Frame" : "Commit Highlight"}
              </DialogTitle>
              <DialogDescription className="text-white/60 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Visual Collection Asset</DialogDescription>
            </DialogHeader>
          </div>
          <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-none">
             <div className="space-y-4">
                <Label className="font-black text-navy-950 ml-1 uppercase text-xs tracking-widest leading-none">Cinematic Background</Label>
                <ImageUpload value={tempHighlight.url} onChange={url => setTempHighlight({ ...tempHighlight, url })} />
             </div>
             <div className="space-y-6 mt-4">
                <div className="space-y-3">
                   <Label className="font-black text-navy-950 ml-1 uppercase text-xs tracking-widest leading-none">Asset Title</Label>
                   <Input value={tempHighlight.title} onChange={e => setTempHighlight({ ...tempHighlight, title: e.target.value })} className="rounded-2xl h-14 border-navy-100 bg-navy-50/30 font-bold" placeholder="e.g. Inaugural Moment" />
                </div>
                <div className="space-y-3">
                   <Label className="font-black text-navy-950 ml-1 uppercase text-xs tracking-widest leading-none">Narrative Context</Label>
                   <Textarea value={tempHighlight.description} onChange={e => setTempHighlight({ ...tempHighlight, description: e.target.value })} className="rounded-2xl min-h-[140px] border-navy-100 bg-navy-50/30 p-5 font-medium leading-relaxed resize-none" placeholder="Describe the atmosphere and significance..." />
                </div>
             </div>
          </div>
          <DialogFooter className="p-10 bg-gray-50 border-t flex justify-end gap-4 shrink-0">
             <Button variant="ghost" className="rounded-2xl h-14 px-10 font-bold" onClick={() => setIsHighlightDialogOpen(false)}>Discard</Button>
             <Button onClick={saveHighlight} className="rounded-2xl h-14 px-12 bg-amber-600 hover:bg-amber-500 font-extrabold italic text-white shadow-xl shadow-amber-200 tracking-tight uppercase">Commit to Collection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Coverage Edit Dialog */}
      <Dialog open={isCoverageDialogOpen} onOpenChange={setIsCoverageDialogOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-huge border-none shadow-2xl flex flex-col bg-white">
          <div className="bg-emerald-600 p-10 text-white shrink-0 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
            <DialogHeader>
              <DialogTitle className="text-3xl font-black italic flex items-center gap-4 uppercase tracking-tighter leading-none">
                <ExternalLink className="w-8 h-8 text-white" />
                {editingCoverageIndex !== null ? "Edit Release" : "Add Feed"}
              </DialogTitle>
              <DialogDescription className="text-white/60 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">External Media Resonance Link</DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-10 space-y-8">
             <div className="space-y-6">
                <div className="space-y-3">
                   <Label className="font-black text-navy-950 ml-1 uppercase text-xs tracking-widest leading-none">Media Source Outlet</Label>
                   <Input value={tempCoverage.source} onChange={e => setTempCoverage({ ...tempCoverage, source: e.target.value })} className="rounded-2xl h-14 border-navy-100 bg-navy-50/30 font-bold uppercase" placeholder="e.g. BAR AND BENCH" />
                </div>
                <div className="space-y-3">
                   <Label className="font-black text-navy-950 ml-1 uppercase text-xs tracking-widest leading-none">Article Headline</Label>
                   <Textarea value={tempCoverage.headline} onChange={e => setTempCoverage({ ...tempCoverage, headline: e.target.value })} className="rounded-2xl min-h-[100px] border-navy-100 bg-navy-50/30 p-5 font-bold leading-tight resize-none italic uppercase" placeholder="Enter headline..." />
                </div>
                <div className="space-y-3">
                   <Label className="font-black text-navy-950 ml-1 uppercase text-xs tracking-widest leading-none">Direct URI / Social Link</Label>
                   <div className="relative group">
                      <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                      <Input value={tempCoverage.link} onChange={e => setTempCoverage({ ...tempCoverage, link: e.target.value })} className="rounded-2xl h-14 pl-12 border-navy-100 bg-navy-50/30 font-medium" placeholder="https://..." />
                   </div>
                </div>
             </div>
          </div>
          <DialogFooter className="p-10 bg-gray-50 border-t flex justify-end gap-4 shrink-0">
             <Button variant="ghost" className="rounded-2xl h-14 px-10 font-bold" onClick={() => setIsCoverageDialogOpen(false)}>Discard</Button>
             <Button onClick={saveCoverage} className="rounded-2xl h-14 px-12 bg-emerald-600 hover:bg-emerald-500 font-extrabold italic text-white shadow-xl shadow-emerald-200 tracking-tight uppercase">Update Media Release</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
