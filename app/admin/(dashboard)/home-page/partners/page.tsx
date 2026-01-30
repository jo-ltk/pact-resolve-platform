"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Handshake, Loader2, Filter, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { Partner } from "@/lib/db/schemas";

export default function PartnersAdminPage() {
  const { token } = useAuth();
  const [data, setData] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Partner> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/partners?all=true");
      const result = await res.json();
      if (result.success) setData(result.data || []);
    } catch (e) { toast.error("Fetch failed"); }
    finally { setIsLoading(false); }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/content/partners", {
        method: editingItem?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(editingItem)
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Saved");
        setIsDialogOpen(false);
        fetchItems();
      } else toast.error(result.error);
    } catch (e) { toast.error("Save failed"); }
    finally { setIsSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;
    try {
      const res = await fetch(`/api/content/partners?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Deleted");
        fetchItems();
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch (e) { toast.error("Delete failed"); }
  };

  const openDialog = (item: Partial<Partner> = {}) => {
    setEditingItem({ 
      name: "", category: "strategic", order: data.length + 1, isActive: true, 
      logo: { url: "", alt: "" }, ...item 
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link href="/admin/home-page" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-3"><Handshake className="w-8 h-8 text-accent" /> Partners</h1>
          <p className="text-muted-foreground">Manage strategic partners and collaborators.</p>
        </div>
        <Button onClick={() => openDialog()} className="rounded-xl px-6 bg-primary"><Plus className="w-4 h-4 mr-2" /> Add Partner</Button>
      </div>

      <Card className="border-none shadow-sm rounded-3xl">
        <CardContent className="p-6">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="w-[80px]">Order</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></TableCell></TableRow>
              ) : data.map((item) => (
                <TableRow key={item._id?.toString()}>
                  <TableCell className="font-mono text-xs">{item.order}</TableCell>
                  <TableCell>
                    <div className="relative w-12 h-8 bg-muted p-1 rounded">
                      <Image 
                        src={item.logo.url} 
                        alt={item.logo.alt || item.name} 
                        fill
                        className="object-contain" 
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">{item.name}</TableCell>
                  <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                  <TableCell>{item.isActive ? <Badge className="bg-emerald-500">Active</Badge> : <Badge variant="secondary">Hidden</Badge>}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openDialog(item)}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(item._id!.toString())}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&>button]:text-white [&>button]:top-6 [&>button]:right-6 [&>button]:opacity-100 [&>button]:hover:opacity-80">
          <form onSubmit={handleSave}>
            <DialogHeader className="p-6 bg-navy-950 text-white rounded-t-3xl">
              <DialogTitle>{editingItem?._id ? "Edit Partner" : "Add Partner"}</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Partner Name</Label>
                <Input value={editingItem?.name} onChange={e => setEditingItem({...editingItem!, name: e.target.value})} required className="rounded-xl h-11" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={editingItem?.category} onValueChange={v => setEditingItem({...editingItem!, category: v as any})}>
                  <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["strategic", "collaborator", "supporter", "sponsor"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={editingItem?.order} onChange={e => setEditingItem({...editingItem!, order: parseInt(e.target.value)})} className="rounded-xl h-11 w-32" />
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-dashed">
                <div className="space-y-0.5">
                  <Label>Active Status</Label>
                  <p className="text-xs text-muted-foreground">Show this partner on the website</p>
                </div>
                <Switch 
                  checked={editingItem?.isActive || false} 
                  onCheckedChange={checked => setEditingItem({...editingItem!, isActive: checked})} 
                />
              </div>
              <ImageUpload label="Partner Logo" value={editingItem?.logo?.url} onChange={url => setEditingItem({...editingItem!, logo: {url, alt: editingItem?.name || "Logo"}})} />
            </div>
            <DialogFooter className="p-6 border-t bg-muted/10 rounded-b-3xl">
              <Button type="submit" className="rounded-xl h-11 px-8" disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Partner"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
