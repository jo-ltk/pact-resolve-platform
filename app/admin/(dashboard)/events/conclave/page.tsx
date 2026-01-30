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
  Newspaper,
  ExternalLink
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
  CardFooter,
} from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { ConclaveEvent, ConclaveHighlight, ConclaveGuest, ConclaveCoverage } from "@/lib/db/schemas";
import { motion, AnimatePresence } from "framer-motion";

export default function ConclaveHighlightsPage() {
  const { token } = useAuth();
  const [eventData, setEventData] = useState<ConclaveEvent | null>(null);
  
  // Highlights State
  const [highlights, setHighlights] = useState<ConclaveHighlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempItem, setTempItem] = useState<ConclaveHighlight>({ url: "", title: "", description: "" });

  // Guest State
  const [guests, setGuests] = useState<ConclaveGuest[]>([]);
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false);
  const [editingGuestIndex, setEditingGuestIndex] = useState<number | null>(null);
  const [tempGuest, setTempGuest] = useState<ConclaveGuest>({ name: "", title: "", image: "" });

  // Coverage State
  const [coverage, setCoverage] = useState<ConclaveCoverage[]>([]);
  const [isCoverageDialogOpen, setIsCoverageDialogOpen] = useState(false);
  const [editingCoverageIndex, setEditingCoverageIndex] = useState<number | null>(null);
  const [tempCoverage, setTempCoverage] = useState<ConclaveCoverage>({ source: "", headline: "", link: "" });

  // Fallback data matching the public website
  const fallbackHighlights: ConclaveHighlight[] = [
    { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80", title: "Event Poster 2025", description: "Original Campaign Poster for the 2025 Mission Mediation Conclave." },
    { url: "https://images.unsplash.com/photo-1515168816513-4896b9f0d1a9?auto=format&fit=crop&q=80", title: "Audience Engagement", description: "Mission Mediation Conclave 2025 was held on 9 November at India International Centre." }, 
    { url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80", title: "Keynote Address", description: "Headline sponsors Samvād: Partners and Dua Associates." },
    { url: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80", title: "Interactive Session", description: "Engaging discussions between stakeholders and the audience." },
    { url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80", title: "Panel Discussion", description: "Expert insights on the future of mediation in India." },
    { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80", title: "Networking Break", description: "Stakeholders connecting during the afternoon session." }
  ];

  const fallbackGuests: ConclaveGuest[] = [
    { name: "R. Venkataramani", title: "Attorney General for India", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
    { name: "Hon. Justice A.K. Sikri", title: "Former Judge, Supreme Court of India", image: "https://images.unsplash.com/photo-1560250097-9b93dbd19728?auto=format&fit=crop&q=80" },
    { name: "Sriram Panchu", title: "Senior Advocate & Mediator", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" },
    { name: "Hon'ble Guests", title: "Distinguished Panelists", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" }
  ];

  const fallbackCoverage: ConclaveCoverage[] = [
    { source: "ET LEGAL WORLD", headline: "India urged to lead global mediation with international headquarters", link: "https://example.com" },
    { source: "BW WORLD", headline: "Attorney General R Venkataramani to grace the Mediation Championship India 2025", link: "https://example.com" },
    { source: "BAR AND BENCH", headline: "I am more gladiator than mediator - AG Venkataramani calls for mediation push", link: "https://example.com" }
  ];

  // Helper to ensure URLs have https:// prefix
  const formatExternalUrl = (url: string) => {
    const trimmed = url?.trim();
    if (!trimmed || trimmed === '#') return '#';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://${trimmed}`;
  };

  useEffect(() => { fetchEvent(); }, []);

  async function fetchEvent() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/conclave-event?admin=true", { cache: 'no-store' });
      const result = await res.json();
      
      if (result.success && result.data) {
        const items = Array.isArray(result.data) ? result.data : [result.data];
        const activeEvent = items.find((e: ConclaveEvent) => e.isActive) || items[0];
        
        if (!activeEvent) {
          setHighlights(fallbackHighlights);
          setGuests(fallbackGuests);
          setCoverage(fallbackCoverage);
          setEventData(null);
          return;
        }

        setEventData(activeEvent);
        setHighlights(activeEvent.highlights?.length > 0 ? activeEvent.highlights : fallbackHighlights);
        setGuests(activeEvent.guestsOfHonour?.length > 0 ? activeEvent.guestsOfHonour : fallbackGuests);
        setCoverage(activeEvent.coverage?.length > 0 ? activeEvent.coverage : fallbackCoverage);
      } else {
        setHighlights(fallbackHighlights);
        setGuests(fallbackGuests);
        setCoverage(fallbackCoverage);
      }
    } catch { 
      setHighlights(fallbackHighlights);
      setGuests(fallbackGuests);
      setCoverage(fallbackCoverage);
      toast.error("Failed to sync with database."); 
    } finally { 
      setIsLoading(false); 
    }
  }

  const handleSave = async (data?: { newGuests?: ConclaveGuest[], newHighlights?: ConclaveHighlight[], newCoverage?: ConclaveCoverage[] }) => {
    setIsSaving(true);
    try {
      const isNew = !eventData?._id;
      const method = isNew ? "POST" : "PUT";
      
      const guestsToSave = data?.newGuests || guests;
      const highlightsToSave = data?.newHighlights || highlights;
      const coverageToSave = data?.newCoverage || coverage;
      
      const payload = isNew 
        ? { year: new Date().getFullYear(), isActive: true, guestsOfHonour: guestsToSave, highlights: highlightsToSave, coverage: coverageToSave }
        : { ...eventData, highlights: highlightsToSave, guestsOfHonour: guestsToSave, coverage: coverageToSave };

      const res = await fetch("/api/content/conclave-event", {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      
      const result = await res.json();
      
      if (result.success) {
        toast.success("Changes saved successfully!");
        fetchEvent();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch { 
      toast.error("Save failed"); 
    } finally { 
      setIsSaving(false); 
    }
  };

  // --- HIGHLIGHTS LOGIC ---
  const addHighlightItem = () => {
    setEditingIndex(null);
    setTempItem({ url: "", title: "", description: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (index: number) => {
    setEditingIndex(index);
    setTempItem({ ...highlights[index] });
    setIsDialogOpen(true);
  };

  const saveTempItem = () => {
    const newHighlights = [...highlights];
    if (editingIndex !== null) {
      newHighlights[editingIndex] = { ...tempItem };
    } else {
      newHighlights.push({ ...tempItem });
    }
    setHighlights(newHighlights);
    setIsDialogOpen(false);
    
    // Auto-save on dialog close
    handleSave({ newHighlights });
  };

  const removeHighlightItem = (index: number) => {
    const newHighlights = highlights.filter((_, i) => i !== index);
    setHighlights(newHighlights);
    toast.success("Highlight removed. Saving...");
    handleSave({ newHighlights });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === highlights.length - 1) return;
    
    const newHighlights = [...highlights];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newHighlights[index], newHighlights[newIndex]] = [newHighlights[newIndex], newHighlights[index]];
    setHighlights(newHighlights);
  };

  // --- GUESTS LOGIC ---
  const addGuestItem = () => {
    setEditingGuestIndex(null);
    setTempGuest({ name: "", title: "", image: "" });
    setIsGuestDialogOpen(true);
  };

  const openGuestEditDialog = (index: number) => {
    setEditingGuestIndex(index);
    setTempGuest({ ...guests[index] });
    setIsGuestDialogOpen(true);
  };

  const saveTempGuest = () => {
    const newGuests = [...guests];
    if (editingGuestIndex !== null) {
      newGuests[editingGuestIndex] = { ...tempGuest };
    } else {
      newGuests.push({ ...tempGuest });
    }
    setGuests(newGuests);
    setIsGuestDialogOpen(false);
    
    // Auto-save on dialog close
    handleSave({ newGuests });
  };

  const removeGuestItem = (index: number) => {
    const newGuests = guests.filter((_, i) => i !== index);
    setGuests(newGuests);
    toast.success("Guest removed. Saving...");
    handleSave({ newGuests });
  };

  // --- COVERAGE LOGIC ---
  const addCoverageItem = () => {
    setEditingCoverageIndex(null);
    setTempCoverage({ source: "", headline: "", link: "" });
    setIsCoverageDialogOpen(true);
  };

  const openCoverageEditDialog = (index: number) => {
    setEditingCoverageIndex(index);
    setTempCoverage({ ...coverage[index] });
    setIsCoverageDialogOpen(true);
  };

  const saveTempCoverage = () => {
    // Sanitize the link before saving
    const sanitizedLink = formatExternalUrl(tempCoverage.link);
    const coverageWithSanitizedLink = { ...tempCoverage, link: sanitizedLink };

    const newCoverage = [...coverage];
    if (editingCoverageIndex !== null) {
      newCoverage[editingCoverageIndex] = coverageWithSanitizedLink;
    } else {
      newCoverage.push(coverageWithSanitizedLink);
    }
    setCoverage(newCoverage);
    setIsCoverageDialogOpen(false);
    handleSave({ newCoverage });
  };

  const removeCoverageItem = (index: number) => {
    const newCoverage = coverage.filter((_, i) => i !== index);
    setCoverage(newCoverage);
    toast.success("Coverage removed. Saving...");
    handleSave({ newCoverage });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
        <p className="text-muted-foreground animate-pulse font-medium">Loading conclave data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Premium Header Design */}
      <div className="relative overflow-hidden rounded-4xl bg-navy-950 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-amber-500/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <Link href="/admin/events" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-amber-500/80 hover:text-amber-500 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic flex items-center gap-4">
                <LayoutGrid className="w-10 h-10 text-amber-500" /> 
                CONCLAVE 2025
              </h1>
              <p className="text-white/60 text-lg font-light max-w-xl">
                Curation portal for the Mission Mediation Conclave highlights. Manage the visual journey and guests.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button 
              onClick={() => handleSave()} 
              disabled={isSaving}
              className="rounded-2xl px-10 h-14 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg shadow-xl shadow-amber-900/40 border-none transition-all hover:scale-105 active:scale-95"
            >
              {isSaving ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <Save className="w-5 h-5 mr-3" />}
              Publish Updates
            </Button>
            <p className="text-[10px] text-center text-white/40 font-mono uppercase tracking-tighter">
              {eventData ? `Linked to ${eventData.year} Edition` : "Draft Mode"}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: HIGHLIGHTS */}
      <div className="space-y-6">
        {/* Stats & Actions Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white border rounded-4xl p-6 shadow-sm">
          <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                  <LayoutGrid className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-amber-900">{highlights.length} <span className="font-medium opacity-60">Photos</span></span>
              </div>
              {eventData?.isActive && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-600 font-bold text-sm">
                      <Sparkles className="w-4 h-4 fill-current" /> Live on Website
                  </div>
              )}
              <div className="flex flex-col">
                <h3 className="text-xl font-black text-navy-950 italic uppercase leading-none">The {eventData?.year || 2025} Collection</h3>
                <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mt-1">Highlights – {eventData?.year || 2025}</p>
              </div>
          </div>
          
          <Button onClick={addHighlightItem} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-amber-500/30 text-amber-600 hover:bg-amber-500/5 hover:border-amber-500 transition-all font-bold">
              <Plus className="w-5 h-5 mr-2" /> Append New Frame
          </Button>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {highlights.map((item, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                key={`highlight-${index}`}
                className="h-full"
              >
                <Card className="group relative h-full flex flex-col bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden border border-navy-50/50">
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {item.url ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={item.url} 
                          alt={item.title || "Highlight image"} 
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-navy-50/50">
                        <ImageIcon className="w-12 h-12 opacity-20" />
                      </div>
                    )}
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Action Buttons (Overlay) */}
                    <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur shadow-lg hover:bg-white" 
                        onClick={() => openEditDialog(index)}
                      >
                        <Edit className="w-4 h-4 text-navy-950" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="w-9 h-9 rounded-xl shadow-lg" 
                        onClick={() => removeHighlightItem(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Order Badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-amber-500 text-white rounded-lg text-xs font-bold shadow-lg">
                      #{index + 1}
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-lg text-navy-950 line-clamp-1">
                        {item.title || "Untitled Moment"}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed h-10">
                      {item.description || "No description provided."}
                    </p>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-navy-50/50 mt-auto">
                      <div className="flex gap-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="w-8 h-8 rounded-lg text-muted-foreground hover:text-navy-950 hover:bg-navy-50" 
                          onClick={() => moveItem(index, 'up')} 
                          disabled={index === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="w-8 h-8 rounded-lg text-muted-foreground hover:text-navy-950 hover:bg-navy-50" 
                          onClick={() => moveItem(index, 'down')} 
                          disabled={index === highlights.length - 1}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[11px] font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl h-8"
                        onClick={() => openEditDialog(index)}
                      >
                        Configure Details
                      </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Add Empty State Card */}
          <button 
              onClick={addHighlightItem}
              className="flex flex-col items-center justify-center bg-gray-50/50 border-2 border-dashed border-navy-100 rounded-3xl p-12 hover:bg-amber-50/50 hover:border-amber-500/30 transition-all group min-h-[350px]"
          >
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-1">Add Highlight</h3>
              <p className="text-xs text-muted-foreground text-center">Capture a new moment for the collection</p>
          </button>
        </div>
      </div>

      {/* SECTION 2: GUESTS */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white border rounded-4xl p-6 shadow-sm">
          <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-blue-900">{guests.length} <span className="font-medium opacity-60">Guests</span></span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-black text-navy-950 italic uppercase leading-none">Distinction</h3>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">Guests of Honour – {eventData?.year || 2025}</p>
              </div>
          </div>
          <Button onClick={addGuestItem} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-blue-500/30 text-blue-600 hover:bg-blue-500/5 hover:border-blue-500 transition-all font-bold">
              <Plus className="w-5 h-5 mr-2" /> Add Guest
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {guests.map((guest, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={`guest-${idx}`}
              >
                <Card className="group relative overflow-hidden rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-navy-950 h-full">
                  <div className="relative aspect-video overflow-hidden bg-navy-900">
                    {guest.image ? (
                      <Image src={guest.image} alt={guest.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10"><Trophy className="w-12 h-12" /></div>
                    )}
                    
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                       <Button size="icon" className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-navy-950" onClick={() => openGuestEditDialog(idx)}><Edit className="w-4 h-4" /></Button>
                       <Button size="icon" variant="destructive" className="w-9 h-9 rounded-xl shadow-lg" onClick={() => removeGuestItem(idx)}><Trash2 className="w-4 h-4" /></Button>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                      <h4 className="font-black text-2xl text-white italic tracking-tight leading-none mb-2">{guest.name || "Guest Name"}</h4>
                      <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em]">{guest.title || "Designation"}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            <motion.div layout>
              <button 
                onClick={addGuestItem} 
                className="flex flex-col items-center justify-center w-full aspect-video bg-navy-50/50 border-2 border-dashed border-navy-200 rounded-[2.5rem] hover:bg-amber-50/50 hover:border-amber-500/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-amber-500" />
                </div>
                <span className="text-sm font-bold text-navy-950 uppercase tracking-widest">Add Guest</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* SECTION 3: COVERAGE */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white border rounded-4xl p-6 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Newspaper className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-emerald-900">{coverage.length} <span className="font-medium opacity-60">Articles</span></span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-black text-navy-950 italic uppercase leading-none">Coverage</h3>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Media & Press – {eventData?.year || 2025}</p>
            </div>
          </div>
          <Button onClick={addCoverageItem} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/5 hover:border-emerald-500 transition-all font-bold">
            <Plus className="w-5 h-5 mr-2" /> Add Article
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {coverage.map((item, idx) => (
              <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={`coverage-${idx}`}>
                <Card className="group relative h-full flex flex-col bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden">
                  <CardContent className="p-8 flex-1 space-y-4">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">{item.source || "Source"}</p>
                    <h4 className="font-bold text-xl text-navy-950 leading-snug line-clamp-3">{item.headline || "Headline"}</h4>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex justify-between items-center">
                    <a 
                      href={formatExternalUrl(item.link)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
                    >
                      View Article <ExternalLink className="w-3 h-3" />
                    </a>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="w-8 h-8 rounded-xl hover:bg-emerald-50" onClick={() => openCoverageEditDialog(idx)}><Edit className="w-4 h-4 text-emerald-600" /></Button>
                      <Button size="icon" variant="ghost" className="w-8 h-8 rounded-xl hover:bg-red-50 text-red-500" onClick={() => removeCoverageItem(idx)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
            <motion.div layout>
              <button onClick={addCoverageItem} className="flex flex-col items-center justify-center w-full h-full min-h-[200px] bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl hover:bg-emerald-50/50 hover:border-emerald-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-7 h-7 text-emerald-500" />
                </div>
                <span className="text-sm font-bold text-navy-950 uppercase tracking-widest">Add Article</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden rounded-4xl border-none shadow-2xl flex flex-col bg-white">
          <div className="bg-navy-950 p-8 text-white shrink-0">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <ImageIcon className="w-6 h-6 text-amber-500" />
                {editingIndex !== null ? "Edit Highlight" : "Add New Highlight"}
              </DialogTitle>
              <DialogDescription className="text-navy-200">
                Provide details for this visual highlight. Ensure high-quality imagery is used.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-none">
            <div className="space-y-4">
               <Label className="text-sm font-bold text-navy-950 ml-1">Highlight Photo</Label>
               <ImageUpload 
                value={tempItem.url} 
                onChange={(url) => setTempItem({ ...tempItem, url })} 
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-navy-950 ml-1">Title</Label>
                <Input 
                  value={tempItem.title} 
                  onChange={e => setTempItem({ ...tempItem, title: e.target.value })} 
                  className="rounded-2xl h-12 border-navy-100 focus:ring-amber-500 focus:border-amber-500 bg-gray-50/50"
                  placeholder="e.g. Inaugural Ceremony"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-navy-950 ml-1">Description / Context</Label>
                <Textarea 
                  value={tempItem.description} 
                  onChange={e => setTempItem({ ...tempItem, description: e.target.value })} 
                  className="rounded-2xl min-h-[140px] border-navy-100 focus:ring-amber-500 focus:border-amber-500 resize-none bg-gray-50/50 p-4"
                  placeholder="Describe the significance of this moment..."
                />
              </div>
            </div>
          </div>

          <DialogFooter className="p-8 bg-gray-50/80 backdrop-blur-sm border-t flex justify-end gap-3 shrink-0">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-8 font-medium hover:bg-gray-100">
              Cancel
            </Button>
            <Button 
              onClick={saveTempItem}
              className="rounded-xl h-12 px-10 bg-navy-950 hover:bg-navy-900 text-white font-bold shadow-lg transition-all active:scale-95"
            >
              {editingIndex !== null ? "Save Changes" : "Add to Gallery"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* GUEST DIALOG */}
      <Dialog open={isGuestDialogOpen} onOpenChange={setIsGuestDialogOpen}>
        <DialogContent className="max-w-lg p-0 overflow-hidden rounded-4xl border-none bg-white">
          <div className="bg-blue-600 p-8 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold italic uppercase tracking-tighter">Guest Profile</DialogTitle>
            </DialogHeader>
          </div>
          <div className="p-8 space-y-6">
             <div className="space-y-4">
                <Label className="text-sm font-bold text-navy-950 ml-1">Guest Photo</Label>
                <ImageUpload value={tempGuest.image} onChange={url => setTempGuest({...tempGuest, image: url})} />
             </div>
             <div className="space-y-4">
                <div className="space-y-2">
                   <Label className="text-sm font-bold text-navy-950 ml-1">Guest Name</Label>
                   <Input value={tempGuest.name} onChange={e => setTempGuest({...tempGuest, name: e.target.value })} className="rounded-2xl h-12" />
                </div>
                <div className="space-y-2">
                   <Label className="text-sm font-bold text-navy-950 ml-1">Designation / Title</Label>
                   <Input value={tempGuest.title} onChange={e => setTempGuest({...tempGuest, title: e.target.value })} className="rounded-2xl h-12" />
                </div>
             </div>
          </div>
          <DialogFooter className="p-8 bg-gray-50 border-t">
            <Button variant="ghost" onClick={() => setIsGuestDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveTempGuest} className="bg-blue-600 hover:bg-blue-500 px-8 rounded-xl font-bold italic text-white">Save Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* COVERAGE DIALOG */}
      <Dialog open={isCoverageDialogOpen} onOpenChange={setIsCoverageDialogOpen}>
        <DialogContent className="max-w-lg p-0 overflow-hidden rounded-4xl border-none bg-white">
          <div className="bg-emerald-600 p-8 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold italic uppercase tracking-tighter flex items-center gap-3">
                <Newspaper className="w-6 h-6" /> Media Coverage
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-navy-950 ml-1">Publication / Source</Label>
              <Input value={tempCoverage.source} onChange={e => setTempCoverage({...tempCoverage, source: e.target.value })} className="rounded-2xl h-12" placeholder="e.g. ET Legal World" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-bold text-navy-950 ml-1">Headline</Label>
              <Textarea value={tempCoverage.headline} onChange={e => setTempCoverage({...tempCoverage, headline: e.target.value })} className="rounded-2xl min-h-[100px] resize-none" placeholder="Article headline or title" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-bold text-navy-950 ml-1">Article Link</Label>
              <Input value={tempCoverage.link} onChange={e => setTempCoverage({...tempCoverage, link: e.target.value })} className="rounded-2xl h-12" placeholder="https://..." />
            </div>
          </div>
          <DialogFooter className="p-8 bg-gray-50 border-t">
            <Button variant="ghost" onClick={() => setIsCoverageDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveTempCoverage} className="bg-emerald-600 hover:bg-emerald-500 px-8 rounded-xl font-bold italic text-white">Save Article</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Visual Strategy Guide */}
      <div className="bg-amber-50 rounded-4xl p-10 border border-amber-200 flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 shrink-0 bg-amber-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-500/30 rotate-3">
            <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div>
            <h3 className="text-2xl font-black italic text-amber-900 mb-2 tracking-tight uppercase">Visual Strategy Guide</h3>
            <p className="text-amber-800/80 leading-relaxed max-w-3xl font-medium">
                The Conclave Highlights section is a cinematic gallery on the public website. For the best impact, ensure titles are high-level and descriptions are concise. High-resolution landscape (16:9) images work best for this layout.
            </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        </div>
      </div>
    </div>
  );
}
