"use client";

import { useState } from "react";
import { MagneticButton } from "@/components/magnetic-button";
import { Video, Phone, Mail, User, Clock, CheckCircle2, X, ArrowRight, MessageSquare, ShieldCheck } from "lucide-react";
import Image from "next/image";
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

const trainingSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  contact: z.string().min(10, "Valid contact number required"),
  trainingType: z.string().min(1, "Training type is required"),
  mode: z.string(),
  bestTime: z.string(),
});

export function CTASection() {
  const [activeForm, setActiveForm] = useState<"mediation" | "training" | null>(null);

  const mediationForm = useForm<z.infer<typeof mediationSchema>>({
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

  function onMediationSubmit(data: z.infer<typeof mediationSchema>) {
    console.log(data);
    setActiveForm(null);
  }

  function onTrainingSubmit(data: z.infer<typeof trainingSchema>) {
    console.log(data);
    setActiveForm(null);
  }

  return (
    <section className="bg-[#fcfdfd] py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Header Section */}
        <div className="text-center mb-20 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-sm font-semibold mb-6 border border-gold-500/20"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Connect With Us</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light text-navy-950 mb-6 tracking-tight leading-[1.1]"
          >
            Got a query or simply ready? <br />
            <span className="font-semibold text-navy-900 italic">We’ll get help to you right away.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-navy-600/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Connect with our Mediation Convenor or Trainings Coordinator to learn more about initiating a mediation or registering for the academy.
          </motion.p>
        </div>

        {/* Support & Contact Bar - Sleek Floating Design */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {[
            { time: "9am – 3pm IST", phone: "9765987280", label: "Mediation Convenor" },
            { time: "3pm – 9pm IST", phone: "9958488857", label: "Trainings Coordinator" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="flex items-center gap-5 bg-white border border-navy-950/5 p-4 pr-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="h-12 w-12 rounded-xl bg-navy-950 flex items-center justify-center text-white shrink-0 group-hover:bg-gold-500 transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gold-600 font-bold mb-0.5">{item.time}</div>
                <div className="text-lg font-semibold text-navy-950 tracking-tight">{item.phone}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dual Actions - Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Mediation Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`group relative rounded-[2.5rem] p-10 lg:p-14 overflow-hidden border-2 transition-all duration-500 flex flex-col justify-between min-h-[500px] ${
              activeForm === "mediation" 
                ? "border-navy-950 bg-navy-950 text-white shadow-2xl scale-[1.02] z-10" 
                : "border-black/5 bg-white hover:border-navy-950/20 shadow-sm hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            <div className="relative z-10">
              <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-10 transition-colors ${
                activeForm === "mediation" ? "bg-gold-500 text-navy-950" : "bg-navy-950 text-white group-hover:bg-gold-500"
              }`}>
                <Video className="h-8 w-8" />
              </div>
              <h3 className={`text-4xl lg:text-5xl font-light mb-6 leading-[1.15] ${activeForm === "mediation" ? "text-white" : "text-navy-950"}`}>
                Initiate a <br /><span className="font-semibold italic">Mediation</span>
              </h3>
              <p className={`text-lg mb-8 max-w-sm ${activeForm === "mediation" ? "text-white/60" : "text-navy-600"}`}>
                Get your queries answered on a complimentary zoom call with our team.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 items-center">
              <MagneticButton
                enableMotion
                size="lg"
                variant={activeForm === "mediation" ? "primary" : "ghost"}
                className={`uppercase tracking-widest font-sans font-bold border-2 ${
                  activeForm === "mediation" 
                    ? "bg-white text-navy-950 border-white hover:bg-gold-500 hover:border-gold-500" 
                    : "border-navy-950/10 hover:border-navy-950"
                }`}
                onClick={() => setActiveForm(activeForm === "mediation" ? null : "mediation")}
              >
                {activeForm === "mediation" ? "Close Form" : "Select & Inquire"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </MagneticButton>
            </div>

            {/* Background Decorative Element */}
            <div className={`absolute bottom-[-10%] right-[-10%] opacity-5 rotate-12 transition-transform duration-1000 group-hover:scale-125 ${
              activeForm === "mediation" ? "text-white" : "text-navy-950"
            }`}>
              <ShieldCheck size={400} />
            </div>
          </motion.div>

          {/* Training Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`group relative rounded-[2.5rem] p-10 lg:p-14 overflow-hidden border-2 transition-all duration-500 flex flex-col justify-between min-h-[500px] ${
              activeForm === "training" 
                ? "border-gold-600 bg-gold-50 shadow-2xl scale-[1.02] z-10" 
                : "border-black/5 bg-white hover:border-gold-500/20 shadow-sm hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            <div className="relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-gold-500 flex items-center justify-center text-navy-950 mb-10 transition-transform group-hover:rotate-12">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-4xl lg:text-5xl font-light text-navy-950 mb-6 leading-[1.15]">
                Reserve a <br /><span className="font-semibold italic">Training</span>
              </h3>
              <p className="text-navy-600 text-lg mb-8 max-w-sm">
                Get your queries answered on a brief phone call with our academy coordinator.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 items-center">
              <MagneticButton
                enableMotion
                size="lg"
                variant="primary"
                className={`uppercase tracking-widest font-sans font-bold border-2 transition-all duration-500 ${
                  activeForm === "training" 
                    ? "bg-navy-950 text-white border-navy-950 hover:bg-gold-600 hover:border-gold-600 shadow-lg" 
                    : "bg-gold-500 text-navy-950 border-gold-500 hover:bg-white hover:text-navy-950 hover:border-navy-950/10"
                }`}
                onClick={() => setActiveForm(activeForm === "training" ? null : "training")}
              >
                {activeForm === "training" ? "Close Form" : "Reserve Now"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </MagneticButton>
            </div>
            
            {/* Background Decorative Element */}
            <div className="absolute bottom-[-10%] right-[-10%] opacity-[0.03] rotate-[-15deg] transition-transform duration-1000 group-hover:scale-125 text-navy-950">
              <User size={400} />
            </div>
          </motion.div>
        </div>

        {/* Global Dynamic Form Container - Appears below both cards */}
        <AnimatePresence mode="wait">
          {activeForm && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: 30 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 30 }}
              className="mt-12 overflow-hidden"
            >
              <div className="py-12 lg:py-20 border-t border-navy-950/5">
                <div className="flex items-start justify-between mb-16 px-2">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`h-1.5 w-12 rounded-full ${activeForm === "mediation" ? "bg-navy-950" : "bg-gold-500"}`} />
                      <span className="text-sm font-bold uppercase tracking-widest text-navy-600/60">Official Request Form</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-light text-navy-950 mb-3 tracking-tight">
                      {activeForm === "mediation" ? "Initiate A Mediation" : "Reserve A Training"}
                    </h2>
                    {activeForm === "mediation" ? (
                      <p className="text-navy-500 flex items-center gap-2 text-lg">
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                        All data is encrypted & strictly confidential
                      </p>
                    ) : (
                       <p className="text-navy-500 text-lg">Professional training solutions for the academy staff & partners</p>
                    )}
                  </div>
                  <button 
                    onClick={() => setActiveForm(null)}
                    className="h-12 w-12 rounded-full border border-navy-950/10 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white hover:rotate-90 transition-all duration-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {activeForm === "mediation" ? (
                  <Form {...mediationForm}>
                    <form onSubmit={mediationForm.handleSubmit(onMediationSubmit)} className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <FormField control={mediationForm.control} name="fullName" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base font-semibold text-navy-900">Your Full Name</FormLabel>
                            <FormControl><Input placeholder="John Doe" {...field} className="h-14 px-6 rounded-xl bg-transparent border-navy-950/10 focus:border-navy-950/30 focus:ring-0 transition-all text-lg" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={mediationForm.control} name="email" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base font-semibold text-navy-900">Work Email Address</FormLabel>
                            <FormControl><Input placeholder="john@company.com" {...field} className="h-14 px-6 rounded-xl bg-transparent border-navy-950/10 focus:border-navy-950/30 focus:ring-0 transition-all text-lg" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={mediationForm.control} name="contact" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base font-semibold text-navy-900">Primary Contact Number</FormLabel>
                            <FormControl><Input placeholder="+91 00000 00000" {...field} className="h-14 px-6 rounded-xl bg-transparent border-navy-950/10 focus:border-navy-950/30 focus:ring-0 transition-all text-lg" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        <FormField control={mediationForm.control} name="disputeType" render={({ field }) => (
                          <FormItem className="space-y-3 font-medium">
                            <FormLabel>Type of Dispute</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger className="h-14 rounded-xl bg-transparent border-navy-950/10 focus:ring-0"><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                              <SelectContent><SelectItem value="Commercial">Commercial</SelectItem><SelectItem value="Family">Family</SelectItem><SelectItem value="Workplace">Workplace</SelectItem><SelectItem value="Community">Community</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
                            </Select>
                          </FormItem>
                        )} />
                        <FormField control={mediationForm.control} name="mode" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Preferred Mode</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger className="h-14 rounded-xl bg-transparent border-navy-950/10 focus:ring-0"><SelectValue placeholder="Select mode" /></SelectTrigger></FormControl>
                              <SelectContent><SelectItem value="Offline">Offline</SelectItem><SelectItem value="Online">Online</SelectItem><SelectItem value="Hybrid">Hybrid</SelectItem></SelectContent>
                            </Select>
                          </FormItem>
                        )} />
                        <FormField control={mediationForm.control} name="timeline" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Timeline / Deadline</FormLabel>
                            <FormControl><Input placeholder="e.g. Next 30 days" {...field} className="h-14 px-6 rounded-xl bg-transparent border-navy-950/10" /></FormControl>
                          </FormItem>
                        )} />
                        <FormField control={mediationForm.control} name="bestTime" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>CallBack Preference</FormLabel>
                            <FormControl><Input placeholder="e.g. Wed PM" {...field} className="h-14 px-6 rounded-xl bg-transparent border-navy-950/10" /></FormControl>
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="space-y-10 lg:col-span-1">
                          <FormField control={mediationForm.control} name="parallelLitigation" render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-navy-950 font-bold">Parallel Litigation Running?</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-8">
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="Yes" className="h-5 w-5 border-navy-950" /><FormLabel className="font-normal text-lg">Yes</FormLabel></div>
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="No" className="h-5 w-5 border-navy-950" /><FormLabel className="font-normal text-lg">No</FormLabel></div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )} />
                          <FormField control={mediationForm.control} name="otherSideOpen" render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-navy-950 font-bold">Other side open to mediation?</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-8">
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="Yes" className="h-5 w-5 border-navy-950" /><FormLabel className="font-normal text-lg">Yes</FormLabel></div>
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="No" className="h-5 w-5 border-navy-950" /><FormLabel className="font-normal text-lg">No</FormLabel></div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )} />
                        </div>
                        <FormField control={mediationForm.control} name="description" render={({ field }) => (
                          <FormItem className="lg:col-span-2 space-y-4">
                            <FormLabel className="text-navy-950 font-bold">Brief Description of the case (max 200 Words)</FormLabel>
                            <FormControl><Textarea placeholder="Please summarize the core dispute..." className="min-h-[160px] rounded-2xl bg-transparent border-navy-950/10 p-8 text-lg focus:border-navy-950/30 focus:ring-0" {...field} /></FormControl>
                          </FormItem>
                        )} />
                      </div>

                      <div className="pt-10 flex justify-center sm:justify-end">
                        <MagneticButton variant="primary" size="lg" className="font-bold bg-navy-950 text-white hover:bg-gold-500 shadow-2xl" type="submit">
                          Submit Application
                        </MagneticButton>
                      </div>
                    </form>
                  </Form>
                ) : (
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
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
