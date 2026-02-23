"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Loader2, 
  Trash2, 
  Edit, 
  ArrowLeft, 
  Calendar,
  MapPin,
  Sparkles,
  GripVertical,
  ChevronUp,
  ChevronDown,
  X,
  FlaskConical,
  Target,
  Award,
  BookOpen,
  Users,
  Zap,
  Lightbulb
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
  CardHeader,
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
import { useAuth } from "@/lib/context/AuthContext";
import { ProjectUpdate } from "@/lib/db/schemas";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Icon mapping for project updates
const iconOptions = [
  { value: "FlaskConical", icon: FlaskConical, label: "Workshop" },
  { value: "Target", icon: Target, label: "Competition" },
  { value: "Award", icon: Award, label: "Lecture" },
  { value: "BookOpen", icon: BookOpen, label: "Seminar" },
  { value: "Users", icon: Users, label: "Bootcamp" },
  { value: "Zap", icon: Zap, label: "Webinar" },
  { value: "Lightbulb", icon: Lightbulb, label: "Other" },
];

const categoryOptions = [
  "Workshop",
  "Competition", 
  "Lecture",
  "Seminar",
  "Bootcamp",
  "Webinar",
  "Conference",
  "Other"
];

// Default fallback data matching the public page
const fallbackUpdates = [
  { 
    title: "Workshop on Mediation", 
    date: "March 2026", 
    location: "SRM Law School, Haryana",
    category: "Workshop",
    iconName: "FlaskConical",
    order: 1,
    isActive: true
  },
  { 
    title: "ODRC Negotiation Contest", 
    date: "June 2026", 
    location: "Online Event",
    category: "Competition",
    iconName: "Target",
    order: 2,
    isActive: true
  },
  { 
    title: "Lecture on Mediation", 
    date: "April 2026", 
    location: "IIULER Law School, Goa",
    category: "Lecture",
    iconName: "Award",
    order: 3,
    isActive: true
  }
];

export default function ProjectUpdatesPage() {
  const { token } = useAuth();
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempItem, setTempItem] = useState<Partial<ProjectUpdate>>({
    title: "",
    date: "",
    location: "",
    category: "Workshop",
    iconName: "FlaskConical",
    order: 1,
    isActive: true
  });

  useEffect(() => { fetchUpdates(); }, []);

  async function fetchUpdates() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content/project-updates?all=true", { cache: 'no-store' });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const result = await res.json();
      
      if (result.success && result.data && result.data.length > 0) {
        setUpdates(result.data);
      } else {
        // Use fallback data for display
        setUpdates(fallbackUpdates as ProjectUpdate[]);
      }
    } catch (e) { 
      setUpdates(fallbackUpdates as ProjectUpdate[]);
      toast.error("Database connection issue. Showing default data.");
    }
    finally { setIsLoading(false); }
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // For each update, save to database
      for (const update of updates) {
        if (update._id) {
          // Update existing
          await fetch("/api/content/project-updates", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(update)
          });
        } else {
          // Create new
          await fetch("/api/content/project-updates", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(update)
          });
        }
      }
      
      toast.success("All updates saved successfully!");
      fetchUpdates();
    } catch (e) { 
      toast.error("Save failed"); 
    } finally { 
      setIsSaving(false); 
    }
  };

  const addUpdate = () => {
    setEditingIndex(null);
    setTempItem({
      title: "",
      date: "",
      location: "",
      category: "Workshop",
      iconName: "FlaskConical",
      order: updates.length + 1,
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (index: number) => {
    setEditingIndex(index);
    setTempItem({ ...updates[index] });
    setIsDialogOpen(true);
  };

  const saveTempItem = async () => {
    setIsSaving(true);
    try {
      const newUpdates = [...updates];
      
      if (editingIndex !== null) {
        // Update existing - save to DB
        const updateToSave = { ...tempItem as ProjectUpdate, _id: updates[editingIndex]._id };
        
        if (updateToSave._id) {
          await fetch("/api/content/project-updates", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(updateToSave)
          });
        } else {
          const res = await fetch("/api/content/project-updates", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(updateToSave)
          });
          const result = await res.json();
          if (result.success && result.data) {
            updateToSave._id = result.data._id;
          }
        }
        
        newUpdates[editingIndex] = updateToSave as ProjectUpdate;
        toast.success("Update saved successfully!");
      } else {
        // Create new - save to DB immediately
        const newItem = { 
          ...tempItem as ProjectUpdate, 
          order: updates.length + 1
        };
        
        const res = await fetch("/api/content/project-updates", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(newItem)
        });
        
        const result = await res.json();
        if (result.success && result.data) {
          newItem._id = result.data._id;
        }
        
        newUpdates.push(newItem as ProjectUpdate);
        toast.success("New update created successfully!");
      }
      
      setUpdates(newUpdates);
      setIsDialogOpen(false);
    } catch (e) { 
      toast.error("Save failed"); 
    } finally { 
      setIsSaving(false); 
    }
  };

  const removeUpdate = async (index: number) => {
    const updateToRemove = updates[index];
    
    // If it exists in database, delete it
    if (updateToRemove._id) {
      try {
        await fetch(`/api/content/project-updates?id=${updateToRemove._id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
      } catch (e) {
        console.error("Delete error:", e);
      }
    }
    
    const newUpdates = updates.filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, order: i + 1 }));
    
    setUpdates(newUpdates);
    toast.success("Update removed");
  };

  const updateItem = (index: number, field: keyof ProjectUpdate, value: any) => {
    const newUpdates = [...updates];
    newUpdates[index] = { ...newUpdates[index], [field]: value };
    setUpdates(newUpdates);
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === updates.length - 1) return;
    
    const newUpdates = [...updates];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newUpdates[index], newUpdates[newIndex]] = [newUpdates[newIndex], newUpdates[index]];
    newUpdates.forEach((item, i) => item.order = i + 1);
    
    setUpdates(newUpdates);
  };

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find(i => i.value === iconName);
    return icon ? icon.icon : Calendar;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
        <p className="text-muted-foreground animate-pulse font-medium">Loading updates...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Premium Header Design */}
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
                WATCH OUT FOR
              </h1>
              <p className="text-white/60 text-lg font-light max-w-xl">
                Manage the upcoming events and projects section on the Events & Projects page.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="rounded-2xl px-10 h-14 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg shadow-xl shadow-amber-900/40 border-none transition-all hover:scale-105 active:scale-95"
            >
              {isSaving ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <Sparkles className="w-5 h-5 mr-3" />}
              Publish Updates
            </Button>
            <p className="text-xs text-center text-white/40 uppercase tracking-tighter">
              {updates.length} Updates Configured
            </p>
          </div>
        </div>
      </div>

      {/* Stats & Actions Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white dark:bg-navy-900/50 backdrop-blur-md border rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-amber-900 dark:text-amber-100">{updates.length} <span className="font-medium opacity-60">Upcoming</span></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-600 font-bold text-sm">
                <Sparkles className="w-4 h-4 fill-current" /> Live on Website
            </div>
        </div>
        
          <Button onClick={addUpdate} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-amber-500/30 text-amber-600 hover:bg-amber-500/5 hover:border-amber-500 transition-all font-bold">
            <Plus className="w-5 h-5 mr-2" /> Add New Update
          </Button>
      </div>

      {/* Updates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {updates.map((update, index) => {
            const IconComponent = getIconComponent(update.iconName || "Calendar");
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                key={update._id?.toString() || `update-${index}`}
                className={`h-full ${!update.isActive ? 'opacity-60' : ''}`}
              >
                <Card className={`group relative h-full flex flex-col bg-white dark:bg-navy-900 border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden border border-navy-50/50 ${!update.isActive ? 'border-red-200 dark:border-red-900/30' : ''}`}>
                  {/* Header with Icon */}
                  <div className="relative p-6 pb-4 bg-gradient-to-br from-amber-50 to-white dark:from-navy-900 dark:to-navy-800">
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="w-8 h-8 rounded-lg text-muted-foreground hover:text-navy-950 hover:bg-navy-50" 
                          onClick={() => moveItem(index, 'up')} 
                          disabled={index === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="w-8 h-8 rounded-lg text-muted-foreground hover:text-navy-950 hover:bg-navy-50" 
                          onClick={() => moveItem(index, 'down')} 
                          disabled={index === updates.length - 1}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="mt-4">
                      <Badge className="bg-navy-100 text-navy-700 hover:bg-navy-200 text-xs font-bold uppercase tracking-wider">
                        {update.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl text-navy-950 dark:text-white line-clamp-2">
                        {update.title || "Untitled Update"}
                      </h3>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span>{update.date || "Date not set"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-amber-500" />
                        <span>{update.location || "Location not set"}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-navy-50/50 mt-auto">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={update.isActive} 
                        onCheckedChange={(checked) => updateItem(index, 'isActive', checked)}
                      />
                      <span className="text-xs text-muted-foreground">
                        {update.isActive ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur shadow-lg hover:bg-white" 
                        onClick={() => openEditDialog(index)}
                      >
                        <Edit className="w-4 h-4 text-navy-950" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="destructive" 
                            className="w-9 h-9 rounded-xl shadow-lg" 
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Update</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{update.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="rounded-xl bg-red-600 hover:bg-red-700" onClick={() => removeUpdate(index)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Add Empty State Card */}
        <button 
            onClick={addUpdate}
            className="flex flex-col items-center justify-center bg-gray-50/50 dark:bg-navy-900/20 border-2 border-dashed border-navy-100 dark:border-navy-800 rounded-3xl p-12 hover:bg-amber-50/50 hover:border-amber-500/30 transition-all group min-h-[350px]"
        >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-navy-950 dark:text-white mb-1">Add Update</h3>
            <p className="text-xs text-muted-foreground text-center">Add a new upcoming event or project</p>
        </button>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl w-[95vw] md:w-full p-0 overflow-hidden rounded-4xl border-none shadow-2xl flex flex-col bg-white">
          <div className="bg-navy-950 p-8 text-white shrink-0">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-500" />
                {editingIndex !== null ? "Edit Update" : "Add New Update"}
              </DialogTitle>
              <DialogDescription className="text-navy-200 italic">
                Provide details for this upcoming event or project.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-navy-950 ml-1 italic">Title</Label>
                <Input 
                  value={tempItem.title} 
                  onChange={e => setTempItem({ ...tempItem, title: e.target.value })} 
                  className="rounded-2xl h-12 border-navy-100 focus:ring-amber-500 bg-gray-50/50"
                  placeholder="e.g. Workshop on Mediation"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-navy-950 ml-1 italic">Date</Label>
                  <Input 
                    value={tempItem.date} 
                    onChange={e => setTempItem({ ...tempItem, date: e.target.value })} 
                    className="rounded-2xl h-12 border-navy-100 focus:ring-amber-500 bg-gray-50/50"
                    placeholder="e.g. March 2026"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-navy-950 ml-1 italic">Location</Label>
                  <Input 
                    value={tempItem.location} 
                    onChange={e => setTempItem({ ...tempItem, location: e.target.value })} 
                    className="rounded-2xl h-12 border-navy-100 focus:ring-amber-500 bg-gray-50/50"
                    placeholder="e.g. SRM Law School, Haryana"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-navy-950 ml-1 italic">Category</Label>
                  <select 
                    value={tempItem.category} 
                    onChange={e => setTempItem({ ...tempItem, category: e.target.value })}
                    className="rounded-2xl h-12 border-navy-100 focus:ring-amber-500 bg-gray-50/50 px-4 w-full"
                  >
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-navy-950 ml-1 italic">Icon</Label>
                  <select 
                    value={tempItem.iconName} 
                    onChange={e => setTempItem({ ...tempItem, iconName: e.target.value })}
                    className="rounded-2xl h-12 border-navy-100 focus:ring-amber-500 bg-gray-50/50 px-4 w-full"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon.value} value={icon.value}>{icon.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
                <div>
                  <p className="font-bold">Visibility</p>
                  <p className="text-xs text-muted-foreground">Show this update on the website.</p>
                </div>
                <Switch 
                  checked={tempItem.isActive} 
                  onCheckedChange={(checked) => setTempItem({...tempItem!, isActive: checked})}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="p-8 bg-gray-50/80 backdrop-blur-sm border-t flex justify-end gap-3 shrink-0">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-8">
              Cancel
            </Button>
            <Button 
              onClick={saveTempItem}
              className="rounded-xl h-12 px-10 bg-navy-950 hover:bg-navy-900 text-white font-bold shadow-lg shadow-navy-900/20 active:scale-95 transition-all"
            >
              {editingIndex !== null ? "Save Changes" : "Add Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Guide Card */}
      <div className="bg-amber-50 dark:bg-amber-950/20 rounded-[2.5rem] p-10 border border-amber-200 dark:border-amber-800 flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 shrink-0 bg-amber-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-500/30 rotate-3">
            <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div>
            <h3 className="text-2xl font-black italic text-amber-900 dark:text-amber-100 mb-2 tracking-tight uppercase">Quick Tips</h3>
            <p className="text-amber-800/80 dark:text-amber-200/80 leading-relaxed max-w-3xl">
                The "Watch Out For" section displays upcoming events on the Events & Projects page. Add workshops, lectures, competitions, and more. Use the drag handles to reorder how they appear.
            </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
             <div className="text-right hidden md:block">
                 <p className="text-xs font-bold text-amber-900/40 uppercase tracking-widest leading-none">Status</p>
                 <p className="text-sm font-bold text-amber-900/80 dark:text-amber-100">Synchronized</p>
             </div>
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        </div>
      </div>
    </div>
  );
}
