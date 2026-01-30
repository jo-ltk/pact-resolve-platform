"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ExternalLink,
  Eye,
  EyeOff,
  Star,
  Newspaper,
  Loader2,
  Filter,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAuth } from "@/lib/context/AuthContext";
import { NewsItem, NewsType } from "@/lib/db/schemas";

const newsTypes: NewsType[] = ["Podcast", "Article", "Blog", "Book", "Press Release", "Event"];

export default function NewsAdminPage() {
  const { isAdmin, token } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<NewsItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/content/news?all=true");
      const result = await response.json();
      if (result.success) {
        setNews(result.data || []);
      } else {
        toast.error(result.error || "Failed to fetch news");
      }
    } catch (error) {
      toast.error("An error occurred while fetching news");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    try {
      const response = await fetch(`/api/content/news?id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        toast.success("News item deleted");
        setNews(news.filter(n => (n._id as any).toString() !== id));
      } else {
        toast.error(result.error || "Failed to delete");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleToggleStatus = async (item: NewsItem, field: 'isActive' | 'isFeatured') => {
    const updatedItem = { ...item, [field]: !item[field] };
    try {
      const response = await fetch("/api/content/news", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedItem)
      });
      const result = await response.json();
      if (result.success) {
        setNews(news.map(n => n._id === item._id ? updatedItem : n));
        toast.success(`${field} status updated`);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const method = editingItem?._id ? "PUT" : "POST";
      const response = await fetch("/api/content/news", {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editingItem)
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success(editingItem?._id ? "News item updated" : "News item created");
        setIsDialogOpen(false);
        fetchNews();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const openCreateDialog = () => {
    setEditingItem({
      type: "Article",
      title: "",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: { url: "", alt: "" },
      link: "",
      order: news.length + 1,
      isActive: true,
      isFeatured: false
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: NewsItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-4">
          <Link href="/admin/home-page" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-navy-950 flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-accent" />
            News Management
          </h1>
          <p className="text-muted-foreground">Create and manage news items, podcasts, and articles.</p>
        </div>
        <Button 
          onClick={openCreateDialog}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add News Item
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search by title or type..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            <Button variant="outline" className="rounded-xl gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          <div className="rounded-2xl border overflow-hidden overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[80px]">Order</TableHead>
                  <TableHead className="w-[100px]">Thumbnail</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="text-right w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                      <TableCell><Skeleton className="h-12 w-16 rounded-md" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredNews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                      No news items found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredNews.map((item) => (
                    <TableRow key={(item._id as any).toString()} className="hover:bg-muted/30 transition-colors group">
                      <TableCell className="font-mono text-xs">{item.order}</TableCell>
                      <TableCell>
                        <div className="w-16 h-10 rounded-lg overflow-hidden border bg-muted shrink-0">
                          {item.image?.url ? (
                            <div className="relative w-full h-full">
                              <Image 
                                src={item.image.url} 
                                alt={item.image.alt || item.title} 
                                fill
                                className="object-cover" 
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Newspaper className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-navy-950">
                        <div className="max-w-[200px] sm:max-w-[300px] md:max-w-[400px]">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="line-clamp-2" title={item.title}>{item.title}</span>
                          </div>
                          {item.isFeatured && (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200 text-[10px] h-5 px-2 inline-flex">
                              <Star className="w-3 h-3 mr-1 fill-amber-500" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium whitespace-nowrap">
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm whitespace-nowrap">{item.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <Switch 
                             checked={item.isActive} 
                             onCheckedChange={() => handleToggleStatus(item, 'isActive')}
                             className="data-[state=checked]:bg-emerald-500 scale-90"
                           />
                           <span className="text-xs font-medium">
                             {item.isActive ? "Active" : "Hidden"}
                           </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="group-hover:bg-background h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl border-border">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openEditDialog(item)} className="cursor-pointer gap-2">
                              <Edit className="w-4 h-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(item, 'isFeatured')} className="cursor-pointer gap-2">
                              <Star className="w-4 h-4" /> {item.isFeatured ? "Unfeature" : "Make Featured"}
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href={item.link} target="_blank" rel="noopener noreferrer" className="cursor-pointer gap-2 flex items-center">
                                <ExternalLink className="w-4 h-4" /> Preview Link
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete((item._id as any).toString())}
                              className="cursor-pointer gap-2 text-red-500 focus:text-red-500 focus:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" /> Delete Item
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Editor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 border-none shadow-2xl rounded-4xl overflow-hidden bg-white flex flex-col">
          <form onSubmit={handleSave} className="flex flex-col h-full max-h-[90vh]">
            <DialogHeader className="p-8 bg-navy-950 text-white shrink-0">
              <DialogTitle className="text-2xl font-bold">
                {editingItem?._id ? "Edit News Item" : "Create News Item"}
              </DialogTitle>
              <DialogDescription className="text-blue-100">
                Update the information for this news piece. Changes reflect immediately on the website.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-none">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Content Type</Label>
                  <Select 
                    value={editingItem?.type} 
                    onValueChange={(val) => setEditingItem(prev => ({ ...prev!, type: val as NewsType }))}
                  >
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {newsTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Publication Date</Label>
                  <Input 
                    id="date"
                    value={editingItem?.date}
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, date: e.target.value }))}
                    placeholder="e.g., Aug 24, 2025"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Headline Title</Label>
                <Input 
                  id="title"
                  value={editingItem?.title}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))}
                  placeholder="Enter a catchy headline"
                  className="rounded-xl h-11"
                  required
                />
              </div>

              <ImageUpload 
                label="Featured Image"
                description="This image will be displayed on the card (Recommended: 16:9 aspect ratio)"
                value={editingItem?.image?.url}
                onChange={(url) => setEditingItem(prev => ({ ...prev!, image: { ...prev!.image, url, alt: prev!.title || "News Image" } }))}
              />

              <div className="space-y-2">
                <Label htmlFor="link">Content Link (External URL)</Label>
                <div className="relative group">
                  <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="link"
                    value={editingItem?.link}
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, link: e.target.value }))}
                    placeholder="https://example.com/blog-post"
                    className="pl-10 rounded-xl h-11"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 py-4 bg-muted/30 p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Visibility Status</Label>
                    <p className="text-xs text-muted-foreground">Show this item on the website</p>
                  </div>
                  <Switch 
                    checked={editingItem?.isActive}
                    onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isActive: val }))}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Featured Content</Label>
                    <p className="text-xs text-muted-foreground">Show in featured section</p>
                  </div>
                  <Switch 
                    checked={editingItem?.isFeatured}
                    onCheckedChange={(val) => setEditingItem(prev => ({ ...prev!, isFeatured: val }))}
                    className="data-[state=checked]:bg-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input 
                  id="order"
                  type="number"
                  value={editingItem?.order}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, order: parseInt(e.target.value) }))}
                  className="rounded-xl h-11 w-32"
                />
              </div>
            </div>

            <DialogFooter className="p-8 border-t bg-gray-50/80 backdrop-blur-sm shrink-0">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl h-11 px-6 font-semibold"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="rounded-xl h-11 px-8 bg-navy-950 hover:bg-navy-900 text-white font-bold shadow-lg shadow-navy-950/10 transition-all active:scale-95"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  editingItem?._id ? "Update Content" : "Create Item"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
