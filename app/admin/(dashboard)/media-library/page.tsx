"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Upload, 
  Search, 
  LayoutGrid, 
  List, 
  Copy, 
  Trash2, 
  ExternalLink,
  Library,
  Loader2,
  FileText,
  Check,
  Filter,
  Info
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/context/AuthContext";

export default function MediaLibraryPage() {
  const { token, isAdmin } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Since we don't have a list API, we'll keep a session-based list 
  // and encourage users to use the audit logs for history if needed.
  // In a real app, this would be backed by a Media collection.
  const [mediaItems, setMediaItems] = useState<any[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: formData,
          });

          const result = await response.json();
          if (result.success) {
            setMediaItems(prev => [result.data, ...prev]);
            successCount++;
          } else {
            toast.error(`Failed to upload ${file.name}: ${result.error}`);
          }
        } catch (error) {
          toast.error(`Error uploading ${file.name}`);
        }
    }

    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} file(s)`);
    }
    setIsUploading(false);
    // Reset input
    e.target.value = "";
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaItems.filter(item => 
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-950 flex items-center gap-3">
            <Library className="w-8 h-8 text-accent" />
            Media Library
          </h1>
          <p className="text-muted-foreground">Upload and manage your assets on Cloudinary.</p>
        </div>
        <div className="flex gap-2">
          <label className="cursor-pointer">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg ring-offset-background transition-all active:scale-95">
              <span>
                {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                Upload New Media
              </span>
            </Button>
            <input type="file" className="hidden" multiple onChange={handleUpload} disabled={isUploading} accept="image/*,application/pdf" />
          </label>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden min-h-[500px]">
        <CardContent className="p-0">
          <div className="p-6 border-b flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/20">
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search files..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex bg-muted p-1 rounded-xl">
                <Button 
                  variant={view === "grid" ? "outline" : "ghost"} 
                  size="sm" 
                  onClick={() => setView("grid")}
                  className={view === "grid" ? "shadow-sm rounded-lg" : "rounded-lg"}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={view === "list" ? "outline" : "ghost"} 
                  size="sm" 
                  onClick={() => setView("list")}
                  className={view === "list" ? "shadow-sm rounded-lg" : "rounded-lg"}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline" className="rounded-xl gap-2">
                <Filter className="w-4 h-4" />
                Sort
              </Button>
            </div>
          </div>

          <div className="p-8">
            {mediaItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                  <Library className="w-10 h-10 text-muted-foreground/40" />
                </div>
                <h3 className="text-xl font-bold text-navy-950 mb-2">Your library is empty</h3>
                <p className="text-muted-foreground max-w-sm mb-8">
                  Upload images or documents to get started. They will be hosted securely on Cloudinary.
                </p>
                <label className="cursor-pointer">
                  <Button variant="outline" asChild className="rounded-xl px-8 border-dashed border-2 hover:border-primary hover:bg-primary/5">
                    <span>Click to Upload</span>
                  </Button>
                  <input type="file" className="hidden" multiple onChange={handleUpload} accept="image/*,application/pdf" />
                </label>
              </div>
            ) : (
              <>
                {view === "grid" ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredMedia.map((item) => (
                      <Card key={item.publicId} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white">
                        <div className="relative aspect-square bg-muted flex items-center justify-center overflow-hidden">
                          {item.mimeType.startsWith("image/") ? (
                            <Image 
                              src={item.url} 
                              alt={item.filename} 
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                          ) : (
                            <FileText className="w-12 h-12 text-muted-foreground" />
                          )}
                          
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                            <Button 
                              size="sm" 
                              className="w-full rounded-xl bg-white text-navy-950 hover:bg-white/90 gap-2"
                              onClick={() => copyToClipboard(item.url, item.publicId)}
                            >
                              {copiedId === item.publicId ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              {copiedId === item.publicId ? "Copied" : "Copy URL"}
                            </Button>
                            <div className="flex w-full gap-2">
                              <Button size="icon" variant="secondary" className="flex-1 rounded-xl bg-white/20 hover:bg-white/30 border-none text-white backdrop-blur-sm" asChild>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                              <Button size="icon" variant="destructive" className="flex-1 rounded-xl shadow-lg border-none">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-semibold truncate text-navy-950 mb-1">{item.filename}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 bg-muted text-muted-foreground border-none">
                              {item.mimeType.split("/")[1].toUpperCase()}
                            </Badge>
                            <span className="text-[9px] text-muted-foreground">{(item.size / 1024).toFixed(1)} KB</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                     {filteredMedia.map((item) => (
                       <div key={item.publicId} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-muted group">
                         <div className="relative w-12 h-12 rounded-lg bg-muted shrink-0 overflow-hidden border">
                          {item.mimeType.startsWith("image/") ? (
                            <Image src={item.url} alt={item.filename} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileText className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-navy-950 truncate">{item.filename}</p>
                          <p className="text-xs text-muted-foreground">{(item.size / 1024).toFixed(1)} KB &bull; {item.mimeType}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="rounded-lg" onClick={() => copyToClipboard(item.url, item.publicId)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-lg" asChild>
                             <a href={item.url} target="_blank" rel="noopener noreferrer">
                               <ExternalLink className="w-4 h-4" />
                             </a>
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex gap-4 items-start">
        <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-navy-950 text-sm mb-1">Upload History & Persistence</h4>
          <p className="text-xs text-blue-800 leading-relaxed">
            The media library displays files uploaded in the current session. For full historical access and asset management, use the Cloudinary Console or check the Audit Logs section which tracks every upload action.
          </p>
        </div>
      </div>
    </div>
  );
}
