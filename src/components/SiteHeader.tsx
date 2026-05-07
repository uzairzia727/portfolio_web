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

  const navLinkStyle = "transition hover:text-mist focus:outline-none focus:text-mist";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/60 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link href="#home" className="font-display text-lg tracking-tight text-mist focus:outline-none">
            UZAIR<span className="text-accent">.</span>
          </Link>

          {/* Desktop Navigation - Added Services */}
          <nav className="hidden items-center gap-8 text-sm text-mist/70 lg:flex" aria-label="Primary">
            <Link className={navLinkStyle} href="#home">Home</Link>
            <Link className={navLinkStyle} href="#about">About</Link>
            <Link className={navLinkStyle} href="#projects">Projects</Link>
            <Link className={navLinkStyle} href="#experience">Experience</Link>
            {/* New Services Link */}
            <Link className={navLinkStyle} href="#services">Services</Link>
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
    <div 
      ref={overlay} 
      className="absolute inset-0 bg-black/80 backdrop-blur-md will-change-[opacity]" 
      onClick={close} 
      aria-hidden 
    />
    
    <div
      ref={sheet}
      className="absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col rounded-t-[2.5rem] border-t border-white/10 bg-ink/95 p-6 pb-10 shadow-2xl will-change-transform"
      style={{ transform: 'translateZ(0)' }} 
      role="dialog"
      aria-modal="true"
    >
      {/* Header section - Fixed height */}
      <div className="mb-6 flex items-center justify-between px-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"></p>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-mist active:scale-95 transition-transform focus:outline-none"
          onClick={close}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      {/* Scrollable Links Container - Takes up remaining space */}
      <div className="flex flex-1 flex-col overflow-y-auto pr-1">
        <div className="flex flex-col gap-0.5 font-medium text-mist">
          {["home", "about", "projects", "experience", "services"].map((item) => (
            <Link 
              key={item}
              href={`#${item}`} 
              onClick={close} 
              className="rounded-2xl px-4 py-3 text-lg capitalize active:bg-white/5 focus:outline-none"
            >
              {item}
            </Link>
          ))}
          <a
            href="https://github.com/uzairzia727"
            onClick={close}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-2xl px-4 py-3 text-lg active:bg-white/5 focus:outline-none"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Fixed Button Section - Always stays at the bottom of the drawer */}
      <div className="mt-4 pt-2">
        <a
          href="/cv.pdf"
          download="Muhammad_Uzair_Zia_CV.pdf"
          className="flex w-full items-center justify-center rounded-full bg-accent py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink shadow-lg shadow-accent/20 active:scale-[0.98] transition-transform focus:outline-none"
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