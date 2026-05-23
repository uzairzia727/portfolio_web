"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLightMotion } from "@/hooks/useLightMotion";

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
  const light = useLightMotion();

  useEffect(() => {
    if (light) return;
    const el = root.current;
    if (!el) return;

    const inner = el.querySelector<HTMLElement>("[data-universal-zoom]");
    if (!inner) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [light]);

  return (
    <section
      ref={root}
      id={id}
      className={`relative z-0 scroll-mt-20 overflow-hidden bg-ink py-14 sm:scroll-mt-24 sm:py-20 lg:py-28 ${className}`}
    >
      {bleed}
      <div
        data-universal-zoom
        className={`relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col px-4 sm:px-5 lg:px-8 ${
          light ? "" : "will-change-[transform,opacity]"
        } ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
