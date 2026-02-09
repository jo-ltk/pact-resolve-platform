"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { MobileBottomNav } from "@/components/admin/MobileBottomNav";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // Middleware handles redirection, but this is a double check for the client
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <div className="flex flex-1 bg-[#F8FAFC] overflow-x-hidden relative">
        <Sidebar />
        <main className="flex-1 md:ml-80 flex flex-col min-h-full relative px-4 md:px-10 scrollbar-none transition-all duration-300 pb-24 md:pb-8">
          <div className="flex-1 pt-4 md:pt-8 w-full">
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              {children}
            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
