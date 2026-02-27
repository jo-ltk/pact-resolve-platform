"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Globe, Loader2, Edit, Trash2, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { NetworkLogo } from "@/lib/db/schemas";

export default function NetworkLogosAdmin() {
  const { token } = useAuth();
  const [data, setData] = useState<NetworkLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<NetworkLogo> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/network-logos?admin=true");
      const result = await res.json();
      if (result.success) setData(result.data || []);
    } catch { toast.error("Fetch failed"); }
    finally { setIsLoading(false); }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/content/network-logos", {
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
    finally { setIsSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/content/network-logos?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if ((await res.json()).success) {
        toast.success("Deleted");
        fetchItems();
      }
    } catch { toast.error("Delete failed"); }
  };

  const openDialog = (item: Partial<NetworkLogo> = {}) => {
    setEditingItem({ 
      name: "", 
      order: data.length + 1, 
      isActive: true, 
      logo: { url: "", alt: "" },
      ...item 
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Link href="/admin/home-page" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold flex items-center gap-3"><Globe className="w-8 h-8 text-slate-600" /> Network Marquee</h1>
            <p className="text-muted-foreground text-sm">Manage the scrolling logos on the homepage PACT Network section.</p>
          </div>
          <Button onClick={() => openDialog()} className="rounded-xl px-6 bg-primary"><Plus className="w-4 h-4 mr-2" /> Add Network</Button>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="w-[80px]">Order</TableHead>
              <TableHead className="w-[100px]">Logo</TableHead>
              <TableHead>Organization Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></TableCell></TableRow>
              ) : data.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No network names yet. Click "Add Network" to get started.</TableCell></TableRow>
              ) : data.sort((a,b) => (a.order || 0) - (b.order || 0)).map((item) => (
                <TableRow key={item._id?.toString()}>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>
                    {item.logo?.url ? (
                      <div className="relative w-16 h-10 bg-muted/30 rounded p-1">
                        <Image 
                          src={item.logo.url} 
                          alt={item.name} 
                          fill 
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-10 bg-muted/30 rounded flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-bold">{item.name}</TableCell>
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
        <DialogContent className="rounded-3xl max-w-lg">
          <form onSubmit={handleSave}>
            <DialogHeader><DialogTitle>{editingItem?._id ? "Edit Network" : "Add Network"}</DialogTitle></DialogHeader>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input value={editingItem?.name || ""} onChange={e => setEditingItem({...editingItem!, name: e.target.value})} required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input type="number" value={editingItem?.order || 0} onChange={e => setEditingItem({...editingItem!, order: parseInt(e.target.value)})} />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch checked={editingItem?.isActive || false} onCheckedChange={checked => setEditingItem({...editingItem!, isActive: checked})} />
                  <Label>Active</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Logo Image</Label>
                <ImageUpload 
                  value={editingItem?.logo?.url} 
                  onChange={(url) => setEditingItem({...editingItem!, logo: { url, alt: editingItem?.name || "" }})}
                />
              </div>
            </div>
            <DialogFooter className="p-6 border-t font-semibold">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingItem?._id ? "Update Network" : "Save Network"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
