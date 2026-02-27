"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Loader2, 
  Trash2, 
  Trophy, 
  ArrowLeft, 
  Image as ImageIcon, 
  GripVertical, 
  Save, 
  ChevronUp, 
  ChevronDown,
  LayoutGrid,
  Sparkles,
  Info,
  Edit,
  MoreVertical
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
  CardHeader,
} from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { MCIEvent } from "@/lib/db/schemas";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function MCIManagementPage() {
  const { token } = useAuth();
  const [eventData, setEventData] = useState<MCIEvent | null>(null);
  const [gallery, setGallery] = useState<Array<{ id: string; url: string; title: string; description: string; order: number }>>([]);
  const [partners, setPartners] = useState<Array<{ id: string; name: string; logo: string; order: number }>>([]);
  const [press, setPress] = useState<Array<{ id: string; publication: string; headline: string; url: string; order: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'gallery' | 'partners' | 'press'>('gallery');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [isPressDialogOpen, setIsPressDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempItem, setTempItem] = useState<{ url: string; title: string; description: string; order: number }>({ url: "", title: "", description: "", order: 0 });
  const [tempPartner, setTempPartner] = useState<{ name: string; logo: string; order: number }>({ name: "", logo: "", order: 0 });
  const [tempPress, setTempPress] = useState<{ publication: string; headline: string; url: string; order: number }>({ publication: "", headline: "", url: "", order: 0 });


  // Fallback images matching the public website for initial setup
  const fallbackGallery = [
    {
      url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80",
      title: "Inaugural Ceremony",
      description: "Setting the stage for a weekend of elite mediation.",
      order: 1
    },
    {
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      title: "Mentorship Sessions",
      description: "Connecting next-gen talent with industry veterans.",
      order: 2
    },
    {
      url: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80",
      title: "Final Rounds",
      description: "High-stakes mediation challenges in front of the grand jury.",
      order: 3
    },
    {
      url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80",
      title: "Gala Dinner",
      description: "An evening of celebration and strategic networking.",
      order: 4
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      title: "Winners Circle",
      description: "Celebrating excellence in dispute resolution.",
      order: 5
    },
    {
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
      title: "Collaborations",
      description: "Building lasting partnerships within the legal community.",
      order: 6
    }
  ];

  const fallbackPress = [
    {
      publication: "SCC Online",
      headline: "Live: PACT, SAM & GNLU Mediation Championship India 2023",
      url: "https://www.scconline.com/blog/post/2023/09/08/live-pact-sam-gnlu-mediation-championship-india-2023/"
    },
    {
      publication: "Bar & Bench",
      headline: "Legal League Consulting joins The PACT in hosting India's League of Mediation Champions at GNLU",
      url: "https://www.barandbench.com/news/corporate/legal-league-consulting-joins-the-pact-in-hosting-indias-league-of-mediation-champions-at-gnlu"
    },
    {
      publication: "SCC Blog",
      headline: "SAM and GNLU join The PACT to further Mission Mediation in India",
      url: "https://blog.scconline.gen.in/post/2023/09/04/sam-and-gnlu-join-the-pact-to-further-mission-mediation-in-india/"
    },
    {
      publication: "Bar & Bench",
      headline: "GIMAC, GNLU and The PACT to host Mediation Championship India 2024",
      url: "https://www.barandbench.com/Law-School/gimac-gnlu-and-the-pact-to-host-mediation-championship-india-2024"
    },
    {
      publication: "LiveLaw",
      headline: "Mediation Championship India 2024: GIMAC & The PACT",
      url: "https://www.livelaw.in/lawschool/mediation-championship-india-gimac-the-pact-mediation-268982"
    },
    {
      publication: "Lexology",
      headline: "Partnerships & Sponsors for Mediation Championship India 2024",
      url: "https://www.lexology.com/library/detail.aspx?g=2af664c4-1152-41ef-aae5-86aae73229be"
    }
  ].map((p, i) => ({ ...p, order: i + 1 }));

  useEffect(() => { fetchEvent(); }, []);

  async function fetchEvent() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/mci-event?all=true", { cache: 'no-store' });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const result = await res.json();
      
      if (result.success && result.data && (Array.isArray(result.data) ? result.data.length > 0 : !!result.data)) {
        const items = Array.isArray(result.data) ? result.data : [result.data];
        const activeEvent = items.find((e: MCIEvent) => e.isActive) || items[0];
        
        if (activeEvent) {
          setEventData(activeEvent);
          
          // Set Gallery
          const galleryWithIds = (activeEvent.gallery && activeEvent.gallery.length > 0 ? activeEvent.gallery : fallbackGallery)
            .map((item: any, idx: number) => ({
              ...item,
              id: item.id || `item-${idx}-${Date.now()}`
            }));
          setGallery(galleryWithIds);

          // Set Partners
          const partnersWithIds = (activeEvent.mentoringPartners || [])
            .map((item: any, idx: number) => ({
              ...item,
              id: item.id || `partner-${idx}-${Date.now()}`
            }));
          setPartners(partnersWithIds);

          // Set Press
          const pressWithIds = (activeEvent.mediaCoverage && activeEvent.mediaCoverage.length > 0 ? activeEvent.mediaCoverage : fallbackPress)
            .map((item: any, idx: number) => ({
              ...item,
              id: item.id || `press-${idx}-${Date.now()}`
            }));
          setPress(pressWithIds);
        } else {
          setGallery(fallbackGallery.map((item, idx) => ({ ...item, id: `fallback-${idx}` })));
          setPartners([]);
          setPress(fallbackPress.map((item, idx) => ({ ...item, id: `fallback-press-${idx}` })));
        }
      } else {
        setGallery(fallbackGallery.map((item, idx) => ({ ...item, id: `fallback-${idx}` })));
        setPartners([]);
        setPress(fallbackPress.map((item, idx) => ({ ...item, id: `fallback-press-${idx}` })));
      }
    } catch (e) { 
      setGallery(fallbackGallery.map((item, idx) => ({ ...item, id: `fallback-${idx}` })));
      setPartners([]);
      setPress(fallbackPress.map((item, idx) => ({ ...item, id: `fallback-press-${idx}` })));

      toast.error("Database connection issue. Showing default data."); 
    }
    finally { setIsLoading(false); }
  }

  const handleSave = async (overrideGallery?: any[], overridePartners?: any[], overridePress?: any[]) => {
    setIsSaving(true);
    try {
      const gList = overrideGallery || gallery;
      const pList = overridePartners || partners;
      const pressList = overridePress || press;
      const galleryToSave = gList.map(({ id, ...rest }) => rest);
      const partnersToSave = pList.map(({ id, ...rest }) => rest);
      const pressToSave = pressList.map(({ id, ...rest }) => rest);

      const method = (eventData && eventData._id) ? "PUT" : "POST";
      const payload = (eventData && eventData._id) 
        ? { 
            ...eventData, 
            isActive: true, 
            gallery: galleryToSave,
            mentoringPartners: partnersToSave,
            mediaCoverage: pressToSave
          }
        : {
            year: new Date().getFullYear(),
            title: ["Mediation", "Champions", "League"],
            subtitle: "India's Premier Mediation Competition",
            isActive: true,
            gallery: galleryToSave,
            mentoringPartners: partnersToSave,
            mediaCoverage: pressToSave
          };

      console.log(`[Admin] Saving MCI Event (${method})`, payload);

      const res = await fetch("/api/content/mci-event", {
        method: method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      
      const result = await res.json();
      console.log(`[Admin] Save result:`, result);

      if (result.success) {
        toast.success("MCI Event updated successfully!");
        // Refresh event data to ensure state is in sync
        const freshRes = await fetch("/api/content/mci-event?all=true", { cache: 'no-store' });
        const freshData = await freshRes.json();
        if (freshData.success) {
          const items = Array.isArray(freshData.data) ? freshData.data : [freshData.data];
          const activeEvent = items.find((e: MCIEvent) => e.isActive) || items[0];
          if (activeEvent) {
             setEventData(activeEvent);
             toast.success("Data verified and synced.");
          }
        }
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch (e) { 
      toast.error("Save failed"); 
    } finally { 
      setIsSaving(false); 
    }
  };

  // --- Gallery Actions ---
  const addGalleryItem = () => {
    setEditingIndex(null);
    setTempItem({ url: "", title: "", description: "", order: gallery.length + 1 });
    setIsDialogOpen(true);
  };

  const openEditDialog = (index: number) => {
    setEditingIndex(index);
    setTempItem({ ...gallery[index] });
    setIsDialogOpen(true);
  };

  const saveGalleryTempItem = async () => {
    const newGallery = [...gallery];
    if (editingIndex !== null) {
      newGallery[editingIndex] = { ...tempItem, id: gallery[editingIndex].id };
    } else {
      newGallery.push({ ...tempItem, id: `new-${Date.now()}` });
    }
    setGallery(newGallery);
    setIsDialogOpen(false);
    await handleSave(newGallery, partners);
  };

  const removeGalleryItem = async (index: number) => {
    const newGallery = gallery.filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, order: i + 1 }));
    setGallery(newGallery);
    await handleSave(newGallery, partners);
  };

  const moveGalleryItem = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === gallery.length - 1) return;
    const newGallery = [...gallery];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newGallery[index], newGallery[newIndex]] = [newGallery[newIndex], newGallery[index]];
    newGallery.forEach((item, i) => item.order = i + 1);
    setGallery(newGallery);
    await handleSave(newGallery, partners);
  };

  // --- Partner Actions ---
  const addPartnerItem = () => {
    setEditingIndex(null);
    setTempPartner({ name: "", logo: "", order: partners.length + 1 });
    setIsPartnerDialogOpen(true);
  };

  const openPartnerEditDialog = (index: number) => {
    setEditingIndex(index);
    setTempPartner({ ...partners[index] });
    setIsPartnerDialogOpen(true);
  };

  const savePartnerTempItem = async () => {
    const newPartners = [...partners];
    if (editingIndex !== null) {
      newPartners[editingIndex] = { ...tempPartner, id: partners[editingIndex].id };
    } else {
      newPartners.push({ ...tempPartner, id: `new-p-${Date.now()}` });
    }
    setPartners(newPartners);
    setIsPartnerDialogOpen(false);
    await handleSave(gallery, newPartners);
  };

  const removePartnerItem = async (index: number) => {
    const newPartners = partners.filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, order: i + 1 }));
    setPartners(newPartners);
    await handleSave(gallery, newPartners);
  };

  const movePartnerItem = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === partners.length - 1) return;
    const newPartners = [...partners];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newPartners[index], newPartners[newIndex]] = [newPartners[newIndex], newPartners[index]];
    newPartners.forEach((item, i) => item.order = i + 1);
    setPartners(newPartners);
    await handleSave(gallery, newPartners, press);
  };

  // --- Press Actions ---
  const addPressItem = () => {
    setEditingIndex(null);
    setTempPress({ publication: "", headline: "", url: "", order: press.length + 1 });
    setIsPressDialogOpen(true);
  };

  const openPressEditDialog = (index: number) => {
    setEditingIndex(index);
    setTempPress({ ...press[index] });
    setIsPressDialogOpen(true);
  };

  const savePressTempItem = async () => {
    const newPress = [...press];
    if (editingIndex !== null) {
      newPress[editingIndex] = { ...tempPress, id: press[editingIndex].id };
    } else {
      newPress.push({ ...tempPress, id: `new-press-${Date.now()}` });
    }
    setPress(newPress);
    setIsPressDialogOpen(false);
    await handleSave(gallery, partners, newPress);
  };

  const removePressItem = async (index: number) => {
    const newPress = press.filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, order: i + 1 }));
    setPress(newPress);
    await handleSave(gallery, partners, newPress);
  };

  const movePressItem = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === press.length - 1) return;
    const newPress = [...press];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newPress[index], newPress[newIndex]] = [newPress[newIndex], newPress[index]];
    newPress.forEach((item, i) => item.order = i + 1);
    setPress(newPress);
    await handleSave(gallery, partners, newPress);
  };


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
        <p className="text-muted-foreground animate-pulse font-medium">Loading MCI data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Premium Header Design */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-navy-950 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-amber-500/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <Link href="/admin/events" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-amber-500/80 hover:text-amber-500 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
            <div className="space-y-1">
              <h1 className="page-title text-4xl md:text-5xl font-black tracking-tighter italic flex items-center gap-4">
                <Trophy className="w-10 h-10 text-amber-500" /> 
                MCI EVENT HUB
              </h1>
              <p className="text-white/60 text-lg font-light max-w-xl">
                Manage the visual journey and strategic partnerships for the Mediation Champions League.
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
              Publish Changes
            </Button>
            <p className="text-xs text-center text-white/40 uppercase tracking-tighter">
              {eventData ? `Linked to ${eventData.year} Edition` : "Draft Mode"}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex p-1 bg-white dark:bg-navy-900/50 border rounded-2xl w-full sm:w-fit mx-auto">
        <button 
          onClick={() => setActiveTab('gallery')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
            activeTab === 'gallery' ? "bg-navy-950 text-white shadow-lg" : "text-navy-950/40 hover:text-navy-950"
          )}
        >
          <ImageIcon className="w-4 h-4" /> Gallery
        </button>
        <button 
          onClick={() => setActiveTab('partners')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
            activeTab === 'partners' ? "bg-navy-950 text-white shadow-lg" : "text-navy-950/40 hover:text-navy-950"
          )}
        >
          <LayoutGrid className="w-4 h-4" /> Mentoring Partners
        </button>
        <button 
          onClick={() => setActiveTab('press')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
            activeTab === 'press' ? "bg-navy-950 text-white shadow-lg" : "text-navy-950/40 hover:text-navy-950"
          )}
        >
          <Info className="w-4 h-4" /> Media Coverage
        </button>
      </div>

      {activeTab === 'gallery' ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white dark:bg-navy-900/50 backdrop-blur-md border rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                    <LayoutGrid className="w-5 h-5 text-amber-600" />
                    <span className="font-bold text-amber-900 dark:text-amber-100">{gallery.length} <span className="font-medium opacity-60">Photos</span></span>
                </div>
                {eventData?.isActive && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-600 font-bold text-sm">
                        <Sparkles className="w-4 h-4 fill-current" /> Live on Website
                    </div>
                )}
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => handleSave()} disabled={isSaving} className="rounded-2xl h-12 px-6 bg-navy-950 hover:bg-navy-900 text-white font-bold">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Publish Gallery
              </Button>
              <Button onClick={addGalleryItem} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-amber-500/30 text-amber-600 hover:bg-amber-50/50 hover:border-amber-500 transition-all font-bold">
                <Plus className="w-5 h-5 mr-2" /> Append New Memory
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {gallery.map((photo, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={photo.id}
                  className="h-full"
                >
                  <Card className="group relative h-full flex flex-col bg-white dark:bg-navy-900 border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden border border-navy-50/50">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      {photo.url ? (
                        <Image src={photo.url} alt={photo.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-navy-50/50">
                          <ImageIcon className="w-12 h-12 opacity-20" />
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button size="icon" variant="secondary" className="w-9 h-9 rounded-xl bg-white/90" onClick={() => openEditDialog(index)}>
                          <Edit className="w-4 h-4 text-navy-950" />
                        </Button>
                        <Button size="icon" variant="destructive" className="w-9 h-9 rounded-xl" onClick={() => removeGalleryItem(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-amber-500 text-white rounded-lg text-xs font-bold">
                        #{index + 1}
                      </div>
                    </div>

                    <CardContent className="p-6 flex-1 space-y-3">
                      <h3 className="font-bold text-lg text-navy-950 dark:text-white line-clamp-1">{photo.title || "Untitled Memory"}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed h-10">{photo.description || "No description provided."}</p>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-auto">
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => moveGalleryItem(index, 'up')} disabled={index === 0}>
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => moveGalleryItem(index, 'down')} disabled={index === gallery.length - 1}>
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-[11px] font-bold uppercase text-amber-600 hover:bg-amber-50 rounded-xl h-8" onClick={() => openEditDialog(index)}>
                          Edit
                        </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white dark:bg-navy-900/50 backdrop-blur-md border rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                    <LayoutGrid className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-indigo-900 dark:text-indigo-100">{partners.length} <span className="font-medium opacity-60">Logos</span></span>
                </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => handleSave()} disabled={isSaving} className="rounded-2xl h-12 px-6 bg-navy-950 hover:bg-navy-900 text-white font-bold">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Publish Partners
              </Button>
              <Button onClick={addPartnerItem} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-indigo-500/30 text-indigo-600 hover:bg-indigo-50/50 hover:border-indigo-500 transition-all font-bold">
                <Plus className="w-5 h-5 mr-2" /> Add Mentoring Partner
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <AnimatePresence mode="popLayout">
              {partners.map((partner, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={partner.id}
                >
                  <Card className="group relative bg-white dark:bg-navy-900 border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden border border-navy-50/50 p-4">
                    <div className="aspect-square relative mb-4 bg-gray-50 dark:bg-navy-950/50 rounded-2xl p-4 flex items-center justify-center overflow-hidden">
                      {partner.logo ? (
                        <Image src={partner.logo} alt={partner.name} fill className="object-contain transition-transform group-hover:scale-110" />
                      ) : (
                        <LayoutGrid className="w-8 h-8 opacity-10" />
                      )}

                      <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <Button size="icon" variant="secondary" className="w-7 h-7 rounded-lg" onClick={() => openPartnerEditDialog(index)}>
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="icon" variant="destructive" className="w-7 h-7 rounded-lg" onClick={() => removePartnerItem(index)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-center">
                      <p className="text-sm font-bold text-navy-950 dark:text-white line-clamp-1">{partner.name || "Unnamed Partner"}</p>
                      <div className="flex justify-center gap-1">
                        <Button size="icon" variant="ghost" className="w-6 h-6" onClick={() => movePartnerItem(index, 'up')} disabled={index === 0}>
                          <ChevronUp className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="w-6 h-6" onClick={() => movePartnerItem(index, 'down')} disabled={index === partners.length - 1}>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <button 
                onClick={addPartnerItem}
                className="aspect-square flex flex-col items-center justify-center bg-gray-50/50 dark:bg-navy-900/20 border-2 border-dashed border-navy-100 dark:border-navy-800 rounded-3xl p-4 hover:border-indigo-500/30 group"
            >
                <Plus className="w-8 h-8 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-navy-950/40 uppercase">Add Logo</span>
            </button>
          </div>
        </div>
      )}
      {activeTab === 'press' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white dark:bg-navy-900/50 backdrop-blur-md border rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                    <Info className="w-5 h-5 text-rose-600" />
                    <span className="font-bold text-rose-900 dark:text-rose-100">{press.length} <span className="font-medium opacity-60">Articles</span></span>
                </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => handleSave()} disabled={isSaving} className="rounded-2xl h-12 px-6 bg-navy-950 hover:bg-navy-900 text-white font-bold">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Publish Coverage
              </Button>
              <Button onClick={addPressItem} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-rose-500/30 text-rose-600 hover:bg-rose-50/50 hover:border-rose-500 transition-all font-bold">
                <Plus className="w-5 h-5 mr-2" /> Add Media Article
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {press.map((item, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={item.id}
                  className="h-full"
                >
                  <Card className="group relative h-full flex flex-col bg-white dark:bg-navy-900 border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden border border-navy-50/50 p-6 space-y-4">
                    <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <Button size="icon" variant="secondary" className="w-7 h-7 rounded-lg" onClick={() => openPressEditDialog(index)}>
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="destructive" className="w-7 h-7 rounded-lg" onClick={() => removePressItem(index)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase text-navy-950/40">
                        {item.publication || "Unknown Publication"}
                      </span>
                      <h3 className="text-lg font-medium text-navy-950 mt-2 line-clamp-3">
                        {item.headline || "Untitled Article"}
                      </h3>
                      <Link href={item.url} target="_blank" className="text-xs text-rose-600 mt-2 block hover:underline line-clamp-1">
                        {item.url}
                      </Link>
                    </div>

                    <div className="flex justify-between items-center border-t border-navy-50/50 pt-4 mt-auto">
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="w-6 h-6" onClick={() => movePressItem(index, 'up')} disabled={index === 0}>
                          <ChevronUp className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="w-6 h-6" onClick={() => movePressItem(index, 'down')} disabled={index === press.length - 1}>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <button 
                onClick={addPressItem}
                className="h-full min-h-[200px] flex flex-col items-center justify-center bg-gray-50/50 dark:bg-navy-900/20 border-2 border-dashed border-navy-100 dark:border-navy-800 rounded-3xl p-4 hover:border-rose-500/30 group"
            >
                <Plus className="w-8 h-8 text-rose-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-navy-950/40 uppercase">Add Article</span>
            </button>
          </div>
        </div>
      )}

      {/* Gallery Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden rounded-4xl border-none bg-white">
          <div className="bg-navy-950 p-8 text-white">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <ImageIcon className="w-6 h-6 text-amber-500" />
              {editingIndex !== null ? "Edit Memory" : "Add New Memory"}
            </DialogTitle>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label>Memory Image</Label>
                <ImageUpload value={tempItem.url} onChange={(url) => setTempItem({ ...tempItem, url })} />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={tempItem.title} onChange={e => setTempItem({ ...tempItem, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={tempItem.description} onChange={e => setTempItem({ ...tempItem, description: e.target.value })} className="min-h-[120px] resize-none" />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="p-8 bg-gray-50 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveGalleryTempItem} className="bg-navy-950 text-white">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Partner Dialog */}
      <Dialog open={isPartnerDialogOpen} onOpenChange={setIsPartnerDialogOpen}>
        <DialogContent className="max-w-md w-[95vw] p-0 overflow-hidden rounded-4xl border-none bg-white">
          <div className="bg-navy-950 p-8 text-white">
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
              <LayoutGrid className="w-6 h-6 text-indigo-400" />
              {editingIndex !== null ? "Edit Partner" : "Add Partner"}
            </DialogTitle>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <Label>Partner Logo</Label>
              <ImageUpload value={tempPartner.logo} onChange={(logo) => setTempPartner({ ...tempPartner, logo })} />
            </div>
            <div className="space-y-2">
              <Label>Organization Name</Label>
              <Input value={tempPartner.name} onChange={e => setTempPartner({ ...tempPartner, name: e.target.value })} placeholder="e.g. Khaitan & Co" />
            </div>
          </div>
          <DialogFooter className="p-8 bg-gray-50 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsPartnerDialogOpen(false)}>Cancel</Button>
            <Button onClick={savePartnerTempItem} className="bg-navy-950 text-white font-bold">Add Partner</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Press Dialog */}
      <Dialog open={isPressDialogOpen} onOpenChange={setIsPressDialogOpen}>
        <DialogContent className="max-w-md w-[95vw] p-0 overflow-hidden rounded-4xl border-none bg-white">
          <div className="bg-navy-950 p-8 text-white">
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
              <Info className="w-6 h-6 text-rose-400" />
              {editingIndex !== null ? "Edit Article" : "Add Article"}
            </DialogTitle>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <Label>Publication Name</Label>
              <Input value={tempPress.publication} onChange={e => setTempPress({ ...tempPress, publication: e.target.value })} placeholder="e.g. SCC Online" />
            </div>
            <div className="space-y-2">
              <Label>Headline / Title</Label>
              <Textarea value={tempPress.headline} onChange={e => setTempPress({ ...tempPress, headline: e.target.value })} placeholder="e.g. Law School Hosts Mediation Championship..." className="resize-none" />
            </div>
            <div className="space-y-2">
              <Label>Article URL</Label>
              <Input type="url" value={tempPress.url} onChange={e => setTempPress({ ...tempPress, url: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter className="p-8 bg-gray-50 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsPressDialogOpen(false)}>Cancel</Button>
            <Button onClick={savePressTempItem} className="bg-navy-950 text-white font-bold">Save Article</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
