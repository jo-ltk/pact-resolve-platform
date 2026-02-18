"use client";

import React, { useEffect, useState } from "react";
import { 
  History, 
  Search, 
  User as UserIcon, 
  Clock, 
  Filter, 
  ArrowUpDown,
  FileCode,
  Download,
  Calendar,
  Loader2,
  ShieldAlert
} from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/context/AuthContext";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

export default function AuditLogsPage() {
  const { token } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/audit-logs", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setLogs(result.data || []);
      } else {
        toast.error(result.error || "Failed to fetch logs");
      }
    } catch (error) {
      toast.error("An error occurred while fetching audit logs");
    } finally {
      setIsLoading(false);
    }
  }

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.userId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getActionBadge = (action: string) => {
    switch (action) {
      case "CREATE": return "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200";
      case "UPDATE": return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200";
      case "DELETE": return "bg-red-100 text-red-700 border-red-200 hover:bg-red-200";
      case "LOGIN": return "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200";
      case "FILE_UPLOAD": return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200";
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Header Section */}
      <FadeInUp className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-1">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em]">System Security</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Audit Logs
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Monitor and track all administrative actions, system events, and security alerts across the platform.
          </p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" size="lg" className="rounded-full gap-2 px-6 h-12 border-slate-200" onClick={fetchLogs} disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUpDown className="w-4 h-4" />}
              Refresh
            </Button>
            <Button size="lg" className="rounded-full gap-2 px-6 h-12 bg-navy-950 text-white hover:bg-navy-900 shadow-xl shadow-navy-950/10">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
        </div>
      </FadeInUp>

      {/* Main Content Card */}
      <FadeInUp delay={0.2}>
        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white/50 backdrop-blur-xl">
          <CardContent className="p-8 md:p-10">
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
              <div className="relative flex-1 group max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search logs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-2xl border-slate-200 bg-white/50 focus:bg-white transition-all shadow-sm focus:ring-4 focus:ring-primary/5 text-base"
                />
              </div>
              <div className="flex gap-3">
                 <Button variant="outline" className="h-12 rounded-2xl gap-2 border-slate-200 px-6 hover:bg-white hover:border-primary/20 hover:text-primary transition-all">
                   <Calendar className="w-4 h-4" />
                   Filter Date
                 </Button>
                 <Button variant="outline" className="h-12 rounded-2xl gap-2 border-slate-200 px-6 hover:bg-white hover:border-primary/20 hover:text-primary transition-all">
                   <Filter className="w-4 h-4" />
                   More Filters
                 </Button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-3xl border border-slate-100 overflow-hidden bg-white shadow-sm">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="h-14 font-bold text-xs uppercase tracking-widest text-muted-foreground/70 pl-6">Timestamp</TableHead>
                    <TableHead className="h-14 font-bold text-xs uppercase tracking-widest text-muted-foreground/70">User</TableHead>
                    <TableHead className="h-14 font-bold text-xs uppercase tracking-widest text-muted-foreground/70">Action</TableHead>
                    <TableHead className="h-14 font-bold text-xs uppercase tracking-widest text-muted-foreground/70">Resource</TableHead>
                    <TableHead className="h-14 font-bold text-xs uppercase tracking-widest text-muted-foreground/70 text-right pr-6">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                     Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i} className="border-slate-100">
                        <TableCell className="pl-6"><div className="h-4 w-32 bg-slate-100 animate-pulse rounded-lg" /></TableCell>
                        <TableCell><div className="h-8 w-8 bg-slate-100 animate-pulse rounded-full" /></TableCell>
                        <TableCell><div className="h-6 w-20 bg-slate-100 animate-pulse rounded-full" /></TableCell>
                        <TableCell><div className="h-4 w-24 bg-slate-100 animate-pulse rounded-lg" /></TableCell>
                        <TableCell className="text-right pr-6"><div className="h-8 w-8 bg-slate-100 animate-pulse rounded-lg ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-64 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                                <History className="w-8 h-8 text-slate-300" />
                            </div>
                            <p className="font-medium">No audit logs found</p>
                            <p className="text-xs text-muted-foreground/60 max-w-xs">Try adjusting your search filters or check back later.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log) => (
                      <TableRow key={log._id} className="hover:bg-slate-50/50 transition-colors group cursor-default border-slate-100">
                        <TableCell className="pl-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-navy-950">
                              {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="text-[11px] font-medium text-muted-foreground/60 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" />
                                {new Date(log.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                              <UserIcon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-xs font-mono font-medium text-slate-600 truncate max-w-[120px] bg-slate-50 px-2 py-1 rounded-md border border-slate-100">{log.userId}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getActionBadge(log.action)} font-bold text-xs px-2.5 py-0.5 rounded-lg border shadow-sm`}>
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs font-bold text-navy-950 uppercase tracking-wide">{log.resource}</span>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setSelectedLog(log)}
                            className="h-8 w-8 rounded-lg hover:bg-white hover:text-primary hover:shadow-md transition-all active:scale-95"
                          >
                            <FileCode className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </FadeInUp>

      {/* Log Details Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="max-w-xl rounded-3xl p-0 border-none shadow-2xl overflow-hidden">
          <DialogHeader className="p-8 bg-navy-950 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">Action Details</DialogTitle>
                <DialogDescription className="text-blue-100/60 mt-2">
                  Metadata verification for secure audit logging.
                </DialogDescription>
              </div>
              <Badge variant="outline" className={`${selectedLog ? getActionBadge(selectedLog.action) : ''} font-bold border-white/10 bg-white/10 text-white`}>
                {selectedLog?.action}
              </Badge>
            </div>
          </DialogHeader>
          <div className="p-8 space-y-6 bg-white">
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-muted-foreground/70 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Clock className="w-3.5 h-3.5" /> Timestamp
                </p>
                <p className="font-bold text-navy-950 text-base">{selectedLog && new Date(selectedLog.timestamp).toLocaleString()}</p>
              </div>
              <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-muted-foreground/70 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <UserIcon className="w-3.5 h-3.5" /> User Identity
                </p>
                <p className="font-mono text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded border border-slate-100 inline-block">{selectedLog?.userId}</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-bold text-navy-950 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-primary" />
                Technical Payload
              </p>
              <div className="bg-navy-950 rounded-2xl p-6 overflow-x-auto shadow-inner border border-navy-900 group relative">
                <div className="absolute top-3 right-3 flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                </div>
                <pre className="text-emerald-400/90 text-xs leading-relaxed font-mono custom-scrollbar">
                  {JSON.stringify(selectedLog?.details || {}, null, 2)}
                </pre>
              </div>
            </div>
          </div>
          <div className="p-6 border-t bg-slate-50 flex justify-end">
            <Button className="rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95" onClick={() => setSelectedLog(null)}>
                Close Viewer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
