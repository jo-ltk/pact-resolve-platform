"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Lock, Mail, Loader2, ArrowLeft, AlertCircle, ShieldCheck, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/context/AuthContext";
import { FadeInUp } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setLoginError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMsg = result.error || "Login failed. Please check your credentials.";
        setLoginError(errorMsg);
        throw new Error(errorMsg);
      }

      toast.success("Login successful! Redirecting...");
      
      login(result.token, result.user);
      
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen lg:h-screen w-full flex bg-white lg:overflow-hidden items-stretch">
      {/* Left Wall - Side Branding */}
      <div className="hidden lg:flex w-1/2 bg-navy-950 relative overflow-hidden flex-col justify-between p-16 h-full">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="bg-white p-2 rounded-2xl shadow-2xl transition-transform group-hover:scale-105">
              <Image
                src="/images/pact-logo.png"
                alt="PACT"
                width={60}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-widest uppercase">PACT</h2>
              <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] opacity-80 mt-0.5">Management Portal</p>
            </div>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <FadeInUp>
            <Badge className="bg-accent/10 text-accent border-accent/20 font-black tracking-widest uppercase mb-6 py-1.5 px-4 rounded-full text-xs">
              Secure Access Only
            </Badge>
            <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tighter mb-8">
              Refined control for <span className="text-accent underline decoration-accent/30 underline-offset-8">peacekeeping</span> teams.
            </h1>
            <p className="text-white/40 text-lg font-medium leading-relaxed max-w-md">
              Welcome back to PACT's centralized command center. Manage content, academy resources, and global settings with precision.
            </p>
          </FadeInUp>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-8 mt-12">
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
            &copy; 2026 PACT Global &bull; v1.0.0
          </p>
          <div className="flex gap-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
             {/* Security badges or logos can go here */}
          </div>
        </div>
      </div>

      {/* Right Wall - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white relative min-h-screen lg:h-full p-6 sm:p-12 lg:p-16">
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-12 lg:right-12 z-20">
           <Link 
            href="/" 
            className="flex items-center gap-2 text-navy-950/40 hover:text-navy-950 transition-all text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-slate-50 hover:bg-slate-100 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-100 shadow-sm"
          >
            <ArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            Live Site
          </Link>
        </div>

        <div className="w-full max-w-sm flex flex-col justify-center py-8 sm:py-12 lg:py-20">
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-3 sm:space-y-4">
              <FadeInUp>
                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-navy-950 rounded-2xl flex items-center justify-center text-accent shadow-2xl mb-6 sm:mb-8 group transition-transform hover:scale-105 active:scale-95 cursor-default">
                    <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
                 </div>
                 <h3 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight leading-none uppercase">Admin Sign In</h3>
                 <p className="text-navy-950/40 font-medium text-sm sm:text-base mt-2">Welcome back. Enter your workspace credentials to continue.</p>
              </FadeInUp>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {loginError && (
                <FadeInUp>
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="space-y-0.5 py-0.5">
                      <p className="text-[9px] font-black text-red-600 uppercase tracking-widest">Auth Error</p>
                      <p className="text-xs font-bold text-red-700/60 leading-tight">{loginError}</p>
                    </div>
                  </div>
                </FadeInUp>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5 sm:space-y-2">
                          <FormLabel className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-navy-950/30 ml-1">Email Address</FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Mail className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-950/20 group-focus-within:text-accent transition-colors" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="name@example.com"
                                className="pl-12 sm:pl-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 border-slate-100 focus:border-accent focus:bg-white transition-all font-bold text-sm sm:text-base text-navy-950 placeholder:text-navy-950/20 shadow-sm shadow-navy-950/5"
                                disabled={isLoading}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-red-500 ml-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5 sm:space-y-2">
                          <FormLabel className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-navy-950/30 ml-1">Secret Password</FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Lock className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-950/20 group-focus-within:text-accent transition-colors" />
                              <Input
                                {...field}
                                type="password"
                                placeholder="••••••••"
                                className="pl-12 sm:pl-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 border-slate-100 focus:border-accent focus:bg-white transition-all font-bold text-sm sm:text-base text-navy-950 placeholder:text-navy-950/20 shadow-sm shadow-navy-950/5"
                                disabled={isLoading}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-red-500 ml-1" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full h-12 sm:h-14 bg-navy-950 hover:bg-navy-900 text-white rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-navy-950/10 transition-all active:scale-95 group overflow-hidden"
                      disabled={isLoading}
                    >
                      <div className="flex items-center justify-center gap-2 relative z-10">
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin text-accent" />
                            <span className="text-[10px] sm:text-xs">Verifying Access...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[10px] sm:text-xs">Secure Sign In</span>
                            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform text-accent" />
                          </>
                        )}
                      </div>
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <div className="pt-4 text-center lg:text-left">
              <p className="text-[8px] sm:text-[9px] text-navy-950/20 font-black uppercase tracking-[0.25em] leading-relaxed max-w-[280px] mx-auto lg:mx-0">
                Secure 256-bit encrypted access. All activities are logged for safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
