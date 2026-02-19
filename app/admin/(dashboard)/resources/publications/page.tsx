"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  BookOpen,
  Loader2,
  ArrowLeft,
  ExternalLink,
  FileText
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FileUpload } from "@/components/admin/FileUpload";
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

export default function PublicationsAdminPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<ResourceItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/content/resources?all=true&type=publication`, {
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
        toast.error(result.error || "Failed to fetch publications");
      }
    } catch (error: any) { 
      console.error("Fetch error:", error);
      toast.error(error.message || "Failed to fetch publications"); 
    }
    finally { setIsLoading(false); }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;
    try {
      const response = await fetch(`/api/content/resources?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Publication deleted");
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
        body: JSON.stringify({ ...editingItem, type: "publication" })
      });
      const result = await response.json();
      if (result.success) {
        toast.success(editingItem?._id ? "Publication updated" : "Publication created");
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
      type: "publication",
      subtitle: "", 
      description: "",
      image: "",
      logo: "",
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

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.publication?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group border-b border-navy-50 pb-8">
        <div className="space-y-4">
          <Link href="/admin/resources" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 border border-violet-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-navy-950 tracking-tight">Recommended Reads</h1>
              <p className="text-navy-950/40 text-sm font-medium uppercase tracking-widest mt-1">Manage publications displayed on the Blog page</p>
            </div>
          </div>
        </div>
        <Button onClick={openCreateDialog} className="rounded-xl px-6 h-12 bg-navy-950 hover:bg-navy-900 text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-navy-950/10">
          <Plus className="w-4 h-4 mr-2" /> Add Publication
        </Button>
      </div>

      {/* Publications Table */}
      <Card className="rounded-3xl border-none shadow-xl shadow-navy-950/5 bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-navy-50 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-950/20" />
              <Input 
                placeholder="Search publications..." 
                className="pl-10 h-11 bg-navy-50/50 border-none rounded-xl focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Badge className="bg-violet-500/10 text-violet-600 border-violet-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              {items.length} Total
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-navy-50">
                  <TableHead className="w-[80px] text-xs font-black uppercase tracking-widest text-navy-950/40 pl-8 hidden md:table-cell">Order</TableHead>
                  <TableHead className="text-xs font-black uppercase tracking-widest text-navy-950/40">Publication</TableHead>
                  <TableHead className="text-xs font-black uppercase tracking-widest text-navy-950/40 hidden lg:table-cell">Source</TableHead>
                  <TableHead className="text-xs font-black uppercase tracking-widest text-navy-950/40 hidden sm:table-cell">Link / PDF</TableHead>
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
                        <BookOpen className="w-12 h-12 text-navy-200" />
                        <p className="text-navy-950/40 font-medium">No publications found</p>
                        <p className="text-navy-950/30 text-sm">Click "Add Publication" to create one</p>
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
                        <div className="relative w-10 h-10 rounded-xl bg-navy-50 overflow-hidden flex items-center justify-center shrink-0 border border-navy-100/50 shadow-sm">
                          {item.logo ? (
                            <img src={item.logo} alt={item.title} className="object-contain w-full h-full p-1 grayscale group-hover:grayscale-0 transition-all duration-500" />
                          ) : (
                            <BookOpen className="w-4 h-4 text-navy-950/20" />
                          )}
                        </div>
                        <div className="flex flex-col max-w-[300px]">
                          <span className="font-bold text-navy-950 text-sm truncate">{item.title}</span>
                          {item.author && (
                            <span className="text-xs text-navy-950/40 uppercase tracking-widest truncate">{item.author}</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-xs text-navy-950/60 font-medium">{item.publication || item.subtitle || "—"}</span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {item.url ? (
                        <a href={item.url} target="_blank" className="text-xs text-blue-500 hover:underline truncate max-w-[200px] flex items-center gap-1">
                          {item.url.endsWith(".pdf") ? (
                            <><FileText className="w-3 h-3" /> PDF</>
                          ) : (
                            <><ExternalLink className="w-3 h-3" /> Link</>
                          )}
                        </a>
                      ) : (
                        <span className="text-xs text-navy-950/30">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                         <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-xs uppercase font-black tracking-widest h-6">
                           {item.isActive ? "Active" : "Hidden"}
                         </Badge>
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
                            <span className="text-sm font-medium">Edit Publication</span>
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

      {/* Create / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl bg-white rounded-4xl p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-none">
          <form onSubmit={handleSave}>
            <DialogHeader className="p-8 pb-0">
              <DialogTitle className="text-2xl font-bold tracking-tight text-navy-950">
                {editingItem?._id ? "Edit Publication" : "New Publication"}
              </DialogTitle>
              <DialogDescription>
                Add or edit a publication for the Recommended Reads section. You can upload a PDF or provide an external link.
              </DialogDescription>
            </DialogHeader>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Title</Label>
                  <Input 
                    value={editingItem?.title || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. State-Sponsored Mediation"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Author Name</Label>
                  <Input 
                    value={editingItem?.author || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, author: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. Jonathan Rodrigues"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Publication / Journal Name</Label>
                  <Input 
                    value={editingItem?.publication || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, publication: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. IMI Blog"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Category</Label>
                  <Input 
                    value={editingItem?.category || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, category: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. Research Paper"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Description / Summary</Label>
                <Textarea 
                  value={editingItem?.description || ""} 
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))} 
                  className="min-h-[100px] rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20 resize-none p-4"
                  placeholder="Brief description of the publication..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUpload
                  label="Publication Logo (Optional)"
                  value={editingItem?.logo || ""}
                  onChange={(url) => setEditingItem(prev => ({ ...prev!, logo: url }))}
                />
                <FileUpload
                  label="PDF Document or External Link"
                  description="Upload a PDF (up to 10MB) or paste an external URL"
                  value={editingItem?.url || ""}
                  onChange={(url) => setEditingItem(prev => ({ ...prev!, url: url }))}
                  maxSizeMB={10}
                />
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
                  <Label className="text-xs font-bold text-navy-950/60 uppercase tracking-widest cursor-pointer" htmlFor="pub-status-toggle">Visible</Label>
                  <Switch 
                    id="pub-status-toggle"
                    checked={editingItem?.isActive || false} 
                    onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))} 
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-4 h-12 rounded-xl bg-navy-50/50 mt-8">
                  <Label className="text-xs font-bold text-navy-950/60 uppercase tracking-widest cursor-pointer" htmlFor="pub-featured-toggle">Featured</Label>
                  <Switch 
                    id="pub-featured-toggle"
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
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editingItem?._id ? "Update Publication" : "Create Publication"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
