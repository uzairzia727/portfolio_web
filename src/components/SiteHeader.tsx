"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const projectLinks = [
  { label: "AI / ML", href: "#projects-aiml" },
  { label: "Automations", href: "#projects-automation" },
  { label: "SQL / Databases", href: "#projects-sql" },
  { label: "Shopify", href: "#projects-shopify" },
  { label: "WordPress", href: "#projects-wordpress" },
  { label: "Hardware", href: "#projects-hardware" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/60 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link href="#home" className="font-display text-lg tracking-tight text-mist">
            UZ<span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-mist/70 lg:flex" aria-label="Primary">
            <Link className="transition hover:text-mist" href="#home">
              Home
            </Link>
            <Link className="transition hover:text-mist" href="#about">
              About
            </Link>

            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 transition hover:text-mist"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Projects
                <span className="text-[10px] text-mist/40">▾</span>
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 translate-y-3 scale-95 rounded-2xl border border-white/12 bg-ink/90 p-3 opacity-0 shadow-2xl shadow-black/60 backdrop-blur-2xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-2 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-2 group-focus-within:scale-100 group-focus-within:opacity-100">
                <p className="px-2 pb-2 text-[10px] uppercase tracking-[0.22em] text-mist/40">Jump to category</p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="#projects"
                    className="rounded-xl px-3 py-2 text-xs text-mist/70 transition hover:bg-white/5 hover:text-mist"
                  >
                    All projects
                  </Link>
                  {projectLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="rounded-xl px-3 py-2 text-xs text-mist/70 transition hover:bg-white/5 hover:text-mist"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link className="transition hover:text-mist" href="#experience">
              Experience
            </Link>
            <a
              className="transition hover:text-mist"
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
              className="cv-glow hidden rounded-full bg-gradient-to-r from-accent to-accent-muted px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition hover:brightness-110 sm:inline-flex"
            >
              Download CV
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-mist lg:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

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
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/5"
                aria-label="Close menu"
                onClick={close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2 text-sm text-mist/80">
              <Link href="#home" onClick={close} className="rounded-xl px-3 py-3 hover:bg-white/5">
                Home
              </Link>
              <Link href="#about" onClick={close} className="rounded-xl px-3 py-3 hover:bg-white/5">
                About
              </Link>
              <Link href="#experience" onClick={close} className="rounded-xl px-3 py-3 hover:bg-white/5">
                Experience
              </Link>
              <a
                href="https://github.com/uzairzia727"
                onClick={close}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-xl px-3 py-3 hover:bg-white/5"
              >
                GitHub
              </a>
              <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="px-1 pb-2 text-[10px] uppercase tracking-[0.22em] text-mist/40">Projects</p>
                <Link href="#projects" onClick={close} className="block rounded-lg px-2 py-2 hover:bg-white/5">
                  All projects
                </Link>
                {projectLinks.map((l) => (
                  <Link key={l.href} href={l.href} onClick={close} className="block rounded-lg px-2 py-2 hover:bg-white/5">
                    {l.label}
                  </Link>
                ))}
              </div>
              <a
                href="/cv.pdf"
                download="Muhammad_Uzair_Zia_CV.pdf"
                className="cv-glow mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink"
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
