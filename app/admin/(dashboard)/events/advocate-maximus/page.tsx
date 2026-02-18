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
  Gavel,
  Sparkles,
  Users,
  LayoutGrid,
  ExternalLink,
  Settings
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { MCIEvent, ConclaveHighlight } from "@/lib/db/schemas";
import { motion, AnimatePresence } from "framer-motion";

export default function AdvocateMaximusAdminPage() {
  const { token } = useAuth();
  const [eventData, setEventData] = useState<MCIEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Strategic Partners State
  const [partners, setPartners] = useState<ConclaveHighlight[]>([]);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [editingPartnerIndex, setEditingPartnerIndex] = useState<number | null>(null);
  const [tempPartner, setTempPartner] = useState<ConclaveHighlight>({ url: "", title: "", description: "" });

  // Gallery State (Memories)
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    fetchEvent();
  }, []);

  async function fetchEvent() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/advocate-maximus-event?all=true", { cache: 'no-store' });
      const result = await res.json();
      
      if (result.success && result.data && result.data.length > 0) {
        // Find active event or take the latest
        const activeEvent = result.data.find((e: MCIEvent) => e.isActive) || result.data[0];
        setEventData(activeEvent);
        setPartners(activeEvent.strategicPartners || []);
        setGallery(activeEvent.gallery || []);
      }
    } catch (e) {
      toast.error("Failed to fetch event data");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSaveAll = async (updates?: any) => {
    if (!eventData) return;
    setIsSaving(true);
    try {
      const payload = {
        ...eventData,
        ...updates,
        strategicPartners: updates?.partners || partners,
        gallery: updates?.gallery || gallery,
        updatedAt: new Date()
      };

      const res = await fetch("/api/content/advocate-maximus-event", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Changes published successfully!");
        // Update local state
        setEventData(payload);
        if (updates?.partners) setPartners(updates.partners);
        if (updates?.gallery) setGallery(updates.gallery);
      } else {
        toast.error(result.error || "Failed to save changes");
      }
    } catch (e) {
      toast.error("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  // --- PARTNERS LOGIC ---
  const importGlobalPartners = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/content/partners");
      const result = await res.json();
      if (result.success && result.data) {
        const imported = result.data.map((p: any) => ({
          url: p.logo.url,
          title: p.name,
          description: p.category ? `Global ${p.category}` : ""
        }));
        
        const newPartners = [...partners, ...imported];
        setPartners(newPartners);
        toast.success(`Imported ${imported.length} partners from global list!`);
        handleSaveAll({ partners: newPartners });
      }
    } catch (e) {
      toast.error("Failed to import global partners");
    } finally {
      setIsSaving(false);
    }
  };

  const addPartner = () => {
    setEditingPartnerIndex(null);
    setTempPartner({ url: "", title: "", description: "" });
    setIsPartnerDialogOpen(true);
  };

  const editPartner = (index: number) => {
    setEditingPartnerIndex(index);
    setTempPartner({ ...partners[index] });
    setIsPartnerDialogOpen(true);
  };

  const savePartnerDialog = () => {
    const newPartners = [...partners];
    if (editingPartnerIndex !== null) {
      newPartners[editingPartnerIndex] = { ...tempPartner };
    } else {
      newPartners.push({ ...tempPartner });
    }
    setPartners(newPartners);
    setIsPartnerDialogOpen(false);
    handleSaveAll({ partners: newPartners });
  };

  const removePartner = (index: number) => {
    const newPartners = partners.filter((_, i) => i !== index);
    setPartners(newPartners);
    handleSaveAll({ partners: newPartners });
    toast.success("Partner removed");
  };

  const movePartner = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === partners.length - 1) return;
    const newPartners = [...partners];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newPartners[index], newPartners[targetIndex]] = [newPartners[targetIndex], newPartners[index]];
    setPartners(newPartners);
    handleSaveAll({ partners: newPartners });
  };

  const initializeEvent = async () => {
    setIsSaving(true);
    try {
      const newEvent = {
        year: 2025,
        subtitle: "Redefining Advocacy",
        title: ["ADVOCATE", "MAXIMUS"],
        isActive: true,
        heroImage: { url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80", alt: "Hero" },
        visionImage: { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80", alt: "Poster" },
        strategicPartners: [],
        gallery: [],
        // MCI Compatibility fields
        heroDescription: ["India's first Arb-Med competition"],
        eventDetails: { dates: "TBD", venue: "New Delhi", hosts: "The PACT", sponsors: "TBD" },
        vision: { subtitle: "The Legacy", title: "Globally Renowned", description: ["Born out of a vision..."], experienceText: "" },
        emails: { signUp: "info@thepact.in", sponsor: "info@thepact.in", general: "info@thepact.in" },
        champions: [],
        pastEditions: [],
        mediaCoverage: [],
        rewards: []
      };

      const res = await fetch("/api/content/advocate-maximus-event", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newEvent)
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Event initialized successfully!");
        setEventData(result.data);
      } else {
        toast.error(result.error || "Failed to initialize");
      }
    } catch (e) {
      toast.error("Initialization failed");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
        <p className="text-muted-foreground animate-pulse font-medium">Synchronizing Advocate Maximus...</p>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-4xl border-2 border-dashed">
        <Gavel className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold">No Event Data Found</h2>
        <p className="text-muted-foreground max-w-md mt-2">Create an Advocate Maximus edition first to manage its contents.</p>
        <div className="flex gap-4 mt-6">
          <Link href="/admin/events">
            <Button variant="outline" className="rounded-2xl">Back to All Events</Button>
          </Link>
          <Button onClick={initializeEvent} disabled={isSaving} className="rounded-2xl bg-emerald-600 hover:bg-emerald-700">
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Create First Edition (2025)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-4xl bg-navy-950 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <Link href="/admin/events" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-emerald-500/80 hover:text-emerald-500 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
            <div className="space-y-1">
              <h1 className="page-title text-4xl md:text-5xl font-black tracking-tighter italic flex items-center gap-4">
                <Gavel className="w-10 h-10 text-emerald-500" /> 
                MAXIMUS {eventData.year}
              </h1>
              <p className="text-white/60 text-lg font-light max-w-xl">
                Curating the "Strategic Partners" and event memories for the Advocate Maximus {eventData.year} edition.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button 
              onClick={() => handleSaveAll()} 
              disabled={isSaving}
              className="rounded-2xl px-10 h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-xl shadow-emerald-900/40 border-none transition-all hover:scale-105 active:scale-95"
            >
              {isSaving ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <Save className="w-5 h-5 mr-3" />}
              Publish Changes
            </Button>
            <p className="text-xs text-center text-white/40 font-mono uppercase tracking-tighter">
              Connected to MongoDB Atlas & Vercel
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="partners" className="space-y-8">
        <TabsList className="bg-navy-50 p-1.5 rounded-2xl h-14 border border-navy-100 flex items-stretch max-w-2xl">
          <TabsTrigger value="partners" className="grow rounded-xl font-bold uppercase tracking-widest text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm">
            <Users className="w-4 h-4 mr-2" /> Strategic Partners
          </TabsTrigger>
          <TabsTrigger value="identity" className="grow rounded-xl font-bold uppercase tracking-widest text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm">
            <Settings className="w-4 h-4 mr-2" /> Event Identity
          </TabsTrigger>
          <TabsTrigger value="gallery" className="grow rounded-xl font-bold uppercase tracking-widest text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm">
            <LayoutGrid className="w-4 h-4 mr-2" /> Memories
          </TabsTrigger>
        </TabsList>

        {/* SECTION: STRATEGIC PARTNERS */}
        <TabsContent value="partners" className="space-y-6 outline-none">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white border rounded-4xl p-6 shadow-sm">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-600 font-bold text-sm">
                    <Sparkles className="w-4 h-4 fill-current" /> Collaborating with Excellence
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="text-xl font-black text-navy-950 italic uppercase leading-none">Strategic Partners</h3>
                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mt-1">{partners.length} Profiles Linked</p>
                </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={importGlobalPartners} disabled={isSaving} variant="secondary" className="rounded-2xl h-12 px-6 border border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all font-bold">
                  <Sparkles className="w-4 h-4 mr-2" /> Sync Global
              </Button>
              <Button onClick={addPartner} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/5 hover:border-emerald-50 transition-all font-bold">
                  <Plus className="w-5 h-5 mr-2" /> Append Partner Logo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {partners.map((partner, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={`partner-${index}`}
                  className="h-full"
                >
                  <Card className="group relative h-full flex flex-col bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden border border-navy-50/50">
                    <div className="relative aspect-video overflow-hidden bg-muted flex items-center justify-center p-6 bg-linear-to-br from-gray-50 to-gray-100">
                      {partner.url ? (
                        <div className="relative w-full h-full">
                          <Image src={partner.url} alt={partner.title || "Logo"} fill className="object-contain transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      ) : (
                        <ImageIcon className="w-12 h-12 opacity-10" />
                      )}
                      
                      <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon" variant="secondary" className="w-9 h-9 rounded-xl bg-white shadow-lg" onClick={() => editPartner(index)}>
                          <Edit className="w-4 h-4 text-navy-950" />
                        </Button>
                        <Button size="icon" variant="destructive" className="w-9 h-9 rounded-xl shadow-lg" onClick={() => removePartner(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white rounded text-xs font-bold">#{index + 1}</div>
                    </div>
                    <CardContent className="p-4 flex-1 space-y-1">
                      <h4 className="font-bold text-navy-950 truncate">{partner.title || "New Partner"}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">{partner.description || "No description set"}</p>
                    </CardContent>
                    <CardFooter className="p-2 border-t flex justify-between">
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="w-7 h-7" onClick={() => movePartner(index, 'up')} disabled={index === 0}><ChevronUp className="w-3 h-3" /></Button>
                        <Button size="icon" variant="ghost" className="w-7 h-7" onClick={() => movePartner(index, 'down')} disabled={index === partners.length - 1}><ChevronDown className="w-3 h-3" /></Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[9px] font-bold text-emerald-600 uppercase" onClick={() => editPartner(index)}>Configure</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <button onClick={addPartner} className="flex flex-col items-center justify-center bg-emerald-50/50 border-2 border-dashed border-emerald-100 rounded-3xl p-8 hover:bg-emerald-100/50 hover:border-emerald-500/30 transition-all group min-h-[240px]">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <Plus className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-sm font-bold text-navy-950">Add Partner</h3>
            </button>
          </div>
        </TabsContent>

        {/* SECTION: EVENT IDENTITY */}
        <TabsContent value="identity" className="space-y-6 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-4xl border-none shadow-sm p-8 space-y-8 bg-white">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-navy-950 font-bold ml-1 italic">Edition Year</Label>
                    <Input 
                      type="number" 
                      value={eventData.year} 
                      onChange={e => setEventData({...eventData, year: parseInt(e.target.value)})}
                      className="rounded-2xl h-12 bg-gray-50/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-navy-950 font-bold ml-1 italic">Subtitle / Campaign</Label>
                    <Input 
                      value={eventData.subtitle} 
                      onChange={e => setEventData({...eventData, subtitle: e.target.value})}
                      className="rounded-2xl h-12 bg-gray-50/50"
                      placeholder="e.g. Redefining Advocacy"
                    />
                  </div>
               </div>

               <div className="space-y-4">
                  <Label className="text-navy-950 font-bold ml-1 italic">Title Construction</Label>
                  <div className="grid grid-cols-2 gap-4">
                     <Input value={eventData.title[0]} onChange={e => {
                       const t = [...eventData.title]; t[0] = e.target.value; setEventData({...eventData, title: t});
                     }} className="rounded-2xl h-12" placeholder="Line 1" />
                     <Input value={eventData.title[1]} onChange={e => {
                       const t = [...eventData.title]; t[1] = e.target.value; setEventData({...eventData, title: t});
                     }} className="rounded-2xl h-12" placeholder="Line 2" />
                  </div>
               </div>

               <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-black text-xs uppercase tracking-widest text-emerald-600">Visual Core</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-navy-400 uppercase tracking-tighter">Hero Background</Label>
                      <ImageUpload value={eventData.heroImage?.url} onChange={url => setEventData({...eventData, heroImage: {url, alt: "Hero"}})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-navy-400 uppercase tracking-tighter">Legacy Poster</Label>
                      <ImageUpload value={eventData.visionImage?.url} onChange={url => setEventData({...eventData, visionImage: {url, alt: "Poster"}})} />
                    </div>
                  </div>
               </div>
            </Card>

            <div className="space-y-6">
               <Card className="rounded-4xl border-none shadow-sm p-8 bg-navy-950 text-white relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                       <Sparkles className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Global Status</h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      Only the active edition will be showcased on the primary event landing page. Ensure all assets are high-resolution.
                    </p>
                    <div className="pt-4 flex items-center gap-4">
                       <div className="grow h-12 bg-white/5 rounded-2xl flex items-center px-4 border border-white/10">
                          <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-widest">Active Status</span>
                          <div className="ml-auto w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                       </div>
                    </div>
                  </div>
               </Card>

               <div className="p-8 bg-emerald-50 rounded-4xl border border-emerald-100 flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-sm">Frontend Link</h4>
                    <p className="text-xs text-emerald-700/60 mt-1">Live at: mediation.com/events/advocate-maximus</p>
                  </div>
               </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6 outline-none">
           <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white border rounded-4xl p-6 shadow-sm">
              <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-600 font-bold text-sm">
                      <LayoutGrid className="w-4 h-4" /> Memories & Archival
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className="text-xl font-black text-navy-950 italic uppercase leading-none">Event Gallery</h3>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">{gallery.length} Frames Saved</p>
                  </div>
              </div>
              <Button 
                onClick={() => {
                  const newG = [...gallery, { url: "", title: "", description: "", order: gallery.length + 1 }];
                  setGallery(newG);
                  handleSaveAll({ gallery: newG });
                }} 
                variant="outline" 
                className="rounded-2xl h-12 px-6 border-2 border-dashed border-blue-500/30 text-blue-600 hover:bg-blue-500/5 hover:border-blue-50 transition-all font-bold"
              >
                  <Plus className="w-5 h-5 mr-2" /> Add Memory
              </Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((item, idx) => (
                <Card key={idx} className="rounded-[2.5rem] border border-navy-100/50 overflow-hidden flex flex-col bg-white shadow-sm group hover:shadow-2xl transition-all duration-500">
                   <div className="relative aspect-video bg-gray-50 p-3">
                      <ImageUpload 
                        value={item.url} 
                        onChange={url => {
                          const newG = [...gallery]; 
                          newG[idx].url = url; 
                          setGallery(newG); 
                          handleSaveAll({ gallery: newG });
                        }} 
                      />
                   </div>
                   <div className="p-6 space-y-5">
                      <div className="flex justify-between items-center">
                         <div className="px-3 py-1 bg-emerald-500/10 rounded-lg">
                            <h4 className="font-extrabold text-xs uppercase tracking-[0.2em] text-emerald-600">Memory Frame #{idx+1}</h4>
                         </div>
                         <Button 
                            size="icon" 
                            variant="ghost" 
                            className="w-9 h-9 text-red-500 hover:bg-red-50 rounded-xl transition-colors" 
                            onClick={() => {
                              const newG = gallery.filter((_, i) => i !== idx); 
                              setGallery(newG); 
                              handleSaveAll({ gallery: newG });
                            }}
                          >
                           <Trash2 className="w-4 h-4" />
                         </Button>
                      </div>
                      
                      <div className="space-y-4">
                         <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1.5">
                               <Label className="text-xs font-black uppercase text-navy-400 tracking-widest ml-1">Title / Caption</Label>
                               <Input 
                                 value={item.title} 
                                 onChange={e => {
                                   const newG = [...gallery]; newG[idx].title = e.target.value; setGallery(newG);
                                 }} 
                                 className="h-11 text-sm rounded-2xl bg-gray-50/50 border-navy-100 focus:ring-emerald-500" 
                                 placeholder="e.g. Opening Ceremony" 
                               />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                               <Label className="text-xs font-black uppercase text-navy-400 tracking-widest ml-1">Archive Order</Label>
                               <Input 
                                 type="number" 
                                 value={item.order} 
                                 onChange={e => {
                                   const newG = [...gallery]; newG[idx].order = parseInt(e.target.value); setGallery(newG);
                                 }} 
                                 className="h-11 text-sm rounded-2xl bg-gray-50/50 border-navy-100" 
                               />
                            </div>
                            <div className="flex items-end pb-0.5">
                               <Button 
                                  variant="ghost" 
                                  className="w-full h-11 rounded-2xl text-xs font-bold uppercase tracking-widest text-emerald-600 border border-emerald-100 hover:bg-emerald-50"
                                  onClick={() => handleSaveAll()}
                               >
                                  Save Frame
                               </Button>
                            </div>
                         </div>
                         <div className="space-y-1.5">
                            <Label className="text-xs font-black uppercase text-navy-400 tracking-widest ml-1">Context / Description</Label>
                            <Input 
                               value={item.description} 
                               onChange={e => {
                                 const newG = [...gallery]; newG[idx].description = e.target.value; setGallery(newG);
                               }} 
                               className="h-11 text-sm rounded-2xl bg-gray-50/50 border-navy-100" 
                               placeholder="What makes this moment special?" 
                            />
                         </div>
                      </div>
                   </div>
                </Card>
              ))}
              {gallery.length === 0 && (
                <div className="col-span-full py-20 bg-gray-50/50 rounded-4xl border-2 border-dashed flex flex-col items-center text-muted-foreground">
                   <LayoutGrid className="w-12 h-12 mb-4 opacity-10" />
                   <p className="font-medium">The vault is currently empty.</p>
                </div>
              )}
           </div>
        </TabsContent>
      </Tabs>

      {/* PARTNER DIALOG */}
      <Dialog open={isPartnerDialogOpen} onOpenChange={setIsPartnerDialogOpen}>
        <DialogContent className="max-w-4xl w-[95vw] md:w-full p-0 overflow-hidden rounded-4xl border-none shadow-2xl flex flex-col bg-white">
          <div className="bg-emerald-600 p-8 text-white shrink-0">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <Users className="w-6 h-6" />
                {editingPartnerIndex !== null ? "Edit Partner Profile" : "Register Strategic Partner"}
              </DialogTitle>
              <DialogDescription className="text-emerald-100 italic">
                Configure how this partner appears in the collaborative excellence ribbon.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                 <Label className="text-sm font-bold text-navy-950 ml-1">Partner Logo (Horizontal preferred)</Label>
                 <ImageUpload value={tempPartner.url} onChange={(url) => setTempPartner({ ...tempPartner, url })} />
                 <p className="text-xs text-muted-foreground italic px-1">Tip: Use horizontal logos with transparent backgrounds.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-navy-950 ml-1 italic">Organization Name</Label>
                  <Input 
                    value={tempPartner.title} 
                    onChange={e => setTempPartner({ ...tempPartner, title: e.target.value })} 
                    className="rounded-2xl h-12 bg-gray-50/50 border-navy-100 focus:ring-emerald-500"
                    placeholder="e.g. Samvād Partners"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-navy-950 ml-1 italic">Classification / Category</Label>
                  <Textarea 
                    value={tempPartner.description} 
                    onChange={e => setTempPartner({ ...tempPartner, description: e.target.value })} 
                    className="rounded-2xl min-h-[160px] bg-gray-50/50 border-navy-100 resize-none focus:ring-emerald-500"
                    placeholder="e.g. Strategic Anchor Partner | Supporting Excellence since 2017"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-8 bg-gray-50/80 backdrop-blur-sm border-t flex justify-end gap-3 shrink-0">
            <Button variant="ghost" onClick={() => setIsPartnerDialogOpen(false)} className="rounded-xl h-12 px-8">Cancel</Button>
            <Button onClick={savePartnerDialog} className="rounded-xl h-12 px-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/10">
              {editingPartnerIndex !== null ? "Update Identity" : "Commit to Ranks"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
