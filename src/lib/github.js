// GitHub data fetched on the server and cached (the page revalidates periodically).
// The contribution calendar has no public JSON API without a token, so it is read
// from the same HTML fragment github.com renders on profile pages.

const REVALIDATE = 60 * 60 * 12; // 12 hours

async function fetchContributions(user) {
  const res = await fetch(`https://github.com/users/${user}/contributions`, {
    next: { revalidate: REVALIDATE },
    headers: { "User-Agent": "portfolio" },
  });
  if (!res.ok) throw new Error(`contributions ${res.status}`);
  const html = await res.text();

  // Exact counts live in tooltips keyed by the day cell's id.
  const counts = {};
  for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)</g)) {
    const n = m[2].match(/^(\d+)/);
    counts[m[1]] = n ? Number(n[1]) : 0;
  }

  const days = [];
  for (const m of html.matchAll(/<td[^>]*data-date="[^"]+"[^>]*>/g)) {
    const tag = m[0];
    const date = tag.match(/data-date="([^"]+)"/)?.[1];
    const level = Number(tag.match(/data-level="(\d)"/)?.[1] ?? 0);
    const id = tag.match(/id="([^"]+)"/)?.[1];
    if (date) days.push({ date, level, count: counts[id] ?? (level ? 1 : 0) });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));

  const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/);
  const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : days.reduce((s, d) => s + d.count, 0);

  return { days, total };
}

function streaks(days) {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // Current streak: count back from today; an empty today doesn't break it yet.
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i === days.length - 1) continue;
    else break;
  }
  return { current, longest };
}

async function fetchRepos(user) {
  const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`, {
    next: { revalidate: REVALIDATE },
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`repos ${res.status}`);
  const repos = (await res.json()).filter((r) => !r.fork);
  const langs = {};
  const skip = new Set(["HTML", "CSS"]);
  for (const r of repos) if (r.language && !skip.has(r.language)) langs[r.language] = (langs[r.language] || 0) + 1;
  const topLanguages = Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
  return { repoCount: repos.length, topLanguages };
}

export async function getGitHubStats(user) {
  const [contrib, repos] = await Promise.allSettled([fetchContributions(user), fetchRepos(user)]);
  if (contrib.status === "rejected") return null;
  const { days, total } = contrib.value;
  return {
    days,
    total,
    ...streaks(days),
    repoCount: repos.status === "fulfilled" ? repos.value.repoCount : null,
    topLanguages: repos.status === "fulfilled" ? repos.value.topLanguages : [],
  };
}
