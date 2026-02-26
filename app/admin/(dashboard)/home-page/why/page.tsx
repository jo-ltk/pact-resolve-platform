"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, HelpCircle, Loader2, Edit, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/context/AuthContext";
import { WhyPactPoint } from "@/lib/db/schemas";

export default function WhyPactAdmin() {
  const { token } = useAuth();
  const [data, setData] = useState<WhyPactPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<WhyPactPoint> | null>(null);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/why-pact?admin=true");
      const result = await res.json();
      if (result.success) setData(result.data || []);
    } catch { toast.error("Fetch failed"); }
    finally { setIsLoading(false); }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/content/why-pact", {
        method: editingItem?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(editingItem)
      });
      if ((await res.json()).success) {
        toast.success("Saved");
        setIsDialogOpen(false);
        fetchItems();
      }
    } catch { toast.error("Save failed"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/content/why-pact?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if ((await res.json()).success) {
        toast.success("Deleted");
        fetchItems();
      }
    } catch { toast.error("Delete failed"); }
  };

  const openDialog = (item: Partial<WhyPactPoint> = {}) => {
    setEditingItem({ label: "", title: "", description: "", cta: "", iconName: "Shield", order: data.length + 1, isActive: true, ...item });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Link href="/admin/home-page" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center gap-3"><HelpCircle className="w-8 h-8 text-indigo-600" /> Why PACT Tabs</h1>
          <Button onClick={() => openDialog()} className="rounded-xl px-6 bg-primary"><Plus className="w-4 h-4 mr-2" /> Add Tab</Button>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Tab Label</TableHead>
              <TableHead>Content Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></TableCell></TableRow>
              ) : data.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No tabs yet. Click "Add Tab" to get started.</TableCell></TableRow>
              ) : data.map((item) => (
                <TableRow key={item._id?.toString()}>
                  <TableCell>{item.order}</TableCell>
                  <TableCell className="font-bold">{item.label}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.isActive ? <Badge className="bg-emerald-500">Active</Badge> : <Badge variant="secondary">Hidden</Badge>}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openDialog(item)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(item._id!.toString())}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl rounded-3xl">
          <form onSubmit={handleSave}>
            <DialogHeader><DialogTitle>{editingItem?._id ? "Edit Tab" : "Add Tab"}</DialogTitle></DialogHeader>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Tab Label (Sidebar)</Label><Input value={editingItem?.label || ""} onChange={e => setEditingItem({...editingItem!, label: e.target.value})} required /></div>
                <div className="space-y-2"><Label>Content Title</Label><Input value={editingItem?.title || ""} onChange={e => setEditingItem({...editingItem!, title: e.target.value})} required /></div>
              </div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={editingItem?.description || ""} onChange={e => setEditingItem({...editingItem!, description: e.target.value})} required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>CTA Button Text</Label><Input value={editingItem?.cta || ""} onChange={e => setEditingItem({...editingItem!, cta: e.target.value})} /></div>
                <div className="space-y-2"><Label>Lucide Icon Name</Label><Input value={editingItem?.iconName || ""} onChange={e => setEditingItem({...editingItem!, iconName: e.target.value})} placeholder="Shield, Globe, BookOpen..." /></div>
              </div>
              <div className="flex justify-between items-center bg-muted/20 p-4 rounded-xl">
                 <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={editingItem?.order || 0} onChange={e => setEditingItem({...editingItem!, order: parseInt(e.target.value)})} /></div>
                 <div className="flex items-center space-x-2 pt-6">
                    <Switch checked={editingItem?.isActive || false} onCheckedChange={checked => setEditingItem({...editingItem!, isActive: checked})} />
                    <Label>Active</Label>
                 </div>
              </div>
            </div>
            <DialogFooter className="p-6 border-t"><Button type="submit">Save Tab</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
