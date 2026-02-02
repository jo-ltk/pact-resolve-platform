"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Clock,
  ArrowLeft,
  Loader2,
  X
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
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
import { MediationResolutionStep } from "@/lib/db/schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ResolutionStepsAdminPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<MediationResolutionStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MediationResolutionStep> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/content/mediation/resolution-steps?all=true");
      const result = await response.json();
      if (result.success) setItems(result.data || []);
    } catch (error) { toast.error("Fetch failed"); }
    finally { setIsLoading(false); }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/content/mediation/resolution-steps?id=${id}`, {
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
      const response = await fetch("/api/content/mediation/resolution-steps", {
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
    setEditingItem({ title: "", label: "", description: "", iconName: "ArrowRight", order: items.length + 1, isActive: true });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <Link href="/admin/mediation" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-navy-950 flex items-center gap-3">
            <Clock className="w-8 h-8 text-accent" />
            Resolution Steps
          </h1>
        </div>
        <Button onClick={openCreateDialog} className="rounded-xl"><Plus className="w-4 h-4 mr-2" /> Add Step</Button>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-navy-100 before:to-transparent">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               <Skeleton className="w-full h-32 rounded-3xl" />
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-navy-100 relative z-10 mx-auto max-w-2xl">
            <Clock className="w-12 h-12 text-navy-200 mx-auto mb-4" />
            <p className="text-navy-950/40 font-medium">No steps defined. Add the first step to your resolution roadmap.</p>
          </div>
        ) : items.map((item, i) => (
          <div key={(item._id as any).toString()} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-accent text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 z-10 transition-transform group-hover:scale-125 duration-300">
               <span className="font-bold text-xs">{item.order}</span>
            </div>
            {/* Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-white border border-navy-50 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent/20 group-hover:-translate-y-1 relative">
                <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center gap-3">
                      {(() => {
                         const Icon = (LucideIcons as any)[item.iconName] || Clock;
                         return <Icon className="w-5 h-5 text-accent" />;
                      })()}
                      <h3 className="font-bold text-navy-950 text-lg">{item.title}</h3>
                   </div>
                   <div className="flex items-center gap-2">
                      <Badge variant={item.isActive ? "success" : "secondary"}>{item.isActive ? "Active" : "Hidden"}</Badge>
                      <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                               <MoreHorizontal className="w-4 h-4" />
                            </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete((item._id as any).toString())} className="text-red-500">Delete</DropdownMenuItem>
                         </DropdownMenuContent>
                      </DropdownMenu>
                   </div>
                </div>
                <div className="mb-3">
                   <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-bold px-2 py-0.5 rounded bg-accent/5">{item.label}</span>
                </div>
                <p className="text-sm text-navy-950/60 font-light leading-relaxed line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <form onSubmit={handleSave} className="space-y-6">
            <DialogHeader>
              <DialogTitle>{editingItem?._id ? "Edit Step" : "Create Step"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={editingItem?.title || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Short Label</Label>
                  <Input value={editingItem?.label || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, label: e.target.value }))} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={editingItem?.description || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label>Icon Name (Lucide)</Label>
                  <Input value={editingItem?.iconName || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, iconName: e.target.value }))} placeholder="Users, Scale, etc." />
                </div>
                <div className="space-y-2">
                  <Label>Order</Label>
                  <Input type="number" value={editingItem?.order || 0} onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) }))} />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Label>Active</Label>
                <Switch checked={editingItem?.isActive || false} onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isSaving}>{isSaving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
