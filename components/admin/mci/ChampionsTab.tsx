"use client";

import React, { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Edit, Save, Loader2, Trophy, Award } from "lucide-react";
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
import { MCIChampion } from "@/lib/db/schemas";
import { cn } from "@/lib/utils";

import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface ChampionsTabProps {
  champions: MCIChampion[];
  isSaving: boolean;
  onSave: (champions: MCIChampion[]) => Promise<void>;
}

const EMPTY_CHAMPION: MCIChampion = {
  year: "",
  counselNames: "",
  mediatorName: "",
  isActive: true,
};

export function ChampionsTab({ champions = [], isSaving, onSave }: ChampionsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempChampion, setTempChampion] = useState<MCIChampion>(EMPTY_CHAMPION);

  const openAdd = () => {
    setEditingIndex(null);
    setTempChampion({ ...EMPTY_CHAMPION });
    setIsDialogOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setTempChampion({ ...champions[index], isActive: champions[index].isActive ?? true });
    setIsDialogOpen(true);
  };

  const saveChampion = async () => {
    if (!tempChampion.year || !tempChampion.counselNames || !tempChampion.mediatorName) {
      toast.error("Year, Counsel Names and Mediator Name are required");
      return;
    }
    const newChampions = [...champions];
    if (editingIndex !== null) {
      newChampions[editingIndex] = { ...tempChampion };
    } else {
      newChampions.push({ ...tempChampion });
    }
    setIsDialogOpen(false);
    await onSave(newChampions);
  };

  const removeChampion = async (index: number) => {
    const newChampions = champions.filter((_, i) => i !== index);
    await onSave(newChampions);
  };

  const moveChampion = async (index: number, dir: "up" | "down") => {
    if (dir === "up" && index === 0) return;
    if (dir === "down" && index === champions.length - 1) return;
    const arr = [...champions];
    const newIdx = dir === "up" ? index - 1 : index + 1;
    [arr[index], arr[newIdx]] = [arr[newIdx], arr[index]];
    await onSave(arr);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-navy-900/50 backdrop-blur-md border rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/10 rounded-2xl border border-amber-500/20">
          <Award className="w-5 h-5 text-amber-600" />
          <span className="font-bold text-amber-900 dark:text-amber-100">
            {champions.length} <span className="font-medium opacity-60">Champions</span>
          </span>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onSave(champions)} disabled={isSaving} className="rounded-2xl h-12 px-6 bg-navy-950 hover:bg-navy-900 text-white font-bold">
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Publish
          </Button>
          <Button onClick={openAdd} variant="outline" className="rounded-2xl h-12 px-6 border-2 border-dashed border-amber-500/30 text-amber-600 hover:bg-amber-50/50 hover:border-amber-500 font-bold">
            <Plus className="w-5 h-5 mr-2" /> Add Champion
          </Button>
        </div>
      </div>

      {/* Champions list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {champions.map((champion, index) => (
            <motion.div
              key={`${champion.year}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className={cn(
                "group h-full flex flex-col bg-white dark:bg-navy-900 border shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden",
                champion.isActive === false ? "opacity-60 bg-gray-50/50" : ""
              )}>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center shadow-sm">
                        <Trophy className="w-8 h-8" />
                      </div>
                      {champion.isActive === false && (
                        <div className="absolute -top-2 -left-2">
                          <Badge variant="secondary" className="font-black uppercase tracking-tighter shadow-sm bg-navy-950 text-white border-none">HIDDEN</Badge>
                        </div>
                      )}
                    </div>
                    {/* Actions */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="rounded-xl w-8 h-8" onClick={() => openEdit(index)}>
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="destructive" className="rounded-xl w-8 h-8" onClick={() => removeChampion(index)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-navy-950/40">Season</span>
                      <h3 className="text-3xl font-black italic text-navy-950 dark:text-white">MCI {champion.year}</h3>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-gold-500">Mediation Counsel</span>
                      <p className="text-sm font-semibold text-navy-950 dark:text-white">{champion.counselNames || "TBD"}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-gold-500">Mediator</span>
                      <p className="text-sm font-semibold text-navy-950 dark:text-white">{champion.mediatorName || "TBD"}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-4 pt-0 border-t flex gap-1 items-center justify-between mt-auto">
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => moveChampion(index, "up")} disabled={index === 0}>
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => moveChampion(index, "down")} disabled={index === champions.length - 1}>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[11px] font-bold uppercase text-amber-600 hover:bg-amber-50 rounded-xl h-8" onClick={() => openEdit(index)}>
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
        
      {champions.length === 0 && (
        <button onClick={openAdd} className="w-full h-40 flex flex-col items-center justify-center bg-gray-50/50 border-2 border-dashed border-navy-100 rounded-3xl hover:border-amber-500/30 group">
          <Plus className="w-8 h-8 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-navy-950/40 uppercase">Add First Champion</span>
        </button>
      )}

      {/* Champion Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md w-[95vw] p-0 overflow-hidden rounded-4xl border-none bg-white">
          <div className="bg-navy-950 p-6 text-white shrink-0">
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
              <Award className="w-5 h-5 text-gold-500" />
              {editingIndex !== null ? "Edit Champion" : "Add Champion"}
            </DialogTitle>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Year *</Label>
              <Input value={tempChampion.year} onChange={e => setTempChampion(p => ({ ...p, year: e.target.value }))} placeholder="e.g. 2024" />
            </div>
            <div className="space-y-2">
              <Label>Mediation Counsel (Names) *</Label>
              <Input value={tempChampion.counselNames} onChange={e => setTempChampion(p => ({ ...p, counselNames: e.target.value }))} placeholder="e.g. Jane Doe & John Smith" />
            </div>
            <div className="space-y-2">
              <Label>Mediator (Name) *</Label>
              <Input value={tempChampion.mediatorName} onChange={e => setTempChampion(p => ({ ...p, mediatorName: e.target.value }))} placeholder="e.g. Vikramaditya" />
            </div>

            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-navy-50/50 mt-4">
              <div className="space-y-0.5">
                <Label className="text-xs font-black uppercase tracking-widest text-navy-950/60">Active Status</Label>
                <p className="text-[10px] text-navy-950/40 font-medium">Toggle to show/hide on public website</p>
              </div>
              <Switch 
                checked={tempChampion.isActive ?? true}
                onCheckedChange={(val) => setTempChampion(p => ({ ...p, isActive: val }))}
              />
            </div>
          </div>

          <DialogFooter className="p-6 pt-0 bg-white flex justify-end gap-3 rounded-b-4xl">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveChampion} className="bg-navy-950 text-white font-bold">
              {editingIndex !== null ? "Save Changes" : "Add Champion"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
