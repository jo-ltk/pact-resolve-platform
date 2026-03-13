"use client";

import React, { useEffect, useState } from "react";
import { Plus, Star, Loader2, Edit, Trash2, ArrowLeft, PenTool, Image as ImageIcon, Layout, Type, ShieldCheck } from "lucide-react";
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
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { NmrContent } from "@/lib/db/schemas";
import Link from "next/link";

const EMPTY_ITEM: Partial<NmrContent> = {
  label: "",
  value: "",
  image: { url: "", alt: "" },
  logo: { url: "", alt: "" },
  order: 1,
  isActive: true,
};

export default function NmrAdminPage() {
  const { token } = useAuth();
  const [data, setData] = useState<NmrContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<NmrContent> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/nmr-content?admin=true");
      const result = await res.json();
      if (result.success) setData(result.data || []);
    } catch {
      toast.error("Failed to load NMR content");
    } finally {
      setIsLoading(false);
    }
  }

  const openDialog = (item: Partial<NmrContent> = EMPTY_ITEM) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.label || !editingItem?.value) {
      toast.error("Label and Value are required");
      return;
    }

    setIsSaving(true);
    try {
      const method = editingItem._id ? "PUT" : "POST";
      const res = await fetch("/api/content/nmr-content", {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingItem),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(editingItem._id ? "Content updated" : "Content created");
        setIsDialogOpen(false);
        fetchItems();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/content/nmr-content?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if ((await res.json()).success) {
        toast.success("Deleted");
        fetchItems();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link
            href="/admin/resources"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Resources
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <PenTool className="w-8 h-8 text-indigo-600" />
            National Mediation Review
          </h1>
          <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest">
            Manage 'Stay Tuned' content: Pictures, Names, and Logos.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            onClick={async () => {
              if(!confirm("Restore default sections?")) return;
              const res = await fetch("/api/content/nmr-content/seed", { method: "POST" });
              const result = await res.json();
              if (result.success) {
                toast.success(result.message);
                fetchItems();
              } else {
                toast.error(result.error);
              }
            }}
            className="rounded-xl px-6"
          >
            Restore Defaults
          </Button>
          <Button onClick={() => openDialog()} className="rounded-xl px-6 bg-navy-950 hover:bg-navy-900 transition-all">
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-navy-50">
                <TableHead className="w-[100px] text-sm font-black uppercase tracking-widest text-navy-950/40 pl-6">Order</TableHead>
                <TableHead className="text-sm font-black uppercase tracking-widest text-navy-950/40">Visuals</TableHead>
                <TableHead className="text-sm font-black uppercase tracking-widest text-navy-950/40">Label & Content</TableHead>
                <TableHead className="text-sm font-black uppercase tracking-widest text-navy-950/40">Status</TableHead>
                <TableHead className="text-right pr-6 text-sm font-black uppercase tracking-widest text-navy-950/40">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" /></TableCell></TableRow>
              ) : data.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-20 text-muted-foreground">No content found. Click "Add Item" to start.</TableCell></TableRow>
              ) : data.map((item) => (
                <TableRow key={item._id?.toString()} className="group hover:bg-navy-50/50 transition-colors border-navy-50/50">
                  <TableCell className="pl-6 font-bold text-navy-950/30">#{item.order}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.image?.url && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-navy-100 shrink-0">
                          <img src={item.image.url} className="w-full h-full object-cover" />
                        </div>
                      )}
                      {item.logo?.url && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-navy-100 bg-navy-50 p-1 shrink-0">
                          <img src={item.logo.url} className="w-full h-full object-contain" />
                        </div>
                      )}
                      {!item.image?.url && !item.logo?.url && (
                        <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center text-navy-300"><ImageIcon className="w-4 h-4" /></div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-0.5">{item.label}</span>
                      <span className="font-bold text-navy-950">{item.value}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-sm px-3 font-black uppercase tracking-widest h-6">
                      {item.isActive ? "Active" : "Hidden"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openDialog(item)} className="h-9 w-9 rounded-full hover:bg-white hover:shadow-sm"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item._id!.toString())} className="h-9 w-9 rounded-full hover:bg-red-50 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl w-[95vw] md:w-full bg-white rounded-3xl md:rounded-4xl p-0 overflow-hidden border-none shadow-2xl h-[90vh] md:h-auto md:max-h-[95vh] flex flex-col">
          <form onSubmit={handleSave} className="flex flex-col h-full min-h-0">
            <DialogHeader className="p-6 md:p-8 pb-0 shrink-0">
              <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-navy-950">
                {editingItem?._id ? "Edit NMR Content" : "Add NMR Content"}
              </DialogTitle>
              <DialogDescription className="text-sm">
                Configure labels, pictures, and logos for the 'Stay Tuned' section.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 p-6 md:p-8 space-y-6 md:space-y-8 overflow-y-auto min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Section Label</Label>
                  <Input 
                    value={editingItem?.label || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, label: e.target.value }))}
                    placeholder="e.g. Editors"
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-indigo-500/20"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Display Text / Names</Label>
                  <Input 
                    value={editingItem?.value || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, value: e.target.value }))}
                    placeholder="e.g. Jonathan Rodrigues & Ekta Bahl"
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Cover Image (Optional)</Label>
                  <ImageUpload 
                    value={editingItem?.image?.url || ""} 
                    onChange={(url) => setEditingItem(prev => ({ ...prev!, image: { url, alt: editingItem?.label || "" } }))} 
                  />
                  <p className="text-sm text-muted-foreground ml-1 font-medium">Use for Portrait photos or Theme banners</p>
                </div>
                <div className="space-y-3">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Partner Logo (Optional)</Label>
                  <ImageUpload 
                    value={editingItem?.logo?.url || ""} 
                    onChange={(url) => setEditingItem(prev => ({ ...prev!, logo: { url, alt: editingItem?.label || "" } }))} 
                  />
                  <p className="text-sm text-muted-foreground ml-1 font-medium">Use for Institutional Partner logos</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-navy-50/50 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-bold text-navy-950">Active Status</Label>
                  <p className="text-sm md:text-xs text-muted-foreground font-medium">Show this section on the live page</p>
                </div>
                <Switch 
                  checked={editingItem?.isActive || false} 
                  onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))} 
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Display Order</Label>
                <Input 
                  type="number"
                  value={editingItem?.order || 1} 
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) || 1 }))}
                  className="h-12 rounded-xl bg-navy-50/50 border-none w-full md:w-32"
                />
              </div>
            </div>

            <DialogFooter className="p-6 md:p-8 pt-4 md:pt-0 bg-white/80 backdrop-blur-sm border-t md:border-none flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6 w-full sm:w-auto">Cancel</Button>
              <Button type="submit" disabled={isSaving} className="rounded-xl h-12 px-10 bg-navy-950 hover:bg-navy-900 transition-all font-bold group w-full sm:w-auto">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editingItem?._id ? "Update Content" : "Save Content"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
