"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  MoreHorizontal, 
  BookOpen,
  Loader2,
  ArrowLeft,
  GripVertical,
  X
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
import { AcademyModule, AcademyCourseType } from "@/lib/db/schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PROGRAM = "mediation";

export default function MediationModulesPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<AcademyModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<AcademyModule> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<AcademyCourseType>("foundational");

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/content/academy/modules?all=true&program=${PROGRAM}&t=${Date.now()}`);
      const result = await response.json();
      if (result.success) {
        setItems(result.data || []);
      } else {
        toast.error(result.error || "Failed to fetch modules");
      }
    } catch (error) {
      toast.error("An error occurred while fetching modules");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this module?")) return;

    try {
      const response = await fetch(`/api/content/academy/modules?id=${id}`, {
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
      const response = await fetch("/api/content/academy/modules", {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ...editingItem, program: PROGRAM })
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

  const openCreateDialog = (courseType: AcademyCourseType) => {
    const filteredItems = items.filter(i => i.courseType === courseType);
    setEditingItem({
      program: PROGRAM,
      courseType,
      moduleNumber: filteredItems.length + 1,
      title: "",
      content: "",
      order: filteredItems.length + 1,
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: AcademyModule) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const foundationalModules = items.filter(i => i.courseType === "foundational").sort((a, b) => a.order - b.order);
  const advancedModules = items.filter(i => i.courseType === "advanced").sort((a, b) => a.order - b.order);

  const renderModuleCards = (modules: AcademyModule[], courseType: AcademyCourseType) => (
    <div className="space-y-4">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="rounded-2xl overflow-hidden border-none shadow-sm">
            <Skeleton className="h-24 w-full" />
          </Card>
        ))
      ) : modules.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border-2 border-dashed border-navy-100">
          <BookOpen className="w-12 h-12 text-navy-200 mx-auto mb-4" />
          <p className="text-navy-950/40 font-medium">No modules found. Create your first training module.</p>
          <Button className="mt-4" onClick={() => openCreateDialog(courseType)}>
            <Plus className="w-4 h-4 mr-2" /> Add Module
          </Button>
        </div>
      ) : (
        modules.map((item, index) => (
          <Card key={(item._id as any).toString()} className="group hover:shadow-lg transition-all duration-500 rounded-2xl border-navy-100/50 shadow-sm overflow-hidden bg-white">
            <CardContent className="p-6 flex items-start gap-6">
              <div className="flex items-center gap-4 text-navy-200 cursor-grab">
                <GripVertical className="w-5 h-5" />
                <div className="font-mono text-2xl font-bold text-navy-100 group-hover:text-accent transition-colors w-12 text-center">
                  {String(item.moduleNumber || index + 1).padStart(2, '0')}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-[10px] uppercase font-bold border-none px-3">
                    {item.isActive ? "Active" : "Hidden"}
                  </Badge>
                  <span className="font-mono text-[10px] text-navy-400 uppercase tracking-widest">
                    {courseType === "foundational" ? "Foundation" : "Advanced"} Module
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy-950 group-hover:text-accent transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-navy-950/50 line-clamp-2 leading-relaxed">
                  {item.content}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-navy-50">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuItem onClick={() => openEditDialog(item)}>Edit Module</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete((item._id as any).toString())} className="text-red-500">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link href="/admin/academy/mediation" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Mediation
          </Link>
          <h1 className="text-3xl font-bold text-navy-950 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-accent" />
            Training Modules
          </h1>
          <p className="text-muted-foreground">Manage curriculum modules for Mediation Advocacy courses.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AcademyCourseType)} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-navy-50/50 p-1 rounded-2xl">
            <TabsTrigger value="foundational" className="rounded-xl px-6 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Foundational Course
            </TabsTrigger>
            <TabsTrigger value="advanced" className="rounded-xl px-6 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Advanced Course
            </TabsTrigger>
          </TabsList>
          <Button 
            onClick={() => openCreateDialog(activeTab)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Module
          </Button>
        </div>

        <TabsContent value="foundational" className="mt-0">
          {renderModuleCards(foundationalModules, "foundational")}
        </TabsContent>

        <TabsContent value="advanced" className="mt-0">
          {renderModuleCards(advancedModules, "advanced")}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 border-none shadow-2xl rounded-4xl overflow-hidden bg-white flex flex-col">
          <form onSubmit={handleSave} className="flex flex-col h-full overflow-hidden">
            <DialogHeader className="p-8 bg-navy-950 text-white shrink-0">
              <DialogTitle className="text-2xl font-bold">
                {editingItem?._id ? "Edit Module" : "Create Module"}
              </DialogTitle>
              <DialogDescription className="text-blue-100">
                Training curriculum module for {editingItem?.courseType === "foundational" ? "Foundational" : "Advanced"} course.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Module Number</Label>
                  <Input 
                    type="number"
                    value={editingItem?.moduleNumber || 1} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, moduleNumber: parseInt(e.target.value) }))}
                    min={1}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input 
                    type="number"
                    value={editingItem?.order || 1}
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) }))}
                    min={1}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Module Title</Label>
                <Input 
                  value={editingItem?.title || ""} 
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))}
                  placeholder="e.g. Module 1: Mediation Advocacy Essentials"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Module Content</Label>
                <Textarea 
                  value={editingItem?.content || ""}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, content: e.target.value }))}
                  className="min-h-[150px]"
                  placeholder="List of topics covered in this module, separated by semicolons..."
                  required
                />
                <p className="text-xs text-muted-foreground">Separate topics with semicolons (;) for proper formatting.</p>
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

            <DialogFooter className="p-8 border-t bg-gray-50/80 backdrop-blur-sm shrink-0">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-navy-950 text-white" disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingItem?._id ? "Update Module" : "Create Module"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
