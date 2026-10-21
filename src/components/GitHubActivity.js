import { ArrowUpRight } from "lucide-react";
import { getGitHubStats } from "@/lib/github";
import CountUp from "./CountUp";

const levelClass = [
  "bg-muted",
  "bg-accent/25",
  "bg-accent/50",
  "bg-accent/75",
  "bg-accent",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Group days into Sunday-first week columns, padding the first week.
function toWeeks(days) {
  const weeks = [];
  let week = new Array(new Date(days[0].date + "T00:00:00Z").getUTCDay()).fill(null);
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="text-xl font-semibold tabular-nums tracking-tight md:text-3xl">
        <CountUp value={String(value)} />
      </div>
      <div className="text-xs text-muted-foreground md:text-sm">{label}</div>
    </div>
  );
}

export default async function GitHubActivity({ user }) {
  const stats = await getGitHubStats(user);
  const profileUrl = `https://github.com/${user}`;

  if (!stats || stats.days.length === 0) {
    return (
      <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground underline underline-offset-4">
        See my activity on GitHub
      </a>
    );
  }

  const weeks = toWeeks(stats.days);
  const busiest = stats.days.reduce((a, b) => (b.count > a.count ? b : a));

  return (
    <div className="reveal rounded-2xl border border-border p-4 md:p-8">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4 md:mb-8">
        <Stat value={stats.total.toLocaleString("en-US")} label="contributions this year" />
        <Stat value={`${stats.current}d`} label="current streak" />
        <Stat value={`${stats.longest}d`} label="longest streak" />
        <Stat value={stats.repoCount ?? "—"} label="public repos" />
      </div>

      {/* Newest weeks stay visible on narrow screens; older ones clip off the left. */}
      <div data-animate className="flex justify-end overflow-hidden md:justify-center" role="img" aria-label={`${stats.total} GitHub contributions in the last year`}>
        <div className="flex gap-[2px] md:gap-[3px]">
          {weeks.map((week, wi) => {
            const first = week.find(Boolean);
            const showMonth = first && new Date(first.date + "T00:00:00Z").getUTCDate() <= 7;
            return (
              <div key={wi} className="hm-col flex flex-col gap-[2px] md:gap-[3px]" style={{ "--i": wi }}>
                <div className="h-3 text-[9px] leading-3 text-muted-foreground md:h-4 md:text-[11px]">
                  {showMonth ? MONTHS[new Date(first.date + "T00:00:00Z").getUTCMonth()] : ""}
                </div>
                {Array.from({ length: 7 }, (_, di) => {
                  const d = week[di];
                  return (
                    <div
                      key={di}
                      title={d ? `${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}` : undefined}
                      className={`size-[10px] rounded-[2px] transition-transform hover:scale-150 md:size-[13px] md:rounded-[3px] ${d ? levelClass[d.level] : "bg-transparent"}`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground md:text-sm">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {stats.topLanguages.length > 0 && <span>Most used:</span>}
          {stats.topLanguages.slice(0, 4).map((l) => (
            <span key={l.name} className="font-mono text-foreground/80">
              {l.name}
            </span>
          ))}
          <span aria-hidden>·</span>
          <span>
            Busiest day: {busiest.count} on{" "}
            {new Date(busiest.date + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}
          </span>
        </div>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
          @{user} <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  );
}
