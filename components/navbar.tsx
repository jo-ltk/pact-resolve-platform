"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
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
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Mediation", href: "/mediation" },
    { label: "Academy", href: "/academy" },
    { label: "Resources", href: "/resources" },
    { label: "Events", href: "/events" },
    { label: "Ecosystem", href: "/ecosystem" },
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
            <div className="relative h-12 md:h-14 lg:h-16 w-auto transition-transform duration-300">
              <Image
                src="/images/pact-logo.png"
                alt="PACT"
                width={150}
                height={60}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-xl md:text-2xl lg:text-3xl font-black tracking-tighter text-white leading-none">
                PACT
              </span>
              <span className="text-[8px] md:text-[9px] lg:text-[10px] font-medium text-white/80 uppercase tracking-tighter md:tracking-tight lg:tracking-normal leading-[1.2] block max-w-[140px] md:max-w-[160px] lg:max-w-[180px]">
                The peacekeeping and<br />conflict resolution team
              </span>
            </div>
          </Link>

          {/* Menu: Original Layout position + New Fonts/Animations */}
          <div className="hidden h-full items-center gap-8 xl:gap-12 md:flex ml-auto mr-4 lg:mr-8 xl:mr-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative group py-2"
              >
                <span className={cn(
                  "font-sans text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300",
                  pathname === item.href 
                    ? "text-gold-500" 
                    : "text-white/70 group-hover:text-white"
                )}>
                  {item.label}
                </span>
                
                {/* Hover/Active Indicator: New Animation */}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-px bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out",
                  pathname === item.href && "scale-x-100"
                )} />
              </Link>
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
              className="fixed inset-0 z-[60] bg-navy-950/80 backdrop-blur-sm lg:hidden transition-opacity"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-[70] h-full w-[300px] bg-navy-950 border-l border-white/10 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 h-[64px]">
                <div className="flex items-center gap-3 max-w-[85%]">
                  <div className="relative h-12 w-auto shrink-0 transition-transform duration-300">
                    <Image
                      src="/images/pact-logo.png"
                      alt="PACT"
                      width={140}
                      height={50}
                      className="h-full w-auto object-contain"
                      priority
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-2xl font-black tracking-widest text-white uppercase leading-none">
                      PACT
                    </span>
                    <span className="text-[9px] font-medium text-white/70 uppercase tracking-wide leading-tight mt-1 block max-w-[140px]">
                      The peacekeeping and<br />conflict resolution team
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-gold-500 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "block py-4 font-sans text-sm font-bold uppercase tracking-widest border-b border-white/5 transition-all duration-300",
                        pathname === item.href 
                          ? "text-gold-500 border-l-2 border-gold-500 pl-4" 
                          : "text-white/70 hover:text-white hover:pl-4 hover:border-l-2 hover:border-white/20"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="mt-8 pt-8 border-t border-white/5">
                  <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                    <button
                      className="w-full rounded-full bg-gold-500 py-4 font-sans text-sm font-medium tracking-wide text-navy-950 shadow-sm transition-all duration-200 ease-in-out hover:brightness-110 active:scale-95"
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
