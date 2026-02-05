"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, MoreHorizontal, Handshake, Loader2, ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { AcademyPartner, AcademyProgram } from "@/lib/db/schemas";
import { Checkbox } from "@/components/ui/checkbox";

const PROGRAM: AcademyProgram = "mediation";
const BACK_LINK = "/admin/academy/mediation";
const PAGE_TITLE = "Mediation";

export default function MediationPartnersPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<AcademyPartner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<AcademyPartner> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/content/academy/partners?all=true&program=${PROGRAM}&t=${Date.now()}`);
      const result = await response.json();
      if (result.success) setItems(result.data || []);
      else toast.error(result.error || "Failed to fetch");
    } catch { toast.error("An error occurred"); } finally { setIsLoading(false); }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/content/academy/partners?id=${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      const result = await response.json();
      if (result.success) { toast.success("Deleted"); setItems(items.filter(i => (i._id as any).toString() !== id)); }
      else toast.error(result.error);
    } catch { toast.error("Delete failed"); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = editingItem?._id ? "PUT" : "POST";
      const response = await fetch("/api/content/academy/partners", { method, headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify(editingItem) });
      const result = await response.json();
      if (result.success) { toast.success(editingItem?._id ? "Updated" : "Created"); setIsDialogOpen(false); fetchItems(); }
      else toast.error(result.error);
    } catch { toast.error("Save failed"); } finally { setIsSaving(false); }
  };

  const openCreateDialog = () => {
    setEditingItem({ programs: [PROGRAM], name: "", logo: "", description: "", websiteUrl: "", order: items.length + 1, isActive: true });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: AcademyPartner) => { setEditingItem(item); setIsDialogOpen(true); };

  const toggleProgram = (program: AcademyProgram) => {
    if (!editingItem) return;
    const programs = editingItem.programs || [];
    setEditingItem({ ...editingItem, programs: programs.includes(program) ? programs.filter(p => p !== program) : [...programs, program] });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link href={BACK_LINK} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to {PAGE_TITLE}</Link>
          <h1 className="text-3xl font-bold text-navy-950 flex items-center gap-3"><Handshake className="w-8 h-8 text-accent" />Strategic Partners</h1>
          <p className="text-muted-foreground">Manage partner listings for {PAGE_TITLE} programs.</p>
        </div>
        <Button onClick={openCreateDialog} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 shadow-lg shadow-primary/20"><Plus className="w-4 h-4 mr-2" />Add Partner</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? Array.from({ length: 6 }).map((_, i) => <Card key={i} className="h-48 rounded-3xl overflow-hidden border-none shadow-sm"><Skeleton className="h-full w-full" /></Card>) : items.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-navy-100"><Handshake className="w-12 h-12 text-navy-200 mx-auto mb-4" /><p className="text-navy-950/40 font-medium">No partners found.</p></div>
        ) : items.map((item) => (
          <Card key={(item._id as any).toString()} className="group hover:shadow-2xl transition-all duration-500 rounded-3xl border-none shadow-sm overflow-hidden bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-20 h-20 rounded-2xl bg-navy-50 flex items-center justify-center overflow-hidden">
                  {item.logo ? <Image src={item.logo} alt={item.name} width={80} height={80} className="object-contain" /> : <Building2 className="w-8 h-8 text-navy-200" />}
                </div>
                <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-navy-50"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="rounded-xl"><DropdownMenuItem onClick={() => openEditDialog(item)}>Edit</DropdownMenuItem><DropdownMenuItem onClick={() => handleDelete((item._id as any).toString())} className="text-red-500">Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
              </div>
              <div className="flex items-center gap-2 mb-2"><Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-[10px] uppercase font-bold border-none px-3">{item.isActive ? "Active" : "Hidden"}</Badge></div>
              <h3 className="text-lg font-bold text-navy-950 group-hover:text-accent transition-colors">{item.name}</h3>
              {item.description && <p className="text-sm text-navy-950/50 line-clamp-2 mt-1">{item.description}</p>}
              <div className="flex flex-wrap gap-1 mt-3">{item.programs?.map(p => <Badge key={p} variant="outline" className="rounded-full text-[9px] uppercase font-bold px-2 py-0.5">{p}</Badge>)}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[95vh] p-0 border-none shadow-2xl rounded-4xl overflow-hidden bg-white flex flex-col">
          <form onSubmit={handleSave} className="flex flex-col h-full overflow-hidden">
            <DialogHeader className="p-8 bg-navy-950 text-white shrink-0"><DialogTitle className="text-2xl font-bold">{editingItem?._id ? "Edit Partner" : "Add Partner"}</DialogTitle><DialogDescription className="text-blue-100">Strategic partner for Academy programs.</DialogDescription></DialogHeader>
            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2"><Label>Partner Name</Label><Input value={editingItem?.name || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, name: e.target.value }))} placeholder="e.g. ABC Institute" required /></div>
                  <div className="space-y-2"><Label>Description (Optional)</Label><Input value={editingItem?.description || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))} placeholder="Brief description..." /></div>
                  <div className="space-y-2"><Label>Website URL (Optional)</Label><Input value={editingItem?.websiteUrl || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, websiteUrl: e.target.value }))} placeholder="https://..." /></div>
                  <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={editingItem?.order || 1} onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) }))} /></div>
                </div>
                <ImageUpload label="Partner Logo" value={editingItem?.logo} onChange={(url) => setEditingItem(prev => ({ ...prev!, logo: url }))} />
              </div>
              <div className="space-y-3 p-4 border rounded-xl"><Label className="text-xs uppercase font-bold text-muted-foreground">Programs</Label><div className="flex flex-wrap gap-4">{(["mediation", "arbitration", "negotiation"] as AcademyProgram[]).map(p => <div key={p} className="flex items-center space-x-2"><Checkbox id={`program-${p}`} checked={editingItem?.programs?.includes(p)} onCheckedChange={() => toggleProgram(p)} /><label htmlFor={`program-${p}`} className="text-sm font-medium capitalize">{p}</label></div>)}</div></div>
              <div className="flex items-center gap-4 border p-4 rounded-xl"><div className="flex-1"><Label className="block mb-1">Status</Label><p className="text-xs text-muted-foreground">Visible on frontend</p></div><Switch checked={editingItem?.isActive || false} onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))} /></div>
            </div>
            <DialogFooter className="p-8 border-t bg-gray-50/80 backdrop-blur-sm shrink-0"><Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button type="submit" className="bg-navy-950 text-white" disabled={isSaving}>{isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}{editingItem?._id ? "Update" : "Add"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
