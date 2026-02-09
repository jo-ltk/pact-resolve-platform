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
  ShieldCheck,
  GraduationCap,
  Globe,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/context/AuthContext";
import { useSidebar } from "@/lib/context/SidebarContext";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard Overview", href: "/admin", adminOnly: false },
  { icon: Home, label: "Homepage", href: "/admin/home-page", adminOnly: false },
  { icon: Calendar, label: "Events", href: "/admin/events", adminOnly: false },
  { icon: Handshake, label: "Mediation", href: "/admin/mediation", adminOnly: false },
  { icon: GraduationCap, label: "Academy", href: "/admin/academy", adminOnly: false },
  { icon: Globe, label: "Ecosystem", href: "/admin/ecosystem", adminOnly: false },
  { icon: BookOpen, label: "Resources", href: "/admin/resources", adminOnly: false },
  { icon: Settings, label: "Global Settings", href: "/admin/global-settings", adminOnly: true },
  { icon: History, label: "Audit Logs", href: "/admin/audit-logs", adminOnly: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={close}
        />
      )}

      <aside className={cn(
        "w-80 bg-white text-navy-950 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] fixed left-0 top-16 md:top-20 z-40 flex flex-col border-r border-navy-950/5 shadow-xl shadow-navy-950/5 overflow-y-auto scrollbar-none transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
      <nav className="flex-1 px-4 py-8 space-y-1">
        {menuItems.map((item) => {
          if (item.adminOnly && !isAdmin) return null;
          
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-accent/10 text-accent font-bold" 
                  : "text-navy-950/50 hover:text-navy-950 hover:bg-navy-950/5"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                isActive ? "bg-accent/20" : "bg-navy-950/5 group-hover:bg-navy-950/10"
              )}>
                <item.icon className={cn(
                  "w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-accent" : "text-navy-950/40 group-hover:text-navy-950"
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

      <div className="p-4 mt-auto">
        <div className="bg-white rounded-4xl p-5 mb-4 border border-navy-950/5 overflow-hidden relative group shadow-xl shadow-navy-950/5">
          <div className="flex items-center gap-4 mb-6 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-accent to-accent/60 flex items-center justify-center text-navy-950 font-black shadow-lg shadow-accent/20 border border-white/20 overflow-hidden">
              {user?.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0) || "A"
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-navy-950">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-accent font-black mt-1 uppercase tracking-widest">
                {user?.role || "Administrator"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 relative z-10">
            <Link href="/admin/profile" className="flex-1">
              <Button 
                variant="ghost" 
                className="w-full bg-slate-50 hover:bg-accent/10 text-navy-950 hover:text-accent gap-2 px-2 h-11 rounded-xl transition-all font-bold text-xs border border-slate-100 hover:border-accent/20"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Profile</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="flex-1 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white gap-2 px-2 h-11 rounded-xl transition-all font-bold text-xs border border-red-100 hover:border-red-500"
              onClick={logout}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </Button>
          </div>
          
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all duration-700" />
        </div>
        <p className="text-[10px] text-center text-navy-950/20 font-bold tracking-widest uppercase py-2">
          PACT Management &bull; v1.0.0
        </p>
      </div>
    </aside>
    </>
  );
}

