"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // GSAP Animations for Mobile Drawer
  useEffect(() => {
    if (!open) return;
    const panel = sheet.current;
    const veil = overlay.current;
    if (!panel || !veil) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(veil, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(panel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, [open]);

  const close = () => setOpen(false);

  // Standard link style to remove the white box (focus-outline-none)
  const navLinkStyle = "transition hover:text-mist focus:outline-none focus:text-mist";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/60 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link href="#home" className="font-display text-lg tracking-tight text-mist focus:outline-none">
            UZAIR<span className="text-accent">.</span>
          </Link>

          {/* Desktop Navigation - Simplified Projects */}
          <nav className="hidden items-center gap-8 text-sm text-mist/70 lg:flex" aria-label="Primary">
            <Link className={navLinkStyle} href="#home">
              Home
            </Link>
            <Link className={navLinkStyle} href="#about">
              About
            </Link>
            <Link className={navLinkStyle} href="#projects">
              Projects
            </Link>
            <Link className={navLinkStyle} href="#experience">
              Experience
            </Link>
            <a
              className={navLinkStyle}
              href="https://github.com/uzairzia727"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/cv.pdf"
              download="Muhammad_Uzair_Zia_CV.pdf"
              className="cv-glow hidden rounded-full bg-gradient-to-r from-accent to-accent-muted px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition hover:brightness-110 focus:outline-none sm:inline-flex"
            >
              Download CV
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-mist focus:outline-none lg:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

{/* Mobile Menu Drawer */}
{open ? (
  <div className="fixed inset-0 z-50 lg:hidden">
    {/* Optimized Overlay: Lower blur and hardware acceleration */}
    <div 
      ref={overlay} 
      className="absolute inset-0 bg-black/60 backdrop-blur-[4px] will-change-[opacity]" 
      onClick={close} 
      aria-hidden 
    />
    
    <div
      ref={sheet}
      className="absolute inset-x-0 bottom-0 max-h-[88dvh] rounded-t-[2.5rem] border-t border-white/10 bg-ink/98 p-8 shadow-2xl will-change-transform"
      style={{ transform: 'translateZ(0)' }} // Forces GPU rendering
      role="dialog"
      aria-modal="true"
    >
      <div className="mb-8 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mist/40"></p>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-mist active:scale-95 transition-transform focus:outline-none"
          onClick={close}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="flex flex-col gap-1 text-lg font-medium text-mist">
        {["home", "about", "projects", "experience"].map((item) => (
          <Link 
            key={item}
            href={`#${item}`} 
            onClick={close} 
            className="rounded-2xl px-4 py-4 capitalize active:bg-white/5 focus:outline-none"
          >
            {item}
          </Link>
        ))}
        <a
          href="https://github.com/uzairzia727"
          onClick={close}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-2xl px-4 py-4 active:bg-white/5 focus:outline-none"
        >
          GitHub
        </a>
        
        <a
          href="/cv.pdf"
          download="Muhammad_Uzair_Zia_CV.pdf"
          className="mt-6 flex items-center justify-center rounded-full bg-accent py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink shadow-lg shadow-accent/20 active:scale-[0.98] transition-transform focus:outline-none"
        >
          Download CV
        </a>
      </div>
    </div>
  </div>
) : null}

</>
  );
}