"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Mail } from "lucide-react";

const SOCIAL_ICON_WRAP = "flex h-[18px] w-[18px] shrink-0 items-center justify-center sm:h-5 sm:w-5";

const SOCIAL_LINK_CLASS =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-mist/45 transition-[color,background-color,border-color,transform] duration-300 hover:border-accent/45 hover:bg-accent/10 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 active:scale-95 sm:h-10 sm:w-10";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-chip", { y: -12, opacity: 0, duration: 0.75 }, 0)
        .from(".hero-social", { y: 8, opacity: 0, duration: 0.55 }, 0.2)
        .from(".hero-title .hero-line", { y: 48, opacity: 0, stagger: 0.12, duration: 1.05 }, 0.28)
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.9 }, "-=0.55")
        .from(".hero-cta-row", { y: 18, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hero-portrait", { scale: 1.06, opacity: 0, y: 12, duration: 1.1 }, "-=1");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={root} 
      /* FIXED: Changed lg:items-center to lg:items-start below */
      className="grid flex-1 items-start gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(260px,0.92fr)] lg:items-start lg:gap-16"
    >
      {/* --- BLOCK 1: NAME & CHIP (Top on Mobile, Left on Desktop) --- */}
      <div className="flex flex-col gap-3 sm:gap-4 lg:col-start-1">
        <p className="hero-chip inline-flex w-fit max-w-[100vw] flex-wrap items-center self-start rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent sm:px-4 sm:text-[11px] sm:tracking-[0.28em]">
          Computer Engineer · AI / ML
        </p>

        <div
          className="hero-social flex flex-row flex-nowrap items-center gap-3 self-start sm:gap-3.5"
          aria-label="Contact on WhatsApp or email"
        >
          <a
            href="https://wa.me/923331860154"
            target="_blank"
            rel="noopener noreferrer"
            className={SOCIAL_LINK_CLASS}
            aria-label="Chat on WhatsApp"
          >
            <span className={SOCIAL_ICON_WRAP}>
              <WhatsAppIcon className="h-full w-full" />
            </span>
          </a>
          <a
            href="mailto:uzairzia080@gmail.com"
            className={SOCIAL_LINK_CLASS}
            aria-label="Send email"
          >
            <span className={SOCIAL_ICON_WRAP}>
              <Mail className="h-full w-full" strokeWidth={1.75} aria-hidden />
            </span>
          </a>
        </div>

        <div className="hero-title font-display text-[2rem] leading-[1.08] tracking-tight text-mist min-[380px]:text-[2.35rem] sm:text-5xl lg:text-6xl">
          <div className="hero-line overflow-hidden">
            <span className="block">Muhammad</span>
          </div>
          <div className="hero-line overflow-hidden">
            <span className="block bg-gradient-to-r from-mist via-accent to-accent-muted bg-clip-text text-transparent">Uzair Zia</span>
          </div>
        </div>
      </div>

      {/* --- BLOCK 2: PORTRAIT (Middle on Mobile, Right on Desktop) --- */}
      <div className="relative mx-auto w-full max-w-[min(100%,380px)] sm:max-w-md lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-none">
        <div className="pointer-events-none absolute inset-[-18%] -z-10 rounded-[40px] bg-gradient-to-tr from-accent/25 via-accent-deep/10 to-transparent blur-3xl" />
        <div className="hero-portrait relative overflow-visible">
          <div className="hero-mask mx-auto aspect-[4/5] w-full max-w-[420px]">
            <Image
              src="/portrait.png"
              alt="Muhammad Uzair Zia"
              width={840}
              height={1050}
              priority
              className="h-full w-full object-cover object-[50%_12%]"
            />
          </div>
        </div>
      </div>

      {/* --- BLOCK 3: BIO & LINKS (Bottom on Mobile, Left on Desktop) --- */}
      <div className="space-y-7 lg:col-start-1">
        <p className="hero-sub max-w-xl text-[15px] leading-relaxed text-mist/75 sm:text-base lg:text-lg">
          Building end-to-end AI systems with LLM pipelines, agentic RAG, intelligent automation, and full-stack web solutions.
          Currently exploring multi-agent GPT orchestration to solve problems humans can&apos;t tackle alone.
        </p>

        <div className="hero-cta-row flex w-full flex-col gap-3 text-sm min-[440px]:flex-row min-[440px]:flex-wrap sm:gap-4">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-ink shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:bg-accent-muted sm:flex-initial"
          >
            Explore work
          </a>
          <a
            href="mailto:uzairzia080@gmail.com"
            className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/5 px-6 py-3 font-semibold text-mist backdrop-blur-md transition hover:border-accent/55 hover:bg-white/10"
          >
            Lets Collaborate
          </a>
        </div>

        <dl className="grid gap-5 border-t border-white/10 pt-7 text-xs text-mist/60 sm:grid-cols-2">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.22em] text-mist/40">Location</dt>
            <dd className="mt-2 text-sm text-mist">Islamabad, PK</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.22em] text-mist/40">Contact</dt>
            <dd className="mt-2 text-sm">
              uzairzia080@gmail.com
              <br />
              <span className="text-mist/60">0333-1880154</span>
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[10px] uppercase tracking-[0.22em] text-mist/40">LinkedIn</dt>
            <dd className="mt-2 text-sm text-accent">
              <a
                href="https://linkedin.com/in/muhammad-uzair-6882aa303"
                className="hover:text-mist"
                target="_blank"
                rel="noreferrer noopener"
              >
                linkedin.com/in/muhammad-uzair-6882aa303
              </a>
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[10px] uppercase tracking-[0.22em] text-mist/40">GitHub</dt>
            <dd className="mt-2 text-sm text-accent">
              <a
                href="https://github.com/uzairzia727"
                className="hover:text-mist"
                target="_blank"
                rel="noreferrer noopener"
              >
                github.com/uzairzia727
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}