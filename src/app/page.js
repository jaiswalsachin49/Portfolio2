import Image from "next/image";
import { ArrowUpRight, FileText, Mail, MapPin } from "lucide-react";
import Section, { SubHeading } from "@/components/Section";
import ProjectCard, { AwardBadge, ProjectLinks, Tag } from "@/components/ProjectCard";
import Achievements from "@/components/Achievements";
import GitHubActivity from "@/components/GitHubActivity";
import CopyEmail from "@/components/CopyEmail";
import Footer from "@/components/Footer";
import { brandIcons } from "@/components/BrandIcons";
import {
  about,
  achievements,
  cpStats,
  education,
  experience,
  hackathons,
  profile,
  projects,
  skills,
} from "@/data/site";

// Re-fetch GitHub stats at most twice a day.
export const revalidate = 43200;

const iconButton =
  "grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

function SocialLinks() {
  return profile.socials.map(({ label, href, icon }) => {
    const Icon = brandIcons[icon];
    return (
      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={iconButton}>
        <Icon size={15} />
      </a>
    );
  });
}

function Hero() {
  return (
    <section id="home" className="pt-16 pb-6 md:pt-36">
      <div className="mb-6 flex items-start gap-6 md:gap-10">
        <div className="flex-1 animate-fade-up">
          <a
            href="#experience"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border py-1 pr-3 pl-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="sm:hidden">Intern @ {profile.current.company.split(" ")[0]}</span>
            <span className="hidden sm:inline">
              {profile.current.role} @ {profile.current.company}
            </span>
          </a>
          <h1 className="mb-1.5 text-3xl font-medium tracking-tight md:text-5xl">{profile.name}</h1>
          <p className="mb-2 text-sm font-medium text-muted-foreground md:text-base">{profile.role}</p>
          <p className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground md:text-sm">
            <MapPin size={13} /> {profile.location} · Open to remote
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <a href={`mailto:${profile.email}`} aria-label="Email" className={iconButton}>
              <Mail size={15} />
            </a>
            <SocialLinks />
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              <FileText size={15} /> Resume
            </a>
          </div>
        </div>
        <div className="relative size-24 shrink-0 animate-fade-up overflow-hidden rounded-xl border border-border md:size-36">
          <Image src={profile.photo} alt={profile.name} fill priority sizes="144px" className="object-cover" />
        </div>
      </div>

      <div className="animate-fade-up [animation-delay:120ms]">
        <p className="mb-5 text-sm leading-relaxed text-foreground/80 md:text-base">{profile.bio}</p>
        <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-border sm:grid-cols-4">
          {cpStats.map((s, i) => {
            const inner = (
              <>
                <span className="font-mono text-lg font-semibold tracking-tight">{s.value}</span>
                <span className="text-[11px] text-muted-foreground">
                  {s.label}
                  {s.note && <span className="hidden md:inline"> · {s.note}</span>}
                </span>
              </>
            );
            const cls = `flex flex-col gap-0.5 p-3 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""} border-border`;
            return s.href ? (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition-colors hover:bg-muted`}>
                {inner}
              </a>
            ) : (
              <div key={s.label} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Timeline({ items }) {
  return (
    <ul className="divide-y divide-border rounded-xl border border-border">
      {items.map((item) => (
        <li key={item.title} className="flex gap-4 p-4">
          <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-muted text-sm font-semibold text-muted-foreground">
            {item.title[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <h3 className="text-[15px] font-semibold">{item.title}</h3>
              <span className="text-xs tabular-nums text-muted-foreground">{item.period}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {item.subtitle} · {item.location}
              {item.note && <> · {item.note}</>}
            </p>
            {item.points?.length > 0 && (
              <ul className="mt-2.5 space-y-1.5 text-sm text-foreground/80">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            )}
            {item.stack?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <>
      <main className="mx-auto max-w-3xl px-4 pb-16 md:px-6">
        <Hero />

        <Section id="about" index="01" title="About">
          <div className="grid gap-8 md:grid-cols-[1fr_220px] md:gap-10">
            <div>
              <p className="text-base leading-relaxed text-foreground md:text-lg">{about.intro}</p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/75 md:text-base">
                {about.story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <dl className="h-fit divide-y divide-border rounded-xl border border-border text-sm">
              {about.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-3 px-3.5 py-2.5 md:flex-col md:gap-0.5">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                  <dd className="text-right font-medium md:text-left">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ol className="mt-8 grid gap-3 sm:grid-cols-3">
            {about.principles.map((pr, i) => (
              <li key={pr.title} className="rounded-xl border border-border p-4 transition-colors hover:border-accent/40">
                <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                <div className="mt-1.5 text-sm font-semibold">{pr.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pr.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="experience" index="02" title="Experience">
          <Timeline items={experience.map((e) => ({ title: e.company, subtitle: e.role, ...e }))} />
          <SubHeading>Education</SubHeading>
          <Timeline items={education.map((e) => ({ title: e.school, subtitle: e.degree, ...e }))} />
        </Section>

        <Section
          id="projects"
          index="03"
          title="Featured Projects"
          action={
            <a
              href={`https://github.com/${profile.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All repos <ArrowUpRight size={14} />
            </a>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} priority={i < 2} />
            ))}
          </div>

          <SubHeading>More Projects</SubHeading>
          <ul className="divide-y divide-border rounded-xl border border-border">
            {more.map((p) => (
              <li key={p.slug} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h4 className="text-[15px] font-semibold">{p.title}</h4>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {p.category} · {p.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  {p.award && (
                    <div className="mt-2">
                      <AwardBadge>{p.award}</AwardBadge>
                    </div>
                  )}
                  {p.stack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </div>
                  )}
                </div>
                <div className="shrink-0">
                  <ProjectLinks project={p} />
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="achievements" index="04" title="Achievements">
          <Achievements wins={achievements} others={hackathons} />
        </Section>

        <Section id="github" index="05" title="GitHub Activity">
          <GitHubActivity user={profile.github} />
        </Section>

        <Section id="skills" index="06" title="Skills">
          <dl className="space-y-4">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="grid gap-2 sm:grid-cols-[110px_1fr] sm:gap-4">
                <dt className="pt-1 text-sm text-muted-foreground">{group}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contact" index="07" title="Let's Work Together">
          <div className="relative overflow-hidden rounded-xl border border-border p-6 md:p-8">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]" aria-hidden />
            <div className="relative">
              <p className="max-w-lg text-sm leading-relaxed text-foreground/80 md:text-base">
                Open to internships, full-time roles and interesting collaborations — full-stack web apps, real-time products or
                AI tooling. Email is the quickest way to reach me.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <Mail size={15} /> {profile.email}
                </a>
                <CopyEmail email={profile.email} />
                <SocialLinks />
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
