"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link2 } from "lucide-react";
import { PanelMember } from "@/lib/db/schemas";

export function PanelNeutrals() {
  const [members, setMembers] = useState<PanelMember[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/content/panel-members", { cache: 'no-store' });
        const data = await res.json();
        if (data.success) {
          setMembers(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch panel members", error);
      }
    }
    fetchMembers();
  }, []);

  if (members.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8 text-center md:text-left">
          <div className="items-center md:items-start flex flex-col md:block">
            <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 bg-black/5 mb-6">
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-black/60">Expertise</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-light tracking-tight text-black leading-tight">
              Panel of Neutrals
            </h2>
          </div>
          <p className="max-w-md text-black/60 font-light text-base md:text-lg mx-auto md:mx-0">
            Our panel comprises distinguished legal professionals and seasoned mediators dedicated to impartial resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div key={member._id?.toString()} className="group flex flex-col items-center text-center">
              <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-6 filter md:grayscale md:group-hover:grayscale-0 transition-all duration-500">
                <Image
                  src={member.image.url}
                  alt={member.image.alt || member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button className="w-full py-3 bg-white text-black text-sm font-medium tracking-wide rounded-full flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors">
                    View Profile <Link2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-medium text-black mb-1">{member.name}</h3>
              <p className="text-sm text-black/40 font-mono">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

