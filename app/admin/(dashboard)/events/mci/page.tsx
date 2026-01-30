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

export default function MCIGalleryPage() {
  const { token } = useAuth();
  const [eventData, setEventData] = useState<MCIEvent | null>(null);
  const [gallery, setGallery] = useState<Array<{ id: string; url: string; title: string; description: string; order: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempItem, setTempItem] = useState<{ url: string; title: string; description: string; order: number }>({ url: "", title: "", description: "", order: 0 });

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
          const galleryWithIds = (activeEvent.gallery && activeEvent.gallery.length > 0 ? activeEvent.gallery : fallbackGallery)
            .map((item: any, idx: number) => ({
              ...item,
              id: item.id || `item-${idx}-${Date.now()}`
            }));
          setGallery(galleryWithIds);
        } else {
          setGallery(fallbackGallery.map((item, idx) => ({ ...item, id: `fallback-${idx}` })));
        }
      } else {
        setGallery(fallbackGallery.map((item, idx) => ({ ...item, id: `fallback-${idx}` })));
      }
    } catch (e) { 
      setGallery(fallbackGallery.map((item, idx) => ({ ...item, id: `fallback-${idx}` })));
      toast.error("Database connection issue. Showing default images."); 
    }
    finally { setIsLoading(false); }
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const galleryToSave = gallery.map(({ ...rest }) => rest);
      const method = (eventData && eventData._id) ? "PUT" : "POST";
      const payload = (eventData && eventData._id) 
        ? { _id: eventData._id, isActive: true, gallery: galleryToSave }
        : {
            year: new Date().getFullYear(),
            title: ["Mediation", "Champions", "League"],
            subtitle: "India's Premier Mediation Competition",
            isActive: true,
            gallery: galleryToSave
          };

      const res = await fetch("/api/content/mci-event", {
        method: method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      
      const result = await res.json();
      if (result.success) {
        toast.success("Gallery published successfully!");
        fetchEvent();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch (e) { 
      toast.error("Save failed"); 
    } finally { 
      setIsSaving(false); 
    }
  };

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

  const saveTempItem = () => {
    const newGallery = [...gallery];
    if (editingIndex !== null) {
      newGallery[editingIndex] = { ...tempItem, id: gallery[editingIndex].id };
    } else {
      newGallery.push({ ...tempItem, id: `new-${Date.now()}` });
    }
    setGallery(newGallery);
    setIsDialogOpen(false);
    toast.info("Changes staged. Click Publish to save to website.");
  };

  const removeGalleryItem = async (index: number) => {
    const newGallery = gallery.filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, order: i + 1 }));
    
    setGallery(newGallery);
    toast.success("Card removed from view");

    // Persist to API immediately as requested by user
    if (eventData?._id) {
      try {
        const galleryToSave = newGallery.map(({ ...rest }) => rest);
        const res = await fetch("/api/content/mci-event", {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({ 
            _id: eventData._id, 
            gallery: galleryToSave 
          })
        });
        
        const result = await res.json();
        if (result.success) {
          toast.success("Server updated successfully");
        } else {
          toast.error("Failed to update server, but card removed locally");
        }
      } catch (error) {
        console.error("Delete sync error:", error);
        toast.error("Network error: Deletion not saved to server");
      }
    }
  };

  const updateGalleryItem = (index: number, field: string, value: any) => {
    const newGallery = [...gallery];
    newGallery[index] = { ...newGallery[index], [field]: value };
    setGallery(newGallery);
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === gallery.length - 1) return;
    
    const newGallery = [...gallery];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newGallery[index], newGallery[newIndex]] = [newGallery[newIndex], newGallery[index]];
    newGallery.forEach((item, i) => item.order = i + 1);
    
    setGallery(newGallery);

    // Persist order to API
    if (eventData?._id) {
      try {
        const galleryToSave = newGallery.map(({ ...rest }) => rest);
        await fetch("/api/content/mci-event", {
          method: "PUT",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify({ _id: eventData._id, gallery: galleryToSave })
        });
      } catch (e) {
        console.error("Order sync error:", e);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
        <p className="text-muted-foreground animate-pulse font-medium">Curating your memories...</p>
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
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic flex items-center gap-4">
                <Trophy className="w-10 h-10 text-amber-500" /> 
                MCL MEMORIES
              </h1>
              <p className="text-white/60 text-lg font-light max-w-xl">
                Redefinition of excellence. Curate the visual journey of the Mediation Champions League.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="rounded-2xl px-10 h-14 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg shadow-xl shadow-amber-900/40 border-none transition-all hover:scale-105 active:scale-95"
            >
              {isSaving ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <Save className="w-5 h-5 mr-3" />}
              Publish Gallery
            </Button>
            <p className="text-[10px] text-center text-white/40 font-mono uppercase tracking-tighter">
              {eventData ? `Linked to ${eventData.year} Edition` : "Draft Mode"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats & Actions Bar */}
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
        
          <Button onClick={addGalleryItem} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-amber-500/30 text-amber-600 hover:bg-amber-500/5 hover:border-amber-500 transition-all font-bold">
            <Plus className="w-5 h-5 mr-2" /> Append New Memory
          </Button>
      </div>

      {/* Redisgned Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {gallery.map((photo, index) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              key={photo.id}
              className="h-full"
            >
              <Card className="group relative h-full flex flex-col bg-white dark:bg-navy-900 border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden border border-navy-50/50">
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {photo.url ? (
                    <div className="relative w-full h-full">
                      <Image 
                        src={photo.url} 
                        alt={photo.title || "Gallery image"} 
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
                      onClick={() => removeGalleryItem(index)}
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
                    <h3 className="font-bold text-lg text-navy-950 dark:text-white line-clamp-1">
                      {photo.title || "Untitled Memory"}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed h-10">
                    {photo.description || "No description provided."}
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
                        disabled={index === gallery.length - 1}
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
            onClick={addGalleryItem}
            className="flex flex-col items-center justify-center bg-gray-50/50 dark:bg-navy-900/20 border-2 border-dashed border-navy-100 dark:border-navy-800 rounded-3xl p-12 hover:bg-amber-50/50 hover:border-amber-500/30 transition-all group min-h-[350px]"
        >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-navy-950 dark:text-white mb-1">Add Memory</h3>
            <p className="text-xs text-muted-foreground text-center">Capture a new moment for the gallery</p>
        </button>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden rounded-4xl border-none shadow-2xl flex flex-col bg-white">
          <div className="bg-navy-950 p-8 text-white shrink-0">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <ImageIcon className="w-6 h-6 text-amber-500" />
                {editingIndex !== null ? "Edit Memory" : "Add New Memory"}
              </DialogTitle>
              <DialogDescription className="text-navy-200">
                Provide details for this visual memory. Ensure high-quality imagery is used.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-none">
            <div className="space-y-4">
               <Label className="text-sm font-bold text-navy-950 ml-1">Memory Photo</Label>
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

      {/* Guide Card */}
      <div className="bg-amber-50 dark:bg-amber-950/20 rounded-[2.5rem] p-10 border border-amber-200 dark:border-amber-800 flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 shrink-0 bg-amber-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-500/30 rotate-3">
            <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div>
            <h3 className="text-2xl font-black italic text-amber-900 dark:text-amber-100 mb-2 tracking-tight uppercase">Visual Strategy Guide</h3>
            <p className="text-amber-800/80 dark:text-amber-200/80 leading-relaxed max-w-3xl">
                The MCI Memories section is a cinematic carousel on the public website. For the best impact, ensure titles are high-level and descriptions are concise. High-resolution landscape (16:9) images work best for this layout.
            </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
             <div className="text-right hidden md:block">
                 <p className="text-[10px] font-bold text-amber-900/40 uppercase tracking-widest leading-none">Status</p>
                 <p className="text-sm font-bold text-amber-900/80 dark:text-amber-100">Synchronized</p>
             </div>
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        </div>
      </div>
    </div>
  );
}
