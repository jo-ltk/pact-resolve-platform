"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { Video, Phone } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 border border-black/5 divide-y md:divide-y-0 md:divide-x divide-black/5 rounded-4xl overflow-hidden shadow-2xl shadow-black/5">
          {/* Zoom CTA */}
          <div className="p-12 lg:p-16 flex flex-col items-start justify-center space-y-8 hover:bg-slate-50 transition-colors group">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Video className="h-7 w-7" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-light text-black leading-tight max-w-sm">
              Get Your Queries Answered on a Complimentary Zoom Call
            </h3>
            <Link href="/initiate-mediation">
              <MagneticButton variant="primary" size="lg" className="px-8 bg-navy-900 hover:brightness-110 active:scale-95 transition-all">
                Initiate a Mediation
              </MagneticButton>
            </Link>
          </div>

          {/* Phone CTA */}
          <div className="p-12 lg:p-16 flex flex-col items-start justify-center space-y-8 hover:bg-slate-50 transition-colors group">
            <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <Phone className="h-7 w-7" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-light text-black leading-tight max-w-sm">
              Get Your Queries Answered on a Brief Phone Call
            </h3>
            <Link href="/training">
              <MagneticButton variant="secondary" size="lg" className="px-8 bg-gold-500 text-navy-950 hover:brightness-110 active:scale-95 transition-all">
                Reserve a Training
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
