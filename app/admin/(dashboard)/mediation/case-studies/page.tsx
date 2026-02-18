"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Briefcase,
  Loader2,
  Filter,
  ArrowLeft,
  Star,
  ExternalLink,
  PlusCircle,
  X
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { MediationCaseStudy } from "@/lib/db/schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CaseStudiesAdminPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<MediationCaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MediationCaseStudy> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/content/mediation/case-studies?all=true");
      const result = await response.json();
      if (result.success) {
        setItems(result.data || []);
      } else {
        toast.error(result.error || "Failed to fetch items");
      }
    } catch (error) {
      toast.error("An error occurred while fetching items");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    try {
      const response = await fetch(`/api/content/mediation/case-studies?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Deleted successfully");
        setItems(items.filter(i => (i._id as any).toString() !== id));
      } else {
        toast.error(result.error || "Failed to delete");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const method = editingItem?._id ? "PUT" : "POST";
      const response = await fetch("/api/content/mediation/case-studies", {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editingItem)
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success(editingItem?._id ? "Updated successfully" : "Created successfully");
        setIsDialogOpen(false);
        fetchItems();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const openCreateDialog = () => {
    setEditingItem({
      title: "",
      summary: "",
      image: "",
      challenge: [""],
      solution: "",
      costs: { hours: 0, weeks: 0, fees: "", value: "" },
      iconName: "Briefcase",
      order: items.length + 1,
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: MediationCaseStudy) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const filteredItems = items.filter(i => 
    i.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link href="/admin/mediation" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-navy-950 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-accent" />
            Case Studies Management
          </h1>
          <p className="text-muted-foreground">Manage confidential professional success stories and metrics.</p>
        </div>
        <Button 
          onClick={openCreateDialog}
          className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Case Study
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-80 rounded-4xl overflow-hidden border-none shadow-sm">
              <Skeleton className="h-full w-full" />
            </Card>
          ))
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-navy-100">
            <Briefcase className="w-12 h-12 text-navy-200 mx-auto mb-4" />
            <p className="text-navy-950/40 font-medium">No case studies found. Create your first success story.</p>
          </div>
        ) : filteredItems.map((item) => (
          <Card key={(item._id as any).toString()} className="group hover:shadow-2xl transition-all duration-700 rounded-4xl border-none shadow-sm overflow-hidden bg-white flex flex-col relative">
            <div className="relative aspect-square overflow-hidden shrink-0">
               {item.image ? (
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
               ) : (
                  <div className="w-full h-full bg-navy-50 flex items-center justify-center">
                     <Briefcase className="w-12 h-12 text-navy-200" />
                  </div>
               )}
               <div className="absolute inset-0 bg-navy-950/40 group-hover:bg-navy-950/60 transition-colors" />
               
               <div className="absolute top-4 right-4 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem onClick={() => openEditDialog(item)}>Edit Case</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete((item._id as any).toString())} className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
               </div>

               <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
                  <div className="flex items-center gap-3 mb-2">
                     <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-xs uppercase font-bold border-none px-3">{item.isActive ? "Active" : "Hidden"}</Badge>
                     <span className="font-mono text-xs text-white/60 uppercase">Order #{item.order}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase italic tracking-tight group-hover:text-accent transition-colors">{item.title}</h3>
               </div>
            </div>
            <CardContent className="p-6 grow flex flex-col bg-white">
               <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                     <p className="text-xs text-navy-950/40 font-bold uppercase tracking-widest">Dispute Value</p>
                     <p className="text-sm font-semibold text-accent">{item.costs?.value || "N/A"}</p>
                  </div>
                  <div className="space-y-1 text-right">
                     <p className="text-xs text-navy-950/40 font-bold uppercase tracking-widest">Fees</p>
                     <p className="text-sm font-semibold text-navy-950">₹{item.costs?.fees || "N/A"}</p>
                  </div>
               </div>
               <p className="text-xs text-navy-950/50 line-clamp-2 italic font-light leading-relaxed">"{item.summary}"</p>
               <div className="mt-4 pt-4 border-t border-navy-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="flex flex-col">
                        <span className="text-[9px] text-navy-400 uppercase font-bold tracking-tighter leading-none">Weeks</span>
                        <span className="text-xs font-bold text-navy-900">{item.costs?.weeks}</span>
                     </div>
                     <div className="w-px h-6 bg-navy-100" />
                     <div className="flex flex-col">
                        <span className="text-[9px] text-navy-400 uppercase font-bold tracking-tighter leading-none">Hours</span>
                        <span className="text-xs font-bold text-navy-900">{item.costs?.hours}</span>
                     </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs uppercase font-bold rounded-lg border-navy-100" onClick={() => openEditDialog(item)}>
                     View Details <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[95vh] p-0 border-none shadow-2xl rounded-4xl overflow-hidden bg-white flex flex-col">
          <form onSubmit={handleSave} className="flex flex-col h-full overflow-hidden">
            <DialogHeader className="p-8 bg-navy-950 text-white shrink-0">
              <DialogTitle className="text-2xl font-bold">
                {editingItem?._id ? "Edit Case Study" : "Create Case Study"}
              </DialogTitle>
              <DialogDescription className="text-blue-100">
                Detailed metrics and resolution highlights for confidential case studies.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input 
                      value={editingItem?.title || ""} 
                      onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))}
                      placeholder="e.g. Contractual Dispute"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <Select 
                      value={editingItem?.iconName} 
                      onValueChange={(val) => setEditingItem(prev => ({ ...prev!, iconName: val }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Briefcase">Briefcase</SelectItem>
                        <SelectItem value="MessageSquare">MessageSquare</SelectItem>
                        <SelectItem value="Building2">Building2</SelectItem>
                        <SelectItem value="ShieldCheck">ShieldCheck</SelectItem>
                        <SelectItem value="Scale">Scale</SelectItem>
                        <SelectItem value="Home">Home</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Display Order</Label>
                    <Input 
                      type="number"
                      value={editingItem?.order || 0}
                      onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="flex items-center gap-4 border p-4 rounded-xl">
                    <div className="flex-1">
                      <Label className="block mb-1">Status</Label>
                      <p className="text-xs text-muted-foreground">Visible on frontend</p>
                    </div>
                    <Switch 
                      checked={editingItem?.isActive || false}
                      onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <ImageUpload 
                    label="Cover Image"
                    value={editingItem?.image}
                    onChange={(url) => setEditingItem(prev => ({ ...prev!, image: url }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Summary (Intro Text)</Label>
                <Textarea 
                  value={editingItem?.summary || ""}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, summary: e.target.value }))}
                  className="min-h-[120px]"
                  placeholder="[Circa: 2022, New Delhi] A commercial dispute..."
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Key Challenges</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="h-8 rounded-lg"
                    onClick={() => setEditingItem(prev => ({ ...prev!, challenge: [...(prev!.challenge || []), ""] }))}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Challenge
                  </Button>
                </div>
                <div className="space-y-3">
                  {editingItem?.challenge?.map((ch, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input 
                        value={ch} 
                        onChange={(e) => {
                          const newCh = [...editingItem.challenge!];
                          newCh[idx] = e.target.value;
                          setEditingItem(prev => ({ ...prev!, challenge: newCh }));
                        }}
                        placeholder={`Challenge ${idx + 1}`}
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          const newCh = editingItem.challenge!.filter((_, i) => i !== idx);
                          setEditingItem(prev => ({ ...prev!, challenge: newCh }));
                        }}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Resolution / Solution</Label>
                <Textarea 
                  value={editingItem?.solution || ""}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, solution: e.target.value }))}
                  className="min-h-[100px]"
                  placeholder="Through guided negotiation, the parties agreed on..."
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-muted/30 p-4 md:p-6 rounded-2xl border border-dashed border-muted-foreground/20">
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Weeks</Label>
                  <Input 
                    type="number"
                    value={editingItem?.costs?.weeks || 0}
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, costs: { ...prev!.costs!, weeks: parseInt(e.target.value) } }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Hours</Label>
                  <Input 
                    type="number"
                    value={editingItem?.costs?.hours || 0}
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, costs: { ...prev!.costs!, hours: parseInt(e.target.value) } }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Fees</Label>
                  <Input 
                    value={editingItem?.costs?.fees || ""}
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, costs: { ...prev!.costs!, fees: e.target.value } }))}
                    placeholder="e.g. 7 Lakh"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Dispute Value</Label>
                  <Input 
                    value={editingItem?.costs?.value || ""}
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, costs: { ...prev!.costs!, value: e.target.value } }))}
                    placeholder="e.g. INR 85 Cr"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 border-t bg-gray-50/80 backdrop-blur-sm shrink-0">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-navy-950 text-white" disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingItem?._id ? "Update Case Study" : "Create Case Study"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
