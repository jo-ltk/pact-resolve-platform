"use client";

import Link from "next/link";
import { Facebook, Linkedin, Instagram, Youtube, Send } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-24 pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          {/* Left Column: Branding and Links */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-light tracking-tighter mb-4">PACT</h2>
              <p className="text-white/60 max-w-sm text-sm leading-relaxed">
                Professional Mediation Platform for International Dispute Resolution and Strategic Excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">Connect With Us</h4>
                <div className="flex flex-col gap-2">
                  <Link href="#" className="flex items-center gap-3 text-sm hover:text-gold-500 transition-colors group">
                    <Facebook className="h-4 w-4" /> Facebook
                  </Link>
                  <Link href="#" className="flex items-center gap-3 text-sm hover:text-gold-500 transition-colors group">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Link>
                  <Link href="#" className="flex items-center gap-3 text-sm hover:text-gold-500 transition-colors group">
                    <Instagram className="h-4 w-4" /> Instagram
                  </Link>
                  <Link href="#" className="flex items-center gap-3 text-sm hover:text-gold-500 transition-colors group">
                    <Youtube className="h-4 w-4" /> YouTube
                  </Link>
                  <Link href="#" className="flex items-center gap-3 text-sm hover:text-gold-500 transition-colors group">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.794 2.376 2.455-.774c1.026.549 1.914.887 3.093.887 3.181 0 5.767-2.586 5.767-5.767 0-3.18-2.587-5.772-5.772-5.772zm3.374 8.204c-.162.454-.794.859-1.28.915-.477.051-1.081.026-1.723-.171-.627-.192-1.291-.498-2.115-.846-1.464-.619-2.422-2.147-2.495-2.245-.073-.097-.597-.796-.597-1.522 0-.727.382-1.083.518-1.23.136-.147.297-.184.394-.184.097 0 .194.001.279.006.096.005.223-.037.35.267.127.304.437 1.062.474 1.139.037.077.061.168.012.267-.049.099-.074.159-.148.245-.074.086-.156.192-.223.257-.082.079-.168.165-.073.329.096.163.424.701.91 1.134.626.558 1.154.731 1.316.812.162.081.257.067.353-.043.097-.11.413-.482.524-.645.11-.162.222-.136.374-.081.152.055.96.452 1.125.534.165.082.275.123.315.191.04.067.04.391-.122.845z"/>
                    </svg> WhatsApp
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">Quick Links</h4>
                <div className="flex flex-col gap-2">
                  <Link href="/privacy" className="text-sm hover:text-gold-500 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="text-sm hover:text-gold-500 transition-colors">Terms of Service</Link>
                  <Link href="/resources" className="text-sm hover:text-gold-500 transition-colors">Resources</Link>
                  <Link href="/academy" className="text-sm hover:text-gold-500 transition-colors">Academy</Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Newsletter and Contact */}
          <div className="space-y-12">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h4 className="text-lg font-medium mb-2">Subscribe to our Newsletter</h4>
              <p className="text-white/50 text-sm mb-6">Stay updated with the latest in mediation and ADR.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="grow bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
                <MagneticButton variant="primary" className="bg-gold-500 hover:bg-gold-500/80 h-10 w-10 p-0 flex items-center justify-center">
                  <Send className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">Email</h4>
                <a href="mailto:official@thepact.in" className="text-sm hover:text-gold-500 transition-colors block">official@thepact.in</a>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">Phone</h4>
                <p className="text-sm text-white/70">Nisshant: +91 91234 56789</p>
                <p className="text-sm text-white/70">Jonathan: +91 98765 43210</p>
              </div>
              <div className="md:col-span-2 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">Address</h4>
                <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                  Postal Address: PACT International Headquarters, ADR Tower, New Delhi, India.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/30">
          <p>© 2026 PACT. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
