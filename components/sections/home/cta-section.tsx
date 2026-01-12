"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { Video, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="pt-0 pb-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-black/5 rounded-4xl overflow-hidden shadow-sm">
          {/* Zoom CTA */}
          <div className="relative isolate group min-h-[320px] flex flex-col items-start justify-center p-12 lg:p-16 overflow-hidden">
            <Image
              src="/hero/conference.png"
              alt="Zoom Call"
              fill
              className="absolute inset-0 object-cover -z-20 transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-navy-950/80 -z-10 transition-colors duration-500 group-hover:bg-navy-950/70" />
            
            <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 backdrop-blur-sm">
              <Video className="h-7 w-7" />
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-light text-white leading-tight max-w-sm mb-8">
              Get Your Queries Answered on a Complimentary Zoom Call
            </h3>
            
            <Link href="/initiate-mediation">
             <MagneticButton
  variant="primary"
  size="lg"
  className="
    px-10
    bg-white
    text-navy-950
    transition-all
    duration-300
    hover:bg-gold-500
    hover:text-navy-950
    hover:brightness-100
    active:scale-100
  "
>
  Initiate a Mediation
</MagneticButton>

            </Link>
          </div>

          {/* Phone CTA */}
          <div className="relative isolate group min-h-[320px] flex flex-col items-start justify-center p-12 lg:p-16 overflow-hidden border-t md:border-t-0 md:border-l border-white/10">
            <Image
              src="/hero/boardroom.png"
              alt="Phone Call"
              fill
              className="absolute inset-0 object-cover -z-20 transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-navy-900/80 -z-10 transition-colors duration-500 group-hover:bg-navy-900/70" />
            
            <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 backdrop-blur-sm">
              <Phone className="h-7 w-7" />
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-light text-white leading-tight max-w-sm mb-8">
              Get Your Queries Answered on a Brief Phone Call
            </h3>
            
            <Link href="/training">
             <MagneticButton
  variant="secondary"
  size="lg"
  className="
    px-10
    bg-gold-500
    text-navy-950
    transition-all
    duration-300
    hover:bg-white
    hover:text-navy-950
    hover:border
    hover:border-navy-950
    hover:brightness-100
    active:scale-100
  "
>
  Reserve a Training
</MagneticButton>

            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
