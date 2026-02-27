"use client";

import { useState, useEffect } from "react";
import { MagneticButton } from "@/components/magnetic-button";
import { Video, Phone, Mail, User, GraduationCap, X, ArrowRight, ShieldCheck, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const trainingSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  contact: z.string().min(10, "Valid contact number required"),
  trainingType: z.string().min(1, "Training type is required"),
  mode: z.string(),
  bestTime: z.string(),
});

export function CTASection() {
  const [activeForm, setActiveForm] = useState<"training" | null>(null);
  const [globalSettings, setGlobalSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/content/global-settings");
        const result = await res.json();
        if (result.success && result.data) setGlobalSettings(result.data);
      } catch (error) {
        console.error("Failed to fetch global settings", error);
      }
    }
    fetchSettings();
  }, []);

  const trainingForm = useForm<z.infer<typeof trainingSchema>>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      contact: "",
      trainingType: "",
      mode: "Online",
      bestTime: "",
    }
  });

  const sendInquiryEmail = (subject: string, body: string) => {
    if (typeof window === "undefined") return;
    const recipient = globalSettings?.email || "official@thepact.in";
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  function onTrainingSubmit(data: z.infer<typeof trainingSchema>) {
    sendInquiryEmail(
      "New Academy Training Inquiry",
      [
        `Name: ${data.fullName}`,
        `Email: ${data.email}`,
        `Contact: ${data.contact}`,
        `Training Type: ${data.trainingType}`,
        `Preferred Mode: ${data.mode}`,
        `Best Time to Call: ${data.bestTime}`,
      ].join("\n")
    );
    setActiveForm(null);
  }

  useEffect(() => {
    if (activeForm) {
      const timer = setTimeout(() => {
        const element = document.getElementById("cta-form-container");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeForm]);

  return (
    <section className="bg-[#fcfdfd] py-16 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Header Section */}
        <div className="text-center mb-12 md:mb-20 relative px-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex flex-col md:flex-row items-center gap-4 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-xs md:text-sm font-semibold border border-gold-500/20">
              <ArrowRight className="h-4 w-4" />
              <span>Connect With Us</span>
            </div>
            
            <div className="flex items-center gap-4 text-navy-400">
              <a href="https://www.facebook.com/thepactindia/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/the-pact/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/pact_india/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com/@MissionMediationbyPACT" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-6xl font-light text-navy-950 mb-6 tracking-tight leading-[1.1]"
          >
            Thinking of Trying Mediation… But Not Sure? <br className="hidden md:block" />
            <span className="font-semibold text-navy-900">Let’s Talk It Out on a Confidential & Complimentary Call.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-navy-600/80 text-base md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Connect with our Mediation Convenor or Trainings Coordinator to learn more about initiating a mediation or registering for the academy.
          </motion.p>
        </div>

        {/* Support & Contact Bar */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-5 bg-white border border-navy-950/5 p-4 pr-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow group w-full sm:w-auto"
          >
            <div className="h-12 w-12 rounded-xl bg-navy-950 flex items-center justify-center text-white shrink-0 group-hover:bg-gold-500 transition-colors">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              {globalSettings?.contactPersons?.length > 0 ? (
                globalSettings.contactPersons.slice(0, 2).map((p: any, i: number) => (
                  <div key={i} className={i === 0 ? "text-lg font-semibold text-navy-950 tracking-tight" : "text-sm text-navy-600 font-medium tracking-tight"}>
                    {p.phone}
                  </div>
                ))
              ) : (
                <>
                  <div className="text-lg font-semibold text-navy-950 tracking-tight">9765987280</div>
                  <div className="text-sm text-navy-600 font-medium tracking-tight">9958488857</div>
                </>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-5 bg-white border border-navy-950/5 p-4 pr-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow group w-full sm:w-auto"
          >
            <div className="h-12 w-12 rounded-xl bg-navy-950 flex items-center justify-center text-white shrink-0 group-hover:bg-gold-500 transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-600 font-bold mb-0.5">Email Us</div>
              <div className="text-lg font-semibold text-navy-950 tracking-tight">{globalSettings?.email || "official@thepact.in"}</div>
            </div>
          </motion.div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col justify-between min-h-[420px] md:min-h-[500px] bg-navy-950 text-white shadow-2xl shadow-navy-950/20"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
            <div className="relative z-10">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-navy-950 transition-all duration-500 shadow-xl">
                <Video className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/20 text-[9px] uppercase font-black tracking-widest">Online Session</div>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight uppercase">Initiate a <br /><span className="text-accent underline decoration-accent/30 underline-offset-4">Mediation</span></h3>
              </div>
              <p className="text-base md:text-lg mt-6 max-w-sm text-white/50 font-medium leading-relaxed">Connect directly with our convening team on a complimentary secure call.</p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-4 items-center mt-auto">
              <a href="/initiate-mediation" target="_blank" rel="noopener noreferrer" className="w-full">
                <MagneticButton enableMotion size="lg" className="group w-full py-6 text-xs uppercase tracking-[0.2em] font-black bg-white! text-navy-950! hover:bg-accent! hover:text-navy-950! transition-colors duration-300 rounded-xl shadow-xl shadow-white/5">
                  <span className="flex items-center gap-3">Select & Inquire <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
                </MagneticButton>
              </a>
            </div>
            <div className="absolute bottom-[-10%] right-[-5%] opacity-10 rotate-12 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-6 select-none pointer-events-none"><ShieldCheck size={300} /></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden border border-slate-100 flex flex-col justify-between min-h-[420px] md:min-h-[500px] bg-white shadow-xl shadow-navy-950/5"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] -mr-20 -mt-20 transition-all duration-700 group-hover:bg-accent/10" />
            <div className="relative z-10">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-accent flex items-center justify-center text-navy-950 mb-8 transition-all duration-500 group-hover:scale-110 shadow-xl shadow-accent/20">
                <GraduationCap className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 text-navy-950/40 border border-navy-950/10 text-[9px] uppercase font-black tracking-widest">Academy Program</div>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight uppercase">Reserve a <br /><span className="text-navy-900 underline decoration-navy-950/10 underline-offset-4">Seat</span></h3>
              </div>
              <p className="text-base md:text-lg mt-6 max-w-sm text-navy-600/60 font-medium leading-relaxed">Book a reserved seat for the upcoming batches of the PACT Academy.</p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-4 items-center mt-auto">
              <button onClick={() => setActiveForm("training")} className="group w-full relative flex items-center justify-center gap-3 py-5 bg-navy-950 text-white text-xs uppercase tracking-[0.2em] font-black rounded-xl overflow-hidden shadow-2xl shadow-navy-950/10 hover:bg-navy-900 transition-all hover:scale-[1.02]">
                Check Calendar & Enroll <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute bottom-[-5%] right-[-5%] opacity-5 rotate-12 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-6 select-none pointer-events-none"><User size={260} /></div>
          </motion.div>
        </div>

        {/* Global Dynamic Form Container */}
        <div id="cta-form-container" className="pt-24 empty:hidden">
          <AnimatePresence>
            {activeForm === "training" && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl shadow-navy-950/10 border border-navy-950/5 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-navy-950 to-accent" />
                <button onClick={() => setActiveForm(null)} className="absolute top-8 right-8 p-3 rounded-full hover:bg-slate-50 transition-colors z-20 group">
                  <X className="h-6 w-6 text-navy-400 group-hover:text-navy-950" />
                </button>
                <div className="p-8 md:p-16">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center text-navy-950"><GraduationCap className="h-6 w-6" /></div>
                    <div>
                      <h3 className="text-2xl font-bold text-navy-950 tracking-tight">Register for Training</h3>
                      <p className="text-navy-400 text-sm">Secure your spot in our upcoming academy session.</p>
                    </div>
                  </div>
                  <Form {...trainingForm}>
                    <form onSubmit={trainingForm.handleSubmit(onTrainingSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField control={trainingForm.control} name="fullName" render={({ field }) => (
                        <FormItem><FormLabel className="text-xs uppercase tracking-widest font-black text-navy-900/40">Full Name</FormLabel><FormControl><Input placeholder="John Doe" className="h-14 rounded-2xl bg-slate-50 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent/50" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={trainingForm.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel className="text-xs uppercase tracking-widest font-black text-navy-900/40">Email Address</FormLabel><FormControl><Input placeholder="john@example.com" className="h-14 rounded-2xl bg-slate-50 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent/50" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={trainingForm.control} name="contact" render={({ field }) => (
                        <FormItem><FormLabel className="text-xs uppercase tracking-widest font-black text-navy-900/40">Contact Number</FormLabel><FormControl><Input placeholder="+91 98765 43210" className="h-14 rounded-2xl bg-slate-50 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent/50" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={trainingForm.control} name="trainingType" render={({ field }) => (
                        <FormItem><FormLabel className="text-xs uppercase tracking-widest font-black text-navy-900/40">Program of Interest</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent/50"><SelectValue placeholder="Select program" /></SelectTrigger></FormControl><SelectContent className="rounded-2xl border-none shadow-2xl p-2"><SelectItem value="Mediation Advocacy" className="rounded-xl py-3 px-4">Mediation Advocacy</SelectItem><SelectItem value="Neutrals Training" className="rounded-xl py-3 px-4">Neutrals Training</SelectItem><SelectItem value="Corporate ADR" className="rounded-xl py-3 px-4">Corporate ADR</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                      )} />
                      <div className="md:col-span-2 pt-6"><button type="submit" className="w-full py-6 bg-navy-950 text-white text-xs uppercase tracking-[0.3em] font-black rounded-2xl shadow-xl shadow-navy-950/20 hover:shadow-2xl transition-all">Submit Registration Inquiry</button><p className="text-center text-sm text-navy-400 mt-6 uppercase tracking-widest">Our training coordinator will reach out within 24-48 business hours.</p></div>
                    </form>
                  </Form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
