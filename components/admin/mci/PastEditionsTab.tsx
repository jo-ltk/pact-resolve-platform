"use client";

import React, { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Edit, Save, Loader2, FileText, Video, Users2, Star, Briefcase, Trophy, Upload, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PastEditionAction {
  label: string;
  url: string;
  icon: "report" | "movie" | "mentors" | "students" | "partners" | "participants";
}

export interface PastEdition {
  id: string;
  year: string;
  date: string;
  location: string;
  venue: string;
  actions: PastEditionAction[];
}

interface PastEditionsTabProps {
  editions: PastEdition[];
  isSaving: boolean;
  onSave: (editions: PastEdition[]) => Promise<void>;
}

const ACTION_ICONS = [
  { value: "report", label: "Report / PDF", icon: FileText },
  { value: "movie", label: "Video / Movie", icon: Video },
  { value: "mentors", label: "Mentors", icon: Users2 },
  { value: "students", label: "Students", icon: Star },
  { value: "partners", label: "Partners", icon: Briefcase },
  { value: "participants", label: "Participants", icon: Users2 },
] as const;

const EMPTY_EDITION: Omit<PastEdition, "id"> = {
  year: "",
  date: "",
  location: "",
  venue: "",
  actions: [],
};

const EMPTY_ACTION: PastEditionAction = { label: "", url: "", icon: "report" };

export function PastEditionsTab({ editions, isSaving, onSave }: PastEditionsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEdition, setTempEdition] = useState<Omit<PastEdition, "id">>(EMPTY_EDITION);
  const [isUploading, setIsUploading] = useState<number | null>(null); // action index being uploaded

  const openAdd = () => {
    setEditingIndex(null);
    setTempEdition({ ...EMPTY_EDITION, actions: [] });
    setIsDialogOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setTempEdition({ ...editions[index] });
    setIsDialogOpen(true);
  };

  const addAction = () => {
    setTempEdition(prev => ({ ...prev, actions: [...prev.actions, { ...EMPTY_ACTION }] }));
  };

  const removeAction = (i: number) => {
    setTempEdition(prev => ({ ...prev, actions: prev.actions.filter((_, idx) => idx !== i) }));
  };

  const updateAction = (i: number, field: keyof PastEditionAction, val: string) => {
    setTempEdition(prev => ({
      ...prev,
      actions: prev.actions.map((a, idx) => idx === i ? { ...a, [field]: val } : a)
    }));
  };

  const handleFileUpload = async (actionIndex: number, file: File) => {
    setIsUploading(actionIndex);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await res.json();
      const url = result.url || result.data?.url;
      if (!url) throw new Error("No URL returned");
      updateAction(actionIndex, "url", url);
      toast.success("File uploaded!");
    } catch (e: any) {
      toast.error(e.message || "Upload failed");
    } finally {
      setIsUploading(null);
    }
  };

  const saveEdition = async () => {
    if (!tempEdition.year || !tempEdition.date || !tempEdition.location) {
      toast.error("Year, date and location are required");
      return;
    }
    const newEditions = [...editions];
    if (editingIndex !== null) {
      newEditions[editingIndex] = { ...tempEdition, id: editions[editingIndex].id };
    } else {
      newEditions.push({ ...tempEdition, id: `edition-${Date.now()}` });
    }
    setIsDialogOpen(false);
    await onSave(newEditions);
  };

  const removeEdition = async (index: number) => {
    const newEditions = editions.filter((_, i) => i !== index);
    await onSave(newEditions);
  };

  const moveEdition = async (index: number, dir: "up" | "down") => {
    if (dir === "up" && index === 0) return;
    if (dir === "down" && index === editions.length - 1) return;
    const arr = [...editions];
    const newIdx = dir === "up" ? index - 1 : index + 1;
    [arr[index], arr[newIdx]] = [arr[newIdx], arr[index]];
    await onSave(arr);
  };

  const getIconComponent = (iconName: string) => {
    const found = ACTION_ICONS.find(a => a.value === iconName);
    return found ? found.icon : FileText;
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-navy-900/50 backdrop-blur-md border rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
          <Trophy className="w-5 h-5 text-emerald-600" />
          <span className="font-bold text-emerald-900 dark:text-emerald-100">
            {editions.length} <span className="font-medium opacity-60">Past Editions</span>
          </span>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onSave(editions)} disabled={isSaving} className="rounded-2xl h-12 px-6 bg-navy-950 hover:bg-navy-900 text-white font-bold">
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Publish
          </Button>
          <Button onClick={openAdd} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-emerald-500/30 text-emerald-600 hover:bg-emerald-50/50 hover:border-emerald-500 font-bold">
            <Plus className="w-5 h-5 mr-2" /> Add Edition
          </Button>
        </div>
      </div>

      {/* Editions list */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {editions.map((edition, index) => (
            <motion.div
              key={edition.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="group bg-white dark:bg-navy-900 border shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    {/* Year badge */}
                    <div className="w-20 h-20 shrink-0 rounded-2xl bg-navy-950 text-white flex flex-col items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold italic leading-none">{edition.year}</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy-950 dark:text-white text-lg">{edition.date}</span>
                        <span className="text-navy-950/40">·</span>
                        <span className="text-navy-950/60 font-medium">{edition.location}</span>
                      </div>
                      <p className="text-sm text-navy-950/50 italic">{edition.venue}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {edition.actions.map((action, j) => {
                          const Icon = getIconComponent(action.icon);
                          return (
                            <a
                              key={j}
                              href={action.url || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all",
                                action.url
                                  ? "bg-navy-50 border-navy-200 text-navy-700 hover:bg-navy-950 hover:text-white hover:border-navy-950"
                                  : "bg-gray-50 border-gray-200 text-gray-400 cursor-default"
                              )}
                            >
                              <Icon className="w-3.5 h-3.5 text-gold-500" />
                              {action.label || "Untitled"}
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      <Button size="icon" variant="secondary" className="rounded-xl w-9 h-9" onClick={() => openEdit(index)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="destructive" className="rounded-xl w-9 h-9" onClick={() => removeEdition(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-4 pt-0 border-t flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => moveEdition(index, "up")} disabled={index === 0}>
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => moveEdition(index, "down")} disabled={index === editions.length - 1}>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <span className="text-xs text-muted-foreground ml-2">Drag to reorder</span>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {editions.length === 0 && (
          <button onClick={openAdd} className="w-full h-40 flex flex-col items-center justify-center bg-gray-50/50 border-2 border-dashed border-navy-100 rounded-3xl hover:border-emerald-500/30 group">
            <Plus className="w-8 h-8 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-navy-950/40 uppercase">Add First Edition</span>
          </button>
        )}
      </div>

      {/* Edition Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl w-[95vw] p-0 overflow-hidden rounded-4xl border-none bg-white flex flex-col max-h-[90vh]">
          <div className="bg-navy-950 p-8 text-white shrink-0">
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
              <Trophy className="w-5 h-5 text-gold-500" />
              {editingIndex !== null ? "Edit Past Edition" : "Add Past Edition"}
            </DialogTitle>
          </div>

          <div className="p-8 space-y-6 overflow-y-auto grow">
            {/* Basic info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Year *</Label>
                <Input value={tempEdition.year} onChange={e => setTempEdition(p => ({ ...p, year: e.target.value }))} placeholder="e.g. 2024" />
              </div>
              <div className="space-y-2">
                <Label>Date Range *</Label>
                <Input value={tempEdition.date} onChange={e => setTempEdition(p => ({ ...p, date: e.target.value }))} placeholder="e.g. September 13-15" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City / Location *</Label>
                <Input value={tempEdition.location} onChange={e => setTempEdition(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Ahmedabad" />
              </div>
              <div className="space-y-2">
                <Label>Venue</Label>
                <Input value={tempEdition.venue} onChange={e => setTempEdition(p => ({ ...p, venue: e.target.value }))} placeholder="e.g. Gujarat National Law University" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">Action Buttons</Label>
                <Button size="sm" variant="outline" onClick={addAction} className="h-8 rounded-xl gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Add Button
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Each button can link to a PDF report, video, or external URL. You can upload files directly.</p>

              {tempEdition.actions.length === 0 && (
                <div className="text-center py-6 border-2 border-dashed rounded-2xl text-muted-foreground text-sm">
                  No action buttons yet. Add one above.
                </div>
              )}

              {tempEdition.actions.map((action, i) => (
                <div key={i} className="p-4 rounded-2xl border bg-gray-50/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-navy-950/60">Button #{i + 1}</span>
                    <Button size="icon" variant="ghost" className="w-7 h-7 text-destructive" onClick={() => removeAction(i)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Button Label</Label>
                      <Input value={action.label} onChange={e => updateAction(i, "label", e.target.value)} placeholder="e.g. MCI Movie 2024" className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Icon Type</Label>
                      <select
                        value={action.icon}
                        onChange={e => updateAction(i, "icon", e.target.value)}
                        className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        {ACTION_ICONS.map(ic => (
                          <option key={ic.value} value={ic.value}>{ic.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* URL + Upload */}
                  <div className="space-y-1">
                    <Label className="text-xs">Link URL (or upload file below)</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <Input
                          value={action.url}
                          onChange={e => updateAction(i, "url", e.target.value)}
                          placeholder="https://... or upload file →"
                          className="pl-8 h-9 text-sm"
                        />
                      </div>
                      <label className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm" className="h-9 gap-1.5 pointer-events-none rounded-xl whitespace-nowrap" disabled={isUploading === i}>
                          {isUploading === i ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                          Upload
                        </Button>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*,application/pdf,video/*"
                          disabled={isUploading === i}
                          onChange={e => {
                            const f = e.target.files?.[0];
                            if (f) handleFileUpload(i, f);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </div>
                    {action.url && (
                      <p className="text-[10px] text-emerald-600 truncate">✓ {action.url}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="p-6 bg-gray-50 flex justify-end gap-3 shrink-0">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveEdition} className="bg-navy-950 text-white font-bold">
              {editingIndex !== null ? "Save Changes" : "Add Edition"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
