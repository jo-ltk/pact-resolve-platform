"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
    <div className="flex min-h-[calc(100vh-5rem)] bg-muted/30">
      <Sidebar />
      <main className="flex-1 ml-80 flex flex-col min-h-full relative px-6 md:px-10 scrollbar-none">
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
        <footer className="p-8 border-t bg-white dark:bg-navy-950/50 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} PACT Resolve Platform. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
