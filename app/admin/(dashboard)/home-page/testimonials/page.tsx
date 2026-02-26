"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Star, Loader2, Edit, Trash2, ArrowLeft, Quote, UserCircle2 } from "lucide-react";
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

const PAGE_OPTIONS = [
  { value: "homepage", label: "Homepage – Trusted to Deliver" },
  { value: "simplified", label: "Mediation Simplified page" },
  { value: "both", label: "Both pages" },
];

const EMPTY_TESTIMONIAL: Partial<Testimonial> = {
  name: "",
  title: "",
  company: "",
  quote: "",
  rating: 5,
  image: { url: "", alt: "" },
  profileImage: { url: "", alt: "" },
  order: 1,
  isActive: true,
  page: "homepage",
};

export default function TestimonialsAdminPage() {
  const { token } = useAuth();
  const [data, setData] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/testimonials?admin=true");
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
            href="/admin/home-page"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Quote className="w-8 h-8 text-accent" />
            PACT Testimonials
          </h1>
          <p className="text-muted-foreground">
            Manage the &ldquo;Trusted to Deliver&rdquo; testimonials section — quotes, background images, and profile pictures.
          </p>
        </div>
        <Button onClick={() => openDialog()} className="w-full md:w-auto rounded-xl px-6 bg-primary">
          <Plus className="w-4 h-4 mr-2" /> Add Testimonial
        </Button>
      </div>

      {/* Table */}
      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Card Image</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Person</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
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
                    {/* Card background image */}
                    <TableCell>
                      <div className="relative w-16 h-10 bg-muted rounded-lg overflow-hidden">
                        {item.image?.url ? (
                          <Image
                            src={item.image.url}
                            alt={item.image.alt || "Card image"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-xs">
                            None
                          </div>
                        )}
                      </div>
                    </TableCell>
                    {/* Profile picture */}
                    <TableCell>
                      <div className="relative w-9 h-9 bg-muted rounded-full overflow-hidden">
                        {item.profileImage?.url ? (
                          <Image
                            src={item.profileImage.url}
                            alt={item.profileImage.alt || item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <UserCircle2 className="w-9 h-9 text-muted-foreground/40" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.title}</p>
                      <p className="text-xs text-accent font-semibold uppercase tracking-wide">{item.company}</p>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.quote}</p>
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
                      {item.isActive ? (
                        <Badge className="bg-emerald-500">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Hidden</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openDialog(item)}>
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
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&>button]:text-white [&>button]:top-6 [&>button]:right-6 [&>button]:opacity-100 [&>button]:hover:opacity-80">
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
                    placeholder="e.g. Sarah Johnson"
                    required
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title / Role *</Label>
                  <Input
                    value={editingItem?.title || ""}
                    onChange={(e) => setField("title", e.target.value)}
                    placeholder="e.g. Managing Partner"
                    required
                    className="rounded-xl h-11"
                  />
                </div>
              </div>

              {/* Company + Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company / Organisation *</Label>
                  <Input
                    value={editingItem?.company || ""}
                    onChange={(e) => setField("company", e.target.value)}
                    placeholder="e.g. Global Law Firm"
                    required
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
                  placeholder={"\"PACT's approach to mediation process design is revolutionary...\""}
                  required
                  className="rounded-xl min-h-[100px] resize-none"
                />
              </div>

              {/* Page + Order */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Appears On *</Label>
                  <select
                    value={editingItem?.page ?? "homepage"}
                    onChange={(e) => setField("page", e.target.value as any)}
                    className="w-full rounded-xl h-11 border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  >
                    {PAGE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={editingItem?.order ?? 1}
                    onChange={(e) => setField("order", parseInt(e.target.value))}
                    className="rounded-xl h-11"
                  />
                </div>
              </div>

              {/* Active toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingItem?.isActive ?? true}
                  onCheckedChange={(checked) => setField("isActive", checked)}
                />
                <Label>Active / Visible</Label>
              </div>

              {/* Card Background Image */}
              <ImageUpload
                label="Card Background Image"
                value={editingItem?.image?.url}
                onChange={(url) =>
                  setField("image", { url, alt: editingItem?.name || "Testimonial image" })
                }
              />

              {/* Profile Picture */}
              <ImageUpload
                label="Profile Picture"
                value={editingItem?.profileImage?.url}
                onChange={(url) =>
                  setField("profileImage", { url, alt: editingItem?.name || "Profile photo" })
                }
              />
            </div>

            <DialogFooter className="p-6 border-t bg-muted/10">
              <Button type="submit" className="rounded-xl h-11 px-8">
                Save Testimonial
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
