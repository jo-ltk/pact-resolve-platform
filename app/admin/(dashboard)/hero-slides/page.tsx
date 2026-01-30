"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
import { cn } from "@/lib/utils";
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

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border-none shadow-sm rounded-4xl overflow-hidden p-4">
              <div className="flex items-center gap-6">
                <Skeleton className="w-48 h-28 rounded-2xl shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-8 w-1/3 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </Card>
          ))
        ) : slides.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center bg-white rounded-4xl border-2 border-dashed border-navy-100">
            <ImageIcon className="w-16 h-16 text-navy-100 mb-4" />
            <p className="text-navy-950 font-semibold text-lg">No hero slides found.</p>
            <p className="text-muted-foreground mb-6">Create slides to fill your homepage carousel.</p>
            <Button 
              onClick={openCreateDialog}
              className="bg-navy-950 text-white rounded-xl"
            >
              Construct First Slide
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {slides.map((slide) => (
              <Card 
                key={(slide._id as any).toString()} 
                className="border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-white rounded-4xl overflow-hidden group border border-navy-50/50"
              >
                <div className="flex flex-col md:flex-row items-center p-3 gap-6">
                  {/* Thumbnail Section */}
                  <div className="relative w-full md:w-56 aspect-16/10 rounded-2xl overflow-hidden shrink-0 bg-navy-50">
                    {slide.image?.url ? (
                      <Image 
                        src={slide.image.url} 
                        alt={slide.image.alt || (Array.isArray(slide.title) ? slide.title.join(" ") : slide.title)} 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-navy-200" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge className={cn(
                        "border-none px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-lg",
                        slide.isActive ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"
                      )}>
                        {slide.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 min-w-0 py-2">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-50 text-navy-950 font-black italic shadow-inner">
                        #{slide.order}
                      </div>
                      <h3 className="font-bold text-xl text-navy-950 truncate max-w-[300px]">
                        {Array.isArray(slide.title) ? slide.title.join(" ") : slide.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mb-4 pr-10">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="rounded-full bg-navy-50/50 text-navy-700 border-navy-100/50 px-3 py-1 text-[11px] font-medium transition-colors hover:bg-navy-100">
                        Button: {slide.buttonLabel}
                      </Badge>
                      <Badge variant="outline" className="rounded-full bg-slate-50 text-slate-600 border-slate-200 px-3 py-1 text-[11px] font-medium lowercase">
                        Link: {slide.link}
                      </Badge>
                      {slide.rightSlogan && (
                        <Badge variant="outline" className="rounded-full bg-gold-50/50 text-gold-700 border-gold-200/50 px-3 py-1 text-[11px] font-medium">
                          Slogan: {slide.rightSlogan}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Controls */}
                  <div className="flex items-center gap-2 md:border-l md:border-navy-50 md:pl-6">
                    <div className="flex flex-col gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-10 h-10 rounded-xl hover:bg-navy-50 text-navy-400 hover:text-navy-950 transition-all active:scale-90" 
                        disabled={slide.order <= 1}
                        onClick={() => handleMove(slide, "up")}
                      >
                        <MoveUp className="w-5 h-5 shadow-sm" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-10 h-10 rounded-xl hover:bg-navy-50 text-navy-400 hover:text-navy-950 transition-all active:scale-90" 
                        disabled={slide.order >= slides.length}
                        onClick={() => handleMove(slide, "down")}
                      >
                        <MoveDown className="w-5 h-5 shadow-sm" />
                      </Button>
                    </div>

                    <div className="h-12 w-px bg-navy-50 mx-2" />

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => openEditDialog(slide)}
                        variant="ghost" 
                        className="h-12 w-12 rounded-2xl bg-navy-50/50 hover:bg-navy-950 hover:text-white text-navy-950 transition-all group/edit shadow-sm border border-navy-100/50"
                      >
                        <Edit className="w-5 h-5 transition-transform group-hover/edit:scale-110" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-12 w-12 rounded-2xl hover:bg-gray-100 text-gray-400 transition-all">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl shadow-2xl w-56 p-2 border-none ring-1 ring-black/5 bg-white/90 backdrop-blur-xl">
                          <DropdownMenuItem 
                            onClick={() => handleToggleStatus(slide)} 
                            className="rounded-xl p-3 cursor-pointer font-medium focus:bg-navy-50 focus:text-navy-950"
                          >
                            <div className="flex flex-col">
                              <span className="text-sm">{slide.isActive ? "Hide Slide" : "Show Slide"}</span>
                              <span className="text-[10px] text-muted-foreground">Toggle carousel visibility</span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-1 bg-gray-100" />
                          <DropdownMenuItem 
                            onClick={() => handleDelete((slide._id as any).toString())}
                            className="rounded-xl p-3 cursor-pointer text-red-500 focus:text-white focus:bg-red-500 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Trash2 className="w-4 h-4" />
                              <div className="flex flex-col">
                                <span className="text-sm font-bold">Remove Slide</span>
                                <span className="text-[10px] opacity-80">Permanent deletion</span>
                              </div>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 border-none shadow-2xl rounded-4xl overflow-hidden bg-white flex flex-col">
          <form onSubmit={handleSave} className="flex flex-col h-full max-h-[90vh]">
            <DialogHeader className="p-8 bg-navy-950 text-white shrink-0 relative">
              <DialogTitle className="text-2xl font-bold">
                {editingItem?._id ? "Edit Hero Slide" : "Create Hero Slide"}
              </DialogTitle>
              <DialogDescription className="text-blue-100">
                Design your homepage hero section. Use high-quality background images.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-none">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-sm font-semibold text-navy-950 ml-1">Main Title</Label>
                <Input 
                  id="title"
                  value={Array.isArray(editingItem?.title) ? editingItem.title.join(", ") : ""}
                  onChange={(e) => {
                    const titles = e.target.value.split(",").map(s => s.trim()).filter(s => s !== "");
                    setEditingItem(prev => prev ? { ...prev, title: titles } : null);
                  }}
                  placeholder="Enter slide title"
                  className="rounded-2xl h-12 border-navy-100 focus:ring-accent/20 focus:border-accent transition-all bg-gray-50/50"
                  required
                />
                <p className="text-[11px] text-muted-foreground italic px-1">Tip: Use commas to separate lines if the theme supports it.</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-semibold text-navy-950 ml-1">Subtitle / Description</Label>
                <Textarea 
                  id="description"
                  value={editingItem?.description}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                  placeholder="Enter a brief description for the slide"
                  className="rounded-2xl min-h-[120px] resize-none border-navy-100 focus:ring-accent/20 focus:border-accent transition-all bg-gray-50/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="buttonLabel" className="text-sm font-semibold text-navy-950 ml-1">Button Text</Label>
                  <Input 
                    id="buttonLabel"
                    value={editingItem?.buttonLabel}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, buttonLabel: e.target.value } : null)}
                    placeholder="e.g., Get Started"
                    className="rounded-2xl h-12 border-navy-100 focus:ring-accent/20 focus:border-accent transition-all bg-gray-50/50"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="link" className="text-sm font-semibold text-navy-950 ml-1">Button Link</Label>
                  <Input 
                    id="link"
                    value={editingItem?.link}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, link: e.target.value } : null)}
                    placeholder="e.g., /contact"
                    className="rounded-2xl h-12 border-navy-100 focus:ring-accent/20 focus:border-accent transition-all bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="rightSlogan" className="text-sm font-semibold text-navy-950 ml-1">Side Slogan (Desktop Only)</Label>
                <Input 
                  id="rightSlogan"
                  value={editingItem?.rightSlogan}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, rightSlogan: e.target.value } : null)}
                  placeholder="Vertical text on the right side"
                  className="rounded-2xl h-12 border-navy-100 focus:ring-accent/20 focus:border-accent transition-all bg-gray-50/50"
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

              <div className="flex items-center justify-between p-6 border border-navy-100 bg-navy-50/30 rounded-3xl mt-4">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-navy-950">Slide Visibility & Order</Label>
                  <p className="text-xs text-muted-foreground">Manage slide status and priority.</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <Label htmlFor="order" className="text-xs font-medium">Order</Label>
                    <Input 
                      id="order"
                      type="number"
                      value={editingItem?.order}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setEditingItem(prev => prev ? { ...prev, order: isNaN(val) ? (prev.order || 0) : val } : null);
                      }}
                      className="rounded-xl h-9 w-16 text-center border-navy-200"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium">{editingItem?.isActive ? "Active" : "Hidden"}</span>
                    <Switch 
                      checked={editingItem?.isActive}
                      onCheckedChange={(val) => setEditingItem(prev => prev ? { ...prev, isActive: val } : null)}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 border-t bg-gray-50/80 backdrop-blur-sm shrink-0">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl h-12 px-8 font-medium hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="rounded-xl h-12 px-10 bg-navy-950 hover:bg-navy-900 text-white font-bold shadow-lg shadow-navy-950/10 transition-all active:scale-95"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
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
