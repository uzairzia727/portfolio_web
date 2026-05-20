export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};

const GITHUB_REPOS_URL =
  "https://api.github.com/users/uzairzia727/repos?sort=updated&per_page=30";

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(GITHUB_REPOS_URL, {
    next: { revalidate: 3600 },
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-web",
    },
  });

  if (!res.ok) {
    console.error(`GitHub API error: ${res.status} ${res.statusText}`);
    return [];
  }

  const data = (await res.json()) as GitHubRepo[];

  return data.filter((repo) => !repo.fork).slice(0, 6);
}
