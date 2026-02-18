"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Video, 
  Send, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Clock, 
  Scale,
  MessageSquare,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const mediationSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  contact: z.string().min(10, "Valid contact number required"),
  disputeType: z.string().min(1, "Please select a dispute type"),
  parallelLitigation: z.string(),
  otherSideOpen: z.string(),
  description: z.string().max(200, "Brief description within 200 words"),
  mode: z.string(),
  timeline: z.string(),
  bestTime: z.string(),
});

const luxuryEasing = "easeOut";

export default function InitiateMediationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof mediationSchema>>({
    resolver: zodResolver(mediationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      contact: "",
      disputeType: "",
      parallelLitigation: "No",
      otherSideOpen: "No",
      description: "",
      mode: "Online",
      timeline: "",
      bestTime: "",
    }
  });

  function onSubmit(data: z.infer<typeof mediationSchema>) {
    console.log(data);
    setIsSubmitted(true);
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Case Details", icon: FileText },
    { number: 3, title: "Preferences", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gold-500/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gold-500/3 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-white/2 blur-2xl" />
        
        {/* Floating Particles - Using static positions to avoid hydration mismatch */}
        {[
          { left: 15, top: 20, duration: 4, delay: 0 },
          { left: 85, top: 35, duration: 3.5, delay: 0.5 },
          { left: 45, top: 80, duration: 4.5, delay: 1 },
          { left: 25, top: 60, duration: 3, delay: 1.5 },
          { left: 75, top: 15, duration: 5, delay: 0.3 },
          { left: 55, top: 45, duration: 4, delay: 0.8 },
          { left: 10, top: 70, duration: 3.5, delay: 1.2 },
          { left: 90, top: 55, duration: 4.5, delay: 0.2 },
          { left: 35, top: 25, duration: 3, delay: 1.8 },
          { left: 65, top: 85, duration: 5, delay: 0.6 },
          { left: 20, top: 40, duration: 4, delay: 1.4 },
          { left: 80, top: 75, duration: 3.5, delay: 0.9 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-500/20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 md:px-12 lg:px-24 py-4 md:py-6">
        <nav className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link 
            href="/" 
            className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
          >
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <span className="text-xs md:text-sm font-medium">Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full sm:bg-transparent sm:p-0">
            <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
            <span className="text-xs md:text-sm text-white/60">Secure & Confidential</span>
          </div>
        </nav>
      </header>

      <main className="relative z-10 px-4 md:px-12 lg:px-24 pb-12 md:pb-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6 md:mb-8">
              <Sparkles className="h-4 w-4 text-gold-500" />
              <span className="text-gold-500 text-xs md:text-sm font-semibold tracking-wide uppercase">Official Request Portal</span>
            </div>
            
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-light text-white mb-4 md:mb-6 tracking-tight px-4">
              Initiate a <span className="font-semibold italic text-gold-500">Mediation</span>
            </h1>
            
            <p className="text-white/60 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              Begin your journey to resolution. Complete the form below and our expert 
              convenors will reach out within 24 hours.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Progress Steps */}
                <div className="flex justify-center mb-8 md:mb-12">
                  <div className="flex items-center gap-2 md:gap-8">
                    {steps.map((step, idx) => (
                      <div key={step.number} className="flex items-center gap-2 md:gap-8">
                        <button
                          onClick={() => setCurrentStep(step.number)}
                          className={`flex items-center justify-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl transition-all duration-300 ${
                            currentStep === step.number 
                              ? "bg-gold-500 text-navy-950 scale-105" 
                              : currentStep > step.number
                                ? "bg-green-500/20 text-green-400"
                                : "bg-white/5 text-white/40 hover:bg-white/10"
                          }`}
                        >
                          <step.icon className="h-4 w-4 md:h-5 md:w-5" />
                          <span className="hidden sm:block text-xs md:text-sm font-semibold uppercase tracking-wider">{step.title}</span>
                          {currentStep === step.number && (
                            <span className="sm:hidden text-xs font-bold">{step.number}</span>
                          )}
                        </button>
                        {idx < steps.length - 1 && (
                          <div className={`w-4 md:w-16 h-px transition-colors duration-300 ${
                            currentStep > step.number ? "bg-green-400" : "bg-white/10"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Container */}
                <div className="relative">
                  {/* Glass Card */}
                  <div className="relative backdrop-blur-xl bg-white/3 border border-white/10 rounded-4xl md:rounded-[3.5rem] p-6 md:p-12 lg:p-16 overflow-hidden">
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-linear-to-br from-gold-500/5 via-transparent to-transparent rounded-4xl md:rounded-[3.5rem]" />
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="relative z-10 space-y-12">
                        
                        {/* Step 1: Personal Info */}
                        <AnimatePresence mode="wait">
                          {currentStep === 1 && (
                            <motion.div
                              key="step1"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-8"
                            >
                              <div className="flex items-center gap-4 mb-10">
                                <div className="h-12 w-12 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                                  <User className="h-6 w-6 text-gold-500" />
                                </div>
                                <div>
                                  <h2 className="text-2xl font-semibold text-white">Personal Information</h2>
                                  <p className="text-white/40 text-sm">Tell us about yourself</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <FormField 
                                  control={form.control} 
                                  name="fullName" 
                                  render={({ field }) => (
                                    <FormItem className="space-y-4">
                                      <FormLabel className="text-white/80 font-medium flex items-center gap-2">
                                        <User className="h-4 w-4 text-gold-500" />
                                        Full Name
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="John Doe" 
                                          {...field} 
                                          className="h-14 px-6 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:ring-gold-500/20 transition-all" 
                                        />
                                      </FormControl>
                                      <FormMessage className="text-red-400" />
                                    </FormItem>
                                  )} 
                                />
                                
                                <FormField 
                                  control={form.control} 
                                  name="email" 
                                  render={({ field }) => (
                                    <FormItem className="space-y-4">
                                      <FormLabel className="text-white/80 font-medium flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gold-500" />
                                        Email Address
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="john@company.com" 
                                          {...field} 
                                          className="h-14 px-6 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:ring-gold-500/20 transition-all" 
                                        />
                                      </FormControl>
                                      <FormMessage className="text-red-400" />
                                    </FormItem>
                                  )} 
                                />
                                
                                <FormField 
                                  control={form.control} 
                                  name="contact" 
                                  render={({ field }) => (
                                    <FormItem className="space-y-4">
                                      <FormLabel className="text-white/80 font-medium flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gold-500" />
                                        Contact Number
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="+91 00000 00000" 
                                          {...field} 
                                          className="h-14 px-6 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:ring-gold-500/20 transition-all" 
                                        />
                                      </FormControl>
                                      <FormMessage className="text-red-400" />
                                    </FormItem>
                                  )} 
                                />
                              </div>
                            </motion.div>
                          )}

                          {/* Step 2: Case Details */}
                          {currentStep === 2 && (
                            <motion.div
                              key="step2"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-8"
                            >
                              <div className="flex items-center gap-4 mb-10">
                                <div className="h-12 w-12 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                                  <FileText className="h-6 w-6 text-gold-500" />
                                </div>
                                <div>
                                  <h2 className="text-2xl font-semibold text-white">Case Details</h2>
                                  <p className="text-white/40 text-sm">Help us understand your situation</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField 
                                  control={form.control} 
                                  name="disputeType" 
                                  render={({ field }) => (
                                    <FormItem className="space-y-4">
                                      <FormLabel className="text-white/80 font-medium flex items-center gap-2">
                                        <Scale className="h-4 w-4 text-gold-500" />
                                        Type of Dispute
                                      </FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="h-14 rounded-xl bg-white/5 border-white/10 text-white focus:ring-gold-500/20">
                                            <SelectValue placeholder="Select dispute type" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-navy-900 border-white/10">
                                          <SelectItem value="Commercial" className="text-white hover:bg-white/10">Commercial</SelectItem>
                                          <SelectItem value="Family" className="text-white hover:bg-white/10">Family</SelectItem>
                                          <SelectItem value="Workplace" className="text-white hover:bg-white/10">Workplace</SelectItem>
                                          <SelectItem value="Community" className="text-white hover:bg-white/10">Community</SelectItem>
                                          <SelectItem value="Other" className="text-white hover:bg-white/10">Other</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage className="text-red-400" />
                                    </FormItem>
                                  )} 
                                />

                                <div className="space-y-6">
                                  <FormField 
                                    control={form.control} 
                                    name="parallelLitigation" 
                                    render={({ field }) => (
                                      <FormItem className="space-y-4">
                                        <FormLabel className="text-white/80 font-medium">Parallel Litigation Running?</FormLabel>
                                        <FormControl>
                                          <RadioGroup 
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value} 
                                            className="flex gap-6"
                                          >
                                            <div className="flex items-center space-x-3">
                                              <RadioGroupItem value="Yes" className="border-white/30 text-gold-500" />
                                              <FormLabel className="font-normal text-white/60 cursor-pointer">Yes</FormLabel>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                              <RadioGroupItem value="No" className="border-white/30 text-gold-500" />
                                              <FormLabel className="font-normal text-white/60 cursor-pointer">No</FormLabel>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )} 
                                  />

                                  <FormField 
                                    control={form.control} 
                                    name="otherSideOpen" 
                                    render={({ field }) => (
                                      <FormItem className="space-y-4">
                                        <FormLabel className="text-white/80 font-medium">Other side open to mediation?</FormLabel>
                                        <FormControl>
                                          <RadioGroup 
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value} 
                                            className="flex gap-6"
                                          >
                                            <div className="flex items-center space-x-3">
                                              <RadioGroupItem value="Yes" className="border-white/30 text-gold-500" />
                                              <FormLabel className="font-normal text-white/60 cursor-pointer">Yes</FormLabel>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                              <RadioGroupItem value="No" className="border-white/30 text-gold-500" />
                                              <FormLabel className="font-normal text-white/60 cursor-pointer">No</FormLabel>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )} 
                                  />
                                </div>
                              </div>

                              <FormField 
                                control={form.control} 
                                name="description" 
                                render={({ field }) => (
                                  <FormItem className="space-y-4">
                                    <FormLabel className="text-white/80 font-medium flex items-center gap-2">
                                      <MessageSquare className="h-4 w-4 text-gold-500" />
                                      Brief Description (max 200 words)
                                    </FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="Please summarize the core dispute..." 
                                        {...field} 
                                        className="min-h-[160px] rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30 p-6 focus:border-gold-500/50 focus:ring-gold-500/20"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                  </FormItem>
                                )} 
                              />
                            </motion.div>
                          )}

                          {/* Step 3: Preferences */}
                          {currentStep === 3 && (
                            <motion.div
                              key="step3"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-8"
                            >
                              <div className="flex items-center gap-4 mb-10">
                                <div className="h-12 w-12 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                                  <Clock className="h-6 w-6 text-gold-500" />
                                </div>
                                <div>
                                  <h2 className="text-2xl font-semibold text-white">Your Preferences</h2>
                                  <p className="text-white/40 text-sm">How would you like to proceed?</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <FormField 
                                  control={form.control} 
                                  name="mode" 
                                  render={({ field }) => (
                                    <FormItem className="space-y-4">
                                      <FormLabel className="text-white/80 font-medium flex items-center gap-2">
                                        <Video className="h-4 w-4 text-gold-500" />
                                        Preferred Mode
                                      </FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="h-14 rounded-xl bg-white/5 border-white/10 text-white focus:ring-gold-500/20">
                                            <SelectValue placeholder="Select mode" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-navy-900 border-white/10">
                                          <SelectItem value="Online" className="text-white hover:bg-white/10">Online</SelectItem>
                                          <SelectItem value="Offline" className="text-white hover:bg-white/10">Offline</SelectItem>
                                          <SelectItem value="Hybrid" className="text-white hover:bg-white/10">Hybrid</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormItem>
                                  )} 
                                />

                                <FormField 
                                  control={form.control} 
                                  name="timeline" 
                                  render={({ field }) => (
                                    <FormItem className="space-y-4">
                                      <FormLabel className="text-white/80 font-medium flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gold-500" />
                                        Timeline / Deadline
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="e.g. Next 30 days" 
                                          {...field} 
                                          className="h-14 px-6 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:ring-gold-500/20"
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )} 
                                />

                                <FormField 
                                  control={form.control} 
                                  name="bestTime" 
                                  render={({ field }) => (
                                    <FormItem className="space-y-4">
                                      <FormLabel className="text-white/80 font-medium flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gold-500" />
                                        Callback Preference
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="e.g. Wednesday PM" 
                                          {...field} 
                                          className="h-14 px-6 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:ring-gold-500/20"
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )} 
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                            className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                              currentStep === 1 
                                ? "opacity-0 pointer-events-none" 
                                : "bg-white/5 text-white hover:bg-white/10"
                            }`}
                          >
                            Previous
                          </button>

                          {currentStep < 3 ? (
                            <button
                              type="button"
                              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                              className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/20"
                            >
                              Next Step
                              <ArrowLeft className="h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="w-full sm:w-auto group flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-linear-to-r from-gold-500 to-gold-400 text-navy-950 font-bold hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300"
                            >
                              <Send className="h-5 w-5" />
                              Submit Application
                            </button>
                          )}
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: luxuryEasing }}
                className="text-center py-20"
              >
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-linear-to-br from-green-500 to-emerald-400 mb-8 shadow-xl shadow-green-500/30">
                  <CheckCircle2 className="h-12 w-12 text-white" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                  Application <span className="font-semibold text-gold-500">Submitted!</span>
                </h2>
                
                <p className="text-white/60 text-xl max-w-xl mx-auto mb-10">
                  Thank you for choosing PACT. Our mediation convenor will contact you within 24 hours.
                </p>

                <Link 
                  href="/"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors border border-white/10"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Return to Homepage
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-16 text-white/40"
          >
            {[
              { icon: ShieldCheck, text: "256-bit Encryption" },
              { icon: CheckCircle2, text: "GDPR Compliant" },
              { icon: Video, text: "Secure Sessions" },
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <badge.icon className="h-4 w-4" />
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
