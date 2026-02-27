"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Mic,
  Loader2,
  ArrowLeft,
  Image as ImageIcon,
  ExternalLink,
  Calendar,
  Users,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/context/AuthContext";
import { type ResourceItem } from "@/lib/db/schemas";

export default function PodcastAdminPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<ResourceItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isHeroSaving, setIsHeroSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/content/resources?all=true&type=podcast`, {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch");
      }
      const result = await response.json();
      if (result.success) {
        setItems(result.data || []);
      } else {
        toast.error(result.error || "Failed to fetch podcast episodes");
      }
    } catch (error: any) { 
      console.error("Fetch error:", error);
      toast.error(error.message || "Failed to fetch podcast episodes"); 
    }
    finally { setIsLoading(false); }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this podcast episode?")) return;
    try {
      const response = await fetch(`/api/content/resources?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Podcast episode deleted");
        setItems(items.filter(i => (i._id as any).toString() !== id));
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch (error) { toast.error("Delete failed"); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = editingItem?._id ? "PUT" : "POST";
      const response = await fetch("/api/content/resources", {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ ...editingItem, type: "podcast" })
      });
      const result = await response.json();
      if (result.success) {
        toast.success(editingItem?._id ? "Podcast episode updated" : "Podcast episode created");
        setIsDialogOpen(false);
        fetchItems();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch (error) { 
      console.error(error);
      toast.error("Save failed"); 
    }
    finally { setIsSaving(false); }
  };

  const openCreateDialog = () => {
    setEditingItem({ 
      title: "", 
      type: "podcast",
      subtitle: "", 
      description: "",
      image: "",
      url: "",
      author: "",
      publication: "",
      date: "",
      category: "",
      order: items.length + 1, 
      isActive: true,
      isFeatured: false
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: ResourceItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const filteredItems = items
    .filter(item => item.category !== "hero-banner")
    .filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group border-b border-navy-50 pb-8">
        <div className="space-y-4">
          <Link href="/admin/resources" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-600 border border-rose-500/20">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-navy-950 tracking-tight">Podcast Episodes</h1>
              <p className="text-navy-950/40 text-sm font-medium uppercase tracking-widest mt-1">Manage Mission Mediation Podcast episodes</p>
            </div>
          </div>
        </div>
        <Button onClick={openCreateDialog} className="rounded-xl px-6 h-12 bg-navy-950 hover:bg-navy-900 text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-navy-950/10">
          <Plus className="w-4 h-4 mr-2" /> Add Episode
        </Button>
      </div>

      {/* Hero Section Management */}
      <Card className="rounded-3xl border-none shadow-xl shadow-navy-950/5 bg-white overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 border border-gold-500/20">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-950 tracking-tight">Podcast Hero Banner</h2>
                <p className="text-navy-950/40 text-xs font-black uppercase tracking-widest mt-1">Manage the background image for the podcast hero section</p>
              </div>
            </div>
            
            {items.find(i => i.category === "hero-banner") && (
               <Badge className="bg-gold-500/10 text-gold-600 border-gold-500/20 px-3 py-1 rounded-full text-sm font-black uppercase tracking-widest">
                 Live on Website
               </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
            <div className="space-y-5 w-full max-w-2xl mx-auto xl:mx-0">
               <Label className="text-sm uppercase tracking-[0.2em] font-black text-navy-950/40 ml-1">Podcast Hero Image</Label>
               <ImageUpload 
                  value={items.find(i => i.category === "hero-banner")?.image || "/assets/img/podcast-hero.png"}
                  onChange={async (url) => {
                    setIsHeroSaving(true);
                    try {
                      const existingHero = items.find(i => i.category === "hero-banner");
                      const method = existingHero ? "PUT" : "POST";
                      const body = existingHero 
                        ? { ...existingHero, image: url } 
                        : { 
                            title: "Podcast Hero Banner", 
                            type: "podcast", 
                            category: "hero-banner", 
                            image: url, 
                            isActive: true, 
                            order: 0 
                          };

                      const response = await fetch("/api/content/resources", {
                        method,
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                        body: JSON.stringify(body)
                      });
                      
                      const result = await response.json();
                      if (result.success) {
                        toast.success("Hero banner updated successfully");
                        fetchItems();
                      } else {
                        toast.error(result.error || "Failed to update hero banner");
                      }
                    } catch (error) {
                      toast.error("An error occurred while saving");
                    } finally {
                      setIsHeroSaving(false);
                    }
                  }}
               />
               <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-navy-50 border border-navy-100/50">
                 <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                 <p className="text-[11px] text-navy-950/60 leading-relaxed font-medium">
                   This image is displayed at <span className="text-navy-950 font-bold">90% of the viewport height</span> with an overlay. Use a high-resolution landscape image for best results.
                 </p>
               </div>
            </div>

            <div className="relative group aspect-video rounded-3xl overflow-hidden bg-navy-900 border border-navy-100 shadow-2xl w-full max-w-2xl mx-auto xl:mx-0">
              {/* Preview */}
              <div className="absolute inset-0 opacity-60">
                 <img 
                   src={items.find(i => i.category === "hero-banner")?.image || "/assets/img/podcast-hero.png"} 
                   className="w-full h-full object-cover object-top" 
                   alt="Hero Preview" 
                 />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <div className="absolute inset-x-8 bottom-8">
                <div className="w-10 h-0.5 bg-gold-500 mb-4" />
                <h3 className="text-xl font-light text-white leading-tight">
                  Unpacking what <span className="text-gold-500 italic font-medium">actually</span> happens in mediation
                </h3>
              </div>
              {isHeroSaving && (
                <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Updating Hero...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Episodes Management */}
      <Card className="rounded-3xl border-none shadow-xl shadow-navy-950/5 bg-white overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-950 tracking-tight">Upcoming Episodes (Season 2)</h2>
                <p className="text-navy-950/40 text-xs font-black uppercase tracking-widest mt-1">Manage the 3 featured episodes displayed in the Season 2 section</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
               <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 px-3 py-1 rounded-full text-sm font-black uppercase tracking-widest">
                 Featured Section
               </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((pos) => {
              const episode = items
                .filter(i => i.isFeatured && i.category !== "hero-banner")
                .sort((a, b) => (a.order || 0) - (b.order || 0))[pos - 1];

              return (
                <div key={pos} className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <Label className="text-sm uppercase tracking-[0.2em] font-black text-navy-950/40">Episode Slot {pos}</Label>
                    {episode && (
                      <button 
                        onClick={() => openEditDialog(episode)}
                        className="text-sm font-bold text-primary hover:underline uppercase tracking-widest"
                      >
                        Edit Details
                      </button>
                    )}
                  </div>
                  
                  <div className="relative group aspect-square rounded-2xl overflow-hidden bg-navy-50 border border-navy-100/50 shadow-inner">
                    <ImageUpload 
                      value={episode?.image || `/podcast/season2-ep${pos}.png`}
                      onChange={async (url) => {
                        try {
                          setIsSaving(true);
                          const method = episode ? "PUT" : "POST";
                          const body = episode 
                            ? { ...episode, image: url } 
                            : { 
                                title: `Upcoming Episode ${pos}`, 
                                type: "podcast", 
                                category: "Season 2", 
                                image: url, 
                                isActive: true, 
                                isFeatured: true,
                                order: pos 
                              };

                          const response = await fetch("/api/content/resources", {
                            method,
                            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                            body: JSON.stringify(body)
                          });
                          
                          const result = await response.json();
                          if (result.success) {
                            toast.success(`Episode ${pos} updated`);
                            fetchItems();
                          } else {
                            toast.error(result.error || "Update failed");
                          }
                        } catch (error) {
                          toast.error("Error saving episode");
                        } finally {
                          setIsSaving(false);
                        }
                      }}
                    />
                  </div>
                  {episode && (
                    <div className="px-1">
                      <p className="text-sm font-bold text-navy-950 truncate">{episode.title}</p>
                      <p className="text-sm text-navy-950/40 uppercase font-black tracking-widest mt-0.5">{episode.category || "Season 2"}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100/50">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-[11px] text-amber-950/70 leading-relaxed font-medium">
              These 3 episodes are highlighted in the <span className="font-bold">"Upcoming Episodes"</span> section on the podcast page. Ensure they are marked as <span className="font-bold text-amber-600">Featured</span> to appear here.
            </p>
          </div>
        </CardContent>
      </Card>


      <Card className="rounded-3xl border-none shadow-xl shadow-navy-950/5 bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-navy-50 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-950/20" />
              <Input 
                placeholder="Search episodes..." 
                className="pl-10 h-11 bg-navy-50/50 border-none rounded-xl focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-navy-50">
                  <TableHead className="w-[80px] text-xs font-black uppercase tracking-widest text-navy-950/40 pl-8 hidden md:table-cell">Order</TableHead>
                  <TableHead className="text-xs font-black uppercase tracking-widest text-navy-950/40">Episode Info</TableHead>
                  <TableHead className="text-xs font-black uppercase tracking-widest text-navy-950/40 hidden lg:table-cell">Guests / Host</TableHead>
                  <TableHead className="text-xs font-black uppercase tracking-widest text-navy-950/40 hidden sm:table-cell">Date / Category</TableHead>
                  <TableHead className="text-xs font-black uppercase tracking-widest text-navy-950/40">Status</TableHead>
                  <TableHead className="text-right pr-8 text-xs font-black uppercase tracking-widest text-navy-950/40">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i} className="border-navy-50/50">
                      <TableCell colSpan={6} className="py-4 px-8"><Skeleton className="h-12 w-full rounded-xl" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Mic className="w-12 h-12 text-navy-200" />
                        <p className="text-navy-950/40 font-medium">No podcast episodes found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredItems.map((item) => (
                  <TableRow key={(item._id as any).toString()} className="group hover:bg-navy-50/50 transition-colors border-navy-50/50">
                    <TableCell className="pl-8 hidden md:table-cell">
                      <span className=" text-xs font-bold text-navy-950/30">#{item.order}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl bg-navy-50 overflow-hidden flex items-center justify-center shrink-0 border border-navy-100/50 shadow-sm">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                          ) : (
                            <Mic className="w-5 h-5 text-navy-950/20" />
                          )}
                        </div>
                        <div className="flex flex-col max-w-[300px]">
                          <span className="font-bold text-navy-950 text-sm truncate">{item.title}</span>
                          {item.description && (
                            <span className="text-xs text-navy-950/50 truncate max-w-[280px]">{item.description}</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-col gap-1">
                        {item.subtitle && <span className="text-xs text-navy-950/60 font-medium">{item.subtitle}</span>}
                        {item.author && (
                          <span className="text-xs text-navy-950/40 flex items-center gap-1">
                            <Users className="w-3 h-3" /> {item.author}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex flex-col gap-1">
                        {item.date && (
                          <span className="text-xs text-navy-950/60 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {item.date}
                          </span>
                        )}
                        {item.category && (
                          <Badge variant="outline" className="w-fit text-sm uppercase font-bold tracking-widest">
                            {item.category}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                         <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-xs uppercase font-black tracking-widest h-6">
                           {item.isActive ? "Active" : "Hidden"}
                         </Badge>
                         {item.isFeatured && (
                           <Badge variant="outline" className="rounded-full text-xs uppercase font-black tracking-widest h-6 text-gold-600 border-gold-200 bg-gold-50">
                             Featured
                           </Badge>
                         )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white hover:shadow-sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[170px] shadow-2xl border-navy-50">
                          <DropdownMenuItem 
                            onClick={() => openEditDialog(item)}
                            className="rounded-xl flex items-center gap-3 px-3 py-2 cursor-pointer focus:bg-navy-50"
                          >
                            <Edit className="w-4 h-4 text-navy-950/40" />
                            <span className="text-sm font-medium">Edit Episode</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete((item._id as any).toString())}
                            className="rounded-xl flex items-center gap-3 px-3 py-2 cursor-pointer focus:bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl bg-white rounded-4xl p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-none">
          <form onSubmit={handleSave}>
            <DialogHeader className="p-8 pb-0">
              <DialogTitle className="text-2xl font-bold tracking-tight text-navy-950">
                {editingItem?._id ? "Edit Podcast Episode" : "New Podcast Episode"}
              </DialogTitle>
              <DialogDescription>
                Add or edit a Mission Mediation Podcast episode. Include title, guests, description, and video URL.
              </DialogDescription>
            </DialogHeader>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Episode Title</Label>
                  <Input 
                    value={editingItem?.title || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. Are Mediators Actually Mediating?"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Guests / Hosts</Label>
                  <Input 
                    value={editingItem?.subtitle || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, subtitle: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. Bill Marsh & Chitra Narayan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Author / Host Name</Label>
                  <Input 
                    value={editingItem?.author || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, author: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. Jonathan Rodrigues"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Theme / Category</Label>
                  <Input 
                    value={editingItem?.category || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, category: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. Mediation Practice"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Description / Summary</Label>
                <Textarea 
                  value={editingItem?.description || ""} 
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))} 
                  className="min-h-[100px] rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20 resize-none p-4"
                  placeholder="Episode description or summary..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUpload
                  label="Thumbnail Image"
                  value={editingItem?.image || ""}
                  onChange={(url) => setEditingItem(prev => ({ ...prev!, image: url }))}
                />
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Video URL (YouTube)</Label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-950/20" />
                    <Input 
                      value={editingItem?.url || ""} 
                      onChange={(e) => setEditingItem(prev => ({ ...prev!, url: e.target.value }))} 
                      className="pl-10 h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                      placeholder="https://www.youtube.com/..."
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Publication Date</Label>
                  <Input 
                    value={editingItem?.date || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, date: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. Aug 24, 2025"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Publication Name</Label>
                  <Input 
                    value={editingItem?.publication || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, publication: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. Mission Mediation Podcast"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-navy-50">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Order</Label>
                  <Input 
                    type="number" 
                    value={editingItem?.order || 0} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) || 0 }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-4 h-12 rounded-xl bg-navy-50/50 mt-8">
                  <Label className="text-xs font-bold text-navy-950/60 uppercase tracking-widest cursor-pointer" htmlFor="status-toggle">Visible</Label>
                  <Switch 
                    id="status-toggle"
                    checked={editingItem?.isActive || false} 
                    onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))} 
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-4 h-12 rounded-xl bg-navy-50/50 mt-8">
                  <Label className="text-xs font-bold text-navy-950/60 uppercase tracking-widest cursor-pointer" htmlFor="featured-toggle">Featured</Label>
                  <Switch 
                    id="featured-toggle"
                    checked={editingItem?.isFeatured || false} 
                    onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isFeatured: val }))} 
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 pt-0 bg-navy-50/30">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6 font-bold">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="rounded-xl h-12 px-8 bg-navy-950 hover:bg-navy-900 text-white font-bold transition-all shadow-lg">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editingItem?._id ? "Update Episode" : "Create Episode"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

