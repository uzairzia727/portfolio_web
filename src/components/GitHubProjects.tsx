import { ExternalLink, Star } from "lucide-react";
import { fetchGitHubRepos } from "@/lib/github";

function RepoCard({
  name,
  description,
  language,
  stargazers_count,
  html_url,
}: {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-5 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.75)] transition hover:border-accent/25 sm:rounded-3xl sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(56,189,248,0.14),transparent_55%)] opacity-75 transition-opacity duration-500 group-hover:opacity-100" />

      <header className="relative z-[1] space-y-3">
        <h3 className="break-words font-display text-xl text-mist sm:text-2xl">{name}</h3>
        <div className="flex flex-wrap items-center gap-2">
          {language ? (
            <span className="rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
              {language}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[11px] text-mist/70">
            <Star className="h-3 w-3 fill-amber-400/80 text-amber-400/80" aria-hidden />
            {stargazers_count}
          </span>
        </div>
      </header>

      <p className="relative z-[1] mt-4 flex-1 text-[13px] leading-relaxed text-mist/74 sm:text-sm">
        {description?.trim() || "No description provided."}
      </p>

      <footer className="relative z-[1] mt-6">
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-accent/35 bg-accent/10 px-4 py-2.5 text-xs font-semibold text-accent transition hover:border-accent/55 hover:bg-accent/15 sm:w-auto"
        >
          <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
          View on GitHub
        </a>
      </footer>
    </article>
  );
}

export async function GitHubProjects() {
  const repos = await fetchGitHubRepos();

  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.26em] text-accent">Open source</p>
        <h2
          id="github"
          className="scroll-mt-28 font-display text-[1.6rem] leading-snug text-mist sm:text-3xl lg:text-4xl"
        >
          GitHub repositories
        </h2>
        <p className="text-sm leading-relaxed text-mist/70">
          Public repositories synced from GitHub refreshed hourly so new work appears automatically.
        </p>
      </header>

      {repos.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center text-sm text-mist/60">
          Repositories could not be loaded right now.{" "}
          <a
            href="https://github.com/uzairzia727"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-2 hover:underline"
          >
            Visit my GitHub profile
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <RepoCard
              key={repo.id}
              name={repo.name}
              description={repo.description}
              language={repo.language}
              stargazers_count={repo.stargazers_count}
              html_url={repo.html_url}
            />
          ))}
        </div>
      )}
    </div>
  );
}
