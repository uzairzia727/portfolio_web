import { certifications, skills } from "@/data/portfolio";

const blocks = [
  { title: "AI / ML", items: skills.aiml },
  { title: "Web & automation", items: skills.web },
  { title: "Data & cloud", items: skills.data },
  { title: "Networking", items: skills.net },
  { title: "Tools", items: skills.tools },
];

export function About() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(260px,0.82fr)] lg:gap-14">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.26em] text-accent">About</p>
        <h2 className="font-display text-3xl text-mist sm:text-4xl">
          Engineering calm, deterministic systems{' '}
          <span className="text-accent">with probabilistic intelligence on top.</span>
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-mist/72 sm:text-[15px]">
          B.S. Computer Engineering, Bahria University, Islamabad (2020-2024). I combine pragmatic full-stack delivery
          (Shopify, WordPress, Django, REST APIs) with applied ML/NLP pipelines, vector stores, and LLM tooling. Comfortable
          from ER diagrams through deployment.
        </p>
        <div className="grid gap-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-md sm:grid-cols-2 sm:p-7">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-mist/40">Languages</p>
            <p className="mt-3 text-sm text-mist">
              English <span className="text-mist/45">(professional)</span>
            </p>
            <p className="text-sm text-mist">
              Urdu <span className="text-mist/45">(native)</span>
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-mist/40">Volunteering</p>
            <p className="mt-3 text-sm text-mist/80">FIFA World Cup Qualifiers 2023 · Event Coordinator.</p>
          </div>
        </div>
      </div>

      <aside className="space-y-7">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-mist/40">Certifications</p>
          <ul className="mt-4 space-y-3 text-sm text-mist/75">
            {certifications.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          {blocks.map((b) => (
            <div key={b.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{b.title}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {b.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/[0.08] bg-black/35 px-2.5 py-1 text-[11px] text-mist/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
