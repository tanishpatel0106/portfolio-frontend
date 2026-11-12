// Repository stats for project pages. Cached for a day; returns null on any
// failure (rate limit, private repo, offline build) so the UI simply omits it.

export type RepoStats = {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
  url: string;
};

export async function getRepoStats(slug: string | undefined): Promise<RepoStats | null> {
  if (!slug) return null;
  try {
    const res = await fetch(`https://api.github.com/repos/${slug}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-site",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 86_400 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      language: data.language ?? null,
      pushedAt: data.pushed_at,
      url: data.html_url,
    };
  } catch {
    return null;
  }
}
