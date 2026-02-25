"use client";

import React, { useEffect, useState } from "react";
import { Save, Loader2, Settings2, FileText } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/admin/FileUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { RulesFeesSettings } from "@/lib/db/schemas";

export function GeneralSettings() {
  const { token } = useAuth();
  const [settings, setSettings] = useState<Partial<RulesFeesSettings>>({
    rulesPdfUrl: "",
    feesPdfUrl: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/content/mediation/rules-fees-settings");
      const result = await response.json();
      if (result.success) {
        setSettings(result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch settings");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      const response = await fetch("/api/content/mediation/rules-fees-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Settings updated successfully");
      } else {
        toast.error(result.error || "Failed to update settings");
      }
    } catch (error) {
      toast.error("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
          <CardHeader className="pb-4">
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-950 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <CardTitle className="text-xl font-bold text-navy-950 italic">Mediation Rules PDF</CardTitle>
            <CardDescription>Upload the official PACT Mediation Rules document.</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              value={settings.rulesPdfUrl}
              onChange={(url) => setSettings(prev => ({ ...prev, rulesPdfUrl: url }))}
              label="Rules PDF"
              description="This will be available for download on the public Rules & Fees page."
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
          <CardHeader className="pb-4">
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-950 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <CardTitle className="text-xl font-bold text-navy-950 italic">Mediation Fee PDF</CardTitle>
            <CardDescription>Upload the official Mediation Fee schedule document.</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              value={settings.feesPdfUrl}
              onChange={(url) => setSettings(prev => ({ ...prev, feesPdfUrl: url }))}
              label="Fee Schedule PDF"
              description="This will be available for download on the public Rules & Fees page."
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-navy-950 text-white rounded-xl px-10 py-6 h-auto text-sm font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-navy-950 transition-all shadow-xl"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
