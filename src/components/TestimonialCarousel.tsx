"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MapPin, Quote, Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";

// Optimized timings for a snappy, professional production feel
const AUTOPLAY_MS = 2500; 
const SWIPE_THRESHOLD = 48;
const TRANSITION_MS = 500; 
const TOTAL = testimonials.length;
const LOOP_SLIDES = [...testimonials, ...testimonials];

function useSlidesPerView() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const mqSm = window.matchMedia("(min-width: 640px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (mqLg.matches) setCount(3);
      else if (mqSm.matches) setCount(2);
      else setCount(1);
    };

    update();
    mqSm.addEventListener("change", update);
    mqLg.addEventListener("change", update);
    return () => {
      mqSm.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
    };
  }, []);

  return count;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "fill-white/10 text-white/15"
          }`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="testimonial-card flex h-full min-h-[300px] flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-5 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.75)] sm:min-h-[320px] sm:rounded-3xl sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <Quote className="h-5 w-5 shrink-0 text-accent/50" aria-hidden />
        <StarRating rating={item.rating} />
      </div>

      <p className="flex-1 text-[13px] leading-relaxed text-mist/78 sm:text-sm">{item.review}</p>

      <div className="mt-5 space-y-3 border-t border-white/[0.07] pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            {item.domain}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-mist/55">
            {item.region}
          </span>
        </div>

        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist/45">{item.projectScope}</p>

        <div>
          <p className="font-display text-base text-mist sm:text-lg">{item.name}</p>
          <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-mist/45">
            <MapPin className="h-3 w-3 shrink-0 text-accent/70" aria-hidden />
            {item.location}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialCarousel() {
  const slidesPerView = useSlidesPerView();
  const viewportRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [stepPx, setStepPx] = useState(0);

  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const dragging = useRef(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      setStepPx(viewport.clientWidth / slidesPerView);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [slidesPerView]);

  const activeDot = ((index % TOTAL) + TOTAL) % TOTAL;

  const next = useCallback(() => {
    setTransition(true);
    setIndex((i) => i + 1);
  }, []);

  const prev = useCallback(() => {
    const i = indexRef.current;
    if (i <= 0) {
      setTransition(false);
      setIndex(TOTAL);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
          setIndex(TOTAL - 1);
        });
      });
      return;
    }
    setTransition(true);
    setIndex(i - 1);
  }, []);

  const goTo = useCallback((target: number) => {
    setTransition(true);
    setIndex(target);
  }, []);

  // Autoplay handler tracking the explicit hover/touch state
  useEffect(() => {
    if (isPaused || stepPx === 0) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, stepPx, isPaused]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") return;
    if (indexRef.current >= TOTAL) {
      setTransition(false);
      setIndex((i) => i - TOTAL);
      requestAnimationFrame(() => setTransition(true));
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    dragging.current = true;
    setIsPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (touchDeltaX.current <= -SWIPE_THRESHOLD) next();
    else if (touchDeltaX.current >= SWIPE_THRESHOLD) prev();
    touchDeltaX.current = 0;
    // Safely resume slide loop shortly after swipe completes
    setTimeout(() => setIsPaused(false), 500);
  };

  const offsetPx = index * stepPx;

  return (
    <section id="testimonials" className="relative z-10 border-t border-white/5 py-16 sm:py-20 lg:py-24">
      <header className="mb-10 max-w-3xl space-y-3 sm:mb-12">
        <p className="text-xs uppercase tracking-[0.26em] text-accent">Client feedback</p>
        <h2 className="scroll-mt-28 font-display text-[1.6rem] leading-snug text-mist sm:text-3xl lg:text-4xl">
          Trusted by teams across the UK &amp; US
        </h2>
      </header>

      <div aria-roledescription="carousel" aria-label="Client testimonials">
        <div
          ref={viewportRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-ink to-transparent sm:w-12" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-ink to-transparent sm:w-12" />

          <div
            className="flex will-change-transform"
            style={{
              transform: stepPx > 0 ? `translate3d(-${offsetPx}px, 0, 0)` : undefined,
              transition: transition ? `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 1, 0.5, 1)` : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {LOOP_SLIDES.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className="box-border shrink-0 px-2 sm:px-2.5"
                style={{ width: stepPx > 0 ? stepPx : `${100 / slidesPerView}%` }}
              >
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Go to review ${i + 1}`}
              aria-current={activeDot === i ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeDot === i ? "w-6 bg-accent" : "w-2 bg-white/20 hover:bg-white/35"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}