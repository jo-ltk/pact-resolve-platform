"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, LogOut, User, Search, Menu, X, ChevronRight } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { useSidebar } from "@/lib/context/SidebarContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CommandCenter } from "./CommandCenter";


export function AdminNavbar() {
  const { user, logout } = useAuth();
  const { isOpen, toggle } = useSidebar();

  return (
    <nav className="h-16 md:h-20 border-b border-slate-100 px-4 md:px-10 flex items-center justify-between z-50 sticky top-0 bg-white/95 backdrop-blur-xl">
      <div className="flex items-center gap-12">
        <Link href="/admin" className="flex items-center gap-4 group transition-all active:scale-95">
          <div className="relative h-10 md:h-12 w-auto transition-transform duration-300">
            <Image
              src="/images/pact-logo.png"
              alt="PACT"
              width={140}
              height={56}
              className="h-full w-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="font-sans text-lg md:text-xl font-black tracking-tighter text-navy-950 leading-none uppercase">
                PACT
              </span>
              <Badge variant="outline" className="text-[9px] h-4 px-1.5 bg-accent/5 border-accent/20 text-accent font-black tracking-widest uppercase">Admin</Badge>
            </div>
            <span className="hidden md:block text-[8px] font-medium text-navy-950/40 uppercase tracking-wide leading-tight mt-1">
              The peacekeeping and<br />conflict resolution team
            </span>
          </div>
        </Link>

        {user && (
          <div className="hidden lg:flex items-center gap-8 border-l border-slate-100 pl-8 pt-0.5">
             <Link href="/" className="text-navy-950/40 hover:text-navy-950 transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50">
                <ArrowLeft className="w-3.5 h-3.5" />
                Live Website
             </Link>
             
              <CommandCenter />

          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {!user ? (
          <Link href="/">
            <Button variant="ghost" className="text-navy-950 hover:bg-slate-50 gap-2 rounded-xl px-6 border border-slate-100">
              <ArrowLeft className="w-4 h-4" />
              Website
            </Button>
          </Link>
        ) : (
          <div className="flex items-center gap-2 md:gap-3">

             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 md:gap-4 px-2 md:px-3 py-2 hover:bg-slate-50 rounded-2xl transition-all border border-transparent group h-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-black shadow-inner group-hover:scale-105 transition-transform border border-accent/20 overflow-hidden">
                        {user?.image ? (
                          <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          user?.name.charAt(0)
                        )}
                      </div>
                      <div className="hidden sm:block text-left pr-1">
                        <p className="text-xs font-black text-navy-950 leading-none uppercase tracking-tighter">{user?.name}</p>
                        <p className="text-[9px] text-navy-950/30 mt-1.5 uppercase font-bold tracking-widest">{user?.role}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-navy-950/20 group-hover:text-accent rotate-90 transition-all duration-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 mt-4 p-2 rounded-4xl bg-white border-slate-100 text-navy-950 shadow-2xl shadow-navy-950/10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                   
                   <div className="px-5 py-4 border-b border-slate-50 mb-2 relative z-10">
                      <p className="text-[10px] font-black text-navy-950/20 uppercase tracking-[0.2em] mb-1">Account</p>
                      <p className="text-sm font-black text-navy-950 truncate tracking-tight">{user?.email}</p>
                   </div>
                   
                   <div className="space-y-1 relative z-10">
                     <Link href="/admin/profile">
                       <DropdownMenuItem className="cursor-pointer gap-4 rounded-xl py-3.5 px-4 hover:bg-slate-50 focus:bg-accent/5 focus:text-accent transition-all group border border-transparent hover:border-slate-100">
                          <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                            <User className="w-4 h-4 text-navy-950/40 group-hover:text-accent" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-black text-[11px] uppercase tracking-widest text-navy-950 leading-none">View Profile</span>
                            <span className="text-[9px] text-navy-950/30 font-bold uppercase mt-1">Manage settings</span>
                          </div>
                       </DropdownMenuItem>
                     </Link>

                     <DropdownMenuItem 
                        onClick={logout}
                        className="cursor-pointer gap-4 text-red-500 hover:text-white hover:bg-red-500 focus:text-white focus:bg-red-500 rounded-xl py-3.5 px-4 transition-all group border border-transparent"
                     >
                        <div className="w-9 h-9 rounded-xl bg-red-50 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-[11px] uppercase tracking-widest leading-none">Sign Out</span>
                          <span className="text-[9px] opacity-60 font-bold uppercase mt-1">End session</span>
                        </div>
                     </DropdownMenuItem>
                   </div>
                </DropdownMenuContent>
             </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
}

