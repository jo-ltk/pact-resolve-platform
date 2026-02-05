"use client";

import React, { useEffect, useState } from "react";
import { Plus, MoreHorizontal, Settings, Loader2, ArrowLeft, IndianRupee, CheckCircle2, X, PlusCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/lib/context/AuthContext";
import { AcademyCourse, AcademyCourseType } from "@/lib/db/schemas";

const PROGRAM = "arbitration";
const BACK_LINK = "/admin/academy/arbitration";
const PAGE_TITLE = "Arbitration";

export default function ArbitrationCoursesPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<AcademyCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<AcademyCourse> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/content/academy/courses?all=true&program=${PROGRAM}`);
      const result = await response.json();
      if (result.success) setItems(result.data || []);
      else toast.error(result.error || "Failed to fetch courses");
    } catch { toast.error("An error occurred"); } finally { setIsLoading(false); }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/content/academy/courses?id=${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      const result = await response.json();
      if (result.success) { toast.success("Deleted"); setItems(items.filter(i => (i._id as any).toString() !== id)); }
      else toast.error(result.error);
    } catch { toast.error("Delete failed"); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = editingItem?._id ? "PUT" : "POST";
      const response = await fetch("/api/content/academy/courses", { method, headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify({ ...editingItem, program: PROGRAM }) });
      const result = await response.json();
      if (result.success) { toast.success(editingItem?._id ? "Updated" : "Created"); setIsDialogOpen(false); fetchItems(); }
      else toast.error(result.error);
    } catch { toast.error("Save failed"); } finally { setIsSaving(false); }
  };

  const openCreateDialog = () => {
    setEditingItem({ program: PROGRAM, courseType: "foundational", title: "", subtitle: "", mode: "Online", liveSession: "", assessment: "", certification: "", feeAmount: 0, feeCurrency: "INR", feeNote: "+ GST", ctaText: "Enrol Now", ctaLink: "", benefits: [""], enrollmentStatus: "Open", order: items.length + 1, isActive: true });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: AcademyCourse) => { setEditingItem(item); setIsDialogOpen(true); };

  const foundationalCourse = items.find(i => i.courseType === "foundational");
  const advancedCourse = items.find(i => i.courseType === "advanced");

  const renderCourseCard = (course: AcademyCourse | undefined, type: "foundational" | "advanced", isDark = false) => {
    if (!course) return (
      <Card className="rounded-3xl border-2 border-dashed border-navy-100 bg-white/50 flex items-center justify-center min-h-[300px]">
        <div className="text-center p-8">
          <Settings className="w-12 h-12 text-navy-200 mx-auto mb-4" />
          <p className="text-navy-950/40 font-medium mb-4">No {type === "foundational" ? "Foundation" : "Certificate"} Course</p>
          <Button onClick={openCreateDialog}>Add Course</Button>
        </div>
      </Card>
    );
    return (
      <Card className={`group hover:shadow-2xl transition-all duration-500 rounded-3xl border-none shadow-sm overflow-hidden ${isDark ? "bg-navy-950 text-white" : "bg-white"}`}>
        <CardHeader className={`p-6 ${isDark ? "bg-gradient-to-br from-navy-900 to-navy-950 border-b border-white/10" : "bg-gradient-to-br from-amber-50 to-white border-b border-navy-100/30"}`}>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Badge variant={course.isActive ? "success" : "secondary"} className="rounded-full text-[10px] uppercase font-bold border-none px-3">{course.isActive ? "Active" : "Hidden"}</Badge>
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-navy-950"}`}>{course.title}</h3>
              <p className={`text-sm ${isDark ? "text-white/50" : "text-navy-950/50"}`}>{course.subtitle}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className={`h-10 w-10 rounded-full ${isDark ? "text-white hover:bg-white/10" : ""}`}><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                <DropdownMenuItem onClick={() => openEditDialog(course)}>Edit Course</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete((course._id as any).toString())} className="text-red-500">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className={`flex items-center gap-2 text-3xl font-bold ${isDark ? "text-gold-400" : "text-accent"}`}>
            <IndianRupee className="w-6 h-6" />{course.feeAmount?.toLocaleString()}<span className={`text-sm font-normal ${isDark ? "text-white/50" : "text-navy-950/50"}`}>{course.feeNote}</span>
          </div>
          <div className={`grid grid-cols-2 gap-4 text-sm ${isDark ? "text-white/70" : ""}`}>
            <div><span className={isDark ? "text-white/40" : "text-navy-950/40"}>Mode:</span> {course.mode}</div>
            <div><span className={isDark ? "text-white/40" : "text-navy-950/40"}>Live:</span> {course.liveSession}</div>
            <div><span className={isDark ? "text-white/40" : "text-navy-950/40"}>Assessment:</span> {course.assessment}</div>
            <div><span className={isDark ? "text-white/40" : "text-navy-950/40"}>Certification:</span> {course.certification}</div>
          </div>
          <div className={`pt-4 border-t ${isDark ? "border-white/10" : "border-navy-100/30"}`}>
            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? "text-white/40" : "text-navy-950/40"}`}>Key Benefits</p>
            <ul className="space-y-1">
              {course.benefits?.slice(0, 3).map((b, i) => (
                <li key={i} className={`text-sm flex items-center gap-2 ${isDark ? "text-white/70" : "text-navy-950/70"}`}>
                  <CheckCircle2 className={`w-4 h-4 ${isDark ? "text-gold-400" : "text-emerald-500"}`} />{b}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link href={BACK_LINK} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to {PAGE_TITLE}</Link>
          <h1 className="text-3xl font-bold text-navy-950 flex items-center gap-3"><Settings className="w-8 h-8 text-accent" />Course Settings</h1>
          <p className="text-muted-foreground">Configure course metadata and pricing for {PAGE_TITLE} courses.</p>
        </div>
        <Button onClick={openCreateDialog} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 shadow-lg shadow-primary/20"><Plus className="w-4 h-4 mr-2" />Add Course</Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {isLoading ? Array.from({ length: 2 }).map((_, i) => <Card key={i} className="rounded-3xl overflow-hidden border-none shadow-sm"><Skeleton className="h-80 w-full" /></Card>) : (
          <>{renderCourseCard(foundationalCourse, "foundational")}{renderCourseCard(advancedCourse, "advanced", true)}</>
        )}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[95vh] p-0 border-none shadow-2xl rounded-4xl overflow-hidden bg-white flex flex-col">
          <form onSubmit={handleSave} className="flex flex-col h-full overflow-hidden">
            <DialogHeader className="p-8 bg-navy-950 text-white shrink-0">
              <DialogTitle className="text-2xl font-bold">{editingItem?._id ? "Edit Course" : "Create Course"}</DialogTitle>
              <DialogDescription className="text-blue-100">Configure course settings and pricing.</DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2"><Label>Course Type</Label><Select value={editingItem?.courseType} onValueChange={(val) => setEditingItem(prev => ({ ...prev!, courseType: val as AcademyCourseType }))}><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="foundational">Foundation Course</SelectItem><SelectItem value="advanced">Certificate Course</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={editingItem?.order || 1} onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) }))} /></div>
              </div>
              <div className="space-y-2"><Label>Course Title</Label><Input value={editingItem?.title || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))} placeholder="e.g. Foundation Course in Arbitration" required /></div>
              <div className="space-y-2"><Label>Subtitle</Label><Input value={editingItem?.subtitle || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, subtitle: e.target.value }))} placeholder="e.g. Master arbitration advocacy" /></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2"><Label>Course Mode</Label><Input value={editingItem?.mode || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, mode: e.target.value }))} placeholder="e.g. Online (20 Videos)" /></div>
                <div className="space-y-2"><Label>Live Session</Label><Input value={editingItem?.liveSession || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, liveSession: e.target.value }))} placeholder="e.g. One Live Session" /></div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2"><Label>Assessment</Label><Input value={editingItem?.assessment || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, assessment: e.target.value }))} placeholder="Quiz Based" /></div>
                <div className="space-y-2"><Label>Certification</Label><Input value={editingItem?.certification || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, certification: e.target.value }))} placeholder="PACT Certificate" /></div>
              </div>
              <div className="grid grid-cols-3 gap-6 bg-muted/30 p-6 rounded-2xl border border-dashed border-muted-foreground/20">
                <div className="space-y-2"><Label className="text-xs uppercase font-bold text-muted-foreground">Fee Amount</Label><Input type="number" value={editingItem?.feeAmount || 0} onChange={(e) => setEditingItem(prev => ({ ...prev!, feeAmount: parseFloat(e.target.value) }))} /></div>
                <div className="space-y-2"><Label className="text-xs uppercase font-bold text-muted-foreground">Currency</Label><Input value={editingItem?.feeCurrency || "INR"} onChange={(e) => setEditingItem(prev => ({ ...prev!, feeCurrency: e.target.value }))} /></div>
                <div className="space-y-2"><Label className="text-xs uppercase font-bold text-muted-foreground">Fee Note</Label><Input value={editingItem?.feeNote || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, feeNote: e.target.value }))} placeholder="+ GST" /></div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2"><Label>CTA Button Text</Label><Input value={editingItem?.ctaText || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, ctaText: e.target.value }))} placeholder="Enrol Now" /></div>
                <div className="space-y-2"><Label>CTA Link</Label><Input value={editingItem?.ctaLink || ""} onChange={(e) => setEditingItem(prev => ({ ...prev!, ctaLink: e.target.value }))} placeholder="mailto:..." /></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between"><Label>Key Benefits</Label><Button type="button" variant="outline" size="sm" className="h-8 rounded-lg" onClick={() => setEditingItem(prev => ({ ...prev!, benefits: [...(prev!.benefits || []), ""] }))}><PlusCircle className="w-4 h-4 mr-2" /> Add Benefit</Button></div>
                <div className="space-y-3">{editingItem?.benefits?.map((b, idx) => (<div key={idx} className="flex gap-2"><Input value={b} onChange={(e) => { const newBenefits = [...editingItem.benefits!]; newBenefits[idx] = e.target.value; setEditingItem(prev => ({ ...prev!, benefits: newBenefits })); }} placeholder={`Benefit ${idx + 1}`} /><Button type="button" variant="ghost" size="icon" onClick={() => { const newBenefits = editingItem.benefits!.filter((_, i) => i !== idx); setEditingItem(prev => ({ ...prev!, benefits: newBenefits })); }}><X className="w-4 h-4 text-red-500" /></Button></div>))}</div>
              </div>
              <div className="flex items-center gap-4 border p-4 rounded-xl"><div className="flex-1"><Label className="block mb-1">Status</Label><p className="text-xs text-muted-foreground">Visible on frontend</p></div><Switch checked={editingItem?.isActive || false} onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))} /></div>
            </div>
            <DialogFooter className="p-8 border-t bg-gray-50/80 backdrop-blur-sm shrink-0">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-navy-950 text-white" disabled={isSaving}>{isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}{editingItem?._id ? "Update Course" : "Create Course"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
