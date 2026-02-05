"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Trophy,
  Loader2,
  ArrowLeft,
  Image as ImageIcon
} from "lucide-react";
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
import { type EcosystemAward } from "@/lib/db/schemas";

export default function EcosystemAwardsAdminPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<EcosystemAward[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<EcosystemAward> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/content/ecosystem/awards?all=true");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      if (result.success) setItems(result.data || []);
    } catch (error) { 
      console.error(error);
      toast.error("Failed to fetch awards"); 
    }
    finally { setIsLoading(false); }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this award? This action cannot be undone.")) return;
    try {
      const response = await fetch(`/api/content/ecosystem/awards?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if ((await response.json()).success) {
        toast.success("Award deleted successfully");
        setItems(items.filter(i => (i._id as any).toString() !== id));
      }
    } catch (error) { toast.error("Delete failed"); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = editingItem?._id ? "PUT" : "POST";
      const response = await fetch("/api/content/ecosystem/awards", {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(editingItem)
      });
      const result = await response.json();
      if (result.success) {
        toast.success(editingItem?._id ? "Award updated" : "Award created");
        setIsDialogOpen(false);
        fetchItems();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch (error) { toast.error("Save failed"); }
    finally { setIsSaving(false); }
  };

  const openCreateDialog = () => {
    setEditingItem({ 
      recipientName: "", 
      awardTitle: "", 
      description: "", 
      image: "", 
      order: items.length + 1, 
      isActive: true 
    });
    setIsDialogOpen(true);
  };

  const filteredItems = items.filter(item => 
    item.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.awardTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
        <div className="space-y-4">
          <Link href="/admin/ecosystem" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-navy-950 tracking-tight">Accolades & Awards</h1>
              <p className="text-navy-950/40 text-sm font-medium uppercase tracking-widest mt-1">Manage recognition section in About Us</p>
            </div>
          </div>
        </div>
        <Button onClick={openCreateDialog} className="rounded-xl px-6 h-12 bg-navy-950 hover:bg-navy-900 text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-navy-950/10">
          <Plus className="w-4 h-4 mr-2" /> Add Award
        </Button>
      </div>

      <Card className="rounded-3xl border-none shadow-xl shadow-navy-950/5 bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-navy-50 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-950/20" />
              <Input 
                placeholder="Search awards or recipients..." 
                className="pl-10 h-11 bg-navy-50/50 border-none rounded-xl focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-navy-50">
                  <TableHead className="w-[80px] text-[10px] font-black uppercase tracking-widest text-navy-950/40 pl-8">Order</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-navy-950/40">Award Info</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-navy-950/40">Description</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-navy-950/40">Status</TableHead>
                  <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest text-navy-950/40">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i} className="border-navy-50/50">
                      <TableCell colSpan={5} className="py-4 px-8"><Skeleton className="h-12 w-full rounded-xl" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Trophy className="w-12 h-12 text-navy-200" />
                        <p className="text-navy-950/40 font-medium">No awards found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredItems.map((item) => (
                  <TableRow key={(item._id as any).toString()} className="group hover:bg-navy-50/50 transition-colors border-navy-50/50">
                    <TableCell className="pl-8">
                      <span className="font-mono text-xs font-bold text-navy-950/30">#{item.order}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl bg-navy-100 overflow-hidden flex items-center justify-center shrink-0 border border-navy-50">
                          {item.image ? (
                            <img src={item.image} alt={item.recipientName} className="object-cover w-full h-full" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-navy-950/20" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-navy-950 text-sm">{item.recipientName}</span>
                          <span className="text-xs text-amber-600 font-medium">{item.awardTitle}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-navy-950/50 line-clamp-2 max-w-sm leading-relaxed">
                        {item.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-[10px] uppercase font-black tracking-widest h-6">
                        {item.isActive ? "Active" : "Hidden"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white hover:shadow-sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[160px] shadow-2xl border-navy-50">
                          <DropdownMenuItem 
                            onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}
                            className="rounded-xl flex items-center gap-3 px-3 py-2 cursor-pointer focus:bg-navy-50"
                          >
                            <Edit className="w-4 h-4 text-navy-950/40" />
                            <span className="text-sm font-medium">Edit Award</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete((item._id as any).toString())}
                            className="rounded-xl flex items-center gap-3 px-3 py-2 cursor-pointer focus:bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Delete Award</span>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white rounded-4xl p-0 overflow-hidden border-none shadow-2xl">
          <form onSubmit={handleSave}>
            <DialogHeader className="p-8 pb-0">
              <DialogTitle className="text-2xl font-bold tracking-tight text-navy-950">
                {editingItem?._id ? "Edit Award" : "New Award Entry"}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for the accolade or award to be displayed on the About Us page.
              </DialogDescription>
            </DialogHeader>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Recipient Name</Label>
                  <Input 
                    value={editingItem?.recipientName || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, recipientName: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. Jonathan Rodrigues"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Award Title</Label>
                  <Input 
                    value={editingItem?.awardTitle || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, awardTitle: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="e.g. Mediation Path-breaker Award"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Description / Citation</Label>
                <Textarea 
                  value={editingItem?.description || ""} 
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))} 
                  className="min-h-[120px] rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20 resize-none p-4"
                  placeholder="Paste the full citation or description here..."
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Image URL</Label>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-950/20" />
                    <Input 
                      value={editingItem?.image || ""} 
                      onChange={(e) => setEditingItem(prev => ({ ...prev!, image: e.target.value }))} 
                      className="pl-10 h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                      placeholder="https://cloudinary.com/..."
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-navy-50">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Display Order</Label>
                  <Input 
                    type="number" 
                    value={editingItem?.order || 0} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-4 h-12 rounded-xl bg-navy-50/50 mt-8">
                  <Label className="text-xs font-bold text-navy-950/60 uppercase tracking-widest cursor-pointer" htmlFor="status-toggle">Visible Page</Label>
                  <Switch 
                    id="status-toggle"
                    checked={editingItem?.isActive || false} 
                    onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))} 
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 pt-0 bg-navy-50/30">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6 font-bold">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="rounded-xl h-12 px-8 bg-navy-950 hover:bg-navy-900 text-white font-bold transition-all shadow-lg">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editingItem?._id ? "Update Award" : "Create Award"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
