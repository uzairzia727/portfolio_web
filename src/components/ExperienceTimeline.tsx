"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/portfolio";
import { StackFloater } from "@/components/StackFloater";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceTimeline() {
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = track.current;
    const line = rail.current;
    if (!root || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            end: "bottom 40%",
            scrub: 0.45,
          },
        }
      );

      const cards = root.querySelectorAll<HTMLElement>("[data-job]");
      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 78%",
          end: "bottom 22%",
          onEnter: () => card.classList.add("job-lit"),
          onEnterBack: () => card.classList.add("job-lit"),
          onLeave: () => card.classList.remove("job-lit"),
          onLeaveBack: () => card.classList.remove("job-lit"),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={track} className="relative mx-auto mt-10 max-w-3xl pb-12 sm:mt-14 sm:pb-16">
      <div className="absolute left-[11px] top-4 h-[calc(100%-48px)] w-px overflow-hidden rounded-full md:left-[15px]" aria-hidden>
        <div className="h-full w-full bg-gradient-to-b from-transparent via-white/12 to-transparent" />
        <div
          ref={rail}
          className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-b from-accent via-accent-muted to-accent-deep opacity-90 shadow-[0_0_32px_rgba(56,189,248,0.55)]"
        />
      </div>

      <div className="flex flex-col gap-12 md:gap-16">
        {experiences.map((job) => (
          <article
            key={job.id}
            data-job
            className="exp-card relative ml-8 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-[transform,box-shadow,background-color] duration-300 will-change-transform sm:ml-10 sm:rounded-2xl sm:p-6 md:ml-12 md:p-8 [&.job-lit]:border-accent/35 [&.job-lit]:bg-white/[0.06] [&.job-lit]:shadow-[0_18px_60px_-20px_rgba(56,189,248,0.35)]"
          >
            <span
              className="absolute -left-[41px] top-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-accent/55 bg-accent/35 shadow-[0_0_20px_rgba(56,189,248,0.75)] md:-left-[53px]"
              aria-hidden
            >
              <span className="h-2 w-2 rounded-full bg-mist opacity-95" />
            </span>

            <div className="flex flex-col gap-5 md:flex-row md:justify-between md:gap-12">
              <header className="max-w-xl space-y-1">
                <p className="text-xs uppercase tracking-[0.24em] text-accent">{job.duration}</p>
                <h3 className="font-display text-lg text-mist sm:text-xl md:text-2xl">{job.title}</h3>
                <p className="text-sm text-mist/70">{job.company}</p>
                <p className="text-xs text-mist/45">{job.meta}</p>
              </header>

              <StackFloater stackIds={job.stackIds} />
            </div>

            <div className="experience-panel mt-5 grid overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.04] backdrop-blur-md md:backdrop-blur-xl">
              <ul className="grid gap-2 px-5 py-4 text-sm leading-relaxed text-mist/72 md:px-6 md:py-5">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1.5 min-h-[6px] w-1.5 min-w-[6px] rounded-full bg-accent" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
