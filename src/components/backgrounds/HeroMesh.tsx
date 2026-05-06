"use client";

export function HeroMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-1/4 top-1/4 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-accent-deep/30 blur-3xl" />
      <div
        className="absolute left-1/2 top-1/2 h-[min(90vw,640px)] w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{ perspective: "1200px" }}
      >
        <div className="relative mx-auto h-full w-full animate-spin-slow">
          <div className="absolute inset-8 rounded-[40%] border border-accent/25 shadow-[0_0_60px_rgba(56,189,248,0.15)]" />
          <div className="absolute inset-16 rotate-12 rounded-[36%] border border-mist/10" />
          <div className="absolute inset-24 -rotate-6 rounded-[30%] border border-accent-muted/20" />
          <div className="absolute inset-[30%] rounded-full border border-dashed border-accent/15" />
        </div>
      </div>
    </div>
  );
}
