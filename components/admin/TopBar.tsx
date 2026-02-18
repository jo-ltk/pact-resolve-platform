"use client";

import React from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { 
  Bell, 
  Search, 
  User as UserIcon, 
  LogOut,
  Settings,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function TopBar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 bg-white dark:bg-navy-950 border-b border-border sticky top-0 z-30 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search dashboard..." 
            className="pl-10 h-10 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 px-3 py-1 font-semibold uppercase text-xs tracking-wider">
            {user?.role || "Staff"}
          </Badge>
        </div>

        <div className="h-8 w-[1px] bg-border" />

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-muted rounded-xl transition-all duration-200">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-md">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-navy-950 dark:text-white leading-none">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground mt-1 lowercase truncate max-w-[120px]">{user?.email}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 p-2 rounded-xl shadow-xl border-border">
              <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground px-2 py-1.5 uppercase tracking-widest">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer gap-2 rounded-lg py-2">
                <UserIcon className="w-4 h-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2 rounded-lg py-2">
                <Settings className="w-4 h-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem 
                className="cursor-pointer gap-2 text-red-500 focus:text-red-500 focus:bg-red-50 rounded-lg py-2"
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
