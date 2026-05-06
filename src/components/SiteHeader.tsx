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
            UZ<span className="text-accent">.</span>
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
          <div ref={overlay} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} aria-hidden />
          <div
            ref={sheet}
            className="absolute inset-x-0 bottom-0 max-h-[88dvh] rounded-t-3xl border border-white/12 bg-ink/95 p-6 shadow-[0_-18px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-mist">Navigate</p>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/5 focus:outline-none"
                onClick={close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-mist/80">
              <Link href="#home" onClick={close} className="rounded-xl px-3 py-3 hover:bg-white/5 focus:outline-none">
                Home
              </Link>
              <Link href="#about" onClick={close} className="rounded-xl px-3 py-3 hover:bg-white/5 focus:outline-none">
                About
              </Link>
              <Link href="#projects" onClick={close} className="rounded-xl px-3 py-3 hover:bg-white/5 focus:outline-none">
                Projects
              </Link>
              <Link href="#experience" onClick={close} className="rounded-xl px-3 py-3 hover:bg-white/5 focus:outline-none">
                Experience
              </Link>
              <a
                href="https://github.com/uzairzia727"
                onClick={close}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-xl px-3 py-3 hover:bg-white/5 focus:outline-none"
              >
                GitHub
              </a>
              
              <a
                href="/cv.pdf"
                download="Muhammad_Uzair_Zia_CV.pdf"
                className="cv-glow mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink focus:outline-none"
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