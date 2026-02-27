"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Star, 
  Loader2, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  Database, 
  Image as ImageIcon, 
  FileText,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FileUpload } from "@/components/admin/FileUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { type EssentialChecklist, type ResourceItem } from "@/lib/db/schemas";
import Link from "next/link";

const EMPTY_ESSENTIAL: Partial<EssentialChecklist> = {
  title: "",
  description: "",
  image: { url: "", alt: "" },
  order: 1,
  isActive: true,
};

const EMPTY_TOOLKIT: Partial<ResourceItem> = {
  title: "",
  type: "toolkit",
  subtitle: "",
  description: "",
  url: "",
  publication: "", 
  order: 1,
  isActive: true,
};

export default function ClausesToolkitsAdminPage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("essentials");
  
  // Essentials State
  const [essentials, setEssentials] = useState<EssentialChecklist[]>([]);
  const [isEssentialsLoading, setIsEssentialsLoading] = useState(true);
  const [isEssentialDialogOpen, setIsEssentialDialogOpen] = useState(false);
  const [editingEssential, setEditingEssential] = useState<Partial<EssentialChecklist> | null>(null);
  
  // Toolkits State
  const [toolkits, setToolkits] = useState<ResourceItem[]>([]);
  const [isToolkitsLoading, setIsToolkitsLoading] = useState(true);
  const [isToolkitDialogOpen, setIsToolkitDialogOpen] = useState(false);
  const [editingToolkit, setEditingToolkit] = useState<Partial<ResourceItem> | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchEssentials();
    fetchToolkits();
  }, []);

  async function fetchEssentials() {
    setIsEssentialsLoading(true);
    try {
      const res = await fetch("/api/content/clauses-essentials?admin=true");
      const result = await res.json();
      if (result.success) setEssentials(result.data || []);
    } catch {
      toast.error("Failed to load essentials");
    } finally {
      setIsEssentialsLoading(false);
    }
  }

  async function fetchToolkits() {
    setIsToolkitsLoading(true);
    try {
      const res = await fetch("/api/content/resources?all=true&type=toolkit");
      const result = await res.json();
      if (result.success) setToolkits(result.data || []);
    } catch {
      toast.error("Failed to load toolkits");
    } finally {
      setIsToolkitsLoading(false);
    }
  }

  // Essential Handlers
  const handleSaveEssential = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEssential?.title) {
      toast.error("Title is required");
      return;
    }

    setIsSaving(true);
    try {
      const method = editingEssential._id ? "PUT" : "POST";
      const res = await fetch("/api/content/clauses-essentials", {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingEssential),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(editingEssential._id ? "Essential updated" : "Essential created");
        setIsEssentialDialogOpen(false);
        fetchEssentials();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEssential = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/content/clauses-essentials?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if ((await res.json()).success) {
        toast.success("Deleted");
        fetchEssentials();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  // Toolkit Handlers
  const handleSaveToolkit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingToolkit?.title) {
      toast.error("Title is required");
      return;
    }

    setIsSaving(true);
    try {
      const method = editingToolkit._id ? "PUT" : "POST";
      const res = await fetch("/api/content/resources", {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...editingToolkit, type: "toolkit" }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(editingToolkit._id ? "Toolkit updated" : "Toolkit created");
        setIsToolkitDialogOpen(false);
        fetchToolkits();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteToolkit = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/content/resources?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if ((await res.json()).success) {
        toast.success("Deleted");
        fetchToolkits();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSeedEssentials = async () => {
    if (!confirm("Restore default checklist items? This will remove existing ones.")) return;
    try {
      const res = await fetch("/api/content/clauses-essentials/seed", { method: "POST" });
      const result = await res.json();
      if (result.success) {
        toast.success("Default Essentials restored");
        fetchEssentials();
      }
    } catch {
      toast.error("Seeding failed");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link
            href="/admin/resources"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Resources
          </Link>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20">
                <Database className="w-6 h-6" />
             </div>
             <div>
                <h1 className="text-3xl font-bold text-navy-950 tracking-tight">Clauses & Toolkits</h1>
                <p className="text-navy-950/40 text-sm font-medium uppercase tracking-widest mt-1">Manage Essential Checklist and Practical Resources</p>
             </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => {
              if (activeTab === "essentials") {
                setEditingEssential(EMPTY_ESSENTIAL);
                setIsEssentialDialogOpen(true);
              } else {
                setEditingToolkit(EMPTY_TOOLKIT);
                setIsToolkitDialogOpen(true);
              }
            }} 
            className="rounded-xl px-6 h-12 bg-navy-950 hover:bg-navy-900 text-white font-bold shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" /> Add {activeTab === "essentials" ? "Essential" : "Toolkit"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white p-1 rounded-2xl border border-navy-50 h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="essentials" className="rounded-xl px-6 py-3 data-[state=active]:bg-navy-950 data-[state=active]:text-white font-bold transition-all">
            <Star className="w-4 h-4 mr-2" /> Essential Checklist
          </TabsTrigger>
          <TabsTrigger value="toolkits" className="rounded-xl px-6 py-3 data-[state=active]:bg-navy-950 data-[state=active]:text-white font-bold transition-all">
            <FileText className="w-4 h-4 mr-2" /> Practical Toolkits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="essentials" className="mt-6 space-y-6">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-0">
              <div className="p-6 border-b border-navy-50 flex justify-between items-center bg-navy-50/10">
                 <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold text-navy-950/60 lowercase italic">Used in "The Core Essentials" section</span>
                 </div>
                 <Button variant="ghost" size="sm" onClick={handleSeedEssentials} className="text-xs text-navy-950/40 hover:text-navy-950">
                    Restore Defaults
                 </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-navy-50">
                    <TableHead className="w-[100px] text-sm font-black uppercase tracking-widest text-navy-950/40 pl-8">Order</TableHead>
                    <TableHead className="text-sm font-black uppercase tracking-widest text-navy-950/40">Image</TableHead>
                    <TableHead className="text-sm font-black uppercase tracking-widest text-navy-950/40">Essential Item</TableHead>
                    <TableHead className="text-sm font-black uppercase tracking-widest text-navy-950/40">Status</TableHead>
                    <TableHead className="text-right pr-8 text-sm font-black uppercase tracking-widest text-navy-950/40">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isEssentialsLoading ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" /></TableCell></TableRow>
                  ) : essentials.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-20 text-muted-foreground">No essentials found. Click "Add Essential" or "Restore Defaults".</TableCell></TableRow>
                  ) : essentials.map((item) => (
                    <TableRow key={item._id?.toString()} className="group hover:bg-navy-50/50 transition-colors border-navy-50/50">
                      <TableCell className="pl-8 font-bold text-navy-950/30">#{item.order}</TableCell>
                      <TableCell>
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-navy-100 bg-navy-50">
                           {item.image?.url ? (
                              <img src={item.image.url} className="w-full h-full object-cover" />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-4 h-4 text-navy-200" /></div>
                           )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col max-w-sm">
                          <span className="font-bold text-navy-950 mb-0.5">{item.title}</span>
                          <span className="text-xs text-navy-950/50 line-clamp-1">{item.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-sm px-3 font-black uppercase tracking-widest">
                          {item.isActive ? "Active" : "Hidden"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => { setEditingEssential(item); setIsEssentialDialogOpen(true); }} className="h-9 w-9 rounded-full hover:bg-white"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteEssential(item._id!.toString())} className="h-9 w-9 rounded-full hover:bg-red-50 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="toolkits" className="mt-6 space-y-6">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-0">
               <div className="p-6 border-b border-navy-50 flex items-center gap-2 bg-navy-50/10">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-semibold text-navy-950/60 lowercase italic">Used in "Toolkits" (Practical Guides) section at the bottom</span>
               </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-navy-50">
                    <TableHead className="w-[100px] text-sm font-black uppercase tracking-widest text-navy-950/40 pl-8">Order</TableHead>
                    <TableHead className="text-sm font-black uppercase tracking-widest text-navy-950/40">Toolkit Info</TableHead>
                    <TableHead className="text-sm font-black uppercase tracking-widest text-navy-950/40">Source / Link</TableHead>
                    <TableHead className="text-sm font-black uppercase tracking-widest text-navy-950/40">Status</TableHead>
                    <TableHead className="text-right pr-8 text-sm font-black uppercase tracking-widest text-navy-950/40">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isToolkitsLoading ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" /></TableCell></TableRow>
                  ) : toolkits.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-20 text-muted-foreground">No toolkits found. Click "Add Toolkit".</TableCell></TableRow>
                  ) : toolkits.map((item) => (
                    <TableRow key={item._id?.toString()} className="group hover:bg-navy-50/50 transition-colors border-navy-50/50">
                      <TableCell className="pl-8 font-bold text-navy-950/30">#{item.order}</TableCell>
                      <TableCell>
                        <div className="flex flex-col max-w-sm">
                          <span className="font-bold text-navy-950 mb-0.5">{item.title}</span>
                          <span className="text-xs text-navy-950/50 line-clamp-1">{item.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                           <span className="text-xs font-medium uppercase tracking-widest text-sm text-amber-600 mb-0.5">{item.publication || item.subtitle || "PACT"}</span>
                           <Button variant="link" className="p-0 h-auto text-xs text-blue-500 justify-start" asChild>
                              <a href={item.url} target="_blank"><ExternalLink className="w-3 h-3 mr-1" /> View Resource</a>
                           </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-sm px-3 font-black uppercase tracking-widest">
                          {item.isActive ? "Active" : "Hidden"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => { setEditingToolkit(item); setIsToolkitDialogOpen(true); }} className="h-9 w-9 rounded-full hover:bg-white"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteToolkit(item._id!.toString())} className="h-9 w-9 rounded-full hover:bg-red-50 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Essential Dialog */}
      <Dialog open={isEssentialDialogOpen} onOpenChange={setIsEssentialDialogOpen}>
        <DialogContent className="max-w-2xl w-[95vw] bg-white rounded-3xl md:rounded-4xl p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] flex flex-col">
          <form onSubmit={handleSaveEssential} className="overflow-y-auto flex-1">
            <DialogHeader className="p-8 pb-0">
              <DialogTitle className="text-2xl font-bold tracking-tight text-navy-950">
                {editingEssential?._id ? "Edit Essential" : "Add Essential"}
              </DialogTitle>
              <DialogDescription>
                Configure the checklist item for the Essentials section.
              </DialogDescription>
            </DialogHeader>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Title</Label>
                <Input 
                  value={editingEssential?.title || ""} 
                  onChange={(e) => setEditingEssential(prev => ({ ...prev!, title: e.target.value }))}
                  placeholder="e.g. Name of Institution"
                  className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-amber-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Description</Label>
                <Textarea 
                  value={editingEssential?.description || ""} 
                  onChange={(e) => setEditingEssential(prev => ({ ...prev!, description: e.target.value }))}
                  placeholder="Detailed description..."
                  className="min-h-[100px] rounded-xl bg-navy-50/50 border-none focus-visible:ring-amber-500/20 resize-none"
                  required
                />
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Illustration / Image</Label>
                     <ImageUpload 
                       value={editingEssential?.image?.url || ""} 
                       onChange={(url) => setEditingEssential(prev => ({ ...prev!, image: { url, alt: editingEssential?.title || "" } }))} 
                     />
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Display Order</Label>
                        <Input 
                          type="number"
                          value={editingEssential?.order || 1} 
                          onChange={(e) => setEditingEssential(prev => ({ ...prev!, order: parseInt(e.target.value) || 1 }))}
                          className="h-12 rounded-xl bg-navy-50/50 border-none"
                        />
                     </div>
                     <div className="flex items-center justify-between p-4 rounded-xl bg-navy-50/50">
                        <Label className="text-sm font-bold text-navy-950">Active Status</Label>
                        <Switch 
                          checked={editingEssential?.isActive || false} 
                          onCheckedChange={(val) => setEditingEssential(prev => ({ ...prev!, isActive: val }))} 
                        />
                     </div>
                  </div>
                </div>
            </div>

            <DialogFooter className="p-8 bg-navy-50/30">
              <Button type="button" variant="ghost" onClick={() => setIsEssentialDialogOpen(false)} className="rounded-xl h-12 px-6">Cancel</Button>
              <Button type="submit" disabled={isSaving} className="rounded-xl h-12 px-10 bg-navy-950">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Essential"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Toolkit Dialog */}
      <Dialog open={isToolkitDialogOpen} onOpenChange={setIsToolkitDialogOpen}>
        <DialogContent className="max-w-2xl w-[95vw] bg-white rounded-3xl md:rounded-4xl p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] flex flex-col">
          <form onSubmit={handleSaveToolkit} className="overflow-y-auto flex-1">
            <DialogHeader className="p-8 pb-0">
              <DialogTitle className="text-2xl font-bold tracking-tight text-navy-950">
                {editingToolkit?._id ? "Edit Toolkit" : "Add Toolkit"}
              </DialogTitle>
              <DialogDescription>
                Configure the practical resource item for the Toolkits section.
              </DialogDescription>
            </DialogHeader>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Title</Label>
                  <Input 
                    value={editingToolkit?.title || ""} 
                    onChange={(e) => setEditingToolkit(prev => ({ ...prev!, title: e.target.value }))}
                    placeholder="e.g. Billing in Mediation"
                    className="h-12 rounded-xl bg-navy-50/50 border-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Source / Publication</Label>
                  <Input 
                    value={editingToolkit?.publication || ""} 
                    onChange={(e) => setEditingToolkit(prev => ({ ...prev!, publication: e.target.value }))}
                    placeholder="e.g. Bar & Bench"
                    className="h-12 rounded-xl bg-navy-50/50 border-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Description</Label>
                <Input 
                  value={editingToolkit?.description || ""} 
                  onChange={(e) => setEditingToolkit(prev => ({ ...prev!, description: e.target.value }))}
                  placeholder="How do you bill...?"
                  className="h-12 rounded-xl bg-navy-50/50 border-none"
                />
              </div>

              <div className="space-y-3">
                 <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Resource Link / PDF</Label>
                 <FileUpload 
                   value={editingToolkit?.url || ""} 
                   onChange={(url) => setEditingToolkit(prev => ({ ...prev!, url }))}
                   label="Document Link"
                 />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-navy-50">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Order</Label>
                  <Input 
                    type="number"
                    value={editingToolkit?.order || 1} 
                    onChange={(e) => setEditingToolkit(prev => ({ ...prev!, order: parseInt(e.target.value) || 1 }))}
                    className="h-12 rounded-xl bg-navy-50/50 border-none"
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-navy-50/50 md:mt-6">
                  <Label className="text-sm font-bold text-navy-950">Active Status</Label>
                  <Switch 
                    checked={editingToolkit?.isActive || false} 
                    onCheckedChange={(val) => setEditingToolkit(prev => ({ ...prev!, isActive: val }))} 
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 bg-navy-50/30">
              <Button type="button" variant="ghost" onClick={() => setIsToolkitDialogOpen(false)} className="rounded-xl h-12 px-6">Cancel</Button>
              <Button type="submit" disabled={isSaving} className="rounded-xl h-12 px-10 bg-navy-950">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Toolkit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
