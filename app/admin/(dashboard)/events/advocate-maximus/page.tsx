"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Calendar, Loader2, Edit, Trash2, Gavel, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { MCIEvent } from "@/lib/db/schemas";

export default function AdvocateMaximusManagementPage() {
  const { token } = useAuth();
  const [data, setData] = useState<MCIEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MCIEvent> | null>(null);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/advocate-maximus-event?all=true");
      const result = await res.json();
      if (result.success) {
        const items = result.data ? (Array.isArray(result.data) ? result.data : [result.data]) : [];
        setData(items);
      } else {
        setData([]);
      }
    } catch (e) { 
      toast.error("Fetch failed"); 
      setData([]);
    }
    finally { setIsLoading(false); }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/content/advocate-maximus-event", {
        method: editingItem?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(editingItem)
      });
      const result = await res.json();
      if (result.success) {
        toast.success(editingItem?._id ? "Updated successfully" : "Created successfully");
        setIsDialogOpen(false);
        fetchItems();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch (e) { toast.error("Save failed"); }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/content/advocate-maximus-event?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Deleted successfully");
        fetchItems();
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch (e) { toast.error("Delete failed"); }
  };

  const openDialog = (item: Partial<MCIEvent> = {}) => {
    setEditingItem({ 
      year: new Date().getFullYear(),
      subtitle: "",
      title: ["Advocate", "Maximus"],
      isActive: true,
      heroImage: { url: "", alt: "" },
      visionImage: { url: "", alt: "" },
      competitionImage: { url: "", alt: "" },
      gallery: [],
      ...item 
    });
    setIsDialogOpen(true);
  };

  const addGalleryItem = () => {
    if (!editingItem) return;
    const currentGallery = editingItem.gallery || [];
    setEditingItem({
      ...editingItem,
      gallery: [...currentGallery, { url: "", title: "", description: "", order: currentGallery.length + 1 }]
    });
  };

  const removeGalleryItem = (index: number) => {
     if (!editingItem || !editingItem.gallery) return;
     const newGallery = [...editingItem.gallery];
     newGallery.splice(index, 1);
     setEditingItem({ ...editingItem, gallery: newGallery });
  };

  const updateGalleryItem = (index: number, field: string, value: any) => {
    if (!editingItem || !editingItem.gallery) return;
    const newGallery = [...editingItem.gallery];
    newGallery[index] = { ...newGallery[index], [field]: value };
    setEditingItem({ ...editingItem, gallery: newGallery });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/admin/events" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to All Events
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-3"><Gavel className="w-8 h-8 text-emerald-500" /> Advocate Maximus</h1>
          <p className="text-muted-foreground">Manage Advocate Maximus events, participants, and gallery.</p>
        </div>
        <Button onClick={() => openDialog()} className="rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700"><Plus className="w-4 h-4 mr-2" /> Create New Edition</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-emerald-500" /></div>
        ) : data.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white dark:bg-navy-900 rounded-3xl border-2 border-dashed">
            <Gavel className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">No Advocate Maximus events found.</p>
            <p className="text-sm text-muted-foreground mt-2">Click "Create New Edition" to add your first event.</p>
            <Button onClick={() => openDialog()} className="mt-4 rounded-xl bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" /> Create First Event
            </Button>
          </div>
        ) : data.map((item) => (
          <Card key={item._id?.toString()} className="border-none shadow-md rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative h-48">
              {item.heroImage?.url ? (
                <Image 
                  src={item.heroImage.url} 
                  alt={item.title.join(" ")} 
                  fill
                  className="object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-emerald-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-transparent flex flex-col justify-end p-6">
                 <Badge className="w-fit mb-2 bg-emerald-500 text-white font-bold">{item.year}</Badge>
                 <h2 className="text-white text-xl font-bold">{item.title.join(" ")}</h2>
                 <p className="text-emerald-100 text-xs truncate">{item.subtitle}</p>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                 {item.isActive && <Badge className="bg-emerald-500 border-none">Active</Badge>}
                 <Button size="icon" variant="secondary" className="rounded-full w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => openDialog(item)}>
                   <Edit className="w-3 h-3" />
                 </Button>
                 <AlertDialog>
                   <AlertDialogTrigger asChild>
                     <Button size="icon" variant="destructive" className="rounded-full w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Trash2 className="w-3 h-3" />
                     </Button>
                   </AlertDialogTrigger>
                   <AlertDialogContent className="rounded-2xl">
                     <AlertDialogHeader>
                       <AlertDialogTitle>Delete Advocate Maximus Event</AlertDialogTitle>
                       <AlertDialogDescription>
                         Are you sure you want to delete "{item.title.join(" ")} {item.year}"? This action cannot be undone.
                       </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                       <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                       <AlertDialogAction className="rounded-xl bg-red-600 hover:bg-red-700" onClick={() => handleDelete(item._id!.toString())}>Delete</AlertDialogAction>
                     </AlertDialogFooter>
                   </AlertDialogContent>
                 </AlertDialog>
              </div>
            </div>
            <CardContent className="p-6">
               <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.eventDetails?.dates || "No dates set"}</span>
                  <span>{item.gallery?.length || 0} photos</span>
               </div>
               <Button variant="outline" className="w-full rounded-xl hover:bg-emerald-500 hover:text-white transition-colors" onClick={() => openDialog(item)}>Manage Event Data</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&>button]:text-white [&>button]:top-8 [&>button]:right-8 [&>button]:opacity-100 [&>button]:hover:opacity-80">
          <form onSubmit={handleSave}>
            <DialogHeader className="p-8 bg-gradient-to-br from-emerald-600 to-emerald-900 text-white rounded-t-3xl">
              <DialogTitle className="flex items-center gap-2">
                <Gavel className="w-5 h-5" />
                {editingItem?._id ? "Edit Event" : "Create New Event"} - {editingItem?.year}
              </DialogTitle>
            </DialogHeader>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Event Year</Label>
                  <Input type="number" value={editingItem?.year} onChange={e => setEditingItem({...editingItem!, year: parseInt(e.target.value)})} required className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label>Event Theme/Subtitle</Label>
                  <Input value={editingItem?.subtitle} onChange={e => setEditingItem({...editingItem!, subtitle: e.target.value})} placeholder="e.g., The Ultimate Advocacy Challenge" className="rounded-xl h-11" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold border-b pb-2">Visual Assets</h3>
                <div className="grid grid-cols-2 gap-6">
                  <ImageUpload label="Hero Background" value={editingItem?.heroImage?.url} onChange={url => setEditingItem({...editingItem!, heroImage: {url, alt: "Hero"}})} />
                  <ImageUpload label="Event Poster" value={editingItem?.visionImage?.url} onChange={url => setEditingItem({...editingItem!, visionImage: {url, alt: "Poster"}})} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                   <h3 className="font-bold">Event Gallery</h3>
                   <Button type="button" size="sm" variant="outline" onClick={addGalleryItem}><Plus className="w-3 h-3 mr-1" /> Add Photo</Button>
                </div>
                
                <div className="space-y-4">
                  {(editingItem?.gallery || []).map((photo, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-muted/20 rounded-xl border items-start">
                       <div className="w-24 shrink-0">
                         <ImageUpload 
                            value={photo.url} 
                            onChange={(url) => updateGalleryItem(index, "url", url)} 
                         />
                       </div>
                       <div className="grow space-y-3">
                         <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                               <Label className="text-xs">Title</Label>
                               <Input 
                                  value={photo.title} 
                                  onChange={e => updateGalleryItem(index, "title", e.target.value)} 
                                  className="h-9 text-sm"
                                  placeholder="Photo Title"
                               />
                            </div>
                             <div className="space-y-1">
                               <Label className="text-xs">Order</Label>
                               <Input 
                                  type="number"
                                  value={photo.order} 
                                  onChange={e => updateGalleryItem(index, "order", parseInt(e.target.value))} 
                                  className="h-9 text-sm"
                               />
                            </div>
                         </div>
                         <div className="space-y-1">
                            <Label className="text-xs">Description</Label>
                            <Input 
                               value={photo.description} 
                               onChange={e => updateGalleryItem(index, "description", e.target.value)} 
                               className="h-9 text-sm"
                               placeholder="Brief description..."
                            />
                         </div>
                       </div>
                       <Button type="button" size="icon" variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => removeGalleryItem(index)}>
                          <Trash2 className="w-4 h-4" />
                       </Button>
                    </div>
                  ))}
                  {(!editingItem?.gallery || editingItem.gallery.length === 0) && (
                     <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-xl">
                        No photos added yet. Click "Add Photo" to start.
                     </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-muted/30 rounded-2xl">
                <div>
                  <p className="font-bold">Active Edition</p>
                  <p className="text-xs text-muted-foreground">Only one event can be active at a time.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Switch 
                    checked={editingItem?.isActive} 
                    onCheckedChange={(checked) => setEditingItem({...editingItem!, isActive: checked})}
                  />
                  <Badge className={editingItem?.isActive ? "bg-emerald-500" : "bg-muted text-muted-foreground"}>
                    {editingItem?.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
            <DialogFooter className="p-8 border-t bg-muted/10 rounded-b-3xl">
              <Button type="submit" className="rounded-xl h-12 px-10 font-bold text-lg shadow-xl shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700">
                {editingItem?._id ? "Save Changes" : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
