"use client";

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdminPage) return;
    setIsLoaded(true);
    // Prevent scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, isAdminPage]);

  if (isAdminPage) return null;

  const navItems = [
    { 
      label: "Mediation", 
      href: "/mediation",
      subItems: [
        { label: "Why Mediate", href: "/mediation/why-mediate" },
        { label: "Rules & Fee", href: "/mediation/rules-fees" },
        { label: "Mediator Panel", href: "/mediation/mediator-panel" },
        { label: "Case Studies", href: "/mediation/case-studies" },
      ]
    },
    { 
      label: "Academy", 
      href: "/academy",
      subItems: [
        { label: "Mediation", href: "/academy/mediation" },
        { label: "Arbitration", href: "/academy/arbitration" },
        { label: "Negotiation", href: "/academy/negotiation" },
      ]
    },
    { 
      label: "Resources", 
      href: "/resources",
      subItems: [
        { label: "Mediation Simplified", href: "/resources/mediation-simplified" },
        { label: "Mediation Review", href: "/resources/national-mediation-review" },
        { label: "Mission Mediation Podcast", href: "/resources/podcast" },
        { label: "Mediation Blog & Articles", href: "/resources/blog" },
        { label: "Mediation Clauses & Toolkits", href: "/resources/clauses-toolkits" },
      ]
    },
    { 
      label: "Events", 
      href: "/events",
      subItems: [
        { label: "Mediation Champions League", href: "/events/mci" },
        { label: "Mission Mediation Conclave", href: "/events/mmc" },
        { label: "National ImPACT Awards", href: "/events/niaam" },
        { label: "Advocate Maximus", href: "/events/advocate-maximus" },
        { label: "Events & Projects", href: "/events/projects" },
      ]
    },
    { 
      label: "Ecosystem", 
      href: "/ecosystem",
      subItems: [
        { label: "Pledge", href: "/ecosystem/pledge" },
        { label: "About Us", href: "/ecosystem/about-us" },
        { label: "Collaborators", href: "/ecosystem/collaborators" },
        { label: "Team", href: "/ecosystem/team" },
      ]
    },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center bg-navy-950 transition-opacity duration-500 border-b border-white/10 min-h-[72px] md:min-h-[80px] lg:min-h-[88px] py-3 md:py-0",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6">
          {/* Logo: Original Layout */}
          <Link
            href="/"
            onClick={() => handleNavClick("/")}
            className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="PACT Home"
          >
            <div className="relative h-10 md:h-12 lg:h-14 w-auto transition-transform duration-300">
              <Image
                src="/images/pact-logo.png"
                alt="PACT"
                width={150}
                height={60}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-sans text-lg md:text-xl lg:text-2xl font-black tracking-tighter text-white leading-none">
                PACT
              </span>
              <span className="text-[8px] md:text-[9px] lg:text-xs font-medium text-white/70 tracking-wide leading-tight block mt-0.5">
                Mediation Academy<br />&amp; Institutional Mediation Services
              </span>
            </div>
          </Link>

          {/* Menu: Original Layout position + New Fonts/Animations */}
          {/* Menu: Evenly spaced alignment (removed ml-auto) */}
          <div className="hidden h-full items-center gap-6 lg:gap-8 xl:gap-10 md:flex">
            {navItems.map((item) => (
              <div key={item.href} className="relative group h-full flex items-center">
                <Link
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="relative py-2 flex items-center gap-1"
                >
                  <span className={cn(
                    "font-sans text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300",
                    pathname === item.href || (item.subItems && pathname.startsWith(item.href))
                      ? "text-gold-500" 
                      : "text-white/70 group-hover:text-white"
                  )}>
                    {item.label}
                  </span>
                  {item.subItems && (
                     <ChevronDown className={cn(
                       "w-3 h-3 transition-transform duration-300 group-hover:rotate-180",
                        pathname.startsWith(item.href) ? "text-gold-500" : "text-white/70 group-hover:text-white"
                     )} />
                  )}
                  
                  {/* Hover/Active Indicator: New Animation */}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-px bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out",
                    (pathname === item.href || (item.subItems && pathname.startsWith(item.href))) && "scale-x-100"
                  )} />
                </Link>

                {/* Dropdown Menu */}
                {item.subItems && (
                  <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-64 pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                    <div className="bg-[#0b101b]/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl shadow-black/50 rounded-lg overflow-hidden">
                      <div className="flex flex-col gap-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => handleNavClick(sub.href)}
                            className={cn(
                              "group/item relative flex items-center justify-between px-4 py-3 text-[11px] font-sans font-bold uppercase tracking-[0.15em] transition-all duration-200 rounded-md overflow-hidden",
                              pathname === sub.href 
                                ? "bg-white/5 text-gold-500" 
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                          >
                            <span className="relative z-10">{sub.label}</span>
                            
                            {/* Hover Arrow */}
                            <ChevronDown className={cn(
                              "w-3 h-3 -rotate-90 transition-all duration-300 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 relative z-10",
                              pathname === sub.href && "opacity-100 translate-x-0"
                            )} />
                            

                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA: Original Button Style */}
          <div className="flex items-center gap-4">
            <Link href="/#contact">
              <button
                className="hidden sm:inline-flex items-center rounded-full bg-gold-500 px-8 py-3 font-sans text-[14px] font-medium tracking-wide text-navy-950 shadow-sm transition-all duration-200 ease-in-out hover:scale-[1.02] hover:brightness-110"
              >
                Try Mediation Now
              </button>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Spacing for fixed navbar */}
      <div className="h-[80px] md:h-[80px] lg:h-[88px] bg-navy-950" />

      {/* Mobile Menu: Slide-in panel from right */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-60 bg-navy-950/80 backdrop-blur-sm lg:hidden transition-opacity"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-70 h-full w-[310px] bg-navy-950 border-l border-white/10 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 h-[72px] border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-auto shrink-0">
                    <Image
                      src="/images/pact-logo.png"
                      alt="PACT"
                      width={100}
                      height={40}
                      className="h-full w-auto object-contain"
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-sans text-xl font-black tracking-tighter text-white uppercase leading-none">
                      PACT
                    </span>
                    <span className="text-xs font-medium text-white/70 tracking-wide leading-tight mt-1">
                      Mediation Academy<br />&amp; Institutional Mediation Services
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:text-gold-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pt-6 px-4 pb-20 custom-scrollbar">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, i) => {
                    const isExpanded = expandedItem === i;
                    const isActive = pathname === item.href || (item.subItems && pathname.startsWith(item.href));

                    return (
                      <div key={item.href} className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className={cn(
                              "flex-1 py-4 px-4 font-sans text-[13px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300",
                              isActive
                                ? "text-gold-500 bg-gold-500/5" 
                                : "text-white/70 hover:text-white"
                            )}
                          >
                            {item.label}
                          </Link>
                          {item.subItems && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedItem(isExpanded ? null : i);
                              }}
                              className={cn(
                                "w-12 h-12 flex items-center justify-center text-white/30 transition-transform duration-300",
                                isExpanded && "rotate-180 text-gold-500"
                              )}
                            >
                              <ChevronDown className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        
                        {/* Mobile Submenu with Animation */}
                        {item.subItems && (
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-1 ml-4 mt-1 pb-4 border-l border-white/10">
                                  {item.subItems.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      onClick={() => handleNavClick(sub.href)}
                                      className={cn(
                                        "relative py-3 pl-8 pr-4 font-sans text-[13px] font-medium transition-colors",
                                        pathname === sub.href
                                          ? "text-gold-500"
                                          : "text-white/40 hover:text-white"
                                      )}
                                    >
                                      <div className={cn(
                                        "absolute left-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-colors",
                                        pathname === sub.href ? "bg-gold-500" : "bg-white/10"
                                      )} />
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 px-2">
                  <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                    <button
                      className="w-full rounded-2xl bg-gold-500 py-4 font-sans text-sm font-bold tracking-widest text-navy-950 shadow-xl shadow-gold-500/10 transition-all duration-200 hover:brightness-110 active:scale-95 uppercase"
                    >
                      Try Mediation Now
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
