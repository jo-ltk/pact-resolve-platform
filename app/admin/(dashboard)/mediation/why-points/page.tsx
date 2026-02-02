"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  X,
  Sparkles as SparklesIcon,
  Loader2,
  ArrowLeft
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
import { MediationWhyPoint } from "@/lib/db/schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WhyPointsAdminPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<MediationWhyPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MediationWhyPoint> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/content/mediation/why-points?all=true");
      const result = await response.json();
      if (result.success) setItems(result.data || []);
    } catch (error) { toast.error("Fetch failed"); }
    finally { setIsLoading(false); }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/content/mediation/why-points?id=${id}`, {
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
      const response = await fetch("/api/content/mediation/why-points", {
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
    setEditingItem({ title: "", description: "", iconName: "Sparkles", order: items.length + 1, isActive: true });
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
            <SparklesIcon className="w-8 h-8 text-accent" />
            Why Mediate Points
          </h1>
        </div>
        <Button onClick={openCreateDialog} className="rounded-xl"><Plus className="w-4 h-4 mr-2" /> Add Point</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="rounded-3xl overflow-hidden border-none shadow-sm h-64">
              <Skeleton className="h-full w-full" />
            </Card>
          ))
        ) : items.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-navy-100">
            <Sparkles className="w-12 h-12 text-navy-200 mx-auto mb-4" />
            <p className="text-navy-950/40 font-medium">No points added yet. Start by adding your first advantage point.</p>
          </div>
        ) : items.map((item) => (
          <Card key={(item._id as any).toString()} className="group hover:shadow-xl transition-all duration-500 rounded-4xl border-none shadow-sm overflow-hidden bg-white">
            <CardContent className="p-8 h-full flex flex-col items-center text-center relative">
               <div className="absolute top-6 right-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-navy-50">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete((item._id as any).toString())} className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
               </div>

               <div className="w-16 h-16 rounded-2xl bg-navy-50 text-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm border border-navy-100/50">
                 {(() => {
                    const Icon = (LucideIcons as any)[item.iconName] || SparklesIcon;
                    return <Icon className="w-8 h-8" />;
                 })()}
               </div>

               <div className="grow space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded">Point #{item.order}</span>
                    <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-[10px] uppercase font-bold">{item.isActive ? "Active" : "Hidden"}</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 uppercase italic tracking-tight group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-navy-950/50 text-sm font-light leading-relaxed line-clamp-3">{item.description}</p>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <form onSubmit={handleSave} className="space-y-6">
            <DialogHeader>
              <DialogTitle>{editingItem?._id ? "Edit Point" : "Create Point"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={editingItem?.title || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select value={editingItem?.iconName} onValueChange={(val) => setEditingItem(prev => ({ ...prev!, iconName: val }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Users", "Handshake", "Lock", "Home", "MessageSquare", "Calendar", "Sparkles", "Timer", "Scale", "FileText"].map(icon => (
                        <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={editingItem?.description || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))} required />
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
              <Button type="submit" disabled={isSaving}>{isSaving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
