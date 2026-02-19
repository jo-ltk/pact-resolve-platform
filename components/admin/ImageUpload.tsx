"use client";

import React, { useState } from "react";
import { Upload, X, Loader2, ImageIcon, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label, description, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [useUrl, setUseUrl] = useState(false);
  const [urlValue, setUrlValue] = useState(value || "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
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
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message);
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    onChange("");
    setUrlValue("");
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          {label && <Label className="text-sm font-semibold">{label}</Label>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
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
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border group bg-muted/30">
          <img 
            src={value} 
            alt="Upload preview" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button 
              type="button" 
              variant="destructive" 
              size="icon" 
              className="rounded-full shadow-lg"
              onClick={removeImage}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {useUrl ? (
            <div className="flex gap-2">
              <Input 
                placeholder="https://example.com/image.jpg" 
                value={urlValue}
                onChange={(e) => {
                  setUrlValue(e.target.value);
                  onChange(e.target.value);
                }}
                className="flex-1"
              />
            </div>
          ) : (
            <label className={cn(
              "flex flex-col items-center justify-center w-full aspect-video rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-muted/5 hover:bg-muted/10 hover:border-accent/40 transition-all cursor-pointer group",
              isUploading && "pointer-events-none opacity-60"
            )}>
              <div className="flex flex-col items-center justify-center p-8 px-10 text-center">
                {isUploading ? (
                  <>
                    <Loader2 className="w-10 h-10 text-accent animate-spin mb-3" />
                    <p className="text-sm text-muted-foreground font-medium">Uploading your image...</p>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-muted rounded-2xl mb-3 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WebP up to 5MB</p>
                  </>
                )}
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
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
