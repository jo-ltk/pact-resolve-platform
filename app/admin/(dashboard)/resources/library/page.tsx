"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  BookOpen,
  Loader2,
  ArrowLeft,
  Image as ImageIcon,
  PenTool,
  Video,
  Newspaper,
  Book,
  ExternalLink,
  Presentation
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
import { useAuth } from "@/lib/context/AuthContext";
import { type ResourceItem, type ResourceType } from "@/lib/db/schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS: { value: ResourceType; label: string; icon: any }[] = [
  { value: "blog", label: "Articles", icon: PenTool },
  { value: "publication", label: "Publications", icon: ExternalLink },
  { value: "video", label: "Videos", icon: Video },
  { value: "book", label: "Books", icon: Book },
  { value: "news", label: "News", icon: Newspaper }
];

export default function LibraryAdminPage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<ResourceType>("blog");
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<ResourceItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { fetchItems(); }, [activeTab]);

  async function fetchItems() {
    setIsLoading(true);
    try {
      // Fetch only items of current type to optimize
      const response = await fetch(`/api/content/resources?all=true&type=${activeTab}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      if (result.success) setItems(result.data || []);
    } catch (error) { 
      console.error(error);
      toast.error("Failed to fetch resources"); 
    }
    finally { setIsLoading(false); }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    try {
      const response = await fetch(`/api/content/resources?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if ((await response.json()).success) {
        toast.success("Resource deleted");
        setItems(items.filter(i => (i._id as any).toString() !== id));
      }
    } catch (error) { toast.error("Delete failed"); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = editingItem?._id ? "PUT" : "POST";
      const response = await fetch("/api/content/resources", {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ ...editingItem, type: activeTab })
      });
      const result = await response.json();
      if (result.success) {
        toast.success(editingItem?._id ? "Resource updated" : "Resource created");
        setIsDialogOpen(false);
        fetchItems();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch (error) { toast.error("Save failed"); }
    finally { setIsSaving(false); }
  };

  const openCreateDialog = () => {
    setEditingItem({ 
      title: "", 
      type: activeTab,
      subtitle: "", 
      description: "",
      image: "",
      url: "",
      author: "",
      publication: "", // Generic usage
      order: items.length + 1, 
      isActive: true,
      isFeatured: false
    });
    setIsDialogOpen(true);
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
        <div className="space-y-4">
          <Link href="/admin/resources" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-navy-950 tracking-tight">Blog & Library</h1>
              <p className="text-navy-950/40 text-sm font-medium uppercase tracking-widest mt-1">Manage articles, books, videos and news</p>
            </div>
          </div>
        </div>
        <Button onClick={openCreateDialog} className="rounded-xl px-6 h-12 bg-navy-950 hover:bg-navy-900 text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-navy-950/10">
          <Plus className="w-4 h-4 mr-2" /> Add Resource
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ResourceType)} className="w-full">
        <TabsList className="bg-white p-1 rounded-2xl border border-navy-50 h-auto flex-wrap justify-start gap-1">
          {TABS.map(tab => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              className="rounded-xl px-6 py-3 data-[state=active]:bg-navy-950 data-[state=active]:text-white font-bold transition-all"
            >
              <tab.icon className="w-4 h-4 mr-2" /> {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="rounded-3xl border-none shadow-xl shadow-navy-950/5 bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-navy-50 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-950/20" />
              <Input 
                placeholder="Search resources..." 
                className="pl-10 h-11 bg-navy-50/50 border-none rounded-xl focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-navy-50">
                  <TableHead className="w-[80px] text-[10px] font-black uppercase tracking-widest text-navy-950/40 pl-8">Order</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-navy-950/40">Resource Info</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-navy-950/40">Details</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-navy-950/40">Status</TableHead>
                  <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest text-navy-950/40">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i} className="border-navy-50/50">
                      <TableCell colSpan={5} className="py-4 px-8"><Skeleton className="h-12 w-full rounded-xl" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <BookOpen className="w-12 h-12 text-navy-200" />
                        <p className="text-navy-950/40 font-medium">No resources found in {activeTab}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredItems.map((item) => (
                  <TableRow key={(item._id as any).toString()} className="group hover:bg-navy-50/50 transition-colors border-navy-50/50">
                    <TableCell className="pl-8">
                      <span className="font-mono text-xs font-bold text-navy-950/30">#{item.order}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl bg-navy-50 overflow-hidden flex items-center justify-center shrink-0 border border-navy-100/50 shadow-sm">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                          ) : (
                            <div className="text-navy-950/20">
                              {activeTab === 'video' ? <Video className="w-5 h-5"/> : <ImageIcon className="w-5 h-5" />}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col max-w-[250px]">
                          <span className="font-bold text-navy-950 text-sm truncate">{item.title}</span>
                          <span className="text-[10px] text-navy-950/40 font-mono uppercase tracking-widest truncate">
                            {item.subtitle || item.author || "-"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {item.publication && <span className="text-xs text-navy-950/60 truncate max-w-[200px]">{item.publication}</span>}
                        {item.url && (
                           <a href={item.url} target="_blank" className="text-[10px] text-blue-500 hover:underline truncate max-w-[200px] flex items-center gap-1">
                             {item.url} <ExternalLink className="w-3 h-3"/>
                           </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                         <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-[10px] uppercase font-black tracking-widest h-6">
                           {item.isActive ? "Active" : "Hidden"}
                         </Badge>
                         {item.isFeatured && (
                           <Badge variant="outline" className="rounded-full text-[10px] uppercase font-black tracking-widest h-6 text-gold-600 border-gold-200 bg-gold-50">
                             Featured
                           </Badge>
                         )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white hover:shadow-sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[170px] shadow-2xl border-navy-50">
                          <DropdownMenuItem 
                            onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}
                            className="rounded-xl flex items-center gap-3 px-3 py-2 cursor-pointer focus:bg-navy-50"
                          >
                            <Edit className="w-4 h-4 text-navy-950/40" />
                            <span className="text-sm font-medium">Edit Resource</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete((item._id as any).toString())}
                            className="rounded-xl flex items-center gap-3 px-3 py-2 cursor-pointer focus:bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl bg-white rounded-4xl p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-none">
          <form onSubmit={handleSave}>
            <DialogHeader className="p-8 pb-0">
              <DialogTitle className="text-2xl font-bold tracking-tight text-navy-950">
                {editingItem?._id ? "Edit Resource" : "New Resource"} ({TABS.find(t => t.value === activeTab)?.label})
              </DialogTitle>
              <DialogDescription>
                Details for this {activeTab}. Fields vary by resource type.
              </DialogDescription>
            </DialogHeader>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Title</Label>
                  <Input 
                    value={editingItem?.title || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder="Resource Title"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">
                    {activeTab === 'book' ? 'Author' : activeTab === 'video' ? 'Speaker/Host' : activeTab === 'news' ? 'Publication' : 'Subtitle / Author'}
                  </Label>
                  <Input 
                    value={editingItem?.subtitle || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, subtitle: e.target.value }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                    placeholder={activeTab === 'book' ? 'Author Name' : 'Subtitle'}
                  />
                </div>
              </div>

              {/* Extra fields based on type */}
              {(activeTab === 'blog' || activeTab === 'publication') && (
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Author Name (Specific)</Label>
                     <Input 
                       value={editingItem?.author || ""} 
                       onChange={(e) => setEditingItem(prev => ({ ...prev!, author: e.target.value }))} 
                       className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                       placeholder="e.g. Jonathan Rodrigues"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Publication Name</Label>
                     <Input 
                       value={editingItem?.publication || ""} 
                       onChange={(e) => setEditingItem(prev => ({ ...prev!, publication: e.target.value }))} 
                       className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                       placeholder="e.g. Kluwer Mediation Blog"
                     />
                   </div>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Description / Summary</Label>
                <Textarea 
                  value={editingItem?.description || ""} 
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))} 
                  className="min-h-[100px] rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20 resize-none p-4"
                  placeholder="Brief description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Cover Image URL</Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-950/20" />
                    <Input 
                      value={editingItem?.image || ""} 
                      onChange={(e) => setEditingItem(prev => ({ ...prev!, image: e.target.value }))} 
                      className="pl-10 h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Content URL</Label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-950/20" />
                    <Input 
                      value={editingItem?.url || ""} 
                      onChange={(e) => setEditingItem(prev => ({ ...prev!, url: e.target.value }))} 
                      className="pl-10 h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-navy-50">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-black text-navy-950/40 ml-1">Order</Label>
                  <Input 
                    type="number" 
                    value={editingItem?.order || 0} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) }))} 
                    className="h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-4 h-12 rounded-xl bg-navy-50/50 mt-8">
                  <Label className="text-xs font-bold text-navy-950/60 uppercase tracking-widest cursor-pointer" htmlFor="status-toggle">Visible</Label>
                  <Switch 
                    id="status-toggle"
                    checked={editingItem?.isActive || false} 
                    onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))} 
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-4 h-12 rounded-xl bg-navy-50/50 mt-8">
                  <Label className="text-xs font-bold text-navy-950/60 uppercase tracking-widest cursor-pointer" htmlFor="featured-toggle">Featured</Label>
                  <Switch 
                    id="featured-toggle"
                    checked={editingItem?.isFeatured || false} 
                    onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isFeatured: val }))} 
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 pt-0 bg-navy-50/30">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6 font-bold">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="rounded-xl h-12 px-8 bg-navy-950 hover:bg-navy-900 text-white font-bold transition-all shadow-lg">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editingItem?._id ? "Update Resource" : "Create Resource"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
