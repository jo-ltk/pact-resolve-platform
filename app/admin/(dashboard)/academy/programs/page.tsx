"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  MoreHorizontal,
  GraduationCap,
  Loader2,
  ArrowLeft,
  Scale,
  Handshake,
  MessageSquare,
  Image as ImageIcon,
  Link as LinkIcon,
  Layers,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/context/AuthContext";
import { AcademyProgramCard } from "@/lib/db/schemas";

const ICON_OPTIONS = [
  { value: "Scale", label: "Scale (Arbitration)" },
  { value: "Handshake", label: "Handshake (Mediation)" },
  { value: "MessageSquare", label: "MessageSquare (Negotiation)" },
  { value: "GraduationCap", label: "GraduationCap" },
  { value: "Layers", label: "Layers" },
];

function ProgramIcon({ name, className }: { name: string; className?: string }) {
  const props = { className: className || "w-6 h-6" };
  switch (name) {
    case "Scale": return <Scale {...props} />;
    case "Handshake": return <Handshake {...props} />;
    case "MessageSquare": return <MessageSquare {...props} />;
    case "GraduationCap": return <GraduationCap {...props} />;
    case "Layers": return <Layers {...props} />;
    default: return <GraduationCap {...props} />;
  }
}

const BLANK_ITEM: Partial<AcademyProgramCard> = {
  cardId: "01",
  title: "",
  subtitle: "",
  description: "",
  href: "",
  iconName: "Scale",
  imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
  color: "from-amber-500/20 to-orange-500/20",
  order: 1,
  isActive: true,
};

export default function AcademyProgramsPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<AcademyProgramCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<AcademyProgramCard> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/content/academy/programs?all=true&t=${Date.now()}`);
      const result = await res.json();
      if (result.success) setItems(result.data || []);
      else toast.error(result.error || "Failed to fetch programs");
    } catch {
      toast.error("An error occurred while fetching programs");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSeedDefaults() {
    if (!confirm("This will insert the 3 default program cards (Arbitration, Mediation, Negotiation). Continue?")) return;
    setIsSeeding(true);
    const defaults: Omit<AcademyProgramCard, "_id" | "createdAt" | "updatedAt">[] = [
      {
        cardId: "01", order: 1, title: "Arbitration", subtitle: "Dispute Resolution",
        description: "In-depth courses on the arbitration lifecycle, rules, and advocacy for both domestic and international dispute forums.",
        href: "/academy/arbitration", iconName: "Scale",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
        color: "from-amber-500/20 to-orange-500/20", isActive: true,
      },
      {
        cardId: "02", order: 2, title: "Mediation", subtitle: "Advocacy & Certification",
        description: "Comprehensive training in mediation advocacy and neutral facilitation, bridging theoretical frameworks with real-world application.",
        href: "/academy/mediation", iconName: "Handshake",
        imageUrl: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?auto=format&fit=crop&q=80",
        color: "from-blue-500/20 to-indigo-500/20", isActive: true,
      },
      {
        cardId: "03", order: 3, title: "Negotiation", subtitle: "Strategic Skills",
        description: "Master the psychology and strategy of successful deal-making and conflict resolution in high-stakes environments.",
        href: "/academy/negotiation", iconName: "MessageSquare",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80",
        color: "from-rose-500/20 to-pink-500/20", isActive: true,
      },
    ];
    try {
      for (const d of defaults) {
        await fetch("/api/content/academy/programs", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(d),
        });
      }
      toast.success("3 default program cards seeded!");
      fetchItems();
    } catch {
      toast.error("Seeding failed");
    } finally {
      setIsSeeding(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this program card?")) return;
    try {
      const res = await fetch(`/api/content/academy/programs?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Deleted");
        setItems(items.filter((i) => (i._id as any).toString() !== id));
      } else toast.error(result.error || "Delete failed");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleToggleActive = async (item: AcademyProgramCard) => {
    try {
      const res = await fetch("/api/content/academy/programs", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ ...item, _id: (item._id as any).toString(), isActive: !item.isActive }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(item.isActive ? "Hidden on frontend" : "Now visible on frontend");
        fetchItems();
      } else toast.error(result.error);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = editingItem?._id ? "PUT" : "POST";
      const body = editingItem?._id
        ? { ...editingItem, _id: (editingItem._id as any).toString() }
        : editingItem;

      const res = await fetch("/api/content/academy/programs", {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(editingItem?._id ? "Updated!" : "Created!");
        setIsDialogOpen(false);
        fetchItems();
      } else toast.error(result.error);
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const openCreate = () => {
    setEditingItem({ ...BLANK_ITEM, order: items.length + 1, cardId: String(items.length + 1).padStart(2, "0") });
    setIsDialogOpen(true);
  };

  const openEdit = (item: AcademyProgramCard) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-3">
          <Link
            href="/admin/academy"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Academy
          </Link>
          <h1 className="text-3xl font-bold text-navy-950 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-accent" />
            Program Cards
          </h1>
          <p className="text-muted-foreground">
            Manage the three program tiles shown on the <strong>/academy</strong> landing page (Arbitration, Mediation, Negotiation).
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {items.length === 0 && (
            <Button
              variant="outline"
              onClick={handleSeedDefaults}
              disabled={isSeeding}
              className="rounded-xl"
            >
              {isSeeding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Seed Defaults
            </Button>
          )}
          <Button
            onClick={openCreate}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="rounded-3xl overflow-hidden border-none shadow-sm">
                <Skeleton className="h-64 w-full" />
              </Card>
            ))
          : items.length === 0
          ? (
              <div className="col-span-3 rounded-3xl border-2 border-dashed border-navy-100 bg-white/50 flex flex-col items-center justify-center min-h-[250px] gap-4">
                <GraduationCap className="w-12 h-12 text-navy-200" />
                <p className="text-navy-950/40 font-medium">No program cards yet</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleSeedDefaults} disabled={isSeeding}>
                    {isSeeding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Seed Defaults
                  </Button>
                  <Button onClick={openCreate}>Add Card</Button>
                </div>
              </div>
            )
          : items.map((item) => (
              <Card
                key={(item._id as any).toString()}
                className="group relative hover:shadow-2xl transition-all duration-500 rounded-3xl border-none shadow-sm overflow-hidden bg-white"
              >
                {/* Preview image strip */}
                {item.imageUrl && (
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent" />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/80 backdrop-blur flex items-center justify-center text-accent shadow">
                      <ProgramIcon name={item.iconName} className="w-5 h-5" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-xs uppercase font-bold border-none px-3">
                        {item.isActive ? "Visible" : "Hidden"}
                      </Badge>
                    </div>
                  </div>
                )}

                <CardHeader className="pt-3 pb-2 px-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-navy-950/30 font-black uppercase tracking-widest">{item.subtitle}</p>
                      <h3 className="text-lg font-bold text-navy-950 uppercase italic leading-tight">{item.title}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full shrink-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem onClick={() => openEdit(item)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(item)}>
                          {item.isActive ? "Hide from frontend" : "Show on frontend"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete((item._id as any).toString())}
                          className="text-red-500"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="px-5 pb-5 space-y-3">
                  <p className="text-sm text-navy-950/60 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs text-navy-950/40">
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span className="font-mono truncate">{item.href}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg h-8 text-xs"
                      onClick={() => openEdit(item)}
                    >
                      Edit Card
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-lg h-8 text-xs"
                      onClick={() => handleToggleActive(item)}
                    >
                      {item.isActive ? <EyeOff className="w-3.5 h-3.5 mr-1" /> : <Eye className="w-3.5 h-3.5 mr-1" />}
                      {item.isActive ? "Hide" : "Show"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Edit / Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[95vh] p-0 border-none shadow-2xl rounded-4xl overflow-hidden bg-white flex flex-col">
          <form onSubmit={handleSave} className="flex flex-col h-full overflow-hidden">
            <DialogHeader className="p-8 bg-navy-950 text-white shrink-0">
              <DialogTitle className="text-2xl font-bold">
                {editingItem?._id ? "Edit Program Card" : "Add Program Card"}
              </DialogTitle>
              <DialogDescription className="text-blue-100">
                This card appears on the /academy landing page.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-8 space-y-5 scrollbar-thin">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Card ID (e.g. "01")</Label>
                  <Input
                    value={editingItem?.cardId || ""}
                    onChange={(e) => setEditingItem((p) => ({ ...p!, cardId: e.target.value }))}
                    placeholder="01"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={editingItem?.order || 1}
                    onChange={(e) => setEditingItem((p) => ({ ...p!, order: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Program Title</Label>
                <Input
                  value={editingItem?.title || ""}
                  onChange={(e) => setEditingItem((p) => ({ ...p!, title: e.target.value }))}
                  placeholder="e.g. Arbitration"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Category Subtitle</Label>
                <Input
                  value={editingItem?.subtitle || ""}
                  onChange={(e) => setEditingItem((p) => ({ ...p!, subtitle: e.target.value }))}
                  placeholder="e.g. Dispute Resolution"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editingItem?.description || ""}
                  onChange={(e) => setEditingItem((p) => ({ ...p!, description: e.target.value }))}
                  placeholder="Short description shown on the card..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Link (href)</Label>
                  <Input
                    value={editingItem?.href || ""}
                    onChange={(e) => setEditingItem((p) => ({ ...p!, href: e.target.value }))}
                    placeholder="/academy/arbitration"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon Name</Label>
                  <select
                    className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm"
                    value={editingItem?.iconName || "Scale"}
                    onChange={(e) => setEditingItem((p) => ({ ...p!, iconName: e.target.value }))}
                  >
                    {ICON_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Background Image URL</Label>
                <Input
                  value={editingItem?.imageUrl || ""}
                  onChange={(e) => setEditingItem((p) => ({ ...p!, imageUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                />
                {editingItem?.imageUrl && (
                  <div className="h-24 rounded-xl overflow-hidden mt-2 border border-navy-100">
                    <img src={editingItem.imageUrl} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Color Gradient (Tailwind classes)</Label>
                <Input
                  value={editingItem?.color || ""}
                  onChange={(e) => setEditingItem((p) => ({ ...p!, color: e.target.value }))}
                  placeholder="from-amber-500/20 to-orange-500/20"
                />
                <p className="text-xs text-muted-foreground">Used for the hover overlay effect on the card.</p>
              </div>

              <div className="flex items-center gap-4 border p-4 rounded-xl">
                <div className="flex-1">
                  <Label className="block mb-1">Visible on Frontend</Label>
                  <p className="text-xs text-muted-foreground">Show this card on /academy page</p>
                </div>
                <Switch
                  checked={editingItem?.isActive ?? true}
                  onCheckedChange={(val) => setEditingItem((p) => ({ ...p!, isActive: val }))}
                />
              </div>
            </div>

            <DialogFooter className="p-8 border-t bg-gray-50/80 shrink-0">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-navy-950 text-white" disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingItem?._id ? "Update Card" : "Create Card"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
