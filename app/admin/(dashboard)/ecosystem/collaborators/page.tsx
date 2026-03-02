"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Handshake,
  Loader2,
  ArrowLeft,
  Image as ImageIcon,
  Globe,
  Database,
  Sparkles
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
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/lib/context/AuthContext";
import { type EcosystemPartner, type EcosystemPartnerCategory } from "@/lib/db/schemas";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { motion } from "framer-motion";

const SECTIONS: { category: EcosystemPartnerCategory; label: string; description: string }[] = [
  { 
    category: "strategic", 
    label: "Strategic Partnerships", 
    description: "Key global and regional institutional partners." 
  },
  { 
    category: "practice", 
    label: "Collaborators-in-Practice", 
    description: "Law firms and corporate organisations working on initiatives." 
  },
  { 
    category: "academic", 
    label: "Academic Associates", 
    description: "Current university and law school partnerships." 
  },
  { 
    category: "older", 
    label: "Older Associations", 
    description: "Past academic and institutional collaborations." 
  },
  { 
    category: "mission", 
    label: "Mission Mediation Alliances", 
    description: "Advocacy and training alliances (mentoring partners)." 
  },
  { 
    category: "supporter", 
    label: "Supporting Organisations", 
    description: "Specialised mediation and ADR support institutions." 
  }
];

export default function EcosystemPartnersAdminPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<EcosystemPartner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<EcosystemPartner> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/content/ecosystem/partners?all=true");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      if (result.success) setItems(result.data || []);
    } catch (error) { 
      console.error(error);
      toast.error("Failed to fetch partners"); 
    }
    finally { setIsLoading(false); }
  }

  const handleSeed = async () => {
    if (!confirm("This will replace all current partners with fallback dummy data. Continue?")) return;
    setIsSeeding(true);
    try {
      const response = await fetch("/api/content/ecosystem/seed", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Database seeded with dummy logos");
        fetchItems();
      }
    } catch (e) { toast.error("Seed failed"); }
    finally { setIsSeeding(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = editingItem?._id ? "PUT" : "POST";
      const response = await fetch("/api/content/ecosystem/partners", {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(editingItem)
      });
      const result = await response.json();
      if (result.success) {
        toast.success(editingItem?._id ? "Partner updated" : "Partner created");
        setIsDialogOpen(false);
        fetchItems();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch (error) { toast.error("Save failed"); }
    finally { setIsSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/content/ecosystem/partners?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      setItems(items.filter(i => (i._id as any).toString() !== id));
      toast.success("Deleted");
    } catch (e) { toast.error("Delete failed"); }
  };

  const openCreateDialog = (category: EcosystemPartnerCategory) => {
    setEditingItem({ 
      name: "", 
      category, 
      logo: "", 
      region: "", 
      description: "", 
      websiteUrl: "",
      order: items.filter(i => i.category === category).length + 1, 
      isActive: true 
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-12 pb-24 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <Link href="/admin/ecosystem" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Ecosystem
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20 shadow-inner">
              <Handshake className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-navy-950 tracking-tight">Collaborators & Partners</h1>
              <p className="text-navy-950/40 text-sm font-medium uppercase tracking-widest mt-1">Manage institutional and practice partnerships</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <Button 
                variant="outline" 
                onClick={handleSeed} 
                disabled={isSeeding}
                className="rounded-2xl h-12 px-6 border-dashed border-navy-200 text-navy-400 hover:text-navy-600 hover:bg-navy-50"
            >
                {isSeeding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Database className="w-4 h-4 mr-2" />}
                Seed Dummy Content
            </Button>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 gap-12">
        {SECTIONS.map((section) => (
          <div key={section.category} className="space-y-6">
            <div className="flex items-center justify-between border-b border-navy-50 pb-4">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-light text-navy-950 uppercase tracking-tight flex items-center gap-3">
                  {section.label.split(' ')[0]} <span className="font-bold text-navy-950">{section.label.split(' ').slice(1).join(' ')}</span>
                  <Badge variant="outline" className="text-[10px] font-black tracking-[0.2em] py-0 bg-gold-500/5 text-gold-600 border-gold-500/20">{items.filter(i => i.category === section.category).length}</Badge>
                </h2>
                <p className="text-navy-950/40 text-[10px] font-black uppercase tracking-[0.2em]">{section.description}</p>
              </div>
              <Button 
                onClick={() => openCreateDialog(section.category)} 
                variant="ghost"
                className="rounded-xl h-10 px-4 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-bold"
              >
                <Plus className="w-4 h-4 mr-2" /> Add {section.category === 'academic' ? 'University' : 'Partner'}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 rounded-3xl" />
                ))
              ) : items.filter(i => i.category === section.category).length === 0 ? (
                <div 
                    onClick={() => openCreateDialog(section.category)}
                    className="col-span-full h-32 rounded-3xl border-2 border-dashed border-navy-50 flex flex-col items-center justify-center gap-2 text-navy-950/20 hover:border-emerald-200 hover:text-emerald-300 transition-all cursor-pointer group"
                >
                    <ImageIcon className="w-8 h-8 opacity-50 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Add First Entry</span>
                </div>
              ) : (
                items
                  .filter(i => i.category === section.category)
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={(item._id as any).toString()} 
                        className="group relative bg-white p-6 rounded-3xl border border-navy-50 shadow-sm hover:shadow-xl hover:shadow-navy-950/5 transition-all duration-500 overflow-hidden"
                    >
                        {!item.isActive && (
                            <div className="absolute top-3 left-3 z-10">
                                <Badge variant="secondary" className="bg-navy-950 text-white text-[8px] font-black tracking-widest px-2 py-0 border-none">HIDDEN</Badge>
                            </div>
                        )}
                        
                        <div className="h-24 w-full relative mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                             {item.logo ? (
                                <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center bg-navy-50 rounded-2xl">
                                    <ImageIcon className="w-8 h-8 text-navy-200" />
                                </div>
                             )}
                        </div>
                        
                        <div className="space-y-1">
                            <h4 className="font-bold text-navy-950 text-xs truncate uppercase tracking-tight">{item.name}</h4>
                            <p className="text-[10px] text-navy-950/30 truncate italic">{item.region || "No Region"}</p>
                        </div>

                        {/* Actions Overlay */}
                        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-10 group-hover:opacity-100 transition-opacity">
                            <Button 
                                variant="secondary" 
                                size="icon" 
                                onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}
                                className="h-8 w-8 rounded-full shadow-lg bg-white/90 backdrop-blur"
                            >
                                <Edit className="w-3.5 h-3.5" />
                            </Button>
                            <Button 
                                variant="destructive" 
                                size="icon" 
                                onClick={() => handleDelete((item._id as any).toString())}
                                className="h-8 w-8 rounded-full shadow-lg"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-navy-100/20">
                            <div className="h-full bg-emerald-500/30 transition-all duration-700 w-0 group-hover:w-full" />
                        </div>
                    </motion.div>
                  ))
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] sm:max-w-2xl bg-white rounded-3xl sm:rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] flex flex-col">
          <form onSubmit={handleSave} className="flex flex-col h-full overflow-hidden">
            <DialogHeader className="p-6 sm:p-10 pb-4 shrink-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-50/50 uppercase font-black text-[8px] sm:text-[10px] tracking-widest">{editingItem?.category}</Badge>
                {editingItem?._id && <Badge variant="secondary" className="text-[8px] sm:text-[10px] uppercase font-black tracking-widest">Editing Entry</Badge>}
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
                {editingItem?._id ? "Review Entry" : "Create New Resource"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-4 sm:py-6 space-y-6 sm:space-y-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-black text-navy-950/30 ml-1">Entity Name</Label>
                  <Input 
                    value={editingItem?.name || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, name: e.target.value }))} 
                    className="h-12 sm:h-14 rounded-2xl bg-navy-50/30 border-navy-50/50 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/30 font-bold"
                    placeholder="e.g. Maxwell Mediators"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-black text-navy-950/30 ml-1">Region / Tag</Label>
                  <Input 
                    value={editingItem?.region || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, region: e.target.value }))} 
                    className="h-12 sm:h-14 rounded-2xl bg-navy-50/30 border-navy-50/50 focus-visible:ring-emerald-500/20 font-medium"
                    placeholder="e.g. Singapore / Asia Pacific"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-black text-navy-950/30 ml-1">About the Partnership</Label>
                <Textarea 
                  value={editingItem?.description || ""} 
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))} 
                  className="min-h-[100px] sm:min-h-[120px] rounded-2xl bg-navy-50/30 border-navy-50/50 focus-visible:ring-emerald-500/20 resize-none p-4 sm:p-5 text-sm font-medium leading-relaxed"
                  placeholder="Describe the nature of this collaboration..."
                />
              </div>

              <div className="space-y-2">
                <ImageUpload
                  label="Official Logo"
                  description="Transparent PNG preferred for best results"
                  value={editingItem?.logo || ""}
                  onChange={(url) => setEditingItem(prev => ({ ...prev!, logo: url }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 pt-4 sm:pt-6 border-t border-navy-50">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-black text-navy-950/30 ml-1">Sequence Order</Label>
                  <Input 
                    type="number" 
                    value={editingItem?.order || 0} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) }))} 
                    className="h-10 sm:h-12 rounded-2xl bg-navy-50/30 border-navy-50/50"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-6 h-10 sm:h-12 rounded-2xl bg-navy-50/30 sm:mt-6 border border-transparent hover:border-navy-100 transition-colors">
                  <Label className="text-[10px] font-black text-navy-950/40 uppercase tracking-widest cursor-pointer" htmlFor="status-toggle">Visible to Public</Label>
                  <Switch 
                    id="status-toggle"
                    checked={editingItem?.isActive || false} 
                    onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))} 
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="p-6 sm:p-10 pt-4 bg-navy-50/20 shrink-0 flex-row justify-between gap-4">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-2xl h-12 sm:h-14 px-4 sm:px-8 font-bold text-navy-950">
                Discard
              </Button>
              <Button type="submit" disabled={isSaving} className="rounded-2xl h-12 sm:h-14 px-6 sm:px-12 bg-navy-950 hover:bg-black text-white font-bold transition-all shadow-xl hover:translate-y-[-2px] active:translate-y-0 text-sm sm:text-base">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editingItem?._id ? "Update Member" : "Commit to Database"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
