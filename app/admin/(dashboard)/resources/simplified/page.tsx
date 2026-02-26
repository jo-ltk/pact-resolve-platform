"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Star, Loader2, Edit, Trash2, ArrowLeft, Quote, UserCircle2, BookOpen, ImageIcon, GripVertical, CheckCircle, ListChecks } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { Testimonial, WorkbookGalleryImage, WorkbookFeature, WorkbookChapter } from "@/lib/db/schemas";

const EMPTY_TESTIMONIAL: Partial<Testimonial> = {
  name: "",
  title: "",
  company: "",
  quote: "",
  rating: 5,
  image: { url: "", alt: "" },
  profileImage: { url: "", alt: "" },
  page: "simplified",
  order: 1,
  isActive: true,
};

const EMPTY_GALLERY_IMAGE: Partial<WorkbookGalleryImage> = {
  image: { url: "", alt: "" },
  title: "",
  caption: "",
  order: 1,
  isActive: true,
};

const EMPTY_FEATURE: Partial<WorkbookFeature> = {
  text: "",
  order: 1,
  isActive: true,
};

const EMPTY_CHAPTER: Partial<WorkbookChapter> = {
  title: "",
  order: 1,
  isActive: true,
};

export default function MediationSimplifiedAdminPage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("testimonials");
  const [isSaving, setIsSaving] = useState(false);
  
  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);

  // Gallery State
  const [galleryImages, setGalleryImages] = useState<WorkbookGalleryImage[]>([]);
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const [editingGalleryImage, setEditingGalleryImage] = useState<Partial<WorkbookGalleryImage> | null>(null);

  // Features State
  const [features, setFeatures] = useState<WorkbookFeature[]>([]);
  const [isFeaturesLoading, setIsFeaturesLoading] = useState(true);
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Partial<WorkbookFeature> | null>(null);

  // Chapters State
  const [chapters, setChapters] = useState<WorkbookChapter[]>([]);
  const [isChaptersLoading, setIsChaptersLoading] = useState(true);
  const [isChapterDialogOpen, setIsChapterDialogOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Partial<WorkbookChapter> | null>(null);

  useEffect(() => { 
    fetchTestimonials(); 
    fetchGalleryImages();
    fetchFeatures();
    fetchChapters();
  }, []);

  // --- Testimonial Functions ---
  async function fetchTestimonials() {
    setIsTestimonialsLoading(true);
    try {
      const res = await fetch("/api/content/testimonials?admin=true&page=simplified");
      const result = await res.json();
      if (result.success) setTestimonials(result.data || []);
    } catch {
      toast.error("Failed to load testimonials");
    } finally {
      setIsTestimonialsLoading(false);
    }
  }

  const handleTestimonialSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/content/testimonials", {
        method: editingTestimonial?._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editingTestimonial,
          rating: Number(editingTestimonial?.rating) || 5,
          order: Number(editingTestimonial?.order) || 1,
          page: "simplified"
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Testimonial saved");
        setIsTestimonialDialogOpen(false);
        fetchTestimonials();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestimonialDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/content/testimonials?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Deleted");
        fetchTestimonials();
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const openTestimonialDialog = (item: Partial<Testimonial> = {}) => {
    setEditingTestimonial({
      ...EMPTY_TESTIMONIAL,
      order: testimonials.length + 1,
      ...item,
    });
    setIsTestimonialDialogOpen(true);
  };

  // --- Gallery Functions ---
  async function fetchGalleryImages() {
    setIsGalleryLoading(true);
    try {
      const res = await fetch("/api/content/workbook-gallery?admin=true");
      const result = await res.json();
      if (result.success) setGalleryImages(result.data || []);
    } catch {
      toast.error("Failed to load gallery images");
    } finally {
      setIsGalleryLoading(false);
    }
  }

  const handleGallerySave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGalleryImage?.image?.url) {
      toast.error("Image is required for the gallery");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/content/workbook-gallery", {
        method: editingGalleryImage?._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editingGalleryImage,
          order: Number(editingGalleryImage?.order) || 1,
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Gallery image saved");
        setIsGalleryDialogOpen(false);
        fetchGalleryImages();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleGalleryDelete = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;
    try {
      const res = await fetch(`/api/content/workbook-gallery?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Deleted");
        fetchGalleryImages();
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const openGalleryDialog = (item: Partial<WorkbookGalleryImage> = {}) => {
    setEditingGalleryImage({
      ...EMPTY_GALLERY_IMAGE,
      order: galleryImages.length + 1,
      ...item,
    });
    setIsGalleryDialogOpen(true);
  };

  // --- Feature Functions ---
  async function fetchFeatures() {
    setIsFeaturesLoading(true);
    try {
      const res = await fetch("/api/content/workbook-features?admin=true");
      const result = await res.json();
      if (result.success) setFeatures(result.data || []);
    } catch {
      toast.error("Failed to load features");
    } finally {
      setIsFeaturesLoading(false);
    }
  }

  const handleFeatureSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/content/workbook-features", {
        method: editingFeature?._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingFeature),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Feature saved");
        setIsFeatureDialogOpen(false);
        fetchFeatures();
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFeatureDelete = async (id: string) => {
    if (!confirm("Delete this feature?")) return;
    try {
      const res = await fetch(`/api/content/workbook-features?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if ((await res.json()).success) {
        toast.success("Deleted");
        fetchFeatures();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const openFeatureDialog = (item: Partial<WorkbookFeature> = {}) => {
    setEditingFeature({ ...EMPTY_FEATURE, order: features.length + 1, ...item });
    setIsFeatureDialogOpen(true);
  };

  // --- Chapter Functions ---
  async function fetchChapters() {
    setIsChaptersLoading(true);
    try {
      const res = await fetch("/api/content/workbook-chapters?admin=true");
      const result = await res.json();
      if (result.success) setChapters(result.data || []);
    } catch {
      toast.error("Failed to load chapters");
    } finally {
      setIsChaptersLoading(false);
    }
  }

  const handleChapterSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/content/workbook-chapters", {
        method: editingChapter?._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingChapter),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Chapter saved");
        setIsChapterDialogOpen(false);
        fetchChapters();
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChapterDelete = async (id: string) => {
    if (!confirm("Delete this chapter?")) return;
    try {
      const res = await fetch(`/api/content/workbook-chapters?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if ((await res.json()).success) {
        toast.success("Deleted");
        fetchChapters();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const openChapterDialog = (item: Partial<WorkbookChapter> = {}) => {
    setEditingChapter({ ...EMPTY_CHAPTER, order: chapters.length + 1, ...item });
    setIsChapterDialogOpen(true);
  };

  const handleRestoreDefaults = async () => {
    const isGallery = activeTab === "gallery";
    const type = isGallery ? "gallery images" : "testimonials";
    const endpoint = isGallery ? "/api/content/workbook-gallery/seed" : "/api/content/testimonials/seed";
    
    if(!confirm(`Restore default ${type}? This will not delete existing ones unless you use force.`)) return;
    
    try {
      const res = await fetch(endpoint, { 
        method: "POST", 
        headers: { Authorization: `Bearer ${token}` } 
      });
      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        if (isGallery) fetchGalleryImages();
        else fetchTestimonials();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Failed to restore defaults");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link
            href="/admin/resources"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Resources
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-navy-950">
            <BookOpen className="w-8 h-8 text-amber-500" />
            Mediation Simplified Management
          </h1>
          <p className="text-muted-foreground">
            Manage all aspects of the Mediation Simplified workbook page including features and gallery.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={handleRestoreDefaults} className="rounded-xl px-6 h-12">
            Restore Defaults
          </Button>
          <Button 
            onClick={() => {
              if (activeTab === "testimonials") openTestimonialDialog();
              else if (activeTab === "gallery") openGalleryDialog();
              else if (activeTab === "features") openFeatureDialog();
              else if (activeTab === "chapters") openChapterDialog();
            }} 
            className="rounded-xl px-6 h-12 bg-amber-600 hover:bg-amber-700 text-white font-bold"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-navy-50/50 p-1 rounded-2xl mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="testimonials" className="rounded-xl px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">
            <Quote className="w-4 h-4 mr-2" /> Testimonials
          </TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">
            <ImageIcon className="w-4 h-4 mr-2" /> Workbook in Action
          </TabsTrigger>
          <TabsTrigger value="features" className="rounded-xl px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">
            <CheckCircle className="w-4 h-4 mr-2" /> Features
          </TabsTrigger>
          <TabsTrigger value="chapters" className="rounded-xl px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">
            <ListChecks className="w-4 h-4 mr-2" /> Chapters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="testimonials">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-navy-50">
                    <TableHead>Profile</TableHead>
                    <TableHead>Person & Role</TableHead>
                    <TableHead>Quote</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isTestimonialsLoading ? (
                    <TableRow><TableCell colSpan={7} className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-600" /></TableCell></TableRow>
                  ) : testimonials.length === 0 ? (
                    <TableRow><TableCell colSpan={7} className="text-center py-10 text-muted-foreground">No testimonials yet.</TableCell></TableRow>
                  ) : (
                    testimonials.map((item) => (
                      <TableRow key={item._id?.toString()} className="group hover:bg-navy-50/50 transition-colors border-navy-50/50">
                        <TableCell>
                          <div className="relative w-12 h-12 bg-muted rounded-full overflow-hidden border-2 border-amber-100">
                            {item.profileImage?.url ? <Image src={item.profileImage.url} alt={item.name} fill className="object-cover" /> : <UserCircle2 className="w-full h-full text-muted-foreground/40" />}
                          </div>
                        </TableCell>
                        <TableCell><p className="font-bold text-sm text-navy-950">{item.name}</p><p className="text-xs text-muted-foreground">{item.title}</p></TableCell>
                        <TableCell className="max-w-xs"><p className="text-sm text-muted-foreground line-clamp-2 italic">&ldquo;{item.quote}&rdquo;</p></TableCell>
                        <TableCell><div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`w-3.5 h-3.5 ${i < (item.rating || 5) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />))}</div></TableCell>
                        <TableCell><span className="text-sm font-medium">{item.order}</span></TableCell>
                        <TableCell>{item.isActive ? <Badge className="bg-emerald-500 rounded-full">Active</Badge> : <Badge variant="secondary" className="rounded-full">Hidden</Badge>}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openTestimonialDialog(item)} className="h-9 w-9 rounded-full hover:bg-white"><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-red-50 text-red-500" onClick={() => handleTestimonialDelete(item._id!.toString())}><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isGalleryLoading ? (
              <div className="col-span-full py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-600" /></div>
            ) : galleryImages.length === 0 ? (
              <div className="col-span-full py-20 text-center text-muted-foreground bg-white rounded-3xl border border-dashed">No gallery images yet.</div>
            ) : (
              galleryImages.map((item) => (
                <Card key={item._id?.toString()} className="group relative bg-white rounded-3xl overflow-hidden border-navy-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-3/2 bg-muted">
                    {item.image?.url ? <Image src={item.image.url} alt={item.caption || "Gallery"} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground/40"><ImageIcon className="w-10 h-10" /></div>}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" className="h-9 w-9 bg-white shadow-xl hover:bg-navy-950 hover:text-white rounded-full transition-all" onClick={() => openGalleryDialog(item)}><Edit className="w-4 h-4" /></Button>
                      <Button size="icon" className="h-9 w-9 bg-white shadow-xl hover:bg-red-500 hover:text-white rounded-full transition-all text-red-500" onClick={() => handleGalleryDelete(item._id!.toString())}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 text-[10px] font-black flex items-center justify-center uppercase">{item.order}</span>
                       <p className="text-sm font-bold text-navy-950 truncate">{item.title || "Untitled Fragment"}</p>
                    </div>
                    <p className="text-xs text-navy-950/40 truncate italic h-4">{item.caption || "No description provided"}</p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="features">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
             <CardContent className="p-6">
               <Table>
                 <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Feature Text</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                 <TableBody>
                   {isFeaturesLoading ? (
                     <TableRow><TableCell colSpan={4} className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-600" /></TableCell></TableRow>
                   ) : features.length === 0 ? (
                     <TableRow><TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No features managed yet.</TableCell></TableRow>
                   ) : features.map((item) => (
                     <TableRow key={item._id?.toString()} className="group hover:bg-navy-50 font-medium">
                       <TableCell className="font-bold text-navy-950/30">#{item.order}</TableCell>
                       <TableCell className="max-w-md"><span className="text-sm text-navy-950">{item.text}</span></TableCell>
                       <TableCell>{item.isActive ? <Badge className="bg-emerald-500 rounded-full">Active</Badge> : <Badge variant="secondary" className="rounded-full">Hidden</Badge>}</TableCell>
                       <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openFeatureDialog(item)} className="rounded-full"><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleFeatureDelete(item._id!.toString())} className="text-red-500 rounded-full"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chapters">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
             <CardContent className="p-6">
               <Table>
                 <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Chapter Title</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                 <TableBody>
                   {isChaptersLoading ? (
                     <TableRow><TableCell colSpan={4} className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-600" /></TableCell></TableRow>
                   ) : chapters.length === 0 ? (
                     <TableRow><TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No chapters managed yet.</TableCell></TableRow>
                   ) : chapters.map((item) => (
                     <TableRow key={item._id?.toString()} className="group hover:bg-navy-50 font-medium">
                       <TableCell className="font-bold text-navy-950/30">#{item.order}</TableCell>
                       <TableCell><span className="text-sm text-navy-950">{item.title}</span></TableCell>
                       <TableCell>{item.isActive ? <Badge className="bg-emerald-500 rounded-full">Active</Badge> : <Badge variant="secondary" className="rounded-full">Hidden</Badge>}</TableCell>
                       <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openChapterDialog(item)} className="rounded-full"><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleChapterDelete(item._id!.toString())} className="text-red-500 rounded-full"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
          <form onSubmit={handleTestimonialSave}>
            <DialogHeader className="p-8 bg-navy-950 text-white">
              <DialogTitle className="text-2xl font-bold tracking-tight">{editingTestimonial?._id ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
              <DialogDescription className="text-white/50">Manage supporter feedback for the workbook page.</DialogDescription>
            </DialogHeader>
            <div className="p-8 space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40">Full Name</Label><Input value={editingTestimonial?.name || ""} onChange={(e) => setEditingTestimonial(p => ({ ...p!, name: e.target.value }))} required className="rounded-xl h-12 bg-navy-50 border-none px-5" /></div>
                  <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40">Role/Affiliation</Label><Input value={editingTestimonial?.title || ""} onChange={(e) => setEditingTestimonial(p => ({ ...p!, title: e.target.value }))} required className="rounded-xl h-12 bg-navy-50 border-none px-5" /></div>
               </div>
               <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40">Supporter Quote</Label><Textarea value={editingTestimonial?.quote || ""} onChange={(e) => setEditingTestimonial(p => ({ ...p!, quote: e.target.value }))} required className="rounded-xl min-h-[120px] bg-navy-50 border-none p-5" /></div>
               <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40">Rating</Label><Input type="number" min={1} max={5} value={editingTestimonial?.rating ?? 5} onChange={(e) => setEditingTestimonial(p => ({ ...p!, rating: parseInt(e.target.value) }))} className="rounded-xl h-12 bg-navy-50 border-none px-5" /></div>
                  <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40">Order</Label><Input type="number" value={editingTestimonial?.order ?? 1} onChange={(e) => setEditingTestimonial(p => ({ ...p!, order: parseInt(e.target.value) }))} className="rounded-xl h-12 bg-navy-50 border-none px-5" /></div>
                  <div className="flex items-center justify-between p-4 bg-navy-50 rounded-xl mt-6">
                    <Label className="text-xs uppercase font-black text-navy-950/40">Active</Label>
                    <Switch checked={editingTestimonial?.isActive ?? true} onCheckedChange={(c) => setEditingTestimonial(p => ({ ...p!, isActive: c }))} />
                  </div>
               </div>
               <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Profile Image</Label><ImageUpload value={editingTestimonial?.profileImage?.url} onChange={(url) => setEditingTestimonial(p => ({ ...p!, profileImage: { url, alt: p?.name || "Profile" }}))} /></div>
            </div>
            <DialogFooter className="p-8 bg-navy-50/50 border-t"><Button type="submit" disabled={isSaving} className="rounded-xl h-12 px-10 bg-amber-600 hover:bg-amber-700 font-bold">{isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Supporter"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Gallery Dialog */}
      <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
        <DialogContent className="sm:max-w-xl rounded-3xl p-0 border-none shadow-2xl">
          <form onSubmit={handleGallerySave}>
            <DialogHeader className="p-8 bg-navy-950 text-white">
              <DialogTitle className="text-2xl font-bold tracking-tight">Workbook in Action</DialogTitle>
              <DialogDescription className="text-white/50">Add images of the workbook being used in workshops/classes.</DialogDescription>
            </DialogHeader>
            <div className="p-8 space-y-6">
              <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40">Title / Location</Label><Input value={editingGalleryImage?.title || ""} onChange={(e) => setEditingGalleryImage(p => ({ ...p!, title: e.target.value }))} placeholder="e.g. Mumbai Training" className="rounded-xl h-12 bg-navy-50 border-none px-5" /></div>
              <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40">Caption</Label><Input value={editingGalleryImage?.caption || ""} onChange={(e) => setEditingGalleryImage(p => ({ ...p!, caption: e.target.value }))} className="rounded-xl h-12 bg-navy-50 border-none px-5" /></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40">Order</Label><Input type="number" value={editingGalleryImage?.order || 1} onChange={(e) => setEditingGalleryImage(p => ({ ...p!, order: parseInt(e.target.value) }))} className="rounded-xl h-12 bg-navy-50 border-none px-5" /></div>
                <div className="flex items-center justify-between p-4 bg-navy-50 rounded-xl mt-6 font-bold"><Label className="text-xs uppercase font-black text-navy-950/40">Visible</Label><Switch checked={editingGalleryImage?.isActive ?? true} onCheckedChange={(c) => setEditingGalleryImage(p => ({ ...p!, isActive: c }))} /></div>
              </div>
              <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Gallery Image *</Label><ImageUpload value={editingGalleryImage?.image?.url} onChange={(url) => setEditingGalleryImage(p => ({ ...p!, image: { url, alt: p?.title || "Action" }}))} /></div>
            </div>
            <DialogFooter className="p-8 bg-navy-50/50 border-t"><Button type="submit" disabled={isSaving} className="rounded-xl h-12 px-10 bg-amber-600 hover:bg-amber-700 font-bold">{isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save to Gallery"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Feature Dialog */}
      <Dialog open={isFeatureDialogOpen} onOpenChange={setIsFeatureDialogOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-0">
          <form onSubmit={handleFeatureSave}>
            <DialogHeader className="p-8 bg-navy-950 text-white"><DialogTitle>Workbook Feature</DialogTitle></DialogHeader>
            <div className="p-8 space-y-6">
              <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40">Feature Text</Label><Textarea value={editingFeature?.text || ""} onChange={(e) => setEditingFeature(p => ({ ...p!, text: e.target.value }))} required className="rounded-xl min-h-[100px] bg-navy-50 border-none p-5" /></div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2"><Label>Order</Label><Input type="number" value={editingFeature?.order ?? 1} onChange={e => setEditingFeature(p => ({ ...p!, order: parseInt(e.target.value) }))} className="h-12 bg-navy-50 border-none rounded-xl" /></div>
                 <div className="flex items-center justify-between p-4 bg-navy-50 rounded-xl mt-6"><Label>Active</Label><Switch checked={editingFeature?.isActive ?? true} onCheckedChange={c => setEditingFeature(p => ({ ...p!, isActive: c }))} /></div>
              </div>
            </div>
            <DialogFooter className="p-8 bg-navy-50/50 border-t"><Button type="submit" disabled={isSaving} className="rounded-xl h-12 px-10 bg-navy-950">{isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Feature"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Chapter Dialog */}
      <Dialog open={isChapterDialogOpen} onOpenChange={setIsChapterDialogOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-0">
          <form onSubmit={handleChapterSave}>
            <DialogHeader className="p-8 bg-navy-950 text-white"><DialogTitle>Workbook Chapter</DialogTitle></DialogHeader>
            <div className="p-8 space-y-6">
              <div className="space-y-2"><Label className="text-xs uppercase tracking-widest font-black text-navy-950/40">Chapter Title</Label><Input value={editingChapter?.title || ""} onChange={(e) => setEditingChapter(p => ({ ...p!, title: e.target.value }))} required className="rounded-xl h-12 bg-navy-50 border-none px-5" /></div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2"><Label>Order</Label><Input type="number" value={editingChapter?.order ?? 1} onChange={e => setEditingChapter(p => ({ ...p!, order: parseInt(e.target.value) }))} className="h-12 bg-navy-50 border-none rounded-xl" /></div>
                 <div className="flex items-center justify-between p-4 bg-navy-50 rounded-xl mt-6"><Label>Active</Label><Switch checked={editingChapter?.isActive ?? true} onCheckedChange={c => setEditingChapter(p => ({ ...p!, isActive: c }))} /></div>
              </div>
            </div>
            <DialogFooter className="p-8 bg-navy-50/50 border-t"><Button type="submit" disabled={isSaving} className="rounded-xl h-12 px-10 bg-navy-950">{isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Chapter"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
