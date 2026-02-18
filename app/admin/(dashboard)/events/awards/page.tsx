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
  Calendar
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
import { NationalImpactAward, AwardRecipient, ConclaveHighlight } from "@/lib/db/schemas";
import { motion, AnimatePresence } from "framer-motion";

export default function AwardsManagementPage() {
  const { token } = useAuth();
  const [eventData, setEventData] = useState<NationalImpactAward | null>(null);
  
  // Recipients State
  const [recipients, setRecipients] = useState<AwardRecipient[]>([]);
  const [isRecipientsLoading, setIsRecipientsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Gallery State
  const [gallery, setGallery] = useState<ConclaveHighlight[]>([]);
  
  // Dialog States
  const [isRecipientDialogOpen, setIsRecipientDialogOpen] = useState(false);
  const [editingRecipientIndex, setEditingRecipientIndex] = useState<number | null>(null);
  const [tempRecipient, setTempRecipient] = useState<AwardRecipient>({ name: "", city: "", category: "", year: "2025" });

  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const [editingGalleryIndex, setEditingGalleryIndex] = useState<number | null>(null);
  const [tempGalleryItem, setTempGalleryItem] = useState<ConclaveHighlight>({ url: "", title: "", description: "" });

  // Fallback data matching the public website
  const fallbackRecipients: AwardRecipient[] = [
    { name: "Adv. Tanu Mehta", city: "Mumbai", category: "Mediation Education", year: "2025" },
    { name: "Justice Mohan Lal Mehta", city: "New Delhi", category: "Mediation Institution Building", year: "2025" },
    { name: "Raj Panchmatia", city: "Mumbai", category: "Mediation Advocacy", year: "2025" },
    { name: "Adv. Veena Ralli", city: "New Delhi", category: "Mediation Practice", year: "2025" }
  ];

  const fallbackGallery: ConclaveHighlight[] = [
    { url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80", title: "Ceremonial Moment 1", description: "Celebrating the advancement of mediation excellence in India." },
    { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80", title: "Ceremonial Moment 2", description: "Celebrating the advancement of mediation excellence in India." }
  ];

  useEffect(() => { fetchEvent(); }, []);

  async function fetchEvent() {
    setIsRecipientsLoading(true);
    try {
      const res = await fetch("/api/content/awards-event?admin=true", { cache: 'no-store' });
      const result = await res.json();
      
      if (result.success && result.data) {
        // In case API returns an array, pick the active one or the first one
        const activeEvent = Array.isArray(result.data) 
          ? (result.data.find((e: NationalImpactAward) => e.isActive) || result.data[0])
          : (result.data._id ? result.data : null);
        
        if (!activeEvent) {
          setRecipients(fallbackRecipients);
          setGallery(fallbackGallery);
          setEventData(null);
          return;
        }

        setEventData(activeEvent);
        setRecipients(activeEvent.recipients?.length > 0 ? activeEvent.recipients : fallbackRecipients);
        setGallery(activeEvent.gallery?.length > 0 ? activeEvent.gallery : fallbackGallery);
      } else {
        setRecipients(fallbackRecipients);
        setGallery(fallbackGallery);
      }
    } catch { 
      setRecipients(fallbackRecipients);
      setGallery(fallbackGallery);
      toast.error("Failed to sync with database."); 
    } finally { 
      setIsRecipientsLoading(false); 
    }
  }

  const handleSave = async (data?: { newRecipients?: AwardRecipient[], newGallery?: ConclaveHighlight[] }) => {
    setIsSaving(true);
    try {
      const isNew = !eventData?._id;
      const method = isNew ? "POST" : "PUT";
      
      const recipientsToSave = data?.newRecipients || recipients;
      const galleryToSave = data?.newGallery || gallery;
      
      const payload = isNew 
        ? { 
            year: new Date().getFullYear(), 
            isActive: true, 
            recipients: recipientsToSave, 
            gallery: galleryToSave 
          }
        : { 
            ...eventData, 
            recipients: recipientsToSave, 
            gallery: galleryToSave 
          };

      const res = await fetch("/api/content/awards-event", {
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

  // --- RECIPIENTS LOGIC ---
  const addRecipientItem = () => {
    setEditingRecipientIndex(null);
    setTempRecipient({ name: "", city: "", category: "", year: eventData?.year.toString() || "2025" });
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
    toast.success("Recipient removed. Saving...");
    handleSave({ newRecipients });
  };

  const moveRecipient = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === recipients.length - 1) return;
    
    const newRecipients = [...recipients];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newRecipients[index], newRecipients[newIndex]] = [newRecipients[newIndex], newRecipients[index]];
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
    toast.success("Moment removed. Saving...");
    handleSave({ newGallery });
  };

  if (isRecipientsLoading) {
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
                Curation portal for the National ImPACT Awards. Manage honorary recipients and ceremonial moments.
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
              Publish Updates
            </Button>
            <p className="text-xs text-center text-white/40 font-mono uppercase tracking-tighter">
              {eventData ? `Linked to ${eventData.year} Edition` : "Draft Mode"}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: HALL OF HONORARY RECIPIENTS */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white border rounded-4xl p-6 shadow-sm">
          <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                  <Medal className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-900">{recipients.length} <span className="font-medium opacity-60">Honorees</span></span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-black text-navy-950 italic uppercase leading-none">Hall of Fame</h3>
                <p className="text-xs text-purple-600 font-bold uppercase tracking-widest mt-1">Recognition – Honorary Recipients</p>
              </div>
          </div>
          
          <Button onClick={addRecipientItem} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-purple-500/30 text-purple-600 hover:bg-purple-500/5 hover:border-purple-500 transition-all font-bold">
              <Plus className="w-5 h-5 mr-2" /> Add New Recipient
          </Button>
        </div>

        {/* Recipients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {recipients.map((item, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                key={`recipient-${index}`}
                className="h-full"
              >
                <Card className="group relative h-full flex flex-col bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden border border-navy-50/50 p-8">
                    {/* Background Year Accent */}
                    <div className="absolute -top-4 -right-4 text-7xl font-black text-navy-950/[0.03] group-hover:text-purple-500/[0.05] transition-colors leading-none italic select-none">
                       {item.year}
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-6">
                            <Medal className="w-4 h-4 text-purple-600" />
                            <span className="text-xs font-mono font-bold text-purple-600 tracking-[0.3em] uppercase">
                                NIAAM Honoree
                            </span>
                          </div>
                          
                          <h3 className="text-3xl font-light text-navy-950 leading-[0.9] tracking-tighter mb-4 italic group-hover:text-purple-600 transition-colors uppercase">
                             {item.name}
                          </h3>
                        </div>

                        <div className="space-y-4">
                           <div className="h-px w-12 bg-purple-500/30 group-hover:w-full transition-all duration-700" />
                           <div className="flex flex-col gap-1">
                               <span className="text-[9px] font-mono text-navy-950/30 uppercase tracking-[0.2em] font-bold">Category</span>
                               <p className="text-md font-light text-navy-950/60 group-hover:text-navy-950 transition-colors">{item.category}</p>
                           </div>
                           
                           <div className="flex items-center gap-2 text-navy-950/20 group-hover:text-navy-950/40 transition-colors">
                              <MapPin className="w-3.5 h-3.5" />
                              <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold">{item.city}</span>
                           </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="w-8 h-8 rounded-lg text-muted-foreground hover:text-navy-950 hover:bg-navy-50" 
                        onClick={() => openRecipientEditDialog(index)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="w-8 h-8 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50" 
                        onClick={() => removeRecipient(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="w-8 h-8 rounded-lg text-muted-foreground hover:text-navy-950 hover:bg-navy-50" 
                        onClick={() => moveRecipient(index, 'up')} 
                        disabled={index === 0}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="w-8 h-8 rounded-lg text-muted-foreground hover:text-navy-950 hover:bg-navy-50" 
                        onClick={() => moveRecipient(index, 'down')} 
                        disabled={index === recipients.length - 1}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Add Empty State Card */}
          <button 
              onClick={addRecipientItem}
              className="flex flex-col items-center justify-center bg-gray-50/50 border-2 border-dashed border-navy-100 rounded-3xl p-12 hover:bg-purple-50/50 hover:border-purple-500/30 transition-all group min-h-[300px]"
          >
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-1">Add Honoree</h3>
              <p className="text-xs text-muted-foreground text-center">Recognize a new contributor</p>
          </button>
        </div>
      </div>

      {/* SECTION 2: CEREMONIAL CLICKS (GALLERY) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white border rounded-4xl p-6 shadow-sm">
          <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                  <ImageIcon className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-amber-900">{gallery.length} <span className="font-medium opacity-60">Photos</span></span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-black text-navy-950 italic uppercase leading-none">Ceremonial Clicks</h3>
                <p className="text-xs text-amber-600 font-bold uppercase tracking-widest mt-1">Gallery – Moments captured</p>
              </div>
          </div>
          
          <Button onClick={addGalleryItem} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-amber-500/30 text-amber-600 hover:bg-amber-500/5 hover:border-amber-500 transition-all font-bold">
              <Plus className="w-5 h-5 mr-2" /> Add Moment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {gallery.map((item, index) => (
              <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={`gallery-${index}`}>
                <Card className="group relative overflow-hidden rounded-3xl border-none shadow-sm hover:shadow-xl transition-all duration-300 aspect-video">
                  {item.url ? (
                    <Image src={item.url} alt={item.title || "Moment"} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-navy-50 text-navy-200"><ImageIcon className="w-12 h-12" /></div>
                  )}
                  
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <h4 className="text-white font-bold">{item.title}</h4>
                    <p className="text-white/60 text-xs line-clamp-1">{item.description}</p>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="w-8 h-8 rounded-lg bg-white/90" onClick={() => openGalleryEditDialog(index)}><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="destructive" className="w-8 h-8 rounded-lg" onClick={() => removeGalleryItem(index)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </Card>
              </motion.div>
            ))}
            <button onClick={addGalleryItem} className="flex flex-col items-center justify-center bg-gray-50/50 border-2 border-dashed border-navy-100 rounded-3xl hover:bg-amber-50/50 transition-all aspect-video">
              <Plus className="w-8 h-8 text-amber-500" />
            </button>
          </AnimatePresence>
        </div>
      </div>

      {/* RECIPIENT DIALOG */}
      <Dialog open={isRecipientDialogOpen} onOpenChange={setIsRecipientDialogOpen}>
        <DialogContent className="max-w-2xl w-[95vw] md:w-full p-0 overflow-hidden rounded-4xl border-none bg-white">
          <div className="bg-purple-600 p-8 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3 italic uppercase tracking-tighter">
                <Medal className="w-6 h-6" />
                {editingRecipientIndex !== null ? "Edit Honoree" : "Add New Honoree"}
              </DialogTitle>
              <DialogDescription className="text-purple-100 italic">
                Setup the profile for the NIAAM Hall of Honorary Recipients.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-8 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <Label className="text-sm font-bold text-navy-950 ml-1">Full Name</Label>
                   <Input value={tempRecipient.name} onChange={e => setTempRecipient({...tempRecipient, name: e.target.value })} className="rounded-2xl h-12 bg-gray-50/50 border-navy-100 focus:ring-purple-500" placeholder="e.g. Adv. Tanu Mehta" />
                </div>
                <div className="space-y-2">
                   <Label className="text-sm font-bold text-navy-950 ml-1">Year</Label>
                   <Input value={tempRecipient.year} onChange={e => setTempRecipient({...tempRecipient, year: e.target.value })} className="rounded-2xl h-12 bg-gray-50/50 border-navy-100 focus:ring-purple-500" placeholder="e.g. 2025" />
                </div>
                <div className="space-y-2">
                   <Label className="text-sm font-bold text-navy-950 ml-1">Category</Label>
                   <Input value={tempRecipient.category} onChange={e => setTempRecipient({...tempRecipient, category: e.target.value })} className="rounded-2xl h-12 bg-gray-50/50 border-navy-100 focus:ring-purple-500" placeholder="e.g. Mediation Education" />
                </div>
                <div className="space-y-2">
                   <Label className="text-sm font-bold text-navy-950 ml-1">City / Location</Label>
                   <Input value={tempRecipient.city} onChange={e => setTempRecipient({...tempRecipient, city: e.target.value })} className="rounded-2xl h-12 bg-gray-50/50 border-navy-100 focus:ring-purple-500" placeholder="e.g. Mumbai" />
                </div>
             </div>
          </div>
          <DialogFooter className="p-8 bg-gray-50 border-t">
            <Button variant="ghost" onClick={() => setIsRecipientDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveRecipient} className="bg-purple-600 hover:bg-purple-500 px-8 rounded-xl font-bold italic text-white shadow-lg">Save Honoree</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* GALLERY DIALOG */}
      <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
        <DialogContent className="max-w-4xl w-[95vw] md:w-full p-0 overflow-hidden rounded-4xl border-none bg-white">
          <div className="bg-amber-600 p-8 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3 italic uppercase tracking-tighter">
                <ImageIcon className="w-6 h-6" />
                Ceremonial Moment
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="p-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <Label className="text-sm font-bold text-navy-950 ml-1 italic">Moment Photo</Label>
                   <ImageUpload value={tempGalleryItem.url} onChange={url => setTempGalleryItem({...tempGalleryItem, url})} />
                </div>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <Label className="text-sm font-bold text-navy-950 ml-1 italic">Title</Label>
                      <Input value={tempGalleryItem.title} onChange={e => setTempGalleryItem({...tempGalleryItem, title: e.target.value })} className="rounded-2xl h-12 bg-gray-50/50 border-navy-100 focus:ring-amber-500" />
                   </div>
                   <div className="space-y-2">
                      <Label className="text-sm font-bold text-navy-950 ml-1 italic">Description / Context</Label>
                      <Textarea value={tempGalleryItem.description} onChange={e => setTempGalleryItem({...tempGalleryItem, description: e.target.value })} className="rounded-2xl min-h-[140px] resize-none bg-gray-50/50 border-navy-100 focus:ring-amber-500" />
                   </div>
                </div>
             </div>
          </div>
          <DialogFooter className="p-8 bg-gray-50 border-t">
            <Button variant="ghost" onClick={() => setIsGalleryDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveGalleryItem} className="bg-amber-600 hover:bg-amber-500 px-8 rounded-xl font-bold italic text-white">Save Moment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Visual Strategy Guide */}
      <div className="bg-purple-50 rounded-4xl p-10 border border-purple-200 flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 shrink-0 bg-purple-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30 rotate-3">
            <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div>
            <h3 className="text-2xl font-black italic text-purple-900 mb-2 tracking-tight uppercase">Recognition Strategy</h3>
            <p className="text-purple-800/80 leading-relaxed max-w-3xl font-medium">
                The Hall of Honorary Recipients is the core of the NIAAM event. Each card is automatically styled with the year as a background element. Ensure names and categories are proofread for public display.
            </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        </div>
      </div>
    </div>
  );
}
