"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  MoreHorizontal, 
  Scale,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { MediationFee } from "@/lib/db/schemas";

export function FeesTable() {
  const { token } = useAuth();
  const [items, setItems] = useState<MediationFee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MediationFee> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/content/mediation/fees?all=true&t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" }
      });
      const result = await response.json();
      if (result.success) setItems(result.data || []);
    } catch (error) { toast.error("Fetch failed"); }
    finally { setIsLoading(false); }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/content/mediation/fees?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if ((await response.json()).success) {
        toast.success("Deleted");
        setItems(items.filter(i => (i._id as any).toString() !== id));
      }
    } catch (error) { toast.error("Delete failed"); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = editingItem?._id ? "PUT" : "POST";
      const response = await fetch("/api/content/mediation/fees", {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(editingItem)
      });
      if ((await response.json()).success) {
        toast.success("Saved");
        setIsDialogOpen(false);
        fetchItems();
      }
    } catch (error) { toast.error("Save failed"); }
    finally { setIsSaving(false); }
  };

  const openCreateDialog = () => {
    setEditingItem({ title: "", description: "", order: items.length + 1, isActive: true });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center mb-6">
        <Button onClick={openCreateDialog} size="sm" className="rounded-xl px-4"><Plus className="w-4 h-4 mr-2" /> Add Fee Item</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="h-64 rounded-4xl overflow-hidden border-none shadow-sm">
              <Skeleton className="h-full w-full" />
            </Card>
          ))
        ) : items.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-navy-100">
            <Scale className="w-12 h-12 text-navy-200 mx-auto mb-4" />
            <p className="text-navy-950/40 font-medium">No fee items defined yet.</p>
          </div>
        ) : items.map((item) => (
          <Card key={(item._id as any).toString()} className="group hover:shadow-2xl transition-all duration-700 rounded-4xl border-none shadow-sm overflow-hidden bg-white flex flex-col">
            <div className="p-8 bg-navy-50 group-hover:bg-accent transition-colors duration-500 flex justify-between items-start">
               <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-accent group-hover:bg-white/20 group-hover:text-white transition-all">
                  <Scale className="w-6 h-6" />
               </div>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-black/5 text-navy-400 group-hover:text-white group-hover:hover:bg-white/10">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}>Edit Fee</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete((item._id as any).toString())} className="text-red-500">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
            <CardContent className="p-8 grow flex flex-col">
               <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className=" text-xs uppercase tracking-widest text-accent font-bold group-hover:text-accent/80">Fee Item #{item.order}</span>
                    <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-xs uppercase">{item.isActive ? "Active" : "Hidden"}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-navy-950 mb-4 group-hover:text-accent transition-colors">{item.title}</h3>
                  <div className="text-4xl font-light text-navy-950 tracking-tighter mb-4">
                     {item.price}
                  </div>
                  <p className="text-navy-950/50 text-sm font-light leading-relaxed">{item.description}</p>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <form onSubmit={handleSave} className="space-y-6">
            <DialogHeader>
              <DialogTitle>{editingItem?._id ? "Edit Fee" : "Create Fee"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={editingItem?.title || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Price (e.g. ₹15,000 or Variable)</Label>
                  <Input value={editingItem?.price || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, price: e.target.value }))} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={editingItem?.description || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))} required className="min-h-[100px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Order</Label>
                  <Input type="number" value={editingItem?.order || 0} onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) }))} />
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <Label>Active</Label>
                  <Switch checked={editingItem?.isActive || false} onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isSaving} className="bg-navy-950 text-white">{isSaving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}Save Fee</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
