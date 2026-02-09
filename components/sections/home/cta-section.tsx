"use client";

import { useState, useEffect } from "react";
import { MagneticButton } from "@/components/magnetic-button";
import { Video, Phone, Mail, User, Clock, X, ArrowRight, MessageSquare, ShieldCheck } from "lucide-react";
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-[10px] md:text-sm font-semibold mb-6 border border-gold-500/20"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Connect With Us</span>
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
              <div className="text-[10px] uppercase tracking-widest text-gold-600 font-bold mb-0.5">9am – 3pm IST</div>
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
              <div className="text-[10px] uppercase tracking-widest text-gold-600 font-bold mb-0.5">Email Us</div>
              <div className="text-lg font-semibold text-navy-950 tracking-tight">info@pactmediators.com</div>
            </div>
          </motion.div>
        </div>

        {/* Dual Actions - Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          
          {/* Mediation Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-4xl md:rounded-[2.5rem] p-8 md:p-14 overflow-hidden border-2 transition-all duration-500 flex flex-col justify-between min-h-[400px] md:min-h-[500px] border-black/5 bg-white hover:border-navy-950/20 shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative z-10">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl flex items-center justify-center mb-8 md:mb-10 transition-colors bg-navy-950 text-white group-hover:bg-gold-500">
                <Video className="h-7 w-7 md:h-8 md:w-8" />
              </div>
              <h3 className="text-3xl md:text-5xl font-light mb-6 leading-[1.15] text-navy-950">
                Initiate a <br className="hidden md:block" /><span className="font-semibold italic">Mediation</span>
              </h3>
              <p className="text-base md:text-lg mb-8 max-w-sm text-navy-600">
                Get your queries answered on a complimentary zoom call with our team.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 items-center mt-auto">
              <a
                href="/initiate-mediation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <MagneticButton
                  enableMotion
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto uppercase tracking-widest font-sans font-bold border-2 border-navy-950/10 hover:border-navy-950"
                >
                  Select & Inquire
                  <ArrowRight className="h-4 w-4 ml-2" />
                </MagneticButton>
              </a>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute bottom-[-10%] right-[-10%] opacity-5 rotate-12 transition-transform duration-1000 group-hover:scale-125 text-navy-950">
              <ShieldCheck size={300} className="md:w-[400px] md:h-[400px]" />
            </div>
          </motion.div>

          {/* Training Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`group relative rounded-4xl md:rounded-[2.5rem] p-8 md:p-14 overflow-hidden border-2 transition-all duration-500 flex flex-col justify-between min-h-[400px] md:min-h-[500px] ${
              activeForm === "training" 
                ? "border-gold-600 bg-gold-50 shadow-2xl scale-[1.02] z-10" 
                : activeForm === "mediation"
                  ? "hidden md:flex bg-white border-black/5"
                  : "border-black/5 bg-white hover:border-gold-500/20 shadow-sm hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            <div className="relative z-10">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-gold-500 flex items-center justify-center text-navy-950 mb-8 md:mb-10 transition-transform group-hover:rotate-12">
                <Clock className="h-7 w-7 md:h-8 md:w-8" />
              </div>
              <h3 className="text-3xl md:text-5xl font-light text-navy-950 mb-6 leading-[1.15]">
                Reserve a <br className="hidden md:block" /><span className="font-semibold italic">Training</span>
              </h3>
              <p className="text-navy-600 text-base md:text-lg mb-8 max-w-sm">
                Get your queries answered on a brief phone call with our academy coordinator.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 items-center mt-auto">
              <a
                href="/reserve-training"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <MagneticButton
                  enableMotion
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto uppercase tracking-widest font-sans font-bold border-2 transition-all duration-500 bg-gold-500 text-navy-950 border-gold-500 hover:bg-white hover:text-navy-950 hover:border-navy-950/10"
                >
                  Reserve Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </MagneticButton>
              </a>
            </div>
            
            {/* Background Decorative Element */}
            <div className="absolute bottom-[-10%] right-[-10%] opacity-[0.03] rotate-[-15deg] transition-transform duration-1000 group-hover:scale-125 text-navy-950">
              <User size={300} className="md:w-[400px] md:h-[400px]" />
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
