"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Star, Loader2, Edit, Trash2, ArrowLeft, Quote, UserCircle2, BookOpen } from "lucide-react";
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
import { Testimonial } from "@/lib/db/schemas";

const EMPTY_TESTIMONIAL: Partial<Testimonial> = {
  name: "",
  title: "",
  company: "",
  quote: "",
  rating: 5,
  image: { url: "", alt: "" },
  profileImage: { url: "", alt: "" },
  page: "simplified",
  order: 1,
  isActive: true,
};

export default function SimplifiedTestimonialsAdminPage() {
  const { token } = useAuth();
  const [data, setData] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/testimonials?admin=true&page=simplified");
      const result = await res.json();
      if (result.success) setData(result.data || []);
    } catch {
      toast.error("Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/content/testimonials", {
        method: editingItem?._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editingItem,
          rating: Number(editingItem?.rating) || 5,
          order: Number(editingItem?.order) || 1,
          page: "simplified"
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Testimonial saved");
        setIsDialogOpen(false);
        fetchItems();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/content/testimonials?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Deleted");
        fetchItems();
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const openDialog = (item: Partial<Testimonial> = {}) => {
    setEditingItem({
      ...EMPTY_TESTIMONIAL,
      order: data.length + 1,
      ...item,
    });
    setIsDialogOpen(true);
  };

  const setField = <K extends keyof Testimonial>(key: K, value: Testimonial[K]) => {
    setEditingItem((prev) => ({ ...prev!, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link
            href="/admin/resources"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Resources
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-navy-950">
            <BookOpen className="w-8 h-8 text-amber-500" />
            Mediation Simplified Testimonials
          </h1>
          <p className="text-muted-foreground">
            Manage testimonials specifically for the Mediation Simplified workbook page.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            onClick={async () => {
              if(!confirm("Restore default testimonials? This won't delete existing ones unless you use force.")) return;
              const res = await fetch("/api/content/testimonials/seed", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
              const result = await res.json();
              if (result.success) {
                toast.success(result.message);
                fetchItems();
              } else {
                toast.error(result.error);
              }
            }}
            className="rounded-xl px-6"
          >
            Restore Defaults
          </Button>
          <Button onClick={() => openDialog()} className="rounded-xl px-6 bg-amber-600 hover:bg-amber-700">
            <Plus className="w-4 h-4 mr-2" /> Add Testimonial
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Person & Role</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-600" />
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No testimonials yet. Click &ldquo;Add Testimonial&rdquo; to get started.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item._id?.toString()} className="group">
                    {/* Profile picture */}
                    <TableCell>
                      <div className="relative w-12 h-12 bg-muted rounded-full overflow-hidden border-2 border-amber-100">
                        {item.profileImage?.url ? (
                          <Image
                            src={item.profileImage.url}
                            alt={item.profileImage.alt || item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <UserCircle2 className="w-full h-full text-muted-foreground/40" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-sm text-navy-950">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.title}</p>
                      {item.company && <p className="text-xs text-amber-600 font-medium">{item.company}</p>}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-muted-foreground line-clamp-2 italic">&ldquo;{item.quote}&rdquo;</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < (item.rating || 5) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm font-medium">{item.order}</span>
                    </TableCell>
                    <TableCell>
                      {item.isActive ? (
                        <Badge className="bg-emerald-500">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Hidden</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openDialog(item)} className="hover:bg-amber-50 hover:text-amber-600">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(item._id!.toString())}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-0">
          <form onSubmit={handleSave}>
            <DialogHeader className="p-6 bg-navy-950 text-white rounded-t-3xl">
              <DialogTitle>
                {editingItem?._id ? "Edit Testimonial" : "Add Testimonial"}
              </DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-5">
              {/* Name + Title */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={editingItem?.name || ""}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="e.g. Justice Kurian Joseph"
                    required
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role / Title *</Label>
                  <Input
                    value={editingItem?.title || ""}
                    onChange={(e) => setField("title", e.target.value)}
                    placeholder="e.g. Former Judge, Supreme Court"
                    required
                    className="rounded-xl h-11"
                  />
                </div>
              </div>

              {/* Company + Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company/Org (Optional)</Label>
                  <Input
                    value={editingItem?.company || ""}
                    onChange={(e) => setField("company", e.target.value)}
                    placeholder="e.g. Supreme Court of India"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Star Rating (1–5)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={editingItem?.rating ?? 5}
                    onChange={(e) => setField("rating", parseInt(e.target.value))}
                    required
                    className="rounded-xl h-11"
                  />
                </div>
              </div>

              {/* Quote */}
              <div className="space-y-2">
                <Label>Testimonial Quote *</Label>
                <Textarea
                  value={editingItem?.quote || ""}
                  onChange={(e) => setField("quote", e.target.value)}
                  placeholder="&ldquo;An exceptional resource that bridges theory and practice...&rdquo;"
                  required
                  className="rounded-xl min-h-[100px] resize-none"
                />
              </div>

              {/* Order + Active */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={editingItem?.order ?? 1}
                    onChange={(e) => setField("order", parseInt(e.target.value))}
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    checked={editingItem?.isActive ?? true}
                    onCheckedChange={(checked) => setField("isActive", checked)}
                  />
                  <Label>Active / Visible</Label>
                </div>
              </div>

              {/* Profile Picture */}
              <ImageUpload
                label="Profile Picture"
                value={editingItem?.profileImage?.url}
                onChange={(url) =>
                  setField("profileImage", { url, alt: editingItem?.name || "Profile photo" })
                }
              />
              
              <p className="text-xs text-muted-foreground bg-amber-50 p-3 rounded-lg border border-amber-100">
                <strong>Note:</strong> Mediation Simplified testimonials only use the Profile Picture. The card background image is not used in this layout.
              </p>
            </div>

            <DialogFooter className="p-6 border-t bg-muted/10">
              <Button type="submit" className="rounded-xl h-11 px-8 bg-amber-600 hover:bg-amber-700">
                Save Testimonial
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
