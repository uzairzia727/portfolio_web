"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  id: string;
  children: ReactNode;
  bleed?: ReactNode;
  className?: string;
  innerClassName?: string;
};

export function UniversalSection({ id, children, bleed, className = "", innerClassName = "" }: Props) {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const inner = el.querySelector<HTMLElement>("[data-universal-zoom]");
    if (!inner) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "bottom 12%",
          scrub: 0.75,
        },
      });

      // Avoid filter: blur on this wrapper (blurs descendants and breaks card hover sharpening).
      tl.fromTo(inner, { scale: 1.06, opacity: 0.4, y: 28 }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.52,
        ease: "power2.out",
      }).to(inner, {
        scale: 1.05,
        opacity: 0.15,
        y: -18,
        duration: 0.48,
        ease: "power2.in",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id={id}
      className={`relative min-h-[min(100svh,900px)] scroll-mt-20 overflow-hidden py-14 sm:min-h-[min(100svh,920px)] sm:scroll-mt-24 sm:py-20 lg:py-28 ${className}`}
    >
      {bleed}
      <div
        data-universal-zoom
        className={`relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col px-4 will-change-[transform,opacity] sm:px-5 lg:px-8 ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
