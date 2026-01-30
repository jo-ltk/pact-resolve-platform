"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Users, Loader2, Edit, Trash2 } from "lucide-react";
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
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { PanelMember } from "@/lib/db/schemas";

export default function PanelMembersAdminPage() {
  const { token } = useAuth();
  const [data, setData] = useState<PanelMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<PanelMember> | null>(null);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/panel-members?admin=true");
      const result = await res.json();
      if (result.success) setData(result.data || []);
    } catch (e) { toast.error("Fetch failed"); }
    finally { setIsLoading(false); }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/content/panel-members", {
        method: editingItem?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          ...editingItem,
          order: Number(editingItem?.order) || 0
        })
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Saved");
        setIsDialogOpen(false);
        fetchItems();
      }
    } catch (e) { toast.error("Save failed"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    try {
      const res = await fetch(`/api/content/panel-members?id=${id}`, {
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

  const openDialog = (item: Partial<PanelMember> = {}) => {
    setEditingItem({ name: "", role: "", order: data.length + 1, isActive: true, image: { url: "", alt: "" }, ...item });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><Users className="w-8 h-8 text-accent" /> Panel Members</h1>
          <p className="text-muted-foreground">Manage lead mediators and neutral panel members.</p>
        </div>
        <Button onClick={() => openDialog()} className="rounded-xl px-6 bg-primary"><Plus className="w-4 h-4 mr-2" /> Add Member</Button>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></TableCell></TableRow>
              ) : data.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No members found.</TableCell></TableRow>
              ) : data.map((item) => (
                <TableRow key={item._id?.toString()} className="group">
                  <TableCell>
                    <div className="relative w-10 h-10 bg-muted rounded-full overflow-hidden">
                      <Image 
                        src={item.image.url} 
                        alt={item.image.alt || item.name} 
                        fill
                        className="object-cover" 
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">{item.name}</TableCell>
                  <TableCell className="text-sm">{item.role}</TableCell>
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
              <DialogTitle>{editingItem?._id ? "Edit Member" : "Add Member"}</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Full Name</Label><Input value={editingItem?.name || ""} onChange={e => setEditingItem({...editingItem!, name: e.target.value})} required className="rounded-xl h-11" /></div>
                <div className="space-y-2"><Label>Professional Role</Label><Input value={editingItem?.role || ""} onChange={e => setEditingItem({...editingItem!, role: e.target.value})} required className="rounded-xl h-11" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={editingItem?.order || 0} onChange={e => setEditingItem({...editingItem!, order: parseInt(e.target.value)})} required className="rounded-xl h-11" /></div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch checked={editingItem?.isActive || false} onCheckedChange={checked => setEditingItem({...editingItem!, isActive: checked})} />
                  <Label>Active Status</Label>
                </div>
              </div>
              <div className="space-y-2"><Label>Profile URL (Optional)</Label><Input value={editingItem?.profileUrl || ""} onChange={e => setEditingItem({...editingItem!, profileUrl: e.target.value})} placeholder="https://linkedin.com/in/..." className="rounded-xl h-11" /></div>
              <div className="space-y-2"><Label>Bio (Optional)</Label><Textarea value={editingItem?.bio || ""} onChange={e => setEditingItem({...editingItem!, bio: e.target.value})} className="rounded-xl min-h-[100px] resize-none" /></div>
              <ImageUpload label="Profile Photo" value={editingItem?.image?.url} onChange={url => setEditingItem({...editingItem!, image: {url, alt: editingItem?.name || "Member Photo"}})} />
            </div>
            <DialogFooter className="p-6 border-t bg-muted/10">
              <Button type="submit" className="rounded-xl h-11 px-8">Save Member</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
