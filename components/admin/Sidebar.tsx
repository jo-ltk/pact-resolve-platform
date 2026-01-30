"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Home,
  Image as ImageIcon, 
  Newspaper, 
  Users, 
  Handshake, 
  Calendar, 
  Settings, 
  Library, 
  History, 
  LogOut,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard Overview", href: "/admin", adminOnly: false },
  { icon: Home, label: "Homepage", href: "/admin/home-page", adminOnly: false },
  { icon: Calendar, label: "Events", href: "/admin/events", adminOnly: false },
  { icon: Library, label: "Media Library", href: "/admin/media-library", adminOnly: false },
  { icon: Settings, label: "Global Settings", href: "/admin/global-settings", adminOnly: true },
  { icon: History, label: "Audit Logs", href: "/admin/audit-logs", adminOnly: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();

  return (
    <aside className="w-80 bg-navy-950 text-white h-[calc(100vh-5rem)] fixed left-0 top-20 z-40 flex flex-col shadow-2xl overflow-y-auto border-r border-white/5 scrollbar-none">
      <nav className="flex-1 px-4 py-6 space-y-1.5 pt-10">
        {menuItems.map((item) => {
          if (item.adminOnly && !isAdmin) return null;
          
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-accent/10 text-accent font-bold" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                isActive ? "bg-accent/20" : "bg-white/5 group-hover:bg-white/10"
              )}>
                <item.icon className={cn(
                  "w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-accent" : "text-slate-500 group-hover:text-white"
                )} />
              </div>
              <span className="flex-1 text-sm tracking-tight">{item.label}</span>
              {isActive && (
                <div className="absolute left-0 w-1 h-5 bg-accent rounded-r-full animate-in fade-in slide-in-from-left-4 duration-500" />
              )}
              {!isActive && (
                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-white/5 backdrop-blur-3xl rounded-4xl p-5 mb-4 border border-white/5 overflow-hidden relative group">
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-accent to-accent/60 flex items-center justify-center text-navy-950 font-black shadow-lg shadow-accent/10 border border-white/20">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-white">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-accent uppercase tracking-widest font-black mt-1 opacity-70">
                {user?.role || "Administrator"}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-white hover:bg-red-500 gap-3 px-4 h-12 rounded-xl transition-all font-bold group/btn"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </Button>
          
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all" />
        </div>
        <p className="text-[10px] text-center text-slate-500 font-bold tracking-widest uppercase opacity-40">
          PACT Management &bull; v1.0.0
        </p>
      </div>
    </aside>
  );
}

