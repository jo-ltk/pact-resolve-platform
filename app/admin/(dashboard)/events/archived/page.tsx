"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Loader2, 
  Trash2, 
  Edit, 
  ArrowLeft, 
  Calendar,
  MapPin,
  Sparkles,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Link as LinkIcon
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { ArchivedProject } from "@/lib/db/schemas";
import { motion, AnimatePresence } from "framer-motion";

const categoryOptions = [
  "Webinar",
  "Workshop", 
  "Bootcamp",
  "Online Bootcamp",
  "Conference",
  "Lecture",
  "Seminar",
  "Competition",
  "Other"
];

// Default fallback data
const defaultArchives = [
  {
    title: "BITS Law School | Panel on Mediation & Arbitration in International Commercial Conflicts",
    location: "Mumbai, 2025",
    description: "Exploring how mixed-mode dispute resolution is shaping cross-border business disputes and India's evolving position in that space.",
    link: "https://www.youtube.com/watch?v=nQLB_E2Z3hg",
    category: "Webinar",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
  },
  {
    title: "Saveetha School of Law - Three-Day Workshop on Mediation",
    location: "Chennai, 2024",
    description: "Intensive skills workshop introducing core mediation principles, empathic listening, and the IMPACT model.",
    link: "https://saveethalaw.com/news/three-day-workshop-on-mediation",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
  }
];

export default function ArchivedProjectsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<ArchivedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempItem, setTempItem] = useState<Partial<ArchivedProject>>({
    title: "",
    location: "",
    description: "",
    link: "",
    category: "Workshop",
    image: "",
    order: 1,
    isActive: true
  });

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/archived-projects?all=true", { cache: 'no-store' });
      const result = await res.json();
      
      if (result.success && result.data && result.data.length > 0) {
        setProjects(result.data);
      } else {
        setProjects(defaultArchives as ArchivedProject[]);
      }
    } catch (e) { 
      setProjects(defaultArchives as ArchivedProject[]);
      toast.error("Database connection issue. Showing default data.");
    }
    finally { setIsLoading(false); }
  }

  const saveTempItem = async () => {
    setIsSaving(true);
    try {
      const newProjects = [...projects];
      
      if (editingIndex !== null) {
        const projectToSave = { ...tempItem as ArchivedProject, _id: projects[editingIndex]._id };
        
        if (projectToSave._id) {
          await fetch("/api/content/archived-projects", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(projectToSave)
          });
        }
        
        newProjects[editingIndex] = projectToSave as ArchivedProject;
        toast.success("Project saved successfully!");
      } else {
        const newProject = { ...tempItem as ArchivedProject, order: projects.length + 1 };
        
        const res = await fetch("/api/content/archived-projects", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(newProject)
        });
        
        const result = await res.json();
        if (result.success && result.data) {
          newProject._id = result.data._id;
        }
        
        newProjects.push(newProject as ArchivedProject);
        toast.success("New project created successfully!");
      }
      
      setProjects(newProjects);
      setIsDialogOpen(false);
    } catch (e) { 
      toast.error("Save failed"); 
    } finally { 
      setIsSaving(false); 
    }
  };

  const removeProject = async (index: number) => {
    const projectToRemove = projects[index];
    
    if (projectToRemove._id) {
      try {
        await fetch(`/api/content/archived-projects?id=${projectToRemove._id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
      } catch (e) {
        console.error("Delete error:", e);
      }
    }
    
    const newProjects = projects.filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, order: i + 1 }));
    
    setProjects(newProjects);
    toast.success("Project removed");
  };

  const updateItem = (index: number, field: keyof ArchivedProject, value: any) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === projects.length - 1) return;
    
    const newProjects = [...projects];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newProjects[index], newProjects[newIndex]] = [newProjects[newIndex], newProjects[index]];
    newProjects.forEach((item, i) => item.order = i + 1);
    
    setProjects(newProjects);
  };

  const openEditDialog = (index: number) => {
    setEditingIndex(index);
    setTempItem({ ...projects[index] });
    setIsDialogOpen(true);
  };

  const addProject = () => {
    setEditingIndex(null);
    setTempItem({
      title: "",
      location: "",
      description: "",
      link: "",
      category: "Workshop",
      image: "",
      order: projects.length + 1,
      isActive: true
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
        <p className="text-muted-foreground animate-pulse font-medium">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-navy-950 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-amber-500/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <Link href="/admin/events" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-amber-500/80 hover:text-amber-500 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
            <div className="space-y-1">
              <h1 className="page-title text-4xl md:text-5xl font-black tracking-tighter italic flex items-center gap-4">
                <Sparkles className="w-10 h-10 text-amber-500" /> 
                ARCHIVED PROJECTS
              </h1>
              <p className="text-white/60 text-lg font-light max-w-xl">
                Manage the Legacy/Archived Projects section on the Events & Projects page.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button onClick={addProject} className="rounded-2xl px-10 h-14 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg shadow-xl shadow-amber-900/40 border-none transition-all hover:scale-105 active:scale-95">
              <Plus className="w-5 h-5 mr-3" />
              Add Project
            </Button>
            <p className="text-xs text-center text-white/40 uppercase tracking-tighter">
              {projects.length} Projects Configured
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white dark:bg-navy-900/50 backdrop-blur-md border rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-amber-900 dark:text-amber-100">{projects.length} <span className="font-medium opacity-60">Archived</span></span>
            </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key={project._id?.toString() || `project-${index}`}
              className={`${!project.isActive ? 'opacity-60' : ''}`}
            >
              <Card className={`group relative overflow-hidden rounded-3xl border border-navy-100 hover:shadow-xl transition-all ${!project.isActive ? 'border-red-200' : ''}`}>
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="w-full md:w-64 h-48 relative bg-muted shrink-0">
                    {project.image ? (
                      <Image src={project.image} alt={project.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Sparkles className="w-8 h-8 opacity-20" />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-navy-100 text-navy-700">{project.category}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {project.location}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-navy-950 line-clamp-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        {project.link && (
                          <a href={project.link} target="_blank" className="text-xs text-amber-600 flex items-center gap-1 hover:underline">
                            <ExternalLink className="w-3 h-3" /> View Project
                          </a>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="w-8 h-8 rounded-lg" 
                          onClick={() => moveItem(index, 'up')} 
                          disabled={index === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="w-8 h-8 rounded-lg" 
                          onClick={() => moveItem(index, 'down')} 
                          disabled={index === projects.length - 1}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={project.isActive} 
                          onCheckedChange={(checked) => updateItem(index, 'isActive', checked)}
                        />
                        <span className="text-xs text-muted-foreground">
                          {project.isActive ? "Visible" : "Hidden"}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(index)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-2xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Project</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{project.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                              <AlertDialogAction className="rounded-xl bg-red-600 hover:bg-red-700" onClick={() => removeProject(index)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-none shadow-2xl">
          <div className="bg-navy-950 p-8 text-white shrink-0">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-500" />
                {editingIndex !== null ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription className="text-navy-200 italic">
                Provide details for this archived project.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-navy-950 ml-1">Title</Label>
              <Input 
                value={tempItem.title} 
                onChange={e => setTempItem({ ...tempItem, title: e.target.value })} 
                className="rounded-2xl h-12"
                placeholder="Project title"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-navy-950 ml-1">Location</Label>
                <Input 
                  value={tempItem.location} 
                  onChange={e => setTempItem({ ...tempItem, location: e.target.value })} 
                  className="rounded-2xl h-12"
                  placeholder="e.g. Mumbai, 2025"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-navy-950 ml-1">Category</Label>
                <select 
                  value={tempItem.category} 
                  onChange={e => setTempItem({ ...tempItem, category: e.target.value })}
                  className="rounded-2xl h-12 border-navy-100 px-4 w-full"
                >
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-navy-950 ml-1">Description</Label>
              <Textarea 
                value={tempItem.description} 
                onChange={e => setTempItem({ ...tempItem, description: e.target.value })} 
                className="rounded-2xl min-h-[100px]"
                placeholder="Project description..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-navy-950 ml-1">Project Link</Label>
              <Input 
                value={tempItem.link} 
                onChange={e => setTempItem({ ...tempItem, link: e.target.value })} 
                className="rounded-2xl h-12"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-navy-950 ml-1">Featured Image</Label>
              <ImageUpload 
                value={tempItem.image} 
                onChange={(url) => setTempItem({ ...tempItem, image: url })} 
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
              <div>
                <p className="font-bold">Visibility</p>
                <p className="text-xs text-muted-foreground">Show this project on the website.</p>
              </div>
              <Switch 
                checked={tempItem.isActive} 
                onCheckedChange={(checked) => setTempItem({...tempItem!, isActive: checked})}
              />
            </div>
          </div>

          <DialogFooter className="p-8 bg-gray-50 border-t flex justify-end gap-3 shrink-0">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-8">
              Cancel
            </Button>
            <Button 
              onClick={saveTempItem}
              disabled={isSaving}
              className="rounded-xl h-12 px-10 bg-navy-950 hover:bg-navy-900 text-white font-bold"
            >
              {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
              {editingIndex !== null ? "Save Changes" : "Add Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Guide Card */}
      <div className="bg-amber-50 dark:bg-amber-950/20 rounded-[2.5rem] p-10 border border-amber-200">
        <h3 className="text-xl font-black italic text-amber-900 mb-2">Quick Tips</h3>
        <p className="text-amber-800/80">
          The "Archived Projects" section shows past workshops, bootcamps, and events. Add completed projects with links to view more details.
        </p>
      </div>
    </div>
  );
}
