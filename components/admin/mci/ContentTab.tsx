"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, FileText, Image as ImageIcon, Calendar, MapPin, Users2, Briefcase, Upload, X, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { MCIEvent } from "@/lib/db/schemas";

interface ContentTabProps {
  eventData: MCIEvent | null;
  isSaving: boolean;
  token: string | null;
  onSaved: (updated: Partial<MCIEvent>) => void;
}

export function ContentTab({ eventData, isSaving: parentSaving, token, onSaved }: ContentTabProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);

  const [form, setForm] = useState({
    subtitle: "",
    title: ["", "", ""],
    heroDesc0: "",
    heroDesc1: "",
    dates: "",
    venue: "",
    hosts: "",
    sponsors: "",
    visionDesc0: "",
    visionDesc1: "",
    brochurePdfUrl: "",
    heroImageUrl: "",
    visionImageUrl: "",
  });

  useEffect(() => {
    if (!eventData) return;
    setForm({
      subtitle: eventData.subtitle || "",
      title: eventData.title?.length ? [...eventData.title] : ["MEDIATION", "CHAMPIONSHIP", "INDIA"],
      heroDesc0: eventData.heroDescription?.[0] || "",
      heroDesc1: eventData.heroDescription?.[1] || "",
      dates: eventData.eventDetails?.dates || "",
      venue: eventData.eventDetails?.venue || "",
      hosts: eventData.eventDetails?.hosts || "",
      sponsors: eventData.eventDetails?.sponsors || "",
      visionDesc0: eventData.vision?.description?.[0] || "",
      visionDesc1: eventData.vision?.description?.[1] || "",
      brochurePdfUrl: eventData.vision?.brochurePdfUrl || "",
      heroImageUrl: eventData.heroImage?.url || "",
      visionImageUrl: eventData.visionImage?.url || "",
    });
  }, [eventData]);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") { toast.error("Please upload a PDF file"); return; }
    if (file.size > 10 * 1024 * 1024) { toast.error("PDF must be under 10MB"); return; }
    setIsUploadingPdf(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const result = await res.json();
      const url = result.url || result.data?.url;
      if (!url) throw new Error("No URL returned");
      setForm(p => ({ ...p, brochurePdfUrl: url }));
      toast.success("PDF uploaded!");
    } catch (err: any) {
      toast.error(err.message || "PDF upload failed");
    } finally {
      setIsUploadingPdf(false);
      e.target.value = "";
    }
  };

  const handleSaveContent = async () => {
    if (!eventData?._id) { toast.error("No event record to update. Please save gallery first."); return; }
    setIsSaving(true);
    try {
      const payload = {
        ...eventData,
        subtitle: form.subtitle,
        title: form.title.filter(Boolean),
        heroDescription: [form.heroDesc0, form.heroDesc1].filter(Boolean),
        eventDetails: {
          dates: form.dates,
          venue: form.venue,
          hosts: form.hosts,
          sponsors: form.sponsors,
        },
        vision: {
          ...(eventData.vision || {}),
          description: [form.visionDesc0, form.visionDesc1].filter(Boolean),
          brochurePdfUrl: form.brochurePdfUrl,
        },
        heroImage: { url: form.heroImageUrl, alt: "MCI Hero" },
        visionImage: { url: form.visionImageUrl, alt: "MCI Vision" },
      };
      const res = await fetch("/api/content/mci-event", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Page content saved!");
        onSaved(payload);
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch (e) {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const saving = isSaving || parentSaving;

  return (
    <div className="space-y-8">
      {/* Save bar */}
      <div className="flex justify-between items-center bg-white dark:bg-navy-900/50 border rounded-3xl p-6 shadow-sm">
        <div>
          <h3 className="font-bold text-navy-950 dark:text-white">Page Content Editor</h3>
          <p className="text-sm text-muted-foreground">Edit the text and images shown on the public MCI page.</p>
        </div>
        <Button onClick={handleSaveContent} disabled={saving} className="rounded-2xl h-12 px-8 bg-navy-950 hover:bg-navy-900 text-white font-bold">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Content
        </Button>
      </div>

      {/* Hero Section */}
      <Section title="Hero Section" icon={<ImageIcon className="w-4 h-4" />} color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Field label="Top Subtitle Line">
              <Input value={form.subtitle} onChange={e => setForm(p => ({ ...p, subtitle: e.target.value }))} placeholder="India's Premier Mediation Event" />
            </Field>
            <Field label="Title Line 1">
              <Input value={form.title[0]} onChange={e => setForm(p => ({ ...p, title: [e.target.value, p.title[1], p.title[2]] }))} placeholder="MEDIATION" />
            </Field>
            <Field label="Title Line 2 (gold highlight)">
              <Input value={form.title[1]} onChange={e => setForm(p => ({ ...p, title: [p.title[0], e.target.value, p.title[2]] }))} placeholder="CHAMPIONSHIP" />
            </Field>
            <Field label="Title Line 3">
              <Input value={form.title[2]} onChange={e => setForm(p => ({ ...p, title: [p.title[0], p.title[1], e.target.value] }))} placeholder="INDIA" />
            </Field>
            <Field label="Hero Description (Paragraph 1)">
              <Textarea value={form.heroDesc0} onChange={e => setForm(p => ({ ...p, heroDesc0: e.target.value }))} className="min-h-[80px] resize-none" placeholder="The fourth edition of India's Mediation Champions League..." />
            </Field>
            <Field label="Hero Description (Paragraph 2)">
              <Textarea value={form.heroDesc1} onChange={e => setForm(p => ({ ...p, heroDesc1: e.target.value }))} className="min-h-[80px] resize-none" placeholder="The flagship event also serves as a great space..." />
            </Field>
          </div>
          <div className="space-y-2">
            <Label>Hero Background Image</Label>
            <ImageUpload value={form.heroImageUrl} onChange={url => setForm(p => ({ ...p, heroImageUrl: url }))} />
            <p className="text-xs text-muted-foreground">Shown as the full-screen background on the hero section</p>
          </div>
        </div>
      </Section>

      {/* Event Details */}
      <Section title="Event Details" icon={<Calendar className="w-4 h-4" />} color="blue">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Dates"><Input value={form.dates} onChange={e => setForm(p => ({ ...p, dates: e.target.value }))} placeholder="September 2026" /></Field>
          <Field label="Venue / City"><Input value={form.venue} onChange={e => setForm(p => ({ ...p, venue: e.target.value }))} placeholder="New Delhi" /></Field>
          <Field label="Hosts"><Input value={form.hosts} onChange={e => setForm(p => ({ ...p, hosts: e.target.value }))} placeholder="GNLU, GIMAC..." /></Field>
          <Field label="Sponsors"><Input value={form.sponsors} onChange={e => setForm(p => ({ ...p, sponsors: e.target.value }))} placeholder="Coming Soon" /></Field>
        </div>
      </Section>

      {/* Vision Section */}
      <Section title="Vision Section" icon={<FileText className="w-4 h-4" />} color="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Field label="Vision Description (Paragraph 1)">
              <Textarea value={form.visionDesc0} onChange={e => setForm(p => ({ ...p, visionDesc0: e.target.value }))} className="min-h-[100px] resize-none" placeholder='Mediation Championship India - "MCI" - is a Mediation Champions League...' />
            </Field>
            <Field label="Vision Description (Paragraph 2)">
              <Textarea value={form.visionDesc1} onChange={e => setForm(p => ({ ...p, visionDesc1: e.target.value }))} className="min-h-[100px] resize-none" placeholder="Challengers showcase their wits..." />
            </Field>
            <Field label="Brochure PDF URL">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input value={form.brochurePdfUrl} onChange={e => setForm(p => ({ ...p, brochurePdfUrl: e.target.value }))} placeholder="https://... or upload PDF →" className="pl-8" />
                  </div>
                  <label className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm" className="h-10 pointer-events-none gap-1.5 rounded-xl whitespace-nowrap" disabled={isUploadingPdf}>
                      {isUploadingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      {isUploadingPdf ? "Uploading..." : "Upload PDF"}
                    </Button>
                    <input type="file" className="hidden" accept="application/pdf" onChange={handlePdfUpload} disabled={isUploadingPdf} />
                  </label>
                </div>
                {form.brochurePdfUrl && (
                  <div className="flex items-center gap-2 text-xs text-emerald-600">
                    <FileText className="w-3.5 h-3.5" />
                    <span className="truncate">{form.brochurePdfUrl}</span>
                    <button onClick={() => setForm(p => ({ ...p, brochurePdfUrl: "" }))} className="ml-auto shrink-0">
                      <X className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                )}
              </div>
            </Field>
          </div>
          <div className="space-y-2">
            <Label>Vision Section Image</Label>
            <ImageUpload value={form.visionImageUrl} onChange={url => setForm(p => ({ ...p, visionImageUrl: url }))} />
            <p className="text-xs text-muted-foreground">Large cinematic image in the "Globally Unique" section</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* Helper sub-components */
function Section({ title, icon, color, children }: { title: string; icon: React.ReactNode; color: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-700",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-700",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700",
  };
  return (
    <div className="bg-white dark:bg-navy-900/50 border rounded-3xl p-6 shadow-sm space-y-6">
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-bold ${colors[color] || colors.amber}`}>
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-navy-950/70">{label}</Label>
      {children}
    </div>
  );
}
