"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, LogOut, User, Bell, Search } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function AdminNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="h-20 border-b border-white/10 px-8 flex items-center justify-between z-50 sticky top-0 backdrop-blur-md bg-navy-950/95">
      <div className="flex items-center gap-8">
        <Link href="/admin" className="flex items-center gap-3 group transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-0 -rotate-6 transition-all duration-500 shadow-accent/20">
            <ShieldCheck className="w-6 h-6 text-navy-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight text-xl leading-none">PACT Admin</span>
            <span className="text-[9px] text-accent uppercase tracking-widest font-black mt-1 opacity-80 group-hover:opacity-100 transition-opacity">Management Suite</span>
          </div>
        </Link>

        {user && (
          <>
            <div className="hidden md:flex items-center gap-1 ml-4 pt-1">
               <Link href="/" className="text-white/60 hover:text-white transition-all text-xs font-bold flex items-center gap-2 px-5 py-2.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Public Website
               </Link>
            </div>
            
            <div className="hidden lg:flex items-center ml-8 max-w-xs w-64 relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-accent transition-colors" />
               <input 
                  placeholder="Universal search..." 
                  className="bg-white/5 border border-white/10 rounded-full pl-11 pr-5 py-2.5 text-sm text-white w-full focus:outline-none focus:border-accent/40 focus:bg-white/10 focus:ring-4 focus:ring-accent/5 transition-all placeholder:text-white/20"
               />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-accent hover:bg-white/5 gap-2 rounded-full px-6 border border-white/10">
              <ArrowLeft className="w-4 h-4" />
              Return to Website
            </Button>
          </Link>
        ) : (
          <div className="flex items-center gap-3">
             <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/5 rounded-full relative transition-all active:scale-90 border border-transparent hover:border-white/10 w-11 h-11">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-navy-950 shadow-[0_0_8px_rgba(191,154,102,0.6)]" />
             </Button>

             <div className="w-px h-6 bg-white/10 mx-2" />

             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 px-1.5 py-1.5 hover:bg-white/5 rounded-full transition-all border border-transparent hover:border-white/10 group h-auto">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-accent/80 flex items-center justify-center text-navy-950 font-black shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform border border-white/20">
                      {user.name.charAt(0)}
                    </div>
                    <div className="hidden lg:block text-left pr-3">
                      <p className="text-sm font-bold text-white leading-none tracking-tight">{user.name}</p>
                      <p className="text-[10px] text-white/40 mt-1.5 uppercase font-black tracking-widest">{user.role}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 mt-4 p-2.5 rounded-2xl bg-navy-900/95 backdrop-blur-xl border-white/10 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                   <DropdownMenuItem className="cursor-pointer gap-3 rounded-xl py-3 px-4 hover:bg-white/5 focus:bg-white/5 focus:text-white transition-all">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-accent" />
                      </div>
                      <span className="font-semibold text-sm">Profile Settings</span>
                   </DropdownMenuItem>
                   <div className="h-px bg-white/5 my-2 mx-2" />
                   <DropdownMenuItem 
                      onClick={logout}
                      className="cursor-pointer gap-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 focus:text-red-300 focus:bg-red-400/10 rounded-xl py-3 px-4 transition-all"
                   >
                      <div className="w-8 h-8 rounded-lg bg-red-400/10 flex items-center justify-center">
                        <LogOut className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm">Sign Out</span>
                   </DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
}

