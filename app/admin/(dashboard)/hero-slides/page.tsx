"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ImageIcon,
  Loader2,
  MoveUp,
  MoveDown,
  Layout
} from "lucide-react";
import { toast } from "sonner";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { HeroSlide } from "@/lib/db/schemas";

export default function HeroSlidesAdminPage() {
  const { token } = useAuth();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<HeroSlide> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  async function fetchSlides() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/content/hero-slides?all=true");
      const result = await response.json();
      if (result.success) {
        const normalized = (result.data || []).map((slide: any) => ({
          ...slide,
          title: Array.isArray(slide.title) ? slide.title : [slide.title]
        }));
        setSlides(normalized);
      } else {
        toast.error(result.error || "Failed to fetch slides");
      }
    } catch (error) {
      toast.error("An error occurred while fetching slides");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      const response = await fetch(`/api/content/hero-slides?id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Slide deleted");
        setSlides(slides.filter(s => (s._id as any).toString() !== id));
      } else {
        toast.error(result.error || "Failed to delete");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleToggleStatus = async (item: HeroSlide) => {
    const updatedItem = { ...item, isActive: !item.isActive };
    try {
      const response = await fetch("/api/content/hero-slides", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedItem)
      });
      const result = await response.json();
      if (result.success) {
        setSlides(slides.map(s => s._id === item._id ? updatedItem : s));
        toast.success("Status updated");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleMove = async (slide: HeroSlide, direction: "up" | "down") => {
    const currentIndex = slides.findIndex(s => s._id === slide._id);
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const targetSlide = slides[targetIndex];
    
    // Swap orders
    const updatedSlide = { ...slide, order: targetSlide.order };
    const updatedTargetSlide = { ...targetSlide, order: slide.order };

    try {
      // Update both slides
      const updatePromises = [
        fetch("/api/content/hero-slides", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(updatedSlide)
        }),
        fetch("/api/content/hero-slides", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(updatedTargetSlide)
        })
      ];

      const results = await Promise.all(updatePromises);
      const jsonResults = await Promise.all(results.map(res => res.json()));
      const allSuccess = jsonResults.every(res => res.success);

      if (allSuccess) {
        toast.success("Order updated");
        fetchSlides();
      } else {
        toast.error("Failed to update order");
      }
    } catch (error) {
      toast.error("An error occurred while reordering");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const method = editingItem?._id ? "PUT" : "POST";
      const response = await fetch("/api/content/hero-slides", {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editingItem)
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success(editingItem?._id ? "Slide updated" : "Slide created");
        setIsDialogOpen(false);
        fetchSlides();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const openCreateDialog = () => {
    setEditingItem({
      order: slides.length + 1,
      title: [],
      description: "",
      buttonLabel: "Learn More",
      link: "/",
      rightSlogan: "",
      image: { url: "", alt: "" },
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: HeroSlide) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-950 flex items-center gap-3">
            <Layout className="w-8 h-8 text-accent" />
            Hero Slides
          </h1>
          <p className="text-muted-foreground">Manage the homepage hero carousel slides.</p>
        </div>
        <Button 
          onClick={openCreateDialog}
          className="bg-primary hover:bg-primary/90 rounded-xl px-6 shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Slide
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden h-64">
              <Skeleton className="w-full h-full" />
            </Card>
          ))
        ) : slides.length === 0 ? (
          <div className="col-span-full h-64 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed">
            <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-medium">No hero slides found.</p>
            <Button variant="link" onClick={openCreateDialog}>Create your first slide</Button>
          </div>
        ) : (
          slides.map((slide) => (
            <Card key={(slide._id as any).toString()} className="border-none shadow-md rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white">
              <div className="relative aspect-video">
                {slide.image?.url ? (
                  <img src={slide.image.url} alt={slide.image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge className={slide.isActive ? "bg-emerald-500 hover:bg-emerald-600 border-none px-3" : "bg-red-500 hover:bg-red-600 border-none px-3"}>
                    {slide.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="rounded-full shadow-lg bg-white/90 backdrop-blur-sm text-navy-950">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl shadow-xl">
                      <DropdownMenuItem onClick={() => openEditDialog(slide)} className="cursor-pointer gap-2">
                        <Edit className="w-4 h-4" /> Edit Slide
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(slide)} className="cursor-pointer gap-2">
                        {slide.isActive ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDelete((slide._id as any).toString())}
                        className="cursor-pointer gap-2 text-red-500"
                      >
                        <Trash2 className="w-4 h-4" /> Delete Slide
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-navy-950/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                    Order: {slide.order}
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-navy-950 line-clamp-1 mb-1">{Array.isArray(slide.title) ? slide.title.join(" ") : slide.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{slide.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-muted">
                  <Button variant="ghost" size="sm" className="rounded-lg h-8 text-xs font-bold" disabled>
                    {slide.buttonLabel}
                  </Button>
                  <div className="flex gap-1">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="w-8 h-8 rounded-lg" 
                      disabled={slide.order <= 1}
                      onClick={() => handleMove(slide, "up")}
                    >
                      <MoveUp className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="w-8 h-8 rounded-lg" 
                      disabled={slide.order >= slides.length}
                      onClick={() => handleMove(slide, "down")}
                    >
                      <MoveDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
          <form onSubmit={handleSave}>
            <DialogHeader className="p-8 bg-navy-950 text-white rounded-t-3xl">
              <DialogTitle className="text-2xl font-bold">
                {editingItem?._id ? "Edit Hero Slide" : "Create Hero Slide"}
              </DialogTitle>
              <DialogDescription className="text-blue-100">
                Design your homepage hero section. Use high-quality background images.
              </DialogDescription>
            </DialogHeader>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Main Title</Label>
                <Input 
                  id="title"
                  value={Array.isArray(editingItem?.title) ? editingItem.title.join(", ") : ""}
                  onChange={(e) => {
                    const titles = e.target.value.split(",").map(s => s.trim()).filter(s => s !== "");
                    setEditingItem(prev => prev ? { ...prev, title: titles } : null);
                  }}
                  placeholder="Enter slide title"
                  className="rounded-xl h-11"
                  required
                />
                <p className="text-[10px] text-muted-foreground italic">Tip: Use commas to separate lines if the theme supports it.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Subtitle / Description</Label>
                <Textarea 
                  id="description"
                  value={editingItem?.description}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                  placeholder="Enter a brief description for the slide"
                  className="rounded-xl min-h-[100px] resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="buttonLabel">Button Text</Label>
                  <Input 
                    id="buttonLabel"
                    value={editingItem?.buttonLabel}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, buttonLabel: e.target.value } : null)}
                    placeholder="e.g., Get Started"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Button Link</Label>
                  <Input 
                    id="link"
                    value={editingItem?.link}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, link: e.target.value } : null)}
                    placeholder="e.g., /contact"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rightSlogan">Side Slogan (Desktop Only)</Label>
                <Input 
                  id="rightSlogan"
                  value={editingItem?.rightSlogan}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, rightSlogan: e.target.value } : null)}
                  placeholder="Vertical text on the right side"
                  className="rounded-xl h-11"
                />
              </div>

              <ImageUpload 
                label="Background Image"
                description="Large cinematic image recommended (Min 1920x1080)"
                value={editingItem?.image?.url}
                onChange={(url) => setEditingItem(prev => {
                  if (!prev) return null;
                  const titleStr = Array.isArray(prev.title) ? prev.title.join(" ") : "";
                  return { 
                    ...prev, 
                    image: { 
                      ...prev.image, 
                      url, 
                      alt: titleStr || "Hero Image" 
                    } 
                  };
                })}
              />

              <div className="flex items-center justify-between py-4 border-t border-b bg-muted/20 px-6 rounded-2xl">
                <div className="space-y-0.5">
                  <Label className="text-base">Slide Status</Label>
                  <p className="text-xs text-muted-foreground">Is this slide visible in the carousel?</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="order" className="text-xs">Display Order</Label>
                    <Input 
                      id="order"
                      type="number"
                      value={editingItem?.order}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setEditingItem(prev => prev ? { ...prev, order: isNaN(val) ? (prev.order || 0) : val } : null);
                      }}
                      className="rounded-xl h-9 w-16"
                    />
                  </div>
                  <Switch 
                    checked={editingItem?.isActive}
                    onCheckedChange={(val) => setEditingItem(prev => prev ? { ...prev, isActive: val } : null)}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 border-t bg-muted/10 rounded-b-3xl">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl h-11 px-6"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="rounded-xl h-11 px-8 bg-primary hover:bg-primary/90 font-bold"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editingItem?._id ? "Update Slide" : "Create Slide"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
