"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { projects, type ProjectCategory } from "@/data/portfolio";

const FILTERS: { id: ProjectCategory | "all"; label: string; hash?: string }[] = [
  { id: "all", label: "All work" },
  { id: "aiml", label: "AI / ML", hash: "projects-aiml" },
  { id: "automation", label: "Automations", hash: "projects-automation" },
  { id: "sql", label: "SQL / Databases", hash: "projects-sql" },
  { id: "shopify", label: "Shopify", hash: "projects-shopify" },
  { id: "wordpress", label: "WordPress", hash: "projects-wordpress" },
  { id: "hardware", label: "Hardware", hash: "projects-hardware" },
];

function safeHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function spanCls(span: (typeof projects)[number]["span"]) {
  switch (span) {
    case "hero":
      return "md:col-span-2 md:min-h-[280px] lg:row-span-2 lg:min-h-[320px]";
    case "wide":
      return "md:col-span-2";
    case "tall":
      return "md:row-span-2 lg:row-span-2";
    default:
      return "";
  }
}

export function ProjectsBento() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace("#", "");
      const map: Record<string, ProjectCategory> = {
        "projects-aiml": "aiml",
        "projects-automation": "automation",
        "projects-sql": "sql",
        "projects-shopify": "shopify",
        "projects-wordpress": "wordpress",
        "projects-hardware": "hardware",
      };
      const next = map[h];
      if (next) setFilter(next);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const filtered = useMemo(() => {
    return filter === "all" ? projects : projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="mt-14 space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.26em] text-accent">Portfolio</p>
        <h2 id="projects" className="scroll-mt-28 font-display text-[1.6rem] leading-snug text-mist sm:text-3xl lg:text-4xl">
          Projects
        </h2>
      </header>

      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
        {FILTERS.map((f) => {
          const active = f.id === "all" ? filter === "all" : filter === f.id;
          return (
            <button
              type="button"
              key={f.id}
              id={f.hash}
              aria-pressed={active}
              onClick={() => {
                setFilter(f.id);
                const targetId = f.id === "all" ? "projects" : f.hash;
                if (!targetId) return;
                history.replaceState(null, "", `#${targetId}`);
                document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                active
                  ? "border-accent/70 bg-accent/15 text-mist shadow-[0_0_24px_rgba(56,189,248,0.25)]"
                  : "border-white/10 bg-white/[0.03] text-mist/55 hover:border-accent/35 hover:text-mist"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="project-grid grid grid-cols-1 auto-rows-[minmax(240px,auto)] gap-4 sm:auto-rows-[minmax(220px,auto)] sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article
            key={p.id}
            className={`pcard group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-4 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.75)] sm:rounded-3xl sm:p-6 lg:rounded-3xl ${spanCls(p.span)}`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(56,189,248,0.18),transparent_55%)] opacity-75 transition-opacity duration-500 group-hover:opacity-100" />
            <header className="relative z-[1] flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="min-w-0 flex-1">
                <p className="break-words text-[10px] font-semibold uppercase tracking-[0.28em] text-accent/85 sm:text-[11px] sm:tracking-[0.32em]">{p.subtitle}</p>
                <h3 className="mt-3 break-words font-display text-xl text-mist sm:mt-4 sm:text-2xl">{p.title}</h3>
              </div>
              <span className="inline-flex shrink-0 self-start rounded-full border border-white/14 bg-black/55 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-mist/60 sm:text-[10px]">
                {FILTERS.find((flt) => flt.id === p.category)?.label ?? p.category}
              </span>
            </header>

            <p className="relative z-[1] mt-4 text-[13px] leading-relaxed text-mist/74 sm:mt-6 sm:text-sm">{p.description}</p>

            {p.highlight ? <p className="relative z-[1] mt-4 text-[13px] text-accent/90">{p.highlight}</p> : null}

            {p.url ? (
              <div className="relative z-[1] mt-4">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-accent/35 bg-accent/10 px-3 py-2 text-xs font-semibold text-accent transition hover:border-accent/55 hover:bg-accent/15"
                >
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                  <span className="truncate">{safeHostname(p.url)}</span>
                </a>
              </div>
            ) : null}

            <footer className="relative z-[1] mt-auto flex flex-wrap gap-2 pt-8">
              {p.tech.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[11px] text-mist/70">
                  {t}
                </span>
              ))}
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
