"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ExperienceField() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    const dots = root.querySelectorAll<HTMLElement>("[data-node]");
    const ctx = gsap.context(() => {
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          y: "+=18",
          opacity: 0.35,
          duration: 2.4 + i * 0.05,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.08,
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.14),transparent_55%)]" />
      {Array.from({ length: 42 }).map((_, i) => (
        <span
          key={i}
          data-node
          className="absolute h-1 w-1 rounded-full bg-accent/40 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
        />
      ))}
    </div>
  );
}
