"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Linkedin, Instagram, Youtube, Send } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import { WhatsAppButton } from "./whatsapp-button";

export function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/content/global-settings", { cache: 'no-store' });
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data) {
            setSettings(result.data);
          }
        }
      } catch (e) {
        console.error("Failed to fetch footer settings", e);
      }
    };
    fetchSettings();
  }, []);

  const companyName = settings?.companyName || "PACT";
  const email = settings?.email || "official@thepact.in";
  const address = settings?.address || "Postal Address: PACT International Headquarters, ADR Tower, New Delhi, India.";
  
  // Map platforms to icons
  const platformIcons: Record<string, any> = {
    facebook: Facebook,
    linkedin: Linkedin,
    instagram: Instagram,
    youtube: Youtube
  };
  return (
    <footer className="bg-navy-900 text-white pt-16 md:pt-24 pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-20">
          {/* Left Column: Branding and Links */}
          <div className="space-y-10 md:space-y-12 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">{companyName}</h2>
              <p className="text-white/60 max-w-sm text-xs md:text-sm leading-relaxed">
                Mediation Academy<br />& Institutional Mediation Services
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:gap-16 w-full text-left">
              <div className="space-y-4">
                <h4 className="text-xs md:text-xs  uppercase tracking-widest text-white/40">Connect With Us</h4>
                <div className="flex flex-col gap-2">
                  {(settings?.socialLinks && settings.socialLinks.length > 0) ? (
                    settings.socialLinks.filter((s: any) => s.enabled).map((social: any, idx: number) => {
                      const Icon = platformIcons[social.platform.toLowerCase()] || Send;
                      return (
                        <Link key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs md:text-sm hover:text-gold-500 transition-colors group italic capitalize">
                          <Icon className="h-4 w-4" /> {social.platform}
                        </Link>
                      );
                    })
                  ) : (
                    <>
                      <Link href="https://www.facebook.com/thepactindia/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs md:text-sm hover:text-gold-500 transition-colors group">
                        <Facebook className="h-4 w-4" /> Facebook
                      </Link>
                      <Link href="https://www.linkedin.com/company/the-pact/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs md:text-sm hover:text-gold-500 transition-colors group">
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </Link>
                      <Link href="https://www.instagram.com/pact_india/?hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs md:text-sm hover:text-gold-500 transition-colors group">
                        <Instagram className="h-4 w-4" /> Instagram
                      </Link>
                      <Link href="https://www.youtube.com/@MissionMediationbyPACT" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs md:text-sm hover:text-gold-500 transition-colors group">
                        <Youtube className="h-4 w-4" /> YouTube
                      </Link>
                    </>
                  )}
                  <div className="flex items-center gap-3 text-xs md:text-sm hover:text-gold-500 transition-colors group cursor-pointer">
                    <WhatsAppButton />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xs md:text-xs  uppercase tracking-widest text-white/40">Quick Links</h4>
                <div className="flex flex-col gap-2 ">
                  <Link href="/privacy" className="text-xs md:text-sm hover:text-gold-500 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="text-xs md:text-sm hover:text-gold-500 transition-colors">Terms of Service</Link>
                  <Link href="/resources" className="text-xs md:text-sm hover:text-gold-500 transition-colors">Resources</Link>
                  <Link href="/academy" className="text-xs md:text-sm hover:text-gold-500 transition-colors">Academy</Link>
                  <Link href="/admin" className="text-xs md:text-sm text-white/20 hover:text-gold-500 transition-colors pt-2 border-t border-white/5">Portal Access</Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Newsletter and Contact */}
          <div className="space-y-12">
            <div className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10">
              <h4 className="text-base md:text-lg font-medium mb-2">Subscribe to our Newsletter</h4>
              <p className="text-white/50 text-xs md:text-sm mb-6">Stay updated with the latest in mediation and ADR.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="grow bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-xs md:text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
                <MagneticButton variant="primary" className="bg-gold-500 hover:bg-gold-500/80 h-10 w-10 p-0 flex items-center justify-center">
                  <Send className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 text-left">
                <h4 className="text-xs uppercase tracking-widest text-white/40">Email</h4>
                <a href={`mailto:${email}`} className="text-sm hover:text-gold-500 transition-colors block">{email}</a>
              </div>
              <div className="space-y-2 text-left">
                <h4 className="text-xs uppercase tracking-widest text-white/40">Phone</h4>
                {(settings?.contactPersons && settings.contactPersons.length > 0) ? (
                  settings.contactPersons.map((person: any, idx: number) => (
                    <p key={idx} className="text-sm text-white/70">{person.name}: {person.phone}</p>
                  ))
                ) : (
                  <>
                    <p className="text-sm text-white/70">Nisshant: +91 91234 56789</p>
                    <p className="text-sm text-white/70">Jonathan: +91 98765 43210</p>
                  </>
                )}
              </div>
              <div className="md:col-span-2 space-y-2 text-left">
                <h4 className="text-xs uppercase tracking-widest text-white/40">Address</h4>
                <p className="text-sm text-white/70 leading-relaxed max-w-full lg:max-w-xs">
                  {address}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} {companyName}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <p>
            Powered By{" "}
            <a
              href="https://wizforbizcreative.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:text-white transition-colors"
            >
              Wiz For Biz Creative
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
