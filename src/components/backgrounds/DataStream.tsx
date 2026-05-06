"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function DataStream() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const strips = root.querySelectorAll<HTMLElement>("[data-strip]");
    const ctx = gsap.context(() => {
      strips.forEach((strip, i) => {
        gsap.fromTo(
          strip,
          { yPercent: -120, opacity: 0.2 },
          {
            yPercent: 120,
            opacity: 0.55,
            duration: 9 + i * 0.6,
            repeat: -1,
            ease: "none",
            delay: i * 0.4,
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          data-strip
          className="absolute h-40 w-px bg-gradient-to-b from-transparent via-accent/35 to-transparent"
          style={{ left: `${6 + i * 7}%`, top: "-20%" }}
        />
      ))}
    </div>
  );
}
