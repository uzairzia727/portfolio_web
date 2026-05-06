"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-chip", { y: -12, opacity: 0, duration: 0.75 }, 0)
        .from(".hero-title .hero-line", { y: 48, opacity: 0, stagger: 0.12, duration: 1.05 }, 0.12)
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.9 }, "-=0.55")
        .from(".hero-cta-row", { y: 18, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hero-portrait", { scale: 1.06, opacity: 0, y: 12, duration: 1.1 }, "-=1");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={root} 
      className="grid flex-1 items-start gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(260px,0.92fr)] lg:items-center lg:gap-16"
    >
      {/* --- BLOCK 1: NAME & CHIP (Top on Mobile, Left on Desktop) --- */}
      <div className="space-y-6 lg:col-start-1">
        <p className="hero-chip inline-flex max-w-[100vw] flex-wrap items-center rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent sm:px-4 sm:text-[11px] sm:tracking-[0.28em]">
          Computer Engineer · AI / ML
        </p>

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
          <div className="pointer-events-none absolute -bottom-6 left-8 right-8 h-28 rounded-[32px] bg-gradient-to-t from-ink via-ink/50 to-transparent" />
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
            Hire / collaborate
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