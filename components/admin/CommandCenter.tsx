"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  Home,
  Handshake,
  Globe,
  BookOpen,
  Settings,
  History,
  Search,
  Users,
  ImageIcon,
  Newspaper,
  ShieldCheck,
  MessageSquare,
  Activity,
  Trophy,
  Scale,
  Clock,
  Briefcase,
  Target,
  FileCode,
  ExternalLink,
  Info,
  Command as CommandIcon,
  Sparkles
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useAuth } from "@/lib/context/AuthContext";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard Overview", href: "/admin", category: "Dashboards", keywords: ["home", "main", "stats", "overview"] },
  { icon: Home, label: "Homepage Editor", href: "/admin/home-page", category: "Core Sections", keywords: ["edit", "hero", "sections", "landing"] },
  { icon: Calendar, label: "Events Management", href: "/admin/events", category: "Core Sections", keywords: ["conclave", "awards", "mci", "calendar"] },
  { icon: Handshake, label: "Mediation Services", href: "/admin/mediation", category: "Core Sections", keywords: ["partners", "strategic", "mediation"] },
  { icon: GraduationCap, label: "Academy Programs", href: "/admin/academy", category: "Core Sections", keywords: ["mediation", "arbitration", "negotiation", "faculty", "courses"] },
  { icon: Globe, label: "Ecosystem Management", href: "/admin/ecosystem", category: "Core Sections", keywords: ["about", "mission", "pledge"] },
  { icon: BookOpen, label: "Resource Library", href: "/admin/resources", category: "Core Sections", keywords: ["documents", "downloads", "files"] },
  { icon: User, label: "My Profile", href: "/admin/profile", category: "Account", keywords: ["me", "settings", "password", "logout"] },
];

const eventSubItems = [
  { icon: Trophy, label: "Mediation Champions League", href: "/admin/events/mci", category: "Events", keywords: ["league", "championship", "seasons"] },
  { icon: Sparkles, label: "Mission Mediation Conclave", href: "/admin/events/conclave", category: "Events", keywords: ["conclave", "highlights", "speakers"] },
  { icon: Trophy, label: "National Impact Awards", href: "/admin/events/awards", category: "Events", keywords: ["ceremony", "recipients", "winners"] },
  { icon: Calendar, label: "Advocate Maximus", href: "/admin/events/advocate-maximus", category: "Events", keywords: ["memories", "strategic"] },
  { icon: Target, label: "Special Projects", href: "/admin/events/general", category: "Events", keywords: ["misc", "special", "projects"] },
];

const mediationSubItems = [
  { icon: Activity, label: "Why Mediate Points", href: "/admin/mediation/why-points", category: "Mediation", keywords: ["advantage", "points", "content"] },
  { icon: Clock, label: "Resolution Roadmap", href: "/admin/mediation/resolution-steps", category: "Mediation", keywords: ["roadmap", "procedure", "steps"] },
  { icon: ShieldCheck, label: "Mediation Rules", href: "/admin/mediation/rules", category: "Mediation", keywords: ["governance", "integrity", "framework"] },
  { icon: Scale, label: "Fee Structures", href: "/admin/mediation/fees", category: "Mediation", keywords: ["structure", "prices", "policy"] },
  { icon: Briefcase, label: "Success Stories", href: "/admin/mediation/case-studies", category: "Mediation", keywords: ["success", "stories", "metrics"] },
];

const academySubItems = [
  { icon: Handshake, label: "Mediation Advocacy", href: "/admin/academy/mediation", category: "Academy", keywords: ["advocacy", "curriculum", "modules"] },
  { icon: Scale, label: "Arbitration Training", href: "/admin/academy/arbitration", category: "Academy", keywords: ["training", "legal", "certification"] },
  { icon: MessageSquare, label: "Skilled Negotiator", href: "/admin/academy/negotiation", category: "Academy", keywords: ["negotiation", "advanced", "skills"] },
];

const settingsItems = [
  { icon: Settings, label: "System Config", href: "/admin/global-settings", category: "System", keywords: ["config", "site", "branding"], adminOnly: true },
  { icon: History, label: "Audit Logs", href: "/admin/audit-logs", category: "System", keywords: ["activity", "security", "history"], adminOnly: true },
];

const quickActions = [
  { icon: Newspaper, label: "News Articles", href: "/admin/home-page/news", category: "Actions", keywords: ["articles", "blog", "updates"] },
  { icon: Users, label: "Neutral Panelists", href: "/admin/home-page/panel-members", category: "Actions", keywords: ["members", "neutrals", "experts"] },
  { icon: Handshake, label: "Strategic Partners", href: "/admin/mediation/partners", category: "Actions", keywords: ["partners", "collaborators"] },
  { icon: ExternalLink, label: "Go to Frontend", href: "/", category: "Actions", keywords: ["frontend", "site", "live"] },
];

export function CommandCenter() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!mounted) return null;

  const isMac = typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden xl:flex items-center w-72 h-10 relative group bg-white hover:bg-slate-50 border border-slate-200/60 rounded-xl px-3 transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98] outline-none"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-navy-950/5 group-hover:bg-accent/10 transition-colors">
          <CommandIcon className="w-3.5 h-3.5 text-navy-950/40 group-hover:text-accent transition-colors" />
        </div>
        <span className="ml-3 text-[13px] font-semibold text-navy-950/40 group-hover:text-navy-950 transition-colors">
          Command Center
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <Kbd className="bg-slate-50 border-slate-200 text-xs font-black h-5 min-w-[20px] shadow-xs">
            {isMac ? "⌘" : "Ctrl"}
          </Kbd>
          <Kbd className="bg-slate-50 border-slate-200 text-xs font-black h-5 min-w-[20px] shadow-xs">
            K
          </Kbd>
        </div>
      </button>

      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
        className="max-w-[640px] rounded-3xl overflow-hidden border-none shadow-2xl p-0 bg-white/95 backdrop-blur-2xl"
      >
        <div className="h-16 flex items-center px-5 border-b border-slate-100/60">
           <Search className="w-5 h-5 text-navy-950/20 mr-4" />
           <CommandInput 
             placeholder="What are you looking for?" 
             className="flex-1 bg-transparent border-none focus:ring-0 text-base font-medium text-navy-950 placeholder:text-navy-950/20 h-full py-0" 
           />
        </div>
        
        <CommandList className="scrollbar-none max-h-[520px] p-3 bg-slate-50/30">
          <CommandEmpty>
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-20 h-20 rounded-[2.5rem] bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm animate-in zoom-in-50 duration-500">
                <Search className="w-8 h-8 text-navy-950/10" />
              </div>
              <p className="text-base text-navy-950 font-black tracking-tight">No results found.</p>
              <p className="text-xs text-slate-400 mt-2 max-w-[240px] leading-relaxed">
                We couldn't find any section matching your search. Try typing a broader keyword or browse the list below.
              </p>
            </div>
          </CommandEmpty>
          
          <CommandGroup heading={<span className="text-[11px] font-black uppercase tracking-[0.25em] text-navy-950/20 px-3 py-4 block">Quick Navigation</span>}>
            {navigationItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => onSelect(item.href)}
                className="flex items-center gap-4 px-4 py-3.5 cursor-pointer group rounded-[1.25rem] transition-all duration-300 m-1 data-[selected=true]:bg-white data-[selected=true]:shadow-lg data-[selected=true]:shadow-navy-950/5 data-[selected=true]:scale-[1.02] border border-transparent data-[selected=true]:border-slate-100"
              >
                <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center transition-all duration-500 group-data-[selected=true]:bg-accent/10 group-data-[selected=true]:border-accent/10 group-data-[selected=true]:scale-110">
                  <item.icon className="w-5 h-5 text-navy-950/30 transition-colors group-data-[selected=true]:text-accent" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[14px] font-bold text-navy-950 group-data-[selected=true]:text-accent transition-colors leading-tight">{item.label}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-black mt-1 opacity-60">{item.category}</span>
                </div>
                <div className="opacity-0 group-data-[selected=true]:opacity-100 transition-all duration-500 -translate-x-3 group-data-[selected=true]:translate-x-0">
                  <div className="w-7 h-7 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10">
                    <Sparkles className="w-3 h-3 text-accent" />
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-0 opacity-0" />

          <CommandGroup heading={<span className="text-[11px] font-black uppercase tracking-[0.25em] text-navy-950/20 px-3 py-4 block">Specialized Management</span>}>
            {[...eventSubItems, ...mediationSubItems, ...academySubItems].map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => onSelect(item.href)}
                className="flex items-center gap-4 px-4 py-3.5 cursor-pointer group rounded-[1.25rem] transition-all duration-300 m-1 data-[selected=true]:bg-white data-[selected=true]:shadow-lg data-[selected=true]:shadow-navy-950/5 data-[selected=true]:scale-[1.02] border border-transparent data-[selected=true]:border-slate-100"
              >
                <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center transition-all duration-300 group-data-[selected=true]:bg-navy-950 group-data-[selected=true]:border-navy-950 group-data-[selected=true]:rotate-6">
                  <item.icon className="w-5 h-5 text-navy-950/30 transition-colors group-data-[selected=true]:text-white" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[14px] font-bold text-navy-950 transition-colors leading-tight">{item.label}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-black mt-1 opacity-60">{item.category}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          {isAdmin && (
            <>
              <CommandSeparator className="my-0 opacity-0" />
              <CommandGroup heading={<span className="text-[11px] font-black uppercase tracking-[0.25em] text-red-500/20 px-3 py-4 block">System Operations</span>}>
                {settingsItems.map((item) => (
                  <CommandItem
                    key={item.href}
                    onSelect={() => onSelect(item.href)}
                    className="flex items-center gap-4 px-4 py-3.5 cursor-pointer group rounded-[1.25rem] transition-all duration-300 m-1 data-[selected=true]:bg-red-50/50 data-[selected=true]:shadow-lg data-[selected=true]:shadow-red-500/5 data-[selected=true]:scale-[1.02] border border-transparent data-[selected=true]:border-red-100"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-white border border-red-50 flex items-center justify-center transition-all duration-300 group-data-[selected=true]:bg-red-500 group-data-[selected=true]:border-red-500">
                      <item.icon className="w-5 h-5 text-red-400 transition-colors group-data-[selected=true]:text-white" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-[14px] font-bold text-navy-950 group-data-[selected=true]:text-red-600 transition-colors leading-tight">{item.label}</span>
                      <span className="text-xs text-red-500/40 uppercase tracking-widest font-black mt-1 opacity-60">Admin Only</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator className="my-0 opacity-0" />
          
          <CommandGroup heading={<span className="text-[11px] font-black uppercase tracking-[0.25em] text-navy-950/20 px-3 py-4 block">Global Actions</span>}>
            {quickActions.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => onSelect(item.href)}
                className="flex items-center gap-4 px-4 py-3.5 cursor-pointer group rounded-[1.25rem] transition-all duration-300 m-1 data-[selected=true]:bg-emerald-50/50 data-[selected=true]:shadow-lg data-[selected=true]:shadow-emerald-500/5 data-[selected=true]:scale-[1.02] border border-transparent data-[selected=true]:border-emerald-100"
              >
                <div className="w-11 h-11 rounded-2xl bg-white border border-emerald-50 flex items-center justify-center transition-all duration-300 group-data-[selected=true]:bg-emerald-500 group-data-[selected=true]:border-emerald-500">
                  <item.icon className="w-5 h-5 text-emerald-400 transition-colors group-data-[selected=true]:text-white" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[14px] font-bold text-navy-950 group-data-[selected=true]:text-emerald-700 transition-colors leading-tight">{item.label}</span>
                  <span className="text-xs text-emerald-500/40 uppercase tracking-widest font-black mt-1 opacity-60">Execute Action</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        
        <div className="h-10 bg-white border-t border-slate-50 px-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                 <Kbd className="bg-slate-50 border-slate-100 text-[8px] h-4 min-w-[16px] shadow-none opacity-50">↑↓</Kbd>
                 <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                 <Kbd className="bg-slate-50 border-slate-100 text-[8px] h-4 min-w-[16px] shadow-none opacity-50">↵</Kbd>
                 <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Select</span>
              </div>
           </div>
           <div className="flex items-center gap-1 text-slate-300">
              <span className="text-[9px] font-black uppercase tracking-widest">Command Center</span>
              <Sparkles className="w-2.5 h-2.5 fill-current" />
           </div>
        </div>
      </CommandDialog>
    </>
  );
}
