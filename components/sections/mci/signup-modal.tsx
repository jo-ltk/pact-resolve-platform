"use client"

import { motion } from "framer-motion";
import { X, Upload, CheckCircle2, Loader2, Phone, Mail, User, GraduationCap, Link2, History, Briefcase, FileCheck } from "lucide-react";
import { useState, type FormEvent, useRef } from "react";
import { cn } from "@/lib/utils";

interface MCISignupModalProps {
  onClose: () => void;
}

export function MCISignupModal({ onClose }: MCISignupModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [files, setFiles] = useState<{ resume: File | null; certificates: File | null }>({
    resume: null,
    certificates: null
  });
  
  const resumeRef = useRef<HTMLInputElement>(null);
  const certificatesRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    if (files.resume) formData.append("resumeFile", files.resume);
    if (files.certificates) formData.append("certificatesFile", files.certificates);

    try {
      const response = await fetch("/api/content/mci-signup", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (type: 'resume' | 'certificates', file: File | null) => {
    if (file && file.type !== 'application/pdf') {
      alert("Please upload PDF files only.");
      return;
    }
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-10 bg-navy-950/60 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] relative max-h-[95vh] flex flex-col"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center text-navy-950 hover:bg-gold-500 hover:text-white transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-none">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-light text-navy-950 uppercase tracking-tight">Application <span className="text-gold-500 font-medium">Received</span></h3>
                <p className="text-navy-950/60 max-w-sm mx-auto">
                  Thank you for your interest in MCI. We've received your details and will get back to you shortly.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="space-y-2">
                <span className="text-gold-500 text-sm uppercase tracking-[0.4em] font-bold">
                  Challenger Registration
                </span>
                <h3 className="text-4xl font-light text-navy-950 tracking-tight leading-none uppercase">
                  Sign up as <span className="text-gold-500 font-medium">Challenger</span>
                </h3>
                <p className="text-navy-950/40 text-xs uppercase tracking-widest font-medium">Mediation Championship India</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2 group">
                    <label className="text-sm uppercase tracking-widest font-bold text-navy-950/40 group-focus-within:text-gold-500 transition-colors flex items-center gap-2">
                      <User className="w-3 h-3" /> Name
                    </label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="Your full name"
                      className="w-full bg-navy-50/50 border-b border-navy-100 px-0 py-3 text-navy-950 placeholder:text-navy-200 focus:outline-none focus:border-gold-500 transition-all font-light"
                    />
                  </div>

                  {/* University */}
                  <div className="space-y-2 group">
                    <label className="text-sm uppercase tracking-widest font-bold text-navy-950/40 group-focus-within:text-gold-500 transition-colors flex items-center gap-2">
                      <GraduationCap className="w-3 h-3" /> University
                    </label>
                    <input 
                      required
                      name="university"
                      type="text" 
                      placeholder="University name"
                      className="w-full bg-navy-50/50 border-b border-navy-100 px-0 py-3 text-navy-950 placeholder:text-navy-200 focus:outline-none focus:border-gold-500 transition-all font-light"
                    />
                  </div>

                  {/* Year of Study */}
                  <div className="space-y-2 group">
                    <label className="text-sm uppercase tracking-widest font-bold text-navy-950/40 group-focus-within:text-gold-500 transition-colors flex items-center gap-2">
                      <Briefcase className="w-3 h-3" /> Year of Study
                    </label>
                    <input 
                      required
                      name="yearOfStudy"
                      type="text" 
                      placeholder="e.g. 4th Year"
                      className="w-full bg-navy-50/50 border-b border-navy-100 px-0 py-3 text-navy-950 placeholder:text-navy-200 focus:outline-none focus:border-gold-500 transition-all font-light"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2 group">
                    <label className="text-sm uppercase tracking-widest font-bold text-navy-950/40 group-focus-within:text-gold-500 transition-colors flex items-center gap-2">
                      <User className="w-3 h-3" /> Category
                    </label>
                    <select 
                      required
                      name="category"
                      className="w-full bg-navy-50/50 border-b border-navy-100 px-0 py-3 text-navy-950 focus:outline-none focus:border-gold-500 transition-all font-light appearance-none"
                    >
                      <option value="">Select Category</option>
                      <option value="Mediator">Mediator</option>
                      <option value="Mediation Counsel">Mediation Counsel (Negotiator)</option>
                    </select>
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-2 group">
                    <label className="text-sm uppercase tracking-widest font-bold text-navy-950/40 group-focus-within:text-gold-500 transition-colors flex items-center gap-2">
                      <Link2 className="w-3 h-3" /> LinkedIn Handle
                    </label>
                    <input 
                      required
                      name="linkedin"
                      type="text" 
                      placeholder="URL or @handle"
                      className="w-full bg-navy-50/50 border-b border-navy-100 px-0 py-3 text-navy-950 placeholder:text-navy-200 focus:outline-none focus:border-gold-500 transition-all font-light"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 group">
                    <label className="text-sm uppercase tracking-widest font-bold text-navy-950/40 group-focus-within:text-gold-500 transition-colors flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder="email@example.com"
                      className="w-full bg-navy-50/50 border-b border-navy-100 px-0 py-3 text-navy-950 placeholder:text-navy-200 focus:outline-none focus:border-gold-500 transition-all font-light"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2 group">
                    <label className="text-sm uppercase tracking-widest font-bold text-navy-950/40 group-focus-within:text-gold-500 transition-colors flex items-center gap-2">
                      <Phone className="w-3 h-3" /> WhatsApp Number
                    </label>
                    <input 
                      required
                      name="phone"
                      type="tel" 
                      placeholder="+91 00000 00000"
                      className="w-full bg-navy-50/50 border-b border-navy-100 px-0 py-3 text-navy-950 placeholder:text-navy-200 focus:outline-none focus:border-gold-500 transition-all font-light"
                    />
                  </div>
                </div>

                {/* Resume / History Text */}
                <div className="space-y-2 group">
                  <label className="text-sm uppercase tracking-widest font-bold text-navy-950/40 group-focus-within:text-gold-500 transition-colors flex items-center gap-2">
                    <History className="w-3 h-3" /> Mediation Resume & Competition History
                  </label>
                  <textarea 
                    required
                    name="resumeHistory"
                    placeholder="Describe your mediation experience and competition history..."
                    rows={4}
                    className="w-full bg-navy-50/50 border-b border-navy-100 px-0 py-3 text-navy-950 placeholder:text-navy-200 focus:outline-none focus:border-gold-500 transition-all font-light resize-none"
                  />
                </div>

                {/* File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Resume PDF */}
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-widest font-bold text-navy-950/40 flex items-center gap-2">
                      <Upload className="w-3 h-3" /> Mediation Resume (PDF)
                    </label>
                    <div 
                      onClick={() => resumeRef.current?.click()}
                      className={cn(
                        "relative cursor-pointer group/file h-32 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 text-center",
                        files.resume ? "border-gold-500 bg-gold-50/20" : "border-navy-100 hover:border-gold-500 hover:bg-navy-50/50"
                      )}
                    >
                      <input 
                        type="file" 
                        ref={resumeRef}
                        className="hidden" 
                        accept=".pdf"
                        onChange={(e) => handleFileChange('resume', e.target.files?.[0] || null)}
                      />
                      {files.resume ? (
                        <>
                          <CheckCircle2 className="w-6 h-6 text-gold-500 mb-2" />
                          <p className="text-xs text-navy-950 font-medium truncate w-full px-4">{files.resume.name}</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-navy-200 group-hover/file:text-gold-500 transition-all mb-2" />
                          <p className="text-xs text-navy-950/40 font-medium uppercase tracking-tighter">Attach Resume</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Certificates PDF */}
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-widest font-bold text-navy-950/40 flex items-center gap-2">
                      <FileCheck className="w-3 h-3" /> Past Certificates (PDF)
                    </label>
                    <div 
                      onClick={() => certificatesRef.current?.click()}
                      className={cn(
                        "relative cursor-pointer group/file h-32 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 text-center",
                        files.certificates ? "border-gold-500 bg-gold-50/20" : "border-navy-100 hover:border-gold-500 hover:bg-navy-50/50"
                      )}
                    >
                      <input 
                        type="file" 
                        ref={certificatesRef}
                        className="hidden" 
                        accept=".pdf"
                        onChange={(e) => handleFileChange('certificates', e.target.files?.[0] || null)}
                      />
                      {files.certificates ? (
                        <>
                          <CheckCircle2 className="w-6 h-6 text-gold-500 mb-2" />
                          <p className="text-xs text-navy-950 font-medium truncate w-full px-4">{files.certificates.name}</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-navy-200 group-hover/file:text-gold-500 transition-all mb-2" />
                          <p className="text-xs text-navy-950/40 font-medium uppercase tracking-tighter">Attach Certificates</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-2xl bg-navy-950 text-white flex items-center justify-center gap-3 hover:bg-gold-500 transition-all disabled:opacity-50 disabled:hover:bg-navy-950 font-bold uppercase tracking-[0.2em] text-xs shadow-lg shadow-navy-950/20 group/submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle2 className="w-4 h-4 opacity-0 group-hover/submit:opacity-100 transition-opacity" />
                    </>
                  )}
                </button>
                <p className="text-sm text-center text-navy-950/30 uppercase tracking-widest">
                  Secure submission to official@mediationchampionship.com
                </p>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
