"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Plus, 
  MoreHorizontal, 
  Users,
  Loader2,
  ArrowLeft,
  User
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
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { AcademyFaculty, AcademyProgram, AcademyCourseType } from "@/lib/db/schemas";
import { Checkbox } from "@/components/ui/checkbox";

const PROGRAM: AcademyProgram = "mediation";

export default function MediationFacultyPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<AcademyFaculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<AcademyFaculty> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/content/academy/faculty?all=true&program=${PROGRAM}&t=${Date.now()}`);
      const result = await response.json();
      if (result.success) {
        setItems(result.data || []);
      } else {
        toast.error(result.error || "Failed to fetch faculty");
      }
    } catch (error) {
      toast.error("An error occurred while fetching faculty");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this faculty member?")) return;

    try {
      const response = await fetch(`/api/content/academy/faculty?id=${id}`, {
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
      const response = await fetch("/api/content/academy/faculty", {
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
      programs: [PROGRAM],
      courseTypes: ["foundational", "advanced"],
      name: "",
      role: "",
      image: "",
      bio: "",
      profileUrl: "",
      order: items.length + 1,
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: AcademyFaculty) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const toggleProgram = (program: AcademyProgram) => {
    if (!editingItem) return;
    const programs = editingItem.programs || [];
    if (programs.includes(program)) {
      setEditingItem({ ...editingItem, programs: programs.filter(p => p !== program) });
    } else {
      setEditingItem({ ...editingItem, programs: [...programs, program] });
    }
  };

  const toggleCourseType = (courseType: AcademyCourseType) => {
    if (!editingItem) return;
    const types = editingItem.courseTypes || [];
    if (types.includes(courseType)) {
      setEditingItem({ ...editingItem, courseTypes: types.filter(t => t !== courseType) });
    } else {
      setEditingItem({ ...editingItem, courseTypes: [...types, courseType] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link href="/admin/academy/mediation" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Mediation
          </Link>
          <h1 className="text-3xl font-bold text-navy-950 flex items-center gap-3">
            <Users className="w-8 h-8 text-accent" />
            Faculty Profiles
          </h1>
          <p className="text-muted-foreground">Manage faculty members for Mediation Advocacy courses.</p>
        </div>
        <Button 
          onClick={openCreateDialog}
          className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Faculty
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-80 rounded-3xl overflow-hidden border-none shadow-sm">
              <Skeleton className="h-full w-full" />
            </Card>
          ))
        ) : items.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-navy-100">
            <Users className="w-12 h-12 text-navy-200 mx-auto mb-4" />
            <p className="text-navy-950/40 font-medium">No faculty members found. Add your first faculty profile.</p>
          </div>
        ) : items.map((item) => (
          <Card key={(item._id as any).toString()} className="group hover:shadow-2xl transition-all duration-500 rounded-3xl border-none shadow-sm overflow-hidden bg-white">
            <div className="relative aspect-square overflow-hidden">
              {item.image ? (
                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full bg-navy-50 flex items-center justify-center">
                  <User className="w-16 h-16 text-navy-200" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem onClick={() => openEditDialog(item)}>Edit Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete((item._id as any).toString())} className="text-red-500">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={item.isActive ? "success" : "secondary"} className="rounded-full text-[10px] uppercase font-bold border-none px-3">
                    {item.isActive ? "Active" : "Hidden"}
                  </Badge>
                  <span className="font-mono text-[10px] text-white/60 uppercase">Order #{item.order}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">{item.name}</h3>
                <p className="text-sm text-white/60">{item.role}</p>
              </div>
            </div>
            <CardContent className="p-4 bg-white">
              <div className="flex flex-wrap gap-1">
                {item.programs?.map(p => (
                  <Badge key={p} variant="outline" className="rounded-full text-[9px] uppercase font-bold px-2 py-0.5">
                    {p}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[95vh] p-0 border-none shadow-2xl rounded-4xl overflow-hidden bg-white flex flex-col">
          <form onSubmit={handleSave} className="flex flex-col h-full overflow-hidden">
            <DialogHeader className="p-8 bg-navy-950 text-white shrink-0">
              <DialogTitle className="text-2xl font-bold">
                {editingItem?._id ? "Edit Faculty" : "Add Faculty Member"}
              </DialogTitle>
              <DialogDescription className="text-blue-100">
                Faculty profile for Academy courses.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input 
                      value={editingItem?.name || ""} 
                      onChange={(e) => setEditingItem(prev => ({ ...prev!, name: e.target.value }))}
                      placeholder="e.g. Justice ABC (Retd.)"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role / Title</Label>
                    <Input 
                      value={editingItem?.role || ""} 
                      onChange={(e) => setEditingItem(prev => ({ ...prev!, role: e.target.value }))}
                      placeholder="e.g. Lead Faculty"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Display Order</Label>
                    <Input 
                      type="number"
                      value={editingItem?.order || 1}
                      onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <ImageUpload 
                  label="Profile Image"
                  value={editingItem?.image}
                  onChange={(url) => setEditingItem(prev => ({ ...prev!, image: url }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Bio / Description (Optional)</Label>
                <Textarea 
                  value={editingItem?.bio || ""}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, bio: e.target.value }))}
                  className="min-h-[100px]"
                  placeholder="Brief bio of the faculty member..."
                />
              </div>

              <div className="space-y-2">
                <Label>Profile URL (Optional)</Label>
                <Input 
                  value={editingItem?.profileUrl || ""} 
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, profileUrl: e.target.value }))}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3 p-4 border rounded-xl">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Programs</Label>
                  <div className="space-y-2">
                    {(["mediation", "arbitration", "negotiation"] as AcademyProgram[]).map(p => (
                      <div key={p} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`program-${p}`}
                          checked={editingItem?.programs?.includes(p)}
                          onCheckedChange={() => toggleProgram(p)}
                        />
                        <label htmlFor={`program-${p}`} className="text-sm font-medium capitalize">{p}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 p-4 border rounded-xl">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Course Types</Label>
                  <div className="space-y-2">
                    {(["foundational", "advanced"] as AcademyCourseType[]).map(t => (
                      <div key={t} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`type-${t}`}
                          checked={editingItem?.courseTypes?.includes(t)}
                          onCheckedChange={() => toggleCourseType(t)}
                        />
                        <label htmlFor={`type-${t}`} className="text-sm font-medium capitalize">{t}</label>
                      </div>
                    ))}
                  </div>
                </div>
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
                {editingItem?._id ? "Update Faculty" : "Add Faculty"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
