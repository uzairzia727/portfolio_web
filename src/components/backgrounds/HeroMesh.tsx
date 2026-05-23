"use client";

import { useEffect, useRef } from "react";
import { useLightMotion } from "@/hooks/useLightMotion";

const ACCENT = { r: 56, g: 189, b: 248 };
const LINK_DISTANCE = 132;
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;
const MOUSE_RADIUS = 110;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  accent: boolean;
};

function particleCount(light: boolean, reduced: boolean) {
  if (reduced) return 14;
  if (light) return 24;
  return 58;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: rand(-0.28, 0.28),
    vy: rand(-0.28, 0.28),
    radius: rand(1, 2.2),
    accent: Math.random() < 0.14,
  };
}

export function HeroMesh() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const light = useLightMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const interactive = !light && !reducedMotion;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let visible = true;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, active: false };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = particleCount(light, reducedMotion);
      if (particles.length === 0) {
        particles = Array.from({ length: target }, () => createParticle(width, height));
      } else if (particles.length < target) {
        while (particles.length < target) particles.push(createParticle(width, height));
      } else if (particles.length > target) {
        particles = particles.slice(0, target);
      }

      particles.forEach((p) => {
        p.x = Math.min(width, Math.max(0, p.x));
        p.y = Math.min(height, Math.max(0, p.y));
      });
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onLeave = () => {
      mouse.active = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(wrap);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    resize();

    if (interactive) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseout", onLeave);
    }

    const speedMul = reducedMotion ? 0.35 : 1;

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      if (!visible) return;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (interactive && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_RADIUS_SQ && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.55;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.x += p.vx * speedMul;
        p.y += p.vy * speedMul;

        if (p.x <= 0 || p.x >= width) {
          p.vx *= -1;
          p.x = Math.max(0, Math.min(width, p.x));
        }
        if (p.y <= 0 || p.y >= height) {
          p.vy *= -1;
          p.y = Math.max(0, Math.min(height, p.y));
        }

        p.vx *= 0.992;
        p.vy *= 0.992;

        const maxV = reducedMotion ? 0.35 : 0.85;
        const v = Math.hypot(p.vx, p.vy);
        if (v > maxV) {
          p.vx = (p.vx / v) * maxV;
          p.vy = (p.vy / v) * maxV;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > LINK_DISTANCE_SQ) continue;

          const dist = Math.sqrt(distSq);
          const t = 1 - dist / LINK_DISTANCE;
          const accentLink = a.accent || b.accent;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          if (accentLink) {
            ctx.strokeStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${0.1 + t * 0.22})`;
          } else {
            ctx.strokeStyle = `rgba(232, 244, 252, ${0.03 + t * 0.09})`;
          }
          ctx.lineWidth = accentLink ? 0.85 : 0.55;
          ctx.stroke();
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.accent) {
          ctx.fillStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, 0.88)`;
          ctx.shadowColor = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, 0.65)`;
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = "rgba(232, 244, 252, 0.38)";
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      observer.disconnect();
      if (interactive) {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseout", onLeave);
      }
    };
  }, [light]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,rgba(10,15,26,0.55)_70%,rgba(10,15,26,0.92)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/80" />
    </div>
  );
}
