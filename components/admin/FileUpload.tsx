"use client";

import React, { useState } from "react";
import { Upload, X, Loader2, FileText, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
}

export function FileUpload({ 
  value, 
  onChange, 
  label = "PDF Document", 
  description,
  accept = ".pdf,application/pdf",
  maxSizeMB = 10,
  className 
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [useUrl, setUseUrl] = useState(false);
  const [urlValue, setUrlValue] = useState(value || "");
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setIsUploading(true);
    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      onChange(result.data.url);
      setUrlValue(result.data.url);
      toast.success("File uploaded successfully");
    } catch (error: any) {
      toast.error(error.message);
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    onChange("");
    setUrlValue("");
    setFileName("");
  };

  const displayName = fileName || (value ? value.split("/").pop() : "");

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          {label && (
            <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-navy-950/40 ml-1">
              {label}
            </Label>
          )}
          {description && <p className="text-xs text-muted-foreground ml-1">{description}</p>}
        </div>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="text-xs h-7 gap-1.5"
          onClick={() => setUseUrl(!useUrl)}
        >
          {useUrl ? <Upload className="w-3 h-3" /> : <LinkIcon className="w-3 h-3" />}
          {useUrl ? "Upload File" : "Use URL"}
        </Button>
      </div>

      {value ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-navy-50/50 border border-navy-100/50 group">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-rose-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-navy-950 truncate">
              {displayName || "Uploaded file"}
            </p>
            <a 
              href={value} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gold-500 hover:underline truncate block"
            >
              {value}
            </a>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={removeFile}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {useUrl ? (
            <div className="flex gap-2">
              <Input 
                placeholder="https://example.com/document.pdf" 
                value={urlValue}
                onChange={(e) => {
                  setUrlValue(e.target.value);
                  onChange(e.target.value);
                }}
                className="flex-1 h-12 rounded-xl bg-navy-50/50 border-none focus-visible:ring-primary/20"
              />
            </div>
          ) : (
            <label className={cn(
              "flex flex-col items-center justify-center w-full py-8 rounded-2xl border-2 border-dashed border-navy-200/30 bg-navy-50/30 hover:bg-navy-50/60 hover:border-gold-500/40 transition-all cursor-pointer group",
              isUploading && "pointer-events-none opacity-60"
            )}>
              <div className="flex flex-col items-center justify-center text-center px-6">
                {isUploading ? (
                  <>
                    <Loader2 className="w-8 h-8 text-gold-500 animate-spin mb-3" />
                    <p className="text-sm text-navy-950/60 font-medium">Uploading {fileName}...</p>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-navy-100/50 rounded-xl mb-3 group-hover:bg-gold-500/10 transition-colors">
                      <Upload className="w-5 h-5 text-navy-950/40 group-hover:text-gold-500" />
                    </div>
                    <p className="text-sm font-semibold text-navy-950/70 mb-1">Click to upload a PDF</p>
                    <p className="text-xs text-navy-950/40">PDF up to {maxSizeMB}MB</p>
                  </>
                )}
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept={accept}
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
}
