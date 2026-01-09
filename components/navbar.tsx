"use client";

import { useRef, useEffect, useState } from "react";
import { Menu, X, MousePointer2 } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 transition-all duration-500 pointer-events-none ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ paddingTop: `${isScrolled ? "0.75rem" : "1.5rem"}` }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-8 rounded-full transition-all duration-500 ${
          isScrolled
            ? "border border-foreground/15 bg-white/50 backdrop-blur-xl px-6 py-3 shadow-xl"
            : "border border-foreground/20 bg-white/60 backdrop-blur-md px-8 py-4 shadow-lg"
        }`}
      >
        <Link
          href="/"
          onClick={() => handleNavClick("/")}
          className="flex shrink-0 items-center gap-2 transition-transform hover:scale-105"
          aria-label="PACT Home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 transition-all duration-300 hover:scale-110 hover:bg-primary/25">
            <span className="font-sans text-lg font-bold text-primary">
              P
            </span>
          </div>
          <span className="hidden font-sans text-lg font-semibold tracking-tight text-foreground sm:inline">
            PACT
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`group relative font-sans text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-foreground/70"
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/#contact">
            <MagneticButton
              variant="primary"
              className="hidden sm:inline-flex items-center gap-2"
            >
              Try Mediation Now
              <MousePointer2 className="h-4 w-4" />
            </MagneticButton>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-foreground/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-6 right-6 mt-4 rounded-2xl border border-foreground/15 bg-white/90 backdrop-blur-xl shadow-xl overflow-hidden pointer-events-auto">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-4 py-2 rounded-lg transition-all text-left font-sans text-sm ${
                  pathname === item.href 
                    ? "text-primary bg-primary/5" 
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
              <button
                className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-sans text-sm font-medium transition-all hover:bg-primary/90 mt-2 flex items-center justify-center gap-2"
              >
                Try Mediation Now
                <MousePointer2 className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
