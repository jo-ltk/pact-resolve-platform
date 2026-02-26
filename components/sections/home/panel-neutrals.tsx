"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import type { PanelMember } from "@/lib/db/schemas";

export function PanelNeutrals() {
  const fallbackMembers: PanelMember[] = [
    { _id: "fallback-1" as any, name: "Justice A.K. Sikri", role: "Former Judge, Supreme Court of India", image: { url: "/panel/dummy1.jpg", alt: "Justice A.K. Sikri" }, order: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { _id: "fallback-2" as any, name: "Sriram Panchu", role: "Senior Advocate & Mediator", image: { url: "/panel/dummy2.jpg", alt: "Sriram Panchu" }, order: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { _id: "fallback-3" as any, name: "Laila Ollapally", role: "Founder, CAMP", image: { url: "/panel/dummy3.jpg", alt: "Laila Ollapally" }, order: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { _id: "fallback-4" as any, name: "Tara Ollapally", role: "Mediator, CAMP", image: { url: "/panel/dummy4.jpg", alt: "Tara Ollapally" }, order: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() }
  ];

  const [members, setMembers] = useState<PanelMember[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/content/panel-members", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setMembers(data.data);
        } else {
          setMembers(fallbackMembers);
        }
      } catch (error) {
        console.error("Failed to fetch panel members", error);
        setMembers(fallbackMembers);
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
              <span className="text-xs md:text-xs uppercase tracking-widest text-black/60">
                Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-light tracking-tight text-black leading-tight">
              Panel of Neutrals
            </h2>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4 max-w-md mx-auto md:mx-0">
            <p className="text-black/60 font-light text-base md:text-lg">
              Our panel comprises distinguished legal professionals and seasoned mediators dedicated to impartial
              resolution.
            </p>
            <Link
              href="/mediation/mediator-panel"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black text-white px-6 py-2 text-sm font-medium tracking-wide hover:bg-black/90 hover:border-black/20 transition-colors"
            >
              See More Neutrals
            </Link>
          </div>
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
                {member.profileUrl && (
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <a
                      href={member.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-white text-black text-sm font-medium tracking-wide rounded-full flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
                    >
                      View LinkedIn Profile <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-medium text-black mb-1">{member.name}</h3>
              <p className="text-sm text-black/40">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

