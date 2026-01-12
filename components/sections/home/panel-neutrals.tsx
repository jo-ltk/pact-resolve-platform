"use client";

import Image from "next/image";
import { Link2 } from "lucide-react";

const members = [
  {
    name: "Jonathan Rodrigues",
    role: "Lead Mediator & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
  },
  {
    name: "Kurian Joseph",
    role: "Retd. Judge, Supreme Court of India",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
  },
  {
    name: "Gita Mittal",
    role: "Retd. Judge, Chief Justice (JKHC)",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
  },
  {
    name: "J P Sengh",
    role: "Senior Advocate & Mediator",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
  }
];

export function PanelNeutrals() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 bg-black/5 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-black/60">Expertise</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight text-black">
              Panel of Neutrals
            </h2>
          </div>
          <p className="max-w-md text-black/60 font-light text-lg">
            Our panel comprises distinguished legal professionals and seasoned mediators dedicated to impartial resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, i) => (
            <div key={i} className="group flex flex-col items-center text-center">
              <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image
                  src={member.image}
                  alt={member.name}
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
              <p className="text-sm text-black/40 font-mono italic">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
