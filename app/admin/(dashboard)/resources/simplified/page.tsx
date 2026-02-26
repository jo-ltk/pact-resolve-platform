"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Star, Loader2, Edit, Trash2, ArrowLeft, Quote, UserCircle2, BookOpen, ImageIcon, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
import { Testimonial, WorkbookGalleryImage } from "@/lib/db/schemas";

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

export default function MediationSimplifiedAdminPage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("testimonials");
  
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

  useEffect(() => { 
    fetchTestimonials(); 
    fetchGalleryImages();
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
    <div className="space-y-6">
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
            Manage testimonials and gallery images for the Mediation Simplified workbook page.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={handleRestoreDefaults} className="rounded-xl px-6">
            Restore Defaults
          </Button>
          {activeTab === "testimonials" ? (
            <Button onClick={() => openTestimonialDialog()} className="rounded-xl px-6 bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" /> Add Testimonial
            </Button>
          ) : (
            <Button onClick={() => openGalleryDialog()} className="rounded-xl px-6 bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" /> Add Gallery Image
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-navy-50 p-1 rounded-2xl mb-6">
          <TabsTrigger value="testimonials" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Quote className="w-4 h-4 mr-2" /> Testimonials
          </TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <ImageIcon className="w-4 h-4 mr-2" /> Workbook Gallery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="testimonials">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
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
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-600" />
                      </TableCell>
                    </TableRow>
                  ) : testimonials.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        No testimonials yet. Click &ldquo;Add Testimonial&rdquo; to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    testimonials.map((item) => (
                      <TableRow key={item._id?.toString()} className="group">
                        <TableCell>
                          <div className="relative w-12 h-12 bg-muted rounded-full overflow-hidden border-2 border-amber-100">
                            {item.profileImage?.url ? (
                              <Image
                                src={item.profileImage.url}
                                alt={item.profileImage.alt || item.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <UserCircle2 className="w-full h-full text-muted-foreground/40" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-bold text-sm text-navy-950">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.title}</p>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-muted-foreground line-clamp-2 italic">&ldquo;{item.quote}&rdquo;</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < (item.rating || 5) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                              />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm font-medium">{item.order}</span>
                        </TableCell>
                        <TableCell>
                          {item.isActive ? (
                            <Badge className="bg-emerald-500">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Hidden</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openTestimonialDialog(item)} className="hover:bg-amber-50 hover:text-amber-600">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleTestimonialDelete(item._id!.toString())}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isGalleryLoading ? (
                  <div className="col-span-full py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-600" />
                  </div>
                ) : galleryImages.length === 0 ? (
                  <div className="col-span-full py-20 text-center text-muted-foreground">
                    No gallery images yet. Click &ldquo;Add Gallery Image&rdquo; to get started.
                  </div>
                ) : (
                  galleryImages.map((item) => (
                    <div key={item._id?.toString()} className="group relative bg-navy-50 rounded-3xl overflow-hidden border border-navy-100 hover:shadow-lg transition-all">
                      <div className="relative aspect-3/2 bg-muted">
                        {item.image?.url ? (
                          <Image
                            src={item.image.url}
                            alt={item.caption || "Gallery image"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
                            <ImageIcon className="w-10 h-10" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" className="h-8 w-8 bg-white/90 hover:bg-white text-navy-950 rounded-full shadow-sm" onClick={() => openGalleryDialog(item)}>
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button size="icon" className="h-8 w-8 bg-red-500/90 hover:bg-red-500 text-white rounded-full shadow-sm" onClick={() => handleGalleryDelete(item._id!.toString())}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <div className="absolute bottom-3 left-3">
                           <Badge className={item.isActive ? "bg-emerald-500" : "bg-slate-400"}>
                             {item.isActive ? "Visible" : "Hidden"}
                           </Badge>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                             {item.order}
                           </div>
                           <div className="min-w-0">
                             <p className="text-[13px] font-bold text-navy-950 truncate mb-0.5">{item.title || "No title"}</p>
                             <p className="text-[11px] text-navy-950/50 truncate italic">{item.caption || "No caption"}</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Testimonial Dialog */}
      <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-4xl p-0">
          <form onSubmit={handleTestimonialSave}>
            <DialogHeader className="p-6 bg-navy-950 text-white rounded-t-4xl">
              <DialogTitle>
                {editingTestimonial?._id ? "Edit Testimonial" : "Add Testimonial"}
              </DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={editingTestimonial?.name || ""}
                    onChange={(e) => setEditingTestimonial(p => ({ ...p!, name: e.target.value }))}
                    placeholder="e.g. Justice Kurian Joseph"
                    required
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role / Title *</Label>
                  <Input
                    value={editingTestimonial?.title || ""}
                    onChange={(e) => setEditingTestimonial(p => ({ ...p!, title: e.target.value }))}
                    placeholder="e.g. Former Judge, Supreme Court"
                    required
                    className="rounded-xl h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company/Org (Optional)</Label>
                  <Input
                    value={editingTestimonial?.company || ""}
                    onChange={(e) => setEditingTestimonial(p => ({ ...p!, company: e.target.value }))}
                    placeholder="e.g. Supreme Court of India"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Star Rating (1–5)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={editingTestimonial?.rating ?? 5}
                    onChange={(e) => setEditingTestimonial(p => ({ ...p!, rating: parseInt(e.target.value) }))}
                    required
                    className="rounded-xl h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Testimonial Quote *</Label>
                <Textarea
                  value={editingTestimonial?.quote || ""}
                  onChange={(e) => setEditingTestimonial(p => ({ ...p!, quote: e.target.value }))}
                  placeholder="The interactive elements make learning accessible..."
                  required
                  className="rounded-xl min-h-[100px] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={editingTestimonial?.order ?? 1}
                    onChange={(e) => setEditingTestimonial(p => ({ ...p!, order: parseInt(e.target.value) }))}
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    checked={editingTestimonial?.isActive ?? true}
                    onCheckedChange={(checked) => setEditingTestimonial(p => ({ ...p!, isActive: checked }))}
                  />
                  <Label>Active / Visible</Label>
                </div>
              </div>

              <ImageUpload
                label="Profile Picture"
                value={editingTestimonial?.profileImage?.url}
                onChange={(url) =>
                  setEditingTestimonial((prev) => ({ 
                    ...prev!, 
                    profileImage: { url, alt: prev?.name || "Profile photo" } 
                  }))
                }
              />
            </div>

            <DialogFooter className="p-6 border-t bg-muted/10">
              <Button type="submit" className="rounded-xl h-11 px-8 bg-amber-600 hover:bg-amber-700">
                Save Testimonial
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Gallery Dialog */}
      <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-4xl p-0">
          <form onSubmit={handleGallerySave}>
            <DialogHeader className="p-6 bg-navy-950 text-white rounded-t-4xl">
              <DialogTitle>
                {editingGalleryImage?._id ? "Edit Gallery Image" : "Add Gallery Image"}
              </DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <Label>Image Title (Optional)</Label>
                <Input
                  value={editingGalleryImage?.title || ""}
                  onChange={(e) => setEditingGalleryImage(p => ({ ...p!, title: e.target.value }))}
                  placeholder="e.g. Mumbai Workshop"
                  className="rounded-xl h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Caption / Description (Optional)</Label>
                <Input
                  value={editingGalleryImage?.caption || ""}
                  onChange={(e) => setEditingGalleryImage(p => ({ ...p!, caption: e.target.value }))}
                  placeholder="e.g. Participants exploring mediation exercises"
                  className="rounded-xl h-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={editingGalleryImage?.order ?? 1}
                    onChange={(e) => setEditingGalleryImage(p => ({ ...p!, order: parseInt(e.target.value) }))}
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    checked={editingGalleryImage?.isActive ?? true}
                    onCheckedChange={(checked) => setEditingGalleryImage(p => ({ ...p!, isActive: checked }))}
                  />
                  <Label>Active / Visible</Label>
                </div>
              </div>

              <ImageUpload
                label="Gallery Image"
                value={editingGalleryImage?.image?.url}
                onChange={(url) =>
                  setEditingGalleryImage((prev) => ({ 
                    ...prev!, 
                    image: { url, alt: prev?.caption || "Gallery image" } 
                  }))
                }
              />
            </div>

            <DialogFooter className="p-6 border-t bg-muted/10">
              <Button type="submit" className="rounded-xl h-11 px-8 bg-amber-600 hover:bg-amber-700">
                Save Image
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
