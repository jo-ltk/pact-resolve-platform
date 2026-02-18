"use client";

import { useState, useEffect } from "react";
import { MagneticButton } from "@/components/magnetic-button";
import { Video, Phone, Mail, User, Clock, X, ArrowRight, MessageSquare, ShieldCheck, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
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

  function onTrainingSubmit(data: z.infer<typeof trainingSchema>) {
    console.log(data);
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
              <MessageSquare className="h-4 w-4" />
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
            Got a query or simply ready? <br className="hidden md:block" />
            <span className="font-semibold text-navy-900">We’ll get help to you right away.</span>
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

        {/* Support & Contact Bar - Sleek Floating Design */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 md:mb-24">
          {/* Phone Contact - Left Side */}
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
              <div className="text-xs uppercase tracking-widest text-gold-600 font-bold mb-0.5">9am – 3pm IST</div>
              <div className="text-lg font-semibold text-navy-950 tracking-tight">9765987280</div>
            </div>
          </motion.div>

          {/* Email Contact - Right Side */}
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
              <div className="text-lg font-semibold text-navy-950 tracking-tight">official@thepact.in</div>
            </div>
          </motion.div>
        </div>

        {/* Dual Actions - Premium Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
          
          {/* Mediation Card - Dark/Premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col justify-between min-h-[420px] md:min-h-[500px] bg-navy-950 text-white shadow-2xl shadow-navy-950/20"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-all duration-700 group-hover:bg-accent/20" />
            
            <div className="relative z-10">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-navy-950 transition-all duration-500 shadow-xl">
                <Video className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/20 text-[9px] uppercase font-black tracking-widest">
                   Online Session
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight uppercase">
                  Initiate a <br />
                  <span className="text-accent underline decoration-accent/30 underline-offset-4">Mediation</span>
                </h3>
              </div>
              
              <p className="text-base md:text-lg mt-6 max-w-sm text-white/50 font-medium leading-relaxed">
                Connect directly with our convening team on a complimentary secure call.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 items-center mt-auto">
              <a
                href="/initiate-mediation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <MagneticButton
                  enableMotion
                  size="lg"
                  className="group w-full py-6 text-xs uppercase tracking-[0.2em] font-black bg-white! text-navy-950! hover:bg-accent! hover:text-navy-950! transition-colors duration-300 rounded-xl shadow-xl shadow-white/5"
                >
                  <span className="flex items-center gap-3">
                    Select & Inquire
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </MagneticButton>
              </a>
            </div>

            {/* Background Decorative Icon */}
            <div className="absolute bottom-[-10%] right-[-5%] opacity-10 rotate-12 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-6 select-none pointer-events-none">
              <ShieldCheck size={300} />
            </div>
          </motion.div>

          {/* Training Card - Light/Accented */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden border border-slate-100 flex flex-col justify-between min-h-[420px] md:min-h-[500px] bg-white shadow-xl shadow-navy-950/5"
          >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] -mr-20 -mt-20 transition-all duration-700 group-hover:bg-accent/10" />
            
            <div className="relative z-10">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-accent flex items-center justify-center text-navy-950 mb-8 transition-all duration-500 group-hover:scale-110 shadow-xl shadow-accent/20">
                <Clock className="h-6 w-6 md:h-8 md:w-8" />
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 text-navy-950/40 border border-navy-950/10 text-[9px] uppercase font-black tracking-widest">
                   Academy Program
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight uppercase">
                  Reserve a <br />
                  <span className="text-accent underline decoration-accent/10 underline-offset-4">Training</span>
                </h3>
              </div>
              
              <p className="text-navy-600/60 text-base md:text-lg mt-6 max-w-sm font-medium leading-relaxed">
                Consult with our training coordinators for institutional workshops.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 items-center mt-auto">
              <a
                href="/reserve-training"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <MagneticButton
                  enableMotion
                  size="lg"
                  className="w-full py-6 text-xs uppercase tracking-[0.2em] font-black bg-navy-950 text-white hover:bg-navy-900 transition-colors duration-300 rounded-xl shadow-xl shadow-navy-950/10 group"
                >
                  <span className="flex items-center gap-3">
                    Reserve Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </MagneticButton>
              </a>
            </div>
            
            {/* Background Decorative Icon */}
            <div className="absolute bottom-[-10%] right-[-5%] opacity-[0.03] rotate-[-15deg] transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-[-10deg] text-navy-950 select-none pointer-events-none">
              <User size={300} />
            </div>
          </motion.div>
        </div>

        {/* Global Dynamic Form Container - Appears below both cards */}
        <AnimatePresence mode="wait">
          {activeForm && (
            <motion.div
              id="cta-form-container"
              initial={{ height: 0, opacity: 0, y: 30 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 30 }}
              className="mt-12 overflow-hidden scroll-mt-10"
            >
              <div className="py-12 lg:py-20 border-t border-navy-950/5">
                <div className="flex items-start justify-between mb-16 px-2">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-1.5 w-12 rounded-full bg-gold-500" />
                      <span className="text-sm font-bold uppercase tracking-widest text-navy-600">Official Request Form</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-light text-navy-950 mb-3 tracking-tight">
                      Reserve A Training
                    </h2>
                    <p className="text-navy-600 text-lg">Professional training solutions for the academy staff & partners</p>
                  </div>
                  <button 
                    onClick={() => setActiveForm(null)}
                    className="h-12 w-12 rounded-full border border-navy-950/10 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white hover:rotate-90 transition-all duration-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <Form {...trainingForm}>
                    <form onSubmit={trainingForm.handleSubmit(onTrainingSubmit)} className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <FormField control={trainingForm.control} name="fullName" render={({ field }) => (
                          <FormItem className="space-y-3"><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Johnathan Doe" {...field} className="h-14 rounded-xl bg-transparent border-navy-950/10 text-lg focus:border-navy-950/30 focus:ring-0" /></FormControl></FormItem>
                        )} />
                        <FormField control={trainingForm.control} name="email" render={({ field }) => (
                          <FormItem className="space-y-3"><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="john@academy.org" {...field} className="h-14 rounded-xl bg-transparent border-navy-950/10 text-lg focus:border-navy-950/30 focus:ring-0" /></FormControl></FormItem>
                        )} />
                        <FormField control={trainingForm.control} name="contact" render={({ field }) => (
                          <FormItem className="space-y-3"><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+91" {...field} className="h-14 rounded-xl bg-transparent border-navy-950/10 text-lg focus:border-navy-950/30 focus:ring-0" /></FormControl></FormItem>
                        )} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <FormField control={trainingForm.control} name="trainingType" render={({ field }) => (
                          <FormItem className="space-y-3 lg:col-span-1"><FormLabel>Type of Training</FormLabel><FormControl><Input placeholder="e.g. Peer Mediation" {...field} className="h-14 rounded-xl bg-transparent border-navy-950/10 text-lg focus:border-navy-950/30 focus:ring-0" /></FormControl></FormItem>
                        )} />
                        <FormField control={trainingForm.control} name="mode" render={({ field }) => (
                          <FormItem className="space-y-3"><FormLabel>Preferred Mode</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-14 rounded-xl bg-transparent border-navy-950/10 focus:ring-0"><SelectValue placeholder="Select mode" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Offline">Offline</SelectItem><SelectItem value="Online">Online</SelectItem></SelectContent></Select>
                          </FormItem>
                        )} />
                        <FormField control={trainingForm.control} name="bestTime" render={({ field }) => (
                          <FormItem className="space-y-3"><FormLabel>Best time to call</FormLabel><FormControl><Input placeholder="Morning 10am-12pm" {...field} className="h-14 rounded-xl bg-transparent border-navy-950/10 text-lg focus:border-navy-950/30 focus:ring-0" /></FormControl></FormItem>
                        )} />
                      </div>
                      <div className="pt-10 flex justify-center sm:justify-end">
                        <MagneticButton size="lg" className="font-bold bg-gold-500 text-navy-950 hover:bg-navy-950 hover:text-white shadow-2xl" type="submit">
                          Reserve Training
                        </MagneticButton>
                      </div>
                    </form>
                  </Form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
