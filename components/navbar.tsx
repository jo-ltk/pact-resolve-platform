"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
          "fixed top-0 left-0 right-0 z-50 flex items-center bg-navy-950 transition-opacity duration-500 border-b border-white/10",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ height: "var(--nav-height, 72px)" }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6">
          {/* Logo: Left aligned, flat, no container */}
          <Link
            href="/"
            onClick={() => handleNavClick("/")}
            className="flex shrink-0 items-center transition-opacity hover:opacity-90"
            aria-label="PACT Home"
          >
            <span className="font-sans text-2xl font-black tracking-tighter text-white">
              PACT
            </span>
          </Link>

          {/* Menu: Right aligned text links per design or center */}
          <div className="hidden h-full items-center gap-8 md:flex ml-auto mr-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "relative flex h-full items-center font-sans text-[13px] font-bold uppercase tracking-widest transition-colors",
                  pathname === item.href 
                    ? "text-gold-500" 
                    : "text-white/70 hover:text-white"
                )}
              >
                {item.label}
                {/* Active State: bottom border */}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full bg-gold-500" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA: Right aligned primary action */}
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
      <div className="h-[56px] md:h-[72px]" />

      {/* Mobile Menu: Slide-in panel from right */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] md:hidden transition-all duration-300",
          mobileMenuOpen ? "visible" : "invisible"
        )}
      >
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Panel */}
        <div 
          className={cn(
            "absolute top-0 right-0 h-full w-[300px] bg-navy-950 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10 h-[64px]">
            <span className="font-sans text-xl font-black text-white tracking-widest uppercase">PACT</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-gold-500 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-col p-6 gap-0 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "py-5 font-sans text-sm font-bold uppercase tracking-widest border-b border-white/5 transition-colors",
                  pathname === item.href 
                    ? "text-gold-500" 
                    : "text-white/70 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="mt-8">
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                <button
                  className="w-full rounded-full bg-gold-500 py-4 font-sans text-sm font-medium tracking-wide text-navy-950 shadow-sm transition-all duration-200 ease-in-out hover:brightness-110 active:scale-95"
                >
                  Try Mediation Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
