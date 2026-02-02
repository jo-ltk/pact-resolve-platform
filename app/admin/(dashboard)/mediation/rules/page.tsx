"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ShieldCheck,
  Loader2,
  ArrowLeft
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
import { MediationRule } from "@/lib/db/schemas";

export default function RulesAdminPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<MediationRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MediationRule> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/content/mediation/rules?all=true");
      const result = await response.json();
      if (result.success) setItems(result.data || []);
    } catch (error) { toast.error("Fetch failed"); }
    finally { setIsLoading(false); }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/content/mediation/rules?id=${id}`, {
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
      const response = await fetch("/api/content/mediation/rules", {
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
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <Link href="/admin/mediation" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-navy-950 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-accent" />
            Mediation Rules
          </h1>
        </div>
        <Button onClick={openCreateDialog} className="rounded-xl"><Plus className="w-4 h-4 mr-2" /> Add Rule</Button>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Order</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="text-right w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}><TableCell colSpan={5}><Skeleton className="h-10 w-full" /></TableCell></TableRow>
                ))
              ) : items.map((item) => (
                <TableRow key={(item._id as any).toString()}>
                  <TableCell>{item.order}</TableCell>
                  <TableCell className="font-semibold">{item.title}</TableCell>
                  <TableCell className="text-muted-foreground truncate max-w-xs">{item.description}</TableCell>
                  <TableCell><Badge variant={item.isActive ? "success" : "secondary"}>{item.isActive ? "Active" : "Hidden"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete((item._id as any).toString())} className="text-red-500">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <form onSubmit={handleSave} className="space-y-6">
            <DialogHeader>
              <DialogTitle>{editingItem?._id ? "Edit Rule" : "Create Rule"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={editingItem?.title || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))} required />
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
